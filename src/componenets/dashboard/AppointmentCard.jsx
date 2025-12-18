import React from "react";
import { FiClock, FiMapPin, FiCalendar } from "react-icons/fi";
import { CloseOutlined } from "@ant-design/icons";

const AppointmentCard = ({
  title,
  time,
  doctor,
  status = "Confirmed",
  statusColor = "green",
  type = "online",
  showActions = true,
  cancelled = false,
  handleOpenModal,
}) => {
  const statusStyles = {
    green: "bg-green-100 text-green-800 border border-green-300",
    yellow: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    red: "bg-red-100 text-red-800 border border-red-300",
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-l-4 rounded-lg p-4 transition-all duration-300 ${
          type === "online"
            ? "border-blue-500 bg-gradient-to-r from-blue-50 to-white"
            : "border-cyan-500 bg-gradient-to-r from-cyan-50 to-white"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  statusColor === "green"
                    ? "bg-green-500"
                    : statusColor === "yellow"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
              <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                {title}
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-[#2F74AA]">
              <div className="flex items-center gap-1 truncate">
                <FiClock className="text-base sm:text-lg flex-shrink-0" />
                <span className="truncate">{time}</span>
              </div>

              <div className="hidden sm:block w-px h-4 bg-gray-300" />

              <div className="flex items-center gap-1 truncate">
                <FiMapPin className="text-base sm:text-lg flex-shrink-0" />
                <span className="truncate">{doctor}</span>
              </div>
            </div>

            {/* Status Badge */}
            <span
              className={`self-start px-3 py-1.5 rounded-full mt-3 sm:mt-4 inline-block text-xs font-bold ${statusStyles[statusColor]}`}
            >
              {status}
            </span>
          </div>

          {/* Actions */}
          {showActions && !cancelled && (
            <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0 flex-shrink-0">
              <button
                onClick={handleOpenModal}
                className="w-full sm:w-auto px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-400 transition-colors"
              >
                <FiCalendar className="text-lg" />
                Reschedule
              </button>

              <button className="w-full sm:w-auto px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 text-red-500 border-2 border-gray-200 hover:bg-red-50 transition-colors">
                <CloseOutlined />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
