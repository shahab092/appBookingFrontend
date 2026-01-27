import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import doctorReducer from "../features/DoctorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
  },

  devTools: import.meta.env.DEV === true,
});
