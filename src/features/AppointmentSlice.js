import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../libs/api";

// Fetch available time slots
export const fetchTimeSlots = createAsyncThunk(
  "appointment/fetchTimeSlots",
  async (
    { doctorId, appointmentType, date, locationId },
    { rejectWithValue },
  ) => {
    try {
      const params = {
        doctorId,
        appointmentType,
        date,
        ...(appointmentType === "inclinic" && locationId && { locationId }),
      };

      const response = await api.get("/doctor/available-slots", { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Create appointment
export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post("/appointments", appointmentData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Start payment
export const startPayment = createAsyncThunk(
  "appointment/startPayment",
  async ({ appointmentId, paymentMethod, amount }, { rejectWithValue }) => {
    try {
      const response = await api.post("/payments/start", {
        appointmentId,
        paymentMethod,
        amount,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Payment callback
export const paymentCallback = createAsyncThunk(
  "appointment/paymentCallback",
  async (
    { appointmentId, paymentId, transactionId, status },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/payments/callback", {
        appointmentId,
        paymentId,
        transactionId,
        status,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch specialities
export const fetchSpecialities = createAsyncThunk(
  "appointment/fetchSpecialities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/specialities");
      const spData =
        response.data.data?.speciality ||
        response.data.data?.specialities ||
        response.data.data ||
        [];
      return Array.isArray(spData) ? spData : [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch patients (for admin)
export const fetchPatients = createAsyncThunk(
  "appointment/fetchPatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/patient");
      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  // Time slots
  timeSlots: {
    morning: [],
    afternoon: [],
    evening: [],
  },
  loadingSlots: false,

  // Appointment creation
  currentAppointment: null,
  creatingAppointment: false,

  // Payment
  paymentData: null,
  processingPayment: false,

  // Specialities and patients
  specialities: [],
  patients: [],
  loadingSpecialities: false,
  loadingPatients: false,

  // General
  error: null,
  success: false,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearAppointmentState: (state) => {
      state.currentAppointment = null;
      state.paymentData = null;
      state.error = null;
      state.success = false;
    },
    clearTimeSlots: (state) => {
      state.timeSlots = {
        morning: [],
        afternoon: [],
        evening: [],
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Time Slots
      .addCase(fetchTimeSlots.pending, (state) => {
        state.loadingSlots = true;
        state.error = null;
      })
      .addCase(fetchTimeSlots.fulfilled, (state, action) => {
        state.loadingSlots = false;
        state.timeSlots = action.payload;
      })
      .addCase(fetchTimeSlots.rejected, (state, action) => {
        state.loadingSlots = false;
        state.error = action.payload || "Failed to fetch time slots";
      })

      // Create Appointment
      .addCase(createAppointment.pending, (state) => {
        state.creatingAppointment = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.creatingAppointment = false;
        state.currentAppointment = action.payload;
        state.success = true;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.creatingAppointment = false;
        state.error = action.payload || "Failed to create appointment";
      })

      // Start Payment
      .addCase(startPayment.pending, (state) => {
        state.processingPayment = true;
        state.error = null;
      })
      .addCase(startPayment.fulfilled, (state, action) => {
        state.processingPayment = false;
        state.paymentData = action.payload;
      })
      .addCase(startPayment.rejected, (state, action) => {
        state.processingPayment = false;
        state.error = action.payload || "Failed to start payment";
      })

      // Payment Callback
      .addCase(paymentCallback.pending, (state) => {
        state.processingPayment = true;
        state.error = null;
      })
      .addCase(paymentCallback.fulfilled, (state, action) => {
        state.processingPayment = false;
        state.success = true;
        state.currentAppointment = action.payload;
      })
      .addCase(paymentCallback.rejected, (state, action) => {
        state.processingPayment = false;
        state.error = action.payload || "Payment verification failed";
      })

      // Fetch Specialities
      .addCase(fetchSpecialities.pending, (state) => {
        state.loadingSpecialities = true;
      })
      .addCase(fetchSpecialities.fulfilled, (state, action) => {
        state.loadingSpecialities = false;
        state.specialities = action.payload;
      })
      .addCase(fetchSpecialities.rejected, (state, action) => {
        state.loadingSpecialities = false;
        state.error = action.payload || "Failed to fetch specialities";
      })

      // Fetch Patients
      .addCase(fetchPatients.pending, (state) => {
        state.loadingPatients = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loadingPatients = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loadingPatients = false;
        state.error = action.payload || "Failed to fetch patients";
      });
  },
});

export const { clearAppointmentState, clearTimeSlots, clearError } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
