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
        width="100%"
        centered
        style={{ maxWidth: 900 }}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <CalendarOutlined />
                  <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-sm opacity-90">Complete your booking</p>
                  </div>
                </div>
                <button onClick={onCancel}>
                  <CloseOutlined />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 bg-gray-50">
                <Row gutter={[20, 28]}>
                  <Col xs={24} md={12}>
                    <div className="space-y-5">
                      {/* Appointment Type */}
                      {[
                        {
                          type: "online",
                          icon: <VideoCameraOutlined />,
                          label: "Online Consultation",
                        },
                        {
                          type: "inclinic",
                          icon: <HomeOutlined />,
                          label: "In-clinic Visit",
                        },
                      ].map((item) => (
                        <div
                          key={item.type}
                          onClick={() => setAppointmentType(item.type)}
                          className={`p-3 border-2 rounded-lg cursor-pointer flex gap-3 ${
                            appointmentType === item.type
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </div>
                      ))}

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
                        rules={{
                          required: "Required",
                          onChange: (e) => {
                            const selectedDocId = e.target.value;
                            const doc = doctors.find(
                              (d) => d._id === selectedDocId
                            );
                            if (doc && doc.specialization) {
                              // Map specialization to department option value
                              // Assuming departmentOptions values match specialization strings or need mapping
                              // For now, direct mapping if values align
                              methods.setValue(
                                "department",
                                doc.specialization
                              );
                            }
                          },
                        }}
                      />

                      {/* Guest Inputs */}
                      {!user && (
                        <div className="space-y-4 pt-2 border-t border-gray-100">
                          <p className="text-sm font-semibold text-gray-700">
                            Patient Details
                          </p>
                          <div>
                            <input
                              {...methods.register("guestName", {
                                required: "Name is required",
                              })}
                              placeholder="Enter your Name"
                              className={`w-full p-3 border rounded-lg focus:outline-none ${
                                methods.formState.errors.guestName
                                  ? "border-red-500"
                                  : "border-gray-300 focus:border-blue-500"
                              }`}
                            />
                            {methods.formState.errors.guestName && (
                              <p className="text-red-500 text-xs mt-1">
                                {methods.formState.errors.guestName.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              {...methods.register("guestWhatsapp", {
                                required: "WhatsApp number is required",
                                minLength: {
                                  value: 10,
                                  message: "Minimum 10 digits required",
                                },
                                onChange: (e) => {
                                  e.target.value = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                },
                              })}
                              placeholder="WhatsApp Number"
                              className={`w-full p-3 border rounded-lg focus:outline-none ${
                                methods.formState.errors.guestWhatsapp
                                  ? "border-red-500"
                                  : "border-gray-300 focus:border-blue-500"
                              }`}
                            />
                            {methods.formState.errors.guestWhatsapp && (
                              <p className="text-red-500 text-xs mt-1">
                                {methods.formState.errors.guestWhatsapp.message}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>

                  {/* Right Side */}
                  <Col xs={24} md={12}>
                    <div className="space-y-5">
                      {/* Calendar */}
                      <div className="bg-white border-2 rounded-xl p-4">
                        <div className="flex justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-blue-600">
                              {monthNames[currentMonth - 1]}
                            </h4>
                            <p className="text-xs">{currentYear}</p>
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
                          <ClockCircleOutlined /> Available Slots
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
                              {formatTo12Hour(slot)} {/* ✅ USER SEES AM/PM */}
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
