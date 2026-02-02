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
import { getAddressFromCoords } from "../../libs/locationUtils";

/* ---------------- Constants ---------------- */
// Removed hardcoded timeSlots - now using dynamic slots from API

export default function AppointmentModal({
  visible,
  title = "Schedule an Appointment",
  onOk,
  onCancel,
  initialType = "online",
  initialDoctor,
  initialSpecialty = null,
  initialLocationId = null,
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
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Dynamic Time Slots State
  const [availableTimeSlots, setAvailableTimeSlots] = useState({
    morning: [],
    afternoon: [],
    evening: [],
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Custom Date Selector State
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const [availableDates] = useState(generateDates());
  const [dynamicHospitals, setDynamicHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const methods = useForm({
    defaultValues: {
      department: "",
      doctor: "",
      reason: "",
      // Pre-select the first available date by default
      date: availableDates[0].toISOString(),
    },
  });

  const { watch, handleSubmit, reset, setValue } = methods;
  const selectedDepartment = watch("department");
  const selectedDoctor = watch("doctor");
  const selectedDate = watch("date");

  useEffect(() => {
    if (visible) {
      fetchDoctors();
      fetchSpecialities();
      setAppointmentType(initialType);
    }
  }, [visible, initialType]);

  // Fetch time slots when doctor, appointment type, or date changes
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchAvailableTimeSlots();
    } else {
      setAvailableTimeSlots({ morning: [], afternoon: [], evening: [] });
      setSelectedTime("");
    }
  }, [selectedDoctor, appointmentType, selectedDate, selectedHospital]);

  // Format date for API call (YYYY-MM-DD)
  const formatDateForAPI = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchAvailableTimeSlots = async () => {
    if (!selectedDoctor || !selectedDate) return;

    // Fix: Guard against fetching in-clinic slots without a locationId
    if (appointmentType === "inclinic" && !selectedHospital?.id) {
      console.log(
        "--- Guard: Waiting for selectedHospital for in-clinic slots ---",
      );
      return;
    }

    try {
      setLoadingSlots(true);
      const formattedDate = formatDateForAPI(selectedDate);

      const resp = await api.get("doctor/available-slots", {
        params: {
          doctorId: selectedDoctor,
          appointmentType: appointmentType,
          date: formattedDate,
          ...(appointmentType === "inclinic" && {
            locationId: selectedHospital?.id,
          }),
        },
      });

      if (resp.data && resp.data.success && resp.data.data) {
        const slots = resp.data.data;
        setAvailableTimeSlots(slots);

        // Auto-select first available slot if any (normalize to Uppercase AM/PM)
        const firstAvailable =
          slots.morning?.[0]?.time ||
          slots.afternoon?.[0]?.time ||
          slots.evening?.[0]?.time ||
          "";
        setSelectedTime(firstAvailable.toUpperCase());
      } else {
        setAvailableTimeSlots({ morning: [], afternoon: [], evening: [] });
        setSelectedTime("");
      }
    } catch (error) {
      console.error("Error fetching time slots:", error);
      showToast(
        error.response?.data?.message || "Failed to fetch available time slots",
        "error",
      );
      setAvailableTimeSlots({ morning: [], afternoon: [], evening: [] });
      setSelectedTime("");
    } finally {
      setLoadingSlots(false);
    }
  };

  // Helper function to convert 12-hour format to 24-hour format
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  useEffect(() => {
    if (visible) {
      // Ensure date is reset to today whenever modal opens
      if (availableDates?.[0]) {
        setValue("date", availableDates[0].toISOString());
      }

      if (initialDoctor) {
        // PRE-SELECT DOCTOR: Ensure we use doctorId consistently for select value
        const targetDoctorId =
          initialDoctor.doctorId || initialDoctor.id || initialDoctor._id;
        setValue("doctor", targetDoctorId);

        // Auto-select specialty if available in doctor object
        const spec = initialDoctor.speciality || initialDoctor.specialty;
        if (spec) {
          setValue("department", spec);
        }

        // Auto-select location/hospital if initialLocationId is provided
        if (initialLocationId) {
          // We'll wait for dynamicHospitals to be populated in its own useEffect
          // and then handle selection there if it hasn't happened yet
        }
      } else if (initialSpecialty) {
        setValue("department", initialSpecialty);
      }
    }
  }, [
    visible,
    initialDoctor,
    initialSpecialty,
    setValue,
    initialLocationId,
    availableDates,
  ]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctor");
      setDoctors(res.data?.data || []);
    } catch {
      showToast("Failed to fetch doctors", "error");
    }
  };

  const [patients, setPatients] = useState([]);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
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

  console.log(filteredDoctors, "docotttttttttttt");
  // Auto-set specialty if doctor is selected manually and no specialty is selected
  useEffect(() => {
    if (selectedDoctor && !selectedDepartment) {
      const doc = doctors.find((d) => d._id === selectedDoctor);
      if (doc && (doc.speciality || doc.specialty)) {
        setValue("department", doc.speciality || doc.specialty);
      }
    }
  }, [selectedDoctor, selectedDepartment, doctors, setValue]);

  // Update dynamic hospitals when selected doctor changes
  useEffect(() => {
    const updateHospitals = async () => {
      if (!selectedDoctor) {
        setDynamicHospitals([]);
        setSelectedHospital(null);
        return;
      }

      const doc = doctors.find(
        (d) => d._id === selectedDoctor || d.doctorId === selectedDoctor,
      );

      if (doc && doc.locations && doc.locations.length > 0) {
        // Step 1: Initialize with coordinates/names immediately to avoid blank screen
        const initialHospitals = doc.locations.map((loc) => {
          // Find matching availability for this specific clinic location
          const inclinicAvail = (doc.availability || []).filter(
            (a) =>
              a.appointmentType === "inclinic" &&
              (a.locationId === loc.hospitalId || a.locationId === loc._id),
          );
          const timingStr =
            inclinicAvail
              .map(
                (a) => `${a.day.substring(0, 3)}: ${a.startTime}-${a.endTime}`,
              )
              .join(", ") || "Check Availability";

          return {
            id: loc.hospitalId || loc._id,
            name: loc.name || "Clinic",
            location:
              loc.address ||
              `Lat: ${loc.coordinates?.lat}, Lng: ${loc.coordinates?.lng}`,
            addressResolved: !!loc.address,
            timing: timingStr,
            coordinates: loc.coordinates,
          };
        });

        setDynamicHospitals(initialHospitals);

        // Step 1.1: Pre-select hospital based on initialLocationId or default to first
        const preSelected = initialLocationId
          ? initialHospitals.find((h) => h.id === initialLocationId) ||
            initialHospitals[0]
          : initialHospitals[0];

        setSelectedHospital(preSelected);

        // Step 2: Resolve addresses in the background if needed
        const needsResolving = initialHospitals.some(
          (h) => !h.addressResolved && h.coordinates?.lat && h.coordinates?.lng,
        );

        if (needsResolving) {
          setLoadingHospitals(true);
          try {
            const resolvedHospitals = await Promise.all(
              initialHospitals.map(async (h) => {
                if (
                  !h.addressResolved &&
                  h.coordinates?.lat &&
                  h.coordinates?.lng
                ) {
                  const resolvedAddress = await getAddressFromCoords(
                    h.coordinates.lat,
                    h.coordinates.lng,
                  );
                  return {
                    ...h,
                    location: resolvedAddress,
                    addressResolved: true,
                  };
                }
                return h;
              }),
            );
            setDynamicHospitals(resolvedHospitals);
            // Update timing if it changed (though timing is from doc.availability, not resolved address)
            // But we need to keep the consistency
            setSelectedHospital((prev) => {
              const updated = resolvedHospitals.find(
                (rh) => rh.id === prev?.id,
              );
              return updated || prev;
            });
          } catch (error) {
            console.error("Error resolving hospital addresses:", error);
          } finally {
            setLoadingHospitals(false);
          }
        }
      } else {
        setDynamicHospitals([]);
        setSelectedHospital(null);
      }
    };

    updateHospitals();
  }, [selectedDoctor, doctors]);

  /* ---------------- Reset Flow ---------------- */
  useEffect(() => {
    if (!visible) {
      setBookingStep("form");
      setPendingData(null);
      reset({
        department: "",
        doctor: "",
        reason: "",
        date: availableDates[0].toISOString(),
      }); // Reset form on close with default date
      setAvailableTimeSlots({ morning: [], afternoon: [], evening: [] });
      setSelectedTime("");
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

  /* ---------------- Submit ---------------- */
  const onSubmit = async (data) => {
    if (!appointmentType || !data.doctor) {
      showToast("Please select a doctor", "warning");
      return;
    }

    if (!selectedTime) {
      showToast("Please select a time slot", "warning");
      return;
    }

    console.log("Doctor value:", data.doctor, "Type:", typeof data.doctor);
    const doc = doctors.find(
      (d) => d._id === data.doctor || d.doctorId === data.doctor,
    );
    const fee =
      doc?.fees?.[appointmentType] ||
      (appointmentType === "online" ? 1500 : 2500);

    // Prepare Payload strictly matching the requested schema
    const payload = {
      doctorId: data.doctor,
      date: formatDateForAPI(data.date),
      timeSlot: selectedTime,
      appointmentType,
      reason: data.reason,
      // Only include locationId for in-clinic
      ...(appointmentType === "inclinic" && {
        locationId: selectedHospital?.id,
      }),
      // Guest fields
      ...(!user && {
        patientName: data.patientName,
        patientPhone: data.patientPhone,
      }),
    };

    // UNIFIED FLOW: Use /appointments for everyone as requested
    try {
      setLoading(true);
      const res = await api.post("/appointments", payload);
      if (res.data?.success) {
        // Store fee/pending data
        setPendingData({ ...res.data.data, amount: fee });

        // Decide next step: authenticated users might book directly or go to payment
        // For now, let's keep it consistent: go to payment step.
        // If they should book directly without payment, we'd call processBooking instead.
        // User said "for booking appioiment hit this api /appointments",
        // which matches the guest initiation flow.
        setBookingStep("payment");
      }
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to initiate booking",
        "error",
      );
    } finally {
      setLoading(false);
    }
    console.log("Unified Booking Payload:", payload);
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
    // Map internal IDs to user-friendly titles if needed
    const methodMap = {
      easypaisa: "Easypaisa",
      jazzcash: "JazzCash",
      card: "Visa / Mastercard",
    };

    const startPayload = {
      appointmentId: pendingData._id || pendingData.appointmentId,
      paymentMethod: methodMap[method] || method,
      amount: pendingData.amount || 500,
    };

    try {
      setPaymentLoading(true);

      // 1. Start Payment
      const startRes = await api.post("/payments/start", startPayload);

      if (startRes.data?.success) {
        const paymentData = startRes.data;

        // 2. Immediate Callback (Synthetic for now as requested)
        const callbackPayload = {
          appointmentId: pendingData._id || pendingData.appointmentId,
          paymentId: paymentData.paymentId,
          transactionId: paymentData.transactionId,
          status: "paid",
        };

        const callbackRes = await api.post(
          "/payments/callback",
          callbackPayload,
        );

        if (callbackRes.data?.success) {
          showToast("Payment successful and appointment booked!", "success");
          onOk?.(callbackRes.data.data || pendingData);
          reset();
          onCancel();
        } else {
          showToast(
            callbackRes.data?.message || "Payment verification failed",
            "error",
          );
        }
      } else {
        showToast(startRes.data?.message || "Failed to start payment", "error");
      }
    } catch (error) {
      console.error("Payment error:", error);
      showToast(
        error.response?.data?.message || "An error occurred during payment",
        "error",
      );
    } finally {
      setPaymentLoading(false);
    }
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
            <div className="p-0 mt-6 space-y-6">
              {/* 1. Hospital Selection (if In-clinic) - Moved below type of booking */}
              {appointmentType === "inclinic" && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                    <HomeOutlined /> Hospital / Clinic
                    {loadingHospitals && (
                      <span className="text-xs text-gray-500 ml-2 animate-pulse">
                        Updating locations...
                      </span>
                    )}
                  </p>

                  {dynamicHospitals.length === 0 && !loadingHospitals ? (
                    <div className="text-center py-4 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 text-sm">
                        No clinic locations available for this doctor.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {dynamicHospitals.map((hospital) => {
                        const isActive = selectedHospital?.id === hospital.id;

                        return (
                          <button
                            type="button"
                            key={hospital.id}
                            onClick={() => setSelectedHospital(hospital)}
                            className={`relative border rounded-lg p-4 text-left transition-all
            ${
              isActive
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-neutral-medium hover:bg-gray-50 bg-white"
            }`}
                          >
                            {/* Check icon */}
                            {isActive && (
                              <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                                ✓
                              </span>
                            )}

                            {/* Icon */}
                            <div className="flex items-start gap-4">
                              <div className="text-primary text-2xl pt-1">
                                <HomeOutlined />
                              </div>

                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-800">
                                  {hospital.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                  {hospital.location}
                                </p>

                                <div className="flex items-center gap-2 mt-3">
                                  <span className="text-[10px] bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                                    Available
                                  </span>
                                  <p className="text-[11px] flex items-center gap-1.5 text-gray-600">
                                    <ClockCircleOutlined className="text-[12px]" />
                                    {hospital.timing}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* 2. Specialty & Doctor Selection (Side-by-side) - Moved up */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomSelect
                  name="department"
                  label="Speciality"
                  disabled={!!initialDoctor}
                  options={specialities.map((s) => ({
                    label: s.speciality || s.name,
                    value: s.speciality || s.name,
                  }))}
                />

                <CustomSelect
                  name="doctor"
                  label="Doctor"
                  disabled={!!initialDoctor}
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
              </div>

              {/* 3. Appointment Date Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomSelect
                  name="date"
                  label="Appointment Date"
                  options={availableDates.map((date) => ({
                    label: date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }),
                    value: date.toISOString(),
                  }))}
                />
                <div className="hidden sm:block"></div>
              </div>

              {/* 4. Available Slots */}
              <div className="space-y-6">
                <p className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <ClockCircleOutlined /> Available Slots
                  {loadingSlots && (
                    <span className="text-xs text-gray-500 ml-2 animate-pulse">
                      Updating...
                    </span>
                  )}
                  {!selectedDoctor && (
                    <span className="text-xs text-amber-500 ml-2">
                      (Select a doctor first)
                    </span>
                  )}
                </p>

                {Object.values(availableTimeSlots).every(
                  (list) => list.length === 0,
                ) ? (
                  !loadingSlots && (
                    <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 text-sm">
                        No available slots for selected date
                      </p>
                    </div>
                  )
                ) : (
                  <div className="space-y-6">
                    {/* Render Categories */}
                    {[
                      { id: "morning", label: "Morning" },
                      { id: "afternoon", label: "Afternoon" },
                      { id: "evening", label: "Evening" },
                    ].map(
                      (category) =>
                        availableTimeSlots[category.id]?.length > 0 && (
                          <div key={category.id} className="space-y-3">
                            <h5 className="text-[11px] font-bold uppercase tracking-wider text-primary/70 flex items-center gap-2">
                              {category.label}
                              <div className="flex-1 h-px bg-primary/10"></div>
                            </h5>
                            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                              {availableTimeSlots[category.id].map((slot) => {
                                const isSelected =
                                  selectedTime === slot.time.toUpperCase();
                                return (
                                  <button
                                    key={slot.time}
                                    type="button"
                                    disabled={slot.isBooked}
                                    onClick={() =>
                                      setSelectedTime(slot.time.toUpperCase())
                                    }
                                    className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border-2 text-center
                                      ${
                                        isSelected
                                          ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                                          : slot.isBooked
                                            ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                                            : "bg-white border-slate-100 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-primary/50 hover:bg-primary/5"
                                      }`}
                                  >
                                    {slot.time.toUpperCase()}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                )}
              </div>

              {/* 5. Reason for Visit (Bottom) */}
              <div>
                <CustomTextField
                  name="reason"
                  label="Reason for Visit"
                  placeholder="Briefly describe the reason for your visit"
                />
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
          price={pendingData?.amount || 1500}
          loading={paymentLoading}
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
