import CustomModal from "../common/CustomModal";
import { useState } from "react";
import {
  FaApple,
  FaGooglePlay,
  FaPlayCircle,
  FaArrowRight,
  FaStar,
  FaDownload,
  FaMobileAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaPhoneAlt,
  FaUserMd,
} from "react-icons/fa";
import { HiOutlineShieldCheck, HiOutlineQrcode } from "react-icons/hi";
import { MdRocketLaunch, MdVerified, MdMedicalServices } from "react-icons/md";
import { BiScan } from "react-icons/bi";

export default function DoctorRegistrationModal({
  visible,
  title = "Doctors: Start Your Practice on Mobile",
  onCancel,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const handleLink = (url) => window.open(url, "_blank");

  const stats = [
    { icon: <MdVerified />, label: "Verified", value: "50K+" },
    { icon: <FaStar />, label: "Rating", value: "4.9★" },
    { icon: <FaShieldAlt />, label: "Secure", value: "100%" },
  ];

  const features = [
    "Instant profile verification",
    "Video consultations",
    "Secure payments",
    "Patient management",
    "Smart scheduling",
    "E-prescriptions",
  ];

  const steps = [
    {
      id: 1,
      title: "Scan the QR code",
      description: "Use your phone's camera to scan the code",
    },
    {
      id: 2,
      title: "Download the TeleMed Pro app",
      description: "Available on both iOS and Android platforms",
    },
    {
      id: 3,
      title: "Complete your professional profile",
      description: "Verify your credentials and start seeing patients",
    },
  ];

  return (
    <CustomModal
      visible={visible}
      title={"Join as a doctor"}
      subtitle={"Create your prifle on mobile  app"}
      // title={
      //   <div className="flex items-center gap-3">
      //     <div className="p-2 bg-blue-100 rounded-lg">
      //       <MdRocketLaunch className="text-blue-600 text-xl" />
      //     </div>
      //     <span className="text-xl font-bold text-gray-800">{title}</span>
      //   </div>
      // }
      onCancel={onCancel}
      showSubmit={false}
      width={1000}
    >
      <div className="p-6 font-sans antialiased">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Instructional Content */}
          <div className="flex-1">
            {/* Hero Section */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
                Transform Your Medical Practice
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Join thousands of doctors who have expanded their reach and
                increased their earnings through our secure mobile platform.
              </p>
            </div>

            {/* Steps/Timeline */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                  <MdMedicalServices className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  3 Simple Steps to Get Started
                </h3>
              </div>

              <div className="space-y-0">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="grid grid-cols-[48px_1fr] gap-x-4 cursor-pointer group"
                    onClick={() => setActiveStep(step.id)}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`size-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                          activeStep === step.id
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-110"
                            : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                        }`}
                      >
                        {step.id}
                      </div>
                      {step.id < steps.length && (
                        <div className="w-[2px] bg-gray-200 h-10 mt-2 group-hover:bg-blue-200 transition-colors"></div>
                      )}
                    </div>
                    <div
                      className={`pt-1 ${step.id < steps.length ? "pb-8" : "pb-2"}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <p
                          className={`text-lg font-semibold transition-colors ${
                            activeStep === step.id
                              ? "text-blue-600"
                              : "text-gray-800 group-hover:text-blue-600"
                          }`}
                        >
                          {step.title}
                        </p>
                        {activeStep === step.id && (
                          <FaArrowRight className="text-blue-500 animate-pulse" />
                        )}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                // onClick={() => handleLink("https://doctorapp.com/download")}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold h-14 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaDownload className="text-xl" />
                <span className="text-lg">Download for Mobile</span>
              </button>

              <button
                // onClick={() => handleLink("https://youtube.com/your-demo")}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-br from-white to-gray-50 text-gray-800 font-bold h-14 px-8 rounded-xl hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping opacity-75"></div>
                  <FaPlayCircle className="text-2xl text-blue-600 relative" />
                </div>
                <span className="text-lg">Watch Onboarding Demo</span>
              </button>
            </div>

            {/* Stats Section */}
            {/* <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Right Side: QR Code Section */}
          <div className="lg:w-[380px] bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-gray-200">
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-2xl border-4 border-white">
                <div className="bg-white p-4 rounded-xl">
                  <div className="size-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center p-2">
                    {/* QR Code with border animation */}
                    <div className="relative">
                      <div className="absolute inset-0 border-2 border-dashed border-blue-300 rounded-lg animate-spin-slow"></div>
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://doctorapp.com/download&color=1e40af&bgcolor=f8fafc&format=svg"
                        alt="Download QR Code"
                        className="w-48 h-48 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold uppercase tracking-widest shadow-lg">
                <BiScan className="text-lg" />
                Scan to Get Started
              </span>

              <p className="text-gray-600 text-sm">
                Compatible with iOS 14+ and Android 9+ devices
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleLink("https://apps.apple.com")}
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-xl hover:bg-gray-900 transition-colors shadow-md hover:shadow-lg"
                >
                  <FaApple className="text-xl" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </button>

                <button
                  onClick={() => handleLink("https://play.google.com")}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg border border-gray-200"
                >
                  <FaGooglePlay className="text-xl" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
