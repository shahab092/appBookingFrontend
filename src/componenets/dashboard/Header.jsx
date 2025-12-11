// src/components/Header.jsx
import React from 'react';
import { FiMenu, FiBell } from 'react-icons/fi';

const Header = ({ toggleSidebar, user }) => {
  const userAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=2F74AA&color=fff`;
  const userName = user?.name || 'User';
  const userRole = user?.role ? user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

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
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-[#2F74AA] transition-colors hidden lg:block">
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-bold text-[#2F74AA] hidden sm:block">Dashboard</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <button className="relative text-gray-600 hover:text-[#2F74AA] transition-colors">
          <FiBell size={22} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
        </button>

        <div className="flex items-center gap-3">
          <img 
            src={userAvatar}
            alt="User Avatar" 
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          <div className="hidden md:block">
            <span className="font-semibold text-gray-700 block">{userName}</span>
            <span className="text-xs text-gray-500">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;