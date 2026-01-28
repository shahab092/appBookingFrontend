import React from "react";
import {
  FaCalendarCheck,
  FaPhone,
  FaStar,
  FaUserMd,
  FaHeart,
  FaLock,
  FaClock,
  FaAward,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const psychiatrists = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Clinical Psychiatrist",
      experience: "15+ years",
      rating: 4.9,
      avatar: "👩‍⚕️",
      expertise: ["Depression", "Anxiety", "PTSD"],
    },
    {
      name: "Dr. Ahmed Khan",
      specialty: "Child Psychiatrist",
      experience: "12+ years",
      rating: 4.8,
      avatar: "👨‍⚕️",
      expertise: ["ADHD", "Autism", "Behavioral Issues"],
    },
  ];

  return (
    <section
      id="home"
      className="relative bg-linear-to-br from-primary via-primary/80 to-primary/90 min-h-screen sm:min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-24 h-24 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8 sm:py-12 lg:py-16 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30 mx-auto lg:mx-0">
              <FaAward className="text-yellow-300 text-sm sm:text-base" />
              <span className="font-semibold text-xs sm:text-sm md:text-base">
                Leading Psychiatry Care Since 2005
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="leading-tight mb-3 sm:mb-4 md:mb-6">
              <span className="block text-white mb-2">Your Journey to</span>
              <span className="block bg-linear-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                Optimal Mental Health
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Professional psychiatric care with compassion and understanding.
              We provide evidence-based treatments for mental health conditions
              in a supportive and confidential environment.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 py-4 sm:py-5 md:py-6 bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 backdrop-blur-sm border border-white/20">
              {[
                { icon: "🎯", text: "Personalized Treatment Plans" },
                { icon: "💊", text: "Medication Management" },
                { icon: "👥", text: "Expert Therapy Sessions" },
                { icon: "🆘", text: "24/7 Crisis Support" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:bg-white/20 transition-all"
                >
                  <span className="text-2xl sm:text-3xl shrink-0">
                    {feature.icon}
                  </span>
                  <span className="text-blue-50 font-semibold text-sm sm:text-base md:text-lg">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 pt-4 sm:pt-6 md:pt-8 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/")}
                className="bg-primary text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl transition-all duration-300 font-bold text-sm sm:text-base md:text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3 group w-full sm:w-auto"
              >
                <FaCalendarCheck
                  size={18}
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform"
                />
                <span>Book Your Appointment</span>
              </button>

              <button className="border-2 border-white text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all duration-300 font-bold text-sm sm:text-base md:text-lg backdrop-blur-sm flex items-center justify-center space-x-2 sm:space-x-3 group w-full sm:w-auto">
                <FaPhone
                  size={16}
                  className="sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-125 transition-transform"
                />
                <span>Talk to an Expert</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-5 md:pt-6">
              <div className="flex items-center space-x-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                <FaUserMd className="text-green-300 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="text-blue-100 text-xs sm:text-sm">
                  Expert Psychiatrists
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                <FaLock className="text-green-300 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="text-blue-100 text-xs sm:text-sm">
                  Complete Privacy
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                <FaClock className="text-green-300 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="text-blue-100 text-xs sm:text-sm">
                  Flexible Timings
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Psychiatrists Section */}
          <div className="relative mt-8 lg:mt-0">
            {/* Main Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-white/20 shadow-2xl">
              <div className="text-center mb-4 sm:mb-5 md:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                  Our Expert Psychiatrists
                </h3>
                <p className="text-blue-200 text-sm sm:text-base">
                  Dedicated to your mental wellness
                </p>
              </div>

              {/* Psychiatrists List */}
              <div className="space-y-3 sm:space-y-4">
                {psychiatrists.map((doctor, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                        <span className="text-xl sm:text-2xl">
                          {doctor.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm sm:text-base md:text-lg truncate">
                          {doctor.name}
                        </h4>
                        <p className="text-blue-200 text-xs sm:text-sm truncate">
                          {doctor.specialty}
                        </p>
                        <div className="flex items-center space-x-1 sm:space-x-2 mt-1 flex-wrap">
                          <div className="flex items-center space-x-0.5 sm:space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className="text-yellow-300 w-2.5 h-2.5 sm:w-3 sm:h-3"
                              />
                            ))}
                            <span className="text-white text-xs ml-0.5 sm:ml-1">
                              {doctor.rating}
                            </span>
                          </div>
                          <span className="text-blue-300 text-xs">•</span>
                          <span className="text-blue-200 text-xs">
                            {doctor.experience}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      {doctor.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-white/20 text-blue-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-6 pt-3 sm:pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-white font-bold text-sm sm:text-base md:text-lg">
                    5K+
                  </div>
                  <div className="text-blue-200 text-xs">Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-sm sm:text-base md:text-lg">
                    15+
                  </div>
                  <div className="text-blue-200 text-xs">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-sm sm:text-base md:text-lg">
                    98%
                  </div>
                  <div className="text-blue-200 text-xs">Success</div>
                </div>
              </div>
            </div>

            {/* Emergency Card */}
            <div className="mt-4 sm:mt-5 md:mt-6 bg-red-500/20 backdrop-blur-sm border border-red-300/30 rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <FaHeart className="text-red-300 w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-white font-bold text-sm sm:text-base">
                    Urgent Support
                  </h4>
                  <p className="text-red-100 text-xs sm:text-sm">
                    Immediate assistance available
                  </p>
                </div>
              </div>
              <button className="w-full mt-2 sm:mt-3 bg-red-500 hover:bg-red-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-colors duration-200 flex items-center justify-center space-x-2">
                <FaPhone size={14} className="sm:w-4 sm:h-4" />
                <span>Call: 1-800-HELP-NOW</span>
              </button>
            </div>

            {/* Floating Elements - Hidden on mobile */}
            <div className="hidden sm:block absolute -top-3 -right-3 bg-yellow-400 text-gray-900 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold text-xs sm:text-sm shadow-lg">
              ⭐ Trusted
            </div>
            <div className="hidden sm:block absolute -bottom-3 -left-3 bg-green-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold text-xs sm:text-sm shadow-lg">
              🕒 Open 24/7
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 text-white fill-current"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
