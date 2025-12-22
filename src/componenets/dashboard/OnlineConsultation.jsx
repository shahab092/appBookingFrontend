import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic,
  Video,
  PhoneOff,
  Monitor,
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
  Clock,
  Wifi,
  WifiOff,
  CameraOff,
  MicOff,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  VideoOff,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function OnlineConsultation(props) {
  // Destructure props
  const {
    localStream,
    remoteStream,
    callState,
    micEnabled,
    cameraEnabled,
    endCall,
    toggleMic,
    toggleCamera,
    isRequestingMedia,
    remoteUserName,
    userRole,
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
  const [networkStatus, setNetworkStatus] = useState("good");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "doctor",
      text: "Hello, how are you feeling today?",
      time: "2:30 PM",
      avatar: "DC",
    },
    {
      id: 2,
      sender: "user",
      text: "I'm feeling a bit better, thank you. Just a slight cough remains.",
      time: "2:31 PM",
      avatar: "ME",
    },
  ]);
  const [notes, setNotes] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const chatContainerRef = useRef(null);
  const durationIntervalRef = useRef(null);
  const networkCheckRef = useRef(null);
  const retryCountRef = useRef(0);

  // Format time helper
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Get participant info
  const getDisplayName = useCallback(() => {
    if (callState.remoteUserName) return callState.remoteUserName;
    if (remoteUserName) return remoteUserName;
    return userRole === "patient" ? "Dr. John Carter" : "Patient";
  }, [callState.remoteUserName, remoteUserName, userRole]);

  const getParticipantImage = useCallback(() => {
    const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      getDisplayName()
    )}&background=random&color=fff&size=256`;
    
    if (userRole === "patient") {
      return "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80";
    }
    return "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80";
  }, [getDisplayName, userRole]);

  // Network status monitoring
  useEffect(() => {
    const checkNetworkStatus = () => {
      if (!navigator.onLine) {
        setNetworkStatus("disconnected");
        return;
      }

      if (socket && !socket.connected) {
        setNetworkStatus("poor");
      } else {
        setNetworkStatus("good");
      }
    };

    checkNetworkStatus();
    networkCheckRef.current = setInterval(checkNetworkStatus, 5000);

    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    return () => {
      if (networkCheckRef.current) clearInterval(networkCheckRef.current);
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, [socket]);

  // Track call duration
  useEffect(() => {
    if (callState.isCallActive && !hasCallEnded) {
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
      if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
    };
  }, [callState.isCallActive, hasCallEnded]);

  // Set up video streams
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

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Responsive design
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Consultation timer
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

    return () => clearInterval(timer);
  }, []);

  // Auto-reconnect on network issues
  useEffect(() => {
    if (networkStatus === "disconnected" && callState.isCallActive) {
      const timeout = setTimeout(() => {
        if (networkStatus === "disconnected") {
          handleReconnect();
        }
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [networkStatus, callState.isCallActive]);

  // Event handlers
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "user",
        text: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "ME",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Simulate typing response
      setIsTyping(true);
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: "doctor",
          text: "That's good to hear. Let me know if the cough persists.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: userRole === "patient" ? "DC" : "PT",
        };
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end the consultation?")) {
      setHasCallEnded(true);
      if (endCall) endCall();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggleMic = () => {
    if (toggleMic) toggleMic();
  };

  const handleToggleVideo = () => {
    if (toggleCamera) toggleCamera();
  };

  const handleReconnect = () => {
    if (retryCountRef.current < 3) {
      retryCountRef.current++;
      setIsReconnecting(true);
      
      setTimeout(() => {
        // Simulate reconnection
        setNetworkStatus("good");
        setIsReconnecting(false);
      }, 2000);
    }
  };

  const handleDownloadFile = (filename) => {
    alert(`Downloading ${filename}...`);
    // Implement actual download logic
  };

  const handleViewFile = (filename) => {
    alert(`Opening ${filename}...`);
    // Implement actual view logic
  };

  const handleSaveNotes = () => {
    if (notes.trim()) {
      alert("Notes saved successfully!");
      // Implement save logic
    }
  };

  // Network status helpers
  const getNetworkIcon = () => {
    switch (networkStatus) {
      case "good":
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
      case "good":
        return "Good Connection";
      case "poor":
        return "Poor Connection";
      case "disconnected":
        return "No Connection";
      default:
        return "Unknown";
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
      if (networkCheckRef.current) clearInterval(networkCheckRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 md:p-6">
      {/* Network Error Banner */}
      {networkStatus === "disconnected" && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-700 text-sm">No internet connection</span>
          </div>
          <button
            onClick={handleReconnect}
            disabled={isReconnecting}
            className="flex items-center gap-2 text-sm text-red-700 hover:text-red-900"
          >
            {isReconnecting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Reconnect
          </button>
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Video className="w-5 h-5 md:w-6 md:h-6 text-white" />
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
              <span className={`flex items-center gap-1 ${
                callState.isCallActive ? "text-green-600" : "text-yellow-600"
              }`}>
                {callState.isCallActive ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    Connected
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3 h-3" />
                    Connecting
                  </>
                )}
                ({formatTime(callDuration)})
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm w-full md:w-auto justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formatTime(remainingTime)}</span>
            </div>
            <span className="text-xs">Remaining</span>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-gray-700 text-sm border border-gray-200 shadow-sm w-full md:w-auto justify-between">
            <div className="flex items-center gap-2">
              {getNetworkIcon()}
              <span>{getNetworkText()}</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 md:gap-6">
        {/* Video Area */}
        <div className="lg:col-span-9 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl relative overflow-hidden shadow-2xl">
          {/* Remote Video */}
          <div className="relative">
            {remoteStream ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-[50vh] md:h-[600px] object-cover"
              />
            ) : (
              <div className="w-full h-[50vh] md:h-[600px] flex items-center justify-center bg-gray-900">
                <div className="text-center">
                  <img
                    src={getParticipantImage()}
                    alt={getDisplayName()}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        getDisplayName()
                      )}&background=random&color=fff&size=128`;
                    }}
                  />
                  <p className="text-gray-500">
                    {callState.isCallActive
                      ? "Waiting for video..."
                      : "Call not active"}
                  </p>
                </div>
              </div>
            )}

            {/* Remote Participant Info */}
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
                  {cameraEnabled ? (
                    <Video className="w-8 h-8 text-gray-600" />
                  ) : (
                    <VideoOff className="w-8 h-8 text-gray-600" />
                  )}
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
              {micEnabled ? (
                <Mic size={isMobile ? 18 : 20} />
              ) : (
                <MicOff size={isMobile ? 18 : 20} />
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
              {cameraEnabled ? (
                <Video size={isMobile ? 18 : 20} />
              ) : (
                <CameraOff size={isMobile ? 18 : 20} />
              )}
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
              onClick={() => document.documentElement.requestFullscreen()}
              disabled={isRequestingMedia || !callState.isCallActive}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Fullscreen"
            >
              <Maximize2 size={isMobile ? 18 : 20} />
            </button>

         
          </div>

          {/* Status Indicators */}
          <div className="absolute top-4 right-4 md:right-auto md:left-1/2 md:transform md:-translate-x-1/2 flex flex-col gap-1">
            {isRequestingMedia && (
              <div className="bg-blue-600/80 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-2">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Initializing media...
              </div>
            )}
            {isReconnecting && (
              <div className="bg-yellow-600/80 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-2">
                <RefreshCw className="w-3 h-3 animate-spin" />
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
              <div 
                ref={chatContainerRef}
                className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.sender === "user" ? "justify-end" : ""
                    }`}
                  >
                    {msg.sender !== "user" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {msg.avatar}
                        </span>
                      </div>
                    )}
                    <div className={`${msg.sender === "user" ? "text-right" : ""}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm max-w-[80%] ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none"
                            : "bg-gray-100 rounded-tl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {msg.sender === "user" ? "You" : getDisplayName()} • {msg.time}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {userRole === "patient" ? "DC" : "PT"}
                      </span>
                    </div>
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}

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
                  <button 
                    onClick={() => handleViewFile("Prescription.pdf")}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium px-4 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    View Prescription
                    <Eye className="w-4 h-4" />
                  </button>
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
                    disabled={!callState.isCallActive}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!message.trim() || !callState.isCallActive}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Notes Tab */}
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-64 border border-gray-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start typing consultation notes here..."
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Save Notes
                </button>
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === "files" && (
            <div className="flex-1 p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Prescription.pdf</p>
                      <p className="text-xs text-gray-500">2.4 MB • Today</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownloadFile("Prescription.pdf")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
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
                  <button 
                    onClick={() => handleViewFile("Medical_History.pdf")}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Eye className="w-5 h-5" />
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
            {cameraEnabled ? (
              <Video className="w-5 h-5" />
            ) : (
              <VideoOff className="w-5 h-5" />
            )}
            <span className="text-xs mt-1">Video</span>
          </button>
          <button
            onClick={handleEndCall}
            className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center -mt-6 shadow-lg hover:bg-red-600 transition-colors"
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
            {micEnabled ? (
              <Mic className="w-5 h-5" />
            ) : (
              <MicOff className="w-5 h-5" />
            )}
            <span className="text-xs mt-1">Mic</span>
          </button>
          <button
            onClick={() => setActiveTab("files")}
            className={`flex flex-col items-center ${
              activeTab === "files" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Paperclip className="w-5 h-5" />
            <span className="text-xs mt-1">Files</span>
          </button>
        </div>
      )}
    </div>
  );
}