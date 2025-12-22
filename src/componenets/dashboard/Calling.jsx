import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic,
  Video,
  Phone,
  PhoneOff,
  User,
  Clock,
  Wifi,
  WifiOff,
  Shield,
  MicOff,
  CameraOff,
  X,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Volume2,
  Bell,
  AlertCircle,
  Info,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useVideoCall } from "../../context/VideoCallProvider";
import { useWebRTC } from "../../hook/useWebRTC";
import { useSelector } from "react-redux";
import OnlineConsultation from "./OnlineConsultation";

export default function Calling() {
  const navigate = useNavigate();
  const location = useLocation();
  const { socket } = useVideoCall();
  const { user } = useSelector((state) => state.auth);

  const { isIncoming, remoteUserId, remoteUserName, offer } =
    location.state || {};

  // State
  const [callInfo, setCallInfo] = useState({
    doctorName: remoteUserName || "Dr. John Carter",
    doctorSpecialty: "Cardiologist",
  });

  const [error, setError] = useState(null);
  const [isStartingCall, setIsStartingCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isAcceptingCall, setIsAcceptingCall] = useState(false);
  const [callStatus, setCallStatus] = useState("Initializing...");
  const [showOnlineConsultation, setShowOnlineConsultation] = useState(false);
  const [networkStatus, setNetworkStatus] = useState("connected");
  const [retryCount, setRetryCount] = useState(0);
  const [isRinging, setIsRinging] = useState(false);
  const [ringerVolume, setRingerVolume] = useState(0.5);
  const [isMobile, setIsMobile] = useState(false);
  const [acceptAttempted, setAcceptAttempted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Refs
  const initializationDoneRef = useRef(false);
  const callStartedRef = useRef(false);
  const hasOfferRef = useRef(false);
  const durationIntervalRef = useRef(null);
  const waitingTimeoutRef = useRef(null);
  const networkCheckRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const audioRef = useRef(null);
  const ringtoneIntervalRef = useRef(null);
  const acceptTimeoutRef = useRef(null);
  const networkRetryRef = useRef(0);

  // WebRTC Hook
  const {
    localStream,
    remoteStream,
    callState,
    micEnabled,
    cameraEnabled,
    acceptCall,
    rejectCall,
    endCall,
    toggleMic,
    toggleCamera,
    startCall,
    isRequestingMedia,
    prepareForIncomingCall,
  } = useWebRTC({
    socket: socket,
    localUserId: user?.id,
    localUserName: user?.fullName || user?.email,
    onCallEnd: handleCallEnd,
  });

  // Helper functions
  const navigateToDashboard = useCallback(() => {
    if (user?.role === "doctor") {
      navigate("/doctor/dashboard");
    } else {
      navigate("/patient/dashboard");
    }
  }, [navigate, user?.role]);

  function handleCallEnd() {
    callStartedRef.current = false;
    initializationDoneRef.current = false;
    hasOfferRef.current = false;
    setShowOnlineConsultation(false);
    stopRingtone();
    setIsProcessing(false);

    setTimeout(() => {
      navigateToDashboard();
    }, 1500);
  }

  const formatDuration = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Generate avatar URL
  const getAvatarUrl = useCallback((name) => {
    const encodedName = encodeURIComponent(name || "User");
    return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=256`;
  }, []);

  // Ringtone functions
  const playRingtone = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = ringerVolume;
      audioRef.current
        .play()
        .catch((e) => console.log("Ringtone play failed:", e));
      setIsRinging(true);
    }
  }, [ringerVolume]);

  const stopRingtone = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsRinging(false);
    if (ringtoneIntervalRef.current) {
      clearInterval(ringtoneIntervalRef.current);
    }
  }, []);

  const handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    setRingerVolume(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  // Check responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Network monitoring with enhanced logic
  useEffect(() => {
    const checkNetworkStatus = () => {
      if (!navigator.onLine) {
        setNetworkStatus("disconnected");
        setError("No internet connection. Please check your network.");
        return;
      }

      if (socket && !socket.connected) {
        setNetworkStatus("poor");
        // Only show error if we're not already in a call attempt
        if (!isProcessing && !callState.isCallActive) {
          setError("Connection unstable. Trying to reconnect...");
        }
      } else {
        setNetworkStatus("connected");
        // Clear non-critical errors when connection is good
        if (
          error?.includes("Connection unstable") ||
          error?.includes("trying to reconnect")
        ) {
          setError(null);
        }
      }
    };

    checkNetworkStatus();
    networkCheckRef.current = setInterval(checkNetworkStatus, 3000);

    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    return () => {
      if (networkCheckRef.current) clearInterval(networkCheckRef.current);
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, [socket, error, isProcessing, callState.isCallActive]);

  // Enhanced network recovery logic
  useEffect(() => {
    if (
      networkStatus === "poor" &&
      !callState.isCallActive &&
      acceptAttempted
    ) {
      // Try to recover network for call acceptance
      const recoverNetwork = async () => {
        networkRetryRef.current++;

        if (networkRetryRef.current <= 3) {
          setError(
            `Network unstable. Retrying... (${networkRetryRef.current}/3)`
          );

          // Wait a bit then check again
          setTimeout(() => {
            if (socket && !socket.connected) {
              socket.connect();
            }
          }, 1000 * networkRetryRef.current);
        } else {
          setError(
            "Network connection failed after multiple attempts. Please check your internet."
          );
          setAcceptAttempted(false);
          setIsProcessing(false);
          networkRetryRef.current = 0;
        }
      };

      recoverNetwork();
    }
  }, [networkStatus, callState.isCallActive, acceptAttempted, socket]);

  // Call duration timer
  useEffect(() => {
    if (callState.isCallActive && !showOnlineConsultation) {
      setCallDuration(0);
      durationIntervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
    }

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, [callState.isCallActive, showOnlineConsultation]);

  // Update call status and handle ringtone
  useEffect(() => {
    if (callState.isCallActive && !showOnlineConsultation) {
      setShowOnlineConsultation(true);
      setCallStatus("Connected");
      stopRingtone();
      setIsProcessing(false);
      setAcceptAttempted(false);
      return;
    }

    let status = "Ready";

    if (callState.isCallIncoming && callState.isCallDataReady) {
      status = "Incoming call ready";
      // Play ringtone for incoming call
      if (!isRinging) {
        playRingtone();
      }
    } else if (callState.isCallIncoming) {
      status = "Processing call...";
    } else if (callState.isCallOutgoing) {
      status = "Calling...";
      // Play ringtone for outgoing call (ringing tone)
      if (!isRinging) {
        playRingtone();
      }
    } else if (user?.role === "patient") {
      if (hasOfferRef.current) {
        status = "Processing call...";
      } else if (isIncoming === true) {
        status = "Waiting for doctor...";
      }
    } else if (user?.role === "doctor" && isIncoming === false) {
      status = "Ready to start call";
    }

    setCallStatus(status);
  }, [
    callState,
    user?.role,
    isIncoming,
    showOnlineConsultation,
    playRingtone,
    stopRingtone,
    isRinging,
  ]);

  // Setup video streams
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (waitingTimeoutRef.current) clearTimeout(waitingTimeoutRef.current);
      if (networkCheckRef.current) clearInterval(networkCheckRef.current);
      if (durationIntervalRef.current)
        clearInterval(durationIntervalRef.current);
      if (ringtoneIntervalRef.current)
        clearInterval(ringtoneIntervalRef.current);
      if (acceptTimeoutRef.current) clearTimeout(acceptTimeoutRef.current);
      initializationDoneRef.current = false;
      callStartedRef.current = false;
      hasOfferRef.current = false;
      stopRingtone();
      setIsProcessing(false);
      setAcceptAttempted(false);
    };
  }, [stopRingtone]);

  // Process offer for patient
  useEffect(() => {
    if (user?.role === "patient" && offer && !hasOfferRef.current) {
      hasOfferRef.current = true;

      if (prepareForIncomingCall) {
        const callData = {
          from: remoteUserId,
          fromName: remoteUserName || "Doctor",
          offer: offer,
        };
        prepareForIncomingCall(callData);
      }

      setCallInfo((prev) => ({
        ...prev,
        doctorName: remoteUserName || "Doctor",
      }));
    }
  }, [user, offer, remoteUserId, remoteUserName, prepareForIncomingCall]);

  // Main initialization
  useEffect(() => {
    if (initializationDoneRef.current) return;
    initializationDoneRef.current = true;

    // Patient waiting for call
    if (user?.role === "patient" && isIncoming === true && !offer) {
      waitingTimeoutRef.current = setTimeout(() => {
        if (!callState.isCallIncoming && !hasOfferRef.current) {
          setCallStatus("Call timed out");
          setError("No call received. Please ask the doctor to call again.");
          setTimeout(() => navigateToDashboard(), 3000);
        }
      }, 30000);
    }
  }, [user, isIncoming, offer, callState.isCallIncoming, navigateToDashboard]);

  // Enhanced event handlers with network recovery
  const handleStartDoctorCall = async () => {
    if (networkStatus === "disconnected") {
      setError("No internet connection. Please check your network.");
      return;
    }

    if (!socket?.connected) {
      setError("Not connected to server. Trying to reconnect...");
      socket.connect();
      return;
    }

    if (!remoteUserId) {
      setError("Patient information is missing.");
      return;
    }

    if (callStartedRef.current) return;

    callStartedRef.current = true;
    setIsStartingCall(true);
    setError(null);
    setCallStatus("Starting call...");

    try {
      await startCall(remoteUserId, remoteUserName);
      setCallStatus("Calling patient...");

      waitingTimeoutRef.current = setTimeout(() => {
        if (!callState.isCallActive) {
          setError("Patient didn't answer. Please try again.");
          setCallStatus("Call timed out");
          callStartedRef.current = false;
          stopRingtone();
        }
      }, 45000);
    } catch (err) {
      setError(
        "Failed to start call. Please check your connection and try again."
      );
      setCallStatus("Call failed");
      callStartedRef.current = false;
      stopRingtone();
    } finally {
      setIsStartingCall(false);
    }
  };

  const handleAccept = async () => {
    // Prevent multiple accept attempts
    if (isAcceptingCall || isProcessing || callState.isCallActive) return;

    if (!callState.isCallIncoming || !callState.isCallDataReady) {
      setError("No call to accept. Please wait for the call to be ready.");
      return;
    }

    // Check network before accepting
    if (networkStatus === "disconnected") {
      setError("No internet connection. Cannot accept call.");
      return;
    }

    if (networkStatus === "poor") {
      setError("Poor network connection. Call quality may be affected.");
      // Continue anyway but warn user
    }

    setIsAcceptingCall(true);
    setIsProcessing(true);
    setAcceptAttempted(true);
    setError(null);
    setCallStatus("Accepting call...");
    stopRingtone();

    // Clear any previous timeout
    if (acceptTimeoutRef.current) {
      clearTimeout(acceptTimeoutRef.current);
    }

    // Set a timeout for accept call
    acceptTimeoutRef.current = setTimeout(() => {
      if (!callState.isCallActive && !callState.callAccepted) {
        setError(
          "Accepting call is taking longer than expected. Please wait..."
        );
      }
    }, 10000);

    try {
      await acceptCall();
      setCallStatus("Call connected");
      // Clear timeout on success
      if (acceptTimeoutRef.current) {
        clearTimeout(acceptTimeoutRef.current);
      }
    } catch (error) {
      console.error("Accept call error:", error);

      if (networkStatus === "poor" || networkStatus === "disconnected") {
        setError("Network issue. Trying to reconnect and accept call...");
        // Auto-retry once after network check
        setTimeout(() => {
          if (networkStatus === "connected") {
            handleAccept(); // Retry
          } else {
            setError(
              "Failed to accept call due to network issues. Please try again."
            );
            setIsProcessing(false);
            setAcceptAttempted(false);
          }
        }, 2000);
      } else {
        setError("Failed to accept call. Please try again.");
        setIsProcessing(false);
        setAcceptAttempted(false);
      }
    } finally {
      setIsAcceptingCall(false);
    }
  };

  const handleDecline = () => {
    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
      waitingTimeoutRef.current = null;
    }

    rejectCall();
    callStartedRef.current = false;
    initializationDoneRef.current = false;
    hasOfferRef.current = false;
    stopRingtone();
    setIsProcessing(false);
    setAcceptAttempted(false);

    setTimeout(() => {
      navigateToDashboard();
    }, 1000);
  };

  const handleEndCall = () => {
    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
      waitingTimeoutRef.current = null;
    }

    endCall();
    setShowOnlineConsultation(false);
    stopRingtone();
    setIsProcessing(false);
    setAcceptAttempted(false);
  };

  const handleRetryCall = () => {
    setError(null);
    setCallStatus("Retrying...");
    setRetryCount((prev) => prev + 1);
    stopRingtone();
    setIsProcessing(false);
    setAcceptAttempted(false);

    if (retryCount >= 2) {
      setError("Maximum retries reached. Please try again later.");
      return;
    }

    setTimeout(() => {
      if (user?.role === "doctor") {
        handleStartDoctorCall();
      } else {
        window.location.reload();
      }
    }, 1000);
  };

  const handleGoBack = () => {
    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
    }
    stopRingtone();
    navigateToDashboard();
  };

  // Helper functions
  const getDisplayName = () => {
    if (callState.remoteUserName) return callState.remoteUserName;
    if (user?.role === "patient") return callInfo.doctorName;
    if (remoteUserName) return remoteUserName;
    return user?.role === "patient" ? "Doctor" : "Patient";
  };

  const getAvatarForParticipant = () => {
    const name = getDisplayName();
    return getAvatarUrl(name);
  };

  const getStatusText = () => {
    if (showOnlineConsultation)
      return `Connected (${formatDuration(callDuration)})`;
    if (callState.isCallActive)
      return `Connecting... (${formatDuration(callDuration)})`;
    if (callState.isCallIncoming) return "Incoming Call";
    if (callState.isCallOutgoing) return "Calling...";
    if (user?.role === "doctor" && isIncoming === false)
      return isStartingCall ? "Starting call..." : "Ready to call";
    if (user?.role === "patient" && isIncoming === true)
      return hasOfferRef.current
        ? "Processing call..."
        : "Waiting for doctor...";
    return "Ready";
  };

  const getNetworkIcon = () => {
    switch (networkStatus) {
      case "connected":
        return <Wifi className="w-4 h-4 text-green-500" />;
      case "poor":
        return <Wifi className="w-4 h-4 text-yellow-500" />;
      case "disconnected":
        return <WifiOff className="w-4 h-4 text-red-500" />;
      default:
        return <Wifi className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNetworkText = () => {
    switch (networkStatus) {
      case "connected":
        return "Connected";
      case "poor":
        return "Unstable";
      case "disconnected":
        return "Disconnected";
      default:
        return "Unknown";
    }
  };

  // Enhanced render buttons with network awareness - ALL BUTTONS CENTERED
  const renderButtons = () => {
    if (showOnlineConsultation) return null;

    // Error state
    if (
      error &&
      !error.includes("processing") &&
      !error.includes("setting up")
    ) {
      return (
        <div className="flex flex-col items-center justify-center gap-6 mt-10 w-full max-w-md mx-auto">
          <div
            className={`px-6 py-4 rounded-xl w-full text-center ${
              error.includes("timeout") ||
              error.includes("cancelled") ||
              error.includes("timed out")
                ? "bg-yellow-50 border border-yellow-200 text-yellow-700"
                : error.includes("Network") || error.includes("connection")
                ? "bg-orange-50 border border-orange-200 text-orange-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              {error.includes("timeout") ||
              error.includes("cancelled") ||
              error.includes("timed out") ? (
                <AlertTriangle className="w-5 h-5" />
              ) : error.includes("Network") || error.includes("connection") ? (
                <WifiOff className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <div className="font-medium">
                {error.includes("timeout")
                  ? "Call Timeout"
                  : error.includes("Network") || error.includes("connection")
                  ? "Network Issue"
                  : "Call Failed"}
              </div>
            </div>
            <div className="text-sm">{error}</div>
          </div>

          {user?.role === "doctor" ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <button
                onClick={handleRetryCall}
                disabled={isStartingCall || retryCount >= 2}
                className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              >
                {isStartingCall ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  "Retry Call"
                )}
              </button>
              <button
                onClick={handleGoBack}
                className="px-8 py-3 bg-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 min-w-[140px]"
              >
                <X className="w-4 h-4" />
                Go Back
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              {(error.includes("Network") || error.includes("connection")) && (
                <button
                  onClick={handleRetryCall}
                  disabled={retryCount >= 2}
                  className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-w-[140px]"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              )}
              <button
                onClick={handleGoBack}
                className="px-8 py-3 bg-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 min-w-[140px]"
              >
                <X className="w-4 h-4" />
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      );
    }

    // Patient: Incoming call ready
    if (
      user?.role === "patient" &&
      callState.isCallIncoming &&
      callState.isCallDataReady
    ) {
      // Check if accept was attempted but failed
      const isAcceptFailed =
        acceptAttempted && !callState.isCallActive && !isProcessing;

      return (
        <div className="flex flex-col items-center justify-center gap-6 mt-10 w-full max-w-md mx-auto">
          <div className="text-lg text-green-600 font-medium flex items-center justify-center gap-2">
            <Phone className="w-5 h-5 animate-pulse" />
            Incoming call from {getDisplayName()}
          </div>

          {/* Network warning for poor connection */}
          {networkStatus === "poor" && (
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm w-full">
              <Info className="w-4 h-4" />
              Poor network connection. Call quality may be affected.
            </div>
          )}

          {networkStatus === "disconnected" && (
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm w-full">
              <WifiOff className="w-4 h-4" />
              No internet connection. Cannot accept call.
            </div>
          )}

          {isAcceptingCall || isRequestingMedia || isProcessing ? (
            <div className="px-10 py-3 bg-green-600 text-white text-sm font-medium rounded-full flex items-center justify-center gap-2 w-full max-w-xs mx-auto">
              <RefreshCw className="w-4 h-4 animate-spin" />
              {isAcceptingCall
                ? "Accepting call..."
                : isRequestingMedia
                ? "Requesting media..."
                : "Processing..."}
            </div>
          ) : isAcceptFailed ? (
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <div className="text-sm text-red-600 text-center">
                Call acceptance failed. Please try again.
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                <button
                  onClick={handleAccept}
                  disabled={networkStatus === "disconnected"}
                  className="px-10 py-3 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-w-[140px]"
                >
                  <Phone className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={handleDecline}
                  className="px-10 py-3 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors flex items-center justify-center gap-2 min-w-[140px]"
                >
                  <PhoneOff className="w-4 h-4" />
                  Decline
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <button
                onClick={handleAccept}
                disabled={networkStatus === "disconnected" || isProcessing}
                className="px-10 py-3 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              >
                <Phone className="w-4 h-4" />
                Accept Call
              </button>
              <button
                onClick={handleDecline}
                disabled={isProcessing}
                className="px-10 py-3 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-w-[140px]"
              >
                <PhoneOff className="w-4 h-4" />
                Decline
              </button>
            </div>
          )}
        </div>
      );
    }

    // Patient: Waiting for call
    if (
      user?.role === "patient" &&
      isIncoming === true &&
      !hasOfferRef.current
    ) {
      return (
        <div className="flex flex-col items-center justify-center gap-6 mt-10 w-full max-w-md mx-auto">
          <div className="text-sm text-gray-600 text-center">{callStatus}</div>
          <div className="px-10 py-3 text-gray-500 text-sm font-medium rounded-full flex items-center justify-center gap-2 w-full max-w-xs mx-auto">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Waiting for doctor to call...
          </div>
          <button
            onClick={handleGoBack}
            className="px-10 py-3 bg-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 min-w-[140px]"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      );
    }

    // Doctor: Calling patient
    if (user?.role === "doctor" && callState.isCallOutgoing) {
      return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 w-full max-w-md mx-auto">
          <div className="px-10 py-3 bg-blue-600 text-white text-sm font-medium rounded-full flex items-center justify-center gap-2 w-full max-w-xs sm:w-auto">
            {isStartingCall ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Starting call...
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 animate-pulse" />
                Calling patient...
              </>
            )}
          </div>
          <button
            onClick={handleDecline}
            className="px-10 py-3 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors flex items-center justify-center gap-2 w-full max-w-xs sm:w-auto min-w-[140px]"
          >
            <PhoneOff className="w-4 h-4" />
            Cancel
          </button>
        </div>
      );
    }

    // Doctor: Ready to start call
    if (
      user?.role === "doctor" &&
      isIncoming === false &&
      !callState.isCallOutgoing
    ) {
      return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 w-full max-w-md mx-auto">
          <button
            onClick={handleStartDoctorCall}
            disabled={isStartingCall || networkStatus === "disconnected"}
            className="px-10 py-3 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full max-w-xs sm:w-auto min-w-[140px]"
          >
            {isStartingCall ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Starting call...
              </>
            ) : (
              <>
                <Phone className="w-4 h-4" />
                Start Video Call
              </>
            )}
          </button>
          <button
            onClick={handleGoBack}
            className="px-10 py-3 bg-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 w-full max-w-xs sm:w-auto min-w-[140px]"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      );
    }

    // Active call (before OnlineConsultation)
    if (callState.isCallActive) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 mt-10 w-full max-w-md mx-auto">
          <div className="text-sm font-medium text-gray-700 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Connected - {formatDuration(callDuration)}
          </div>
          <button
            onClick={handleEndCall}
            className="px-10 py-3 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors flex items-center justify-center gap-2 w-full max-w-xs min-w-[140px]"
          >
            <PhoneOff className="w-4 h-4" />
            End Call
          </button>
        </div>
      );
    }

    // Default state
    return (
      <div className="mt-10 px-10 py-3 text-gray-500 text-sm font-medium rounded-full w-full max-w-xs mx-auto text-center">
        {callStatus}
      </div>
    );
  };

  // Render OnlineConsultation when call is active
  if (showOnlineConsultation) {
    return (
      <OnlineConsultation
        localStream={localStream}
        remoteStream={remoteStream}
        callState={callState}
        micEnabled={micEnabled}
        cameraEnabled={cameraEnabled}
        endCall={endCall}
        toggleMic={toggleMic}
        toggleCamera={toggleCamera}
        isRequestingMedia={isRequestingMedia}
        startCall={startCall}
        remoteUserId={remoteUserId}
        remoteUserName={getDisplayName()}
        userRole={user?.role}
        callStartedAt={new Date().toISOString()}
        socket={socket}
      />
    );
  }

  // Main calling interface - Responsive design
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hidden audio element for ringtone */}
      <audio ref={audioRef} src="/ringtones/call-ringtone.mp3" loop>
        <source src="/ringtones/call-ringtone.mp3" type="audio/mpeg" />
        <source src="/ringtones/call-ringtone.ogg" type="audio/ogg" />
      </audio>

      {/* Header - Responsive */}
      <header className="w-full bg-white shadow-sm py-3 px-4 sm:py-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <div
            className={`${
              isMobile ? "w-8 h-8" : "w-10 h-10"
            } bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center`}
          >
            <Phone className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
          </div>
          <div>
            <h1
              className={`${
                isMobile ? "text-base" : "text-lg"
              } font-semibold text-gray-800`}
            >
              Online Consultation
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Shield className="w-3 h-3 text-green-500" />
              <span>Secure & Encrypted</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {formatDuration(callDuration)}
          </div>
          <div className="flex items-center gap-2 text-sm">
            {getNetworkIcon()}
            <span>{getNetworkText()}</span>
          </div>

          {/* Ringtone volume control (visible when ringing) */}
          {isRinging && (
            <div className="flex items-center gap-2 mt-1 sm:mt-0">
              <Bell className="w-4 h-4 text-blue-600 animate-pulse" />
              <div className="flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-gray-500" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={ringerVolume}
                  onChange={handleVolumeChange}
                  className="w-12 sm:w-16 accent-blue-600"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Responsive with centered layout */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-4 sm:py-8">
        {/* Participant Avatar */}
        <div className="relative mb-4 sm:mb-6">
          <div
            className={`${
              isMobile ? "w-24 h-24" : "w-32 h-32"
            } rounded-full overflow-hidden border-4 border-white shadow-xl`}
          >
            <img
              src={getAvatarForParticipant()}
              alt={getDisplayName()}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ringing animation */}
          {isRinging && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-20"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-20"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-20"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          )}
        </div>

        {/* Name and Role */}
        <h2
          className={`${
            isMobile ? "text-xl" : "text-2xl"
          } font-bold text-gray-800 text-center px-2`}
        >
          {getDisplayName()}
        </h2>
        <p className="text-gray-600 mt-1 text-center px-2">
          {user?.role === "patient"
            ? "Cardiologist • 15+ years experience"
            : "Patient"}
        </p>

        {/* Video Preview Area - Responsive and Centered */}
        <div className="relative mt-6 sm:mt-8 w-full max-w-md mx-auto">
          {/* Remote/Placeholder */}
          <div className="w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-800 to-gray-900">
            {remoteStream ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <div
                  className={`${
                    isMobile ? "w-16 h-16" : "w-24 h-24"
                  } rounded-full overflow-hidden mb-3 sm:mb-4`}
                >
                  <img
                    src={getAvatarForParticipant()}
                    alt={getDisplayName()}
                    className="w-full h-full object-cover"
                  />
                </div>
                <User
                  className={`${
                    isMobile ? "w-8 h-8" : "w-12 h-12"
                  } text-gray-600`}
                />
              </div>
            )}
          </div>

          {/* Local Video PIP - Responsive */}
          {localStream && (
            <div
              className={`absolute top-3 sm:top-4 right-3 sm:right-4 ${
                isMobile ? "w-16 h-16" : "w-24 h-24"
              } rounded-lg overflow-hidden border-2 border-white shadow-lg bg-black`}
            >
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1 sm:p-2">
                <span className="text-white text-xs">You</span>
              </div>
            </div>
          )}

          {/* Media Controls - Centered */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
            <button
              onClick={toggleMic}
              disabled={
                isRequestingMedia || callState.isCallActive || isProcessing
              }
              className={`${
                isMobile ? "w-8 h-8" : "w-10 h-10"
              } rounded-full flex items-center justify-center transition-colors ${
                micEnabled
                  ? "bg-black/40 hover:bg-black/60 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {micEnabled ? (
                <Mic className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
              ) : (
                <MicOff className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
              )}
            </button>
            <button
              onClick={toggleCamera}
              disabled={
                isRequestingMedia || callState.isCallActive || isProcessing
              }
              className={`${
                isMobile ? "w-8 h-8" : "w-10 h-10"
              } rounded-full flex items-center justify-center transition-colors ${
                cameraEnabled
                  ? "bg-black/40 hover:bg-black/60 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {cameraEnabled ? (
                <Video className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
              ) : (
                <CameraOff className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
              )}
            </button>
          </div>

          {/* Status Indicator - Responsive */}
          {error && !error.includes("processing") ? (
            <div
              className={`absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm text-white ${
                error.includes("timeout") ||
                error.includes("cancelled") ||
                error.includes("timed out")
                  ? "bg-yellow-600"
                  : error.includes("Network") || error.includes("connection")
                  ? "bg-orange-600"
                  : "bg-red-600"
              }`}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                {error.includes("timeout") ||
                error.includes("cancelled") ||
                error.includes("timed out") ? (
                  <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : error.includes("Network") ||
                  error.includes("connection") ? (
                  <WifiOff className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
                <span className="truncate max-w-[120px] sm:max-w-none">
                  {error.includes("timeout") ||
                  error.includes("cancelled") ||
                  error.includes("timed out")
                    ? "Call Timeout"
                    : error.includes("Network") || error.includes("connection")
                    ? "Network Issue"
                    : "Call Failed"}
                </span>
              </div>
            </div>
          ) : callState.isCallIncoming ? (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-yellow-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm flex items-center gap-1 sm:gap-2 animate-pulse">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Incoming!</span>
            </div>
          ) : callState.isCallOutgoing ? (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm flex items-center gap-1 sm:gap-2 animate-pulse">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Calling...</span>
            </div>
          ) : null}
        </div>

        {/* Status and Action Buttons - Centered */}
        <div className="mt-6 sm:mt-8 text-center w-full">
          <div className="text-sm text-gray-600 mb-4 px-2 text-center">
            {getStatusText()}
          </div>
          <div className="flex justify-center">{renderButtons()}</div>
        </div>
      </div>
    </div>
  );
}
