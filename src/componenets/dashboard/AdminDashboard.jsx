import React, { useEffect, useState } from "react";
import { Check, X, User, Calendar, Clock, MoreHorizontal } from "lucide-react";
import api from "../../libs/api";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal + action state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [actionType, setActionType] = useState(null); // approved | rejected
  const [actionLoading, setActionLoading] = useState(false);

  // fetch pending doctors
  const getDoctors = async () => {
    try {
      const res = await api.get("/doctor?status=pending");
      setDoctors(res.data.data);
    } catch (error) {
      console.error("Error fetching doctors", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // open modal
  const openModal = (doctor, action) => {
    setSelectedDoctor(doctor);
    setActionType(action);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDoctor(null);
    setActionType(null);
  };

  // update doctor status
  const updateDoctorStatus = async () => {
    if (!selectedDoctor || !actionType) return;

    try {
      setActionLoading(true);

      await api.patch(
        `/doctor/${selectedDoctor._id}/status`,
        { status: actionType }
      );

      // remove from pending list
      setDoctors((prev) =>
        prev.filter((d) => d._id !== selectedDoctor._id)
      );

      closeModal();
    } catch (error) {
      console.error("Status update failed", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-4 md:p-6">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Stat title="Total Doctors" value="248" sub="+12 this month" icon={<User />} bg="bg-blue-50" iconBg="bg-blue-500" />
        <Stat title="Pending Approvals" value={doctors.length} sub="new today" icon={<User />} bg="bg-orange-50" iconBg="bg-orange-500" />
        <Stat title="Total Appointments" value="1,429" sub="+18% from last week" icon={<Calendar />} bg="bg-green-50" iconBg="bg-green-500" />
        <Stat title="Avg. Wait Time" value="12m" sub="-3m from last week" icon={<Clock />} bg="bg-gray-50" iconBg="bg-gray-400" />
      </div>

      {/* TABLE + ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TABLE */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between p-4 md:p-6 border-b">
            <div>
              <h2 className="text-lg font-semibold">Pending Doctor Registrations</h2>
              <p className="text-sm text-gray-500">
                Review and approve new doctor applications
              </p>
            </div>
            <button className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">
              Export
            </button>
          </div>

          {loading ? (
            <p className="p-6 text-center text-gray-500">Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p className="p-6 text-center text-gray-500">No pending doctors</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="text-gray-500">
                <tr className="border-b">
                  <th className="text-left px-4 py-3">Doctor</th>
                  <th>Specialty</th>
                  <th>License</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th className="text-right px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((d) => (
                  <tr key={d._id} className="border-b last:border-none">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-purple-500 text-white flex items-center justify-center">
                          {d.firstName?.[0]}
                          {d.lastName?.[0]}
                        </div>
                        <div>
                          <p className="font-medium">{d.fullName}</p>
                          <p className="text-xs text-gray-500">{d.email}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                        {d.doctorProfile?.specialization}
                      </span>
                    </td>

                    <td className="text-gray-500">
                      {d.doctorProfile?.licenseNumber}
                    </td>

                    <td className="text-gray-500">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-600">
                        Pending
                      </span>
                    </td>

                    <td className="px-4">
                      <div className="flex justify-end gap-2 items-center">
                        <button
                          onClick={() => openModal(d, "approved")}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs"
                        >
                          <Check size={14} /> Approve
                        </button>

                        <button
                          onClick={() => openModal(d, "rejected")}
                          className="flex items-center gap-1 px-3 py-1.5 border text-red-500 rounded-full text-xs"
                        >
                          <X size={14} /> Reject
                        </button>

                        <MoreHorizontal size={16} className="text-gray-400" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ACTIVITY */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 md:p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {doctors.slice(0, 5).map((d) => (
              <div key={d._id} className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-sm">
                    {d.fullName} registration is pending
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(d.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="font-semibold text-lg mb-3">
              {actionType === "approved" ? "Approve Doctor" : "Reject Doctor"}
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to{" "}
              <b>{actionType}</b> {selectedDoctor?.fullName}?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={updateDoctorStatus}
                disabled={actionLoading}
                className={`px-4 py-2 rounded-lg text-white ${
                  actionType === "approved"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {actionLoading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ title, value, sub, icon, bg, iconBg }) {
  return (
    <div className={`rounded-2xl border bg-white p-4 md:p-6 flex justify-between items-center ${bg}`}>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
          {sub}
        </span>
      </div>
      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${iconBg}`}>
        {icon}
      </div>
    </div>
  );
}
