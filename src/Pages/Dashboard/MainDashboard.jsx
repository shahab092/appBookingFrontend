import React from 'react'
import DoctersDashboard from './DoctersDashboard'
import DoctorDashboard from './DoctorDashboard'
import PatientDashboard from '../../componenets/dashboard/PatientDashboard'
import XRayDashboard from '../../componenets/dashboard/XRayDashboard'
import Header from '../../componenets/dashboard/Header'
import Sidebar from '../../componenets/dashboard/Sidebar'
import AdminDashboard from '../../componenets/dashboard/AdminDashboard'

function MainDashboard() {
    return (
        <>
        <Header />
        {/* <Sidebar /> */}
        <AdminDashboard />
            {/* <XRayDashboard /> */}
            {/* 
            <DoctersDashboard />
             {/* <DoctorDashboard /> 
            <PatientDashboard /> */}
        </>
    )
}

export default MainDashboard