import React, { useEffect, useState } from "react";
import { Check, X, User, Calendar, Clock, MoreHorizontal } from "lucide-react";
import { Modal, message } from "antd";
import api from "../../libs/api";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [viewDoctor, setViewDoctor] = useState(null);

  const getDoctors = async () => {
    try {
      const res = await api.get("/doctor?status=pending");
      setDoctors(res.data.data);
    } catch {
      message.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const openModal = (doctor, action) => {
    setSelectedDoctor(doctor);
    setActionType(action);
    setModalVisible(true);
  };

  const openDoctorDetails = (doctor) => {
    setViewDoctor(doctor);
    setDetailModalOpen(true);
  };

  const updateDoctorStatus = async () => {
    try {
      setActionLoading(true);
      await api.patch(`/doctor/${selectedDoctor._id}/status`, {
        status: actionType,
      });
      setDoctors((prev) => prev.filter((d) => d._id !== selectedDoctor._id));
      message.success(`Doctor ${actionType} successfully`);
      setModalVisible(false);
    } catch {
      message.error("Failed to update doctor status");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-4 md:p-6">
      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Stat
          title="Total Doctors"
          value="248"
          sub="+12 this month"
          icon={<User />}
          bg="bg-blue-50"
          iconBg="bg-blue-500"
        />
        <Stat
          title="Pending Approvals"
          value={doctors.length}
          sub="new today"
          icon={<User />}
          bg="bg-orange-50"
          iconBg="bg-orange-500"
        />
        <Stat
          title="Total Appointments"
          value="1,429"
          sub="+18% from last week"
          icon={<Calendar />}
          bg="bg-green-50"
          iconBg="bg-green-500"
        />
        <Stat
          title="Avg. Wait Time"
          value="12m"
          sub="-3m from last week"
          icon={<Clock />}
          bg="bg-gray-50"
          iconBg="bg-gray-400"
        />
      </div>

      {/* ================= TABLE + ACTIVITY ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TABLE */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between p-4 md:p-6 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold">
                Pending Doctor Registrations
              </h2>
              <p className="text-sm text-gray-500">
                Review and approve new doctor applications
              </p>
            </div>
            <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
              Export
            </button>
          </div>

          {loading ? (
            <p className="p-6 text-center text-gray-500">Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p className="p-6 text-center text-gray-500">No pending doctors</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3">Doctor</th>
                    <th>Specialty</th>
                    <th>License</th>
                    <th>Status</th>
                    <th className="text-right px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((d) => (
                    <tr
                      key={d._id}
                      className="border-b border-gray-200 last:border-none"
                    >
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
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

                      <td>
                        <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-600">
                          Pending
                        </span>
                      </td>

                      <td className="px-4">
                        <div className="flex justify-end gap-2 items-center">
                          <button
                            onClick={() => openDoctorDetails(d)}
                            className="px-3 py-1.5 text-xs border border-gray-200 rounded-full hover:bg-gray-50"
                          >
                            View
                          </button>

                          <button
                            onClick={() => openModal(d, "inprogress")}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs hover:bg-green-600"
                          >
                            <Check size={14} /> Approve
                          </button>

                          <button
                            onClick={() => openModal(d, "rejected")}
                            className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-red-500 rounded-full text-xs hover:bg-red-50"
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
            </div>
          )}
        </div>

        {/* ACTIVITY */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          {doctors.length > 0 ? (
            doctors.slice(0, 5).map((d) => (
              <div key={d._id} className="flex gap-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-sm">{d.fullName} registration pending</p>
                  <p className="text-xs text-gray-500">
                    {new Date(d.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center">
              No recent activity
            </p>
          )}
        </div>
      </div>

      {/* APPROVE / REJECT MODAL */}
      <Modal
        open={modalVisible}
        title="Confirm Action"
        onOk={updateDoctorStatus}
        confirmLoading={actionLoading}
        onCancel={() => setModalVisible(false)}
      >
        Are you sure you want to <b>{actionType}</b> {selectedDoctor?.fullName}?
      </Modal>

      {/* DOCTOR DETAIL MODAL */}
      <Modal
        open={detailModalOpen}
        footer={null}
        width={900}
        title="Doctor Profile Review"
        onCancel={() => setDetailModalOpen(false)}
      >
        {viewDoctor && (
          <div className="space-y-6">
            <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="h-16 w-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl">
                {viewDoctor.firstName?.[0]}
                {viewDoctor.lastName?.[0]}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{viewDoctor.fullName}</h3>
                <p className="text-sm text-gray-500">{viewDoctor.email}</p>
                <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-600">
                  {viewDoctor.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 rounded-2xl overflow-hidden">
              <InfoRow
                label="Specialization"
                value={viewDoctor.doctorProfile?.specialization}
              />
              <InfoRow
                label="Department"
                value={viewDoctor.doctorProfile?.department}
              />
              <InfoRow
                label="License Number"
                value={viewDoctor.doctorProfile?.licenseNumber}
              />
              <InfoRow
                label="Verified"
                value={viewDoctor.doctorProfile?.isVerified ? "Yes" : "No"}
              />
              <InfoRow
                label="Average Rating"
                value={viewDoctor.doctorProfile?.avgRating}
              />
              <InfoRow
                label="Total Ratings"
                value={viewDoctor.doctorProfile?.totalRatings}
              />
              <InfoRow
                label="Languages Spoken"
                value={viewDoctor.doctorProfile?.languagesSpoken?.join(", ")}
              />
              <InfoRow
                label="Qualifications"
                value={viewDoctor.doctorProfile?.qualifications?.length}
              />
              <InfoRow
                label="Awards"
                value={viewDoctor.doctorProfile?.awards?.length}
              />
              <InfoRow
                label="Hospital Affiliations"
                value={viewDoctor.doctorProfile?.hospitalAffiliations?.length}
              />
              <InfoRow
                label="Documents Uploaded"
                value={viewDoctor.doctorProfile?.documents?.length}
              />
              <InfoRow
                label="Available Slots"
                value={viewDoctor.doctorProfile?.availableSlots?.length}
              />
              <InfoRow
                label="Registered On"
                value={new Date(viewDoctor.createdAt).toLocaleString()}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* STAT CARD */
function Stat({ title, value, sub, icon, bg, iconBg }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-4 flex justify-between items-center ${bg}`}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <span className="inline-block mt-2 px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
          {sub}
        </span>
      </div>
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${iconBg}`}
      >
        {icon}
      </div>
    </div>
  );
}

/* INFO ROW */
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between px-4 py-3 border-b border-gray-200 last:border-none">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium">{value || "—"}</span>
    </div>
  );
}
