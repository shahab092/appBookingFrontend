import { useRef, useState, useCallback, useEffect } from "react";
import { useVideoCall } from "../context/VideoCallProvider";

/**
 * useWebRTC Hook
 */
const useWebRTC = ({
  socket,
  localUserId,
  localUserName,
  onCallEnd,
}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const [callState, setCallState] = useState({
    isCallActive: false,
    isCallIncoming: false,
    isCallOutgoing: false,
    remoteUserId: null,
    remoteUserName: null,
  });

  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [isRequestingMedia, setIsRequestingMedia] = useState(false);

  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const incomingCallRef = useRef(null);
  const socketRef = useRef(socket);
  const remoteUserIdRef = useRef(null);
  const callTimeoutRef = useRef(null);

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  // Keep socket ref updated
  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);

  // Keep remote user ref updated
  useEffect(() => {
    remoteUserIdRef.current = callState.remoteUserId;
  }, [callState.remoteUserId]);

  // -------------------- Media --------------------
  const initializeLocalStream = useCallback(async () => {
    try {
      setIsRequestingMedia(true);

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      localStreamRef.current = stream;
      setLocalStream(stream);
      setIsRequestingMedia(false);
      return stream;
    } catch (error) {
      setIsRequestingMedia(false);
      console.error("Media error:", error);
      throw error;
    }
  }, []);

  const stopLocalStream = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
      setMicEnabled(true);
      setCameraEnabled(true);
    }
  }, []);

  // -------------------- Peer Connection --------------------
  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection(iceServers);

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current);
      });
    }

    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        const targetId =
          remoteUserIdRef.current || incomingCallRef.current?.from;
        if (targetId) {
          socketRef.current.emit("ice-candidate", {
            targetId,
            candidate: event.candidate,
          });
        }
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "failed") {
        endCallStable();
      }
    };

    peerConnectionRef.current = pc;
    return pc;
  }, []);

  // -------------------- Call Cleanup --------------------
  const clearCallTimeout = useCallback(() => {
    if (callTimeoutRef.current) {
      clearTimeout(callTimeoutRef.current);
      callTimeoutRef.current = null;
    }
  }, []);

  const endCallStable = useCallback(() => {
    clearCallTimeout();

    if (peerConnectionRef.current) {
      try {
        peerConnectionRef.current.close();
      } catch {}
      peerConnectionRef.current = null;
    }

    if (remoteUserIdRef.current && socketRef.current) {
      socketRef.current.emit("end-call", remoteUserIdRef.current);
    }

    stopLocalStream();
    setRemoteStream(null);

    setCallState({
      isCallActive: false,
      isCallIncoming: false,
      isCallOutgoing: false,
      remoteUserId: null,
      remoteUserName: null,
    });

    incomingCallRef.current = null;
    remoteUserIdRef.current = null;

    onCallEnd && onCallEnd();
  }, [clearCallTimeout, stopLocalStream, onCallEnd]);

  // -------------------- Call Actions --------------------
  const startCall = useCallback(
    async (targetUserId, targetUserName) => {
      const s = socketRef.current;
      if (!s) return;

      remoteUserIdRef.current = targetUserId;

      await initializeLocalStream();
      const pc = createPeerConnection();

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      setCallState({
        isCallActive: false,
        isCallIncoming: false,
        isCallOutgoing: true,
        remoteUserId: targetUserId,
        remoteUserName: targetUserName || null,
      });

      s.emit("call-user", {
        targetId: targetUserId,
        offer,
        fromName: localUserName || localUserId,
      });

      callTimeoutRef.current = setTimeout(() => {
        endCallStable();
      }, 30000);
    },
    [initializeLocalStream, createPeerConnection, localUserId, localUserName, endCallStable]
  );

  const acceptCall = useCallback(async () => {
    const s = socketRef.current;
    if (!incomingCallRef.current || !s) return;

    const { from, fromName, offer } = incomingCallRef.current;
    remoteUserIdRef.current = from;

    await initializeLocalStream();
    const pc = createPeerConnection();

    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    s.emit("answer-call", { targetId: from, answer });

    setCallState({
      isCallActive: true,
      isCallIncoming: false,
      isCallOutgoing: false,
      remoteUserId: from,
      remoteUserName: fromName || null,
    });

    incomingCallRef.current = null;
    clearCallTimeout();
  }, [initializeLocalStream, createPeerConnection, clearCallTimeout]);

  const rejectCall = useCallback(() => {
    const s = socketRef.current;
    if (incomingCallRef.current && s) {
      s.emit("end-call", incomingCallRef.current.from);
    }

    incomingCallRef.current = null;
    clearCallTimeout();

    setCallState({
      isCallActive: false,
      isCallIncoming: false,
      isCallOutgoing: false,
      remoteUserId: null,
      remoteUserName: null,
    });
  }, [clearCallTimeout]);

  // -------------------- Controls --------------------
  const toggleMic = () => {
    if (!localStreamRef.current) return;
    const track = localStreamRef.current.getAudioTracks()[0];
    if (track) {
      track.enabled = !track.enabled;
      setMicEnabled(track.enabled);
    }
  };

  const toggleCamera = () => {
    if (!localStreamRef.current) return;
    const track = localStreamRef.current.getVideoTracks()[0];
    if (track) {
      track.enabled = !track.enabled;
      setCameraEnabled(track.enabled);
    }
  };

  // -------------------- Socket Events --------------------
  useEffect(() => {
    const s = socketRef.current;
    if (!s) return;

    const onIncomingCall = (data) => {
      if (!callState.isCallActive && !callState.isCallOutgoing) {
        incomingCallRef.current = data;
        setCallState({
          isCallActive: false,
          isCallIncoming: true,
          isCallOutgoing: false,
          remoteUserId: data.from,
          remoteUserName: data.fromName || null,
        });
      } else {
        s.emit("end-call", data.from);
      }
    };

    const onCallAnswered = async ({ from, answer }) => {
      if (peerConnectionRef.current && remoteUserIdRef.current === from) {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
        setCallState(prev => ({
          ...prev,
          isCallActive: true,
          isCallOutgoing: false,
        }));
        clearCallTimeout();
      }
    };

    const onIceCandidate = async ({ candidate }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }
    };

    const onCallEnded = () => endCallStable();

    s.on("incoming-call", onIncomingCall);
    s.on("call-answered", onCallAnswered);
    s.on("ice-candidate", onIceCandidate);
    s.on("call-ended", onCallEnded);

    return () => {
      s.off("incoming-call", onIncomingCall);
      s.off("call-answered", onCallAnswered);
      s.off("ice-candidate", onIceCandidate);
      s.off("call-ended", onCallEnded);
    };
  }, [callState, clearCallTimeout, endCallStable]);

  // -------------------- Cleanup --------------------
  useEffect(() => {
    return () => {
      clearCallTimeout();
      stopLocalStream();
      if (peerConnectionRef.current) {
        try {
          peerConnectionRef.current.close();
        } catch {}
      }
    };
  }, [clearCallTimeout, stopLocalStream]);

  return {
    localStream,
    remoteStream,
    callState,
    micEnabled,
    cameraEnabled,
    isRequestingMedia,
    startCall,
    acceptCall,
    rejectCall,
    endCall: endCallStable,
    toggleMic,
    toggleCamera,
  };
};

export { useWebRTC };
