import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "antd";
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
import CustomTextField from "../common/CustomTextField";
import { departmentOptions } from "../../constant/data";
import { useSelector } from "react-redux";
import { useToast } from "../../context/ToastContext";
import PaymentMethodModal from "../common/PaymentMethodModal";
import OTPModal from "../common/OTPModal";

/* ---------------- Constants ---------------- */
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "15:30",
  "16:00",
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
  initialType = "online", // Default to online
}) {
  const { user } = useSelector((state) => state.auth);
  const { showToast } = useToast();

  const [appointmentType, setAppointmentType] = useState(initialType);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Guest Flow State
  const [bookingStep, setBookingStep] = useState("form"); // form, payment, otp
  const [pendingData, setPendingData] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const methods = useForm({
    defaultValues: { department: "", doctor: "" },
  });

  const { watch, handleSubmit, reset } = methods;
  const selectedDepartment = watch("department");

  /* ---------------- Fetch Doctors ---------------- */
  /* ---------------- Fetch Doctors & Sync Type ---------------- */
  useEffect(() => {
    if (visible) {
      fetchDoctors();
      setAppointmentType(initialType);
    }
  }, [visible, initialType]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("doctor");
      console.log(res.data, "res.data");
      setDoctors(res.data?.data || []);
    } catch {
      showToast("Failed to fetch doctors", "error");
    }
  };

  /* ---------------- Reset Flow ---------------- */
  useEffect(() => {
    if (!visible) {
      setBookingStep("form");
      setPendingData(null);
    }
  }, [visible]);

  /* ---------------- Time Formatter (DISPLAY ONLY) ---------------- */
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

  /* ---------------- Calendar Helpers ---------------- */
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  };

  /* ---------------- Submit ---------------- */
  const onSubmit = async (data) => {
    if (!appointmentType || !data.department || !data.doctor) {
      showToast("Please fill all required fields", "warning");
      return;
    }

    // Guest Validation
    if (!user && (!data.guestName || !data.guestWhatsapp)) {
      showToast("Please provide your name and WhatsApp number", "warning");
      return;
    }

    // Prepare Payload
    const payload = {
      doctorId: data.doctor,
      department: data.department,
      patientId: user?.id || null, // Allow null for guests
      date: `${monthNames[currentMonth - 1]} ${selectedDate}, ${currentYear}`,
      timeSlot: selectedTime,
      appointmentType,
      // Guest fields
      ...(!user && {
        guestName: data.guestName,
        guestWhatsapp: data.guestWhatsapp,
        isGuest: true,
      }),
    };

    // If User -> Direct Book
    if (user) {
      processBooking(payload);
    } else {
      // If Guest -> Open Payment
      setPendingData(payload);
      setBookingStep("payment");
    }
  };

  const processBooking = async (payload) => {
    try {
      setLoading(true);
      const res = await api.post("appointments/book", payload);
      showToast("Appointment booked successfully!", "success");
      onOk?.(res.data?.data || payload);

      reset();
      onCancel();
    } catch (error) {
      showToast(error.response?.data?.message || "Booking failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentProceed = (method) => {
    // Ideally store payment method in payload
    setBookingStep("otp");
  };

  const handleOTPVerify = (otp) => {
    // Here we assume OTP is correct for the demo/frontend task
    processBooking({
      ...pendingData,
      paymentMethod: "confirmed",
      otpVerified: true,
    });
  };

  return (
    <>
      <Modal
        open={visible && bookingStep === "form"}
        footer={null}
        closable={false}
        onCancel={onCancel}
        centered
        width={880}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-xl overflow-hidden bg-white shadow-lg">
              {/* HEADER */}
              <div className="bg-primary px-6 py-4 flex items-center justify-between text-white">
                <div>
                  <h3>{title}</h3>
                  <p className="text-xs opacity-90">
                    Complete your booking in a few simple steps
                  </p>
                </div>
                <button onClick={onCancel}>
                  <CloseOutlined />
                </button>
              </div>
              <div className="px-6 pt-5">
                <div className="flex gap-3">
                  {[
                    {
                      type: "online",
                      label: "Online Consultation",
                      icon: <VideoCameraOutlined />,
                    },
                    {
                      type: "inclinic",
                      label: "In-clinic Visit",
                      icon: <HomeOutlined />,
                    },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.type}
                      onClick={() => setAppointmentType(item.type)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border
          ${
            appointmentType === item.type
              ? "bg-primary/10 border-primary text-primary"
              : "border-gray-200 text-gray-600"
          }`}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* BODY */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT SIDE */}
                <div className="space-y-5">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="font-semibold text-primary">
                          {monthNames[currentMonth - 1]}
                        </p>
                        <p className="text-xs text-gray-500">{currentYear}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={handlePrevMonth}>
                          ‹
                        </button>
                        <button type="button" onClick={handleNextMonth}>
                          ›
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-sm">
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={i} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setSelectedDate(i + 1)}
                          className={`h-8 rounded-md
                      ${
                        selectedDate === i + 1
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100"
                      }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-5">
                  {/* Available Slots */}
                  <div>
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <ClockCircleOutlined /> Available Slots
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 rounded-md text-sm border
                      ${
                        selectedTime === slot
                          ? "bg-primary text-white border-primary"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                        >
                          {formatTo12Hour(slot)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Department & Doctor */}
                  <div className="grid grid-cols-2 gap-4">
                    <CustomSelect
                      name="department"
                      label="Department"
                      options={departmentOptions}
                      rules={{ required: "Required" }}
                    />

                    <CustomSelect
                      name="doctor"
                      label="Doctor"
                      options={doctors.map((d) => ({
                        label: `${d.firstName} ${d.lastName}`,
                        value: d._id,
                      }))}
                    />
                  </div>
                </div>
              </div>
              {!user && (
                <div className="pt-4 px-6">
                  <h4 className="mb-3">Patient Details</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomTextField
                      name="guestName"
                      label="Patient Name"
                      placeholder="Enter patient name"
                      rules={{
                        required: "Patient name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      }}
                    />

                    <CustomTextField
                      name="guestWhatsapp"
                      label="WhatsApp Number"
                      placeholder="Enter WhatsApp number"
                      rules={{
                        required: "WhatsApp number is required",
                        pattern: {
                          value: /^[0-9]{10,15}$/,
                          message:
                            "Please enter a valid phone number (10-15 digits)",
                        },
                      }}
                    />
                  </div>
                </div>
              )}

              {/* FOOTER */}
              <div className="px-6 py-4 flex justify-end gap-3 ">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 rounded-md border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-md bg-primary text-white"
                >
                  {loading ? "Booking..." : "Book Appointment"}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Modal>

      {/* Guest Booking Flow Modals */}
      {bookingStep === "payment" && (
        <PaymentMethodModal
          visible={true}
          price={
            doctors.find((d) => d._id === methods.getValues("doctor"))
              ?.consultationFee || 1500
          }
          onClose={() => setBookingStep("form")}
          onProceed={handlePaymentProceed}
        />
      )}

      {bookingStep === "otp" && (
        <OTPModal
          visible={true}
          onClose={() => setBookingStep("payment")} // Go back to payment
          onVerify={handleOTPVerify}
          mobileNumber={pendingData?.guestWhatsapp}
        />
      )}
    </>
  );
}
