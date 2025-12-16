import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  //  Get user from Redux directly
  const user = useSelector((state) => state.auth.user);

  const toggleSidebar = () => {
    setIsMobileOpen((prev) => !prev);
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={user}
        isExpanded={isExpanded}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} user={user} />

        {/* 👇 ROUTED CONTENT */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
