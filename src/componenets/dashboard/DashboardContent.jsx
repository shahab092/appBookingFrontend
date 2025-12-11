// src/componenets/dashboard/DashboardContent.jsx
import React from 'react';
import { FiUsers, FiFileText, FiDollarSign, FiActivity, FiBell, FiMoreVertical } from 'react-icons/fi';

// A reusable Stat Card component for displaying key metrics
const StatCard = ({ icon, title, value, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          {icon}
        </div>
        <span className={`font-semibold ${changeColor}`}>{change}</span>
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
};

const DashboardContent = () => {
  const recentActivities = [
    { id: 1, user: 'Dr. Smith', action: 'updated patient records for John Doe.', time: '2m ago' },
    { id: 2, user: 'Maria Garcia', action: 'scheduled a new appointment.', time: '15m ago' },
    { id: 3, user: 'Billing Dept.', action: 'sent an invoice to Jane Smith.', time: '45m ago' },
    { id: 4, user: 'Dr. Jones', action: 'added a new prescription for Mike Ross.', time: '1h ago' },
  ];

  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', time: '10:30 AM', status: { label: 'Confirmed', color: 'bg-green-100 text-green-800' } },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Jones', time: '11:00 AM', status: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' } },
    { id: 3, patient: 'Mike Ross', doctor: 'Dr. Smith', time: '11:30 AM', status: { label: 'Confirmed', color: 'bg-green-100 text-green-800' } },
    { id: 4, patient: 'Rachel Zane', doctor: 'Dr. Lee', time: '12:00 PM', status: { label: 'Canceled', color: 'bg-red-100 text-red-800' } },
  ];

  const getStatusPill = (status) => (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>
      {status.label}
    </span>
  );

  return (
    <div className="space-y-8">
      {/* 
        Stat Cards Section 
        - grid-cols-1: Stacks cards on mobile.
        - sm:grid-cols-2: Shows 2 cards per row on small screens and up.
        - lg:grid-cols-4: Shows 4 cards per row on large screens and up.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<FiUsers size={24} className="text-blue-600" />}
          title="Total Patients"
          value="1,257"
          change="+5.4%"
          changeType="increase"
        />
        <StatCard 
          icon={<FiFileText size={24} className="text-green-600" />}
          title="New Prescriptions"
          value="82"
          change="-1.2%"
          changeType="decrease"
        />
        <StatCard 
          icon={<FiDollarSign size={24} className="text-yellow-600" />}
          title="Revenue"
          value="$12,340"
          change="+12%"
          changeType="increase"
        />
        <StatCard 
          icon={<FiActivity size={24} className="text-red-600" />}
          title="Open Cases"
          value="16"
          change="+2"
          changeType="increase"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="bg-gray-100 p-2 rounded-full">
                <FiBell size={16} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Schedule Section - Fully Responsive */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Appointments</h3>
        
        {/* Desktop Table View (hidden on screens smaller than md) */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="py-3 font-semibold">Patient</th>
                <th className="py-3 font-semibold">Doctor</th>
                <th className="py-3 font-semibold">Time</th>
                <th className="py-3 font-semibold text-center">Status</th>
                <th className="py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appt => (
                <tr key={appt.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-800 align-top">{appt.patient}</td>
                  <td className="py-3 text-gray-600 align-top">{appt.doctor}</td>
                  <td className="py-3 text-gray-600 align-top">{appt.time}</td>
                  <td className="py-3 text-center align-top">{getStatusPill(appt.status)}</td>
                  <td className="py-3 text-right align-top">
                    <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full transition-colors">
                      <FiMoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (only visible on screens smaller than md) */}
        <div className="space-y-4 md:hidden">
          {appointments.map(appt => (
            <div key={appt.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-800">{appt.patient}</p>
                <p className="text-sm text-gray-500">with {appt.doctor} at {appt.time}</p>
                <div className="mt-2">
                  {getStatusPill(appt.status)}
                </div>
              </div>
              <div>
                <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full transition-colors">
                  <FiMoreVertical size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;