import React from "react";
import { useNotifications } from "../../context/NotificationContext";
import {
  FiHome,
  FiCalendar,
  FiFileText,
  FiPackage,
  FiMessageSquare,
  FiDollarSign,
  FiSettings,
  FiUsers,
  FiUserPlus,
  FiActivity,
  FiShoppingCart,
  FiDroplet,
  FiX,
  FiBarChart,
  FiShield,
  FiUserCheck,
} from "react-icons/fi";

const DynamicSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeItem,
  setActiveItem,
  onLogout,
  userRole,
}) => {
  const { pendingDoctorCount } = useNotifications();

  // Define menu items based on role
  const getMenuItems = () => {
    const roleMenus = {
      patient: [
        { id: "dashboard", icon: <FiHome />, label: "Dashboard" },
        { id: "appointments", icon: <FiCalendar />, label: "Appointments" },
        { id: "records", icon: <FiFileText />, label: "My Records" },
        { id: "prescriptions", icon: <FiPackage />, label: "Prescriptions" },
        { id: "messages", icon: <FiMessageSquare />, label: "Messages" },
        { id: "billing", icon: <FiDollarSign />, label: "Billing" },
        { id: "settings", icon: <FiSettings />, label: "Settings" },
      ],
      doctor: [
        { id: "dashboard", icon: <FiHome />, label: "Dashboard" },
        { id: "appointments", icon: <FiCalendar />, label: "My Appointments" },
        { id: "patients", icon: <FiUsers />, label: "My Patients" },
        { id: "prescriptions", icon: <FiPackage />, label: "Prescriptions" },
        { id: "messages", icon: <FiMessageSquare />, label: "Messages" },
        { id: "reports", icon: <FiFileText />, label: "Reports" },
        { id: "settings", icon: <FiSettings />, label: "Settings" },
      ],
      admin: [
        { id: "dashboard", icon: <FiHome />, label: "Dashboard" },
        {
          id: "approve-doctors",
          icon: <FiUserCheck />,
          label: "Approve Doctors",
        },
        { id: "doctors", icon: <FiUsers />, label: "Doctors" },
        { id: "billing", icon: <FiDollarSign />, label: "Billing" },
        { id: "users", icon: <FiUsers />, label: "User Management" },
        { id: "create-user", icon: <FiUserPlus />, label: "Create User" },
        { id: "appointments", icon: <FiCalendar />, label: "All Appointments" },
        { id: "reports", icon: <FiBarChart />, label: "Reports & Analytics" },
        { id: "settings", icon: <FiSettings />, label: "System Settings" },
      ],
      pharmacy_salesperson: [
        { id: "dashboard", icon: <FiHome />, label: "Dashboard" },
        { id: "prescriptions", icon: <FiPackage />, label: "Prescriptions" },
        { id: "sales", icon: <FiShoppingCart />, label: "Sales" },
        { id: "inventory", icon: <FiActivity />, label: "Inventory" },
        { id: "settings", icon: <FiSettings />, label: "Settings" },
      ],
      lab_counter: [
        { id: "dashboard", icon: <FiHome />, label: "Dashboard" },
        { id: "tests", icon: <FiDroplet />, label: "Lab Tests" },
        { id: "results", icon: <FiFileText />, label: "Test Results" },
        { id: "reports", icon: <FiBarChart />, label: "Reports" },
        { id: "settings", icon: <FiSettings />, label: "Settings" },
      ],
      xray_counter: [
        { id: "dashboard", icon: <FiHome />, label: "Dashboard" },
        { id: "scans", icon: <FiX />, label: "X-Ray Scans" },
        { id: "results", icon: <FiFileText />, label: "Scan Results" },
        { id: "reports", icon: <FiBarChart />, label: "Reports" },
        { id: "settings", icon: <FiSettings />, label: "Settings" },
      ],
    };

    const menu = roleMenus[userRole] || roleMenus.patient;

    return menu.map((item) => {
      if (item.id === "approve-doctors") {
        return { ...item, badge: pendingDoctorCount };
      }
      return item;
    });
  };

  const menuItems = getMenuItems();

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
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
        className={`bg-linear-to-b from-white via-blue-50 to-white border-r border-gray-200 shadow-lg flex flex-col transition-transform duration-300 ease-in-out 
                   fixed lg:sticky top-0 h-screen z-30 
                   ${isSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0 lg:w-20"}`}
      >
        {/* Logo & Hospital Name */}
        <div
          className={`p-6 border-b border-gray-200 flex items-center gap-3 ${!isSidebarOpen && "justify-center"}`}
        >
          <span className="text-3xl text-[#2e76ad] font-extrabold shrink-0">
            🧠
          </span>
          <h1
            className={`text-xl font-bold text-[#2e76ad] tracking-wide whitespace-nowrap overflow-hidden transition-opacity duration-200 ${!isSidebarOpen && "opacity-0 w-0"}`}
          >
            Ashfaq Psychiatric
            <br />
            Hospital
          </h1>
        </div>

        {/* Role Badge */}
        <div className={`px-6 py-2 ${!isSidebarOpen && "px-2"}`}>
          <div
            className={`bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-center ${!isSidebarOpen && "px-1"}`}
          >
            {!isSidebarOpen ? (
              <FiShield className="mx-auto" />
            ) : (
              <span className="capitalize">{userRole?.replace("_", " ")}</span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center py-3 rounded-lg transition-all duration-200 font-medium gap-3
                    ${
                      activeItem === item.id
                        ? "bg-linear-to-r from-[#2F74AA] to-[#3a8ccc] text-white shadow-lg"
                        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                    }
                    ${isSidebarOpen ? "px-4 text-left" : "px-0 justify-center"}`}
                >
                  <span
                    className={`text-lg shrink-0 relative ${activeItem === item.id ? "text-white" : "text-blue-600"}`}
                  >
                    {item.icon}
                    {item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-sm z-10">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </span>
                  <span
                    className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 ${!isSidebarOpen && "opacity-0 w-0"}`}
                  >
                    {item.label}
                  </span>
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
            className={`w-full flex items-center gap-3 py-3 text-gray-700 rounded-lg bg-red-50 hover:bg-red-100 hover:text-red-700 font-semibold shadow transition-all ${isSidebarOpen ? "px-4" : "justify-center"}`}
          >
            <span className="text-xl shrink-0">🚪</span>
            <span
              className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 ${!isSidebarOpen && "opacity-0 w-0"}`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DynamicSidebar;
