import React, { useState, useEffect } from "react";

import {
  VideoCameraOutlined,
  HomeOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import api from "../../libs/api";
import { useForm, FormProvider } from "react-hook-form";
import CustomSelect from "../common/CustomSelect";
import CustomTextField from "../common/CustomTextField";
import { useSelector } from "react-redux";
import { useToast } from "../../context/ToastContext";
import PaymentMethodModal from "../common/PaymentMethodModal";
import OTPModal from "../common/OTPModal";
import CustomModal from "../common/CustomModal";
import CountryCodeInput from "../common/CountryCodeInput";

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
  initialDoctor,
  initialSpecialty = null,
}) {
  const { user } = useSelector((state) => state.auth);
  const { showToast } = useToast();

  const [appointmentType, setAppointmentType] = useState(initialType);
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Guest Flow State
  const [bookingStep, setBookingStep] = useState("form"); // form, payment, otp
  const [pendingData, setPendingData] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const methods = useForm({
    defaultValues: { department: "", doctor: "", reason: "" },
  });
  console.log(initialDoctor, "doctor");

  const { watch, handleSubmit, reset, setValue } = methods;
  const selectedDepartment = watch("department");
  const selectedDoctor = watch("doctor");

  useEffect(() => {
    if (visible) {
      fetchDoctors();
      fetchSpecialities();
      setAppointmentType(initialType);
    }
  }, [visible, initialType]);

  // const fetchTimeSlote = async () => {
  //   try {
  //     const resp = await api.get(`doctors/${selectedDoctor}/availability`);
  //     console.log(resp.data, "timeslot");
  //   } catch (error) {
  //     showToast(
  //       error.response?.data?.message || "Failed to fetch time slots",
  //       "error",
  //     );
  //   }
  // };
  // Pre-fill doctor and specialty if provided
  useEffect(() => {
    if (visible && initialDoctor) {
      setValue("doctor", initialDoctor.doctorId || initialDoctor._id);
      // Auto-select specialty if available in doctor object
      const spec = initialDoctor.speciality || initialDoctor.specialty;
      if (spec) {
        setValue("department", spec);
      }
    } else if (visible && initialSpecialty) {
      setValue("department", initialSpecialty);
    }
  }, [visible, initialDoctor, initialSpecialty, setValue]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctor");
      // console.log(res.data.data, "res.data");
      setDoctors(res.data?.data || []);
    } catch {
      showToast("Failed to fetch doctors", "error");
    }
  };

  const [patients, setPatients] = useState([]);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    // fetchTimeSlote("6979757088632d451d729d23");
    if (visible && isAdmin) {
      fetchPatients();
    }
  }, [visible, isAdmin]);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patient");
      if (res.data?.success) {
        setPatients(res.data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch patients", error);
    }
  };

  const fetchSpecialities = async () => {
    try {
      const res = await api.get("/specialities");
      if (res.data?.success) {
        const spData =
          res.data.data?.speciality ||
          res.data.data?.specialities ||
          res.data.data ||
          [];
        setSpecialities(Array.isArray(spData) ? spData : []);
      }
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };

  // Filter doctors based on selected specialty, but ALWAYS include the currently selected doctor
  const filteredDoctors = React.useMemo(() => {
    let list = doctors;
    if (selectedDepartment) {
      list = list.filter((d) => {
        const docSpec = d.speciality || d.specialty || "";
        // If this is the currently selected doctor, always keep them
        if (
          selectedDoctor &&
          (d._id === selectedDoctor || d.id === selectedDoctor)
        )
          return true;

        return docSpec.toLowerCase().includes(selectedDepartment.toLowerCase());
      });
    }
    return list;
  }, [doctors, selectedDepartment, selectedDoctor]);

  // Auto-set specialty if doctor is selected manually and no specialty is selected
  useEffect(() => {
    if (selectedDoctor && !selectedDepartment) {
      const doc = doctors.find((d) => d._id === selectedDoctor);
      if (doc && (doc.speciality || doc.specialty)) {
        setValue("department", doc.speciality || doc.specialty);
      }
    }
  }, [selectedDoctor, selectedDepartment, doctors, setValue]);

  /* ---------------- Reset Flow ---------------- */
  useEffect(() => {
    if (!visible) {
      setBookingStep("form");
      setPendingData(null);
      reset({ department: "", doctor: "", reason: "" }); // Reset form on close
    }
  }, [visible, reset]);

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
    console.log(data, "dcotor data");
    if (!appointmentType || !data.doctor) {
      showToast("Please select a doctor", "warning");
      return;
    }

    console.log("Doctor value:", data.doctor, "Type:", typeof data.doctor);
    // Guest/Admin Validation
    if (!user && (!data.patientName || !data.patientPhone)) {
      showToast("Please provide your name and WhatsApp number", "warning");
      return;
    }

    if (isAdmin && !data.patient) {
      showToast("Please select a patient", "warning");
      return;
    }

    // Prepare Payload
    const payload = {
      doctorId: data.doctor, //docotor id
      speciality: data.department || "General", // Default if blank
      // patientId: isAdmin ? data.patient : user?.id || null, // Allow null for guests
      date: `${monthNames[currentMonth - 1]} ${selectedDate}, ${currentYear}`,
      timeSlot: selectedTime,
      appointmentType,
      // bookedBy: isAdmin ? "admin" : "patient",
      reason: data.reason,
      // Guest fields
      ...(!user && {
        patientName: data.patientName,
        patientPhone: data.patientPhone,
        reason: data.reason,
        // isGuest: true,
      }),
    };

    // If User -> Direct Book
    if (user) {
      processBooking(payload);
      console.log(payload, "authentic user");
    } else {
      // If Guest -> Open Payment
      setPendingData(payload);
      await api.post("/appointments", payload);
      console.log(payload, "noon authentic user");
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

  const handlePaymentProceed = async (method) => {
    const payload = {
      appointmentId: pendingData._id,
      paymentMethod: method,
      amount: 500,
    };
    await api.post("/payments/start", payload);
    // setBookingStep("otp");
  };

  const handleOTPVerify = async (otp) => {
    setLoading(true);
    try {
      const res = await api.post("/verify-otp", {
        whatsappnumber: pendingData.guestWhatsapp,
        otp,
      });
      if (res.data?.success) {
        processBooking({
          ...pendingData,
          paymentMethod: "confirmed",
          otpVerified: true,
        });
      } else {
        showToast("Invalid OTP. Please try again.", "error");
      }
    } catch (error) {
      showToast(
        error.response?.data?.message || "Verification failed",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomModal
        visible={visible && bookingStep === "form"}
        title={title}
        subtitle="Complete your booking in a few simple steps"
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        submitText={loading ? "Booking..." : "Book Appointment"}
        loading={loading}
        width={880}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-0 pt-0">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
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
                    className={`flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-lg border
            ${
              appointmentType === item.type
                ? "bg-primary/10 border-primary text-primary"
                : "border-neutral-medium text-gray-600"
            }`}
                  >
                    {item.icon}
                    <span className="text-xs sm:text-sm font-medium">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {/* BODY */}
            <div className="p-0 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* LEFT SIDE */}
              <div className="space-y-4 sm:space-y-5">
                <div className="border border-neutral-medium rounded-lg p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-primary">
                        {monthNames[currentMonth - 1]}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {currentYear}
                      </p>
                    </div>
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 sm:p-2 hover:bg-gray-100 rounded"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 sm:p-2 hover:bg-gray-100 rounded"
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-xs sm:text-sm">
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={i} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setSelectedDate(i + 1)}
                        className={`h-7 sm:h-8 rounded-md text-xs sm:text-sm
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
              <div className="space-y-4 sm:space-y-5">
                {/* Available Slots */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2">
                    <ClockCircleOutlined /> Available Slots
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-1.5 sm:py-2 rounded-md text-xs sm:text-sm border
                  ${
                    selectedTime === slot
                      ? "bg-primary text-white border-primary"
                      : "border-neutral-medium hover:bg-gray-50"
                  }`}
                      >
                        {formatTo12Hour(slot)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Department & Doctor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <CustomSelect
                    name="department"
                    label="Speciality"
                    options={specialities.map((s) => ({
                      label: s.speciality || s.name,
                      value: s.speciality || s.name, // matching by string name
                    }))}
                    // Removed required rule
                  />

                  <CustomSelect
                    name="doctor"
                    label="Doctor"
                    options={filteredDoctors.map((d) => ({
                      label: `${d.name}`,
                      value: d.doctorId,
                    }))}
                  />

                  {isAdmin && (
                    <div className="sm:col-span-2">
                      <CustomSelect
                        name="patient"
                        label="Select Patient"
                        options={patients.map((p) => ({
                          label: `${p.name} (${p.email})`,
                          value: p._id,
                        }))}
                        rules={{ required: "Patient is required" }}
                      />
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <CustomTextField
                      name="reason"
                      label="Reason for Visit"
                      placeholder="Briefly describe the reason for your visit"
                    />
                  </div>
                </div>
              </div>
            </div>
            {!user && (
              <div className="pt-3 sm:pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <CustomTextField
                    name="patientName"
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

                  <CountryCodeInput
                    name="patientPhone"
                    label="WhatsApp Number"
                    placeholder="Enter WhatsApp number"
                    rules={{
                      required: "WhatsApp number is required",
                    }}
                  />
                </div>
              </div>
            )}
          </form>
        </FormProvider>
      </CustomModal>

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
          loading={loading}
        />
      )}
    </>
  );
}
