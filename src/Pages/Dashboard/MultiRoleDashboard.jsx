import React, { useState, useEffect } from 'react';
import DynamicSidebar from '../../componenets/dashboard/DynamicSidebar';
import Header from '../../componenets/dashboard/Header';
import PatientDashboard from '../../componenets/dashboard/PatientDashboard';
import DoctorDashboard from '../../componenets/dashboard/DoctorDashboard';
import AdminDashboard from '../../componenets/dashboard/AdminDashboard';
import PharmacyDashboard from '../../componenets/dashboard/PharmacyDashboard';
import LabDashboard from '../../componenets/dashboard/LabDashboard';
import XRayDashboard from '../../componenets/dashboard/XRayDashboard';
import UserManagement from '../../componenets/dashboard/UserManagement';
import AppointmentModal from '../../componenets/dashboard/AppointmentModal';
import { useNavigate } from 'react-router-dom';

export default function MultiRoleDashboard() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage or token
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else if (token) {
      // Fetch user data from API
      fetchUserData(token);
    } else {
      // Redirect to login if no token
      navigate('/login');
    }
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

  const handleNavigate = (item) => {
    setActiveItem(item);
  };

  const renderDashboardContent = () => {
    if (!user) {
      return <div className="flex items-center justify-center h-64">Loading...</div>;
    }

    // Handle navigation items
    if (activeItem === 'users' && user.role === 'admin') {
      return <UserManagement />;
    }

    if (activeItem === 'create-user' && user.role === 'admin') {
      return <UserManagement />;
    }

    // Render role-specific dashboard
    switch (user.role) {
      case 'patient':
        return (
          <PatientDashboard 
            onNewAppointment={() => setIsAppointmentModalOpen(true)} 
          />
        );
      case 'doctor':
        return <DoctorDashboard />;
      case 'admin':
      case 'super_admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'pharmacy_salesperson':
        return <PharmacyDashboard />;
      case 'lab_counter':
        return <LabDashboard />;
      case 'xray_counter':
        return <XRayDashboard />;
      default:
        return <div>Unknown role: {user.role}</div>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F74AA] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans flex">
      {/* Dynamic Sidebar */}
      <DynamicSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onLogout={handleLogout}
        userRole={user.role}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          ></div>
        )}

        {/* Header */}
        <Header 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          user={user}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {renderDashboardContent()}
        </main>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal 
        visible={isAppointmentModalOpen}
        onCancel={() => setIsAppointmentModalOpen(false)}
        onOk={(data) => {
          console.log('Appointment confirmed:', data);
          setIsAppointmentModalOpen(false);
        }}
      />
    </div>
  );
}


