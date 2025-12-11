import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../Pages/landingpage/Landing";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MultiRoleDashboard from "../Pages/Dashboard/MultiRoleDashboard";
import Xlogin from "../Pages/Xlogin";
import ConsultationModal from "../componenets/dashboard/ConsultationModal";
import Calling from "../componenets/dashboard/Calling";
import DoctorDashboard from "../Pages/Dashboard/DoctorDashboard";
import DoctorRegistration from "../Pages/landingpage/DoctorRegistration";

export default function Index() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<MultiRoleDashboard />} /> 
                <Route path="/old-dashboard" element={<Dashboard />} /> 
                <Route path="/docterDashboard" element={<DoctorDashboard />} /> 
                <Route path="/login" element={<Xlogin />} />
                <Route path="/consultation" element={<ConsultationModal />} />
                <Route path="/calling" element={<Calling />} />
                <Route path="/docterRegistration" element={<DoctorRegistration />} />
            </Routes>
        </Router>
    );
}