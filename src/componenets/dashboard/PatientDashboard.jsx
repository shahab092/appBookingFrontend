import React, { useState } from "react";
import {
  FiCalendar,
  FiActivity,
  FiClock,
  FiMapPin,
  FiHeart,
  FiDroplet,
  FiThermometer,
} from "react-icons/fi";
import AppointmentModal from "./AppointmentModal";
import RecentActivity from "./RecentActivity";
import AppointmentCard from "./AppointmentCard";
import { appointments } from "../../constant/data";

const PatientDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

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
                You have 3 upcoming appointments
              </p>
            </div>

            <button
              onClick={handleOpenModal}
              className="w-full sm:w-auto bg-gradient-to-r from-[#2F74AA] to-[#3a8ccc] text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <FiCalendar />
              New Appointment
            </button>

            <AppointmentModal
              visible={modalVisible}
              onCancel={handleCloseModal}
            />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-light">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} {...appointment} />
            ))}
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

          {/* Top grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Age", value: "42 ", unit: "yrs" },
              { label: "Weight", value: "78 ", unit: "kg" },
              { label: "Height", value: "165 ", unit: "cm" },
              { label: "BSA", value: "1.87 ", unit: "m²" },
            ].map((item) => (
              <div
                key={item.label}
                className=" p-3 rounded-xl bg-gray-50  space-y-3"
              >
                <div className="text-sm text-gray-500">{item.label}</div>
                <div >
                <span className="text-3xl font-bold text-gray-900"> {item.value}</span>
                  <span className="text-sm"> {item.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 my-4" />

          {/* Detailed vitals */}
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

        {/* Medical Summary */}
        <section className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 flex-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Medical Summary
          </h2>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Conditions
            </p>
            <p className="text-sm text-gray-800">
              Type 2 Diabetes, Hypertension
            </p>
          </div>

          <div className="mb-5">
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Allergies
            </p>
            <p className="text-sm text-gray-800">Penicillin</p>
          </div>

          <div className="border-t border-gray-200 my-4" />

          <button className="text-sm font-semibold text-[#3a8ccc] hover:underline">
            View Full Records
          </button>
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;
