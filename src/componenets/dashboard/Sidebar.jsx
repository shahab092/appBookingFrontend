import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { SIDEBAR_MENU } from "../../constant/data";

const Sidebar = ({ user, isExpanded, isMobileOpen, setIsMobileOpen }) => {
  const menu = SIDEBAR_MENU[user.role] || [];

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 z-30 h-screen bg-white border-r
          transition-all duration-300
          ${isExpanded ? "w-72" : "w-20"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b">
          <div className="h-9 w-9 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center">
            +
          </div>
          {isExpanded && <span className="ml-3 font-semibold">HealthCare</span>}
        </div>

        {/* Menu */}
        <nav className="py-4 space-y-1">
          {menu.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path || "#"}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }
                ${!isExpanded && "justify-center"}`
              }
            >
              <Icon size={18} />

              {isExpanded && <span>{label}</span>}

              {!isExpanded && (
                <span className="absolute left-full ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto p-3 border-t">
          <button className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg w-full justify-center lg:justify-start">
            <LogOut size={18} />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
