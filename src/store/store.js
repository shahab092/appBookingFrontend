import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import doctorReducer from "../features/DoctorSlice";
import appointmentReducer from "../features/AppointmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer,
  },

  devTools: import.meta.env.DEV === true,
});
