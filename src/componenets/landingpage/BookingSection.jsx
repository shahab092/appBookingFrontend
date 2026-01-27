import React, { useState, useEffect } from "react";
import {
  FaCalendarCheck,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaStethoscope,
  FaCheckCircle,
  FaVideo,
  FaClinicMedical,
  FaHome,
  FaUserCircle,
  FaLock,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookingSection = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    service: "",
    consultationType: "in-clinic",
    doctor: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    "Psychiatry Consultation",
    "Psychological Testing",
    "Medication Management",
    "Therapy Session",
    "EEG Test",
    "ECG Test",
    "X-Ray",
    "Lab Test",
    "Emergency Care",
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Clinical Psychiatrist",
      available: ["online", "in-clinic"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Child Psychiatrist",
      available: ["in-clinic"],
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Therapy Specialist",
      available: ["online", "in-clinic"],
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      specialty: "Neurologist",
      available: ["in-clinic"],
    },
    {
      id: 5,
      name: "Dr. Lisa Brown",
      specialty: "Counseling Psychologist",
      available: ["online"],
    },
  ];

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking data:", formData);

    // Check if user is authenticated
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      // User not authenticated - save to localStorage
      try {
        // Get existing pending bookings
        const pendingBookings =
          JSON.parse(localStorage.getItem("pendingBookings")) || [];

        // Create new booking with timestamp
        const newPendingBooking = {
          ...formData,
          id: Date.now(),
          submittedAt: new Date().toISOString(),
          status: "pending",
        };

        // Add to pending bookings
        pendingBookings.push(newPendingBooking);

        // Save back to localStorage
        localStorage.setItem(
          "pendingBookings",
          JSON.stringify(pendingBookings),
        );

        console.log("Booking saved to localStorage:", newPendingBooking);

        // Show notification
        setIsSubmitted(true);

        // Set timeout to redirect after 15 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          // Redirect to dashboard
          window.location.href = "/dashboard"; // or use navigate('/dashboard') if using React Router
        }, 15000);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        alert("Failed to save your appointment. Please try again.");
      }
    } else {
      // User is authenticated - proceed normally
      setIsSubmitted(true);

      // Set timeout to redirect after 15 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          appointmentDate: "",
          appointmentTime: "",
          service: "",
          consultationType: "in-clinic",
          doctor: "",
          message: "",
        });

        // Redirect to dashboard
        window.location.href = "/dashboard"; // or use navigate('/dashboard') if using React Router
      }, 15000);
    }
  };
  const getAvailableDoctors = () => {
    return doctors.filter((doctor) =>
      doctor.available.includes(formData.consultationType),
    );
  };

  if (isSubmitted) {
    return (
      <section
        id="booking"
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-blue-100">
              <div className="bg-green-100 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <FaCheckCircle className="text-3xl sm:text-4xl md:text-5xl text-green-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Appointment Booked Successfully!
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6">
                Thank you for choosing PsycheCare. We have received your booking
                request.
              </p>

              <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <FaInfoCircle className="text-[#2e76ad] mr-2 flex-shrink-0" />
                  Important Next Steps:
                </h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
                  <p className="text-gray-600 flex items-start">
                    <FaCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      We will send a confirmation email to{" "}
                      <strong>{formData.email}</strong> within 15 minutes
                    </span>
                  </p>
                  <p className="text-gray-600 flex items-start">
                    <FaCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      A patient portal account will be created using this email
                    </span>
                  </p>
                  <p className="text-gray-600 flex items-start">
                    <FaCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Use the portal to track appointments, view reports, and
                      message your doctor
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-2xl p-3 sm:p-4 mb-6">
                <p className="text-yellow-800 text-xs sm:text-sm flex items-start">
                  <FaLock className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Check your inbox:</strong> Please check your email
                    (including spam folder) for confirmation and portal access
                    details.
                  </span>
                </p>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#2e76ad] hover:bg-[#256399] text-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="booking"
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Login Prompt - Show if not authenticated */}
        {!isAuthenticated && (
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full -translate-y-16 sm:-translate-y-20 translate-x-16 sm:translate-x-20"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1 w-full lg:w-auto">
                  <h3 className="text-2xl sm:text-2.5xl md:text-3xl font-bold mb-2">
                    Ready to Book Your Appointment?
                  </h3>
                  <p className="text-blue-100 text-base sm:text-lg mb-4">
                    Sign in to access our appointment booking system and manage
                    your healthcare journey with ease.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-5 md:pt-6">
                    <button
                      onClick={() => navigate("/")}
                      className="bg-gradient-to-br from-[#2e76ad] to-[#3a8ccc] hover:from-[#256399] hover:to-[#2e76ad] text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-all duration-200 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center space-x-2 group w-full sm:w-auto"
                    >
                      <FaUserCircle size={18} className="sm:w-5 sm:h-5" />
                      <span>Login Now</span>
                    </button>
                    <button className="border-2 border-white text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto">
                      <FaPhone size={18} className="sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base md:text-lg">
                        Call: +1-555-123-4567
                      </span>
                    </button>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center w-40 h-40 xl:w-48 xl:h-48 bg-white/10 rounded-full flex-shrink-0">
                  <FaCalendarCheck className="text-6xl xl:text-8xl opacity-20" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <div className="inline-flex items-center space-x-2 bg-[#2e76ad]/10 text-[#2e76ad] px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full font-semibold mb-3 sm:mb-4 md:mb-6 shadow-lg text-xs sm:text-sm md:text-base">
            <FaCalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span>Book Your Appointment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 px-2">
            Schedule Your <span className="text-[#2e76ad]">Care Journey</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-3 sm:px-4">
            Choose your preferred consultation type and book your appointment in
            just a few clicks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto">
          {/* Booking Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-blue-100 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#2e76ad]/5 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-[#2e76ad]/5 rounded-full translate-y-10 sm:translate-y-12 -translate-x-10 sm:-translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                <div className="bg-[#2e76ad] text-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                  <FaCalendarCheck className="text-lg sm:text-xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Appointment Details
                </h3>
              </div>
              <p className="text-gray-600 mb-6 sm:mb-7 md:mb-8 text-sm sm:text-base">
                Fill in your details to schedule your visit
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Consultation Type */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-200">
                  <label className="block text-gray-700 font-bold mb-3 sm:mb-4 text-base sm:text-lg">
                    Consultation Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* In-Clinic Option */}
                    <label
                      className={`cursor-pointer transition-all duration-300 ${
                        formData.consultationType === "in-clinic"
                          ? "transform scale-105"
                          : "hover:scale-102"
                      }`}
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value="in-clinic"
                        checked={formData.consultationType === "in-clinic"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div
                        className={`border-2 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center transition-all duration-300 ${
                          formData.consultationType === "in-clinic"
                            ? "border-[#2e76ad] bg-white shadow-lg ring-2 ring-[#2e76ad]/20"
                            : "border-gray-300 bg-white hover:border-[#2e76ad] hover:shadow-md"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center ${
                            formData.consultationType === "in-clinic"
                              ? "bg-[#2e76ad] text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <FaClinicMedical className="text-xl sm:text-2xl" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                          In-Clinic Visit
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                          Visit our hospital for comprehensive care
                        </p>
                        <div className="text-xs text-green-600 font-semibold bg-green-50 py-0.5 sm:py-1 px-2 sm:px-3 rounded-full">
                          Physical examination available
                        </div>
                      </div>
                    </label>

                    {/* Online Option */}
                    <label
                      className={`cursor-pointer transition-all duration-300 ${
                        formData.consultationType === "online"
                          ? "transform scale-105"
                          : "hover:scale-102"
                      }`}
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value="online"
                        checked={formData.consultationType === "online"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div
                        className={`border-2 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center transition-all duration-300 ${
                          formData.consultationType === "online"
                            ? "border-[#2e76ad] bg-white shadow-lg ring-2 ring-[#2e76ad]/20"
                            : "border-gray-300 bg-white hover:border-[#2e76ad] hover:shadow-md"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center ${
                            formData.consultationType === "online"
                              ? "bg-[#2e76ad] text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <FaVideo className="text-xl sm:text-2xl" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                          Video Consultation
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                          Online consultation from anywhere
                        </p>
                        <div className="text-xs text-green-600 font-semibold bg-green-50 py-0.5 sm:py-1 px-2 sm:px-3 rounded-full">
                          Convenient & safe
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Personal Information Card */}

                {/* Appointment Details Card */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-200">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <FaStethoscope className="text-[#2e76ad] mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Appointment Details
                  </h4>

                  {/* Service Selection */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Select Service *
                    </label>
                    <div className="relative">
                      <FaStethoscope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e76ad] focus:border-transparent transition-all duration-200 bg-white appearance-none"
                      >
                        <option value="">Choose a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Selection */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Preferred Doctor *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                      <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e76ad] focus:border-transparent transition-all duration-200 bg-white appearance-none"
                      >
                        <option value="">Select a doctor</option>
                        {getAvailableDoctors().map((doctor) => (
                          <option key={doctor.id} value={doctor.name}>
                            {doctor.name} - {doctor.specialty}
                            {doctor.available.includes("online") &&
                            doctor.available.includes("in-clinic")
                              ? " (Online & In-Clinic)"
                              : doctor.available.includes("online")
                                ? " (Online Only)"
                                : " (In-Clinic Only)"}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Only doctors available for{" "}
                      {formData.consultationType === "online"
                        ? "online"
                        : "in-clinic"}{" "}
                      consultation are shown
                    </p>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <FaCalendarCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          name="appointmentDate"
                          value={formData.appointmentDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e76ad] focus:border-transparent transition-all duration-200 bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Preferred Time *
                      </label>
                      <div className="relative">
                        <FaClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                        <select
                          name="appointmentTime"
                          value={formData.appointmentTime}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e76ad] focus:border-transparent transition-all duration-200 bg-white appearance-none"
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((time, index) => (
                            <option key={index} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                {/* <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e76ad] focus:border-transparent transition-all duration-200 bg-white resize-none"
                    placeholder={`Tell us about any specific concerns or requirements for your ${formData.consultationType} consultation...`}
                  ></textarea>
                </div> */}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#2e76ad] to-[#3a8ccc] hover:from-[#256399] hover:to-[#2e76ad] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center space-x-3 group"
                >
                  <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                    <FaCalendarCheck size={20} />
                  </div>
                  <span className="text-lg">
                    Book{" "}
                    {formData.consultationType === "online"
                      ? "Video"
                      : "In-Clinic"}{" "}
                    Appointment
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Side Information - Same as before but enhanced */}
          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            {/* Consultation Info */}
            <div className="bg-gradient-to-br from-[#2e76ad] to-[#3a8ccc] rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">
                  {formData.consultationType === "online"
                    ? "Video Consultation"
                    : "In-Clinic Visit"}
                </h3>

                {formData.consultationType === "online" ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 bg-white/10 rounded-2xl p-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <FaVideo className="text-xl" />
                      </div>
                      <div>
                        <p className="font-semibold">Secure Video Call</p>
                        <p className="text-blue-100 text-sm">
                          Private and encrypted consultation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 bg-white/10 rounded-2xl p-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <FaHome className="text-xl" />
                      </div>
                      <div>
                        <p className="font-semibold">From Your Home</p>
                        <p className="text-blue-100 text-sm">
                          Comfortable and convenient
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 mt-4">
                      <p className="text-sm font-semibold mb-2">
                        What You'll Need:
                      </p>
                      <ul className="text-blue-100 text-sm space-y-1">
                        <li>• Stable internet connection</li>
                        <li>• Webcam and microphone</li>
                        <li>• Quiet, private space</li>
                        <li>• Email access for portal</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 bg-white/10 rounded-2xl p-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <FaClinicMedical className="text-xl" />
                      </div>
                      <div>
                        <p className="font-semibold">Comprehensive Care</p>
                        <p className="text-blue-100 text-sm">
                          Full physical examination available
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 bg-white/10 rounded-2xl p-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <FaUser className="text-xl" />
                      </div>
                      <div>
                        <p className="font-semibold">Personal Attention</p>
                        <p className="text-blue-100 text-sm">
                          Face-to-face with specialists
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 mt-4">
                      <p className="text-sm font-semibold mb-2">
                        What to Bring:
                      </p>
                      <ul className="text-blue-100 text-sm space-y-1">
                        <li>• Government ID and insurance card</li>
                        <li>• Previous medical records</li>
                        <li>• List of current medications</li>
                        <li>• Email for portal access</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Patient Portal Info */}
            <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg border border-blue-100">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="bg-[#2e76ad] text-white p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                  <FaLock className="text-base sm:text-lg md:text-xl" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Patient Portal Access
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Automatic Profile Creation
                    </p>
                    <p className="text-gray-600 text-sm">
                      Your patient portal account will be created using the
                      email you provide
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Follow-up & Tracking
                    </p>
                    <p className="text-gray-600 text-sm">
                      Access test results, appointment history, and doctor
                      messages
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Secure Communication
                    </p>
                    <p className="text-gray-600 text-sm">
                      Message your doctor directly through the portal
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Check your email after booking for
                  portal login instructions. Make sure to use a reachable email
                  address you check regularly.
                </p>
              </div>
            </div>

            {/* Emergency Card */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-white/10 rounded-full -translate-y-6 sm:-translate-y-8 translate-x-6 sm:translate-x-8"></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
                  Emergency Care
                </h3>
                <p className="mb-4 sm:mb-6 text-red-100 text-xs sm:text-sm md:text-base">
                  Need immediate medical attention? Our emergency services are
                  available 24/7.
                </p>
                <button className="w-full bg-white text-red-600 font-bold py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-red-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg text-xs sm:text-sm md:text-base">
                  <FaPhone size={16} className="sm:w-5 sm:h-5" />
                  <span>Call Emergency: 1-800-HELP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
