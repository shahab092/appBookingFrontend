import React, { useState, useEffect } from "react";
import { Modal, Row, Col, message } from "antd";
import {
  CalendarOutlined,
  CloseOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import api from "../../libs/api";
import { useForm, FormProvider } from "react-hook-form";
import CustomSelect from "../common/CustomSelect";
import { departmentOptions } from "../../constant/data";
import { useSelector } from "react-redux";

// --- Constants ---
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30 ",
  "02:00 ",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AppointmentModal({
  visible,
  title = "Schedule an Appointment",
  onOk,
  onCancel,
}) {
  const { user } = useSelector((state) => state.auth);
  const [appointmentType, setAppointmentType] = useState("online");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const methods = useForm({
    defaultValues: {
      department: "",
      doctor: "",
    },
  });

  const { watch, handleSubmit, reset } = methods;
  const selectedDepartment = watch("department");

  /* ---------------- Fetch Doctors ---------------- */
  useEffect(() => {
    if (visible) fetchDoctors();
  }, [visible]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctor");
      setDoctors(res.data?.data || []);
    } catch (error) {
      message.error("Failed to fetch doctors");
    }
  };

  /* ---------------- Filter Doctors by Department ---------------- */
  const doctor = selectedDepartment
    ? doctors.filter((d) => d?.doctorProfile?.department === selectedDepartment)
    : doctors;

  /* ---------------- Calendar Helpers ---------------- */
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };
  console.log(doctors, "doctorr");
  /* ---------------- Submit ---------------- */
  const onSubmit = async (data) => {
    if (!appointmentType || !data.department || !data.doctor) {
      message.error("Please fill all required fields");
      return;
    }

    const payload = {
      doctorId: data.doctor,
      department: data.department,
      patientId: user.id,
      date: `${monthNames[currentMonth - 1]} ${selectedDate}, ${currentYear}`,
      timeSlot: selectedTime,
      appointmentType,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await api.post("/appointment/book", payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      message.success(res.data?.message || "Appointment booked");
      onOk?.(res.data?.data || payload);
      reset();
    } catch (error) {
      message.error(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      onCancel={onCancel}
      width="100%"
      style={{ maxWidth: 900, margin: "0 auto" }}
      bodyStyle={{ padding: 0, maxHeight: "90vh", overflowY: "auto" }}
      centered
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            {/* ---------------- Header ---------------- */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3 text-white">
                <CalendarOutlined className="text-2xl" />
                <div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-sm opacity-90">
                    Complete your appointment booking
                  </p>
                </div>
              </div>
              <button onClick={onCancel} className="text-white">
                <CloseOutlined />
              </button>
            </div>

            {/* ---------------- Content ---------------- */}
            <div className="p-6 bg-gray-50">
              <Row gutter={[20, 28]}>
                <Col xs={24} md={12}>
                  <div className="space-y-5">
                    {/* Appointment Type */}
                    <div>
                      <label className="font-bold mb-2 block">
                        Appointment Type
                      </label>
                      {[
                        {
                          type: "online",
                          icon: VideoCameraOutlined,
                          label: "Online Consultation",
                        },
                        {
                          type: "in-clinic",
                          icon: HomeOutlined,
                          label: "In-clinic Visit",
                        },
                      ].map(({ type, icon: Icon, label }) => (
                        <div
                          key={type}
                          onClick={() => setAppointmentType(type)}
                          className={`p-3 border-2 rounded-lg cursor-pointer flex items-center gap-3 ${
                            appointmentType === type
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <Icon />
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Department */}
                    <CustomSelect
                      name="department"
                      label="Department"
                      options={departmentOptions}
                      rules={{ required: "Department is required" }}
                    />

                    {/* Doctor */}
                    <CustomSelect
                      name="doctor"
                      label="Select Doctor"
                      options={doctors.map((d) => ({
                        label: `${d.firstName} ${d.lastName}`,
                        value: d._id,
                      }))}
                      rules={{ required: "Doctor is required" }}
                    />
                  </div>
                </Col>

                {/* Right Side */}
                <Col xs={24} md={12}>
                  <div className="space-y-5">
                    {/* Calendar */}
                    <div className="bg-white border-2 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-bold text-blue-600">
                            {monthNames[currentMonth - 1]}
                          </h4>
                          <p className="text-xs text-gray-500">{currentYear}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={handlePrevMonth}>←</button>
                          <button onClick={handleNextMonth}>→</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDay }).map((_, i) => (
                          <div key={i} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedDate(i + 1)}
                            className={`h-9 rounded-lg ${
                              selectedDate === i + 1
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <ClockCircleOutlined />
                        Available Slots
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2 rounded-lg ${
                              selectedTime === slot
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Footer */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={onCancel}
                  type="button"
                  className="px-6 py-2 bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "Booking..." : "Book Appointment"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
