import React from "react";
import { Check, X, User, Calendar, Clock, MoreHorizontal } from "lucide-react";

// ✅ React JS + Tailwind (NO TypeScript)
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f7f9fb] p-6">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Stat title="Total Doctors" value="248" sub="+12 this month" icon={<User />} bg="bg-blue-50" iconBg="bg-blue-500" />
        <Stat title="Pending Approvals" value="5" sub="3 new today" icon={<User />} bg="bg-orange-50" iconBg="bg-orange-500" />
        <Stat title="Total Appointments" value="1,429" sub="+18% from last week" icon={<Calendar />} bg="bg-green-50" iconBg="bg-green-500" />
        <Stat title="Avg. Wait Time" value="12m" sub="-3m from last week" icon={<Clock />} bg="bg-gray-50" iconBg="bg-gray-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TABLE */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-lg font-semibold">Pending Doctor Registrations</h2>
              <p className="text-sm text-gray-500">Review and approve new doctor applications</p>
            </div>
            <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Export</button>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr className="border-b">
                <th className="text-left px-6 py-3">Doctor</th>
                <th>Specialty</th>
                <th>License</th>
                <th>Submitted</th>
                <th>Status</th>
                <th className="text-right px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white ${r.avatar}`}>{r.initials}</div>
                      <div>
                        <p className="font-medium">{r.name}</p>
                        <p className="text-xs text-gray-500">{r.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs ${r.badge}`}>{r.specialty}</span>
                  </td>
                  <td className="text-gray-500">{r.license}</td>
                  <td className="text-gray-500">{r.date}</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-600">Pending Review</span>
                  </td>
                  <td className="px-6">
                    <div className="flex justify-end gap-2">
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs">
                        <Check size={14} /> Approve
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 border text-red-500 rounded-full text-xs">
                        <X size={14} /> Reject
                      </button>
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ACTIVITY */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
            <span className="text-sm text-blue-600 cursor-pointer">View All →</span>
          </div>

          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${a.color}`}>{a.icon}</div>
                <div>
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-gray-500">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, sub, icon, bg, iconBg }) {
  return (
    <div className={`rounded-2xl border bg-white p-6 flex justify-between items-center ${bg}`}> 
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">{sub}</span>
      </div>
      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${iconBg}`}>{icon}</div>
    </div>
  );
}

const rows = [
  { name: "Dr. Sarah Johnson", email: "sarah.johnson@email.com", initials: "DS", specialty: "Cardiology", license: "MD-2024-001", date: "Jan 15, 2024", avatar: "bg-purple-500", badge: "bg-red-100 text-red-600" },
  { name: "Dr. Michael Chen", email: "m.chen@email.com", initials: "DM", specialty: "Neurology", license: "MD-2024-002", date: "Jan 14, 2024", avatar: "bg-blue-500", badge: "bg-purple-100 text-purple-600" },
  { name: "Dr. Emily Williams", email: "e.williams@email.com", initials: "DE", specialty: "Pediatrics", license: "MD-2024-003", date: "Jan 13, 2024", avatar: "bg-green-500", badge: "bg-pink-100 text-pink-600" },
  { name: "Dr. James Rodriguez", email: "j.rodriguez@email.com", initials: "DJ", specialty: "Orthopedics", license: "MD-2024-004", date: "Jan 12, 2024", avatar: "bg-orange-500", badge: "bg-blue-100 text-blue-600" },
  { name: "Dr. Lisa Park", email: "l.park@email.com", initials: "DL", specialty: "Dermatology", license: "MD-2024-005", date: "Jan 11, 2024", avatar: "bg-pink-500", badge: "bg-yellow-100 text-yellow-600" },
];

const activity = [
  { text: "Dr. Robert Kim’s registration was approved", time: "2 hours ago", color: "bg-green-500", icon: <Check size={14} /> },
  { text: "New appointment scheduled with Dr. Sarah Johnson", time: "3 hours ago", color: "bg-blue-500", icon: <Calendar size={14} /> },
  { text: "Dr. Lisa Park submitted registration", time: "5 hours ago", color: "bg-orange-500", icon: <User size={14} /> },
  { text: "Dr. Unknown’s registration was rejected", time: "1 day ago", color: "bg-red-500", icon: <X size={14} /> },
  { text: "Dr. Emily Williams was approved", time: "1 day ago", color: "bg-green-500", icon: <Check size={14} /> },
];
