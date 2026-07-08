import React, { useState, useEffect } from "react";
import { FaUndo, FaSearch, FaCheckCircle, FaTimesCircle, FaClock, FaCalendarTimes, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import TopBar from "../../componenets/landingpage/TopBar";
import Footer from "../../componenets/landingpage/Footer";

const POLICY_SECTIONS = [
  {
    id: "nature-of-services",
    number: "1",
    title: "Nature of Services",
    content: "AshfaqHospital provides digital healthcare and telemedicine services including online doctor consultations, follow-up consultations, digital prescriptions, and appointment booking. As these are service-based digital consultations, no physical products are shipped."
  },
  {
    id: "refund-eligibility",
    number: "2",
    title: "Refund Eligibility",
    content: "Refunds may be considered in the following situations:\n\n• Payment was deducted but appointment was not confirmed\n• Duplicate payment was made by mistake\n• Doctor was unavailable for the scheduled consultation\n• Technical issues from AshfaqHospital prevented the consultation\n• Appointment was cancelled by AshfaqHospital\n\nApproved refunds will be processed through the original payment method."
  },
  {
    id: "non-refundable",
    number: "3",
    title: "Non-Refundable Situations",
    content: "Refunds will not be provided in the following cases:\n\n• Consultation has already been completed\n• Patient missed the scheduled appointment\n• Incorrect patient information was submitted\n• Internet, device, or connectivity issues occurred on the patient side\n• Dissatisfaction with medical advice after consultation completion"
  },
  {
    id: "cancellation-policy",
    number: "4",
    title: "Appointment Cancellation Policy",
    content: "Patients may request appointment cancellation before the scheduled consultation time. Cancellation requests made after the consultation has started may not qualify for refunds."
  },
  {
    id: "processing-time",
    number: "5",
    title: "Refund Processing Time",
    content: "Approved refunds are generally processed within 7–14 business days depending on the payment provider and banking channels."
  },
  {
    id: "gateway-processing",
    number: "6",
    title: "Payment Gateway Processing",
    content: "Payments made through third-party payment gateways are also subject to the policies and processing timelines of those providers."
  },
  {
    id: "policy-changes",
    number: "7",
    title: "Changes to This Policy",
    content: "AshfaqHospital reserves the right to update or modify this Refund Policy at any time without prior notice."
  },
  {
    id: "contact",
    number: "8",
    title: "Contact Us",
    content: "For refund or billing-related queries, please contact:\n\n• Phone: 0946 744760\n• Email: info@ashfaqhospitals.com\n• Address: Kotanai main Madyan GT Road Tehsil Khwaza Khela Swat, Khwazakhela, Pakistan"
  }
];

const ReturnRefundPolicy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of POLICY_SECTIONS) {
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

  const filteredSections = POLICY_SECTIONS.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-background-light flex flex-col font-sans">
        {/* Header Hero Section using solid bg-accent */}
        <div className="relative bg-primary py-16  text-white text-center px-4 overflow-hidden">
          <div className="relative max-w-4xl mx-auto z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-[4px] border border-white/20 text-xs font-semibold uppercase tracking-wider mb-4">
              <FaUndo size={12} />
              Billing & Refunds
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Return & Refund Policy
            </h1>
            <p className="text-white/95 text-sm md:text-base max-w-2xl mx-auto font-medium">
              AshfaqHospital Telemedicine Services • Last Updated: May 2026
            </p>
          </div>
        </div>

        {/* Main Body */}
        <div className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-[4px] border border-gray-100 p-5 shadow-sm space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-3">
                Policy Sections
              </h2>
              <div className="flex flex-col space-y-1">
                {POLICY_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center text-left px-3 py-2.5 rounded-[4px] text-xs font-semibold transition-all ${activeSection === section.id
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
            <div className="bg-white rounded-[4px] border border-gray-150 p-4 shadow-sm flex items-center gap-3">
              <FaSearch className="text-typegray shrink-0" size={16} />
              <input
                type="text"
                placeholder="Search refund eligibility, cancellations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent outline-none border-none text-sm text-gray-755 placeholder-gray-400 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-xs text-typegray hover:text-gray-800 font-bold px-2 py-1 bg-gray-100 rounded-[4px]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Overview Cards - Custom Premium Element */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Eligible Card */}
              <div className="bg-white rounded-[4px] border border-secondary/20 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-[4px] bg-secondary/10 flex items-center justify-center text-secondary">
                    <FaCheckCircle size={18} />
                  </div>
                  <h3 className="font-bold text-gray-800 text-base">Refund Eligible</h3>
                </div>
                <ul className="space-y-2 text-xs text-gray-655 font-semibold">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    Unconfirmed appointments (after payment)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    Accidental duplicate payments
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    Doctor unavailable or cancelled by hospital
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span>
                    Technical platform issues on our side
                  </li>
                </ul>
              </div>

              {/* Non-Refundable Card */}
              <div className="bg-white rounded-[4px] border border-rose-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-[4px] bg-rose-100 flex items-center justify-center text-rose-600">
                    <FaTimesCircle size={18} />
                  </div>
                  <h3 className="font-bold text-gray-800 text-base">Non-Refundable</h3>
                </div>
                <ul className="space-y-2 text-xs text-gray-655 font-semibold">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">•</span>
                    Consultations already completed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">•</span>
                    Missed appointments by patient
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">•</span>
                    Incorrect patient information submitted
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">•</span>
                    Connectivity & internet issues on patient side
                  </li>
                </ul>
              </div>
            </div>

            {/* Content List */}
            <div className="space-y-6">
              {filteredSections.length > 0 ? (
                filteredSections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className={`bg-white rounded-[4px] border transition-all duration-300 p-6 md:p-8 shadow-sm hover:shadow-md ${activeSection === section.id
                      ? "border-primary ring-2 ring-primary/10"
                      : "border-gray-200"
                      }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {/* solid bg-primary */}
                      <div className="w-10 h-10 rounded-[4px] bg-primary text-white font-bold flex items-center justify-center shrink-0 shadow-md text-sm md:text-base">
                        {section.number}
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-800">
                          {section.title}
                        </h2>
                        <p className="text-[10px] text-typegray font-medium mt-0.5">
                          Section {section.number} of Return & Refund Policy
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-655 text-sm md:text-base leading-relaxed font-medium whitespace-pre-line border-t border-gray-55 pt-4">
                      {section.content}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-[4px] border border-gray-200 p-12 text-center">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">No Matching Sections</h3>
                  <p className="text-sm text-typegray max-w-sm mx-auto">
                    We couldn't find any policy terms matching your search query. Try typing something else.
                  </p>
                </div>
              )}
            </div>

            {/* Billing Contact Card using solid bg-primary */}
            <div className="bg-primary rounded-[4px] text-white p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                <FaUndo size={250} />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-3">Questions about Billing or Refunds?</h3>
                <p className="text-white/90 text-xs md:text-sm mb-6 max-w-xl font-medium">
                  Our dedicated billing team is here to assist you with payment status, duplicate charge resolutions, or refund inquiries.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-white/10 rounded-[4px] p-3 backdrop-blur-sm border border-white/15">
                    <FaPhone className="text-white" size={14} />
                    <span className="text-xs md:text-sm font-semibold truncate">0946 744760</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-[4px] p-3 backdrop-blur-sm border border-white/15">
                    <FaEnvelope className="text-white" size={14} />
                    <span className="text-xs md:text-sm font-semibold truncate">info@ashfaqhospitals.com</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-[4px] p-3 backdrop-blur-sm border border-white/15">
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

export default ReturnRefundPolicy;
