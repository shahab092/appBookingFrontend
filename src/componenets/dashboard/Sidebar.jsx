// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <>
      {/* Overlay for mobile */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"></div>

      <aside 
        className={`bg-gradient-to-b from-white via-blue-50 to-white border-r border-gray-200 shadow-lg flex flex-col fixed lg:sticky top-0 h-screen z-30 translate-x-0 w-72 lg:translate-x-0 lg:w-20`}
      >
        {/* Logo & Hospital Name */}
        <div className={`p-6 border-b border-gray-200 flex items-center gap-3 justify-center lg:justify-center`}>
          <span className="text-3xl text-[#2e76ad] font-extrabold flex-shrink-0">🧠</span>
          <h1 className={`text-xl font-bold text-[#2e76ad] tracking-wide whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-100 w-auto lg:opacity-0 lg:w-0`}>Ashfaq Psychiatric<br></br> Hospital</h1>
        </div>

        {/* Role Badge */}
        <div className={`px-6 py-2 px-2 lg:px-2`}>
          <div className={`bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-center px-1 lg:px-1`}>
            <span className="block lg:hidden">Doctor</span>
            <span className="hidden lg:block">👤</span>
          </div>
        </div>

        {/* Navigation Menu - Doctor Menu */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <button
                className={`w-full flex items-center py-3 rounded-lg transition-all duration-200 font-medium gap-3 bg-gradient-to-r from-[#2F74AA] to-[#3a8ccc] text-white shadow-lg px-4 text-left lg:px-0 lg:justify-center`}
              >
                <span className={`text-xl flex-shrink-0`}>📊</span>
                <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-100 w-auto lg:opacity-0 lg:w-0`}>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center py-3 rounded-lg transition-all duration-200 font-medium gap-3 text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-4 text-left lg:px-0 lg:justify-center`}
              >
                <span className={`text-xl flex-shrink-0 text-blue-600`}>📅</span>
                <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-100 w-auto lg:opacity-0 lg:w-0`}>My Appointments</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center py-3 rounded-lg transition-all duration-200 font-medium gap-3 text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-4 text-left lg:px-0 lg:justify-center`}
              >
                <span className={`text-xl flex-shrink-0 text-blue-600`}>👥</span>
                <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-100 w-auto lg:opacity-0 lg:w-0`}>My Patients</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center py-3 rounded-lg transition-all duration-200 font-medium gap-3 text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-4 text-left lg:px-0 lg:justify-center`}
              >
                <span className={`text-xl flex-shrink-0 text-blue-600`}>💊</span>
                <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-100 w-auto lg:opacity-0 lg:w-0`}>Prescriptions</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center py-3 rounded-lg transition-all duration-200 font-medium gap-3 text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-4 text-left lg:px-0 lg:justify-center`}
              >
                <span className={`text-xl flex-shrink-0 text-blue-600`}>✉️</span>
                <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-100 w-auto lg:opacity-0 lg:w-0`}>Messages</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center py-3 rounded-lg transition-all duration-200 font-medium gap-3 text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-4 text-left lg:px-0 lg:justify-center`}
              >
                <span className={`text-xl flex-shrink-0 text-blue-600`}>📄</span>
                <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-100 w-auto lg:opacity-0 lg:w-0`}>Reports</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center py-3 rounded-lg transition-all duration-200 font-medium gap-3 text-gray-700 hover:bg-blue-100 hover:text-blue-700 px-4 text-left lg:px-0 lg:justify-center`}
              >
                <span className={`text-xl flex-shrink-0 text-blue-600`}>⚙️</span>
                <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-100 w-auto lg:opacity-0 lg:w-0`}>Settings</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="px-6 py-2">
          <hr className="border-gray-300" />
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button 
            className={`w-full flex items-center gap-3 py-3 text-gray-700 rounded-lg bg-red-50 hover:bg-red-100 hover:text-red-700 font-semibold shadow transition-all px-4 lg:justify-center`}
          >
            <span className="text-xl flex-shrink-0">🚪</span>
            <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 opacity-100 w-auto lg:opacity-0 lg:w-0`}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;