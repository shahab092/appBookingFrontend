import React, { useState, useEffect } from "react";
import AppButtons from "../common/AppButtons";

const AppBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-to-r from-primary/5 to-success/5 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] bg-gradient-to-r from-primary/5 to-success/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] bg-gradient-to-r from-primary/5 to-primary/10 rounded-full blur-2xl sm:blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/20 rounded-full animate-float hidden sm:block"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="flex flex-col gap-8 sm:gap-12 lg:gap-20 xl:gap-24 lg:flex-row lg:items-center">
        {/* Text Content */}
        <div
          className={`flex flex-col gap-6 sm:gap-8 lg:flex-1 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="space-y-4 sm:space-y-6">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary/25 hover:scale-105 transition-transform duration-300 group">
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm sm:text-base animate-pulse">
                  verified
                </span>
              </div>
              <span className="hidden xs:inline">#1 Rated Health App 2024</span>
              <span className="inline xs:hidden">Top Rated 2024</span>
              <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-white/20 rounded-full text-[10px] sm:text-xs">
                Gold
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-[#0d131b] dark:text-white leading-tight">
                Your Health,
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent animate-gradient">
                    Managed Simply.
                  </span>
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-primary to-success rounded-full"></span>
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-full lg:max-w-[90%] xl:max-w-[600px]">
                Connect with certified doctors, track medical records securely,
                and manage prescriptions—all from{" "}
                <span className="font-bold text-primary">MediCare</span> in your
                pocket.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4">
              {[
                { icon: "verified_user", label: "HIPAA Secure" },
                { icon: "medication", label: "E-Prescriptions" },
                { icon: "videocam", label: "Video Consult" },
                { icon: "monitor_heart", label: "Health Track" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-2 sm:p-3 md:p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-100 to-primary/10 dark:from-blue-900/30 dark:to-primary/20 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-xl md:text-2xl">
                      {feature.icon}
                    </span>
                  </div>
                  <span className="text-[10px] xs:text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* App Buttons */}
          <div className="pt-2 sm:pt-4">
            <AppButtons />
          </div>

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pt-4 sm:pt-6">
            {/* Users Avatars */}
            {/* <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex -space-x-2 sm:-space-x-3 md:-space-x-4">
                {[
                  "bg-gradient-to-r from-blue-400 to-cyan-400",
                  "bg-gradient-to-r from-emerald-400 to-green-400",
                  "bg-gradient-to-r from-purple-400 to-pink-400",
                  "bg-gradient-to-r from-orange-400 to-red-400",
                  "bg-gradient-to-r from-primary to-blue-500",
                ].map((gradient, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full border-2 border-white dark:border-slate-900 ${gradient} flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md sm:shadow-lg`}
                  >
                    {index === 4 ? "✓" : `U${index + 1}`}
                  </div>
                ))}
              </div>
              <div className="sm:pl-4 md:pl-6 sm:border-l border-slate-300 dark:border-slate-700">
                <div className="flex items-baseline gap-1 sm:gap-2">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                    50K+
                  </span>
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Active Users
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                  4.9★ App Store Rating
                </p>
              </div>
            </div> */}

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full sm:flex-1">
              {[
                { value: "500+", label: "Doctors" },
                { value: "24/7", label: "Support" },
                { value: "99%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-2 sm:p-3 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-base sm:text-lg md:text-xl font-black text-slate-800 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Realistic Mobile Mockup */}
        <div
          className={`relative w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto lg:order-2 lg:flex-1 transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {/* Floating Elements */}
          <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl sm:blur-2xl animate-float-slow"></div>
          <div
            className="absolute -bottom-8 -right-8 sm:-bottom-10 sm:-right-10 w-36 h-36 sm:w-48 sm:h-48 bg-gradient-to-r from-success/20 to-primary/20 rounded-full blur-xl sm:blur-2xl animate-float-slow"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating Notification - Hidden on mobile, visible on lg+ */}
          <div className="absolute -right-4 sm:-right-6 top-1/4 bg-white dark:bg-slate-800 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl shadow-black/30 border border-slate-200 dark:border-slate-700 animate-bounce-slow hidden lg:block max-w-[140px] sm:max-w-[160px] z-[3000]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-success to-success/80 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xs sm:text-sm">
                  notifications
                </span>
              </div>
              <div>
                <p className="text-[10px] sm:text-[10px] font-bold text-slate-900 dark:text-white">
                  Health Tip
                </p>
                <p className="text-[8px] sm:text-[8px] text-slate-500">
                  Stay Hydrated!
                </p>
              </div>
            </div>
            <div className="text-[10px] sm:text-xs text-slate-700 dark:text-slate-300">
              Drink 8 glasses today
            </div>
          </div>

          {/* Realistic Phone Container */}
          <div className="relative perspective-1000">
            {/* Phone Shadow */}
            <div className="absolute inset-0 w-[240px] h-[480px] xs:w-[280px] xs:h-[560px] sm:w-[320px] sm:h-[640px] mx-auto bg-gradient-to-t from-black/30 to-transparent rounded-[40px] sm:rounded-[60px] blur-lg sm:blur-xl transform translate-y-6 sm:translate-y-8"></div>

            {/* Phone Frame */}
            <div className="relative w-[200px] h-[400px] xs:w-[240px] xs:h-[480px] sm:w-[280px] sm:h-[560px] md:w-[300px] md:h-[620px] mx-auto bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-[28px] xs:rounded-[32px] sm:rounded-[36px] md:rounded-[44px] shadow-xl sm:shadow-2xl shadow-black/40 overflow-hidden">
              {/* Phone Curved Edges */}
              <div className="absolute inset-0 rounded-[28px] xs:rounded-[32px] sm:rounded-[36px] md:rounded-[44px] border-6 xs:border-8 sm:border-10 md:border-[12px] border-slate-900/80 pointer-events-none"></div>

              {/* Screen Reflection */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/5 to-transparent rounded-t-[28px] xs:rounded-t-[32px] sm:rounded-t-[36px] md:rounded-t-[44px] pointer-events-none"></div>

              {/* Dynamic Island */}
              <div className="absolute top-2 xs:top-3 left-1/2 transform -translate-x-1/2 w-24 xs:w-28 sm:w-32 h-4 xs:h-5 sm:h-6 bg-black rounded-full z-20 flex items-center justify-center gap-1 xs:gap-2 px-2 xs:px-3 sm:px-4">
                <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-slate-700 rounded-full"></div>
                <div className="w-12 xs:w-14 sm:w-16 h-3 xs:h-3.5 sm:h-4 bg-slate-800/80 rounded-full flex items-center justify-center">
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-slate-400">
                    MediCare
                  </span>
                </div>
                <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-slate-700 rounded-full"></div>
              </div>

              {/* Side Buttons */}
              <div className="absolute top-24 xs:top-32 sm:top-32 -right-0.5 xs:-right-1 w-0.5 xs:w-1 h-6 xs:h-8 sm:h-10 bg-slate-900 rounded-l-sm"></div>
              <div className="absolute top-36 xs:top-48 sm:top-48 -right-0.5 xs:-right-1 w-0.5 xs:w-1 h-10 xs:h-12 sm:h-16 bg-slate-900 rounded-l-sm"></div>
              <div className="absolute top-28 xs:top-36 sm:top-36 -left-0.5 xs:-left-1 w-0.5 xs:w-1 h-12 xs:h-14 sm:h-20 bg-slate-900 rounded-r-sm"></div>

              {/* Screen Content */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 m-1.5 xs:m-2 sm:m-2.5 md:m-3 rounded-[20px] xs:rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden">
                {/* Status Bar */}
                <div className="pt-6 xs:pt-8 sm:pt-10 px-3 xs:px-4 sm:px-6">
                  <div className="flex justify-between items-center">
                    <div className="text-xs xs:text-sm font-semibold text-slate-800 dark:text-white">
                      9:41 AM
                    </div>
                    <div className="flex items-center gap-0.5 xs:gap-1">
                      <div className="w-2 h-2 xs:w-3 xs:h-3 bg-gradient-to-r from-primary to-blue-500 rounded-full"></div>
                      <span className="text-[8px] xs:text-[10px] font-bold text-slate-800 dark:text-white">
                        5G
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 xs:gap-1">
                      <div className="w-2 h-1.5 xs:w-3 xs:h-2 sm:w-4 sm:h-2 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                      <div className="w-2 h-1.5 xs:w-3 xs:h-2 sm:w-4 sm:h-2 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                      <div className="w-3 h-1.5 xs:w-4 xs:h-2 sm:w-6 sm:h-2 bg-slate-800 dark:bg-slate-600 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* App Header */}
                <div className="px-3 xs:px-4 sm:px-6 pt-3 xs:pt-4 sm:pt-6 pb-4 xs:pb-6 sm:pb-8">
                  <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                    <div className="relative">
                      <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-xl xs:rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md sm:shadow-lg">
                        <span className="material-symbols-outlined text-white text-lg xs:text-xl sm:text-2xl">
                          medical_services
                        </span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-[8px] text-white">✓</span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-base xs:text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        MediCare
                      </h2>
                      <div className="flex items-center gap-1 xs:gap-2 mt-0.5 xs:mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className="text-yellow-500 text-xs xs:text-xs"
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] xs:text-xs text-slate-600 dark:text-slate-400">
                          4.9 (50K+)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health Dashboard */}
                <div className="px-2 xs:px-3 sm:px-4 md:px-6 mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                  <div className="bg-gradient-to-r from-primary/5 to-success/5 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg xs:rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-3.5 md:p-4 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex justify-between items-center mb-2 xs:mb-3 sm:mb-4">
                      <div>
                        <p className="text-xs xs:text-sm font-semibold text-slate-800 dark:text-white">
                          Health Dashboard
                        </p>
                        <p className="text-[10px] xs:text-xs text-slate-600 dark:text-slate-400">
                          Updated 2 min ago
                        </p>
                      </div>
                      <div className="text-[10px] xs:text-xs text-primary font-bold">
                        View All
                      </div>
                    </div>

                    {/* Health Rings */}
                    <div className="grid grid-cols-3 gap-1 xs:gap-2 sm:gap-3">
                      {[
                        {
                          value: "72",
                          label: "Heart",
                          color: "from-red-400 to-red-500",
                          percent: "85",
                        },
                        {
                          value: "98%",
                          label: "Score",
                          color: "from-green-400 to-emerald-500",
                          percent: "98",
                        },
                        {
                          value: "8h",
                          label: "Sleep",
                          color: "from-blue-400 to-cyan-500",
                          percent: "90",
                        },
                      ].map((item, index) => (
                        <div key={index} className="text-center">
                          <div className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 mx-auto mb-1 xs:mb-2">
                            {/* Background Ring */}
                            <div className="absolute inset-0 w-full h-full rounded-full border-3 xs:border-4 border-slate-200 dark:border-slate-700"></div>
                            {/* Progress Ring */}
                            <div
                              className={`absolute inset-0 w-full h-full rounded-full border-3 xs:border-4 border-transparent bg-gradient-to-r ${item.color} clip-progress`}
                            ></div>
                            {/* Center Value */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-sm xs:text-base sm:text-lg font-black text-slate-900 dark:text-white">
                                {item.value}
                              </div>
                            </div>
                          </div>
                          <div className="text-[10px] xs:text-xs text-slate-600 dark:text-slate-400">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="px-2 xs:px-3 sm:px-4 md:px-6 mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                  <div className="grid grid-cols-4 gap-1 xs:gap-1.5 sm:gap-2.5 md:gap-3">
                    {[
                      {
                        icon: "videocam",
                        label: "Video",
                        color: "bg-primary",
                      },
                      {
                        icon: "medication",
                        label: "Pharmacy",
                        color: "bg-success",
                      },
                      {
                        icon: "folder",
                        label: "Records",
                        color: "bg-purple-500",
                      },
                      {
                        icon: "calendar_month",
                        label: "Schedule",
                        color: "bg-orange-500",
                      },
                    ].map((action, index) => (
                      <div key={index} className="group relative">
                        <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 mx-auto">
                          <div
                            className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 ${action.color} rounded-md xs:rounded-lg sm:rounded-lg md:rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
                          >
                            <span className="material-symbols-outlined text-white text-xs xs:text-sm sm:text-base md:text-lg">
                              {action.icon}
                            </span>
                          </div>
                        </div>
                        <span className="block text-center text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs font-medium text-slate-700 dark:text-slate-300 mt-1 xs:mt-1.5 sm:mt-1.5 md:mt-2">
                          {action.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Consultation */}
                <div className="mx-2 xs:mx-3 sm:mx-4 md:mx-6">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-2xl p-2 xs:p-3 sm:p-3.5 md:p-4 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 xs:gap-3">
                        <div className="relative">
                          <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm xs:text-base">
                              stethoscope
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 xs:w-4 xs:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <p className="text-xs xs:text-sm font-bold text-slate-900 dark:text-white">
                            Dr. Sarah Lee
                          </p>
                          <div className="flex items-center gap-1 xs:gap-2">
                            <span className="text-[10px] xs:text-xs text-slate-600 dark:text-slate-400">
                              Cardiologist
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shadow-md sm:shadow-lg hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-white text-xs xs:text-sm">
                          video_camera_front
                        </span>
                      </button>
                    </div>
                    <div className="mt-2 xs:mt-3 flex items-center justify-between">
                      <span className="text-[10px] xs:text-xs text-slate-600 dark:text-slate-400">
                        Next: 3:00 PM
                      </span>
                      <span className="text-[10px] xs:text-xs font-bold text-primary">
                        Join Now →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-700/50 rounded-b-[20px] xs:rounded-b-[24px] sm:rounded-b-[28px] md:rounded-b-[32px] p-2 xs:p-3">
                  <div className="grid grid-cols-5">
                    {[
                      { icon: "home", active: true },
                      { icon: "search" },
                      { icon: "add_circle", primary: true },
                      { icon: "notifications" },
                      { icon: "person" },
                    ].map((item, index) => (
                      <button
                        key={index}
                        className={`flex flex-col items-center ${item.primary ? "relative -top-3 xs:-top-4" : ""}`}
                      >
                        <div
                          className={`w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${item.primary ? "bg-gradient-to-r from-primary to-primary/80 shadow-md sm:shadow-lg" : ""}`}
                        >
                          <span
                            className={`material-symbols-outlined text-sm xs:text-base ${item.primary ? "text-white" : item.active ? "text-primary" : "text-slate-500"}`}
                          >
                            {item.icon}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppBanner;
