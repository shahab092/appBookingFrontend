import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCheckCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';

const notifications = [
  {
    id: 1,
    title: 'New Appointment',
    message: 'You have a new appointment with Dr. Smith at 10:00 AM.',
    type: 'info',
    time: '5 min ago',
    isRead: false,
  },
  {
    id: 2,
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Jones has been confirmed.',
    type: 'success',
    time: '1 hour ago',
    isRead: true,
  },
  {
    id: 3,
    title: 'Reminder',
    message: 'Don\'t forget your check-up tomorrow at 2:00 PM.',
    type: 'warning',
    time: '2 hours ago',
    isRead: false,
  },
];

const getIcon = (type) => {
  switch (type) {
    case 'success': return <FiCheckCircle className="text-green-500" />;
    case 'warning': return <FiAlertCircle className="text-yellow-500" />;
    case 'info': return <FiInfo className="text-blue-500" />;
    default: return <FiBell className="text-gray-500" />;
  }
};

const NotificationPanel = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile to close on click outside */}
          <div 
            className="fixed inset-0 z-20 md:hidden" 
            onClick={onClose}
          />
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
              </h3>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-blue-50' : ''}`}
                  >
                    <div className="mt-1 text-lg">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-semibold ${!notif.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase font-medium">{notif.time}</span>
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

            <div className="p-3 border-t border-gray-100 text-center bg-gray-50/50">
              <button className="text-sm font-semibold text-[#2F74AA] hover:text-[#255d8a] transition-colors">
                Mark all as read
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
