import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DoctorCard from "../../componenets/DoctorSearch/DoctorCard";
import DoctorSearchBar from "../../componenets/DoctorSearch/DoctorSearchBar";
import { MOCK_DOCTORS } from "../../constant/data";

const DoctorSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchState = location.state || {};

  // Local state to manage live filtering on this page
  const [currentQuery, setCurrentQuery] = useState(searchState.query || "");
  const [currentCity, setCurrentCity] = useState(searchState.city || "");

  const handleSearchUpdate = (newQuery) => {
    setCurrentQuery(newQuery);
  };

  const handleCityUpdate = (newCity) => {
    setCurrentCity(newCity);
  };

  const filteredDoctors = MOCK_DOCTORS.filter((doctor) => {
    const query = currentQuery.toLowerCase();
    const city = currentCity.toLowerCase();

    const matchesQuery =
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query) ||
      doctor.tags.some((tag) => tag.toLowerCase().includes(query));

    // Simple city match if needed
    const matchesCity =
      !city ||
      doctor.consultations.some((c) => c.subtitle.toLowerCase().includes(city));

    return matchesQuery && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Search Section - Full Width */}
      <div className="bg-primary py-10 px-4 mb-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Back Button and Title */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/")}
              className="p-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-md transition-all active:scale-95 group"
              title="Go Back"
            >
              <ArrowLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <h1 className="text-white">Search Results</h1>
          </div>

          {/* Search Bar - Full Width within Container */}
          <div className="w-full">
            <DoctorSearchBar
              initialQuery={currentQuery}
              initialCity={currentCity}
              onSearch={handleSearchUpdate}
              onCityChange={handleCityUpdate}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Results Info and Filter Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 px-2">
          <div>
            <h2 className="text-gray-800">
              Found {filteredDoctors.length} Specialists
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Top rated doctors available for you
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-sm text-gray-400 pl-2 font-medium">
              Sort by:
            </span>
            <select className="text-sm font-bold bg-transparent outline-none cursor-pointer text-primary pr-2">
              <option>Recommended</option>
              <option>Highest Rating</option>
              <option>Most Experience</option>
              <option>Fee: Low to High</option>
            </select>
          </div>
        </div>

        {/* Doctor Cards Grid/List */}
        <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="text-gray-300 mb-4 flex justify-center">
                <Search size={64} className="opacity-20" />
              </div>
              <h3 className="text-gray-800 mb-2">No Doctors Found</h3>
              <p className="text-gray-500 font-medium">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;
