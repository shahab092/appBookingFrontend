import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, ChevronDown, User } from "lucide-react";
import { MOCK_DOCTORS } from "../../constant/data";

const DoctorSearchBar = ({
  initialQuery = "",
  initialCity = "Islamabad",
  onSearch,
  onCityChange,
}) => {
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);
  const blurTimeoutRef = useRef(null);
  const isUserTyping = useRef(false);

  // Sync with prop when it changes (e.g. from navigation or landing page)
  useEffect(() => {
    setSearchQuery(initialQuery);
    isUserTyping.current = false; // Reset when syncing from external Source
  }, [initialQuery]);

  useEffect(() => {
    setSelectedCity(initialCity);
  }, [initialCity]);

  // Handle outside click for suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce logic for suggestions and auto-search
  useEffect(() => {
    const timer = setTimeout(() => {
      // Update suggestions - Only if the user is actively typing
      if (isUserTyping.current && searchQuery.trim().length > 1) {
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

      // Trigger search if handler exists
      if (onSearch) onSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleInputChange = (e) => {
    isUserTyping.current = true;
    setSearchQuery(e.target.value);
  };

  const handleCityChangeLocal = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (onCityChange) onCityChange(city);
  };

  const handleManualSearch = (e) => {
    if (e) e.preventDefault();
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    isUserTyping.current = false;
    setShowSuggestions(false);
    if (onSearch) onSearch(searchQuery);
  };

  const handleSuggestionClick = (doctor) => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    isUserTyping.current = false;
    setSearchQuery(doctor.name);
    setShowSuggestions(false);
    if (onSearch) onSearch(doctor.name);
  };

  const pakistanCities = [
    "Islamabad",
    "Lahore",
    "Karachi",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
  ];

  return (
    <div
      className="w-full bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl p-2.5 md:p-3 shadow-xl"
      ref={dropdownRef}
    >
      <form
        onSubmit={handleManualSearch}
        className="flex flex-col lg:flex-row gap-3 items-stretch"
      >
        {/* City Selector */}
        <div className="relative flex-1 lg:max-w-[200px]">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2d8fc6]">
            <MapPin size={18} strokeWidth={2} />
          </div>
          <select
            value={selectedCity}
            onChange={handleCityChangeLocal}
            className="w-full h-full pl-10 pr-8 py-2.5 bg-gray-50 border border-transparent rounded-xl outline-none appearance-none text-gray-700 font-semibold focus:bg-white focus:border-blue-100 transition-all cursor-pointer text-sm"
          >
            <option value="">All Pakistan</option>
            {pakistanCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <ChevronDown size={14} />
          </div>
        </div>

        {/* Main Search Input */}
        <div className="relative flex-2">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2d8fc6]">
            <Search size={18} strokeWidth={2} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => {
              if (searchQuery.trim().length > 1) {
                isUserTyping.current = true;
                setShowSuggestions(true);
              }
            }}
            placeholder="Search doctors, specialties, or departments..."
            className="w-full h-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-blue-100 transition-all text-gray-700 font-semibold text-sm placeholder:text-gray-400"
            autoComplete="off"
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {suggestions.map((doctor) => (
                <button
                  key={doctor.id}
                  type="button"
                  onMouseDown={() => handleSuggestionClick(doctor)}
                  className="w-full flex items-center p-3 hover:bg-blue-50/50 transition-colors text-left group border-b border-gray-50 last:border-0"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-100 shrink-0 group-hover:border-[#2d8fc6] transition-colors">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#2d8fc6] transition-colors flex items-center">
                      {doctor.name}
                      {doctor.isVerified && (
                        <User className="ml-1 text-[#2d8fc6]" size={12} />
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
        <button
          type="submit"
          className="bg-linear-to-r from-[#2d8fc6] to-emerald-500 hover:brightness-105 active:scale-[0.98] text-white font-bold px-8 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Search size={16} strokeWidth={3} />
          SEARCH
        </button>
      </form>

      {/* Discrete Filters Row */}
      <div className="flex flex-wrap items-center gap-2 mt-2.5 pt-2.5 border-t border-gray-50">
        <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200/50">
          Filters
        </span>
        <FilterBtn text="Near Me" active />
        <FilterBtn text="Fee < 500" />
        <FilterBtn text="Top Rated" />
        <FilterBtn text="Online" />
        <FilterBtn text="Today" />
        <FilterBtn text="Fee" hasArrow />
        <button
          onClick={() => setSearchQuery("")}
          className="ml-auto text-[11px] text-gray-400 hover:text-red-500 font-bold transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const FilterBtn = ({ text, hasArrow, active }) => {
  return (
    <button
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
        active
          ? "bg-[#2d8fc6] text-white shadow-sm"
          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200"
      }`}
    >
      {text}
      {hasArrow && <ChevronDown size={12} />}
    </button>
  );
};

export default DoctorSearchBar;
