import React, { useState, useEffect } from "react";
import { FiCalendar, FiActivity, FiHeart, FiX, FiClock, FiMapPin, FiMessageSquare, FiPackage } from "react-icons/fi";
import Sidebar from '../../componenets/dashboard/Sidebar';
import Header from "../../componenets/dashboard/Header";
import AppointmentModal from "../../componenets/dashboard/AppointmentModal";
import { useNavigate } from "react-router-dom";
import UserManagement from "../../componenets/dashboard/UserManagement";

export default function Dashboard() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pendingAppointmentData, setPendingAppointmentData] = useState(null);
  const [hasPendingAppointment, setHasPendingAppointment] = useState(false);
  const [user, setUser] = useState(null);
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();

  // Get user data and check for pending appointments
  useEffect(() => {
    // Get user from localStorage or fetch from API
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else if (token) {
      fetchUserData(token);
    } else {
      navigate('/login');
    }
    
    checkForPendingAppointments();
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  const checkForPendingAppointments = () => {
    try {
      const pendingBookings = JSON.parse(localStorage.getItem('pendingBookings')) || [];
      
      if (pendingBookings.length > 0) {
        // Get the most recent pending appointment
        const mostRecentAppointment = pendingBookings[0]; // Assuming latest is first
        setPendingAppointmentData(mostRecentAppointment);
        setHasPendingAppointment(true);
        
        // Auto-open modal after a short delay (to allow dashboard to render)
        setTimeout(() => {
          setIsAppointmentModalOpen(true);
          console.log('Auto-opening appointment modal with saved data:', mostRecentAppointment);
        }, 500); // Small delay for better UX
      }
    } catch (error) {
      console.error('Error checking pending appointments:', error);
    }
  };

  const handleNewAppointment = () => {
    // Clear any existing pending data when manually opening new appointment
    setPendingAppointmentData(null);
    setHasPendingAppointment(false);
    setIsAppointmentModalOpen(true);
  };

  const handleConfirmAppointment = (appointmentData) => {
    console.log('Appointment confirmed:', appointmentData);
    
    // If this was a pending appointment from localStorage, remove it
    if (hasPendingAppointment && pendingAppointmentData) {
      removePendingAppointmentFromStorage();
    }
    
    setIsAppointmentModalOpen(false);
    setPendingAppointmentData(null);
    setHasPendingAppointment(false);
    
    // Here you would typically update the state with the new appointment
    alert('Appointment scheduled successfully!');
  };

  const handleCloseModal = () => {
    setIsAppointmentModalOpen(false);
    
    // Only clear pending data if user explicitly closes without confirming
    if (hasPendingAppointment) {
      // Optionally: Ask user if they want to keep or discard the pending appointment
      const keepData = confirm('You have an unsaved appointment. Would you like to keep it for later?');
      
      if (!keepData) {
        removePendingAppointmentFromStorage();
        setPendingAppointmentData(null);
        setHasPendingAppointment(false);
      }
    }
  };

  const removePendingAppointmentFromStorage = () => {
    try {
      const pendingBookings = JSON.parse(localStorage.getItem('pendingBookings')) || [];
      
      if (pendingBookings.length > 0 && pendingAppointmentData) {
        // Remove the specific pending appointment
        const updatedBookings = pendingBookings.filter(
          booking => booking.id !== pendingAppointmentData.id
        );
        
        localStorage.setItem('pendingBookings', JSON.stringify(updatedBookings));
        console.log('Pending appointment removed from localStorage');
      }
    } catch (error) {
      console.error('Error removing pending appointment:', error);
    }
  };

  // Render role-specific content
  const renderRoleContent = () => {
    if (!user) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F74AA] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    // Handle navigation items
    if (activeItem === 'users' && (user.role === 'admin' || user.role === 'super_admin')) {
      return <UserManagement />;
    }

    if (activeItem === 'create-user' && (user.role === 'admin' || user.role === 'super_admin')) {
      return <UserManagement />;
    }

    // For other roles or default, show the original patient dashboard UI
    // You can add role-specific content here later if needed
    return (
      <>
        {/* Notification for pending appointment */}
        {hasPendingAppointment && !isAppointmentModalOpen && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FiCalendar className="text-yellow-600 text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800">Saved Appointment Found!</h4>
                  <p className="text-sm text-yellow-700">
                    You have an unsaved appointment from {pendingAppointmentData?.appointmentDate}. 
                    Click below to complete it.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
              >
                Complete Appointment
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Enhanced Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2F74AA]">Appointment Schedule</h2>
                  <p className="text-sm text-gray-500 font-medium mt-1">You have 3 upcoming appointments</p>
                </div>
                {(user.role === 'patient' || !user.role) && (
                  <button 
                    onClick={handleNewAppointment}
                    className="bg-gradient-to-r from-[#2F74AA] to-[#3a8ccc] hover:from-[#256a9a] hover:to-[#2d7bb8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <FiCalendar className="text-lg" />
                    New Appointment
                  </button>
                )}
              </div>

              {/* Enhanced Appointment Cards */}
              <div className="space-y-4">
                {/* Appointment 1 - Enhanced */}
                <div className="border-l-4 border-l-green-400 rounded-lg p-4 bg-gradient-to-r from-green-50 to-white shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <h3 className="font-bold text-gray-900 text-lg">Annual Physical Exam</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#2F74AA] mb-3">
                        <div className="flex items-center gap-1">
                          <FiClock className="text-[#2F74AA]" />
                          <span>Mon, Oct 28, 2024 - 10:30 AM</span>
                        </div>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <div className="flex items-center gap-1">
                          <FiMapPin className="text-[#2F74AA]" />
                          <span>Dr. Evelyn Reed (Cardiology)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-[#2F74AA] border border-blue-200">
                          In-Clinic
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 text-sm bg-white border border-[#2F74AA] text-[#2F74AA] rounded-lg font-semibold hover:bg-[#2F74AA] hover:text-white transition-all duration-200 flex items-center gap-2 shadow-sm">
                          <FiCalendar className="text-sm" />
                          Reschedule
                        </button>
                        <button className="px-4 py-2 text-sm bg-white border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center gap-2 shadow-sm">
                          <FiX className="text-sm" />
                          Cancel
                        </button>
                      </div>
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300">
                        ✅ Confirmed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Appointment 2 - Enhanced */}
                <div className="border-l-4 border-l-yellow-400 rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-white shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <h3 className="font-bold text-gray-900 text-lg">Follow-up Consultation</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#2F74AA] mb-3">
                        <div className="flex items-center gap-1">
                          <FiClock className="text-[#2F74AA]" />
                          <span>Wed, Nov 06, 2024 - 2:00 PM</span>
                        </div>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <div className="flex items-center gap-1">
                          <FiMapPin className="text-[#2F74AA]" />
                          <span>Dr. Ben Carter (Dermatology)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                          💻 Online
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 text-sm bg-white border border-[#2F74AA] text-[#2F74AA] rounded-lg font-semibold hover:bg-[#2F74AA] hover:text-white transition-all duration-200 flex items-center gap-2 shadow-sm">
                          <FiCalendar className="text-sm" />
                          Reschedule
                        </button>
                        <button className="px-4 py-2 text-sm bg-white border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center gap-2 shadow-sm">
                          <FiX className="text-sm" />
                          Cancel
                        </button>
                      </div>
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                        ⏳ Pending Confirmation
                      </span>
                    </div>
                  </div>
                </div>

                {/* Appointment 3 - Enhanced */}
                <div className="border-l-4 border-l-red-400 rounded-lg p-4 bg-gradient-to-r from-red-50 to-white shadow-sm hover:shadow-md transition-all duration-200 opacity-80">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <h3 className="font-bold text-gray-900 text-lg line-through">Dermatology Check-up</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#2F74AA] mb-3 opacity-70">
                        <div className="flex items-center gap-1">
                          <FiClock className="text-[#2F74AA]" />
                          <span>Fri, Nov 15, 2024 - 9:00 AM</span>
                        </div>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <div className="flex items-center gap-1">
                          <FiMapPin className="text-[#2F74AA]" />
                          <span>Dr. Chloe Davis (Dermatology)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-[#2F74AA] border border-blue-200 opacity-70">
                          In-Clinic
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 text-sm bg-white border border-[#2F74AA] text-[#2F74AA] rounded-lg font-semibold hover:bg-[#2F74AA] hover:text-white transition-all duration-200 flex items-center gap-2 shadow-sm opacity-70">
                          <FiCalendar className="text-sm" />
                          Reschedule
                        </button>
                        <button className="px-4 py-2 text-sm bg-white border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center gap-2 shadow-sm opacity-70">
                          <FiX className="text-sm" />
                          Cancel
                        </button>
                      </div>
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
                        ❌ Cancelled by Clinic
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Activity with Links */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

              <div className="space-y-3">
                {/* Activity 1 with Link */}
                <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FiActivity className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">New lab results are available</h4>
                      <p className="text-sm text-gray-600">Blood Panel - Oct 23, 2024</p>
                    </div>
                  </div>
                  <a href="#" className="text-sm text-[#2F74AA] hover:underline font-medium">
                    View Results
                  </a>
                </div>

                {/* Activity 2 with Link */}
                <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiMessageSquare className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Message from Dr. Evelyn Reed</h4>
                      <p className="text-sm text-gray-600">Oct 22, 2024</p>
                    </div>
                  </div>
                  <a href="#" className="text-sm text-[#2F74AA] hover:underline font-medium">
                    Read Message
                  </a>
                </div>

                {/* Activity 3 with Link */}
                <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiPackage className="text-purple-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Prescription refill is ready</h4>
                      <p className="text-sm text-gray-600">Metformin - Ready for pickup</p>
                    </div>
                  </div>
                  <a href="#" className="text-sm text-[#2F74AA] hover:underline font-medium">
                    View Details
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enhanced Patient Vitals & Demographics */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#3a8ccc]">Patient Vitals & Demographics</h2>
                <FiActivity className="text-[#3a8ccc] text-lg" />
              </div>

              {/* Enhanced Vitals Cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-3 border border-blue-200 rounded-lg bg-blue-50/30">
                  <div className="text-xl font-bold text-[#3a8ccc]">42</div>
                  <div className="text-sm text-gray-600">Age</div>
                </div>
                <div className="text-center p-3 border border-green-200 rounded-lg bg-green-50/30">
                  <div className="text-xl font-bold text-green-600">165 cm</div>
                  <div className="text-sm text-gray-600">Height</div>
                </div>
                <div className="text-center p-3 border border-purple-200 rounded-lg bg-purple-50/30">
                  <div className="text-xl font-bold text-purple-600">78 kg</div>
                  <div className="text-sm text-gray-600">Weight</div>
                </div>
                <div className="text-center p-3 border border-orange-200 rounded-lg bg-orange-50/30">
                  <div className="text-xl font-bold text-orange-600">1.87 m²</div>
                  <div className="text-sm text-gray-600">BSA</div>
                </div>
              </div>

              {/* Last Vitals */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <FiHeart className="text-red-500" />
                  <h3 className="font-medium">Last Vitals (Oct 22)</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-gray-600 text-sm">Blood Pressure:</span>
                    <span className="font-medium text-gray-900">130/85 mmHg</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-gray-600 text-sm">Heart Rate:</span>
                    <span className="font-medium text-gray-900">72 bpm</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-gray-600 text-sm">Temperature:</span>
                    <span className="font-medium text-gray-900">37.0°C</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 py-2 px-3 border border-[#3a8ccc] bg-white text-[#3a8ccc] rounded text-sm font-medium hover:bg-blue-50 transition-colors">
                    ECG Report
                  </button>
                  <button className="flex-1 py-2 px-3 border border-[#3a8ccc] bg-white text-[#3a8ccc] rounded text-sm font-medium hover:bg-blue-50 transition-colors">
                    EEG Report
                  </button>
                </div>
              </div>
            </section>

            {/* Medical Summary */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Medical Summary</h2>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Conditions</h4>
                  <p className="text-gray-600">Type 2 Diabetes, Hypertension</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Allergies</h4>
                  <p className="text-gray-600">Penicillin</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Last Vitals (Oct 22)</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Blood Pressure: 130/85 mmHg</li>
                    <li>Heart Rate: 72 bpm</li>
                  </ul>
                </div>
              </div>

              <button className="w-full mt-4 py-2 px-4 border border-[#3a8ccc] bg-white text-[#3a8ccc] rounded font-medium hover:bg-blue-50 transition-colors">
                View Full Records
              </button>
            </section>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans flex">
      {/* --- Sidebar --- */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onLogout={handleLogout}
        userRole={user?.role}
      />

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"></div>}

      {/* Column 1: Sidebar */}
      
        {/* Header */}
        <Header 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          user={user}
        />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {renderRoleContent()}
        </main>
      </div>

      {/* Appointment Modal - Pass pending data */}
      <AppointmentModal 
        visible={isAppointmentModalOpen}
        onCancel={handleCloseModal}
        onOk={handleConfirmAppointment}
      />
    </div>
  );
}