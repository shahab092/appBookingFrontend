// Dashboard.jsx
import React from "react";
import { Calendar, CheckCircle, XCircle, Search, Bell, ChevronDown, User, Clock, MapPin, FileText, BarChart3, TrendingUp, Users, Heart, Activity, Filter } from "lucide-react";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 font-sans">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Doctor Dashboard
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Welcome back, <span className="font-semibold text-gray-700">Dr. Henry Anderson</span>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search appointments, patients, records..."
              className="pl-10 pr-4 py-3 w-80 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              HA
            </div>
            <div>
              <p className="font-medium">Dr. Henry</p>
              <p className="text-sm text-gray-500">Cardiologist</p>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Stats Cards - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Appointment Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm font-medium">Appointments</p>
              <p className="text-3xl font-bold mt-2">48</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+12% this month</span>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Online Consultancy Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm font-medium">Online Consultancy</p>
              <p className="text-3xl font-bold mt-2">18</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+8% this month</span>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Video className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold mt-2">20</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+5% this month</span>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Request Card */}
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-100 text-sm font-medium">Requests</p>
              <p className="text-3xl font-bold mt-2">12</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+15% this month</span>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Today's Appointments */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
              <p className="text-gray-500 text-sm mt-1">3 appointments scheduled</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              <span>See all</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Appointment 1 */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">MJ Kumar</h3>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Health Checkup
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  Ongoing
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  10:30 AM
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Room 302
                </span>
              </div>
            </div>

            {/* Appointment 2 */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">Rishi Kiran</h3>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Heavy Cold
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  12:30 PM
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  12:30 PM
                </span>
                <span className="flex items-center gap-1">
                  <Video className="w-4 h-4" />
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Patient Details</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              MK
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">MJ Kumar</h3>
              <p className="text-gray-600">Patient ID: #PAT-7842</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-sm">Condition</p>
                <p className="font-semibold">Heavy Cold</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-sm">Age</p>
                <p className="font-semibold">32 years</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-sm">Sex</p>
                <p className="font-semibold">Male</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-sm">Blood Type</p>
                <p className="font-semibold">O+</p>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-2">Symptoms</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Running Nose
                </span>
                <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Cough
                </span>
                <span className="px-3 py-1.5 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Fever
                </span>
                <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Headache
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Appointment Timeline</h2>
          
          <div className="space-y-6 relative">
            {/* Timeline Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Timeline Item 1 */}
            <div className="flex items-start gap-4 relative">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Clinic Consulting</h4>
                <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" />
                  11:30 AM
                </p>
                <p className="text-gray-500 text-sm mt-1">Meeting with MJ Kumar</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex items-start gap-4 relative">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Online Consulting</h4>
                <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" />
                  02:30 PM
                </p>
                <p className="text-gray-500 text-sm mt-1">Remote consultation with Rishi Kiran</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex items-start gap-4 relative">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Meeting - Dr. Sam</h4>
                <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" />
                  05:30 PM
                </p>
                <p className="text-gray-500 text-sm mt-1">Case discussion and review</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment Requests */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Appointment Requests</h2>
              <p className="text-gray-500 text-sm mt-1">3 new requests pending</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="space-y-4">
            {/* Request 1 */}
            <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">Venkatesh</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      19 Jan
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      01:00 PM
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-sm">General checkup requested</p>
            </div>

            {/* Request 2 */}
            <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">Rishi Kiran</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      14 Jan
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      02:00 PM
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Follow-up consultation</p>
            </div>

            {/* Request 3 */}
            <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">Chinna Vel</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      15 Jan
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      12:00 PM
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Emergency consultation</p>
            </div>
          </div>
        </div>

        {/* Patient Analysis Chart Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Patient Analysis</h2>
              <p className="text-gray-500 text-sm mt-1">Last 30 days trend</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              View Report
            </button>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <p className="text-blue-600 font-medium">Patient Analysis Chart</p>
              <p className="text-gray-500 text-sm mt-1">Interactive visualization would appear here</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">50</div>
              <div className="text-sm text-gray-600">12 Jan</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">200</div>
              <div className="text-sm text-gray-600">14 Jan</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">60</div>
              <div className="text-sm text-gray-600">16 Jan</div>
            </div>
          </div>
        </div>

        {/* Patient Distribution Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Patient Distribution</h2>
              <p className="text-gray-500 text-sm mt-1">By consultation type</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Old</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Online</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>New</span>
              </div>
            </div>
          </div>
          
          {/* Pie Chart Placeholder */}
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Pie Chart Representation */}
              <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
              <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)'}}></div>
              <div className="absolute inset-0 rounded-full border-8 border-red-500" style={{clipPath: 'polygon(50% 50%, 50% 0%, 0% 0%, 0% 50%)'}}></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">66</div>
                  <div className="text-sm text-gray-600">Total Patients</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">34</div>
              <div className="text-sm text-gray-600">Old Patients</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">18</div>
              <div className="text-sm text-gray-600">Online Consultancy</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">14</div>
              <div className="text-sm text-gray-600">New Patients</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for Video icon
function Video(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  );
}