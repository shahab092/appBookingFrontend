import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaChevronDown,
  FaUserMd,
  FaStethoscope,
} from "react-icons/fa";
import {
  Stethoscope,
  Baby,
  Heart,
  Activity,
  Smile,
  Syringe,
  Eye,
  Bone,
  Brain,
  Droplets,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_DOCTORS } from "../../constant/data";
import ServiceCards from "./ServiceCards";
import PaymentMethodModal from "../common/PaymentMethodModal";

// Premium Background Images
const HERO_IMAGES = [
  "/assets/img/img_one.png",
  "/assets/img/WhatsApp Image 2026-01-12 at 1.17.25 PM.jpeg",
];

// OptionButton Component
const OptionButton = ({ icon, label, gradient }) => {
  return (
    <button
      className={`
      group relative flex flex-col items-center justify-center 
      w-20 h-20 xs:w-22 xs:h-22 sm:w-24 sm:h-24 md:w-28 md:h-28 
      rounded-2xl overflow-hidden transition-all duration-300 
      hover:scale-105 hover:shadow-2xl active:scale-95
      backdrop-blur-md border border-white/20
    `}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:opacity-100 transition-opacity`}
      ></div>

      {/* Inner Shadow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

      {/* Icon */}
      <div className="relative mb-1 sm:mb-2 text-2xl xs:text-2xl sm:text-3xl md:text-4xl">
        {icon}
      </div>

      {/* Label */}
      <span className="relative text-[10px] xs:text-xs sm:text-sm font-bold text-white text-center px-1 leading-tight">
        {label}
      </span>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
    </button>
  );
};

// Main Hero Component with Background Slideshow
const HealthHero = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // 5s interval for better energy
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[720px] sm:min-h-[calc(100vh-74px)] py-8 sm:py-12 md:py-16 flex items-center py-2 justify-center flex-col bg-neutral-950 md:mb-36 sm:mb-24">
      {/* Dynamic Background Slideshow */}
      <div className="absolute inset-0 z-0 bg-neutral-900 overflow-hidden">
        {/* Persistent Base Image to prevent black flash */}
        <div className="absolute inset-0 opacity-20">
          {/* <div className="relative w-full h-full"> */}
          <img
            src={HERO_IMAGES[0]}
            alt="background-base"
            className="w-full h-full object-cover"
          />
          {/* </div> */}
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
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12 relative z-50 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <SearchComponent />
        </div>
        {/* Categories section */}

        {/* <h3>Search doctor my department</h3> */}
        <div className="mt-6 sm:mt-8 md:mt-12 max-w-5xl mx-auto relative z-0">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <CategoryPill
              icon={
                <FaStethoscope size={16} className="sm:w-[18px] sm:h-[18px]" />
              }
              label="General Physician"
              active={true}
            />
            <CategoryPill
              icon={<Bone size={18} className="sm:w-5 sm:h-5" />}
              label="Dentist"
            />
            <CategoryPill
              icon={<Baby size={18} className="sm:w-5 sm:h-5" />}
              label="Pediatrician"
            />
            <CategoryPill
              icon={<Heart size={18} className="sm:w-5 sm:h-5" />}
              label="Cardiologist"
            />
            <CategoryPill
              icon={<Smile size={18} className="sm:w-5 sm:h-5" />}
              label="Dermatologist"
            />
          </div>
        </div>
        {/* Bottom Options Section */}
        {/* Bottom Services Section - Exactly as in screenshot */}
      </div>

      {/* Styled Scroll Indicator */}
      {/* <div className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-gradient-to-b from-blue-400 to-emerald-400 rounded-full mt-2"></div>
        </div>
      </div> */}

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
      <div className="mt-8  sm:absolute left-0 right-0 -bottom-24 sm:-bottom-50 md:-bottom-32 lg:-bottom-18 z-50">
        <ServiceCards />
      </div>
    </div>
  );
};

// Category Pill Component
const CategoryPill = ({ icon, label, active = false }) => {
  return (
    <button
      className={`
      flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 md:px-5 py-2 sm:py-3 md:py-4 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base
      ${
        active
          ? "bg-white text-primary shadow-lg scale-105"
          : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md"
      }
    `}
    >
      <span className={active ? "text-primary" : "text-white"}>{icon}</span>
      <span className="font-semibold whitespace-nowrap">{label}</span>
    </button>
  );
};

// Search Component
const SearchComponent = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);
  const blurTimeoutRef = useRef(null);
  const [show, setShow] = useState(true);

  // Debounce logic for suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        const filtered = MOCK_DOCTORS.filter(
          (doc) =>
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
        ).slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    setShowSuggestions(false);
    navigate("/doctorSearch", {
      state: { query: searchQuery, city: selectedCity },
    });
  };

  const handleBlur = () => {
    // Small delay to allow clicking on suggestions
    blurTimeoutRef.current = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        handleSearch();
      }
    }, 200);
  };

  const handleSuggestionClick = (doctor) => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    setSearchQuery(doctor.name);
    setShowSuggestions(false);
    navigate("/doctorSearch", {
      state: { query: doctor.name, city: selectedCity },
    });
  };

  // All Pakistan Cities (Provinces and Major Cities)
  const pakistanCities = [
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Multan",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Sheikhupura",
    "Jhang",
    "Rahim Yar Khan",
    "Gujrat",
    "Kasur",
    "Sahiwal",
    "Okara",
    "Wah Cantonment",
    "Dera Ghazi Khan",
    "Mandi Bahauddin",
    "Chiniot",
    "Kamoke",
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Nawabshah",
    "Mirpur Khas",
    "Jacobabad",
    "Shikarpur",
    "Khairpur",
    "Dadu",
    "Peshawar",
    "Mardan",
    "Mingora",
    "Kohat",
    "Abbottabad",
    "Dera Ismail Khan",
    "Charsadda",
    "Nowshera",
    "Swabi",
    "Mansehra",
    "Quetta",
    "Turbat",
    "Khuzdar",
    "Chaman",
    "Gwadar",
    "Dera Allah Yar",
    "Zhob",
    "Usta Muhammad",
    "Sibi",
    "Loralai",
    "Islamabad",
    "Muzaffarabad",
    "Mirpur",
    "Rawalakot",
    "Kotli",
    "Bhimber",
    "Gilgit",
    "Skardu",
    "Chilas",
    "Ghizer",
    "Khaplu",
  ];

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
                <optgroup label="Khyber Pakhtunkhwa">
                  {pakistanCities.slice(30, 40).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Balochistan">
                  {pakistanCities.slice(40, 50).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Territories">
                  {pakistanCities.slice(50).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </optgroup>
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
                onFocus={() =>
                  searchQuery.trim().length > 1 && setShowSuggestions(true)
                }
                onBlur={handleBlur}
                placeholder="Search doctors, specialists..."
                className="w-full h-full p-2.5 sm:p-3 pl-9 sm:pl-11 pr-3 sm:pr-4 bg-white border border-gray-200 sm:border-l-0 sm:border-r-0 rounded-lg sm:rounded-none focus:border-primary focus:ring-0 focus:outline-none text-gray-800 font-medium text-xs sm:text-sm hover:border-gray-300 transition-colors"
                autoComplete="off"
              />
              <FaSearch
                className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-primary"
                size={14}
              />
            </div>

            {/* Suggestions Dropdown - Using z-index to appear above category chips */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl border border-gray-100 z-50 overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                {suggestions.length > 0 ? (
                  suggestions.map((doctor) => (
                    <button
                      key={doctor.id}
                      type="button"
                      onMouseDown={() => handleSuggestionClick(doctor)}
                      className="w-full flex items-center p-2 sm:p-3 hover:bg-gray-50 transition-colors text-left group border-b border-gray-50 last:border-0"
                    >
                      <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3 border border-gray-100 shrink-0 group-hover:border-primary transition-colors">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-primary transition-colors flex items-center truncate">
                          {doctor.name}
                          {doctor.isVerified && (
                            <FaUserMd
                              className="ml-1 text-primary flex-shrink-0"
                              size={10}
                            />
                          )}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {doctor.specialty} • {doctor.experience} Exp
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <div className="text-gray-400 mb-2 text-3xl">🔍</div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">
                      No Doctors Found
                    </h4>
                    <p className="text-xs text-gray-500">
                      Try searching with different keywords or doctor specialty.
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
