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

  // For display, use the fetched doctors.
  // If loading, maybe show skeletons, but for now we'll just wait.
  // We can filter for "top rated" if the API supported it, but for now take first few.
  const displayedDoctors = showAll ? doctors : doctors.slice(0, 4);

  if (loading)
    return <div className="py-20 text-center">Loading specialists...</div>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
            <FaAward />
            <span className="text-sm font-semibold">Top Rated Doctors</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Highly experienced medical professionals trusted by thousands of
            patients
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <span>{showAll ? "Show Less" : "View All Doctors"}</span>
            <FaArrowRight
              className={`transform ${showAll ? "rotate-180" : ""}`}
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

// Doctor Card Component
const DoctorCard = ({ doctor, onBook, onViewProfile }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Helper to format availability
  const availabilityText = doctor.isAvailable
    ? "Available Today"
    : "Next Slot Tomorrow";
  const isAvailable = doctor.isAvailable;

  // Helper for tags
  const tags =
    doctor.services && doctor.services.length > 0
      ? doctor.services.slice(0, 2)
      : [doctor.speciality || "Specialist", "General Care"];

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Doctor Image */}
      <div className="relative h-48">
        <img
          src={
            doctor.image ||
            "https://img.freepik.com/free-photo/doctor-smiling-with-stethoscope_1154-36.jpg"
          }
          alt={doctor.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onViewProfile(doctor)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
              isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isAvailable ? "bg-green-500" : "bg-blue-500"
              }`}
            ></span>
            {availabilityText}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg z-10"
        >
          <FaHeart className={isFavorite ? "text-red-500" : "text-gray-400"} />
        </button>

        {/* Doctor Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
          <h3 className="font-bold text-lg">{doctor.name}</h3>
          <p className="text-sm text-blue-200">
            {doctor.speciality || doctor.specialty}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Rating and Experience */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`${
                    index <
                    Math.floor(doctor.rating || doctor.averageRating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  } w-4 h-4`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">
              {doctor.rating || doctor.averageRating || "0.0"}
            </span>
            <span className="text-sm text-gray-500">
              ({doctor.reviews || doctor.numReviews || 0})
            </span>
          </div>
          <span className="text-sm text-gray-600">
            {doctor.experience || 0}+ Years
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 h-12 overflow-hidden">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Patients</p>
            <p className="font-bold text-gray-900">
              {doctor.patients || "1000+"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Fee</p>
            <p className="font-bold text-blue-600">
              ₹{doctor.consultationFee || "1500"}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between min-w-[220px]">
          <div className="space-y-3">
            <button
              className="w-full bg-blue-600 hover:scale-[1.02] transition text-white px-4 py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 text-sm"
              onClick={() => onBook(doctor, "online")}
            >
              <Video size={18} /> Book Online Appointment
            </button>
            <button
              className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
              onClick={() => onBook(doctor, "inclinic")}
            >
              <MapPin size={18} /> In-Clinic Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatedDoctors;
