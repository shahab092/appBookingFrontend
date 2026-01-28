import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DoctorCard from "../../componenets/DoctorSearch/DoctorCard";
import DoctorSearchBar from "../../componenets/DoctorSearch/DoctorSearchBar";
import { searchDoctors } from "../../features/DoctorSlice";

const DoctorSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchState = location.state || {};

  // Redux state
  const { doctors, loading, error } = useSelector((state) => state.doctor);

  // Local state to manage live filtering on this page
  const [currentQuery, setCurrentQuery] = useState(() => {
    // For display in search bar - use specialty NAME if coming from specialty click
    const val =
      searchState.specialityName ||
      searchState.search ||
      searchState.name ||
      searchState.query ||
      "";
    console.log("--- DoctorSearch initialized with query (for display):", val);
    return val;
  });
  const [currentCity, setCurrentCity] = useState(() => {
    const val = searchState.city || "";
    console.log("--- DoctorSearch initialized with city:", val);
    return val;
  });
  const [currentSpecialityId, setCurrentSpecialityId] = useState(() => {
    // For API request - use specialty ID
    const val = searchState.specialityId || "";
    console.log(
      "--- DoctorSearch initialized with specialityId (for API):",
      val,
    );
    return val;
  });

  // Fetch doctors whenever search params change
  useEffect(() => {
    console.log("--- DoctorSearch useEffect Triggered (Params Change) ---");
    console.log("Filters:", {
      search: currentQuery,
      city: currentCity,
      specialityId: currentSpecialityId,
    });

    dispatch(
      searchDoctors({
        search: currentSpecialityId ? "" : currentQuery, // Don't send search if we have specialityId
        city: currentCity,
        specialityId: currentSpecialityId,
      }),
    );
  }, [dispatch, currentQuery, currentCity, currentSpecialityId]);

  const handleSearchUpdate = (newQuery) => {
    console.log("handleSearchUpdate called with:", newQuery);
    setCurrentQuery(newQuery);
    setCurrentSpecialityId(""); // Clear specialty filter if user manually searches
  };

  const handleCityUpdate = (newCity) => {
    console.log("handleCityUpdate called with:", newCity);
    setCurrentCity(newCity);
  };

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
            <h1 className="text-white font-bold">Search Results</h1>
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
              Found {doctors.length} Specialists
            </h2>
            <p className="text-typegray font-medium">
              Top rated doctors available for you
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-sm text-typegray pl-2 font-medium">
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
          {loading ? (
            <div className="text-center py-20 flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-gray-500 font-medium">
                Searching for best doctors...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-red-100">
              <h3 className="text-red-600 mb-2">Search Error</h3>
              <p className="text-gray-500">
                {typeof error === "string"
                  ? error
                  : "Something went wrong while fetching doctors."}
              </p>
            </div>
          ) : doctors.length > 0 ? (
            doctors.map((doctor) => {
              // Map API response to DoctorCard props
              const mappedDoctor = {
                id: doctor.doctorId || doctor.id || "NA",
                name: doctor.name || "NA",
                image:
                  doctor.image ||
                  "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600",
                specialty: doctor.speciality || doctor.superSpeciality || "NA",
                qualifications:
                  doctor.education?.length > 0
                    ? doctor.education.map((e) => e.degree || "NA").join(", ")
                    : "NA",
                experience: doctor.experience ?? "NA",
                reviews: doctor.numReviews ?? "NA",
                satisfaction:
                  doctor.completenessScore !== undefined &&
                  doctor.completenessScore !== null
                    ? `${doctor.completenessScore}%`
                    : "NA",
                tags: doctor.services?.length > 0 ? doctor.services : ["NA"],
                consultations:
                  doctor.locations?.length > 0
                    ? doctor.locations.map((loc) => ({
                        title: loc.name || "NA",
                        subtitle: doctor.address?.city || "NA",
                        price: "Rs. 2,500",
                        type: "inclinic",
                      }))
                    : [
                        {
                          title: "Online Consultation",
                          subtitle: "Instant Video Call",
                          price: "Rs. 2,000",
                          type: "video",
                          highlight: true,
                        },
                      ],
              };

              return <DoctorCard key={mappedDoctor.id} doctor={mappedDoctor} />;
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="text-gray-300 mb-4 flex justify-center">
                <SearchIcon size={64} className="opacity-20" />
              </div>
              <h3 className="text-gray-800 mb-2">No Doctors Found</h3>
              <p className="text-typegray">
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
