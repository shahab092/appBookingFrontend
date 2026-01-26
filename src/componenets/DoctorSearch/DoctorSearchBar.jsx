import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, ChevronDown, User } from "lucide-react";
import api from "../../libs/api";

const DoctorSearchBar = ({
  initialQuery = "",
  initialCity = "",
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

  // Sync props
  useEffect(() => {
    setSearchQuery(initialQuery);
    isUserTyping.current = false;
  }, [initialQuery]);

  useEffect(() => {
    setSelectedCity(initialCity);
  }, [initialCity]);

  // Outside click close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log("--- DoctorSearchBar Suggestion Debounce Triggered ---");
      console.log("searchQuery:", searchQuery, "selectedCity:", selectedCity);

      if (isUserTyping.current && searchQuery.trim().length >= 3) {
        try {
          console.log("Fetching suggestions (SearchBar) with params:", {
            search: searchQuery,
            city: selectedCity,
          });
          const res = await api.get("/doctor/search", {
            params: { search: searchQuery, city: selectedCity },
          });
          console.log(
            "Suggestions API Success Response (SearchBar):",
            res.data,
          );
          const docs =
            res.data?.data?.doctors || res.data?.data || res.data || [];
          console.log("Extracted Doctors (SearchBar):", docs);
          setSuggestions(Array.isArray(docs) ? docs : []);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Suggestions API Error (SearchBar):", error);
        }
      } else {
        if (isUserTyping.current) {
          console.log("Suggestion criteria not met (length < 3 or not typing)");
        }
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCity]);

  const handleInputChange = (e) => {
    isUserTyping.current = true;
    setSearchQuery(e.target.value);
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    isUserTyping.current = false;
    setShowSuggestions(false);
    if (onSearch) onSearch(searchQuery);
  };

  const handleSuggestionClick = (doctor) => {
    console.log("--- Suggestion Clicked (SearchBar) ---");
    console.log("Selected doctor:", doctor);
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    isUserTyping.current = false;
    setSearchQuery(doctor.name);
    setShowSuggestions(false);
    if (onSearch) onSearch(doctor.name);
  };

  const handleCityChangeLocal = (e) => {
    setSelectedCity(e.target.value);
    if (onCityChange) onCityChange(e.target.value);
  };

  const [cities, setCities] = useState([]);

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

  useEffect(() => {
    getCity();
  }, []);

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

  return (
    <div
      className="w-full bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl relative"
      ref={dropdownRef}
    >
      <form
        onSubmit={handleManualSearch}
        className="flex flex-col lg:flex-row gap-3 items-stretch"
      >
        {/* City Selector */}
        <div className="relative flex-1 lg:max-w-[200px]">
          <MapPin
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary"
            size={18}
          />
          <select
            value={selectedCity}
            onChange={handleCityChangeLocal}
            className="w-full h-full pl-10 pr-8 py-2.5 bg-gray-50 border border-transparent rounded-xl outline-none appearance-none text-gray-700 font-bold focus:bg-white focus:border-blue-100 transition-all cursor-pointer text-sm"
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
              pakistanCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))
            )}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={14}
          />
        </div>

        {/* Search Input */}
        <div className="relative flex-2">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary"
            size={18}
          />

          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => {
              if (searchQuery.trim().length >= 3) {
                console.log(
                  "SearchBar focused with 3+ chars, showing suggestions",
                );
                isUserTyping.current = true;
                setShowSuggestions(true);
              }
            }}
            placeholder="Search doctors, specialties, or departments..."
            className="w-full h-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-blue-100 transition-all text-gray-700 font-bold text-sm placeholder:text-gray-400"
            autoComplete="off"
          />

          {/* ✅ Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
              {suggestions.length > 0 ? (
                suggestions.map((doctor) => (
                  <button
                    key={doctor.id}
                    type="button"
                    onMouseDown={() => handleSuggestionClick(doctor)}
                    className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors text-left group border-b border-gray-50 last:border-0"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-100 shrink-0">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-gray-800 truncate flex items-center">
                        {doctor.name || "NA"}
                        {doctor.isVerified && (
                          <User className="ml-1 text-primary" size={12} />
                        )}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {doctor.speciality || doctor.superSpeciality || "NA"} •{" "}
                        {doctor.experience ?? "NA"} Exp
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500 text-sm">
                  No doctors found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-linear-to-r from-primary to-emerald-500 hover:brightness-105 active:scale-[0.98] text-white font-bold px-8 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Search size={16} />
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default DoctorSearchBar;
