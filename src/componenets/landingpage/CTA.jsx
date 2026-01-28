import React from "react";
import {
  FaCalendarCheck,
  FaPhone,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section
      id="contact"
      className="py-24 bg-linear-to-br from-primary via-primary/80 to-primary/90 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Content */}
              <div className="text-white space-y-8">
                <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-5 py-2 w-fit border border-white/30">
                  <FaCalendarCheck className="text-yellow-300 text-lg" />
                  <span className="text-sm font-bold tracking-wide">
                    Get Started Today
                  </span>
                </div>

                <div>
                  <h1 className="leading-tight mb-3">Ready to Take</h1>
                  <h1 className="leading-tight bg-linear-to-r from-yellow-300 via-amber-200 to-cyan-200 bg-clip-text text-transparent">
                    Control of Your Health?
                  </h1>
                </div>

                <p className="text-lg text-white leading-relaxed font-medium">
                  Join thousands of patients who have transformed their lives
                  through our comprehensive mental healthcare services. Your
                  path to wellness starts here.
                </p>

                {/* Key Benefits */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg shrink-0">
                      <FaCheckCircle className="text-yellow-300 text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">
                        World-Class Specialists
                      </p>
                      <p className="text-blue-100 text-base font-medium">
                        Experienced professionals dedicated to your care
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg shrink-0">
                      <FaShieldAlt className="text-yellow-300 text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">
                        Your Privacy is Sacred
                      </p>
                      <p className="text-blue-100 text-base font-medium">
                        Complete confidentiality guaranteed at all times
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg shrink-0">
                      <FaClock className="text-yellow-300 text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">
                        Always Available
                      </p>
                      <p className="text-blue-100 text-base font-medium">
                        24/7 support whenever you need it most
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <button
                    onClick={() => navigate("/")}
                    className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center space-x-2 group"
                  >
                    <FaCalendarCheck
                      size={22}
                      className="group-hover:rotate-12 transition-transform"
                    />
                    <span>Book Now</span>
                  </button>

                  <button className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
                    <FaPhone
                      size={22}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span>Call Us</span>
                  </button>
                </div>
              </div>

              {/* Right Content - Stats */}
              <div className="hidden lg:block pt-2">
                <div className="bg-white/10 rounded-2xl p-8 space-y-6 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center space-x-4 bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200">
                    <div className="bg-linear-to-br from-yellow-400 to-amber-500 rounded-full p-3 text-white text-2xl w-16 h-16 flex items-center justify-center shrink-0 shadow-lg">
                      ⭐
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">
                        98% Satisfaction
                      </p>
                      <p className="text-blue-100 text-base font-medium">
                        Trusted by patients
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200">
                    <div className="bg-linear-to-br from-cyan-400 to-blue-500 rounded-full p-3 text-white text-2xl w-16 h-16 flex items-center justify-center shrink-0 shadow-lg">
                      👨‍⚕️
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">
                        50+ Experts
                      </p>
                      <p className="text-blue-100 text-base font-medium">
                        Specialized doctors
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200">
                    <div className="bg-linear-to-br from-amber-400 to-yellow-500 rounded-full p-3 text-white text-2xl w-16 h-16 flex items-center justify-center shrink-0 shadow-lg">
                      ⏰
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">Same Day</p>
                      <p className="text-blue-100 text-base font-medium">
                        Quick appointments
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200">
                    <div className="bg-linear-to-br from-blue-400 to-cyan-500 rounded-full p-3 text-white text-2xl w-16 h-16 flex items-center justify-center shrink-0 shadow-lg">
                      🏥
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">
                        Modern Facility
                      </p>
                      <p className="text-blue-100 text-base font-medium">
                        State-of-the-art
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-white/20"></div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div className="text-center">
                <div className="text-4xl xs:text-5xl font-black text-yellow-300 mb-3">
                  50K+
                </div>
                <p className="text-blue-100 text-lg font-semibold">
                  Happy Patients
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl xs:text-5xl font-black text-yellow-300 mb-3">
                  15+
                </div>
                <p className="text-blue-100 text-lg font-semibold">
                  Years of Excellence
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl xs:text-5xl font-black text-yellow-300 mb-3">
                  24/7
                </div>
                <p className="text-blue-100 text-lg font-semibold">
                  Support Available
                </p>
              </div>
            </div>
          </div>

          {/* Secondary CTA Card */}
          <div className="mt-12 bg-white rounded-3xl shadow-2xl p-10 border-t-4 border-yellow-400">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-linear-to-br from-blue-500 to-cyan-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaCalendarCheck className="text-3xl" />
                </div>
                <h2 className="text-gray-900 mb-2">Quick Booking</h2>
                <p className="text-gray-700 font-medium">
                  Schedule in under 2 minutes
                </p>
              </div>
              <div>
                <div className="bg-linear-to-br from-blue-500 to-cyan-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaShieldAlt className="text-3xl" />
                </div>
                <h2 className="text-gray-900 mb-2">100% Secure</h2>
                <p className="text-gray-700 font-medium">
                  Your data is protected
                </p>
              </div>
              <div>
                <div className="bg-linear-to-br from-blue-500 to-cyan-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaClock className="text-3xl" />
                </div>
                <h2 className="text-gray-900 mb-2">Instant Access</h2>
                <p className="text-gray-700 font-medium">
                  Begin your journey today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
