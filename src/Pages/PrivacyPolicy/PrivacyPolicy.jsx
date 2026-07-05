import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaShieldAlt,
} from "react-icons/fa";
import TopBar from "../../componenets/landingpage/TopBar";
import Footer from "../../componenets/landingpage/Footer";

const PRIVACY_SECTIONS = [
  {
    id: "information-collected",
    title: "Information We Collect",
    content:
      "We may collect your name, contact details, date of birth, account information, appointment details, medical history, consultation notes, prescriptions, payment status, and technical information such as device and browser data. We only collect information reasonably required to provide and improve our services.",
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    content:
      "We use your information to create and manage your account, arrange appointments, enable consultations, maintain medical records, process payments, provide support, send service notifications, protect the platform, and comply with legal obligations.",
  },
  {
    id: "medical-confidentiality",
    title: "Medical Information & Confidentiality",
    content:
      "Medical records and consultation information are treated as confidential. They are accessible only to authorized healthcare professionals and staff who need the information to provide care or operate the service, except where disclosure is required by law or necessary to protect a person's vital interests.",
  },
  {
    id: "sharing",
    title: "Information Sharing",
    content:
      "We do not sell your personal information. Information may be shared with doctors, authorized hospital staff, payment processors, technology providers, and public authorities when necessary to provide services, process transactions, maintain security, or meet a legal requirement. Service providers are expected to protect the information they handle.",
  },
  {
    id: "security",
    title: "Data Security",
    content:
      "We use reasonable administrative, technical, and organizational safeguards to protect personal and medical information. No online system can guarantee absolute security, so you should also keep your password and verification codes private and notify us if you suspect unauthorized account access.",
  },
  {
    id: "retention",
    title: "Data Retention",
    content:
      "We retain information for as long as needed to provide healthcare services, maintain appropriate medical and financial records, resolve disputes, prevent fraud, and comply with applicable legal and regulatory requirements. Information is securely deleted or anonymized when it is no longer required.",
  },
  {
    id: "cookies",
    title: "Cookies & Technical Data",
    content:
      "Our website may use cookies and similar technologies to keep you signed in, remember preferences, understand platform performance, and improve reliability. You can control cookies through your browser settings, although disabling essential cookies may affect website functionality.",
  },
  {
    id: "choices",
    title: "Your Privacy Choices",
    content:
      "You may contact us to request access to or correction of your personal information, ask questions about how it is used, or request deletion where legally permitted. Certain medical, billing, or legal records may need to be retained even after an account is closed.",
  },
  {
    id: "children",
    title: "Children's Privacy",
    content:
      "A parent or legal guardian should supervise the use of our services by a minor and provide the information and consent needed for treatment. We handle a child's information only for legitimate healthcare and service purposes.",
  },
  {
    id: "updates",
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy when our services, practices, or legal obligations change. The revised version will be posted on this page with an updated effective date. Continued use of the service after an update means the revised policy applies.",
  },
  {
    id: "contact",
    title: "Contact Us",
    content:
      "For privacy questions or requests, contact AshfqHospital Telemedicine Services:\n\n• Phone: 0946 744760\n• Email: info@ashfaqhospitals.com\n• Address: Kotanai main Madyan GT Road, Tehsil Khwaza Khela, Swat, Khwazakhela, Pakistan",
  },
];

const PrivacyPolicy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY + 150;
      for (const section of PRIVACY_SECTIONS) {
        const element = document.getElementById(section.id);
        if (
          element &&
          position >= element.offsetTop &&
          position < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const filteredSections = PRIVACY_SECTIONS.filter(({ title, content }) => {
    const query = searchTerm.toLowerCase();
    return title.toLowerCase().includes(query) || content.toLowerCase().includes(query);
  });

  return (
    <>
      <TopBar />
      <main className="min-h-screen bg-background-light font-sans">
        <section className="bg-accent px-4 py-16 text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              <FaShieldAlt size={14} /> Legal Documents
            </div>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-2xl text-sm font-medium md:text-base">
              AshfqHospital Telemedicine Services • Last Updated: July 2026
            </p>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-4">
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-140px)] space-y-4 overflow-y-auto rounded-xl border border-gray-150 bg-white p-5 shadow-sm">
              <h2 className="border-b border-gray-100 pb-3 text-sm font-bold uppercase tracking-wider text-gray-800">
                Table of Contents
              </h2>
              <div className="flex flex-col space-y-1">
                {PRIVACY_SECTIONS.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center rounded-lg border-l-4 px-3 py-2.5 text-left text-xs font-semibold transition-all ${
                      activeSection === section.id
                        ? "border-primary bg-primary/10 pl-2 text-primary"
                        : "border-transparent text-typegray hover:bg-gray-55 hover:text-gray-900"
                    }`}
                  >
                    <span className="w-6 shrink-0 text-[10px] text-typegray/80">{index + 1}.</span>
                    <span className="truncate">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="space-y-6 lg:col-span-3">
            <div className="flex items-center gap-3 rounded-xl border border-gray-150 bg-white p-4 shadow-sm">
              <FaSearch className="shrink-0 text-typegray" size={16} />
              <input
                type="search"
                aria-label="Search privacy policy"
                placeholder="Search privacy topics..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full border-none bg-transparent text-sm font-medium text-gray-750 outline-none placeholder-gray-400"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-bold text-typegray">
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-6">
              {filteredSections.map((section) => {
                const number = PRIVACY_SECTIONS.findIndex(({ id }) => id === section.id) + 1;
                return (
                  <article
                    id={section.id}
                    key={section.id}
                    className={`rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8 ${
                      activeSection === section.id ? "border-primary ring-2 ring-primary/10" : "border-gray-200"
                    }`}
                  >
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-md md:text-base">
                        {number}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-800 md:text-xl">{section.title}</h2>
                        <p className="mt-0.5 text-[10px] font-medium text-typegray">Section {number} of Privacy Policy</p>
                      </div>
                    </div>
                    <div className="whitespace-pre-line border-t border-gray-55 pt-4 text-sm font-medium leading-relaxed text-gray-650 md:text-base">
                      {section.content}
                    </div>
                  </article>
                );
              })}
              {filteredSections.length === 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                  <h2 className="mb-1 text-lg font-bold text-gray-800">No matching sections</h2>
                  <p className="text-sm text-typegray">Try a different search term.</p>
                </div>
              )}
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-xl md:p-8">
              <FaShieldAlt className="absolute -bottom-10 -right-10 opacity-10" size={220} />
              <div className="relative z-10">
                <h2 className="mb-3 text-xl font-bold md:text-2xl">Have a privacy question?</h2>
                <p className="mb-6 max-w-xl text-xs font-medium text-white/90 md:text-sm">
                  Contact our team if you want to ask about your information or exercise a privacy choice.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 p-3"><FaPhone size={14} /><span className="truncate text-xs font-semibold md:text-sm">0946 744760</span></div>
                  <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 p-3"><FaEnvelope size={14} /><span className="truncate text-xs font-semibold md:text-sm">info@ashfaqhospitals.com</span></div>
                  <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 p-3"><FaMapMarkerAlt size={14} /><span className="truncate text-xs font-semibold md:text-sm">Khwazakhela, Swat, Pakistan</span></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
