import React from 'react';
import { FaStar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCalendarAlt } from 'react-icons/fa';

const Doctors = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15+ years",
      rating: 4.9,
      image: "👩‍⚕️",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      experience: "12+ years",
      rating: 4.8,
      image: "👨‍⚕️",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Pediatrician",
      experience: "10+ years",
      rating: 4.9,
      image: "👩‍⚕️",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "18+ years",
      rating: 4.7,
      image: "👨‍⚕️",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
      }
    }
  ];

  return (
    <section id="doctors" className="py-12 sm:py-14 md:py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Meet Our <span className="text-blue-600">Expert Doctors</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Our team of experienced and certified medical professionals is dedicated to providing 
            you with the best healthcare experience with compassion and excellence.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Doctor Image with Social Overlay */}
              <div className="relative overflow-hidden">
                <div className="h-40 sm:h-44 md:h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-5xl sm:text-6xl text-white">{doctor.image}</span>
                </div>
                
                {/* Social Links Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                  <div className="flex space-x-2 sm:space-x-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <a href={doctor.social.facebook} className="bg-white p-2 sm:p-2.5 md:p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200">
                      <FaFacebook size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                    </a>
                    <a href={doctor.social.twitter} className="bg-white p-2 sm:p-2.5 md:p-3 rounded-full text-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-200">
                      <FaTwitter size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                    </a>
                    <a href={doctor.social.instagram} className="bg-white p-2 sm:p-2.5 md:p-3 rounded-full text-pink-600 hover:bg-pink-600 hover:text-white transition-colors duration-200">
                      <FaInstagram size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                    </a>
                    <a href={doctor.social.linkedin} className="bg-white p-2 sm:p-2.5 md:p-3 rounded-full text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200">
                      <FaLinkedin size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                    </a>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white text-blue-600 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md">
                  {doctor.experience}
                </div>
              </div>
              
              {/* Doctor Info */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate">{doctor.name}</h3>
                <p className="text-blue-600 font-semibold mb-2 text-sm sm:text-base truncate">{doctor.specialty}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-0.5 sm:space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar 
                        key={index} 
                        className={`${
                          index < Math.floor(doctor.rating) 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                        } ${index === 4 && doctor.rating % 1 > 0 ? "text-yellow-400" : ""}`}
                        size={12}
                        // className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                      />
                    ))}
                    <span className="text-gray-600 ml-1 sm:ml-2 font-semibold text-xs sm:text-sm">{doctor.rating}</span>
                  </div>
                </div>
                
                {/* Book Appointment Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  <FaCalendarAlt size={14} className="sm:w-4 sm:h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 sm:py-3.5 md:py-4 px-6 sm:px-7 md:px-8 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
            View All Doctors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Doctors;