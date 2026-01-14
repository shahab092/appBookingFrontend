import { useState } from "react";
import { useSelector } from "react-redux";
import { Video, Hospital, Stethoscope, Zap } from "lucide-react";
import LoginModal from "../common/LoginModal";
import AppointmentModal from "../dashboard/AppointmentModal";

const services = [
  {
    title: "Online Consultation",
    icon: Video,
    color: "bg-emerald-100 text-emerald-600",
    type: "online",
  },
  {
    title: "In-Clinic Care",
    icon: Hospital,
    color: "bg-indigo-100 text-indigo-600",
    type: "inclinic",
  },
  {
    title: "General Doctor",
    icon: Stethoscope,
    color: "bg-blue-100 text-blue-600",
    type: "online", // Default to online
  },
  {
    title: "Instant Appointment",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
    type: "online", // Default to online
  },
];

export default function ServiceCards() {
  const { user } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedType, setSelectedType] = useState("online");

  const handleCardClick = (type) => {
    setSelectedType(type);
    if (!user) {
      setShowLoginModal(true);
      // setShowAppointmentModal(true);
    } else {
      setShowAppointmentModal(true);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => handleCardClick(item.type)}
                className="text-gray-900  flex flex-col items-center text-center transition hover:scale-[1.03] hover:shadow-2xl cursor-pointer p-4 rounded-2xl shadow-xl relative z-50 bg-white/10 hover:bg-white/20  border border-white/20 backdrop-blur-md"
              >
                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 md:mb-4 ${item.color}`}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>

                {/* Title */}
                <h3 className="text-gray-900 font-semibold text-xs md:text-sm lg:text-base">
                  {item.title}
                </h3>
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
