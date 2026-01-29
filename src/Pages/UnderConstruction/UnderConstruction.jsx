import {
  FaTools,
  FaRocket,
  FaCalendarCheck,
  FaUserMd,
  FaHeartbeat,
  FaClock,
  FaCogs,
} from "react-icons/fa";
import TopBar from "../../componenets/landingpage/TopBar";
import Footer from "../../componenets/landingpage/Footer";

const UnderConstruction = () => {
  return (
    <>
      <TopBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
        <div className="max-w-4xl mx-auto w-full">
          {/* Main Content */}
          <div className="text-center mb-12">
            {/* Animated Icon */}
            <div className="relative mb-8">
              <div className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <FaCogs className="text-white text-4xl animate-spin-slow" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <FaRocket className="text-white text-sm" />
                </div>
              </div>
            </div>

            {/* Main Message */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                🚧 Page Under Development
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                Our development team is working diligently to create an
                exceptional healthcare experience for you.
              </p>

              {/* Apology Message */}
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 max-w-md mx-auto border border-blue-200 mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <FaClock className="text-blue-600" />
                  <span className="font-semibold text-blue-700">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-700 text-center">
                  We apologize for any inconvenience caused. Our IT team is
                  working hard to develop this portion of our platform.
                </p>
              </div>
            </div>

            {/* Simple Progress Indicator */}
            <div className="max-w-sm mx-auto mb-10">
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>Development Progress</span>
                <span className="font-bold text-green-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-inner"
                  style={{ width: "85%" }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Estimated completion: 2 weeks
              </p>
            </div>

            {/* Coming Soon Features */}
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Features You'll Love
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <FaCalendarCheck className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Easy Appointments
                  </h3>
                  <p className="text-sm text-gray-600">
                    Book doctors in minutes
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <FaUserMd className="text-green-600 text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Video Consult
                  </h3>
                  <p className="text-sm text-gray-600">
                    Talk to doctors online
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <FaHeartbeat className="text-purple-600 text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Health Records
                  </h3>
                  <p className="text-sm text-gray-600">
                    Safe medical history storage
                  </p>
                </div>
              </div>
            </div>

            {/* Stay Updated Button */}
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-8 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <FaRocket className="text-sm" />
              Get Notified When We Launch
            </button>

            {/* Contact Support */}
            <div className="mt-10">
              <p className="text-sm text-gray-500">
                Need immediate assistance?{" "}
                <a
                  href="mailto:support@medicare.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UnderConstruction;

// Add custom animation to tailwind.config.js if needed:
// extend: {
//   animation: {
//     'spin-slow': 'spin 3s linear infinite',
//   }
// }
