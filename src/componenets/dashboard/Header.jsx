import React, { useState } from "react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import NotificationPanel from "./NotificationPanel";
import UserDropdown from "./UserDropdown";
import { useNotifications } from "../../context/NotificationContext";

const Header = ({ toggleSidebar, user }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const userAvatar =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}&background=2F74AA&color=fff`;
  const userName = user?.name || "User";
  const userRole = user?.role
    ? user.role.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile/Tablet Menu Button (hidden on large screens) */}
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-[#2F74AA] transition-colors lg:hidden"
        >
          <FiMenu size={24} />
        </button>
        {/* Desktop Sidebar Toggle Button (hidden on small screens) */}
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-[#2F74AA] transition-colors hidden lg:block"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-bold text-[#2F74AA] hidden sm:block">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsUserOpen(false);
            }}
            className={`relative p-2 rounded-full transition-all duration-200 ${
              isNotifOpen
                ? "bg-blue-50 text-[#2F74AA]"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#2F74AA]"
            }`}
          >
            <FiBell size={22} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          <NotificationPanel
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setIsUserOpen(!isUserOpen);
              setIsNotifOpen(false);
            }}
            className={`flex items-center gap-3 p-1 pr-3 rounded-xl transition-all duration-200 ${
              isUserOpen ? "bg-blue-50 shadow-sm" : "hover:bg-gray-50"
            }`}
          >
            <div className="relative">
              <img
                src={userAvatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="hidden md:flex flex-col items-start leading-tight">
              <span
                className={`font-bold text-sm ${
                  isUserOpen ? "text-[#2F74AA]" : "text-gray-700"
                }`}
              >
                {userName}
              </span>
              <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">
                {userRole}
              </span>
            </div>
            <FiChevronDown
              className={`text-gray-400 transition-transform duration-200 hidden md:block ${
                isUserOpen ? "rotate-180 text-[#2F74AA]" : ""
              }`}
            />
          </button>

          <UserDropdown
            user={user}
            isOpen={isUserOpen}
            onClose={() => setIsUserOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
