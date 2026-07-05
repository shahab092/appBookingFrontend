import React, { useState, useEffect } from "react";
import { FaFileContract, FaSearch, FaChevronRight, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import TopBar from "../../componenets/landingpage/TopBar";
import Footer from "../../componenets/landingpage/Footer";

const TERMS_SECTIONS = [
  {
    id: "acceptance",
    number: "1",
    title: "Acceptance of Terms",
    content: "By using our telemedicine platform, booking appointments, or accessing any healthcare services provided by AshfaqHospital, you agree to these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services."
  },
  {
    id: "services",
    number: "2",
    title: "Telemedicine Services",
    content: "AshfaqHospital provides online healthcare services including but not limited to:\n\n• Online doctor consultations\n• Medical advice and follow-ups\n• Digital prescriptions\n• Appointment booking\n• Health guidance services\n\nTelemedicine services are intended for non-emergency medical situations only."
  },
  {
    id: "disclaimer",
    number: "3",
    title: "Medical Disclaimer",
    content: "Telemedicine consultations are not a substitute for emergency medical care or physical examination when required. If you are experiencing a medical emergency, please immediately contact local emergency services or visit the nearest hospital."
  },
  {
    id: "responsibilities",
    number: "4",
    title: "User Responsibilities",
    content: "By using our platform, you agree to:\n\n• Provide accurate and complete information\n• Use the platform lawfully and respectfully\n• Maintain confidentiality of your login credentials\n• Follow the doctor's medical advice responsibly\n\nAshfaqHospital is not responsible for issues caused by inaccurate patient information."
  },
  {
    id: "appointment-policy",
    number: "5",
    title: "Appointment & Consultation Policy",
    content: "• Appointments are subject to doctor availability.\n• Consultation timings may occasionally change due to emergencies or technical issues.\n• Patients are advised to join consultations on time.\n\nMissed appointments may not be eligible for refunds."
  },
  {
    id: "prescription-policy",
    number: "6",
    title: "Prescription Policy",
    content: "Doctors may issue online prescriptions based on medical assessment and professional judgment. Certain medications may require physical examination or additional verification before prescription."
  },
  {
    id: "payments",
    number: "7",
    title: "Payments",
    content: "All consultation fees and service charges must be paid through approved payment methods available on the website. Payments processed through third-party payment gateways are subject to their own policies and security procedures."
  },
  {
    id: "refunds-cancellations",
    number: "8",
    title: "Refunds & Cancellations",
    content: "Refunds and cancellations are governed by our Return & Refund Policy available on the website."
  },
  {
    id: "privacy",
    number: "9",
    title: "Privacy & Confidentiality",
    content: "Patient information and medical records are treated confidentially according to applicable laws and our Privacy Policy."
  },
  {
    id: "liability",
    number: "10",
    title: "Limitation of Liability",
    content: "AshfaqHospital shall not be held responsible for:\n\n• Internet or technical disruptions\n• Delays caused by third-party services\n• User device failures\n• Misuse of medical advice\n• Incomplete information provided by users"
  },
  {
    id: "intellectual-property",
    number: "11",
    title: "Intellectual Property",
    content: "All website content including logos, text, graphics, and software are the property of AshfaqHospital and may not be copied or reused without permission."
  },
  {
    id: "changes",
    number: "12",
    title: "Changes to Terms",
    content: "AshfaqHospital reserves the right to modify these Terms & Conditions at any time without prior notice. Continued use of the platform after updates means acceptance of revised terms."
  },
  {
    id: "governing-law",
    number: "13",
    title: "Governing Law",
    content: "These Terms & Conditions shall be governed by the laws of Pakistan."
  },
  {
    id: "contact",
    number: "14",
    title: "Contact Information",
    content: "AshfaqHospital Telemedicine Services\n\n• Phone: 0946 744760\n• Email: info@ashfaqhospitals.com\n• Address: Kotanai main Madyan GT Road Tehsil Khwaza Khela Swat, Khwazakhela, Pakistan"
  }
];

const TermsConditions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of TERMS_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  const filteredSections = TERMS_SECTIONS.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-background-light flex flex-col font-sans">
        {/* Header Hero Section using solid color bg-accent */}
        <div className="relative bg-accent py-16 text-center px-4 overflow-hidden">
          <div className="relative max-w-4xl mx-auto z-10">
            <div className="inline-flex items-center gap-2 bg-white/10  px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider mb-4">
              <FaFileContract size={14} />
              Legal Documents
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Terms & Conditions
            </h1>
            <p className=" text-sm md:text-base max-w-2xl mx-auto font-medium">
              AshfaqHospital Telemedicine Services • Last Updated: May 2026
            </p>
          </div>
        </div>

        {/* Main Body */}
        <div className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-150 p-5 shadow-sm space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-3">
                Table of Contents
              </h2>
              <div className="flex flex-col space-y-1">
                {TERMS_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      activeSection === section.id
                        ? "bg-primary/10 text-primary border-l-4 border-primary pl-2"
                        : "text-typegray hover:bg-gray-55 hover:text-gray-900 border-l-4 border-transparent"
                    }`}
                  >
                    <span className="w-6 shrink-0 text-[10px] text-typegray/80">
                      {section.number}.
                    </span>
                    <span className="truncate">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Policy Text & Search */}
          <div className="col-span-1 lg:col-span-3 space-y-6">
            {/* Search Box */}
            <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm flex items-center gap-3">
              <FaSearch className="text-typegray shrink-0" size={16} />
              <input
                type="text"
                placeholder="Search term or policy details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent outline-none border-none text-sm text-gray-750 placeholder-gray-400 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-xs text-typegray hover:text-gray-800 font-bold px-2 py-1 bg-gray-100 rounded-lg"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Content List */}
            <div className="space-y-6">
              {filteredSections.length > 0 ? (
                filteredSections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className={`bg-white rounded-xl border transition-all duration-300 p-6 md:p-8 shadow-sm hover:shadow-md ${
                      activeSection === section.id
                        ? "border-primary ring-2 ring-primary/10"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {/* solid bg-primary */}
                      <div className="w-10 h-10 rounded-lg bg-primary text-white font-bold flex items-center justify-center shrink-0 shadow-md text-sm md:text-base">
                        {section.number}
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-800">
                          {section.title}
                        </h2>
                        <p className="text-[10px] text-typegray font-medium mt-0.5">
                          Section {section.number} of Terms & Conditions
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-650 text-sm md:text-base leading-relaxed font-medium whitespace-pre-line border-t border-gray-55 pt-4">
                      {section.content}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">No Matching Sections</h3>
                  <p className="text-sm text-typegray max-w-sm mx-auto">
                    We couldn't find any terms matching your search query. Try typing something else.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Contact Card using solid bg-primary */}
            <div className="bg-primary rounded-2xl text-white p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                <FaFileContract size={250} />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-3">Have questions about our Terms?</h3>
                <p className="text-white/90 text-xs md:text-sm mb-6 max-w-xl font-medium">
                  If you require clarification on any part of these terms or have concerns regarding telemedicine operations, feel free to contact us.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/15">
                    <FaPhone className="text-white" size={14} />
                    <span className="text-xs md:text-sm font-semibold truncate">0946 744760</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/15">
                    <FaEnvelope className="text-white" size={14} />
                    <span className="text-xs md:text-sm font-semibold truncate">info@ashfaqhospitals.com</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/15">
                    <FaMapMarkerAlt className="text-white" size={14} />
                    <span className="text-xs md:text-sm font-semibold truncate">Kotanai main Madyan GT Road Tehsil Khwaza Khela Swat, Khwazakhela, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
