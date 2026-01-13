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

      <nav className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-100  fixed top-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-[#2e76ad] to-[#3a8ccc] text-white p-3 rounded-2xl shadow-lg">
                <FaHeartbeat className="text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2e76ad] to-[#3a8ccc] bg-clip-text text-transparent">
                  MediCare
                </h1>
                <p className="text-xs text-gray-500 font-medium">
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
                      ? "bg-[#2e76ad] text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-blue-50 hover:text-[#2e76ad] hover:shadow-md"
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
                <div className="w-12 h-12 bg-gradient-to-br from-[#2e76ad] to-[#3a8ccc] rounded-full flex items-center justify-center text-white font-bold text-lg">
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
            <div className="flex items-center space-x-4 lg:hidden">
              {/* User Avatar for Mobile */}
              <button
                onClick={handleUserClick}
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#2e76ad] to-[#3a8ccc] rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
              </button>

              <button
                className="bg-gray-100 hover:bg-[#2e76ad] text-gray-700 hover:text-white p-3 rounded-xl transition-all duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-2">
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
                    className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      activeLink === item.id
                        ? "bg-[#2e76ad] text-white shadow-lg"
                        : "text-gray-700 hover:bg-blue-50 hover:text-[#2e76ad]"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}

                {/* User Section in Mobile Menu */}
                <div className="pt-4 mt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-blue-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2e76ad] to-[#3a8ccc] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsMenuOpen(false);
                    }}
                    className="w-full mt-3 bg-blue-50 text-[#2e76ad] hover:bg-blue-100 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-center"
                  >
                    View Profile
                  </button>

                  {user.isLoggedIn && (
                    <button
                      onClick={handleLogout}
                      className="w-full mt-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-center"
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
