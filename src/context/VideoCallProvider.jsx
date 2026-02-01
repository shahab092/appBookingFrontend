import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { io } from "socket.io-client";

const VideoCallContext = createContext(undefined);

export const VideoCallProvider = ({ children, userId }) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    console.log("🎮 VideoCallProvider - User ID changed:", userId);

    // If no user ID, clean up existing socket
    if (!userId) {
      console.log(" No user ID, cleaning up socket");
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setSocket(null);
      isInitializedRef.current = false;
      return;
    }

    // If already have a socket for this user and it's connected, don't recreate
    if (
      socketRef.current &&
      isInitializedRef.current &&
      socketRef.current.connected
    ) {
      console.log(
        "Socket already initialized and connected, skipping re-creation",
      );
      return;
    }

    console.log("🔌 Creating new socket connection...");
    const socketUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

    const newSocket = io(socketUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      timeout: 20000,
      autoConnect: true,
      forceNew: false, // Changed to false to allow connection reuse
      query: {
        userId: userId,
        timestamp: Date.now(),
      },
    });

    const handleConnect = () => {
      console.log(" Socket CONNECTED:", newSocket.id);

      // Register user with the server
      newSocket.emit("register", userId, (response) => {
        console.log("Registration response:", response);
      });

      setSocket(newSocket);
      socketRef.current = newSocket;
      isInitializedRef.current = true;
    };

    const handleDisconnect = (reason) => {
      console.log(" Socket DISCONNECTED:", reason);
      setSocket(null);

      // Only reset initialized flag if it's a complete disconnect
      if (
        reason === "io server disconnect" ||
        reason === "io client disconnect"
      ) {
        isInitializedRef.current = false;
      }
    };

    const handleConnectError = (error) => {
      console.error("Socket connection error:", error);
    };

    const handleError = (error) => {
      console.error(" Socket error:", error);
    };

    // Set up all event listeners
    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("connect_error", handleConnectError);
    newSocket.on("error", handleError);

    // Connect immediately
    if (!newSocket.connected) {
      newSocket.connect();
    }

    // Cleanup function
    return () => {
      console.log(" VideoCallProvider cleanup");

      // Remove all event listeners
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("connect_error", handleConnectError);
      newSocket.off("error", handleError);

      // Only disconnect if user ID has changed or we're truly unmounting
      if (!userId) {
        newSocket.disconnect();
        socketRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, [userId]);

  // Provide socket and additional utility functions
  const value = {
    socket,
    isConnected: socket?.connected || false,
    socketId: socket?.id,
    reconnect: () => {
      if (socket && !socket.connected) {
        socket.connect();
      }
    },
    disconnect: () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        socketRef.current = null;
        isInitializedRef.current = false;
      }
    },
  };

  return (
    <VideoCallContext.Provider value={value}>
      {children}
    </VideoCallContext.Provider>
  );
};

export const useVideoCall = () => {
  const context = useContext(VideoCallContext);
  if (!context) {
    throw new Error("useVideoCall must be used within VideoCallProvider");
  }
  return context;
};
