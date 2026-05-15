import React, { useState, useEffect } from 'react';
import { FiCalendar, FiUsers, FiClock, FiTrendingUp } from 'react-icons/fi';
import api from "../../libs/api";
import { useSelector } from "react-redux";

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    today: 0,
    totalPatients: 0,
    pending: 0,
    thisMonth: 0
  });

  const fetchDoctorData = async () => {
    setLoading(true);
    try {
      // Fetch upcoming appointments
      const res = await api.get("appointments/doctor?upcoming=true");
      setAppointments(res.data.data || []);
      
      // In a real app, you might have a dedicated stats endpoint
      // For now, let's derive some basic stats or use placeholders if endpoint doesn't exist
      setStats(prev => ({
        ...prev,
        today: res.data.data?.length || 0,
        totalPatients: 245, // Placeholder if no endpoint
        pending: res.data.data?.filter(a => a.status === 'booked').length || 0,
        thisMonth: 156 // Placeholder
      }));
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchDoctorData();
    }
  }, [user?.id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Upcoming Appointments</p>
              <p className="text-3xl font-bold text-[#2F74AA]">{stats.today}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="text-[#2F74AA] text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Patients</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalPatients}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiUsers className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Consultations</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FiClock className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-3xl font-bold text-purple-600">{stats.thisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-[#2F74AA] mb-6">Upcoming Schedule</h2>
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-500 text-center py-4">Loading schedule...</p>
          ) : appointments.length > 0 ? (
            appointments.map((appt) => (
              <div key={appt._id} className="border-l-4 border-l-blue-400 rounded-lg p-4 bg-blue-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{appt.patientName || "Guest Patient"}</h3>
                    <p className="text-sm text-gray-600 mt-1">{appt.date} - {appt.timeSlot}</p>
                    <p className="text-sm text-gray-500">{appt.reason || "Consultation"}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    appt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold mb-4 text-gray-900">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-[#2F74AA] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#256a9a] transition-colors">
              New Prescription
            </button>
            <button className="w-full border border-[#2F74AA] text-[#2F74AA] py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;


