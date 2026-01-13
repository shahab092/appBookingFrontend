import React from "react";
import {
  FaAward,
  FaUserMd,
  FaHeart,
  FaStar,
  FaCheck,
  FaPlay,
  FaHandHoldingHeart,
  FaShieldAlt,
} from "react-icons/fa";

const About = () => {
  const achievements = [
    {
      icon: <FaAward className="text-3xl" />,
      value: "15+",
      label: "Years Experience",
    },
    {
      icon: <FaUserMd className="text-3xl" />,
      value: "50K+",
      label: "Patients Helped",
    },
    {
      icon: <FaHeart className="text-3xl" />,
      value: "25+",
      label: "Expert Doctors",
    },
    {
      icon: <FaStar className="text-3xl" />,
      value: "98%",
      label: "Success Rate",
    },
  ];

  const values = [
    {
      icon: <FaHandHoldingHeart className="text-2xl" />,
      title: "Compassionate Care",
      description:
        "We provide empathetic mental health support with genuine care and understanding.",
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Safe Environment",
      description:
        "Your privacy and comfort are our top priorities in a secure, confidential space.",
    },
    {
      icon: <FaCheck className="text-2xl" />,
      title: "Proven Methods",
      description:
        "Evidence-based treatments backed by scientific research and clinical expertise.",
    },
  ];

  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-20 lg:py-32 bg-linear-to-br from-white via-blue-50 to-cyan-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-cyan-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-blue-200/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/20 text-primary px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold mb-4 sm:mb-5 md:mb-6 shadow-lg border border-primary/30">
            <FaAward className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base md:text-lg">
              Why Choose Us
            </span>
          </div>
          <h1 className="text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight px-2">
            Leading Psychiatry Care
            <br />
            <span className="bg-linear-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
              That Transforms Lives
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium px-4">
            We combine cutting-edge medical expertise with genuine compassion to
            deliver exceptional psychiatric care that creates lasting positive
            change in your life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
          {/* Left Side - Visual */}
          <div className="relative">
            {/* Main Image Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-blue-100">
              <div className="aspect-square bg-linear-to-br from-primary to-primary/80 rounded-xl sm:rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-white text-center z-10 px-4">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
                    🧠
                  </div>
                  <h3 className="font-bold mb-1 sm:mb-2">Mental Wellness</h3>
                  <p className="text-blue-100 text-sm sm:text-base">
                    Your Journey to Better Health
                  </p>
                </div>
                {/* Animated background elements */}
                <div className="absolute top-4 left-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 right-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-1/4 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white/15 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Floating Elements - Responsive positioning */}
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 bg-primary text-white px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl sm:rounded-2xl shadow-2xl">
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl font-bold">
                  15+
                </div>
                <div className="text-xs sm:text-sm opacity-90">Years</div>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 bg-white px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl sm:rounded-2xl shadow-2xl border border-blue-200">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-0.5 sm:space-x-1 mb-0.5 sm:mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-400 fill-current w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                    />
                  ))}
                </div>
                <div className="text-gray-900 font-bold text-sm sm:text-base md:text-lg">
                  4.9/5
                </div>
                <div className="text-gray-500 text-xs sm:text-sm">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            <div>
              <h2 className="text-gray-900 mb-4 sm:mb-5 md:mb-6">
                Leading Psychiatry Care{" "}
                <span className="text-primary font-bold">You Can Trust</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-5 md:mb-6 font-medium">
                Our hospital has been at the forefront of mental healthcare for
                over 15 years, providing comprehensive psychiatric services with
                a patient-centered approach.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
                We believe in treating the whole person, not just the symptoms.
                Our team of expert psychiatrists and mental health professionals
                work together to create personalized treatment plans for each
                individual.
              </p>
            </div>

            {/* Values List */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 sm:space-x-4 group"
                >
                  <div className="bg-primary text-white p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                    {value.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 mb-1 sm:mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-5 md:pt-6">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                <FaUserMd size={18} className="sm:w-5 sm:h-5" />
                <span>Our Story</span>
              </button>

              <button className="border-2 border-primary text-primary px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 font-bold text-sm sm:text-base flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                <FaPlay
                  size={16}
                  className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]"
                />
                <span>Watch Video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-blue-100">
                <div className="text-primary flex justify-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                    {achievement.icon}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {achievement.value}
                </div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">
                  {achievement.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 bg-linear-to-r from-primary to-primary/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-white mb-4 sm:mb-5 md:mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-7 md:mb-8 px-4 font-medium">
              "To create a world where mental health is prioritized, understood,
              and accessible to all. We envision a community where everyone has
              the support they need to achieve mental wellness and live
              fulfilling lives."
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button className="bg-white text-primary px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl hover:bg-blue-50 transition-all duration-300 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto">
                Our Approach
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl hover:bg-white hover:text-primary transition-all duration-300 font-bold text-sm sm:text-base transform hover:scale-105 w-full sm:w-auto">
                Meet the Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
