import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiUsers,
  FiVideo,
  FiHome,
  FiCheckCircle,
  FiSearch,
//   Filter,
  FiRefreshCw
} from "react-icons/fi";
import { Modal } from "antd";
import { useToast } from "../../context/ToastContext";
import api from "../../libs/api";
import { useForm, FormProvider } from "react-hook-form";
import CustomSelect from "../common/CustomSelect";
import { departmentOptions } from "../../constant/data";

/* ---------------- Constants ---------------- */
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "15:00", "15:30", "16:00", "16:30", "17:00"
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CreateAppointmentAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [appointmentType, setAppointmentType] = useState("online");
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [lastAppointment, setLastAppointment] = useState(null);
  const { showToast } = useToast();

  const methods = useForm({
    defaultValues: { 
      department: "", 
      doctor: "",
      patient: "",
      reason: ""
    },
  });

  const { watch, handleSubmit, reset } = methods;
  const selectedDepartment = watch("department");
  const selectedDoctor = watch("doctor");

  /* ---------------- Fetch Data ---------------- */
  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctor");
      setDoctors(res.data?.data || []);
    } catch {
      console.error("Failed to fetch doctors");
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patient");
      setPatients(res.data?.data || []);
    } catch {
      console.error("Failed to fetch patients");
    }
  };

  /* ---------------- Calendar Functions ---------------- */
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  /* ---------------- Format Time ---------------- */
  const formatTo12Hour = (time24) => {
    const [h, m] = time24.split(":");
    const date = new Date();
    date.setHours(h, m);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  /* ---------------- Submit Appointment ---------------- */
  const onSubmit = async (data) => {
    if (!appointmentType || !data.department || !data.doctor || !data.patient) {
      showToast("Please fill all required fields", "warning");
      return;
    }

    const selectedDoctorInfo = doctors.find(d => d._id === data.doctor);
    const selectedPatientInfo = patients.find(p => p._id === data.patient);

    const payload = {
      doctorId: data.doctor,
      doctorName: selectedDoctorInfo ? 
        `${selectedDoctorInfo.firstName} ${selectedDoctorInfo.lastName}` : "",
      department: data.department,
      patientId: data.patient,
      patientName: selectedPatientInfo ? 
        `${selectedPatientInfo.firstName} ${selectedPatientInfo.lastName}` : "",
      date: `${monthNames[currentMonth - 1]} ${selectedDate}, ${currentYear}`,
      timeSlot: selectedTime,
      appointmentType,
      reason: data.reason || "General Consultation",
      status: "booked",
      bookedBy: "admin"
    };

    try {
      setLoading(true);
      const res = await api.post("/appointment/book", payload);
      
      setLastAppointment({
        ...payload,
        id: res.data?.data?._id || Date.now().toString(),
        appointmentTypeLabel: appointmentType === "online" ? "Online Consultation" : "In-clinic Visit"
      });
      
      showToast("Appointment booked successfully!", "success");
      setSuccessModalVisible(true);
      reset();
      
      // Reset to defaults
      setAppointmentType("online");
      setSelectedDate(new Date().getDate());
      setSelectedTime(timeSlots[0]);
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to book appointment", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Create Appointment
            </h1>
            <p className="text-gray-600 mt-1">
              Schedule appointments for patients with doctors
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                reset();
                setAppointmentType("online");
                setSelectedDate(new Date().getDate());
                setSelectedTime(timeSlots[0]);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <FiRefreshCw className="w-4 h-4" />
              Reset Form
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
            <div className="flex items-center gap-3">
              <FiCalendar className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">Schedule New Appointment</h2>
                <p className="text-sm opacity-90">Fill in all required details to book an appointment</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Patient & Doctor Selection */}
                  <div className="space-y-6">
                    {/* Appointment Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Appointment Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            type: "online",
                            icon: <FiVideo className="w-5 h-5" />,
                            label: "Online Consultation",
                            description: "Virtual video call"
                          },
                          {
                            type: "inclinic",
                            icon: <FiHome className="w-5 h-5" />,
                            label: "In-clinic Visit",
                            description: "Physical visit to hospital"
                          }
                        ].map((item) => (
                          <div
                            key={item.type}
                            onClick={() => setAppointmentType(item.type)}
                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              appointmentType === item.type
                                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-lg ${
                                appointmentType === item.type 
                                  ? "bg-blue-100 text-blue-600" 
                                  : "bg-gray-100 text-gray-600"
                              }`}>
                                {item.icon}
                              </div>
                              <div>
                                <div className="font-medium">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Patient Selection */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                        <FiUser className="w-4 h-4" />
                        Select Patient
                      </label>
                      <CustomSelect
                        name="patient"
                        label=""
                        options={patients.map(p => ({
                          label: `${p.firstName} ${p.lastName}`,
                          value: p._id,
                          subLabel: p.email || "No email"
                        }))}
                        rules={{ required: "Patient selection is required" }}
                      />
                    </div>

                    {/* Department & Doctor */}
                    <div className="space-y-4">
                      <CustomSelect
                        name="department"
                        label="Department"
                        options={departmentOptions}
                        rules={{ required: "Department selection is required" }}
                      />

                      <CustomSelect
                        name="doctor"
                        label="Doctor"
                        options={doctors.map(d => ({
                          label: `${d.firstName} ${d.lastName}`,
                          value: d._id,
                          subLabel: d.doctorProfile?.specialization || "No specialization"
                        }))}
                        rules={{ required: "Doctor selection is required" }}
                      />
                    </div>

                    {/* Reason for Visit */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Appointment
                      </label>
                      <textarea
                        {...methods.register("reason")}
                        placeholder="Enter reason for appointment (optional)"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                      />
                    </div>
                  </div>

                  {/* Right Column - Date & Time Selection */}
                  <div className="space-y-6">
                    {/* Calendar */}
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {monthNames[currentMonth - 1]} {currentYear}
                          </h3>
                          <p className="text-sm text-gray-500">Select appointment date</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            →
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-2 mb-3">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                            {day}
                          </div>
                        ))}
                        
                        {Array.from({ length: firstDay }).map((_, i) => (
                          <div key={`empty-${i}`} className="h-10" />
                        ))}
                        
                        {Array.from({ length: daysInMonth }).map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedDate(i + 1)}
                            className={`h-10 rounded-lg transition-all ${
                              selectedDate === i + 1
                                ? "bg-blue-600 text-white font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t">
                        <FiCalendar className="w-4 h-4" />
                        <span>Selected Date: </span>
                        <span className="font-medium">
                          {monthNames[currentMonth - 1]} {selectedDate}, {currentYear}
                        </span>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <FiClock className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-lg text-gray-900">Available Time Slots</h3>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`py-3 rounded-lg transition-all ${
                              selectedTime === slot
                                ? "bg-blue-600 text-white font-medium"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {formatTo12Hour(slot)}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t mt-4">
                        <FiClock className="w-4 h-4" />
                        <span>Selected Time: </span>
                        <span className="font-medium">{formatTo12Hour(selectedTime)}</span>
                      </div>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-blue-900 mb-3">Appointment Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">
                            {appointmentType === "online" ? "Online Consultation" : "In-clinic Visit"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">
                            {monthNames[currentMonth - 1]} {selectedDate}, {currentYear}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">{formatTo12Hour(selectedTime)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t">
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                        setAppointmentType("online");
                        setSelectedDate(new Date().getDate());
                        setSelectedTime(timeSlots[0]);
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    >
                      Clear Form
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Booking Appointment...
                        </>
                      ) : (
                        <>
                          <FiCalendar className="w-5 h-5" />
                          Book Appointment
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        open={successModalVisible}
        onCancel={() => setSuccessModalVisible(false)}
        footer={null}
        centered
        width={500}
      >
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Appointment Booked Successfully!</h3>
          <p className="text-gray-600 mb-6">The appointment has been scheduled and confirmed.</p>
          
          {lastAppointment && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-medium text-gray-900 mb-3">Appointment Details:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient:</span>
                  <span className="font-medium">{lastAppointment.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">{lastAppointment.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{lastAppointment.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{formatTo12Hour(lastAppointment.timeSlot)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{lastAppointment.appointmentTypeLabel}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setSuccessModalVisible(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setSuccessModalVisible(false);
                // Optionally refresh or do something else
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Another
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateAppointmentAdmin;