import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  Video,
  PhoneOff,
  Monitor,
  MoreVertical,
  MessageSquare,
  FileText,
  Paperclip,
  Send,
  Volume2,
  Maximize2,
  Settings,
  User,
  ChevronDown,
  Shield,
  AlertCircle,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function OnlineConsultation(props) {
  // Destructure props instead of using useLocation
  const {
    // WebRTC props
    localStream,
    remoteStream,
    callState,
    micEnabled,
    cameraEnabled,
    endCall,
    toggleMic,
    toggleCamera,
    isRequestingMedia,
    startCall,

    // Call info props
    remoteUserId,
    remoteUserName,
    userRole,
    callStartedAt,

    // Socket
    socket,
  } = props;

  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [remainingTime, setRemainingTime] = useState(30 * 60); // 30 minutes
  const [isMobile, setIsMobile] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [hasCallEnded, setHasCallEnded] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const durationIntervalRef = useRef(null);
  const callCheckRef = useRef(null);
  const callSetupRef = useRef(false);
  const retryCountRef = useRef(0);

  // Track call duration
  useEffect(() => {
    if (callState.isCallActive && !hasCallEnded) {
      console.log("⏱️ [OnlineConsultation] Starting call timer");
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
  }, [callState.isCallActive, hasCallEnded]);

  // Set up video streams
  useEffect(() => {
    console.log("🎥 [OnlineConsultation] Setting up video streams");
    console.log("Local stream:", localStream ? "Available" : "Not available");
    console.log("Remote stream:", remoteStream ? "Available" : "Not available");
    console.log("Call state:", callState);

    // Set up local video
    if (localStream && localVideoRef.current) {
      console.log("🎥 Setting local video");
      localVideoRef.current.srcObject = localStream;

      // Ensure tracks are enabled based toggles
      const audioTracks = localStream.getAudioTracks();
      const videoTracks = localStream.getVideoTracks();

      if (audioTracks.length > 0) {
        audioTracks.forEach((track) => {
          track.enabled = micEnabled;
        });
      }

      if (videoTracks.length > 0) {
        videoTracks.forEach((track) => {
          track.enabled = cameraEnabled;
        });
      }
    }

    // Set up remote video
    if (remoteStream && remoteVideoRef.current) {
      console.log("🎥 Setting remote video");
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream, micEnabled, cameraEnabled]);

  // Initialize call when component mounts
  useEffect(() => {
    console.log("📍 [OnlineConsultation] Initializing call...");
    console.log("Remote user:", remoteUserId, remoteUserName);
    console.log("User role:", userRole || user?.role);
    console.log("Socket connected:", socket?.connected);

    if (callSetupRef.current) {
      console.log("⏭️ Call already set up");
      return;
    }

    if (!socket || !socket.connected) {
      console.log("❌ Socket not connected, waiting...");
      const timeout = setTimeout(() => {
        if (!socket?.connected) {
          console.error("Socket connection timeout");
          setHasCallEnded(true);
        }
      }, 5000);
      return () => clearTimeout(timeout);
    }

    if (!remoteUserId) {
      console.log("❌ No remote user ID");
      setHasCallEnded(true);
      return;
    }

    // Set flag to prevent multiple setups
    callSetupRef.current = true;

    // Check if call is already active (should be from parent component)
    console.log("✅ Call setup complete - waiting for WebRTC connection...");

    // Monitor connection status
    callCheckRef.current = setInterval(() => {
      if (!callState.isCallActive && !hasCallEnded && !isReconnecting) {
        console.log("⚠️ Call not active, attempting reconnection...");

        // Only retry a few times
        if (retryCountRef.current < 3) {
          retryCountRef.current++;
          setIsReconnecting(true);

          // Try to re-establish connection
          setTimeout(() => {
            if (startCall && remoteUserId && remoteUserName) {
              console.log("🔄 Attempting to restart call...");
              startCall(remoteUserId, remoteUserName)
                .then(() => {
                  console.log("✅ Call restarted successfully");
                  setIsReconnecting(false);
                })
                .catch((error) => {
                  console.error("❌ Failed to restart call:", error);
                  setIsReconnecting(false);
                });
            }
          }, 1000);
        } else {
          console.log("❌ Max retries reached, ending call");
          endCall();
        }
      } else if (callState.isCallActive) {
        retryCountRef.current = 0; // Reset retry count on successful connection
      }
    }, 10000); // Check every 10 seconds

    return () => {
      if (callCheckRef.current) {
        clearInterval(callCheckRef.current);
      }
    };
  }, [
    socket,
    remoteUserId,
    remoteUserName,
    userRole,
    endCall,
    startCall,
    callState.isCallActive,
    hasCallEnded,
  ]);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Start consultation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleEndCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      // Here you would integrate with your chat system
      setMessage("");
    }
  };

  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end the consultation?")) {
      console.log("📞 [OnlineConsultation] Ending call...");
      setHasCallEnded(true);
      endCall();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggleMic = () => {
    console.log("🎤 Toggling microphone:", !micEnabled);
    toggleMic();
  };

  const handleToggleVideo = () => {
    console.log("📹 Toggling camera:", !cameraEnabled);
    toggleCamera();
  };

  const getDisplayName = () => {
    if (callState.remoteUserName) return callState.remoteUserName;
    if (remoteUserName) return remoteUserName;
    return userRole === "patient" ? "Dr. John Carter" : "Patient";
  };

  const getDisplayImage = () => {
    if (userRole === "patient") {
      return "https://images.unsplash.com/photo-1537368910025-700350fe46c7";
    } else {
      return "https://images.unsplash.com/photo-1544005313-94ddf0286df2";
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("🧹 [OnlineConsultation] Component unmounting");
      if (callCheckRef.current) {
        clearInterval(callCheckRef.current);
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 md:p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">
              Online Consultation
            </h1>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
              <span>Secure & Encrypted</span>
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              <span className="text-blue-600">Video Call</span>
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              <span
                className={`${
                  callState.isCallActive ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {callState.isCallActive ? "✅ Connected" : "⚠️ Connecting"} (
                {formatTime(callDuration)})
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm w-full md:w-auto justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>⏱ {formatTime(remainingTime)}</span>
            </div>
            <span className="text-xs">Remaining</span>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-gray-700 text-sm border border-gray-200 shadow-sm w-full md:w-auto justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 ${
                  socket?.connected ? "bg-green-500" : "bg-red-500"
                } rounded-full`}
              ></div>
              <span>
                {socket?.connected ? "✅ Connected" : "❌ Disconnected"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 md:gap-6">
        {/* Video Area */}
        <div className="lg:col-span-9 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl relative overflow-hidden shadow-2xl">
          {/* Remote Video (Doctor/Patient) */}
          <div
            className={`relative ${
              !cameraEnabled || !remoteStream ? "bg-gray-900" : ""
            }`}
          >
            {remoteStream ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-[50vh] md:h-[600px] object-cover"
              />
            ) : !cameraEnabled ? (
              <img
                src={getDisplayImage()}
                className="w-full h-[50vh] md:h-[600px] object-cover"
                alt="Remote Participant"
              />
            ) : (
              <div className="w-full h-[50vh] md:h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <User className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {callState.isCallActive
                      ? "Waiting for video..."
                      : "Call not active"}
                  </p>
                </div>
              </div>
            )}

            {/* Remote Participant Info Card */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-3 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">{getDisplayName()}</p>
                <p className="text-xs text-gray-300">
                  {userRole === "patient"
                    ? "Cardiologist • 15+ years experience"
                    : "Patient"}
                </p>
              </div>
            </div>

            {/* Connection Status */}
            <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
              <div
                className={`w-2 h-2 ${
                  callState.isCallActive ? "bg-green-500" : "bg-yellow-500"
                } rounded-full animate-pulse`}
              ></div>
              {callState.isCallActive
                ? "Excellent Connection"
                : "Connecting..."}
            </div>

            {/* Local Video Preview */}
            <div
              className={`absolute top-4 right-4 ${
                isMobile ? "w-20 h-24" : "w-32 h-40"
              } rounded-xl overflow-hidden border-2 ${
                cameraEnabled ? "border-blue-500" : "border-red-500"
              } shadow-lg transition-all hover:scale-105 cursor-pointer bg-black`}
            >
              {localStream && cameraEnabled ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <span className="text-white text-xs font-medium">
                  You {!cameraEnabled && "(Camera Off)"}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 md:gap-4 bg-white/95 backdrop-blur-sm px-4 md:px-8 py-3 rounded-2xl shadow-2xl border border-gray-200">
            <button
              onClick={handleToggleMic}
              disabled={isRequestingMedia || !callState.isCallActive}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full ${
                micEnabled
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              } transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              title={micEnabled ? "Mute microphone" : "Unmute microphone"}
            >
              <Mic
                size={isMobile ? 18 : 20}
                className={!micEnabled ? "line-through" : ""}
              />
              {!micEnabled && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </button>

            <button
              onClick={handleToggleVideo}
              disabled={isRequestingMedia || !callState.isCallActive}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full ${
                cameraEnabled
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              } transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              title={cameraEnabled ? "Turn off camera" : "Turn on camera"}
            >
              <Video size={isMobile ? 18 : 20} />
              {!cameraEnabled && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => console.log("Screen sharing not implemented yet")}
              disabled={isRequestingMedia || !callState.isCallActive}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Share screen"
            >
              <Monitor size={isMobile ? 18 : 20} />
            </button>

            <button
              onClick={handleEndCall}
              disabled={isRequestingMedia}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              title="End call"
            >
              <PhoneOff size={isMobile ? 20 : 24} />
            </button>

            <button
              onClick={() => console.log("Volume control not implemented")}
              disabled={isRequestingMedia || !callState.isCallActive}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Adjust volume"
            >
              <Volume2 size={isMobile ? 18 : 20} />
            </button>

            <button
              onClick={() => document.documentElement.requestFullscreen()}
              disabled={isRequestingMedia || !callState.isCallActive}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Fullscreen"
            >
              <Maximize2 size={isMobile ? 18 : 20} />
            </button>

            <button
              onClick={() => console.log("Settings not implemented")}
              disabled={isRequestingMedia || !callState.isCallActive}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Settings"
            >
              <Settings size={isMobile ? 18 : 20} />
            </button>
          </div>

          {/* WebRTC Status Indicators */}
          <div className="absolute top-4 right-4 md:right-auto md:left-1/2 md:transform md:-translate-x-1/2 flex flex-col gap-1">
            {!remoteStream && callState.isCallActive && (
              <div className="bg-yellow-600/80 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                Waiting for remote video...
              </div>
            )}
            {!localStream && callState.isCallActive && (
              <div className="bg-red-600/80 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-2">
                <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                Local camera not available
              </div>
            )}
            {isRequestingMedia && (
              <div className="bg-blue-600/80 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-2">
                <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></span>
                Initializing media...
              </div>
            )}
            {!callState.isCallActive && !hasCallEnded && (
              <div className="bg-yellow-600/80 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-2">
                <span className="animate-pulse">⚠️</span>
                Setting up call...
              </div>
            )}
            {isReconnecting && (
              <div className="bg-blue-600/80 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-2">
                <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></span>
                Reconnecting...
              </div>
            )}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl flex flex-col shadow-xl overflow-hidden border border-gray-200">
          {/* Tabs */}
          <div className="flex bg-gray-50 p-1 m-4 rounded-xl">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeTab === "chat"
                  ? "bg-white shadow-md text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">Chat</span>
              {activeTab === "chat" && (
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeTab === "notes"
                  ? "bg-white shadow-md text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="font-medium">Notes</span>
            </button>
            <button
              onClick={() => setActiveTab("files")}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeTab === "files"
                  ? "bg-white shadow-md text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Paperclip className="w-4 h-4" />
              <span className="font-medium">Files</span>
            </button>
          </div>

          {/* Chat Content */}
          {activeTab === "chat" && (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
                {/* Doctor Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {userRole === "patient" ? "DC" : "PT"}
                    </span>
                  </div>
                  <div>
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                      Hello, how are you feeling today?
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {userRole === "patient" ? "Dr. Carter" : "Patient"} • 2:30
                      PM
                    </span>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
                    I'm feeling a bit better, thank you. Just a slight cough
                    remains.
                  </div>
                </div>

                {/* Prescription Alert */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 font-semibold text-sm">
                      New Prescription Received
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {userRole === "patient" ? "Dr. Carter has" : "You have"}{" "}
                    sent a new prescription for your cough.
                  </p>
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium px-4 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2">
                    View Prescription
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>

                {/* Typing Indicator */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {userRole === "patient" ? "DC" : "PT"}
                    </span>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2 bg-white rounded-2xl p-1 border border-gray-200 shadow-sm">
                  <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 px-2 py-3 text-sm focus:outline-none"
                    placeholder="Type your message here..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Notes Tab Content */}
          {activeTab === "notes" && (
            <div className="flex-1 p-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Consultation Notes
                </h3>
                <p className="text-sm text-gray-600">
                  No notes taken yet. Start typing below...
                </p>
              </div>
              <textarea
                className="w-full h-64 border border-gray-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start typing consultation notes here..."
              />
            </div>
          )}

          {/* Files Tab Content */}
          {activeTab === "files" && (
            <div className="flex-1 p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Prescription.pdf</p>
                      <p className="text-xs text-gray-500">2.4 MB • Today</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Download
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Medical_History.pdf</p>
                      <p className="text-xs text-gray-500">
                        1.8 MB • Yesterday
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    View
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center justify-around shadow-lg">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex flex-col items-center ${
              activeTab === "chat" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs mt-1">Chat</span>
          </button>
          <button
            onClick={handleToggleVideo}
            className={`flex flex-col items-center ${
              !cameraEnabled ? "text-red-600" : "text-gray-500"
            }`}
          >
            <Video className="w-5 h-5" />
            <span className="text-xs mt-1">Video</span>
          </button>
          <button
            onClick={handleEndCall}
            className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center -mt-6 shadow-lg"
            disabled={isRequestingMedia}
          >
            <PhoneOff className="w-6 h-6" />
          </button>
          <button
            onClick={handleToggleMic}
            className={`flex flex-col items-center ${
              !micEnabled ? "text-red-600" : "text-gray-500"
            }`}
          >
            <Mic className="w-5 h-5" />
            <span className="text-xs mt-1">Mic</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <MoreVertical className="w-5 h-5" />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      )}

      {/* Debug Info (remove in production) */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Call Info:</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>
            User Role: <span className="font-mono">{userRole}</span>
          </div>
          <div>
            Remote Name: <span className="font-mono">{getDisplayName()}</span>
          </div>
          <div>
            Call Duration:{" "}
            <span className="font-mono">{formatTime(callDuration)}</span>
          </div>
          <div>
            Call Active:{" "}
            <span
              className={`font-mono ${
                callState.isCallActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {callState.isCallActive ? "Yes" : "No"}
            </span>
          </div>
          <div>
            Local Stream:{" "}
            <span
              className={`font-mono ${
                localStream ? "text-green-600" : "text-red-600"
              }`}
            >
              {localStream ? "Active" : "Inactive"}
            </span>
          </div>
          <div>
            Remote Stream:{" "}
            <span
              className={`font-mono ${
                remoteStream ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {remoteStream ? "Active" : "Waiting..."}
            </span>
          </div>
          <div>
            Microphone:{" "}
            <span
              className={`font-mono ${
                micEnabled ? "text-green-600" : "text-red-600"
              }`}
            >
              {micEnabled ? "On" : "Off"}
            </span>
          </div>
          <div>
            Camera:{" "}
            <span
              className={`font-mono ${
                cameraEnabled ? "text-green-600" : "text-red-600"
              }`}
            >
              {cameraEnabled ? "On" : "Off"}
            </span>
          </div>
          <div>
            Socket Connected:{" "}
            <span
              className={`font-mono ${
                socket?.connected ? "text-green-600" : "text-red-600"
              }`}
            >
              {socket?.connected ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
