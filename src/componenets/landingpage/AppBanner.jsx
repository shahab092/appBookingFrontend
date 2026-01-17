import React, { useState, useEffect } from "react";

const AppBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative py-16 md:py-24 px-4 max-w-7xl mx-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-success/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-success/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-gradient-to-r from-primary/5 to-primary/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="flex flex-col gap-12 lg:gap-20 md:flex-row md:items-center">
        {/* Text Content */}
        <div
          className={`flex flex-col gap-8 md:flex-1 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="space-y-6">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary/25 hover:scale-105 transition-transform duration-300 group">
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="material-symbols-outlined text-base animate-pulse">
                  verified
                </span>
              </div>
              <span>#1 Rated Health App 2024</span>
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                Gold Award
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-[#0d131b] dark:text-white">
                Your Health,
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent animate-gradient">
                    Managed Simply.
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-success rounded-full"></span>
                </span>
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-xl font-medium leading-relaxed max-w-[600px]">
                Connect with certified doctors, track medical records securely,
                and manage prescriptions—all from{" "}
                <span className="font-bold text-primary">MediCare</span> in your
                pocket.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { icon: "verified_user", label: "HIPAA Secure" },
                { icon: "medication", label: "E-Prescriptions" },
                { icon: "videocam", label: "Video Consult" },
                { icon: "monitor_heart", label: "Health Track" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-primary/10 dark:from-blue-900/30 dark:to-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      {feature.icon}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="group relative flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary text-white px-6 sm:px-8 h-14 sm:h-16 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 hover:-translate-y-1 active:scale-95 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="material-symbols-outlined text-lg sm:text-xl animate-bounce">
                download
              </span>
              <span>Download MediCare</span>
            </button>
            <button className="group flex items-center justify-center gap-2 sm:gap-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/5 px-6 sm:px-8 h-14 sm:h-16 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:-translate-y-1">
              <span className="text-slate-800 dark:text-white group-hover:text-primary">
                Watch Demo
              </span>
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                play_circle
              </span>
            </button>
          </div>

          {/* Stats & Users */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-6">
            {/* User Avatars */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
              <div className="flex -space-x-3 sm:-space-x-4">
                {[
                  "bg-gradient-to-r from-blue-400 to-cyan-400",
                  "bg-gradient-to-r from-emerald-400 to-green-400",
                  "bg-gradient-to-r from-purple-400 to-pink-400",
                  "bg-gradient-to-r from-orange-400 to-red-400",
                  "bg-gradient-to-r from-primary to-blue-500",
                ].map((gradient, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 sm:border-3 border-white dark:border-slate-900 ${gradient} flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-lg`}
                  >
                    {index === 4 ? "✓" : `U${index + 1}`}
                  </div>
                ))}
              </div>
              <div className="sm:ml-16 sm:pl-4 sm:border-l border-slate-300 dark:border-slate-700">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                    50K+
                  </span>
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Active Users
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1">
                  4.9★ App Store Rating
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full sm:flex-1">
              {[
                { value: "500+", label: "Doctors" },
                { value: "24/7", label: "Support" },
                { value: "99%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-2 sm:p-3 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">
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
          className={`relative w-full max-w-md mx-auto md:order-2 transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {/* Floating Elements */}
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-2xl animate-float-slow"></div>
          <div
            className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-r from-success/20 to-primary/20 rounded-full blur-2xl animate-float-slow"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Realistic Phone Container */}
          <div className="relative perspective-1000">
            {/* Phone Shadow */}
            <div className="absolute inset-0 w-[320px] h-[640px] mx-auto bg-gradient-to-t from-black/30 to-transparent rounded-[60px] blur-xl transform translate-y-8"></div>

            {/* Phone Frame */}
            <div className="relative w-[260px] sm:w-[280px] md:w-[300px] h-[520px] sm:h-[560px] md:h-[620px] mx-auto bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-[36px] sm:rounded-[40px] md:rounded-[44px] shadow-2xl shadow-black/40 overflow-hidden">
              {/* Phone Curved Edges */}
              <div className="absolute inset-0 rounded-[36px] sm:rounded-[40px] md:rounded-[44px] border-8 sm:border-10 md:border-[12px] border-slate-900/80 pointer-events-none"></div>

              {/* Screen Reflection */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/5 to-transparent rounded-t-[36px] sm:rounded-t-[40px] md:rounded-t-[44px] pointer-events-none"></div>

              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20 flex items-center justify-center gap-2 px-4">
                <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                <div className="w-16 h-4 bg-slate-800/80 rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-slate-400">MediCare</span>
                </div>
                <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
              </div>

              {/* Side Buttons */}
              <div className="absolute top-32 -right-1 w-1 h-10 bg-slate-900 rounded-l-sm"></div>
              <div className="absolute top-48 -right-1 w-1 h-16 bg-slate-900 rounded-l-sm"></div>
              <div className="absolute top-36 -left-1 w-1 h-20 bg-slate-900 rounded-r-sm"></div>

              {/* Screen Content */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 m-2.5 sm:m-2.5 md:m-3 rounded-[28px] sm:rounded-[30px] md:rounded-[32px] overflow-hidden">
                {/* Status Bar */}
                <div className="pt-10 px-6">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-semibold text-slate-800 dark:text-white">
                      9:41 AM
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-blue-500 rounded-full"></div>
                      <span className="text-[10px] font-bold text-slate-800 dark:text-white">
                        5G
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                      <div className="w-4 h-2 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                      <div className="w-6 h-2 bg-slate-800 dark:bg-slate-600 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* App Header */}
                <div className="px-6 pt-6 pb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-white text-2xl">
                          medical_services
                        </span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-[8px] text-white">✓</span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-slate-900 dark:text-white">
                        MediCare
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-500 text-xs">
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          4.9 (50K+)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health Dashboard */}
                <div className="px-4 sm:px-5 md:px-6 mb-4 sm:mb-5 md:mb-6">
                  <div className="bg-gradient-to-r from-primary/5 to-success/5 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 md:p-4 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          Health Dashboard
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Updated 2 min ago
                        </p>
                      </div>
                      <div className="text-xs text-primary font-bold">
                        View All
                      </div>
                    </div>

                    {/* Health Rings */}
                    <div className="grid grid-cols-3 gap-3">
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
                          <div className="relative w-16 h-16 mx-auto mb-2">
                            {/* Background Ring */}
                            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
                            {/* Progress Ring */}
                            <div
                              className={`absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent bg-gradient-to-r ${item.color} clip-progress`}
                              //   style={{ '--progress': `${item.percent}%` } as React.CSSProperties}
                            ></div>
                            {/* Center Value */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-lg font-black text-slate-900 dark:text-white">
                                {item.value}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="px-4 sm:px-5 md:px-6 mb-4 sm:mb-5 md:mb-6">
                  <div className="grid grid-cols-4 gap-2 sm:gap-2.5 md:gap-3">
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
                        <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl sm:rounded-xl md:rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 mx-auto">
                          <div
                            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ${action.color} rounded-lg sm:rounded-lg md:rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
                          >
                            <span className="material-symbols-outlined text-white text-base sm:text-base md:text-lg">
                              {action.icon}
                            </span>
                          </div>
                        </div>
                        <span className="block text-center text-[10px] sm:text-[11px] md:text-xs font-medium text-slate-700 dark:text-slate-300 mt-1.5 sm:mt-1.5 md:mt-2">
                          {action.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Consultation */}
                <div className="mx-4 sm:mx-5 md:mx-6">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl sm:rounded-xl md:rounded-2xl p-3 sm:p-3.5 md:p-4 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">
                              stethoscope
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            Dr. Sarah Lee
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-600 dark:text-slate-400">
                              Cardiologist
                            </span>
                            {/* <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                              LIVE
                            </span> */}
                          </div>
                        </div>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-white text-sm">
                          video_camera_front
                        </span>
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        Next available: 3:00 PM
                      </span>
                      <span className="text-xs font-bold text-primary">
                        Join Now →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/50 rounded-full dark:border-slate-700/50 p-3">
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
                        className={`flex flex-col items-center ${item.primary ? "relative -top-4" : ""}`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${item.primary ? "bg-gradient-to-r from-primary to-primary/80 shadow-lg" : ""}`}
                        >
                          <span
                            className={`material-symbols-outlined ${item.primary ? "text-white" : item.active ? "text-primary" : "text-slate-500"}`}
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

            {/* Floating Notification */}
            <div className="absolute -right-6 top-1/4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-2xl shadow-black/30 border border-slate-200 dark:border-slate-700 animate-bounce-slow hidden lg:block max-w-[160px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-success to-success/80 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">
                    notifications
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-900 dark:text-white">
                    Health Tip
                  </p>
                  <p className="text-[8px] text-slate-500">Stay Hydrated!</p>
                </div>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300">
                Drink 8 glasses today
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppBanner;
