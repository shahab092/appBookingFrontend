import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../libs/api";
import { useSelector } from "react-redux";
import { useVideoCall } from "./VideoCallProvider";
import { useToast } from "./ToastContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingDoctorCount, setPendingDoctorCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { socket } = useVideoCall();
  const { showToast } = useToast();

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await api.get("notifications");
      console.log(res, "response of notificatoin");
      if (res.data?.success) {
        setNotifications(res.data.data.notifications);
        setUnreadCount(res.data.data.unreadCount);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchPendingDoctorCount = useCallback(async () => {
    if (user?.role !== "admin") return;
    try {
      const res = await api.get("/doctor/pending-count");
      if (res.data?.success) {
        setPendingDoctorCount(res.data.count);
      }
    } catch (error) {
      console.error("Error fetching pending doctor count:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
    fetchPendingDoctorCount();

    if (socket && user) {
      // Identify user to the socket server
      if (user.role === "admin") {
        socket.emit("identify-admin", user.id || user._id);
      } else {
        socket.emit("identify", user.id || user._id);
      }

      const handleNewNotification = (notif) => {
        setNotifications((prev) => [notif, ...prev]);
        setUnreadCount((prev) => prev + 1);
        showToast(notif.message, notif.type || "info");
      };

      const handleAdminStatsUpdate = (stats) => {
        if (stats.pendingDoctorCount !== undefined) {
          setPendingDoctorCount(stats.pendingDoctorCount);
        }
      };

      socket.on("new-notification", handleNewNotification);
      socket.on("admin-stats-update", handleAdminStatsUpdate);

      return () => {
        socket.off("new-notification", handleNewNotification);
        socket.off("admin-stats-update", handleAdminStatsUpdate);
      };
    }
  }, [fetchNotifications, fetchPendingDoctorCount, socket, user, showToast]);

  const markAsRead = async (id) => {
    try {
      const res = await api.patch(`notifications/${id}/read`);
      if (res.data?.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await api.patch("notifications/read-all");
      if (res.data?.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const res = await api.delete(`notifications/${id}`);
      if (res.data?.success) {
        const deletedWasUnread = !notifications.find((n) => n._id === id)
          ?.isRead;
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        if (deletedWasUnread) setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        refreshNotifications: fetchNotifications,
        pendingDoctorCount,
        refreshPendingDoctorCount: fetchPendingDoctorCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
