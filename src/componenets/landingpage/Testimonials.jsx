import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      condition: "Anxiety Recovery",
      text: "The care I received transformed my life. Dr. Emily's approach helped me overcome anxiety.",
      rating: 5,
      image: "👩‍💼",
      type: "Video Consult"
    },
    {
      id: 2,
      name: "Michael Chen",
      condition: "OCD Management",
      text: "After struggling for years, I finally found the right treatment here. Life-changing!",
      rating: 5,
      image: "👨‍💻",
      type: "In-Clinic"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      condition: "PTSD Recovery",
      text: "Exceptional support during recovery. Helped me regain control of my life completely.",
      rating: 5,
      image: "👩‍🏫",
      type: "Mixed"
    },
    {
      id: 4,
      name: "David Thompson",
      condition: "Stress Management",
      text: "Professional and effective. Online consultations fit perfectly with my busy schedule.",
      rating: 4,
      image: "👨‍💼",
      type: "Video Consult"
    },
    {
      id: 5,
      name: "Lisa Wang",
      condition: "Postpartum",
      text: "The staff made me feel so comfortable. Flexible appointments were a lifesaver.",
      rating: 5,
      image: "👩‍🍼",
      type: "In-Clinic"
    },
    {
      id: 6,
      name: "Robert Martinez",
      condition: "Bipolar Disorder",
      text: "Comprehensive care addressing both medication and therapy. Highly recommended!",
      rating: 5,
      image: "👨‍🔧",
      type: "Mixed"
    },
    {
      id: 7,
      name: "Jennifer Kim",
      condition: "Depression",
      text: "Patient portal made follow-ups so convenient. Excellent communication throughout.",
      rating: 5,
      image: "👩‍🎓",
      type: "Video Consult"
    },
    {
      id: 8,
      name: "Alex Turner",
      condition: "Anxiety",
      text: "Modern facilities and caring staff. The 24/7 support gives me peace of mind.",
      rating: 4,
      image: "👨‍🎤",
      type: "In-Clinic"
    }
  ];

  const testimonialsPerView = 5;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const startIndex = currentIndex * testimonialsPerView;
    return testimonials.slice(startIndex, startIndex + testimonialsPerView);
  };

  return (
    <section id="testimonials" className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            What <span className="text-[#2e76ad]">Patients Say</span>
          </h2>
          <p className="text-gray-600">Real stories from people who found healing</p>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white border-2 border-[#2e76ad] text-[#2e76ad] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#2e76ad] hover:text-white transition-all duration-200 shadow-lg z-20"
            >
              <FaArrowLeft className="text-sm" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white border-2 border-[#2e76ad] text-[#2e76ad] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#2e76ad] hover:text-white transition-all duration-200 shadow-lg z-20"
            >
              <FaArrowRight className="text-sm" />
            </button>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {getVisibleTestimonials().map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50 group"
                >
                  {/* Quote Icon */}
                  <div className="text-[#2e76ad]/20 mb-2">
                    <FaQuoteLeft className="text-lg" />
                  </div>

                  {/* Rating */}
                  <div className="flex space-x-1 mb-3">
                    {[...Array(5)].map((_, starIndex) => (
                      <FaStar 
                        key={starIndex} 
                        className={`text-xs ${
                          starIndex < testimonial.rating 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 italic">
                    "{testimonial.text}"
                  </p>

                  {/* Patient Info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2e76ad] to-[#3a8ccc] rounded-full flex items-center justify-center text-white text-sm">
                      {testimonial.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {testimonial.condition}
                      </p>
                    </div>
                  </div>

                  {/* Treatment Type */}
                  <div className="mt-3">
                    <span className="inline-block bg-blue-50 text-[#2e76ad] px-2 py-1 rounded-full text-xs font-medium border border-blue-200">
                      {testimonial.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-[#2e76ad] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Compact Stats */}
        <div className="mt-8 grid grid-cols-4 gap-4 max-w-md mx-auto">
          {[
            { number: "5K+", label: "Patients" },
            { number: "98%", label: "Happy" },
            { number: "4.9", label: "Rating" },
            { number: "15+", label: "Years" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-[#2e76ad]">{stat.number}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;