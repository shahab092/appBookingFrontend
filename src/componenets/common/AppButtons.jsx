import React from "react";

const AppButtons = ({ className = "" }) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${className}`}>
      <button className="btn-primary group">
        <span className="material-symbols-outlined text-lg sm:text-xl animate-bounce">
          download
        </span>
        <span>Download MediCare</span>
      </button>
      <button className="btn-outline group">
        <span>Watch Demo</span>
        <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
          play_circle
        </span>
      </button>
    </div>
  );
};

export default AppButtons;
