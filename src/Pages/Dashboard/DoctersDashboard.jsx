import React, { useState } from "react";
import { 
  CalendarDays, Users, Clock3, ArrowUpRight, Video, 
  FileText, FlaskRound, FileArchive, Pill, ChevronRight, 
  TrendingUp, CheckCircle, Clock, MoreVertical, 
  Phone, X, Edit, MessageSquare, AlertCircle,
  UserPlus, Search, Filter, Download, Share2,
  Bell, Menu, LogOut, Settings, HelpCircle
} from "lucide-react";

export default function DoctorDashboard() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const startVideoConsultation = (appointment) => {
    setSelectedAppointment(appointment);
    setShowVideoModal(true);
    console.log("Starting video consultation for:", appointment.name);
  };

  const cancelAppointment = (appointment) => {
    console.log("Cancelling appointment for:", appointment.name);
    // In a real app, this would trigger an API call
    alert(`Cancel appointment with ${appointment.name}?`);
  };

  const editAppointment = (appointment) => {
    console.log("Editing appointment for:", appointment.name);
    // In a real app, this would open an edit modal
    alert(`Edit appointment with ${appointment.name}`);
  };

  const todayAppointments = [
    { 
      id: 1, 
      time: "09:00 AM", 
      name: "John Smith", 
      info: "Follow-up Consultation · Age 45", 
      type: "Video", 
      duration: "30 min",
      status: "confirmed"
    },
    { 
      id: 2, 
      time: "10:00 AM", 
      name: "Emily Davis", 
      info: "Annual Checkup · Age 32", 
      type: "In-Person", 
      duration: "45 min",
      status: "confirmed"
    },
    { 
      id: 3, 
      time: "11:30 AM", 
      name: "Michael Brown", 
      info: "Blood Pressure Review · Age 58", 
      type: "Video", 
      duration: "20 min",
      status: "pending"
    },
    { 
      id: 4, 
      time: "02:00 PM", 
      name: "Lisa Anderson", 
      info: "New Patient · Age 28", 
      type: "In-Person", 
      duration: "60 min",
      status: "confirmed"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 px-4 sm:px-6 py-8">
      {/* Header with Navigation */}
      
        {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">DS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Good Morning, Dr. Smith</h1>
                <p className="text-gray-500 mt-0.5">Welcome back to your medical dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md font-medium">
              <span className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                New Appointment
              </span>
            </button>
          </div>
        </div> */}

        {/* Quick Stats Bar */}
        {/* <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            <span>Friday, March 15</span>
          </div>
          <div className="h-4 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Working hours: 9:00 AM - 6:00 PM</span>
          </div>
        </div> */}
 

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat
          title="Today's Appointments"
          value="8"
          badge="+2 from yesterday"
          badgeColor="bg-green-50 text-green-700 border border-green-200"
          iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
          icon={<CalendarDays className="w-5 h-5 text-white" />}
          trend="up"
        />
        <Stat
          title="Total Patients"
          value="1,248"
          badge="+12 this week"
          badgeColor="bg-green-50 text-green-700 border border-green-200"
          iconBg="bg-gradient-to-br from-emerald-500 to-emerald-600"
          icon={<Users className="w-5 h-5 text-white" />}
          trend="up"
        />
        <Stat
          title="Avg. Consultation"
          value="24 min"
          badge="-3 min"
          badgeColor="bg-orange-50 text-orange-700 border border-orange-200"
          iconBg="bg-gradient-to-br from-orange-500 to-amber-500"
          icon={<Clock3 className="w-5 h-5 text-white" />}
          trend="down"
        />
        <Stat
          title="Patient Satisfaction"
          value="4.9"
          badge="+0.2 rating"
          badgeColor="bg-green-50 text-green-700 border border-green-200"
          iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments - Enhanced */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                  4 appointments
                </span>
              </div>
              <p className="text-sm text-gray-500">Manage your appointments for today</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <AppointmentCard 
                key={appointment.id}
                appointment={appointment}
                onStartVideo={() => startVideoConsultation(appointment)}
                onCancel={() => cancelAppointment(appointment)}
                onEdit={() => editAppointment(appointment)}
              />
            ))}
          </div>

          {/* Next Day Info */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                  <div>
                    <span className="text-sm text-gray-600">Tomorrow's schedule</span>
                    <span className="text-sm font-medium text-gray-900 ml-2">6 appointments</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-gray-500">2 video consultations</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                  <FileText className="w-4 h-4" />
                  Prepare notes
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions - Enhanced */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">Click to action</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <ActionCard 
                label="Start Video Call" 
                color="from-blue-500 to-blue-600" 
                icon={<Video className="w-4 h-4 text-white" />}
                onClick={() => setShowVideoModal(true)}
              />
              <ActionCard 
                label="Write Prescription" 
                color="from-emerald-500 to-emerald-600" 
                icon={<FileText className="w-4 h-4 text-white" />}
              />
              <ActionCard 
                label="Order Lab Tests" 
                color="from-amber-500 to-orange-500" 
                icon={<FlaskRound className="w-4 h-4 text-white" />}
              />
              <ActionCard 
                label="Medical Records" 
                color="from-purple-500 to-pink-500" 
                icon={<FileArchive className="w-4 h-4 text-white" />}
              />
            </div>
          </div>

          {/* Recent Patients - Enhanced */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
              </div>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <PatientCard name="Robert Chen" status="Stable" color="bg-emerald-50 text-emerald-700 border border-emerald-200" time="2 hours ago" />
              <PatientCard name="Maria Garcia" status="Monitoring" color="bg-amber-50 text-amber-700 border border-amber-200" time="Yesterday" />
              <PatientCard name="James Wilson" status="Critical" color="bg-red-50 text-red-700 border border-red-200" time="2 days ago" />
              <PatientCard name="Sarah Johnson" status="Recovering" color="bg-blue-50 text-blue-700 border border-blue-200" time="3 days ago" />
            </div>

            {/* Recovery Rate Card */}
            <div className="rounded-xl bg-gradient-to-r from-blue-50 via-blue-50/50 to-indigo-50 border border-blue-100 px-5 py-4 hover:border-blue-200 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <p className="font-semibold text-blue-900">Patient Recovery Rate</p>
                  </div>
                  <p className="text-sm text-blue-700">25% of your patients show improvement this week</p>
                </div>
                <div className="relative h-12 w-12">
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray="25, 100"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-blue-900">25%</span>
                </div>
              </div>
              <button className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium">
                View detailed report →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Consultation Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-in fade-in zoom-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Start Video Consultation</h3>
                  <p className="text-sm text-gray-500">Connect with your patient</p>
                </div>
              </div>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {selectedAppointment && (
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-lg font-semibold text-blue-700">
                    {selectedAppointment.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedAppointment.name}</p>
                    <p className="text-sm text-gray-600">{selectedAppointment.time}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://meet.dr-smith.com/john-smith"
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium">
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowVideoModal(false);
                    alert("Starting video call...");
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md font-medium flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Start Video Call
                </button>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl transition-colors font-medium"
                >
                  Schedule Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Stat Component
function Stat({ title, value, badge, badgeColor, icon, iconBg, trend }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-2">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <span className={`inline-block mt-3 text-xs font-medium px-3 py-1.5 rounded-full ${badgeColor}`}>
            {trend === 'up' ? '↑' : '↓'} {badge}
          </span>
        </div>
        <div className={`h-12 w-12 rounded-xl ${iconBg} flex items-center justify-center shadow-md`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Enhanced Appointment Card with Action Buttons
function AppointmentCard({ appointment, onStartVideo, onCancel, onEdit }) {
  const isVideo = appointment.type === "Video";
  const isPending = appointment.status === "pending";

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer bg-white hover:shadow-sm">
      <div className="flex items-start sm:items-center gap-4 mb-3 sm:mb-0">
        <div className="flex flex-col items-center min-w-16">
          <span className="text-sm font-semibold text-gray-900">{appointment.time.split(' ')[0]}</span>
          <span className="text-xs text-gray-400">{appointment.time.split(' ')[1]}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-base font-semibold text-blue-700">
            {appointment.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900">{appointment.name}</p>
              {isPending && (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                  Pending
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-sm text-gray-600">{appointment.info}</p>
              <span className="text-xs text-gray-400">•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-sm text-gray-600">{appointment.duration}</span>
              </div>
              <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${isVideo ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
                {isVideo ? <Video className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
                {appointment.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 self-end sm:self-center">
        {isVideo && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartVideo();
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            Start Video
          </button>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          title="Edit appointment"
        >
          <Edit className="w-4 h-4" />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
          className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          title="Cancel appointment"
        >
          <X className="w-4 h-4" />
        </button>
        
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Enhanced Action Card
function ActionCard({ label, color, icon, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 bg-white hover:-translate-y-1"
    >
      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">{label}</span>
    </button>
  );
}

// Enhanced Patient Card
function PatientCard({ name, status, color, time }) {
  return (
    <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-150 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 shadow-sm">
            {name[0]}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400"></div>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{time}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${color}`}>
          {status}
        </span>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-100 rounded-lg">
          <MessageSquare className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}