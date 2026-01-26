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

const initialState = {
  doctors: [],
  loading: false,
  error: null,
  success: false,
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
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearSearchState } = doctorSlice.actions;
export default doctorSlice.reducer;
