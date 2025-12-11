import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaCalendarCheck, FaBars, FaTimes, FaChevronDown, FaStethoscope, FaHeartbeat } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DoctorRegistrationModal from './DoctorRegistrationModal';

const TopBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const navigate = useNavigate();
    const [showDoctorModal, setShowDoctorModal] = useState(false);

    return (
        <>
            {/* Top Info Bar */}
            <div className="bg-[#2e76ad] text-white py-2 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        {/* Contact Info */}
                        <div className="flex flex-wrap justify-center md:justify-start items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                                <FaPhone className="text-blue-200" size={12} />
                                <span className="text-blue-50">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                                <FaEnvelope className="text-blue-200" size={12} />
                                <span className="text-blue-50">info@healthcare.com</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <a className='text-white'>
                                {/* <FaUser size={12} /> */}
                                <span className='text-white font-normal cursor-pointer' onClick={()=>navigate("/login")}>Login</span></a>
                            {/* <button className=" text-[#2e76ad] px-2 py-1 rounded-xl hover:bg-[#2e76ad] hover:text-white transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center space-x-2">
                                
                            </button> */}
                        </div>
                        {/* Auth Links */}
                        {/* <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all duration-200 group">
                <FaUser size={12} className="text-blue-200 group-hover:text-white" />
                <span className="text-blue-50 group-hover:text-white text-sm">Patient Portal</span>
              </button>
              <button className="flex items-center space-x-2  px-3 py-1 rounded-full transition-all duration-200 group">
                <FaCalendarCheck size={12} className="text-white" />
                <span className="text-white font-semibold text-sm">24/7 Emergency</span>
              </button>
            </div> */}
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-3">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-br from-[#2e76ad] to-[#3a8ccc] text-white p-3 rounded-2xl shadow-lg">
                                <FaHeartbeat className="text-2xl" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2e76ad] to-[#3a8ccc] bg-clip-text text-transparent">
                                    MediCare
                                </h1>
                                <p className="text-xs text-gray-500 font-medium">Trusted Healthcare</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {[
                                { name: 'Home', id: 'home' },
                                { name: 'About', id: 'about' },
                                { name: 'Services', id: 'services', dropdown: true },
                                { name: 'Doctors', id: 'doctors' },
                                { name: 'Contact', id: 'contact' }
                            ].map((item) => (
                                <div key={item.id} className="relative group">
                                    {item.dropdown ? (
                                        <>
                                            <button
                                                className={`flex items-center space-x-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${activeLink === item.id
                                                        ? 'bg-[#2e76ad] text-white shadow-lg'
                                                        : 'text-gray-700 hover:bg-blue-50 hover:text-[#2e76ad]'
                                                    }`}
                                            >
                                                <span>{item.name}</span>
                                                <FaChevronDown size={10} className="mt-0.5" />
                                            </button>
                                            <div className="absolute top-full left-0 w-56 bg-white shadow-2xl rounded-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                                                {['Psychiatry', 'Psychology', 'Neurology', 'Lab Tests', 'ECG/EEG', 'Rehab1'].map((service) => (
                                                    <a
                                                        key={service}
                                                        href={`#${service.toLowerCase()}`}
                                                        className="block px-4 py-3 text-gray-600 hover:bg-[#2e76ad] hover:text-white transition-all duration-200 font-medium border-b border-gray-50 last:border-b-0"
                                                    >
                                                        {service}
                                                    </a>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <a
                                            href={`#${item.id}`}
                                            onClick={() => setActiveLink(item.id)}
                                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${activeLink === item.id
                                                    ? 'bg-[#2e76ad] text-white shadow-lg transform scale-105'
                                                    : 'text-gray-700 hover:bg-blue-50 hover:text-[#2e76ad] hover:shadow-md'
                                                }`}
                                        >
                                            {item.name}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden lg:flex items-center space-x-3">
                            <button onClick={()=>navigate('/login')} className="bg-gradient-to-r from-[#2e76ad] to-[#3a8ccc] text-white px-6 py-3 rounded-xl hover:from-[#256399] hover:to-[#2e76ad] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 border border-[#2e76ad]">
                                <FaCalendarCheck size={16} />
                                <span>Book Appointment</span>
                            </button>
                            <button onClick={()=>setShowDoctorModal(true)} className="bg-white text-[#2e76ad] border-2 border-[#2e76ad] px-6 py-3 rounded-xl hover:bg-[#2e76ad] hover:text-white transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center space-x-2">
                                <FaStethoscope size={16} />
                                <span>Doctor Registration</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden bg-gray-100 hover:bg-[#2e76ad] text-gray-700 hover:text-white p-3 rounded-xl transition-all duration-200"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="lg:hidden bg-white border-t border-gray-200 py-4">
                            <div className="flex flex-col space-y-2">
                                {[
                                    { name: 'Home', id: 'home' },
                                    { name: 'About', id: 'about' },
                                    { name: 'Services', id: 'services' },
                                    { name: 'Doctors', id: 'doctors' },
                                    { name: 'Contact', id: 'contact' }
                                ].map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={() => {
                                            setActiveLink(item.id);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${activeLink === item.id
                                                ? 'bg-[#2e76ad] text-white shadow-lg'
                                                : 'text-gray-700 hover:bg-blue-50 hover:text-[#2e76ad]'
                                            }`}
                                    >
                                        {item.name}
                                    </a>
                                ))}

                                {/* Mobile Services Dropdown */}
                                <div className="px-4 py-3">
                                    <div className="text-sm font-semibold text-gray-500 mb-2">Our Services:</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Psychiatry', 'Psychology', 'Neurology', 'Lab Tests'].map((service) => (
                                            <a
                                                key={service}
                                                href={`#${service.toLowerCase()}`}
                                                className="bg-gray-50 hover:bg-[#2e76ad] hover:text-white text-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center"
                                            >
                                                {service}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 mt-2">
                                    <button onClick={()=>navigate("/login")} className="bg-gradient-to-r from-[#2e76ad] to-[#3a8ccc] text-white px-6 py-4 rounded-xl hover:from-[#256399] hover:to-[#2e76ad] transition-all duration-200 font-semibold text-center shadow-lg">
                                        Book Appointment
                                    </button>
                                    <button onClick={()=>setShowDoctorModal(true)} className="bg-white text-[#2e76ad] border-2 border-[#2e76ad] px-6 py-4 rounded-xl hover:bg-[#2e76ad] hover:text-white transition-all duration-200 font-semibold text-center">
                                        Doctor Registration
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            <DoctorRegistrationModal visible={showDoctorModal} onCancel={()=>setShowDoctorModal(false)} onOk={()=>setShowDoctorModal(false)} />
        </>
    );
};

export default TopBar;