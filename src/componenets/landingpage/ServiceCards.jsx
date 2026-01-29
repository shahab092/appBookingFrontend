import { useState } from "react";
import { useSelector } from "react-redux";
import { Video, Hospital, Stethoscope, Zap } from "lucide-react";
import LoginModal from "../common/LoginModal";
import AppointmentModal from "../dashboard/AppointmentModal";

const services = [
  {
    title: "Online Consultation",
    icon: Video,
    color: "bg-teal-50 text-teal-700",
    type: "online",
  },
  {
    title: "In-Clinic Care",
    icon: Hospital,
    color: "bg-violet-50 text-violet-700",
    type: "inclinic",
  },
  {
    title: "General Doctor",
    icon: Stethoscope,
    color: "bg-sky-50 text-sky-700",
    type: "online",
  },
  {
    title: "Instant Appointment",
    icon: Zap,
    color: "bg-emerald-50 text-emerald-700",
    type: "online",
  },
];

export default function ServiceCards() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedType, setSelectedType] = useState("online");

  const handleCardClick = (type) => {
    setSelectedType(type);
    setShowAppointmentModal(true);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-1 sm:px-2 md:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => handleCardClick(item.type)}
                className={`flex   flex-row sm:flex-col items-center  justify-center text-center transition hover:scale-[1.03] hover:shadow-2xl cursor-pointer p-2 sm:p-2 md:p-2 rounded-2xl shadow-lg gap-2 relative -z-20 w-full border border-white/40 backdrop-blur-md ${item.color}`}
              >
                {/* Icon Circle */}
                <div className="w-7 h-7 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center  bg-white/70">
                  <Icon className="w-4 h-4 sm:w-4 sm:h-4 md:w-7 md:h-7" />
                </div>

                {/* Title */}
                <h6 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-bold leading-tight">
                  {item.title}
                </h6>
              </div>
            );
          })}
        </div>
      </div>

      <LoginModal
        visible={showLoginModal}
        onCancel={() => setShowLoginModal(false)}
      />

      <AppointmentModal
        visible={showAppointmentModal}
        onCancel={() => setShowAppointmentModal(false)}
        initialType={selectedType}
      />
    </>
  );
}
