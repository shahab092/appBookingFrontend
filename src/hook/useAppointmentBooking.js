import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../context/ToastContext";
import {
  fetchTimeSlots,
  createAppointment,
  startPayment,
  paymentCallback,
  fetchSpecialities,
  fetchPatients,
  clearAppointmentState,
  clearTimeSlots,
} from "../features/AppointmentSlice";
import { fetchAllDoctors } from "../features/DoctorSlice";

/**
 * Custom hook for managing appointment booking flow
 * Centralizes all appointment-related logic and state management
 */
export const useAppointmentBooking = ({
  initialType = "online",
  initialDoctor = null,
  initialSpecialty = null,
  initialLocationId = null,
  onSuccess,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Redux state
  const { user } = useSelector((state) => state.auth);
  const { doctors, loading: loadingDoctors } = useSelector(
    (state) => state.doctor,
  );
  const {
    timeSlots,
    loadingSlots,
    currentAppointment,
    creatingAppointment,
    paymentData,
    processingPayment,
    specialities,
    patients,
    loadingSpecialities,
    loadingPatients,
    error,
  } = useSelector((state) => state.appointment);

  // Local state
  const [appointmentType, setAppointmentType] = useState(initialType);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingStep, setBookingStep] = useState("form"); // form, payment, otp

  // Load initial data
  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchSpecialities());

    if (user?.role === "admin") {
      dispatch(fetchPatients());
    }
  }, [dispatch, user]);

  // Handle errors
  useEffect(() => {
    if (error) {
      showToast(error.message || error, "error");
    }
  }, [error, showToast]);

  // Fetch time slots when dependencies change
  const loadTimeSlots = useCallback(
    async (doctorId, date, locationId = null) => {
      if (!doctorId || !date) {
        dispatch(clearTimeSlots());
        setSelectedTime("");
        return;
      }

      // Guard for in-clinic without location
      if (appointmentType === "inclinic" && !locationId) {
        return;
      }

      const result = await dispatch(
        fetchTimeSlots({
          doctorId,
          appointmentType,
          date,
          locationId,
        }),
      );

      if (fetchTimeSlots.fulfilled.match(result)) {
        const slots = result.payload;
        // Auto-select first available slot
        const firstAvailable =
          slots.morning?.[0]?.time ||
          slots.afternoon?.[0]?.time ||
          slots.evening?.[0]?.time ||
          "";
        setSelectedTime(firstAvailable.toUpperCase());
      }
    },
    [dispatch, appointmentType],
  );

  // Book appointment
  const bookAppointment = useCallback(
    async (formData) => {
      if (!selectedTime) {
        showToast("Please select a time slot", "warning");
        return false;
      }

      const payload = {
        doctorId: formData.doctor,
        date: formData.date,
        timeSlot: selectedTime,
        appointmentType,
        reason: formData.reason,
        ...(appointmentType === "inclinic" && {
          locationId: selectedHospital?.id,
        }),
        ...(!user && {
          patientName: formData.patientName,
          patientPhone: formData.patientPhone,
        }),
      };

      const result = await dispatch(createAppointment(payload));

      if (createAppointment.fulfilled.match(result)) {
        setBookingStep("payment");
        return true;
      }

      return false;
    },
    [
      dispatch,
      selectedTime,
      appointmentType,
      selectedHospital,
      user,
      showToast,
    ],
  );

  // Process payment
  const processPayment = useCallback(
    async (paymentMethod, amount) => {
      if (!currentAppointment) {
        showToast("No appointment found", "error");
        return false;
      }

      // Start payment
      const startResult = await dispatch(
        startPayment({
          appointmentId:
            currentAppointment._id || currentAppointment.appointmentId,
          paymentMethod,
          amount,
        }),
      );

      if (startPayment.fulfilled.match(startResult)) {
        const paymentInfo = startResult.payload;

        // Process callback
        const callbackResult = await dispatch(
          paymentCallback({
            appointmentId:
              currentAppointment._id || currentAppointment.appointmentId,
            paymentId: paymentInfo.paymentId,
            transactionId: paymentInfo.transactionId,
            status: "paid",
          }),
        );

        if (paymentCallback.fulfilled.match(callbackResult)) {
          showToast("Payment successful and appointment booked!", "success");
          onSuccess?.(callbackResult.payload);
          resetBooking();
          return true;
        }
      }

      return false;
    },
    [dispatch, currentAppointment, showToast, onSuccess],
  );

  // Reset booking state
  const resetBooking = useCallback(() => {
    dispatch(clearAppointmentState());
    setBookingStep("form");
    setSelectedTime("");
    setSelectedHospital(null);
  }, [dispatch]);

  return {
    // State
    appointmentType,
    selectedTime,
    selectedHospital,
    bookingStep,
    doctors,
    specialities,
    patients,
    timeSlots,
    currentAppointment,
    paymentData,
    user,

    // Loading states
    loadingDoctors,
    loadingSlots,
    loadingSpecialities,
    loadingPatients,
    creatingAppointment,
    processingPayment,

    // Actions
    setAppointmentType,
    setSelectedTime,
    setSelectedHospital,
    setBookingStep,
    loadTimeSlots,
    bookAppointment,
    processPayment,
    resetBooking,
  };
};
