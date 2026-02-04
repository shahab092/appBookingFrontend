import { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LogOut, HeartPulse } from "lucide-react";
import { SIDEBAR_MENU } from "../../constant/data";
import { logout } from "../../features/AuthSlice"; // import your logout action
import { message } from "antd/lib";
import { useNotifications } from "../../context/NotificationContext";

const SidebarLink = memo(({ item, isExpanded }) => {
  const { label, icon: Icon, path } = item;
  return (
    <NavLink
      to={path || "#"}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 h-11 px-4 rounded-lg transition-colors duration-200
        ${
          isActive
            ? "bg-blue-100 text-blue-900 font-bold border-l-4 border-blue-500"
            : "text-gray-500 hover:bg-gray-200/75 hover:text-gray-900"
        }
        ${!isExpanded && "justify-center"}`
      }
      aria-label={!isExpanded ? label : undefined}
    >
      {({ isActive }) => (
        <>
          <Icon
            size={20}
            strokeWidth={isActive ? 2 : 1.75}
            className="transition-all duration-200 group-hover:scale-110"
          />
          {item.badge > 0 && (
            <span className="absolute top-1.5 left-7 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white shadow-sm z-10">
              {item.badge > 99 ? "99+" : item.badge}
            </span>
          )}
          {isExpanded && (
            <span className="text-sm transition-all duration-200 truncate">
              {label}
            </span>
          )}
          {!isExpanded && (
            <div className="absolute left-full ml-4 px-2 py-1.5 text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-2 whitespace-nowrap">
              {label}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
});

SidebarLink.displayName = "SidebarLink";

const UserProfile = memo(({ user, isExpanded }) => (
  <div className="flex items-center gap-3 sm:p-3">
    <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold text-lg">
      {user.name ? user.name.charAt(0).toUpperCase() : "A"}
    </div>
    {isExpanded && (
      <div className="leading-4">
        <h4 className="font-semibold text-gray-800">{user.name || "Admin"}</h4>
        <span className="text-xs text-gray-500">{user.role}</span>
      </div>
    )}
  </div>
));

UserProfile.displayName = "UserProfile";

const Sidebar = ({ user, isExpanded, isMobileOpen, setIsMobileOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pendingDoctorCount } = useNotifications();
  console.log(pendingDoctorCount, "notihng");
  const menu = (SIDEBAR_MENU[user.role] || []).map((item) => {
    if (item.label === "Approve Doctors") {
      return { ...item, badge: pendingDoctorCount };
    }
    return item;
  });

  // Logout handler
  const handleLogout = () => {
    dispatch(logout()); // clears Redux and localStorage
    navigate("/"); // redirect to login page
    message.success("Logged out successfully");
  };

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
        />
      )}

      <aside
        className={`overflow-x-hidden
          fixed lg:sticky top-0 z-30 flex h-screen flex-col bg-gray-50 border-r border-gray-200
          transition-all duration-300 ease-in-out
          ${isExpanded ? "w-72" : "w-20"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Logo Section */}
          <div className="h-16 flex items-center justify-center border-b sm:border-none border-gray-200">
            <div
              className={`flex items-center justify-center transition-all duration-300 ease-in-out ${
                isExpanded ? "gap-3" : "gap-0"
              }`}
            >
              <div className="h-9 w-9 bg-blue-600 rounded-lg text-white flex items-center justify-center">
                <HeartPulse size={22} />
              </div>
              {isExpanded && (
                <span className="ml-1 text-lg font-bold text-gray-800">
                  HealthCare
                </span>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-3 py-4 space-y-1.5">
            {menu.map((item) => (
              <SidebarLink
                key={item.label}
                item={item}
                isExpanded={isExpanded}
              />
            ))}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="border-t border-gray-200">
          <UserProfile user={user} isExpanded={isExpanded} />
          <button
            type="button"
            title="Logout"
            onClick={handleLogout} // attach logout here
            className="group flex items-center gap-3 h-11 mt-2 px-4 rounded-lg w-full text-red-500 hover:bg-red-100 hover:text-red-700 font-medium transition-colors duration-200 justify-center lg:justify-start"
          >
            <LogOut size={20} strokeWidth={1.75} />
            {isExpanded && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
