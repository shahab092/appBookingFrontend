import React, { useState } from "react";
import { FiCalendar, FiActivity, FiHeart, FiX, FiClock, FiMapPin, FiMessageSquare, FiPackage, FiUsers, FiSettings, FiFileText, FiBell, FiSearch, FiChevronDown, FiBarChart2, FiTrendingUp, FiDownload, FiEdit2, FiEye } from "react-icons/fi";
import { FaStethoscope, FaUserNurse, FaHeartbeat, FaPills } from "react-icons/fa";

export default function DoctersDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Quick stats data
  const stats = [
    { title: "Total Appointments", value: "24", change: "+12%", icon: <FiCalendar className="text-blue-500" />, color: "bg-blue-50", trend: "up" },
    { title: "Active Patients", value: "156", change: "+8%", icon: <FaHeartbeat className="text-green-500" />, color: "bg-green-50", trend: "up" },
    { title: "Pending Consultations", value: "12", change: "-3%", icon: <FaStethoscope className="text-orange-500" />, color: "bg-orange-50", trend: "down" },
    { title: "Revenue", value: "$12,840", change: "+18%", icon: <FiTrendingUp className="text-purple-500" />, color: "bg-purple-50", trend: "up" },
  ];

  // Recent appointments
  const appointments = [
    { id: 1, patient: "John Smith", time: "10:30 AM", date: "Today", doctor: "Dr. Sarah Johnson", type: "Regular Checkup", status: "confirmed", color: "bg-green-100 text-green-800" },
    { id: 2, patient: "Emma Wilson", time: "2:15 PM", date: "Today", doctor: "Dr. Michael Chen", type: "Follow-up", status: "pending", color: "bg-yellow-100 text-yellow-800" },
    { id: 3, patient: "Robert Davis", time: "11:00 AM", date: "Tomorrow", doctor: "Dr. Lisa Park", type: "Consultation", status: "confirmed", color: "bg-green-100 text-green-800" },
    { id: 4, patient: "Maria Garcia", time: "4:30 PM", date: "Oct 30", doctor: "Dr. James Wilson", type: "Emergency", status: "cancelled", color: "bg-red-100 text-red-800" },
  ];

  // Quick actions
  const quickActions = [
    { title: "New Appointment", icon: <FiCalendar className="text-white" />, color: "bg-gradient-to-r from-blue-500 to-blue-600" },
    { title: "Patient Records", icon: <FiFileText className="text-white" />, color: "bg-gradient-to-r from-green-500 to-green-600" },
    { title: "Billing", icon: <FaPills className="text-white" />, color: "bg-gradient-to-r from-purple-500 to-purple-600" },
    { title: "Reports", icon: <FiBarChart2 className="text-white" />, color: "bg-gradient-to-r from-orange-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MediCare Dashboard
              </h1>
              <p className="text-sm text-gray-500">Welcome back, Dr. Anderson</p>
            </div>
            
            <div className="hidden md:flex space-x-6">
              <button className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('overview')}>
                Overview
              </button>
              <button className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'patients' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('patients')}>
                Patients
              </button>
              <button className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'calendar' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('calendar')}>
                Calendar
              </button>
              <button className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'reports' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('reports')}>
                Reports
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search patients, records..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <FiBell className="text-gray-600 text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                DA
              </div>
              <div>
                <p className="font-medium">Dr. Anderson</p>
                <p className="text-sm text-gray-500">Admin</p>
              </div>
              <FiChevronDown className="text-gray-500" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className={`h-1 rounded-full ${stat.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                  <FiSettings />
                  Customize
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button key={index} className={`${action.color} rounded-xl p-6 text-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center space-y-3`}>
                    <div className="text-2xl">
                      {action.icon}
                    </div>
                    <span className="font-medium">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Today's Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
                  <p className="text-gray-600">8 appointments scheduled</p>
                </div>
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500">{apt.date}</div>
                        <div className="text-xl font-bold text-gray-900">{apt.time}</div>
                      </div>
                      <div className="w-px h-12 bg-gray-200"></div>
                      <div>
                        <h4 className="font-bold text-gray-900">{apt.patient}</h4>
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaUserNurse className="text-blue-500" />
                          {apt.doctor} • {apt.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${apt.color}`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <FiEye className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <FiEdit2 className="text-blue-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Patient Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {item === 1 ? 'JS' : item === 2 ? 'EW' : 'RD'}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {item === 1 ? 'John Smith' : item === 2 ? 'Emma Wilson' : 'Robert Davis'}
                        </h4>
                        <p className="text-gray-600 text-sm">Completed consultation • 2 hours ago</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Schedule</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm text-blue-600 font-medium">Morning Session</div>
                      <div className="text-lg font-bold text-gray-900">10:30 AM - 1:00 PM</div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      3 Patients
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm">Regular consultations</div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm text-green-600 font-medium">Afternoon Session</div>
                      <div className="text-lg font-bold text-gray-900">2:00 PM - 4:30 PM</div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                      4 Patients
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm">Follow-up appointments</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:-translate-y-0.5">
                  View Full Calendar
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">
                  3 New
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiMessageSquare className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">New message from patient</h4>
                      <p className="text-gray-600 text-sm">John Smith sent a message about prescription</p>
                      <span className="text-xs text-gray-500">10 min ago</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FiFileText className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Lab results ready</h4>
                      <p className="text-gray-600 text-sm">Patient Emma Wilson - Blood test results</p>
                      <span className="text-xs text-gray-500">45 min ago</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <FiCalendar className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Appointment reminder</h4>
                      <p className="text-gray-600 text-sm">Upcoming appointment in 30 minutes</p>
                      <span className="text-xs text-gray-500">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Server Load</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="font-medium">65%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Database</span>
                  <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Last Backup</span>
                  <span className="text-gray-300">Today, 2:00 AM</span>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                <FiDownload />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}