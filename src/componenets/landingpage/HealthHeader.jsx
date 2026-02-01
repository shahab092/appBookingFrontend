import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaChevronDown,
  FaUserMd,
  FaStethoscope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ServiceCards from "./ServiceCards";
import PaymentMethodModal from "../common/PaymentMethodModal";
import CustomModal from "../common/CustomModal";
import api from "../../libs/api";

// Premium Background Images
const HERO_IMAGES = [
  "/assets/img/img_one.png",
  "/assets/img/WhatsApp Image 2026-01-12 at 1.17.25 PM.jpeg",
];

// Specialities Data for fallback
const SPECIALITIES = [
  { id: 1, name: "Gynecologist", icon: "👩‍⚕️", count: 245 },
  { id: 2, name: "Skin Specialist", icon: "✨", count: 189 },
  { id: 3, name: "Child Specialist", icon: "👶", count: 312 },
  { id: 4, name: "Neurologist", icon: "🧠", count: 134 },
  { id: 5, name: "Orthopedic Surgeon", icon: "🦴", count: 167 },
  { id: 6, name: "Gastroenterologist", icon: "🥗", count: 98 },
  { id: 7, name: "Endocrinologist", icon: "⚖️", count: 76 },
  { id: 8, name: "Cardiologist", icon: "❤️", count: 210 },
  { id: 9, name: "Dentist", icon: "🦷", count: 287 },
  { id: 10, name: "Psychiatrist", icon: "🧠", count: 123 },
  { id: 11, name: "ENT Specialist", icon: "👂", count: 145 },
  { id: 12, name: "Urologist", icon: "💧", count: 89 },
  { id: 13, name: "Oncologist", icon: "🩺", count: 67 },
  { id: 14, name: "Rheumatologist", icon: "🦵", count: 54 },
  { id: 15, name: "Nephrologist", icon: "🫀", count: 72 },
];

const pakistanCities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
];

const SpecialitiesModal = ({ isOpen, onClose, specialities = [] }) => {
  const navigate = useNavigate();
  const displaySpecialities =
    specialities.length > 0 ? specialities : SPECIALITIES;

  const handleSpecialityClick = (speciality) => {
    console.log("--- Speciality Clicked (Modal) ---", speciality.speciality);
    navigate("/doctorSearch", {
      state: {
        specialityId:
          speciality._id || speciality.specialityId || speciality.id,
        specialityName: speciality.speciality || speciality.name,
      },
    });
    onClose();
  };

  return (
    <CustomModal
      visible={isOpen}
      title="Select Specialty"
      subtitle="Choose a category to find specialized doctors"
      onCancel={onClose}
      showSubmit={false}
      width={600}
    >
      <div className="flex flex-col gap-2">
        {displaySpecialities.map((speciality, idx) => (
          <button
            key={speciality._id || speciality.specialityId || idx}
            onClick={() => handleSpecialityClick(speciality)}
            className="w-full flex items-center justify-between p-1 hover:bg-primary/5 rounded-xl transition-all duration-200 text-left group border border-transparent hover:border-primary/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110">
                <FaStethoscope size={16} />
              </div>
              <div>
                <span className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-primary transition-colors">
                  {speciality.speciality}
                </span>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Professional Medical Care
                </p>
              </div>
            </div>
            <div className="text-[10px] font-bold text-primary/60 bg-primary/5 px-2 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
              {speciality.count || 0} Doctors
            </div>
          </button>
        ))}
      </div>
    </CustomModal>
  );
};

// Main Hero Component with Background Slideshow
const HealthHero = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showSpecialities, setShowSpecialities] = useState(false);
  const [cities, setCities] = useState([]);
  const [dynamicSpecialities, setDynamicSpecialities] = useState([]);

  const getCity = async () => {
    try {
      const res = await api.get("/doctor/cities");
      if (res.data?.success) {
        setCities(res.data.data.cities || []);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getSpecialities = async () => {
    try {
      const res = await api.get("/specialities");
      console.log("Full API Response:", res.data);

      if (res.data?.success) {
        // Handle multiple possible response structures
        const specialitiesData =
          res.data.data?.speciality || // Try res.data.data.speciality first
          res.data.data?.specialities || // Try res.data.data.specialities
          res.data.data || // Try res.data.data directly (if it's an array)
          res.data.speciality || // Try res.data.speciality
          res.data.specialities || // Try res.data.specialities
          [];

        console.log("Extracted Specialities:", specialitiesData);
        setDynamicSpecialities(
          Array.isArray(specialitiesData) ? specialitiesData : [],
        );
      }
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // 5s interval for better energy

    getCity();
    getSpecialities();

    return () => clearInterval(timer);
  }, []);

  const openSpecialitiesModal = () => {
    setShowSpecialities(true);
  };

  const closeSpecialitiesModal = () => {
    setShowSpecialities(false);
  };

  return (
    <div className="relative min-h-[720px] sm:min-h-[calc(100vh-74px)] py-8 sm:py-12 md:py-16 flex items-center py-2 justify-center flex-col bg-neutral-950 md:mb-36 sm:mb-24">
      {/* Specialities Modal */}
      <SpecialitiesModal
        isOpen={showSpecialities}
        onClose={closeSpecialitiesModal}
        specialities={dynamicSpecialities}
      />

      {/* Dynamic Background Slideshow */}
      <div className="absolute inset-0 z-0 bg-neutral-900 overflow-hidden">
        {/* Persistent Base Image to prevent black flash */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={HERO_IMAGES[0]}
            alt="background-base"
            className="w-full h-full object-cover"
          />
        </div>

        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              idx === currentIdx ? "opacity-80 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={img}
              alt={`Healthcare background ${idx + 1}`}
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                idx === currentIdx ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        ))}

        {/* Cinematic Overlays - Stronger black overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/90 to-black/60 z-20"></div>

        {/* Animated Accent Blobs for Depth */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-3 sm:px-4 text-center z-10">
        {/* Main Heading with Gradient Highlight */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight">
          Your Health is Our <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 animate-gradient-x">
            Expert Priority
          </span>
        </h1>

        {/* Search Component with Subtle Glow */}
        <div className="max-w-4xl mx-auto mb-3 sm:mb-4 md:mb-6 relative z-50 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <SearchComponent cities={cities} />
        </div>

        {/* Categories section */}
        <div className="max-w-5xl mx-auto relative z-0">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {dynamicSpecialities &&
              dynamicSpecialities.length > 0 &&
              dynamicSpecialities
                .slice(0, 5)
                .map((spec, idx) => (
                  <CategoryPill
                    key={spec._id || spec.specialityId || spec.id || idx}
                    icon={<FaStethoscope size={16} />}
                    label={spec.speciality}
                    specialityId={spec._id || spec.specialityId || spec.id}
                    active={idx === 0}
                  />
                ))}

            {/* "View More" Button */}
            <button
              onClick={openSpecialitiesModal}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full transition-all duration-300 text-[10px] sm:text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md"
            >
              <span className="font-medium whitespace-nowrap">View All</span>
              <FaChevronDown className="w-2.5 h-2.5 opacity-60" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        .rotate-270 {
          transform: rotate(270deg);
        }
      `}</style>

      <div className="mt-12 sm:absolute left-0 right-0 -bottom-24 sm:-bottom-25 md:-bottom-15 lg:-bottom-10 z-0 w-full">
        <ServiceCards />
      </div>
    </div>
  );
};

// Category Pill Component
const CategoryPill = ({ icon, label, specialityId, active = false }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    console.log("--- Category Clicked (Pill) ---", label, "ID:", specialityId);
    navigate("/doctorSearch", {
      state: {
        specialityId: specialityId,
        specialityName: label,
      },
    });
  };

  return (
    <button
      onClick={handleCategoryClick}
      className={`
      flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full transition-all duration-300 text-[10px] sm:text-xs
      ${
        active
          ? "bg-white text-primary shadow-md scale-105"
          : "bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm"
      }
    `}
    >
      <span className={active ? "text-primary" : "text-white"}>{icon}</span>
      <span className="font-medium whitespace-nowrap">{label}</span>
    </button>
  );
};

// Search Component
const SearchComponent = ({ cities = [] }) => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);
  const blurTimeoutRef = useRef(null);
  const [show, setShow] = useState(true);

  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);

  // Debounce logic for suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log("--- HealthHeader Suggestion Debounce Triggered ---");
      console.log("searchQuery:", searchQuery, "selectedCity:", selectedCity);

      if (searchQuery.trim().length >= 3) {
        // min three char required to fetch doctor
        try {
          setIsSuggestionsLoading(true);
          const res = await api.get("/doctor/search", {
            params: { search: searchQuery, city: selectedCity },
          });
          console.log(
            "Suggestions API Success Response (HealthHeader):",
            res.data,
          );
          const docs =
            res.data?.data?.doctors || res.data?.data || res.data || [];
          console.log("Extracted Doctors for suggestions:", docs);
          setSuggestions(Array.isArray(docs) ? docs : []);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Suggestions API Error (HealthHeader):", error);
        } finally {
          setIsSuggestionsLoading(false);
        }
      } else {
        console.log("Search query too short for suggestions (< 3 chars)");
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCity]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    console.log("--- HealthHeader Search Triggered ---");
    console.log("search:", searchQuery, "city:", selectedCity);
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    setShowSuggestions(false);
    navigate("/doctorSearch", {
      state: { search: searchQuery, city: selectedCity },
    });
  };

  const handleBlur = () => {
    // No longer automatically searching on blur to allow manual clicks
    // Only keeping the timeout to give time for suggestion clicks
    blurTimeoutRef.current = setTimeout(() => {}, 200);
  };

  const handleSuggestionClick = (doctor) => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    setSearchQuery(doctor.name);
    setShowSuggestions(false);
    navigate("/doctorSearch", {
      state: { search: doctor.name, city: selectedCity },
    });
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="w-full relative z-50">
        <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-1 bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-2xl p-2 sm:p-3 md:p-4 border border-white/20">
          {/* Location Selector */}
          <div className="w-full sm:w-1/4 order-2 sm:order-1">
            {show && <PaymentMethodModal onClose={() => setShow(false)} />}
            <div className="relative h-full">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-full p-2.5 sm:p-3 pl-9 sm:pl-11 pr-7 sm:pr-8 bg-white border border-gray-200 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none appearance-none text-gray-800 font-medium text-xs sm:text-sm hover:border-gray-300 transition-colors"
                title="Select City"
              >
                <option value="">All Pakistan</option>
                {cities.length > 0 ? (
                  <optgroup label="Registered Cities">
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </optgroup>
                ) : (
                  <>
                    <optgroup label="Punjab">
                      {pakistanCities.slice(0, 20).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Sindh">
                      {pakistanCities.slice(20, 30).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </optgroup>
                  </>
                )}
              </select>
              <FaMapMarkerAlt
                className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-primary"
                size={14}
              />
              <FaChevronDown
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={10}
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-2/4 order-1 sm:order-2 relative">
            <div className="relative h-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim().length >= 3) {
                    console.log(
                      "HealthHeader focused with 3+ chars, showing suggestions",
                    );
                    setShowSuggestions(true);
                  }
                }}
                onBlur={handleBlur}
                placeholder="Search doctors, specialists..."
                className="w-full h-full p-2.5 sm:p-3 pl-9 sm:pl-11 pr-10 bg-white border border-gray-200 sm:border-l-0 sm:border-r-0 rounded-lg sm:rounded-none focus:border-primary focus:ring-0 focus:outline-none text-gray-800 font-medium text-xs sm:text-sm hover:border-gray-300 transition-colors"
                autoComplete="off"
              />
              <FaSearch
                className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-primary"
                size={14}
              />
              {isSuggestionsLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Suggestions Dropdown - FIXED with proper z-index */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0  bg-white rounded-lg shadow-2xl border border-gray-100 z-[9999] overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 z-[99993423424234]">
                {suggestions.length > 0 ? (
                  suggestions.map((doctor) => (
                    <button
                      key={doctor.id}
                      type="button"
                      onMouseDown={() => handleSuggestionClick(doctor)}
                      className="w-full flex items-center p-2 sm:p-3 hover:bg-gray-50 transition-colors text-left group border-b border-gray-50 last:border-0"
                    >
                      <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3 border border-gray-100 shrink-0 group-hover:border-primary transition-colors">
                        {/* <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        /> */}
                        <div className="bg-amber-100 w-full h-full rounded-full flex items-center justify-center">
                          {doctor.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-primary transition-colors flex items-center truncate">
                          {doctor.name || "NA"}
                          {doctor.isVerified && (
                            <FaUserMd
                              className="ml-1 text-primary flex-shrink-0"
                              size={10}
                            />
                          )}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {doctor.speciality || doctor.superSpeciality || "NA"}{" "}
                          • {doctor.experience ?? "NA"} Exp
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <div className="text-gray-400 mb-2 text-3xl">🔍</div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">
                      No Results
                    </h4>
                    <p className="text-xs text-gray-500">
                      Try searching with different keywords.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="w-full sm:w-1/4 order-3">
            <button
              type="submit"
              className="w-full h-full bg-primary hover:bg-primary/90 text-white rounded-lg sm:rounded-r-lg sm:rounded-l-none font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 p-2.5 sm:p-3 text-xs sm:text-sm md:text-base"
            >
              <FaSearch size={14} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Updated HealthHeader Component
const HealthHeader = () => {
  return (
    <>
      <HealthHero />
    </>
  );
};

export default HealthHeader;
export { SearchComponent };
