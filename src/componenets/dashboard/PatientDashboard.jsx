import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiActivity,
  FiHeart,
  FiDroplet,
  FiThermometer,
} from "react-icons/fi";
import AppointmentModal from "./AppointmentModal";
import RecentActivity from "./RecentActivity";
import { useSelector } from "react-redux";
import api from "../../libs/api";
import AppointmentCard from "./AppointmentCard";

const PatientDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await api.get(`appointment/patient/${user.id}`);
      setAppointments(res.data.data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user.id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
  
      {/* ================= LEFT COLUMN ================= */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        {/* Upcoming Appointments */}
        <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2F74AA]">
                Upcoming Schedule
              </h2>
              <p className="text-sm text-gray-500 font-medium mt-1">
                You have {appointments.length} upcoming appointment
                {appointments.length !== 1 && "s"}
              </p>
            </div>

            <button
              onClick={handleOpenModal}
              className="btn-primary flex items-center gap-2"
            >
              <FiCalendar />
              New Appointment
            </button>

            <AppointmentModal
              visible={modalVisible}
              onCancel={handleCloseModal}
              onRefresh={fetchAppointments}
            />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-light">
            {loading ? (
              <p className="text-gray-500 text-center">
                Loading appointments...
              </p>
            ) : appointments.length > 0 ? (
              appointments.map((appt) => (
                <AppointmentCard
                  key={appt._id}
                  title={appt.reason}
                  time={`${appt.date} - ${appt.timeSlot}`}
                  doctor={`${appt.doctorId.firstName} ${appt.doctorId.lastName} (${appt.department})`}
                  status={appt.status}
                  statusColor={
                    appt.status === "booked"
                      ? "green"
                      : appt.status === "pending"
                      ? "yellow"
                      : "red"
                  }
                  type="online"
                  handleOpenModal={() => setModalVisible(true)}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No upcoming appointments
              </p>
            )}
          </div>
        </section>

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* ================= RIGHT COLUMN ================= */}
      <div className="lg:col-span-1 flex flex-col gap-4 sm:gap-6 ">
        {/* Patient Vitals */}
        <section className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 flex-1 ">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-[#3a8ccc]">
              Patient Vitals & Demographics
            </h2>
            <FiActivity className="text-[#3a8ccc]" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Age", value: "42 ", unit: "yrs" },
              { label: "Weight", value: "78 ", unit: "kg" },
              { label: "Height", value: "165 ", unit: "cm" },
              { label: "BSA", value: "1.87 ", unit: "m²" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-3 rounded-xl bg-gray-50 space-y-3"
              >
                <div className="text-sm text-gray-500">{item.label}</div>
                <div>
                  <span className="text-3xl font-bold text-gray-900">
                    {item.value}
                  </span>
                  <span className="text-sm"> {item.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 my-4" />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 p-2">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiDroplet className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Blood Pressure
                </span>
              </div>
              <span className="font-semibold">130/85 mmHg</span>
            </div>

            <div className="flex justify-between items-center p-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                  <FiHeart className="text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Heart Rate
                </span>
              </div>
              <span className="font-semibold">72 bpm</span>
            </div>

            <div className="flex justify-between items-center p-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                  <FiThermometer className="text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Body Temp
                </span>
              </div>
              <span className="font-semibold">37.0 °C</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;
