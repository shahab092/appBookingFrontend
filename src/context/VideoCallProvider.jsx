import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const VideoCallContext = createContext(undefined);

export const VideoCallProvider = ({ children, userId }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!userId) {
            setSocket((prevSocket) => {
                if (prevSocket) {
                    prevSocket.disconnect();
                }
                return null;
            });
            return;
        }

        const socketUrl =
            import.meta.env.VITE_SOCKET_URL || "http://localhost:7000";

        const newSocket = io(socketUrl, {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
            autoConnect: true,
        });

        const handleConnect = () => {
            console.log("✅ Connected to socket:", newSocket.id);
            newSocket.emit("register", userId);
        };

        const handleDisconnect = () => {
            console.log("❌ Disconnected from socket");
        };

        const handleConnectError = (error) => {
            console.error("Socket connection error:", error);
        };

        newSocket.on("connect", handleConnect);
        newSocket.on("disconnect", handleDisconnect);
        newSocket.on("connect_error", handleConnectError);

        setSocket(newSocket);

        return () => {
            newSocket.off("connect", handleConnect);
            newSocket.off("disconnect", handleDisconnect);
            newSocket.off("connect_error", handleConnectError);
            newSocket.disconnect();
            setSocket(null);
        };
    }, [userId]);

    return (
        <VideoCallContext.Provider value={{ socket }}>
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
