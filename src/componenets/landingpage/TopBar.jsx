import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaUser,
  FaBars,
  FaTimes,
  FaHeartbeat,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DoctorRegistrationModal from "./DoctorRegistrationModal";

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("findDoctors");
  const navigate = useNavigate();
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  // Mock user data - replace with actual user data from your auth context
  const user = {
    name: "John Doe",
    email: "john@example.com",
    isLoggedIn: true, // Change this based on authentication status
  };

  const handleUserClick = () => {
    if (user.isLoggedIn) {
      // Navigate to user profile or show simple dropdown
      //   navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return (
    <>
      {/* Top Info Bar */}
      {/* <div className="bg-[#2e76ad] text-white py-2 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            
            <div className="flex flex-wrap justify-center md:justify-start items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                <FaPhone className="text-blue-200" size={12} />
                <span className="text-blue-50">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                <FaEnvelope className="text-blue-200" size={12} />
                <span className="text-blue-50">info@healthcare.com</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              {user.isLoggedIn ? (
                <button
                  onClick={handleUserClick}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <FaUserCircle className="text-[#2e76ad]" size={18} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white text-sm font-medium">
                      {user.name}
                    </span>
                    <span className="text-blue-200 text-xs">View Profile</span>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all duration-200 group"
                >
                  <FaUser
                    size={14}
                    className="text-blue-200 group-hover:text-white"
                  />
                  <span className="text-blue-50 group-hover:text-white text-sm">
                    Login / Signup
                  </span>
                </button>
              )}
            </div>

          
            <div className="md:hidden">
              <button
                onClick={() => navigate("/login")}
                className="text-white text-sm font-medium"
              >
                {user.isLoggedIn ? user.name : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Navigation Bar */}

      <nav className="bg-white shadow-xl z-50 border-b border-gray-100">
        <div className="px-3 sm:px-4">
          <div className="flex justify-between items-center py-2 sm:py-3">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-primary text-white p-2 sm:p-3 rounded-lg sm:rounded-2xl shadow-lg flex-shrink-0">
                <FaHeartbeat className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary truncate">
                  MediCare
                </h1>
                <p className="text-xs text-gray-500 font-medium hidden sm:block">
                  Trusted Healthcare
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 items-center ml-8 space-x-1">
              {/* Navigation items aligned to left */}
              {[
                { name: "Find Doctors", id: "findDoctors" },
                { name: "Hospitals", id: "hospitals" },
                { name: "Medicines", id: "medicines" },
                { name: "Lab Tests", id: "labTests" },
                // { name: "Contact", id: "contact" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveLink(item.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    activeLink === item.id
                      ? "bg-primary text-white shadow-lg transform scale-105"
                      : "text-neutral-dark hover:bg-primary/5 hover:text-primary hover:shadow-md"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* User Avatar at the end (right side) */}
            <div className="hidden lg:flex items-center ml-4">
              <button
                onClick={handleUserClick}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden xl:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-800">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:hidden">
              {/* User Avatar for Mobile */}
              <button
                onClick={handleUserClick}
                className="flex items-center space-x-1 sm:space-x-2"
              >
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
              </button>

              <button
                className="bg-neutral-light hover:bg-primary text-neutral-dark hover:text-white p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-200 flex-shrink-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes size={18} className="sm:w-5 sm:h-5" /> : <FaBars size={18} className="sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 py-3 sm:py-4">
              <div className="flex flex-col space-y-1 sm:space-y-2">
                {[
                  { name: "Find Doctors", id: "findDoctors" },
                  { name: "Hospitals", id: "hospitals" },
                  { name: "Medicines", id: "medicines" },
                  { name: "Lab Tests", id: "labTests" },
                  { name: "Contact", id: "contact" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveLink(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 ${
                      activeLink === item.id
                        ? "bg-primary text-white shadow-lg"
                        : "text-neutral-dark hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}

                {/* User Section in Mobile Menu */}
                <div className="pt-3 sm:pt-4 mt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-blue-50 rounded-lg sm:rounded-xl">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{user.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsMenuOpen(false);
                    }}
                    className="w-full mt-2 sm:mt-3 bg-primary/5 text-primary hover:bg-primary/10 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-200 text-center"
                  >
                    View Profile
                  </button>

                  {user.isLoggedIn && (
                    <button
                      onClick={handleLogout}
                      className="w-full mt-2 bg-red-50 text-red-600 hover:bg-red-100 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-200 text-center"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <DoctorRegistrationModal
        visible={showDoctorModal}
        onCancel={() => setShowDoctorModal(false)}
        onOk={() => setShowDoctorModal(false)}
      />
    </>
  );
};

export default TopBar;
