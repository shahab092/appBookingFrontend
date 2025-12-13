import React, { useState } from "react";
import { FiCalendar, FiActivity, FiClock, FiMapPin } from "react-icons/fi";
import AppointmentModal from "./AppointmentModal";
import AppointmentBooking from "./AppointmentBooking";
import RecentActivity from "./RecentActivity";
import { CloseOutlined, CloseSquareTwoTone } from "@ant-design/icons";
import AppointmentCard from "./AppointmentCard";
import { appointments } from "../../constant/data";

const PatientDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleAppointmentBooked = (appointment) => {
    console.log("Appointment booked:", appointment);
    setModalVisible(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Left Column - 2/3 width */}
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
              <FiCalendar className="text-lg" />
              New Appointment
            </button>

            {/* Appointment Modal */}
            <AppointmentModal
              visible={modalVisible}
              onCancel={handleCloseModal}
              onOk={handleAppointmentBooked}
            />
          </div>

          {/* Appointment Cards */}
          {/* <div className="space-y-4">
            <div className="border-l-4 border-l-green-400 rounded-lg p-4 bg-gradient-to-r from-green-50 to-white">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full" />
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                      Annual Physical Exam
                    </h3>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-[#2F74AA]">
                    <div className="flex items-center gap-1">
                      <FiClock />
                      <span>Mon, Oct 28, 2024 - 10:30 AM</span>
                    </div>

                    <div className="hidden sm:block w-px h-4 bg-gray-300" />

                    <div className="flex items-center gap-1">
                      <FiMapPin />
                      <span>Dr. Evelyn Reed (Cardiology)</span>
                    </div>
                  </div>
                  <span className="self-start px-3 py-1.5 rounded-full mt-5 inline-block text-xs font-bold bg-green-100 text-green-800 border border-green-300">
                    Confirmed
                  </span>
                </div>

                {/* <span className="self-start px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300">
                  Reschedule
                </span> */}
          {/* <button
                  onClick={handleOpenModal}
                  className="w-full sm:w-auto   px-2 py-1 rounded-lg font-semibold text-sm flex items-center border-gray-200 border-2 justify-center gap-2 "
                >
                  <FiCalendar className="text-lg" />
                  Reschedule
                </button>
                <button className="w-full sm:w-auto   px-2 py-1 rounded-lg font-semibold text-sm flex items-center  justify-center gap-2  text-red-500  border-gray-200 border-2">
                  <CloseOutlined />
                  Cencel
                </button>
              </div>
            </div>
          </div>  */}
          <div className="space-y-4 max-h-96 overflow-y-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg hover:scrollbar-thumb-blue-600 transition-colors duration-300">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                title={appointment.title}
                time={appointment.time}
                doctor={appointment.doctor}
                status={appointment.status}
                statusColor={appointment.statusColor}
                type={appointment.type}
                online={appointment.online}
                cancelled={appointment.cancelled}
                showActions={appointment.showActions}
              />
            ))}
          </div>

          {/* <AppointmentCard/> */}
        </section>

        {/* Recent Activity */}
        {/* <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiActivity className="text-green-600 text-lg" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    New lab results are available
                  </h4>
                  <p className="text-sm text-gray-600">
                    Blood Panel - Oct 23, 2024
                  </p>
                </div>
              </div>
              <a href="#" className="text-sm text-[#2F74AA] font-medium">
                View Results
              </a>
            </div>
          </div>
        </section> */}
        <RecentActivity />
      </div>

      {/* Right Column - 1/3 width */}
      <div className="lg:col-span-1 space-y-4 sm:space-y-6">
        {/* Patient Vitals */}
        <section className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#3a8ccc]">
              Patient Vitals
            </h2>
            <FiActivity className="text-[#3a8ccc] text-lg" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 border border-blue-200 rounded-lg bg-blue-50/30">
              <div className="text-xl font-bold text-[#3a8ccc]">42</div>
              <div className="text-sm text-gray-600">Age</div>
            </div>

            <div className="text-center p-3 border border-green-200 rounded-lg bg-green-50/30">
              <div className="text-xl font-bold text-green-600">165 cm</div>
              <div className="text-sm text-gray-600">Height</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;
