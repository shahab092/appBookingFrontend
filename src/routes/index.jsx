import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "../Pages/landingpage/Landing";
import DocterDetails from "../Pages/landingpage/DocterDetails";
import DashboardLayout from "../componenets/dashboard/DashboardLayout";
import AdminDashboard from "../componenets/dashboard/AdminDashboard";
import PatientDashboard from "../componenets/dashboard/PatientDashboard";
import DoctorDashboard from "../Pages/Dashboard/DoctersDashboard";
import PublicRoute from "../hoc/PublicRoute";
import ProtectedRoute from "../hoc/ProtectedRoute";
import CreateAppiontmentAdmin from "../componenets/dashboard/CreateAppiontmentAdmin";

import Calling from "../componenets/dashboard/Calling";
import DoctorSearch from "../Pages/DoctorSearch/DoctorSearch";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Landing />} />
          <Route path="/doctorDetail" element={<DocterDetails />} />
          <Route path="/doctorSearch" element={<DoctorSearch />} />
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* <Route path="users" element={<Users />} /> */}
            <Route path="appiontment" element={<CreateAppiontmentAdmin />} />
          </Route>
        </Route>

        {/* Patient routes */}
        <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
          <Route path="/patient" element={<DashboardLayout />}>
            <Route path="dashboard" element={<PatientDashboard />} />
          </Route>
        </Route>
        <Route
          element={<ProtectedRoute allowedRoles={["doctor", "patient"]} />}
        >
          <Route path="/calling" element={<Calling />} />
        </Route>

        {/* Doctor routes */}
        <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
          <Route path="/doctor" element={<DashboardLayout />}>
            <Route path="dashboard" element={<DoctorDashboard />} />
          </Route>
        </Route>

        {/* Unauthorized page */}
        <Route path="/unauthorized" element={<h1>Access Denied</h1>} />
      </Routes>
    </Router>
  );
}
