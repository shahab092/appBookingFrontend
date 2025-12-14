import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../Pages/landingpage/Landing";
// import Dashboard from "../Pages/Dashboard/MainDashboard";
// import MultiRoleDashboard from "../Pages/Dashboard/MultiRoleDashboard";
import Xlogin from "../Pages/Xlogin";
// import ConsultationModal from "../componenets/dashboard/ConsultationModal";
// import Calling from "../componenets/dashboard/Calling";
// import DoctorDashboard from "../Pages/Dashboard/DoctorDashboard";
// import DoctorRegistration from "../Pages/landingpage/DoctorRegistration";
import MainDashboard from "../Pages/Dashboard/MainDashboard";
import ProtectedRoute from "../hoc/ProtectedRoute";
// import { user } from "../constant/data";
import DashboardLayout from "../componenets/dashboard/DashboardLayout";
import PatientDashboard from "../componenets/dashboard/PatientDashboard";
import DoctorDashboard from "../Pages/Dashboard/DoctersDashboard";
import PublicRoute from "../hoc/PublicRoute";
import { useSelector } from "react-redux";

export default function Index() {
  const user = useSelector((state) => state.auth.user);
//   const token = useSelector((state) => state.auth.token);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Xlogin />
            </PublicRoute>
          }
        />
{/* 
        <Route
          path="/doctor-register"
          element={
            <PublicRoute>
              <DoctorRegistration />
            </PublicRoute>
          }
        /> */}

        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <DashboardLayout user={user} />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<PatientDashboard />} />
          {/* <Route path="messages" element={<PatientMessages />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
          <Route path="settings" element={<PatientSettings />} /> */}
        </Route>

        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout user={user} />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route> */}

        {/* <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DashboardLayout user={user} />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DoctorDashboard />} />
          {/* <Route path="patients" element={<DoctorPatients />} /> */}
        {/* <Route path="prescriptions" element={<DoctorPrescriptions />} /> */}
        {/* <Route path="messages" element={<DoctorMessages />} /> */}
        {/* </Route> */}

        {/* <Route path="/" element={<MainDashboard />} /> */}
        {/* <Route path="/dashboard" element={<MultiRoleDashboard />} /> 
                <Route path="/old-dashboard" element={<Dashboard />} /> 
                <Route path="/docterDashboard" element={<DoctorDashboard />} /> 
                <Route path="/login" element={<Xlogin />} />
                <Route path="/consultation" element={<ConsultationModal />} />
                <Route path="/calling" element={<Calling />} />
                <Route path="/docterRegistration" element={<DoctorRegistration />} /> */}
      </Routes>
    </Router>
  );
}
