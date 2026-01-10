import React, { useState, useEffect } from "react";
import {
  FiUserPlus,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiMail,
  FiPhone,
  FiCalendar,
  FiStar,
  FiMapPin,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";
import { Modal } from "antd";
import { useToast } from "../../context/ToastContext";
import api from "../../libs/api";
import { specializationOptions } from "../../constant/data";

const Users = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const { showToast } = useToast();

  const statusOptions = [
    { label: "Approved", value: "approved" },
    { label: "Pending", value: "pending" },
  ];

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await api.get("/doctor");
      setDoctors(res.data?.data || []);
      setFilteredDoctors(res.data?.data || []);
    } catch {
      console.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchText, statusFilter, specializationFilter, doctors]);

  const filterDoctors = () => {
    let filtered = [...doctors];

    if (searchText) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
          doctor.email?.toLowerCase().includes(searchText.toLowerCase()) ||
          doctor.doctorProfile?.specialization
            ?.toLowerCase()
            .includes(searchText.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((doctor) => doctor.status === statusFilter);
    }

    if (specializationFilter !== "all") {
      filtered = filtered.filter(
        (doctor) =>
          doctor.doctorProfile?.specialization === specializationFilter
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleCreateDoctor = async (data) => {
    try {
      await api.post("/doctor", data);
      showToast("Doctor created successfully", "success");
      setModalVisible(false);
      fetchDoctors();
    } catch {
      showToast("Failed to create doctor", "error");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSpecializationColor = (specialization) => {
    const colors = {
      cardiology: "bg-red-100 text-red-800",
      dermatology: "bg-purple-100 text-purple-800",
      neurology: "bg-indigo-100 text-indigo-800",
      pediatrics: "bg-pink-100 text-pink-800",
      radiology: "bg-cyan-100 text-cyan-800",
      orthopedics: "bg-orange-100 text-orange-800",
      "general-practice": "bg-teal-100 text-teal-800",
      surgery: "bg-amber-100 text-amber-800",
    };
    return colors[specialization] || "bg-gray-100 text-gray-800";
  };

  const stats = {
    total: doctors.length,
    approved: doctors.filter((d) => d.status === "approved").length,
    pending: doctors.filter((d) => d.status === "pending").length,
  };

  // Simple form component without react-hook-form
  const DoctorForm = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialization: "",
      status: "pending",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCreateDoctor(formData);
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="doctor@hospital.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 text-sm font-medium text-gray-700">
            Specialization
          </label>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select specialization</option>
            {specializationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            type="button"
            onClick={() => setModalVisible(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Doctor
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Doctors Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all doctors and their information in the system
            </p>
          </div>

          <button onClick={() => setModalVisible(true)} className="btn-primary">
            <FiUserPlus className="w-5 h-5" />
            Add New Doctor
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Doctors
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.approved}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiClock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="w-full lg:w-auto lg:flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search doctors by name, email, or specialization..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <select
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[180px]"
              >
                <option value="all">All Specializations</option>
                {specializationOptions.map((spec) => (
                  <option key={spec.value} value={spec.value}>
                    {spec.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setSearchText("");
                  setStatusFilter("all");
                  setSpecializationFilter("all");
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FiRefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Doctor Directory
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No doctors found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => setModalVisible(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 mx-auto transition-colors"
              >
                <FiUserPlus className="w-4 h-4" />
                Add Your First Doctor
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                      Doctor
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                      Contact
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                      Specialization
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDoctors.map((doctor) => (
                    <tr
                      key={doctor._id || doctor.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {doctor.firstName?.charAt(0) ||
                              doctor.fullName?.charAt(0) ||
                              "D"}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {doctor.fullName ||
                                `${doctor.firstName || ""} ${
                                  doctor.lastName || ""
                                }`.trim()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {doctor.doctorProfile?.licenseNumber ||
                                "License not set"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiMail className="w-4 h-4 text-gray-400" />
                            <span>{doctor.email}</span>
                          </div>
                          {doctor.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FiPhone className="w-4 h-4 text-gray-400" />
                              <span>{doctor.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${getSpecializationColor(
                            doctor.doctorProfile?.specialization
                          )}`}
                        >
                          {doctor.doctorProfile?.specialization ||
                            "Not specified"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${getStatusColor(
                            doctor.status
                          )}`}
                        >
                          {doctor.status || "pending"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiStar className="w-4 h-4 text-yellow-500" />
                            <span>
                              Rating: {doctor.doctorProfile?.avgRating || 0}/5
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiCalendar className="w-4 h-4 text-gray-400" />
                            <span>
                              Joined:{" "}
                              {new Date(
                                doctor.createdAt || Date.now()
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          {doctor.doctorProfile?.isVerified && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <FiCheckCircle className="w-4 h-4" />
                              <span>Verified</span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Doctor Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <FiUserPlus className="text-green-600" />
            <span className="text-lg font-semibold">Add New Doctor</span>
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={500}
        centered
      >
        <div className="mt-6">
          <DoctorForm />
        </div>
      </Modal>
    </div>
  );
};

export default Users;
