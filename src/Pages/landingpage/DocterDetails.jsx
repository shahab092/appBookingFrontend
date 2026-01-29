import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import TopBar from "../../componenets/landingpage/TopBar";
import Footer from "../../componenets/landingpage/Footer";

import AppointmentModal from "../../componenets/dashboard/AppointmentModal";
import { FaStar, FaClock, FaPhone } from "react-icons/fa";
import { Video, MapPin } from "lucide-react";
import api from "../../libs/api";

export default function DocterDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [bookingType, setBookingType] = useState("online");
  const [doctor, setDoctor] = useState(location.state?.doctor || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      const doctorId =
        location.state?.doctor?.id ||
        location.state?.doctor?.doctorId ||
        location.state?.doctorId;

      if (doctorId) {
        setLoading(true);
        try {
          const response = await api.get(`/doctor/${doctorId}`);
          if (response.data?.success) {
            const apiData = response.data.data;
            setDoctor({
              // Keep existing data
              ...doctor,
              // Map API fields
              _id: apiData._id, // Critical for AppointmentModal matching
              id: apiData.doctorId,
              doctorId: apiData.doctorId,
              name: apiData.name,
              email: apiData.email,
              speciality: apiData.speciality,
              specialty: apiData.speciality, // Normalized field for compatibility
              superSpeciality: apiData.superSpeciality,
              services: apiData.services || [],
              consultationTime: apiData.consultationTime,
              locations: apiData.locations || [],
              availability: apiData.availability || [],
              education: apiData.education || [],
              isAvailable: apiData.isAvailable,
              pmdcRegistrationNumber: apiData.pmdcRegistrationNumber,
              experience: apiData.experience || 0,
              rating: apiData.averageRating || 0,
              reviews: apiData.numReviews || 0,
              emergencyContact: apiData.emergencyContact,
              whatsappnumber: apiData.whatsappnumber,
              status: apiData.status,
              leaves: apiData.leaves || [],
              completenessScore: apiData.completenessScore || 0,
              registrationDate: apiData.registrationDate,
              // Preserve existing UI fields if not in API
              consultationFee: doctor?.consultationFee || "2,500",
              image:
                doctor?.image ||
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDdoH13EJEqwZH0P18HvVAgzWTukvstFy4E8ebiOLGIDGNdXkL40F49f3jhBpauls21KSeFMY93fWv_m9qJuzHroF3sEop-dUVjPsYYoPoUxMDKZZZTq2q9y_nisWG4UEgIVQeryhpb5YRY9drkvoG8mCOWZxsuR0ZILgMbKkzcSYMAKFoZwAomNmc0ARQmoXqnaLCpNrOEyn93kK0ZXOtsDXXwxTvaGq3CrvPUVkCHnjpflqgy6CQ0AJvNupJMm9C5kvv8amYfowA",
            });
          }
        } catch (error) {
          console.error("Error fetching doctor details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDoctorDetails();
  }, [location.state?.doctor]);

  const handleProceed = (type) => {
    if (type && typeof type === "string") setBookingType(type);
    setShowAppointmentModal(true);
  };

  const breadcrumbItems = [
    {
      title: "Home",
      onClick: () => navigate("/"),
    },
    {
      title: "Find Doctors",
      onClick: () => navigate("/doctorSearch"),
    },
    {
      title: doctor?.name || "Doctor Details",
    },
  ];

  if (loading && !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Format education for display
  const formatEducation = () => {
    if (!doctor?.education || doctor.education.length === 0) {
      return "MBBS, FCPS (Dermatology), Specialization in Cosmetic Surgery";
    }

    return doctor.education
      .map((edu) => {
        let eduStr = edu.degree;
        if (edu.institute) eduStr += `, ${edu.institute}`;
        if (edu.startYear || edu.endYear) {
          const years = [edu.startYear, edu.endYear].filter(Boolean).join("-");
          eduStr += ` (${years})`;
        }
        return eduStr;
      })
      .join("; ");
  };

  // Get consultation fee based on booking type
  const getConsultationFee = () => {
    if (doctor?.consultationFee) {
      return `Rs. ${doctor.consultationFee}`;
    }
    return bookingType === "online" ? "Rs. 1,500" : "Rs. 2,000";
  };

  // Format availability for display
  const formatAvailability = (clinic) => {
    if (doctor?.availability && doctor.availability.length > 0) {
      const avail = doctor.availability[0];
      return `${avail.day} (${avail.startTime} - ${avail.endTime})`;
    }
    if (clinic?.availability?.[0]) {
      const avail = clinic.availability[0];
      return `${avail.day} (${avail.startTime} - ${avail.endTime})`;
    }
    return "Mon-Sat (09:00 - 20:00)";
  };

  // Get phone number for display
  const getPhoneNumber = (clinic) => {
    return (
      clinic?.phone ||
      doctor?.emergencyContact ||
      doctor?.whatsappnumber ||
      "+92 300 1234567"
    );
  };

  return (
    <div className="bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300 flex flex-col">
      {/* Navigation */}
      <TopBar />

      {/* Breadcrumb Navigation */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-800 py-3 sm:py-4 px-3 sm:px-4 md:px-6 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto w-full">
          <Breadcrumb items={breadcrumbItems} className="text-typegray" />
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Profile Card - Enhanced */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl dark:shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-6 sm:mb-8 md:mb-12 transition-all duration-300">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
              <div className="relative group">
                <div className="w-28 sm:w-32 md:w-40 lg:w-48 h-28 sm:h-32 md:h-40 lg:h-48 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-700 shadow-xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 flex-shrink-0">
                  <img
                    alt="Doctor Profile"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    src={doctor?.image}
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-linear-to-r from-green-400 to-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-800 animate-pulse"></div>
              </div>
              <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className="text-neutral-dark cursor-pointer hover:text-primary transition-colors text-2xl font-bold">
                    {doctor?.name || "Dr. Sarah Thompson"}
                  </h3>
                  <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 shadow-sm">
                    <span className="text-2xl sm:text-lg mr-1">✓</span>
                    {doctor?.pmdcRegistrationNumber
                      ? `PMDC Verified (${doctor.pmdcRegistrationNumber})`
                      : "Verified Professional"}
                  </span>
                  {doctor?.isAvailable !== undefined && (
                    <span
                      className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        doctor.isAvailable
                          ? "bg-linear-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-700"
                          : "bg-linear-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current mr-1"></span>
                      {doctor.isAvailable ? "Available" : "Not Available"}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-lg sm:text-xl font-bold text-primary bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {doctor?.speciality || "Senior Dermatologist"}
                  </p>
                  <p className="text-typegray">{formatEducation()}</p>
                  {doctor?.consultationTime && (
                    <p className="text-typegray text-sm">
                      Consultation Time: {doctor.consultationTime} minutes
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 py-5 sm:py-6 border-y border-slate-100 dark:border-slate-700">
                  <div className="text-center md:text-left">
                    <p className="text-xs font-bold text-typegray uppercase tracking-widest mb-2">
                      Rating
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center gap-1">
                      <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {doctor?.rating || "0"}
                      </span>
                      <div className="flex text-yellow-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={14}
                            className={`sm:w-4 sm:h-4 ${i < Math.floor(doctor?.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-left border-x border-slate-100 dark:border-slate-700 px-3 sm:px-4">
                    <p className="text-xs font-bold text-typegray uppercase tracking-widest mb-2">
                      Experience
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {doctor?.experience
                        ? `${doctor.experience} Yrs`
                        : "0 Yrs"}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-xs font-bold text-typegray uppercase tracking-widest mb-2">
                      Reviews
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {doctor?.reviews || "0"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* Static tags for now as API doesn't seem to have tags/services list properly populated */}
                  {doctor?.services && doctor.services.length > 0 ? (
                    doctor.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-3 sm:px-4 py-1.5 rounded-full bg-linear-to-r from-primary/10 to-blue-100 dark:from-primary/20 dark:to-blue-900/30 text-primary dark:text-blue-300 text-xs sm:text-sm font-semibold border border-primary/20 dark:border-primary/40 shadow-sm"
                      >
                        {service}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="px-3 sm:px-4 py-1.5 rounded-full bg-linear-to-r from-primary/10 to-blue-100 dark:from-primary/20 dark:to-blue-900/30 text-primary dark:text-blue-300 text-xs sm:text-sm font-semibold border border-primary/20 dark:border-primary/40 shadow-sm">
                        Hair Problems
                      </span>
                      <span className="px-3 sm:px-4 py-1.5 rounded-full bg-linear-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold border border-emerald-200 dark:border-emerald-700 shadow-sm">
                        PRP
                      </span>
                      <span className="px-3 sm:px-4 py-1.5 rounded-full bg-linear-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-semibold border border-purple-200 dark:border-purple-700 shadow-sm">
                        Laser Hair Removal
                      </span>
                      <span className="px-3 sm:px-4 py-1.5 rounded-full bg-linear-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 text-xs sm:text-sm font-semibold border border-orange-200 dark:border-orange-700 shadow-sm">
                        Acne Scars
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full md:w-auto md:flex-shrink-0 space-y-2 sm:space-y-3">
                <button
                  className="w-full bg-primary hover:scale-[1.02] transition text-white px-4 py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 text-sm"
                  onClick={() => handleProceed("online")}
                >
                  <Video size={18} /> Book Online Appointment
                </button>
                <button
                  className="w-full bg-white border-2 border-primary text-primary hover:bg-primary/5 transition px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
                  onClick={() => handleProceed("inclinic")}
                >
                  <MapPin size={18} /> In-Clinic Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-7 md:space-y-8">
            <section className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                <span className="material-symbols-outlined text-primary">
                  person_search
                </span>
                About {doctor?.name || "Dr. Sarah Thompson"}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-typegray">
                <p>
                  {doctor?.name || "Dr. Sarah Thompson"} is a highly skilled{" "}
                  {doctor?.speciality || "Dermatologist"} with over{" "}
                  {doctor?.experience || "12"} years of experience in clinical
                  and cosmetic{" "}
                  {doctor?.speciality?.toLowerCase().split(" ")[0] ||
                    "dermatology"}
                  .
                  {doctor?.education && doctor.education.length > 0 ? (
                    <>
                      {" "}
                      She holds{" "}
                      {doctor.education.length > 1
                        ? "qualifications including"
                        : "a qualification in"}{" "}
                      {doctor.education.map((edu, index) => (
                        <span key={index}>
                          {edu.degree} from{" "}
                          {edu.institute || "a recognized institute"}
                          {index < doctor.education.length - 1 ? ", " : "."}
                        </span>
                      ))}
                    </>
                  ) : (
                    " She specializes in advanced treatments, ensuring tailored treatment plans that address both medical concerns and aesthetic goals."
                  )}
                  {doctor?.pmdcRegistrationNumber && (
                    <>
                      {" "}
                      She is PMDC registered ({doctor.pmdcRegistrationNumber}).
                    </>
                  )}
                </p>
                {doctor?.registrationDate && (
                  <p className="mt-3 text-sm">
                    <strong>Registration Date:</strong>{" "}
                    {new Date(doctor.registrationDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="mb-5 sm:mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <span className="text-xl sm:text-2xl">📍</span>
                Clinic Locations
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
                <div className="xl:col-span-3 space-y-3 sm:space-y-4">
                  {(doctor?.locations && doctor.locations.length > 0
                    ? doctor.locations
                    : [
                        {
                          hospitalId: "clinic_1",
                          name: "Central Medical Complex",
                          address:
                            "Suite 405, 4th Floor, Sector F-10, PWD Town, Islamabad",
                          availability: [
                            {
                              day: "Mon-Sat",
                              startTime: "09:00",
                              endTime: "20:00",
                            },
                          ],
                          phone: "+92 300 1234567",
                          consultationFee: "2,500",
                        },
                      ]
                  ).map((clinic, index) => (
                    <div className="relative" key={clinic.hospitalId || index}>
                      <input
                        type="radio"
                        id={clinic.hospitalId || `clinic_${index}`}
                        name="clinic_choice"
                        className="sr-only"
                        defaultChecked={index === 0}
                      />
                      <label
                        htmlFor={clinic.hospitalId || `clinic_${index}`}
                        className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 rounded-xl sm:rounded-2xl cursor-pointer transition-all border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10`}
                      >
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 border-slate-300 dark:border-slate-600`}
                        >
                          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white"></div>
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <h4 className="text-gray-900 dark:text-white">
                            {clinic.name}
                          </h4>
                          <p className="text-typegray line-clamp-1">
                            {clinic.address ||
                              (clinic.coordinates
                                ? `Lat: ${clinic.coordinates.lat}, Lng: ${clinic.coordinates.lng}`
                                : "Address not available")}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 text-typegray">
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <FaClock size={12} className="flex-shrink-0" />{" "}
                              <span className="line-clamp-1">
                                {formatAvailability(clinic)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <FaPhone size={12} className="flex-shrink-0" />{" "}
                              {getPhoneNumber(clinic)}
                            </div>
                          </div>
                        </div>
                        <div className="bg-linear-to-r from-primary/20 to-blue-500/20 text-primary px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex-shrink-0">
                          Rs.{" "}
                          {doctor?.consultationFee ||
                            clinic.consultationFee ||
                            "2,500"}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="xl:col-span-2 h-64 sm:h-80 xl:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 relative group shadow-lg">
                  <img
                    alt="Multi Location Map"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwWs8diSgAAnUm48UUMabKoRUq9eXGAia_cbnj-f72EhSx10Onoq10iisUcUgpsLbXmht1FbkUdEqSQFf7evOvTUqYL7EgXoTj9HFdBrqMhgOnFgayPUx_msNgaDoH6V_7Y2MlvnXqGxGTHM_IiRQ7Rx5EsMDDSmUuBnKBMhI13mQrx6WDj0JDACmCg0UoGtVb5mWcymI0AXTn-Nm6LbWTwwNc4Ay63IetQ6dL_qAEAES2RF5ERKX9I2hemHnJdFTZ0H-FL-y_MWA"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute top-[25%] left-[40%] group/pin cursor-pointer">
                      <div className="bg-primary text-white p-2 rounded-full shadow-lg scale-110">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-[60%] left-[20%] group/pin cursor-pointer opacity-50 hover:opacity-100">
                      <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-[30%] right-[30%] group/pin cursor-pointer opacity-50 hover:opacity-100">
                      <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="mb-6 sm:mb-8 flex items-center gap-2 text-gray-800 dark:text-white">
                <span className="text-xl sm:text-2xl">⭐</span>
                Patient Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-10 border-b border-slate-100 dark:border-slate-700">
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                  <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">
                    {doctor?.rating || "0"}
                  </div>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-2xl"
                      >
                        {i < Math.floor(doctor?.rating || 0)
                          ? "star"
                          : "star_border"}
                      </span>
                    ))}
                  </div>
                  <p className="text-typegray">
                    Based on {doctor?.reviews || "0"} reviews
                  </p>
                </div>
                <div className="md:col-span-8 space-y-3">
                  {[
                    {
                      label: "5 stars",
                      value: doctor?.rating >= 4.5 ? "90%" : "0%",
                    },
                    {
                      label: "4 stars",
                      value:
                        doctor?.rating >= 3.5 && doctor?.rating < 4.5
                          ? "8%"
                          : "0%",
                    },
                    {
                      label: "3 stars",
                      value:
                        doctor?.rating >= 2.5 && doctor?.rating < 3.5
                          ? "2%"
                          : "0%",
                    },
                    {
                      label: "2 stars",
                      value:
                        doctor?.rating >= 1.5 && doctor?.rating < 2.5
                          ? "0%"
                          : "0%",
                    },
                    {
                      label: "1 stars",
                      value:
                        doctor?.rating >= 0.5 && doctor?.rating < 1.5
                          ? "0%"
                          : "0%",
                    },
                  ].map((rating) => (
                    <div className="flex items-center gap-4" key={rating.label}>
                      <span className="text-xs font-medium text-typegray w-12">
                        {rating.label}
                      </span>
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: rating.value }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-typegray w-8 text-right">
                        {rating.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {doctor?.reviews > 0 ? (
                  // Show actual reviews if available
                  <p className="text-center text-typegray py-8">
                    No detailed reviews available yet. Be the first to review!
                  </p>
                ) : (
                  // Show placeholder reviews if no reviews
                  <>
                    {[
                      {
                        name: "James D.",
                        time: "2 weeks ago",
                        initials: "JD",
                        rating: 5,
                        comment:
                          "Dr. Sarah is exceptional! She explained my skin condition clearly and the treatment plan she prescribed showed results within just a few days. Very professional and caring.",
                      },
                      {
                        name: "Anonymous Patient",
                        time: "1 month ago",
                        initials: null,
                        rating: 5,
                        comment:
                          "Great experience at the Central Medical Complex. The wait time was minimal and the doctor was very thorough with the checkup. Highly recommend for any skin-related issues.",
                      },
                      {
                        name: "Maria Khan",
                        time: "2 months ago",
                        initials: "MK",
                        rating: 4.5,
                        comment:
                          "I had a PRP session here. The clinic staff was polite and Dr. Thompson ensured I was comfortable throughout the process. Very happy with the service.",
                      },
                    ].map((review, idx) => (
                      <div
                        key={idx}
                        className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-700"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            {review.initials ? (
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {review.initials}
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">
                                <span className="material-symbols-outlined">
                                  person
                                </span>
                              </div>
                            )}
                            <div>
                              <h4 className="text-gray-900 dark:text-white">
                                {review.name}
                              </h4>
                              <p className="text-typegray">{review.time}</p>
                            </div>
                          </div>
                          <div className="flex text-yellow-400">
                            {Array.from({
                              length: Math.floor(review.rating),
                            }).map((_, i) => (
                              <span
                                key={i}
                                className="material-symbols-outlined text-sm"
                              >
                                star
                              </span>
                            ))}
                            {review.rating % 1 !== 0 && (
                              <span className="material-symbols-outlined text-sm">
                                star_half
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-typegray leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button className="flex items-center gap-2 text-primary font-bold hover:underline">
                  <span className="material-symbols-outlined">edit_note</span>
                  Post a Review
                </button>
                <button className="w-full sm:w-auto text-center px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
                  View All Reviews
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <h2 className="px-2 flex items-center gap-2 text-gray-800 dark:text-white">
              <span className="text-xl sm:text-2xl">📅</span>
              Select Booking Option
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div
                onClick={() => setBookingType("online")}
                className={`group cursor-pointer p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all relative shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 ${
                  bookingType === "online"
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800 border-green-500"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-green-300"
                }`}
              >
                {bookingType === "online" && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-green-500 text-lg sm:text-xl">
                    ✓
                  </div>
                )}
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div
                    className={`p-2.5 sm:p-3 w-fit rounded-lg sm:rounded-xl bg-green-100 dark:bg-green-900/20 text-green-600`}
                  >
                    <span className="text-xl sm:text-2xl">📹</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white">
                      Online Consultation
                    </h4>
                    <p className="text-typegray mb-2">
                      Connect via secure video call
                    </p>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      {doctor?.isAvailable
                        ? "Available Today"
                        : "Check Availability"}
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 border-t border-green-200 dark:border-slate-700 pt-3 sm:pt-4">
                    <span className="text-xs sm:text-sm font-medium text-typegray">
                      Fee:
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-green-600">
                      {getConsultationFee()}
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setBookingType("inclinic")}
                className={`group cursor-pointer p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all relative shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 ${
                  bookingType === "inclinic"
                    ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 border-primary"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300"
                }`}
              >
                {bookingType === "inclinic" && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-primary text-lg sm:text-xl">
                    ✓
                  </div>
                )}
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div
                    className={`p-2.5 sm:p-3 w-fit rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-900/20 text-primary`}
                  >
                    <span className="text-xl sm:text-2xl">🏥</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white">
                      In-Clinic Visit
                    </h4>
                    <p className="text-typegray mb-3 sm:mb-4">
                      Choose your preferred clinic location:
                    </p>
                    <div className="relative mb-3">
                      <select
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                        defaultValue={doctor?.locations?.[0]?.hospitalId || "1"}
                      >
                        {(doctor?.locations && doctor.locations.length > 0
                          ? doctor.locations
                          : [
                              {
                                hospitalId: "1",
                                name: "Central Medical Complex",
                              },
                              { hospitalId: "2", name: "City Health Plaza" },
                              {
                                hospitalId: "3",
                                name: "Downtown Specialist Center",
                              },
                            ]
                        ).map((clinic, idx) => (
                          <option
                            key={clinic.hospitalId || idx}
                            value={clinic.hospitalId || idx + 1}
                          >
                            {clinic.name}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
                        expand_more
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-typegray text-xs sm:text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      Available Tomorrow
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 border-t border-slate-100 dark:border-slate-700 pt-3 sm:pt-4">
                    <span className="text-xs sm:text-sm font-medium text-typegray">
                      Avg Fee:
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      {getConsultationFee()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-900/20 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-primary/20 dark:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-xs text-primary font-bold uppercase tracking-widest mb-3 sm:mb-4">
                Total Payable
              </p>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {getConsultationFee()}
                </span>
                <span className="text-xs sm:text-sm text-typegray">
                  VAT Included
                </span>
              </div>
              <button
                onClick={handleProceed}
                className="w-full bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white py-3 sm:py-4 rounded-lg sm:rounded-2xl font-bold text-sm sm:text-base transition-all shadow-lg shadow-primary/30 hover:shadow-xl transform hover:scale-105 duration-200"
              >
                Proceed to Booking
              </button>
              <p className="text-center mt-3 sm:mt-4 text-xs text-typegray flex items-center justify-center gap-1">
                <span>🔒</span>
                Secure Payment Powered by HealthConnect
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      <AppointmentModal
        visible={showAppointmentModal}
        onCancel={() => setShowAppointmentModal(false)}
        initialType={bookingType}
        initialDoctor={doctor}
      />
    </div>
  );
}
