import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaHeartbeat, FaUserMd, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import DoctorRegistrationModal from "./DoctorRegistrationModal";
import LoginModal from "../common/LoginModal";

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const roleMenuRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data - replace with actual user data from your auth context
  const user = {
    name: "John Doe",
    email: "john@example.com",
    isLoggedIn: false,
  };

  const handleUserClick = () => {
    if (user.isLoggedIn) {
      navigate("/profile");
    } else {
      setShowRoleMenu(true);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowRoleMenu(false);
    setShowLoginModal(true);
  };

  // Close role menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target)) {
        setShowRoleMenu(false);
      }
    };

    if (showRoleMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRoleMenu]);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  // Define navigation items with routes
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctorSearch" },
    { name: "Hospitals", path: "/hospitals" },
    { name: "Order Medicines", path: "/order-medicines" },
    { name: "Lab ", path: "/tests" },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-md z-50 border-b border-gray-100 sticky top-0">
        <div className="px-3 sm:px-4">
          <div className="flex justify-between items-center py-1.5 sm:py-2">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-white p-1.5 sm:p-2 rounded-lg shadow-md shrink-0">
                <FaHeartbeat className="text-base sm:text-xl" />
              </div>
              <NavLink
                to="/"
                className="min-w-0 hover:opacity-90 transition-opacity"
              >
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-primary truncate">
                  MediCare
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium hidden sm:block">
                  Trusted Healthcare
                </p>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 items-center ml-6 space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition-all duration-200 relative group ${
                      isActive
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    }`
                  }
                  end={item.path === "/"}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item.name}</span>
                      {/* Bottom border for active state */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-[2px] transform origin-left transition-all duration-300 ${
                          isActive
                            ? "scale-x-100 bg-primary"
                            : "scale-x-0 group-hover:scale-x-100 group-hover:bg-primary/50"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Navigation / Auth Buttons */}
            <div className="hidden lg:flex items-center ml-3 space-x-3">
              {user.isLoggedIn ? (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-primary/5 ${
                      isActive
                        ? "bg-primary/5 border-b-[2px] border-primary"
                        : ""
                    }`
                  }
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden xl:flex flex-col items-start">
                    <span className="text-xs font-semibold text-gray-800">
                      {user.name}
                    </span>
                    <span className="text-[9px] text-primary font-medium uppercase tracking-wider">
                      Account
                    </span>
                  </div>
                </NavLink>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowDoctorModal(true)}
                    className="text-xs font-medium text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors duration-200 border border-primary/20"
                  >
                    Join as Doctor
                  </button>
                  <div className="relative" ref={roleMenuRef}>
                    <button
                      onClick={() => setShowRoleMenu(!showRoleMenu)}
                      className="bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    >
                      Login
                    </button>

                    {/* Role Selection Dropdown */}
                    {showRoleMenu && (
                      <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-2.5 bg-gradient-to-r from-primary/5 to-blue-50 border-b border-gray-100">
                          <p className="text-xs font-bold text-gray-800">
                            Select Your Role
                          </p>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            Choose how you want to continue
                          </p>
                        </div>
                        <div className="p-1.5">
                          <button
                            onClick={() => handleRoleSelect("patient")}
                            className="w-full flex items-center gap-2 p-2 rounded hover:bg-primary/5 transition-colors duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <FaUser className="text-blue-600" size={14} />
                            </div>
                            <div className="text-left">
                              <p className="font-semibold text-gray-800 text-xs">
                                Patient
                              </p>
                              <p className="text-[10px] text-gray-500">
                                Book appointments
                              </p>
                            </div>
                          </button>
                          <button
                            onClick={() => handleRoleSelect("doctor")}
                            className="w-full flex items-center gap-2 p-2 rounded hover:bg-green-50 transition-colors duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                              <FaUserMd className="text-green-600" size={14} />
                            </div>
                            <div className="text-left">
                              <p className="font-semibold text-gray-800 text-xs">
                                Doctor
                              </p>
                              <p className="text-[10px] text-gray-500">
                                Manage patients
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              {/* User Avatar for Mobile */}
              <button
                onClick={handleUserClick}
                className="flex items-center space-x-1"
              >
                <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {user.name.charAt(0)}
                </div>
              </button>

              <button
                className="bg-gray-100 hover:bg-primary text-gray-700 hover:text-white p-1.5 sm:p-2 rounded-lg transition-all duration-200 shrink-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <FaTimes size={14} className="sm:w-4 sm:h-4" />
                ) : (
                  <FaBars size={14} className="sm:w-4 sm:h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 py-2">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 relative ${
                        isActive
                          ? "text-primary pl-4 border-l-[3px] border-primary"
                          : "text-gray-700 hover:text-primary hover:pl-4 hover:border-l-[3px] hover:border-primary/50"
                      }`
                    }
                    end={item.path === "/"}
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* User Section in Mobile Menu */}
                <div className="pt-2 mt-1 border-t border-gray-200">
                  {user.isLoggedIn ? (
                    <>
                      <div className="flex items-center space-x-2 px-3 py-1.5 bg-primary/5 rounded-lg">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-xs truncate">
                            {user.name}
                          </p>
                          <p className="text-[9px] text-primary font-semibold uppercase tracking-wider">
                            Patient Account
                          </p>
                        </div>
                      </div>

                      <NavLink
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `w-full mt-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 text-center block ${
                            isActive
                              ? "bg-primary text-white"
                              : "bg-primary/5 text-primary hover:bg-primary/10"
                          }`
                        }
                      >
                        View Profile
                      </NavLink>

                      <button
                        onClick={handleLogout}
                        className="w-full mt-1 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 text-center"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-1 px-1">
                      <button
                        onClick={() => {
                          setShowDoctorModal(true);
                          setIsMenuOpen(false);
                        }}
                        className="text-xs font-medium text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors duration-200 border border-primary/20"
                      >
                        Join as Doctor
                      </button>
                      <button
                        onClick={() => {
                          setShowLoginModal(true);
                          setIsMenuOpen(false);
                        }}
                        className="bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                      >
                        Login / Sign up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <DoctorRegistrationModal
        visible={showDoctorModal}
        onCancel={() => setShowDoctorModal(false)}
      />

      <LoginModal
        visible={showLoginModal}
        onCancel={() => {
          setShowLoginModal(false);
          setSelectedRole(null);
        }}
        selectedRole={selectedRole}
      />
    </>
  );
};

export default TopBar;
