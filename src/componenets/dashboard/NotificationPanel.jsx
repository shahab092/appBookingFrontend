import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBell,
  FiCheckCircle,
  FiInfo,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { formatDistanceToNow } from "date-fns";

const getIcon = (type) => {
  switch (type) {
    case "success":
      return <FiCheckCircle className="text-green-500" />;
    case "warning":
      return <FiAlertCircle className="text-yellow-500" />;
    case "error":
      return <FiAlertCircle className="text-red-500" />;
    case "info":
      return <FiInfo className="text-blue-500" />;
    default:
      return <FiBell className="text-gray-500" />;
  }
};

const NotificationPanel = ({ isOpen, onClose }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } =
    useNotifications();
  const navigate = useNavigate();

  const handleNotifClick = (notif) => {
    if (!notif.isRead) {
      markAsRead(notif._id);
    }
    if (notif.link) {
      navigate(notif.link);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-20 md:hidden" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-30 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FiBell className="text-[#2F74AA]" /> Notifications
                {unreadCount > 0 && (
                  <span className="bg-[#2F74AA] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {loading && notifications.length === 0 ? (
                <div className="p-8 text-center flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2F74AA] mb-3"></div>
                  <p className="text-gray-500 text-sm">Loading...</p>
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif._id}
                    onClick={() => handleNotifClick(notif)}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${
                      !notif.isRead ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="mt-1 text-lg">{getIcon(notif.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span
                          className={`text-sm font-semibold ${
                            !notif.isRead ? "text-gray-900" : "text-gray-600"
                          }`}
                        >
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase font-medium">
                          {notif.createdAt
                            ? formatDistanceToNow(new Date(notif.createdAt), {
                                addSuffix: true,
                              })
                            : "just now"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                    {!notif.isRead && (
                      <div className="w-2 h-2 bg-[#2F74AA] rounded-full mt-2" />
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <FiBell size={40} className="mx-auto text-gray-200 mb-3" />
                  <p className="text-gray-500 text-sm">No notifications yet</p>
                </div>
              )}
            </div>

            {notifications.length > 0 && unreadCount > 0 && (
              <div className="p-3 border-t border-gray-100 text-center bg-gray-50/50">
                <button
                  onClick={markAllAsRead}
                  className="text-sm font-semibold text-[#2F74AA] hover:text-[#255d8a] transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
