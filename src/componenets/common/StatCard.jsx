import React from "react";

const StatCard = ({ title, value, sub, icon, bg, iconBg, trend }) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-4 flex justify-between items-center ${bg}`}
    >
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        {sub && (
          <span
            className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
              trend === "up"
                ? "bg-green-100 text-green-600"
                : trend === "down"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
            }`}
          >
            {sub}
          </span>
        )}
      </div>
      <div
        className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-sm ${iconBg}`}
      >
        {React.cloneElement(icon, { size: 24 })}
      </div>
    </div>
  );
};

export default StatCard;
