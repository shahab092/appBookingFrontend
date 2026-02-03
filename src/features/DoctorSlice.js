import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../libs/api";

export const searchDoctors = createAsyncThunk(
  "doctor/searchDoctors",
  async (params, { rejectWithValue }) => {
    try {
      console.log("--- Doctor Search API Call ---");
      const apiParams = {};

      // The API expects 'search' for the name query
      const searchVal = params.search || params.name || params.query;
      // REQUIREMENT: don't send search if there is specialityId
      if (params.specialityId) {
        apiParams.specialityId = params.specialityId;
      } else if (searchVal) {
        apiParams.search = searchVal;
      }

      if (params.city) apiParams.city = params.city;

      console.log("API Params:", apiParams);

      const response = await api.get("/doctor/search", { params: apiParams });
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch all doctors (for admin doctors list)
export const fetchAllDoctors = createAsyncThunk(
  "doctor/fetchAllDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/doctor");
      return response.data.data; // Returns array of doctors
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch pending doctors (for admin approval)
export const fetchPendingDoctors = createAsyncThunk(
  "doctor/fetchPendingDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/doctor", {
        params: { status: "pending" },
      });
      return response.data.data; // Returns array of pending doctors
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Approve a doctor
export const approveDoctor = createAsyncThunk(
  "doctor/approveDoctor",
  async (doctorId, { rejectWithValue }) => {
    try {
      await api.patch(`/doctor/${doctorId}/approve`);
      return doctorId; // Return the approved doctor's ID
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  doctors: [],
  pendingDoctors: [],
  loading: false,
  error: null,
  success: false,
  approving: false,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    clearSearchState: (state) => {
      state.doctors = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search Doctors
      .addCase(searchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Robust handling for various response structures
        const data = action.payload?.data || action.payload;
        if (Array.isArray(data)) {
          state.doctors = data;
        } else if (data && Array.isArray(data.doctors)) {
          state.doctors = data.doctors;
        } else {
          state.doctors = [];
        }
      })
      .addCase(searchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch doctors";
      })

      // Fetch All Doctors
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch doctors";
      })

      // Fetch Pending Doctors
      .addCase(fetchPendingDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingDoctors = action.payload;
      })
      .addCase(fetchPendingDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch pending doctors";
      })

      // Approve Doctor
      .addCase(approveDoctor.pending, (state) => {
        state.approving = true;
        state.error = null;
      })
      .addCase(approveDoctor.fulfilled, (state, action) => {
        state.approving = false;
        // Remove approved doctor from pending list
        state.pendingDoctors = state.pendingDoctors.filter(
          (doctor) => doctor.doctorId !== action.payload,
        );
      })
      .addCase(approveDoctor.rejected, (state, action) => {
        state.approving = false;
        state.error = action.payload || "Failed to approve doctor";
      });
  },
});

export const { clearSearchState, clearError } = doctorSlice.actions;
export default doctorSlice.reducer;
