// src/components/DashboardCards.jsx
import React from 'react';

const DashboardCards = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Schedule Consultation Section - Enhanced */}
      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-8 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl text-blue-600">📅</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Schedule a New Consultation</h3>
            <p className="text-gray-600">Need to see a doctor? Book your next appointment here.</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
            <div className="w-6 h-6 border-2 border-gray-400 rounded-lg flex items-center justify-center">
              {/* Empty checkbox */}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Book Online Consultation</div>
              <div className="text-sm text-gray-500">Video call with healthcare provider</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 border-2 border-blue-500 bg-blue-50 rounded-xl cursor-pointer transform hover:scale-[1.02] transition-all duration-200">
            <div className="w-6 h-6 border-2 border-blue-600 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Book In-Clinic Appointment</div>
              <div className="text-sm text-gray-500">Visit our medical facility</div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout for Appointments and Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Upcoming Appointments - Enhanced */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-xl text-green-600">⏰</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h3>
          </div>
          
          <div className="space-y-6">
            <div className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">Annual Physical Exam</h4>
                  <div className="space-y-1">
                    <p className="text-gray-600 flex items-center">
                      <span className="w-4 mr-2">🕒</span>
                      Mon, Oct 28, 2024 - 10:30 AM
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="w-4 mr-2">👨‍⚕️</span>
                      Dr. Evelyn Reed (Cardiology)
                    </p>
                    <p className="text-gray-500 flex items-center">
                      <span className="w-4 mr-2">🏥</span>
                      In-Clinic Main Hospital, 123 Health St.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">Follow-up Consultation</h4>
                  <div className="space-y-1">
                    <p className="text-gray-600 flex items-center">
                      <span className="w-4 mr-2">🕒</span>
                      Wed, Nov 06, 2024 - 2:00 PM
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="w-4 mr-2">👩‍⚕️</span>
                      Dr. Ben Carter (Dermatology)
                    </p>
                    <p className="text-blue-600 flex items-center font-medium">
                      <span className="w-4 mr-2">💻</span>
                      Online
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity - Enhanced */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-xl text-orange-600">📈</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-blue-50 transition-colors duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-xl text-green-600">🔬</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">New lab results are available</h4>
                <p className="text-gray-500 text-sm">Blood Panel - Oct 23, 2024</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-blue-50 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-xl text-blue-600">✉️</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Message from Dr. Evelyn Reed</h4>
                <p className="text-gray-500 text-sm">Oct 22, 2024</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-blue-50 transition-colors duration-200">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-xl text-purple-600">💊</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Prescription refill is ready</h4>
                <p className="text-gray-500 text-sm">Metformin - Ready for pickup</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout for Doctor and Medical Summary - Enhanced */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Your Primary Doctor - Enhanced */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <span className="text-xl text-indigo-600">👨‍⚕️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Your Primary Doctor</h3>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">BC</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-lg">Dr. Ben Carter</h4>
              <p className="text-gray-600">General Practice</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs text-green-600 font-medium">Available Today</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>💬</span>
              <span>Message</span>
            </button>
            <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>👤</span>
              <span>View Profile</span>
            </button>
          </div>
        </div>

        {/* Medical Summary - Enhanced */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <span className="text-xl text-red-600">❤️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Medical Summary</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-1">Conditions</h4>
              <p className="text-gray-600">Type 2 Diabetes, Hypertension</p>
            </div>

            <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
              <h4 className="font-semibold text-gray-900 mb-1">Allergies</h4>
              <p className="text-gray-600">Penicillin</p>
            </div>

            <div className="p-3 rounded-xl bg-green-50 border border-green-100">
              <h4 className="font-semibold text-gray-900 mb-1">Last Vitals (Oct 22)</h4>
              <div className="text-gray-600 space-y-1 text-sm">
                <p>• Blood Pressure: <span className="font-semibold">130/85 mmHg</span></p>
                <p>• Heart Rate: <span className="font-semibold">72 bpm</span></p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02]">
              View Full Medical Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;