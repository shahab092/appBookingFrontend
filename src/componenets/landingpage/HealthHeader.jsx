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
  Droplets
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_DOCTORS } from "../../constant/data";

// Main Hero Component with Background Image
const HealthHero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Healthcare background"
          className="w-full h-full object-cover"
        />
        {/* Blue Overlay with Blur - Using exact color #2d8fc6 */}
        <div className="absolute inset-0 bg-[#2d8fc6]/70 "></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d8fc6]/80 via-[#2d8fc6]/60 to-emerald-500/30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Your Health is
          <span className="block text-emerald-100 mt-2">
            Our Expert Priority
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-light">
          Find the best doctors, hospitals, and healthcare services across
          Pakistan with our comprehensive medical platform.
        </p>

        {/* Search Component */}
        <div className="max-w-4xl mx-auto">
          <SearchComponent />
        </div>

        {/* Categories section */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <CategoryPill
              icon={<FaStethoscope size={18} />}
              label="General Physician"
              active={true}
            />
            <CategoryPill
              icon={<Bone size={20} />}
              label="Dentist"
            />
            <CategoryPill
              icon={<Baby size={20} />}
              label="Pediatrician"
            />
            <CategoryPill
              icon={<Heart size={20} />}
              label="Cardiologist"
            />
            <CategoryPill
              icon={<Smile size={20} />}
              label="Dermatologist"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

// Category Pill Component
const CategoryPill = ({ icon, label, active = false }) => {
  return (
    <button
      className={`
      flex items-center space-x-3 px-6 py-4 rounded-full transition-all duration-300
      ${active
          ? "bg-white text-[#2d8fc6] shadow-lg scale-105"
          : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md"
        }
    `}
    >
      <span className={active ? "text-[#2d8fc6]" : "text-white"}>
        {icon}
      </span>
      <span className="font-semibold text-sm whitespace-nowrap">
        {label}
      </span>
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

  // Debounce logic for suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        const filtered = MOCK_DOCTORS.filter(
          (doc) =>
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
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
      {/* Search Form in Single Row */}
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex flex-col md:flex-row items-stretch bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-3 md:p-4 border border-white/20">
          {/* Location Selector */}
          <div className="w-full md:w-1/4 mb-2 md:mb-0 md:mr-1">
            <div className="relative h-full">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-full p-3 pl-11 pr-8 bg-white border border-gray-200 rounded-l-lg rounded-r-none focus:border-[#2d8fc6] focus:ring-2 focus:ring-[#2d8fc6]/30 focus:outline-none appearance-none text-gray-800 font-medium text-sm hover:border-gray-300 transition-colors"
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
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2d8fc6]"
                size={16}
              />
              <FaChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={12}
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-2/4 mb-2 md:mb-0 md:mx-1 relative">
            <div className="relative h-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>
                  searchQuery.trim().length > 1 && setShowSuggestions(true)
                }
                onBlur={handleBlur}
                placeholder="Search for doctors, specialists..."
                className="w-full h-full p-3 pl-11 pr-4 bg-white border border-gray-200 border-l-0 border-r-0 rounded-none focus:border-[#2d8fc6] focus:ring-0 focus:outline-none text-gray-800 font-medium hover:border-gray-300 transition-colors"
                autoComplete="off"
              />
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2d8fc6]"
                size={16}
              />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {suggestions.map((doctor) => (
                  <button
                    key={doctor.id}
                    type="button"
                    onMouseDown={() => handleSuggestionClick(doctor)}
                    className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors text-left group border-b border-gray-50 last:border-0"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-100 shrink-0 group-hover:border-[#2d8fc6] transition-colors">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#2d8fc6] transition-colors flex items-center">
                        {doctor.name}
                        {doctor.isVerified && (
                          <FaUserMd className="ml-1 text-[#2d8fc6]" size={12} />
                        )}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {doctor.specialty} • {doctor.experience} Exp
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="w-full md:w-1/4">
            <button
              type="submit"
              className="w-full h-full bg-[#2d8fc6] hover:bg-[#2478b3] text-white rounded-r-lg rounded-l-none font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 p-3"
            >
              <FaSearch size={18} />
              <span>Search</span>
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
