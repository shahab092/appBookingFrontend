import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/AuthSlice";
import { useToast } from "../../context/ToastContext";

const UserDropdown = ({ user, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = () => {
    dispatch(logout());
    showToast("Logged out successfully. See you soon!", "info");
    navigate("/");
    onClose();
  };

  const menuItems = [
    { icon: <FiUser />, label: "My Profile", path: "/dashboard/profile" },
    { icon: <FiSettings />, label: "Settings", path: "/dashboard/settings" },
  ];

  const userAvatar =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=2F74AA&color=fff`;
  const userName = user?.name || "User";
  const userRole = user?.role
    ? user.role.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={onClose} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-30 overflow-hidden"
            >
              {/* User Info Header */}
              <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                <img
                  src={userAvatar}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                />
                <div className="overflow-hidden">
                  <p className="font-bold text-gray-800 truncate">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userRole}</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#2F74AA] rounded-lg transition-all duration-200"
                  >
                    <span className="text-lg opacity-70">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Logout Button */}
              <div className="p-2 border-t border-gray-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <span className="text-lg opacity-70">
                    <FiLogOut />
                  </span>
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
