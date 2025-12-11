// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeItem, setActiveItem, onLogout, userRole }) => {
  // Define menu items based on role
  const getMenuItems = () => {
    const roleMenus = {
      patient: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'appointments', icon: '📅', label: 'Appointments' },
        { id: 'records', icon: '📁', label: 'My Records' },
        { id: 'prescriptions', icon: '💊', label: 'Prescriptions' },
        { id: 'messages', icon: '✉️', label: 'Messages' },
        { id: 'billing', icon: '💰', label: 'Billing' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
      ],
      doctor: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'appointments', icon: '📅', label: 'My Appointments' },
        { id: 'patients', icon: '👥', label: 'My Patients' },
        { id: 'prescriptions', icon: '💊', label: 'Prescriptions' },
        { id: 'messages', icon: '✉️', label: 'Messages' },
        { id: 'reports', icon: '📄', label: 'Reports' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
      ],
      admin: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'users', icon: '👥', label: 'User Management' },
        { id: 'create-user', icon: '➕', label: 'Create User' },
        { id: 'appointments', icon: '📅', label: 'All Appointments' },
        { id: 'reports', icon: '📈', label: 'Reports & Analytics' },
        { id: 'settings', icon: '⚙️', label: 'System Settings' },
      ],
      pharmacy_salesperson: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'prescriptions', icon: '💊', label: 'Prescriptions' },
        { id: 'sales', icon: '🛒', label: 'Sales' },
        { id: 'inventory', icon: '📦', label: 'Inventory' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
      ],
      lab_counter: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'tests', icon: '🧪', label: 'Lab Tests' },
        { id: 'results', icon: '📄', label: 'Test Results' },
        { id: 'reports', icon: '📈', label: 'Reports' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
      ],
      xray_counter: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'scans', icon: '📷', label: 'X-Ray Scans' },
        { id: 'results', icon: '📄', label: 'Scan Results' },
        { id: 'reports', icon: '📈', label: 'Reports' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
      ],
    };

    return roleMenus[userRole] || roleMenus.patient;
  };

  const menuItems = getMenuItems();

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // On smaller screens, close the sidebar after an item is clicked
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside 
        className={`bg-gradient-to-b from-white via-blue-50 to-white border-r border-gray-200 shadow-lg flex flex-col transition-transform duration-300 ease-in-out 
                   fixed lg:sticky top-0 h-screen z-30 
                   ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}
      >
        {/* Logo & Hospital Name */}
        <div className={`p-6 border-b border-gray-200 flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
          <span className="text-3xl text-[#2e76ad] font-extrabold flex-shrink-0">🧠</span>
          <h1 className={`text-xl font-bold text-[#2e76ad] tracking-wide whitespace-nowrap overflow-hidden transition-opacity duration-200 ${!isSidebarOpen && 'opacity-0 w-0'}`}>Ashfaq Psychiatric<br></br> Hospital</h1>
        </div>

        {/* Role Badge */}
        {userRole && (
          <div className={`px-6 py-2 ${!isSidebarOpen && 'px-2'}`}>
            <div className={`bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-center ${!isSidebarOpen && 'px-1'}`}>
              {!isSidebarOpen ? (
                <span>👤</span>
              ) : (
                <span className="capitalize">{userRole?.replace('_', ' ')}</span>
              )}
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center py-3 rounded-lg transition-all duration-200 font-medium gap-3
                    ${activeItem === item.id 
                      ? 'bg-gradient-to-r from-[#2F74AA] to-[#3a8ccc] text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'}
                    ${isSidebarOpen ? 'px-4 text-left' : 'px-0 justify-center'}`}
                >
                  <span className={`text-xl flex-shrink-0 ${activeItem !== item.id ? 'text-blue-600' : ''}`}>{item.icon}</span>
                  <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 ${!isSidebarOpen && 'opacity-0 w-0'}`}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-6 py-2">
          <hr className="border-gray-300" />
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-3 py-3 text-gray-700 rounded-lg bg-red-50 hover:bg-red-100 hover:text-red-700 font-semibold shadow transition-all ${isSidebarOpen ? 'px-4' : 'justify-center'}`}
          >
            <span className="text-xl flex-shrink-0">🚪</span>
            <span className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 ${!isSidebarOpen && 'opacity-0 w-0'}`}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;