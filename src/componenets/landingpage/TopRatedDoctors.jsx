import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaUserMd,
  FaCalendarAlt,
  FaVideo,
  FaHospital,
  FaCheckCircle,
  FaAward,
  FaHeart,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginModal from "../common/LoginModal";
import AppointmentModal from "../dashboard/AppointmentModal";
import { MapPin, Video } from "lucide-react";

const TOP_RATED_DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15+ years",
    rating: 4.9,
    reviews: 1247,
    image: "https://i.pravatar.cc/300?img=47",
    isVerified: true,
    consultationFee: 2500,
    patients: "5000+",
    availability: "Available Today",
    tags: ["Heart Surgery", "ECG Expert"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    experience: "12+ years",
    rating: 4.8,
    reviews: 982,
    image: "https://i.pravatar.cc/300?img=12",
    isVerified: true,
    consultationFee: 2200,
    patients: "4200+",
    availability: "Tomorrow",
    tags: ["Migraine Expert", "Stroke Care"],
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialty: "Pediatrician",
    experience: "10+ years",
    rating: 4.9,
    reviews: 1534,
    image: "https://i.pravatar.cc/300?img=45",
    isVerified: true,
    consultationFee: 1800,
    patients: "6500+",
    availability: "Available Today",
    tags: ["Vaccination", "Child Care"],
  },
  {
    id: 4,
    name: "Dr. Robert Wilson",
    specialty: "Orthopedic Surgeon",
    experience: "18+ years",
    rating: 4.7,
    reviews: 876,
    image: "https://i.pravatar.cc/300?img=33",
    isVerified: true,
    consultationFee: 2800,
    patients: "3800+",
    availability: "Available Today",
    tags: ["Joint Replacement", "Sports Injury"],
  },
];

import api from "../../libs/api";
import { useToast } from "../../context/ToastContext";

const TopRatedDoctors = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { showToast } = useToast();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedType, setSelectedType] = useState("online");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchSimpleDoctors();
  }, []);

  const fetchSimpleDoctors = async () => {
    try {
      const res = await api.get("/doctor");
      if (res.data?.success) {
        setDoctors(res.data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch doctors", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctor, type) => {
    setSelectedDoctor(doctor);
    setSelectedType(type);
    setShowAppointmentModal(true);
  };

  const handleViewProfile = (doctor) => {
    navigate("/doctorDetail", { state: { doctor } });
  };

  const displayedDoctors = showAll ? doctors : doctors.slice(0, 4);

  if (loading)
    return (
      <div className="py-20 text-center text-gray-600">
        Loading specialists...
      </div>
    );

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-blue-50 text-blue-600 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4">
            <FaAward className="text-sm md:text-base" />
            <span className="text-xs md:text-sm font-semibold">
              Top Rated Doctors
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-2 sm:px-0">
            Meet Our Expert Doctors
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4 sm:px-6 md:px-0">
            Highly experienced medical professionals trusted by thousands of
            patients
          </p>
        </div>

        {/* Doctors Grid - Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 md:mb-10">
          {displayedDoctors.map((doctor) => (
            <DoctorCard
              key={doctor._id || doctor.id}
              doctor={doctor}
              onBook={handleBookAppointment}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center px-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2.5 md:py-3 px-6 md:px-8 rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto text-sm md:text-base"
          >
            <span>{showAll ? "Show Less" : "View All Doctors"}</span>
            <FaArrowRight
              className={`transform transition-transform duration-300 ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        visible={showLoginModal}
        onCancel={() => setShowLoginModal(false)}
      />
      <AppointmentModal
        visible={showAppointmentModal}
        onCancel={() => setShowAppointmentModal(false)}
        initialType={selectedType}
        initialDoctor={selectedDoctor}
      />
    </section>
  );
};

// Responsive Doctor Card Component
// TopRatedDoctors.jsx (unchanged main component except DoctorCard update)
const DoctorCard = ({ doctor, onBook, onViewProfile }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const availabilityText = doctor.isAvailable
    ? "Available Today"
    : "Next Slot Tomorrow";
  const isAvailable = doctor.isAvailable;

  const tags =
    doctor.services && doctor.services.length > 0
      ? doctor.services.slice(0, 2)
      : [doctor.specialty || "Specialist", "General Care"];

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div
        className="relative h-48 sm:h-52 md:h-56 lg:h-60 cursor-pointer group"
        onClick={() => onViewProfile(doctor)}
      >
        <img
          src={
            doctor.image ||
            "https://img.freepik.com/free-photo/doctor-smiling-with-stethoscope_1154-36.jpg"
          }
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Availability */}
        <span
          className={`absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
            isAvailable
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${isAvailable ? "bg-green-500" : "bg-blue-500"}`}
          ></span>
          {availabilityText}
        </span>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-200"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FaHeart
            className={`${isFavorite ? "text-red-500" : "text-gray-400"} text-sm sm:text-base`}
          />
        </button>

        {/* Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="font-bold text-sm sm:text-base md:text-lg truncate">
            {doctor.name}
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 truncate">
            {doctor.specialty}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Rating & Experience */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                    i < Math.floor(doctor.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900 text-sm sm:text-base">
              {doctor.rating || "0.0"}
            </span>
            <span className="text-xs sm:text-sm text-gray-500">
              ({doctor.reviews || 0})
            </span>
          </div>
          <span className="text-xs sm:text-sm text-gray-600">
            {doctor.experience || 0}+ yrs
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3 min-h-[2.5rem]">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-xs px-2.5 flex justify-center items-center py-1 bg-blue-50 text-blue-700 rounded-full "
              title={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-center">
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Patients</p>
            <p className="font-bold text-gray-900 text-sm sm:text-base">
              {doctor.patients || "1000+"}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Fee</p>
            <p className="font-bold text-blue-600 text-sm sm:text-base">
              Rs{doctor.consultationFee || "1500"}
            </p>
          </div>
        </div>

        {/* Appointment Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          <button
            className="w-full btn-primary flex items-center justify-center gap-2"
            onClick={() => onBook(doctor, "online")}
          >
            <Video size={16} className="flex-shrink-0" />
            Book Online Appointment
          </button>
          <button
            className="w-full btn-outline flex items-center justify-center gap-2"
            onClick={() => onBook(doctor, "inclinic")}
          >
            <MapPin size={16} className="flex-shrink-0" />
            In-Clinic Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRatedDoctors;
