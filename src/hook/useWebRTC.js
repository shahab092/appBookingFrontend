import { useRef, useState, useCallback, useEffect } from "react";

const useWebRTC = ({ socket, localUserId, localUserName, onCallEnd, onCallActive }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const [callState, setCallState] = useState({
    isCallActive: false,
    isCallIncoming: false,
    isCallOutgoing: false,
    remoteUserId: null,
    remoteUserName: null,
    isCallDataReady: false,
    hasCallStarted: false,
    callAccepted: false,
    signalingState: 'idle',
  });

  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [isRequestingMedia, setIsRequestingMedia] = useState(false);

  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const socketRef = useRef(socket);
  const remoteUserIdRef = useRef(null);
  const remoteUserNameRef = useRef(null);
  const callTimeoutRef = useRef(null);
  const iceCandidatesRef = useRef([]);
  const incomingOfferRef = useRef(null);
  const isAcceptingRef = useRef(false);
  const hasNavigatedToVideoCallRef = useRef(false);
  const socketSetupDoneRef = useRef(false);
  const callStateRef = useRef(callState);

  // Keep callStateRef updated
  useEffect(() => {
    callStateRef.current = callState;
  }, [callState]);

  // Keep socket ref updated
  useEffect(() => {
    socketRef.current = socket;
    console.log("🔌 [useWebRTC] Socket ref updated:", socket?.id);
  }, [socket]);

  // Initialize media stream
  const initializeLocalStream = useCallback(async () => {
    try {
      if (localStreamRef.current) {
        return localStreamRef.current;
      }

      setIsRequestingMedia(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
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
      console.error("Error accessing media devices:", error);
      throw error;
    }
  }, []);

  // Cleanup function
  const cleanupResources = useCallback((keepLocalStream = false) => {
    console.log("🧹 [useWebRTC] Cleaning up resources...");

    // Clear timeout
    if (callTimeoutRef.current) {
      clearTimeout(callTimeoutRef.current);
      callTimeoutRef.current = null;
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      try {
        peerConnectionRef.current.close();
      } catch (e) {
        console.warn("Error closing peer connection:", e);
      }
      peerConnectionRef.current = null;
    }

    // Stop local stream if needed
    if (!keepLocalStream && localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }

    // Clear remote stream
    setRemoteStream(null);

    // Reset ICE candidates
    iceCandidatesRef.current = [];

    // Reset refs
    incomingOfferRef.current = null;
    isAcceptingRef.current = false;
  }, []);

  // Declare endCall before createPeerConnection
  const endCall = useCallback(() => {
    console.log("📞 [useWebRTC] Ending call");

    // Notify remote party if we have their ID
    if (remoteUserIdRef.current && socketRef.current) {
      socketRef.current.emit("end-call", remoteUserIdRef.current);
    }

    // Reset call state
    setCallState({
      isCallActive: false,
      isCallIncoming: false,
      isCallOutgoing: false,
      remoteUserId: null,
      remoteUserName: null,
      isCallDataReady: false,
      hasCallStarted: false,
      callAccepted: false,
      signalingState: 'idle'
    });

    // Clean up resources but keep local stream for faster reconnection
    cleanupResources(true);

    // Reset refs
    remoteUserIdRef.current = null;
    remoteUserNameRef.current = null;
    hasNavigatedToVideoCallRef.current = false;

    // Call onCallEnd callback
    onCallEnd && onCallEnd();
  }, [cleanupResources, onCallEnd]);

  const createPeerConnection = useCallback(() => {
    console.log("🔄 [useWebRTC] Creating new peer connection");

    // Clean up existing connection first
    if (peerConnectionRef.current) {
      try {
        peerConnectionRef.current.close();
      } catch (e) { }
    }

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" }
      ],
      iceCandidatePoolSize: 10
    });

    // Add local tracks if available
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current);
      });
    }

    // Handle incoming media
    pc.ontrack = (event) => {
      console.log("🎬 [useWebRTC] Remote track received");
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current && remoteUserIdRef.current) {
        console.log("🧊 [useWebRTC] Sending ICE candidate to:", remoteUserIdRef.current);
        socketRef.current.emit("ice-candidate", {
          targetId: remoteUserIdRef.current,
          candidate: event.candidate,
        });
      }
    };

    // Handle ICE connection state changes
    pc.oniceconnectionstatechange = () => {
      console.log("🧊 [useWebRTC] ICE connection state:", pc.iceConnectionState);
      
      if (pc.iceConnectionState === "connected") {
        console.log("✅✅✅ [useWebRTC] ICE CONNECTED!");
        setCallState(prev => ({
          ...prev,
          isCallActive: true,
          hasCallStarted: true,
          signalingState: 'connected'
        }));

        // Call onCallActive callback
        if (onCallActive && !hasNavigatedToVideoCallRef.current) {
          hasNavigatedToVideoCallRef.current = true;
          onCallActive({
            id: remoteUserIdRef.current,
            name: remoteUserNameRef.current
          });
        }
      } else if (pc.iceConnectionState === "failed" || pc.iceConnectionState === "disconnected") {
        console.log("❌ [useWebRTC] ICE connection failed/disconnected");
        if (pc.iceConnectionState === "failed") {
          setTimeout(() => {
            if (peerConnectionRef.current === pc) {
              endCall();
            }
          }, 2000);
        }
      }
    };

    // Handle connection state changes
    pc.onconnectionstatechange = () => {
      console.log("🔗 [useWebRTC] Connection state:", pc.connectionState);
    };

    peerConnectionRef.current = pc;
    return pc;
  }, [onCallActive, endCall]);

  // Start call function (Doctor initiates)
  const startCall = useCallback(async (targetUserId, targetUserName) => {
    console.log("📞 [useWebRTC] START CALL function called");
    console.log("Target:", targetUserId, targetUserName);

    const s = socketRef.current;
    if (!s || !s.connected) {
      throw new Error("Socket not connected");
    }

    if (!targetUserId) {
      throw new Error("Invalid target ID");
    }

    // Check if already in a call using ref
    if (callStateRef.current.isCallActive || callStateRef.current.hasCallStarted) {
      throw new Error("Already in a call");
    }

    // Clean up any existing call first
    cleanupResources(true);

    // Set call state
    setCallState({
      isCallActive: false,
      isCallIncoming: false,
      isCallOutgoing: true,
      remoteUserId: targetUserId,
      remoteUserName: targetUserName || null,
      isCallDataReady: false,
      hasCallStarted: false,
      callAccepted: false,
      signalingState: 'establishing'
    });

    remoteUserIdRef.current = targetUserId;
    remoteUserNameRef.current = targetUserName;

    try {
      // Initialize media
      await initializeLocalStream();

      // Create new peer connection
      const pc = createPeerConnection();

      // Create and send offer
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });

      await pc.setLocalDescription(offer);

      console.log("📤 [useWebRTC] Emitting call-user to server...");
      s.emit("call-user", {
        targetId: targetUserId,
        offer: offer,
        fromName: localUserName || localUserId,
      });

      // Set timeout for unanswered call
      callTimeoutRef.current = setTimeout(() => {
        if (!callStateRef.current.isCallActive && !callStateRef.current.callAccepted) {
          console.log("⏰ [useWebRTC] Call timeout - no answer");
          endCall();
        }
      }, 45000);

      return true;
    } catch (error) {
      console.error("❌ [useWebRTC] Error starting call:", error);
      endCall();
      throw error;
    }
  }, [initializeLocalStream, createPeerConnection, localUserId, localUserName, endCall, cleanupResources]);

  // Accept call function (Patient accepts)
  const acceptCall = useCallback(async () => {
    console.log("✅ [useWebRTC] Accepting call...");

    if (isAcceptingRef.current) {
      throw new Error("Already accepting a call");
    }

    const s = socketRef.current;

    if (!s || !s.connected) {
      throw new Error("No connection to server");
    }

    // Check if we have an offer
    if (!incomingOfferRef.current) {
      throw new Error("No incoming call to accept. Please wait for the call.");
    }

    isAcceptingRef.current = true;

    try {
      // Update state to show we're accepting
      setCallState(prev => ({
        ...prev,
        callAccepted: true,
        signalingState: 'establishing'
      }));

      // Initialize media
      console.log("🎤 [useWebRTC] Initializing local stream...");
      await initializeLocalStream();

      // Create peer connection
      console.log("🔄 [useWebRTC] Creating peer connection...");
      const pc = createPeerConnection();

      // Set remote description from offer
      console.log("📡 [useWebRTC] Setting remote description...");
      await pc.setRemoteDescription(new RTCSessionDescription(incomingOfferRef.current));

      // Add any pending ICE candidates
      iceCandidatesRef.current.forEach(candidate => {
        try {
          pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.warn("Error adding pending ICE candidate:", e);
        }
      });
      iceCandidatesRef.current = [];

      // Create and send answer
      console.log("📝 [useWebRTC] Creating answer...");
      const answer = await pc.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pc.setLocalDescription(answer);

      console.log("📤 [useWebRTC] Sending answer to:", remoteUserIdRef.current);
      s.emit("answer-call", {
        targetId: remoteUserIdRef.current,
        answer: answer,
      });

      // Clear the offer reference
      incomingOfferRef.current = null;

      // Clear timeout
      if (callTimeoutRef.current) {
        clearTimeout(callTimeoutRef.current);
        callTimeoutRef.current = null;
      }

      console.log("✅ [useWebRTC] Call accepted successfully");

    } catch (error) {
      console.error("❌ [useWebRTC] Error accepting call:", error);

      // Send rejection if we have connection
      if (s.connected && remoteUserIdRef.current) {
        s.emit("end-call", remoteUserIdRef.current);
      }

      endCall();
      throw error;
    } finally {
      isAcceptingRef.current = false;
    }
  }, [initializeLocalStream, createPeerConnection, endCall]);

  const rejectCall = useCallback(() => {
    console.log("❌ [useWebRTC] Rejecting call");
    const s = socketRef.current;

    if (remoteUserIdRef.current && s && s.connected) {
      s.emit("end-call", remoteUserIdRef.current);
    }

    // Reset state
    setCallState({
      isCallActive: false,
      isCallIncoming: false,
      isCallOutgoing: false,
      remoteUserId: null,
      remoteUserName: null,
      isCallDataReady: false,
      hasCallStarted: false,
      callAccepted: false,
      signalingState: 'idle'
    });

    // Clean up
    incomingOfferRef.current = null;
    remoteUserIdRef.current = null;
    remoteUserNameRef.current = null;

    if (callTimeoutRef.current) {
      clearTimeout(callTimeoutRef.current);
      callTimeoutRef.current = null;
    }

    cleanupResources(true);
  }, [cleanupResources]);

  // Media controls
  const toggleMic = useCallback(() => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const newState = !audioTracks[0].enabled;
        audioTracks.forEach(track => {
          track.enabled = newState;
        });
        setMicEnabled(newState);
      }
    }
  }, []);

  const toggleCamera = useCallback(() => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const newState = !videoTracks[0].enabled;
        videoTracks.forEach(track => {
          track.enabled = newState;
        });
        setCameraEnabled(newState);
      }
    }
  }, []);

  // Socket event handlers
  useEffect(() => {
    const s = socketRef.current;
    if (!s) {
      console.log("❌ [useWebRTC] No socket available for event listeners");
      return;
    }

    // Only set up listeners once per socket
    if (socketSetupDoneRef.current) {
      console.log("📡 [useWebRTC] Socket listeners already set up");
      return;
    }

    console.log("📡 [useWebRTC] Setting up socket listeners");

    const handleIncomingCall = (data) => {
      console.log("📞📞📞 [useWebRTC] INCOMING CALL RECEIVED via socket!");
      console.log("Call data from:", data.from, data.fromName);
      console.log("Has offer:", !!data.offer);

      // Use ref instead of state to avoid race conditions
      if (!callStateRef.current.isCallActive && !callStateRef.current.hasCallStarted) {
        console.log("✅ [useWebRTC] Storing incoming call data");

        remoteUserIdRef.current = data.from;
        remoteUserNameRef.current = data.fromName;
        incomingOfferRef.current = data.offer;

        // Update state to show incoming call with data ready
        setCallState({
          isCallActive: false,
          isCallIncoming: true,
          isCallOutgoing: false,
          remoteUserId: data.from,
          remoteUserName: data.fromName || "Doctor",
          isCallDataReady: true, // Changed: Set to true immediately since we have offer
          hasCallStarted: false,
          callAccepted: false,
          signalingState: 'offer-received'
        });

        console.log("✅ [useWebRTC] Incoming call is ready to be accepted");
      } else {
        console.log("❌ [useWebRTC] Cannot accept incoming call - already in call");
        if (s.connected) {
          s.emit("end-call", data.from);
        }
      }
    };

    const handleCallAnswered = async (data) => {
      console.log("✅ [useWebRTC] Call answered by:", data.from);

      if (peerConnectionRef.current && remoteUserIdRef.current === data.from) {
        try {
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );

          setCallState(prev => ({
            ...prev,
            isCallActive: true,
            isCallIncoming: false,
            isCallOutgoing: false,
            isCallDataReady: true,
            hasCallStarted: true,
            callAccepted: true,
            signalingState: 'connected'
          }));

          console.log("✅ [useWebRTC] Call is now ACTIVE (from answer)");
        } catch (error) {
          console.error("❌ [useWebRTC] Error setting remote description:", error);
          endCall();
        }
      }
    };

    const handleIceCandidate = async (data) => {
      console.log("🧊 [useWebRTC] ICE candidate received from:", data.from);

      if (peerConnectionRef.current && remoteUserIdRef.current === data.from) {
        try {
          await peerConnectionRef.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        } catch (error) {
          console.error("❌ [useWebRTC] Error adding ICE candidate:", error);
          // Store for later
          iceCandidatesRef.current.push(data.candidate);
        }
      } else {
        iceCandidatesRef.current.push(data.candidate);
      }
    };

    const handleCallEnded = (data) => {
      console.log("📞 [useWebRTC] Call ended by remote party");
      endCall();
    };

    // Add event listeners
    s.on("incoming-call", handleIncomingCall);
    s.on("call-answered", handleCallAnswered);
    s.on("ice-candidate", handleIceCandidate);
    s.on("call-ended", handleCallEnded);

    socketSetupDoneRef.current = true;
    console.log("✅ [useWebRTC] Socket listeners set up successfully");

    return () => {
      console.log("🧹 [useWebRTC] Cleaning up socket listeners");
      s.off("incoming-call", handleIncomingCall);
      s.off("call-answered", handleCallAnswered);
      s.off("ice-candidate", handleIceCandidate);
      s.off("call-ended", handleCallEnded);
      socketSetupDoneRef.current = false;
    };
  }, [endCall]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("🧹 [useWebRTC] Component unmounting");
      cleanupResources(false);
    };
  }, [cleanupResources]);

  // FIXED: prepareForIncomingCall function - this is what was missing!
  const prepareForIncomingCall = useCallback((callData) => {
    console.log("📝 [useWebRTC] Preparing for incoming call via function:", callData);

    if (!callData) {
      console.log("❌ [useWebRTC] No call data provided");
      return false;
    }

    // Check if already in a call
    if (callStateRef.current.isCallActive || callStateRef.current.hasCallStarted) {
      console.log("❌ [useWebRTC] Already in a call, cannot prepare for new call");
      return false;
    }

    console.log("✅ [useWebRTC] Storing incoming call data via function");

    // Store the data in refs
    remoteUserIdRef.current = callData.from;
    remoteUserNameRef.current = callData.fromName;
    incomingOfferRef.current = callData.offer;

    // Update state to show incoming call with data ready
    setCallState({
      isCallActive: false,
      isCallIncoming: true,
      isCallOutgoing: false,
      remoteUserId: callData.from,
      remoteUserName: callData.fromName || "Doctor",
      isCallDataReady: true,
      hasCallStarted: false,
      callAccepted: false,
      signalingState: 'offer-received'
    });

    console.log("✅ [useWebRTC] State updated via function - call should now be ready to accept");
    console.log("Stored remoteUserId:", remoteUserIdRef.current);
    console.log("Stored remoteUserName:", remoteUserNameRef.current);
    console.log("Stored offer:", !!incomingOfferRef.current);

    return true;
  }, []);

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
    endCall,
    toggleMic,
    toggleCamera,
    prepareForIncomingCall, // Now this actually works!
  };
};

export { useWebRTC };