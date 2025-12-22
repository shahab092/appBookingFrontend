import React, { useState, useEffect, useRef } from "react";
import { Mic, Video } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useVideoCall } from "../../context/VideoCallProvider";
import { useWebRTC } from "../../hook/useWebRTC";
import { useSelector } from "react-redux";
import OnlineConsultation from "./OnlineConsultation"; // Import the OnlineConsultation component

export default function Calling() {
  const navigate = useNavigate();
  const location = useLocation();
  const { socket } = useVideoCall();
  const { user } = useSelector((state) => state.auth);

  const { isIncoming, remoteUserId, remoteUserName, offer } =
    location.state || {};

  // Add callInfo state
  const [callInfo, setCallInfo] = useState({
    doctorName: "Dr. John Carter",
    doctorSpecialty: "Cardiology Specialist",
    doctorImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
    patientImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  });

  // Add error state
  const [error, setError] = useState(null);
  const [isStartingCall, setIsStartingCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isAcceptingCall, setIsAcceptingCall] = useState(false);
  const [callStatus, setCallStatus] = useState("Initializing...");
  const [hasNavigatedToVideoCall, setHasNavigatedToVideoCall] = useState(false);
  const [showOnlineConsultation, setShowOnlineConsultation] = useState(false);

  // Refs
  const initializationDoneRef = useRef(false);
  const callStartedRef = useRef(false);
  const hasOfferRef = useRef(false);
  const manualCallStateRef = useRef({
    // MANUAL STATE for when WebRTC hook fails
    isCallIncoming: false,
    isCallDataReady: false,
    remoteUserName: null,
  });

  // Use WebRTC hook - MODIFIED: Remove onCallActive callback
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
    onCallEnd: () => {
      console.log("📞 [Calling] Call ended via hook");

      // Reset refs
      callStartedRef.current = false;
      initializationDoneRef.current = false;
      hasOfferRef.current = false;
      manualCallStateRef.current = {
        isCallIncoming: false,
        isCallDataReady: false,
        remoteUserName: null,
      };

      // Hide online consultation and go back to dashboard
      setShowOnlineConsultation(false);
      setTimeout(() => {
        navigateToDashboard();
      }, 1000);
    },
    // REMOVED onCallActive callback - we'll handle it manually
  });

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const durationIntervalRef = useRef(null);
  const waitingTimeoutRef = useRef(null);
  const socketCheckRef = useRef(null);

  // Helper function to navigate to dashboard
  const navigateToDashboard = () => {
    console.log("🏠 [Calling] Navigating to dashboard");
    if (user?.role === "doctor") {
      navigate("/doctor/dashboard");
    } else {
      navigate("/patient/dashboard");
    }
  };

  // Track call duration
  useEffect(() => {
    if (
      (callState.isCallActive || manualCallStateRef.current.isCallIncoming) &&
      !hasNavigatedToVideoCall
    ) {
      console.log("⏱️ [Calling] Starting call timer");
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
  }, [callState.isCallActive, hasNavigatedToVideoCall]);

  // Update call status based on callState OR manual state
  useEffect(() => {
    console.log("🔄 [Calling] Updating call status", {
      callState,
      manualState: manualCallStateRef.current,
      userRole: user?.role,
    });

    // Use manual state if WebRTC hook isn't working
    const effectiveCallState = {
      ...callState,
      ...(manualCallStateRef.current.isCallIncoming
        ? {
            isCallIncoming: true,
            isCallDataReady: manualCallStateRef.current.isCallDataReady,
            remoteUserName:
              manualCallStateRef.current.remoteUserName ||
              callState.remoteUserName,
          }
        : {}),
    };

    // NEW: Show OnlineConsultation when call is active
    if (effectiveCallState.isCallActive && !showOnlineConsultation) {
      console.log("✅ [Calling] Call is active, showing OnlineConsultation");
      setShowOnlineConsultation(true);
      setCallStatus("Connected");
    } else if (
      effectiveCallState.isCallIncoming &&
      effectiveCallState.isCallDataReady
    ) {
      setCallStatus("📞 Incoming call ready to accept!");
    } else if (
      effectiveCallState.isCallIncoming &&
      !effectiveCallState.isCallDataReady
    ) {
      setCallStatus("Processing call...");
    } else if (effectiveCallState.isCallOutgoing) {
      setCallStatus("Calling...");
    } else if (user?.role === "patient") {
      if (hasOfferRef.current && manualCallStateRef.current.isCallIncoming) {
        setCallStatus("📞 Incoming call ready to accept!");
      } else if (hasOfferRef.current) {
        setCallStatus("📞 Processing incoming call...");
      } else if (isIncoming === true) {
        setCallStatus("Waiting for doctor to start call...");
      } else {
        setCallStatus("Ready");
      }
    } else if (user?.role === "doctor" && isIncoming === false) {
      setCallStatus("Ready to start call");
    } else {
      setCallStatus("Ready");
    }
  }, [callState, user, isIncoming, showOnlineConsultation]);

  // Set up video streams
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      console.log("🎥 [Calling] Setting up local video");
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      console.log("🎥 [Calling] Setting up remote video");
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Check socket connection status
  useEffect(() => {
    if (!socket) {
      console.log("❌ [Calling] No socket available");
      setError("No connection to server. Please check your internet.");
      return;
    }

    console.log("🔌 [Calling] Socket status:", {
      connected: socket.connected,
      id: socket.id,
    });

    if (!socket.connected) {
      console.log(
        "⚠️ [Calling] Socket not connected, attempting to connect..."
      );
      socket.connect();
    }

    socketCheckRef.current = setInterval(() => {
      if (!socket.connected) {
        console.log("⚠️ [Calling] Socket disconnected, reconnecting...");
        socket.connect();
      }
    }, 5000);

    return () => {
      if (socketCheckRef.current) {
        clearInterval(socketCheckRef.current);
      }
    };
  }, [socket]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      console.log("🧹 [Calling] Cleaning up timeouts");
      if (waitingTimeoutRef.current) {
        clearTimeout(waitingTimeoutRef.current);
      }
      if (socketCheckRef.current) {
        clearInterval(socketCheckRef.current);
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }

      initializationDoneRef.current = false;
      callStartedRef.current = false;
      hasOfferRef.current = false;
    };
  }, []);

  // CRITICAL FIX: Direct WebRTC offer processing
  useEffect(() => {
    console.log("📍 [Calling] Processing offer effect");
    console.log("User role:", user?.role);
    console.log("Has offer?", !!offer);
    console.log("Offer data:", offer);

    if (user?.role === "patient" && offer && !hasOfferRef.current) {
      console.log("🚨 [Calling] PATIENT: Processing offer from location state");
      hasOfferRef.current = true;

      // Try to use prepareForIncomingCall first
      if (prepareForIncomingCall) {
        console.log("📤 [Calling] Using prepareForIncomingCall");
        const callData = {
          from: remoteUserId,
          fromName: remoteUserName || "Doctor",
          offer: offer,
        };

        const success = prepareForIncomingCall(callData);
        console.log("prepareForIncomingCall result:", success);
      } else {
        console.log("❌ [Calling] prepareForIncomingCall not available");
      }

      // MANUAL FALLBACK: Set manual state if WebRTC hook doesn't update
      console.log("🔄 [Calling] Setting manual call state as fallback");
      manualCallStateRef.current = {
        isCallIncoming: true,
        isCallDataReady: true,
        remoteUserName: remoteUserName || "Doctor",
      };

      // Check after 1 second if WebRTC state updated
      setTimeout(() => {
        console.log("⏰ [Calling] Checking if WebRTC state updated...");
        console.log("callState.isCallIncoming:", callState.isCallIncoming);
        console.log("manualCallStateRef.current:", manualCallStateRef.current);

        if (!callState.isCallIncoming) {
          console.log(
            "⚠️ [Calling] WebRTC state not updated, using manual state"
          );
        } else {
          console.log("✅ [Calling] WebRTC state updated successfully");
        }
      }, 1000);
    }
  }, [
    user,
    offer,
    remoteUserId,
    remoteUserName,
    prepareForIncomingCall,
    callState,
  ]);

  // Main initialization effect
  useEffect(() => {
    console.log("📍 [Calling] Main initialization effect");
    console.log("User role:", user?.role);
    console.log("Location state:", {
      isIncoming,
      remoteUserId,
      remoteUserName,
    });

    if (initializationDoneRef.current) {
      console.log("⏭️ [Calling] Already initialized, skipping");
      return;
    }

    initializationDoneRef.current = true;

    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
      waitingTimeoutRef.current = null;
    }

    // PATIENT: Waiting for call
    if (user?.role === "patient" && isIncoming === true) {
      console.log("🚨 [Calling] PATIENT: Incoming call flow");

      if (!offer) {
        console.log("⏳ [Calling] Patient waiting for doctor to call");

        waitingTimeoutRef.current = setTimeout(() => {
          console.log("⏰ [Calling] No call received within 30s");
          if (!callState.isCallIncoming && !hasOfferRef.current) {
            setCallStatus("Call timed out");
            setError("No call received. Please ask the doctor to call again.");

            setTimeout(() => {
              navigateToDashboard();
            }, 3000);
          }
        }, 30000);
      }
    }

    // DOCTOR: Ready to call
    else if (
      user?.role === "doctor" &&
      isIncoming === false &&
      remoteUserId &&
      !callStartedRef.current
    ) {
      console.log("👨‍⚕️ [Calling] DOCTOR: Ready to call patient");
    }

    return () => {
      if (waitingTimeoutRef.current) {
        clearTimeout(waitingTimeoutRef.current);
        waitingTimeoutRef.current = null;
      }
    };
  }, [user, isIncoming, remoteUserId, remoteUserName, offer, callState]);

  // Function for doctor to start the call
  const handleStartDoctorCall = async () => {
    console.log("👨‍⚕️ [Calling] Doctor starting call...");

    if (!socket || !socket.connected) {
      console.log("❌ [Calling] Socket not connected");
      setError(
        "Not connected to server. Please check your internet connection."
      );
      return;
    }

    if (!remoteUserId) {
      console.log("❌ [Calling] No patient ID");
      setError("Patient information is missing. Please go back and try again.");
      return;
    }

    if (callStartedRef.current) {
      console.log("⚠️ [Calling] Call already started");
      return;
    }

    callStartedRef.current = true;
    setIsStartingCall(true);
    setError(null);
    setCallStatus("Starting call...");

    try {
      console.log("✅ [Calling] Socket is connected, starting call...");
      await startCall(remoteUserId, remoteUserName);

      console.log("✅ [Calling] Call initiated successfully");
      setError(null);
      setCallStatus("Calling patient...");

      waitingTimeoutRef.current = setTimeout(() => {
        if (!callState.isCallActive && !callState.callAccepted) {
          console.log("⏰ [Calling] Patient didn't answer in time");
          setError("Patient didn't answer. Please try again.");
          setCallStatus("Call timed out");
          callStartedRef.current = false;
        }
      }, 45000);
    } catch (error) {
      console.error("❌ [Calling] Error starting call:", error);
      setError(error.message || "Failed to start call");
      setCallStatus("Call failed");
      callStartedRef.current = false;
    } finally {
      setIsStartingCall(false);
    }
  };

  // Update callInfo
  useEffect(() => {
    if (
      user?.role === "patient" &&
      (callState.remoteUserName ||
        remoteUserName ||
        manualCallStateRef.current.remoteUserName)
    ) {
      setCallInfo((prev) => ({
        ...prev,
        doctorName:
          callState.remoteUserName ||
          manualCallStateRef.current.remoteUserName ||
          remoteUserName ||
          "Doctor",
      }));
    } else if (user?.role === "doctor" && callState.remoteUserName) {
      setCallInfo((prev) => ({
        ...prev,
        doctorName: user?.fullName || "Doctor",
      }));
    }
  }, [callState.remoteUserName, user, remoteUserName]);

  // SIMPLIFIED ACCEPT FUNCTION
  const handleAccept = async () => {
    console.log("✅ [Calling] Accept button clicked");

    if (isAcceptingCall || callState.isCallActive || hasNavigatedToVideoCall) {
      console.log("⚠️ [Calling] Already accepting or in call");
      return;
    }

    // Check if we can accept (either via WebRTC hook or manual state)
    const canAccept = callState.isCallIncoming && callState.isCallDataReady;
    const canAcceptManual =
      manualCallStateRef.current.isCallIncoming &&
      manualCallStateRef.current.isCallDataReady;

    if (!canAccept && !canAcceptManual) {
      console.log("❌ [Calling] No call to accept");
      setError("No call to accept. Please wait for the call to be ready.");
      return;
    }

    setIsAcceptingCall(true);
    setError(null);
    setCallStatus("Accepting call...");

    try {
      // Try to use WebRTC acceptCall first
      if (callState.isCallIncoming && callState.isCallDataReady) {
        console.log("✅ [Calling] Accepting via WebRTC hook");
        await acceptCall();
      } else if (manualCallStateRef.current.isCallIncoming) {
        console.log("⚠️ [Calling] WebRTC hook not ready, trying manual accept");
        // If WebRTC hook isn't ready, we need to trigger it manually
        // This is a fallback - in a real fix, you'd need to fix the WebRTC hook
        setError("WebRTC connection issue. Please try refreshing the page.");
        setIsAcceptingCall(false);
        return;
      }

      console.log("✅ [Calling] Call accepted successfully");
      setCallStatus("Call connected");
      // Don't set showOnlineConsultation here - it will be set by useEffect when callState.isCallActive becomes true
    } catch (error) {
      console.error("❌ [Calling] Error accepting call:", error);
      setError(error.message || "Failed to accept call");
      setCallStatus("Accept failed");
    } finally {
      setIsAcceptingCall(false);
    }
  };

  const handleDecline = () => {
    console.log("❌ [Calling] Decline button clicked");

    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
      waitingTimeoutRef.current = null;
    }

    rejectCall();
    callStartedRef.current = false;
    initializationDoneRef.current = false;
    hasOfferRef.current = false;
    manualCallStateRef.current = {
      isCallIncoming: false,
      isCallDataReady: false,
      remoteUserName: null,
    };

    setTimeout(() => {
      navigateToDashboard();
    }, 1000);
  };

  const handleEndCall = () => {
    console.log("📞 [Calling] End call button clicked");

    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
      waitingTimeoutRef.current = null;
    }

    endCall();
    callStartedRef.current = false;
    initializationDoneRef.current = false;
    hasOfferRef.current = false;
    manualCallStateRef.current = {
      isCallIncoming: false,
      isCallDataReady: false,
      remoteUserName: null,
    };
    setShowOnlineConsultation(false);
  };

  const handleRetryCall = () => {
    console.log("🔄 [Calling] Retrying call...");
    setError(null);
    setCallStatus("Retrying...");
    setShowOnlineConsultation(false);
    callStartedRef.current = false;
    initializationDoneRef.current = false;
    hasOfferRef.current = false;
    manualCallStateRef.current = {
      isCallIncoming: false,
      isCallDataReady: false,
      remoteUserName: null,
    };

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleGoBack = () => {
    console.log("⬅️ [Calling] Going back to dashboard");

    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
    }

    navigateToDashboard();
  };

  // Format call duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Determine which buttons to show - SIMPLIFIED
  const renderButtons = () => {
    console.log("🔘 [Calling] Rendering buttons", {
      error,
      callState,
      manualState: manualCallStateRef.current,
      userRole: user?.role,
      hasOffer: hasOfferRef.current,
      showOnlineConsultation,
    });

    // If showing OnlineConsultation, don't show any buttons
    if (showOnlineConsultation) {
      return null;
    }

    // SHOW ERROR STATE
    if (
      error &&
      !error.includes("processing") &&
      !error.includes("setting up")
    ) {
      return (
        <div className="flex flex-col gap-6 mt-10">
          <div
            className={`${
              error.includes("timeout") ||
              error.includes("cancelled") ||
              error.includes("timed out")
                ? "text-yellow-600 bg-yellow-50 border-yellow-200"
                : "text-red-600 bg-red-50 border-red-200"
            } border rounded-lg p-4 max-w-md`}
          >
            <div className="font-medium mb-1">Call Failed</div>
            <div className="text-sm">{error}</div>
          </div>

          {user?.role === "doctor" ? (
            <div className="flex gap-6">
              <button
                onClick={handleRetryCall}
                className="px-8 py-3 bg-blue-600 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                disabled={isStartingCall}
              >
                {isStartingCall ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    Retrying...
                  </>
                ) : (
                  "Retry Call"
                )}
              </button>

              <button
                onClick={handleGoBack}
                className="px-8 py-3 bg-gray-600 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity"
              >
                Go Back
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoBack}
              className="px-8 py-3 bg-gray-600 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity"
            >
              Return to Dashboard
            </button>
          )}
        </div>
      );
    }

    // PATIENT: Has incoming call (either from WebRTC or manual state)
    const hasIncomingCall =
      callState.isCallIncoming || manualCallStateRef.current.isCallIncoming;
    const isCallReady =
      (callState.isCallIncoming && callState.isCallDataReady) ||
      (manualCallStateRef.current.isCallIncoming &&
        manualCallStateRef.current.isCallDataReady);

    if (user?.role === "patient" && hasIncomingCall && isCallReady) {
      const remoteName =
        callState.remoteUserName ||
        manualCallStateRef.current.remoteUserName ||
        remoteUserName ||
        "Doctor";

      return (
        <div className="flex flex-col items-center gap-6 mt-10">
          <div className="text-lg text-green-600 font-medium animate-pulse">
            📞 Incoming call from {remoteName}
          </div>

          {isAcceptingCall || isRequestingMedia ? (
            <div
              className="flex items-center gap-3 px-10 py-3 text-white text-lg rounded-full shadow-md"
              style={{ backgroundColor: "#1DA851" }}
            >
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              {isRequestingMedia
                ? "Requesting camera/mic..."
                : "Connecting call..."}
            </div>
          ) : (
            <div className="flex gap-6">
              <button
                onClick={handleAccept}
                className="px-10 py-3 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity animate-pulse"
                style={{ backgroundColor: "#1DA851" }}
                disabled={isAcceptingCall}
              >
                Accept Call
              </button>

              <button
                onClick={handleDecline}
                className="px-10 py-3 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#D84343" }}
              >
                Decline
              </button>
            </div>
          )}
        </div>
      );
    }

    // PATIENT: Has offer but call not ready yet
    else if (user?.role === "patient" && hasOfferRef.current && !isCallReady) {
      return (
        <div className="flex flex-col items-center gap-6 mt-10">
          <div className="text-lg text-green-600 font-medium">
            📞 Incoming call from {remoteUserName || "Doctor"}
          </div>

          <div
            className="flex items-center gap-3 px-10 py-3 text-white text-lg rounded-full shadow-md mb-4"
            style={{ backgroundColor: "#FFA500" }}
          >
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            Processing call...
          </div>

          <div className="text-sm text-yellow-600 text-center max-w-md">
            The call is being set up. Please wait a moment...
          </div>

          <button
            onClick={handleDecline}
            className="px-10 py-3 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity mt-4"
            style={{ backgroundColor: "#D84343" }}
          >
            Cancel
          </button>
        </div>
      );
    }

    // PATIENT: Waiting for doctor to call (no offer yet)
    else if (
      user?.role === "patient" &&
      isIncoming === true &&
      !hasOfferRef.current
    ) {
      return (
        <div className="flex flex-col items-center gap-6 mt-10">
          <div className="text-sm text-gray-600">{callStatus}</div>
          <div className="flex items-center gap-3 px-10 py-3 text-gray-500 text-lg rounded-full shadow-md">
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></span>
            Waiting for doctor to call...
          </div>
          <button
            onClick={handleGoBack}
            className="px-10 py-3 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#D84343" }}
          >
            Cancel
          </button>
        </div>
      );
    }

    // DOCTOR: Calling patient (outgoing call)
    else if (user?.role === "doctor" && callState.isCallOutgoing) {
      return (
        <div className="flex gap-6 mt-10">
          <div
            className="px-10 py-3 text-white text-lg rounded-full shadow-md flex items-center gap-2"
            style={{ backgroundColor: "#1DA851" }}
          >
            {isStartingCall ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                Starting call...
              </>
            ) : (
              <>
                <span className="animate-pulse">📞</span>
                Calling patient...
              </>
            )}
          </div>

          <button
            onClick={handleDecline}
            className="px-10 py-3 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#D84343" }}
          >
            Cancel Call
          </button>
        </div>
      );
    }

    // DOCTOR: Ready to start call (hasn't started yet)
    else if (
      user?.role === "doctor" &&
      isIncoming === false &&
      !callState.isCallOutgoing
    ) {
      return (
        <div className="flex gap-6 mt-10">
          <button
            onClick={handleStartDoctorCall}
            className="px-10 py-3 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#1DA851" }}
            disabled={isStartingCall}
          >
            {isStartingCall ? (
              <div className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                Starting call...
              </div>
            ) : (
              "Start Video Call"
            )}
          </button>

          <button
            onClick={handleGoBack}
            className="px-10 py-3 bg-gray-600 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity"
          >
            Cancel
          </button>
        </div>
      );
    }

    // ACTIVE CALL - Show End Call button with duration
    else if (callState.isCallActive) {
      return (
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="text-lg font-medium text-gray-700">
            Connected - {formatDuration(callDuration)}
          </div>
          <button
            onClick={handleEndCall}
            className="px-10 py-3 text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#D84343" }}
          >
            End Call
          </button>
        </div>
      );
    }

    // DEFAULT STATE
    else {
      return (
        <div className="mt-10 px-10 py-3 text-gray-500 text-lg rounded-full shadow-md">
          {callStatus}
        </div>
      );
    }
  };

  // Determine display name
  const getDisplayName = () => {
    if (callState.remoteUserName) return callState.remoteUserName;
    if (manualCallStateRef.current.remoteUserName)
      return manualCallStateRef.current.remoteUserName;
    if (user?.role === "patient") return callInfo.doctorName;
    if (remoteUserName) return remoteUserName;
    return user?.role === "patient" ? "Doctor" : "Patient";
  };

  // Determine display image
  const getDisplayImage = () => {
    if (user?.role === "patient") {
      return callInfo.doctorImage;
    } else {
      return callInfo.patientImage;
    }
  };

  // Determine status text for navbar
  const getStatusText = () => {
    if (showOnlineConsultation) {
      return `Connected (${formatDuration(callDuration)})`;
    }

    if (callState.isCallActive) {
      return `Connecting... (${formatDuration(callDuration)})`;
    }

    if (callState.isCallIncoming || manualCallStateRef.current.isCallIncoming) {
      return "📞 Incoming Call!";
    }

    if (callState.isCallOutgoing) {
      return "Calling patient...";
    }

    if (user?.role === "doctor" && isIncoming === false) {
      return isStartingCall ? "Starting call..." : "Ready to call";
    }

    if (user?.role === "patient" && isIncoming === true) {
      if (hasOfferRef.current) {
        return "Processing call...";
      } else {
        return "Waiting for doctor...";
      }
    }

    return "Ready";
  };

  // Render OnlineConsultation component when call is active
  const renderOnlineConsultation = () => {
    if (!showOnlineConsultation) return null;

    return (
      <OnlineConsultation
        // Pass all the WebRTC props
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
        // Pass user info
        remoteUserId={remoteUserId}
        remoteUserName={getDisplayName()}
        userRole={user?.role}
        callStartedAt={new Date().toISOString()}
        // Pass socket
        socket={socket}
      />
    );
  };

  // If showing OnlineConsultation, render only that
  if (showOnlineConsultation) {
    return renderOnlineConsultation();
  }

  // Otherwise, render the calling interface
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="logo"
            className="w-8 h-8"
          />
          <h1 className="text-lg font-semibold text-[#187BCD]">
            Online Consultation
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">{getStatusText()}</div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                socket?.connected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs">
              {socket?.connected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content - Only show when not in OnlineConsultation */}
      <div className="flex flex-col items-center mt-10">
        {/* Doctor/Patient Image based on role */}
        <img
          src={getDisplayImage()}
          alt={user?.role === "patient" ? "Doctor" : "Patient"}
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />

        {/* Name Display */}
        <h2 className="text-2xl font-bold mt-4">{getDisplayName()}</h2>
        <p className="text-gray-500 text-sm">
          {user?.role === "patient" ? callInfo.doctorSpecialty : "Patient"}
        </p>

        {/* Video Area */}
        <div className="relative mt-8">
          {/* Show remote video if available, otherwise show static image */}
          {remoteStream ? (
            <div className="w-[340px] h-[340px] rounded-2xl overflow-hidden shadow-lg bg-black">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <img
              src={getDisplayImage()}
              alt={user?.role === "patient" ? "You" : "Doctor"}
              className="w-[340px] h-[340px] rounded-2xl object-cover shadow-lg"
            />
          )}

          {/* Local Video Preview (small PIP) */}
          {localStream && (
            <div className="absolute top-4 right-4 w-20 h-20 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Icons Overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
            <button
              onClick={toggleMic}
              disabled={
                isAcceptingCall ||
                isRequestingMedia ||
                callState.isCallActive ||
                showOnlineConsultation
              }
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                micEnabled
                  ? "bg-black/40 hover:bg-black/60"
                  : "bg-red-500/80 hover:bg-red-600/80"
              }`}
            >
              <Mic size={18} stroke="white" strokeWidth={2} />
            </button>
            <button
              onClick={toggleCamera}
              disabled={
                isAcceptingCall ||
                isRequestingMedia ||
                callState.isCallActive ||
                showOnlineConsultation
              }
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                cameraEnabled
                  ? "bg-black/40 hover:bg-black/60"
                  : "bg-red-500/80 hover:bg-red-600/80"
              }`}
            >
              <Video size={18} stroke="white" strokeWidth={2} />
            </button>
          </div>

          {/* Call Status Indicator */}
          {error &&
          !error.includes("processing") &&
          !error.includes("setting up") ? (
            <div
              className={`absolute top-4 left-4 ${
                error.includes("timeout") ||
                error.includes("cancelled") ||
                error.includes("timed out")
                  ? "bg-yellow-600/80"
                  : "bg-red-600/80"
              } text-white px-3 py-1 rounded-lg text-sm`}
            >
              {error.includes("timeout") ||
              error.includes("cancelled") ||
              error.includes("timed out")
                ? "⚠️ Call Timeout"
                : "⚠️ Call Failed"}
            </div>
          ) : callState.isCallIncoming ||
            manualCallStateRef.current.isCallIncoming ? (
            <div className="absolute top-4 left-4 bg-yellow-600/80 text-white px-3 py-1 rounded-lg text-sm animate-pulse">
              📞 Incoming call!
            </div>
          ) : callState.isCallActive ? (
            <div className="absolute top-4 left-4 bg-green-600/80 text-white px-3 py-1 rounded-lg text-sm">
              ✅ Connecting ({formatDuration(callDuration)})
            </div>
          ) : callState.isCallOutgoing ? (
            <div className="absolute top-4 left-4 bg-blue-600/80 text-white px-3 py-1 rounded-lg text-sm animate-pulse">
              📞 Calling...
            </div>
          ) : user?.role === "patient" && isIncoming === true ? (
            <div className="absolute top-4 left-4 bg-blue-600/80 text-white px-3 py-1 rounded-lg text-sm">
              ⏳{" "}
              {hasOfferRef.current
                ? "Processing call..."
                : "Waiting for doctor..."}
            </div>
          ) : null}
        </div>

        {/* Render appropriate buttons based on call state */}
        {renderButtons()}

        {/* Debug Info */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 max-w-md">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Debug Info:
          </h3>
          <div className="text-xs text-gray-600 space-y-1">
            <div>
              User Role: <span className="font-mono">{user?.role}</span>
            </div>
            <div>
              Has Offer:{" "}
              <span className="font-mono">
                {hasOfferRef.current.toString()}
              </span>
            </div>
            <div>
              WebRTC State:{" "}
              <span className="font-mono">
                {JSON.stringify({
                  isCallActive: callState.isCallActive,
                  isCallIncoming: callState.isCallIncoming,
                  isCallDataReady: callState.isCallDataReady,
                })}
              </span>
            </div>
            <div>
              Manual State:{" "}
              <span className="font-mono">
                {JSON.stringify(manualCallStateRef.current)}
              </span>
            </div>
            <div>
              Remote Name: <span className="font-mono">{getDisplayName()}</span>
            </div>
            <div>
              Call Status: <span className="font-mono">{callStatus}</span>
            </div>
            <div>
              Show OnlineConsultation:{" "}
              <span className="font-mono">
                {showOnlineConsultation ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
