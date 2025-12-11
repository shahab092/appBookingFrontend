import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart, FaArrowRight, FaClock, FaStethoscope, FaUserMd, FaCalendarCheck } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Psychiatry Consultation',
    'Psychological Testing',
    'Medication Management',
    'Therapy Sessions',
    'Emergency Care',
    'Rehabilitation'
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-[#2e76ad]" />,
      text: '123 Healthcare Avenue, Medical District, City 12345'
    },
    {
      icon: <FaPhone className="text-[#2e76ad]" />,
      text: '+1 (555) 123-HELP (4357)'
    },
    {
      icon: <FaEnvelope className="text-[#2e76ad]" />,
      text: 'info@psychecare.com'
    },
    {
      icon: <FaClock className="text-[#2e76ad]" />,
      text: '24/7 Emergency Services Available'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-[#2e76ad] text-white p-3 rounded-xl">
                <FaStethoscope className="text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">PsycheCare</h3>
                <p className="text-gray-400 text-sm">Mental Wellness Center</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Providing compassionate mental healthcare with expertise and understanding. 
              Your journey to better mental health starts here.
            </p>
            
            {/* Book Now Button */}
            <button className="w-full bg-[#2e76ad] text-white font-bold py-3 px-4 rounded-lg mb-6 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
              <FaCalendarCheck size={18} />
              <span>Book Now</span>
            </button>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook />, color: 'hover:text-blue-400' },
                { icon: <FaTwitter />, color: 'hover:text-blue-300' },
                { icon: <FaInstagram />, color: 'hover:text-pink-400' },
                { icon: <FaLinkedin />, color: 'hover:text-blue-500' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`bg-gray-800 p-3 rounded-lg text-gray-400 hover:bg-[#2e76ad] hover:text-white transition-all duration-200 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#2e76ad] transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#2e76ad] transition-colors duration-200 flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-[#2e76ad] rounded-full"></div>
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Info</h4>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1">{item.icon}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Emergency Button */}
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg mt-6 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
              <FaUserMd size={16} />
              <span>24/7 Emergency Help</span>
            </button>
          </div>
        </div>
      </div>

      {/* Location Map Section */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Location Details */}
            <div className="lg:col-span-1">
              <h4 className="text-xl font-bold mb-6 text-white">Our Location</h4>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Main Hospital</h5>
                  <p className="text-gray-400 text-sm">
                    123 Healthcare Avenue<br />
                    Medical District<br />
                    City, State 12345<br />
                    United States
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Working Hours</h5>
                  <div className="text-gray-400 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Emergency Only</span>
                    </div>
                  </div>
                </div>

                {/* Additional Book Now Button */}
                <button className="w-full bg-[#2e76ad] hover:bg-[#256399] text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
                  <FaCalendarCheck size={18} />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-[#2e76ad] to-[#3a8ccc] rounded-2xl h-80 relative overflow-hidden">
                {/* Map Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FaMapMarkerAlt className="text-4xl mx-auto mb-4" />
                    <h5 className="text-xl font-bold mb-2">PsycheCare Hospital</h5>
                    <p className="text-blue-100">123 Healthcare Avenue, Medical District</p>
                    <p className="text-blue-100">City, State 12345</p>
                    
                    {/* Interactive Map Elements */}
                    <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <button className="bg-white text-[#2e76ad] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <FaMapMarkerAlt size={16} />
                        <span>Get Directions</span>
                      </button>
                      <button className="bg-[#2e76ad] hover:bg-[#256399] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 border border-white">
                        <FaCalendarCheck size={16} />
                        <span>Book Visit</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Map Grid Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-4 gap-4 h-full">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="border-r border-b border-white"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 PsycheCare Mental Wellness Center. All rights reserved.
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#2e76ad] transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2e76ad] transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2e76ad] transition-colors duration-200">
                Sitemap
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2e76ad] transition-colors duration-200">
                Careers
              </a>
            </div>

            {/* Made with love */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500" />
              <span>for better mental health</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        {/* Book Now Floating Button */}
        <button className="bg-[#2e76ad] hover:bg-[#256399] text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-200 group">
          {/* <div className="flex items-center space-x-2"> */}
            {/* <FaCalendarCheck className="text-lg" /> */}
            <span className="font-bold">BOOK NOW</span>
          {/* </div> */}
        </button>

        {/* Emergency Floating Button */}
        <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-200 group">
          <div className="flex items-center space-x-2">
            <FaPhone className="animate-pulse" />
            <span className="font-bold group-hover:block hidden">HELP</span>
          </div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;