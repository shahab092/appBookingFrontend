import React from 'react';
import { FaHeartbeat, FaBrain, FaXRay, FaPills, FaUsers, FaArrowRight, FaStethoscope, FaFlask } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FaHeartbeat className="text-4xl" />,
      title: "ECG Services",
      description: "Comprehensive electrocardiogram testing to monitor heart health and detect any cardiac abnormalities with precision and care.",
      features: ["Resting ECG", "Stress Test ECG", "24-hour Holter Monitoring", "Quick Results"],
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      id: 2,
      icon: <FaBrain className="text-4xl" />,
      title: "EEG Services",
      description: "Advanced electroencephalogram testing for brain activity monitoring, essential for neurological and psychiatric assessments.",
      features: ["Digital EEG", "Sleep Study EEG", "Ambulatory EEG", "Expert Analysis"],
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: 3,
      icon: <FaXRay className="text-4xl" />,
      title: "X-Ray Imaging",
      description: "State-of-the-art digital X-ray services for accurate diagnostic imaging with minimal radiation exposure.",
      features: ["Digital X-Ray", "Chest X-Ray", "Bone Imaging", "Same Day Reports"],
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 4,
      icon: <FaFlask className="text-4xl" />,
      title: "Laboratory",
      description: "Fully equipped modern laboratory with advanced testing facilities for accurate and timely diagnostic results.",
      features: ["Blood Tests", "Urine Analysis", "Biochemistry", "Hormonal Assays"],
      color: "from-teal-500 to-green-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    },
    {
      id: 5,
      icon: <FaPills className="text-4xl" />,
      title: "Pharmacy",
      description: "Fully-stocked in-house pharmacy providing all prescribed medications with professional guidance and support.",
      features: ["All Medicines Available", "Expert Consultation", "Insurance Support", "Home Delivery"],
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: 6,
      icon: <FaUsers className="text-4xl" />,
      title: "Rehab Center",
      description: "Comprehensive rehabilitation programs for addiction recovery and mental health restoration with 24/7 care.",
      features: ["Deaddiction Programs", "Therapy Sessions", "Group Counseling", "Aftercare Support"],
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#2e76ad]/10 text-[#2e76ad] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
            <FaStethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Our Medical Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Comprehensive <span className="text-[#2e76ad]">Healthcare</span> Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            We provide a complete range of medical services with advanced technology 
            and compassionate care to support your journey to better health.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${service.borderColor} overflow-hidden group`}
            >
              {/* Icon Header */}
              <div className={`bg-gradient-to-r ${service.color} p-4 sm:p-5 md:p-6 text-white relative overflow-hidden`}>
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">{service.icon}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-3 sm:mt-4">{service.title}</h3>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <p className="text-gray-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-4 sm:mb-5 md:mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${service.color} flex-shrink-0`}></div>
                      <span className="text-gray-700 font-medium text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-200 transform group-hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base`}>
                  <span>Learn More</span>
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#2e76ad] to-[#3a8ccc] rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 text-white shadow-2xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 px-4">
              Need Emergency Medical Care?
            </h3>
            <p className="text-blue-100 text-base sm:text-lg mb-5 sm:mb-6 max-w-2xl mx-auto px-4">
              Our emergency services are available 24/7 with immediate attention and professional care.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button className="bg-white text-[#2e76ad] px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-all duration-200 font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                <FaStethoscope size={18} className="sm:w-5 sm:h-5" />
                <span>Emergency Contact</span>
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl hover:bg-white hover:text-[#2e76ad] transition-all duration-200 font-bold text-sm sm:text-base md:text-lg flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                <FaFlask size={18} className="sm:w-5 sm:h-5" />
                <span>View All Services</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;