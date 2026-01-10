import React from "react";
import {
  FiClock,
  FiCalendar,
  FiUser,
  FiVideo,
  FiHome,
} from "react-icons/fi";
import { FaUserMd } from "react-icons/fa";
import { CloseOutlined } from "@ant-design/icons";

const AppointmentCard = ({
  title,
  time,
  doctor,
  status = "Confirmed",
  statusColor = "green",
  type = "online",
  typeIcon,
  showActions = true,
  cancelled = false,
  handleOpenModal,
  handleCancel
}) => {
  const statusStyles = {
    green: "bg-green-100 text-green-800 border border-green-200",
    yellow: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    red: "bg-red-100 text-red-800 border border-red-200",
    blue: "bg-blue-100 text-blue-800 border border-blue-200",
    gray: "bg-gray-100 text-gray-700 border border-gray-300",
  };

  // Determine appointment type icon
  const getAppointmentTypeIcon = () => {
    if (typeIcon) {
      return typeIcon;
    }
    return type === "online" ? (
      <FiVideo className="mr-1" />
    ) : (
      <FiHome className="mr-1" />
    );
  };

  // Get appointment type text
  const getAppointmentTypeText = () => {
    return type === "online" ? "Online Consultation" : "In-Clinic Visit";
  };

  // Get appointment type badge style
  const getAppointmentTypeStyle = () => {
    return type === "online" 
      ? "bg-blue-100 text-blue-800 border border-blue-200" 
      : "bg-blue-50 text-[#2F74AA] border border-[#2F74AA]";
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-l-4 rounded-lg p-4 transition-all duration-300 ${
          type === "online"
            ? "border-blue-400 bg-gradient-to-r from-blue-50 to-white"
            : "border-[#2F74AA] bg-gradient-to-r from-blue-100 to-white"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-2">
              <span
                className={`w-3 h-3 rounded-full flex-shrink-0 mt-2 ${
                  statusColor === "green"
                    ? "bg-green-500"
                    : statusColor === "yellow"
                    ? "bg-yellow-500"
                    : statusColor === "red"
                    ? "bg-red-500"
                    : statusColor === "blue"
                    ? "bg-blue-500"
                    : "bg-gray-400"
                }`}
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                    {title}
                  </h3>
                  <span className={`flex items-center text-xs sm:text-sm px-3 py-1.5 rounded-md ${getAppointmentTypeStyle()}`}>
                    {getAppointmentTypeIcon()}
                    {getAppointmentTypeText()}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-[#2F74AA]">
                  <div className="flex items-center gap-2 truncate">
                    <FiClock className="text-base sm:text-lg flex-shrink-0" />
                    <span className="truncate">{time}</span>
                  </div>

                  <div className="hidden sm:block w-px h-4 bg-gray-300" />

                  <div className="flex items-center gap-2 truncate">
                    <FaUserMd className="text-base sm:text-lg flex-shrink-0 text-[#2F74AA]" />
                    <span className="truncate font-medium">{doctor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span
                className={`self-start px-3 py-1.5 rounded-full inline-block text-xs font-bold ${statusStyles[statusColor]}`}
              >
                {status}
              </span>
            </div>
          </div>

          {/* Actions */}
          {showActions && !cancelled && (
            <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0 flex-shrink-0">
              <button
                onClick={handleOpenModal}
                className="w-full sm:w-auto px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 border-2 border-gray-200 hover:bg-blue-50 hover:border-[#2F74AA] transition-colors text-gray-700"
              >
                <FiCalendar className="text-lg" />
                Reschedule
              </button>

              <button onClick={handleCancel} className="w-full sm:w-auto px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 text-red-600 border-2 border-gray-200 hover:bg-red-50 transition-colors">
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