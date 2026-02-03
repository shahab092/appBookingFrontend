import React, { useState, useEffect } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "../common/CustomTextField";
import CustomModal from "../common/CustomModal";
import CommonTable from "../common/CommonTable";
import { useToast } from "../../context/ToastContext";
import { fetchPendingDoctors, approveDoctor } from "../../features/DoctorSlice";

const ApproveDoctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { showToast } = useToast();
  const dispatch = useDispatch();

  // Redux state
  const { pendingDoctors, loading, approving, error } = useSelector(
    (state) => state.doctor,
  );

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Search Form
  const methods = useForm({
    defaultValues: { search: "" },
    mode: "onChange",
  });

  // Fetch pending doctors on mount
  useEffect(() => {
    dispatch(fetchPendingDoctors());
  }, [dispatch]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error, showToast]);

  const filteredDoctors = pendingDoctors.filter((doctor) => {
    const query = searchQuery.toLowerCase();
    return (
      doctor.name?.toLowerCase().includes(query) ||
      doctor.email?.toLowerCase().includes(query) ||
      doctor.pmdcRegistrationNumber?.toLowerCase().includes(query)
    );
  });

  const handleOpenView = (doctor) => {
    setSelectedDoctor(doctor);
    setViewModalOpen(true);
  };

  const handleOpenApprove = (doctor) => {
    setSelectedDoctor(doctor);
    setApproveModalOpen(true);
  };

  const handleApproveStep1 = () => {
    setApproveModalOpen(false);
    setConfirmModalOpen(true);
  };

  const handleFinalConfirm = async () => {
    try {
      // Dispatch Redux action to approve doctor
      await dispatch(approveDoctor(selectedDoctor.doctorId)).unwrap();

      showToast("Doctor approved successfully", "success");
      setConfirmModalOpen(false);
      setSelectedDoctor(null);
    } catch (error) {
      console.error("Error approving doctor:", error);
      showToast("Failed to approve doctor", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-[#2F74AA]">Approve Doctors</h2>

        {/* Search Bar */}
        <div className="w-full sm:w-96">
          <FormProvider {...methods}>
            <CustomTextField
              name="search"
              placeholder="Search by ID, Name, or Phone..."
              showSearchIcon={true}
              className="w-full"
              onInput={(e) => setSearchQuery(e.target.value)}
            />
          </FormProvider>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CommonTable
          columns={[
            {
              title: "Doctor Profile",
              dataIndex: "name",
              key: "name",
              render: (text, record) => (
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-sm">
                    {record.image ? (
                      <img
                        src={record.image}
                        alt={text}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src={`https://avatar.iran.liara.run/public/doctor?username=${record.gender === "Female" ? "female" : "male"}`}
                        alt={text}
                        className="h-full w-full rounded-full object-cover p-1 bg-white/20"
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{text}</div>
                    <div className="text-xs text-gray-500">
                      PMDC:{" "}
                      <span className="font-mono text-gray-700">
                        {record.pmdcRegistrationNumber}
                      </span>
                    </div>
                    {record.completenessScore && (
                      <div className="text-[10px] text-green-600 font-medium">
                        Score: {record.completenessScore}%
                      </div>
                    )}
                  </div>
                </div>
              ),
            },
            {
              title: "Professional Info",
              key: "info",
              render: (_, record) => (
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-gray-800">
                    {record.specialityName}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                      Exp: {record.experience} Yrs
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {record.gender}
                    </span>
                  </div>
                </div>
              ),
            },
            {
              title: "Contact Details",
              key: "contact",
              render: (_, record) => (
                <div className="space-y-0.5">
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="font-medium">Email:</span> {record.email}
                  </div>
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="font-medium">Phone:</span>{" "}
                    {record.whatsappnumber}
                  </div>
                </div>
              ),
            },
            {
              title: "Consultation Fees",
              key: "fees",
              render: (_, record) => (
                <div className="text-xs">
                  <div className="flex justify-between w-32 mb-1">
                    <span className="text-gray-500">Online:</span>
                    <span className="font-medium text-gray-900">
                      Rs. {record.fees?.online || 0}
                    </span>
                  </div>
                  <div className="flex justify-between w-32">
                    <span className="text-gray-500">Clinic:</span>
                    <span className="font-medium text-gray-900">
                      Rs. {record.fees?.inclinic || 0}
                    </span>
                  </div>
                </div>
              ),
            },
            {
              title: "Status",
              key: "status",
              render: (_, record) => (
                <span
                  className={`px-2.5 py-1 text-[11px] uppercase tracking-wide font-bold rounded-full border ${
                    record.status === "approved"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : record.status === "pending"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                        : "bg-red-100 text-red-700 border-red-200"
                  }`}
                >
                  {record.status}
                </span>
              ),
            },
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenView(record)}
                    className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
                    title="View Details"
                  >
                    <FiEye size={18} />
                  </button>
                  {record.status === "pending" && (
                    <button
                      onClick={() => handleOpenApprove(record)}
                      className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-full transition-colors"
                      title="Approve"
                    >
                      <FiCheck size={18} />
                    </button>
                  )}
                </div>
              ),
            },
          ]}
          dataSource={filteredDoctors}
          rowKey="doctorId"
          pagination={{ pageSize: 10 }}
        />
      </div>

      {/* VIEW DETAILS MODAL */}
      <CustomModal
        visible={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        title="Doctor Profile Details"
        showSubmit={false}
        width={700}
      >
        {selectedDoctor && <DoctorDetailContent doctor={selectedDoctor} />}
      </CustomModal>

      {/* APPROVE MODAL (Step 1: Review) */}
      <CustomModal
        visible={approveModalOpen}
        onCancel={() => setApproveModalOpen(false)}
        onSubmit={handleApproveStep1}
        title="Approve Doctor Listing"
        submitText="Proceed to Approve"
        width={700}
      >
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded text-sm mb-4">
            Please review the doctor's details carefully before proceeding to
            approval.
          </div>
          {selectedDoctor && <DoctorDetailContent doctor={selectedDoctor} />}
        </div>
      </CustomModal>

      {/* CONFIRMATION MODAL (Step 2: Final Confirm) */}
      <CustomModal
        visible={confirmModalOpen}
        onCancel={() => setConfirmModalOpen(false)}
        onSubmit={handleFinalConfirm}
        title="Confirm Approval"
        submitText="Confirm Approval"
        width={500}
      >
        <div className="p-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
            <FiCheck className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Are you sure?
          </h3>
          <p className="text-sm text-gray-500">
            This action will approve <strong>{selectedDoctor?.name}</strong> and
            make their profile visible to patients.
          </p>
        </div>
      </CustomModal>
    </div>
  );
};

// Reusable component for displaying doctor details inside modals
const DoctorDetailContent = ({ doctor }) => {
  return (
    <div className="space-y-6">
      {/* 1. Profile Header with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
        <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end -mt-12 gap-4">
          <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-lg transform rotate-3 transition-transform hover:rotate-0">
            <div
              className="h-full w-full rounded-xl bg-gray-100 flex items-center justify-center text-3xl font-bold text-blue-600 bg-cover bg-center"
              style={{
                backgroundImage: doctor.image ? `url(${doctor.image})` : "none",
              }}
            >
              {!doctor.image && doctor.name?.charAt(0)}
            </div>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h3 className="text-2xl font-bold text-gray-900">{doctor.name}</h3>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
              <span className="text-blue-600 font-medium">
                {doctor.specialityName}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">
                {doctor.experience} Years Exp.
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              {doctor.completenessScore !== undefined && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-semibold border border-green-100">
                  <span>Profile Score: {doctor.completenessScore}%</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-semibold border border-purple-100">
                <span>PMDC: {doctor.pmdcRegistrationNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider flex items-center gap-2">
            <FiCheck className="text-blue-500" /> Contact Info
          </h4>
          <div className="space-y-3">
            <DetailItem label="Email Address" value={doctor.email} />
            <DetailItem
              label="WhatsApp / Phone"
              value={doctor.whatsappnumber}
            />
            <DetailItem
              label="Emergency Contact"
              value={doctor.emergencyContact || "N/A"}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider flex items-center gap-2">
            <FiCheck className="text-purple-500" /> Professional
          </h4>
          <div className="space-y-3">
            <DetailItem
              label="Languages"
              value={doctor.languages?.join(", ")}
            />
            <DetailItem
              label="Super Speciality"
              value={doctor.superSpeciality || "N/A"}
            />
            <DetailItem
              label="Status"
              value={<span className="capitalize">{doctor.status}</span>}
            />
          </div>
        </div>
      </div>

      {/* 3. Fees & Services */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-blue-50/50 p-5 rounded-xl border border-blue-100">
          <h4 className="text-sm font-bold text-blue-800 mb-3">
            Consultation Fees
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-50">
              <div className="text-xs text-blue-500 mb-1">Online Checkup</div>
              <div className="text-lg font-bold text-gray-900">
                Rs. {doctor.fees?.online || 0}
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-50">
              <div className="text-xs text-blue-500 mb-1">In-Clinic Visit</div>
              <div className="text-lg font-bold text-gray-900">
                Rs. {doctor.fees?.inclinic || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Education & Services Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            Education
            <span className="h-px bg-gray-200 flex-1"></span>
          </h4>
          <div className="space-y-3">
            {doctor.education?.map((edu, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-400 shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {edu.degree}
                  </div>
                  <div className="text-sm text-gray-500">{edu.institute}</div>
                  <div className="text-xs text-gray-400">
                    {edu.startYear} - {edu.endYear || "Present"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            Services
            <span className="h-px bg-gray-200 flex-1"></span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {doctor.services?.map((service, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium border border-gray-200"
              >
                {service}
              </span>
            ))}
            {!doctor.services?.length && (
              <span className="text-gray-400 text-sm">No services listed</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-900 text-right">
      {value || "N/A"}
    </span>
  </div>
);

export default ApproveDoctors;
