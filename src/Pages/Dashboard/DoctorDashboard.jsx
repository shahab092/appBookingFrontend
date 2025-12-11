// Dashboard.jsx
import React from "react";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const appointments = [
  { name: "MJ Kumar", type: "Health Checkup", status: "Ongoing" },
  { name: "Rishi Kiran", type: "Heavy Cold", time: "12:30 PM" },
];

const appointmentRequests = [
  { name: "Venkatesh", date: "19 Jan", time: "01:00 PM" },
  { name: "Rishi Kiran", date: "14 Jan", time: "02:00 PM" },
  { name: "Chinna Vel", date: "15 Jan", time: "12:00 PM" },
];

const patientAnalysisData = [
  { day: "12 Jan", patients: 50 },
  { day: "13 Jan", patients: 120 },
  { day: "14 Jan", patients: 200 },
  { day: "15 Jan", patients: 48 },
  { day: "16 Jan", patients: 60 },
];

const pieData = [
  { name: "Old Patient", value: 34, color: "#3b82f6" },
  { name: "Online Consultancy", value: 18, color: "#10b981" },
  { name: "New Patient", value: 14, color: "#ef4444" },
];

export default function DoctorDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      heading
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Overview</h1>
          <p className="text-gray-500">Welcome Dr.Henry</p>
        </div>
        <input
          type="text"
          placeholder="Search Appointment, Patient or etc"
          className="border rounded-lg px-4 py-2 w-80"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-400 text-white p-4 rounded-lg">
          <div>Appointments</div>
          <div className="text-2xl font-bold">48</div>
        </div>
        <div className="bg-green-400 text-white p-4 rounded-lg">
          <div>Online Consultancy</div>
          <div className="text-2xl font-bold">18</div>
        </div>
        <div className="bg-purple-400 text-white p-4 rounded-lg">
          <div>Pending</div>
          <div className="text-2xl font-bold">20</div>
        </div>
        <div className="bg-cyan-400 text-white p-4 rounded-lg">
          <div>Request</div>
          <div className="text-2xl font-bold">12</div>
        </div>
      </div>

      {/* Today's Appointments & Patient Details */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Todays Appointment</h2>
            <span className="text-blue-500 cursor-pointer">See all</span>
          </div>
          {appointments.map((appt, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b">
              <div>
                <div className="font-medium">{appt.name}</div>
                <div className="text-gray-500 text-sm">{appt.type}</div>
              </div>
              <div className="text-sm text-white bg-blue-400 px-2 py-1 rounded">
                {appt.status || appt.time}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Patient Details</h2>
          <div className="mb-1">Name: MJ Kumar</div>
          <div className="mb-1">Condition: Heavy Cold</div>
          <div className="mb-1">Sex: M</div>
          <div className="mb-1">Age: 32</div>
          <div className="flex gap-2 mt-2">
            <span className="bg-yellow-200 px-2 py-1 rounded text-sm">Running Nose</span>
            <span className="bg-green-200 px-2 py-1 rounded text-sm">Cough</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Appointment Timeline</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>11:30 AM | Clinic Consulting</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>02:30 PM | Online Consulting</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span>05:30 PM | Meeting - Dr.Sam</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Requests & Charts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Appointment Request</h2>
            <span className="text-blue-500 cursor-pointer">See all</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointmentRequests.map((req, idx) => (
                <tr key={idx} className="border-t">
                  <td>{req.name}</td>
                  <td>{req.date}</td>
                  <td>{req.time}</td>
                  <td className="flex gap-2">
                    <CheckCircle className="text-green-500 cursor-pointer" />
                    <XCircle className="text-red-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex justify-center items-center">
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Patient Analysis</h2>
          <LineChart width={300} height={200} data={patientAnalysisData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
