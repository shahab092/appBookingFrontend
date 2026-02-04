import React, { useState, useMemo, useEffect } from "react";
import {
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiAward,
  FiStar,
  FiMoreVertical,
  FiUsers,
  FiUserCheck,
} from "react-icons/fi";
import StatCard from "../common/StatCard";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "../common/CustomTextField";
import CustomSelect from "../common/CustomSelect";
import CommonTable from "../common/CommonTable";
import { fetchAllDoctors } from "../../features/DoctorSlice";

const DoctorsList = () => {
  const dispatch = useDispatch();

  // Redux state
  const { doctors, loading } = useSelector((state) => state.doctor);

  // Fetch all doctors on mount
  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  // Dynamic Options Calculation
  const specialities = useMemo(() => {
    const specSet = new Set(
      doctors.map((d) => d.specialityName || d.speciality).filter(Boolean),
    );
    return [...specSet].map((s) => ({
      label: s,
      value: s,
    }));
  }, [doctors]);

  const cities = useMemo(() => {
    const citySet = new Set(
      doctors.map((d) => d.address?.city || d.city).filter(Boolean),
    );
    return [...citySet].map((c) => ({
      label: c,
      value: c,
    }));
  }, [doctors]);

  const methods = useForm({
    defaultValues: {
      search: "",
      speciality: "",
      city: "",
      experience: "",
      gender: "",
      feeRange: "",
      rating: "",
    },
  });

  const watchedValues = methods.watch();

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const query = (watchedValues.search || "").toLowerCase();

      // 1. Search
      const matchesSearch =
        doctor.name.toLowerCase().includes(query) ||
        doctor.email.toLowerCase().includes(query) ||
        doctor.pmdcRegistrationNumber.toLowerCase().includes(query);

      // 2. Exact Filters
      const matchesSpeciality =
        !watchedValues.speciality ||
        (doctor.specialityName || doctor.speciality) ===
          watchedValues.speciality;
      const matchesCity =
        !watchedValues.city ||
        (doctor.address?.city || doctor.city) === watchedValues.city;
      const matchesGender =
        !watchedValues.gender || doctor.gender === watchedValues.gender;

      // 3. Range Filters (Experience)
      let matchesExperience = true;
      if (watchedValues.experience) {
        const exp = doctor.experience;
        if (watchedValues.experience === "junior") matchesExperience = exp < 5;
        if (watchedValues.experience === "mid")
          matchesExperience = exp >= 5 && exp <= 10;
        if (watchedValues.experience === "senior") matchesExperience = exp > 10;
      }

      // 4. Range Filters (Fee)
      let matchesFee = true;
      if (watchedValues.feeRange) {
        const fee = doctor.fees?.online || 0;
        if (watchedValues.feeRange === "low") matchesFee = fee < 1500;
        if (watchedValues.feeRange === "medium")
          matchesFee = fee >= 1500 && fee <= 3000;
        if (watchedValues.feeRange === "high") matchesFee = fee > 3000;
      }

      // 5. Rating
      let matchesRating = true;
      if (watchedValues.rating) {
        if (watchedValues.rating === "4plus")
          matchesRating = doctor.averageRating >= 4;
        if (watchedValues.rating === "3plus")
          matchesRating = doctor.averageRating >= 3;
      }

      return (
        matchesSearch &&
        matchesSpeciality &&
        matchesCity &&
        matchesGender &&
        matchesExperience &&
        matchesFee &&
        matchesRating
      );
    });
  }, [watchedValues, doctors]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2F74AA]">
            Doctors Directory
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all registered medical practitioners
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors pointer-events-none">
            <FiAward className="text-primary" />
            <span className="font-semibold">{doctors.length}</span> Total
            Doctors
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Doctors"
          value={doctors.length}
          sub="Verified Members"
          icon={<FiUsers />}
          bg="bg-blue-50"
          iconBg="bg-blue-600"
          trend="neutral"
        />
        <StatCard
          title="Active Doctors"
          value={doctors.filter((d) => d.status === "approved").length}
          sub="Fully Approved"
          icon={<FiUserCheck />}
          bg="bg-green-50"
          iconBg="bg-green-600"
          trend="up"
        />
        <StatCard
          title="Avg. Experience"
          value={`${Math.round(doctors.reduce((acc, d) => acc + (d.experience || 0), 0) / (doctors.length || 1))} Yrs`}
          sub="Professional Depth"
          icon={<FiAward />}
          bg="bg-purple-50"
          iconBg="bg-purple-600"
          trend="neutral"
        />
        <StatCard
          title="Avg. Rating"
          value={(
            doctors.reduce((acc, d) => acc + (d.averageRating || 0), 0) /
            (doctors.length || 1)
          ).toFixed(1)}
          sub="Patient Trust"
          icon={<FiStar />}
          bg="bg-orange-50"
          iconBg="bg-orange-600"
          trend="up"
        />
      </div>

      {/* Filter Section - Glassy/Card Look */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/60 transition-all hover:shadow-md">
        <div className="flex items-center gap-2 mb-4 text-[#2F74AA] font-semibold border-b border-gray-100 pb-2">
          <FiFilter /> Filter Directory
        </div>

        <FormProvider {...methods}>
          <div className="space-y-4">
            {/* Row 1: Search Bar (Full Width) */}
            <div className="w-full">
              <CustomTextField
                name="search"
                placeholder="Search by Name, ID..."
                showSearchIcon={true}
                className="w-full"
              />
            </div>

            {/* Row 2: All Filters in one line (on large screens) */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 items-end">
              <CustomSelect
                name="speciality"
                label="Speciality"
                options={specialities}
                placeholder="All"
              />
              <CustomSelect
                name="city"
                label="City"
                options={cities}
                placeholder="All"
              />
              <CustomSelect
                name="gender"
                label="Gender"
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                placeholder="All"
              />
              <CustomSelect
                name="experience"
                label="Experience"
                options={[
                  { label: "0-5 Yrs", value: "junior" },
                  { label: "5-10 Yrs", value: "mid" },
                  { label: "10+ Yrs", value: "senior" },
                ]}
                placeholder="Any"
              />
              <CustomSelect
                name="feeRange"
                label="Fee"
                options={[
                  { label: "< 1500", value: "low" },
                  { label: "1500-3000", value: "medium" },
                  { label: "> 3000", value: "high" },
                ]}
                placeholder="Any"
              />
              <CustomSelect
                name="rating"
                label="Rating"
                options={[
                  { label: "4+ Stars", value: "4plus" },
                  { label: "3+ Stars", value: "3plus" },
                ]}
                placeholder="All"
              />

              {/* Clear Button */}
              <button
                onClick={() => methods.reset()}
                className="w-full h-[42px] border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                style={{ marginBottom: "1px" }}
              >
                Clear
              </button>
            </div>
          </div>
        </FormProvider>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <CommonTable
          columns={[
            {
              title: "Doctor Profile",
              dataIndex: "name",
              key: "name",
              render: (text, record) => (
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-linear-to-br from-[#2F74AA] to-blue-400 text-white flex items-center justify-center text-lg font-bold shadow-sm">
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
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className={`w-2 h-2 rounded-full ${record.gender === "Male" ? "bg-blue-400" : "bg-pink-400"}`}
                      ></span>
                      <span className="text-[10px] text-gray-400 uppercase">
                        {record.gender}
                      </span>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: "Speciality & Education",
              key: "speciality",
              render: (_, record) => (
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    {record.specialityName || record.speciality}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {record.experience} Years Exp.
                  </div>
                  <div className="flex gap-1 mt-1">
                    {record.locations?.map((loc, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
                      >
                        {loc.name}
                      </span>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              title: "Contact & Location",
              key: "contact",
              render: (_, record) => (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiPhone className="text-gray-400" size={14} />
                    <span>{record.whatsappnumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FiMapPin className="text-gray-400" size={14} />
                    <span>{record.address?.city || "N/A"}</span>
                  </div>
                </div>
              ),
            },
            {
              title: "Stats & Fees",
              key: "stats",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <FiStar
                      className="text-yellow-400 fill-current"
                      size={14}
                    />
                    <span className="font-bold text-gray-800">
                      {record.averageRating || "0.0"}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({record.numReviews || 0})
                    </span>
                  </div>
                  <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded w-fit">
                    Rs. {record.fees?.online}{" "}
                    <span className="text-gray-400 font-normal">Online</span>
                  </div>
                </div>
              ),
            },
            {
              title: "Status",
              key: "status",
              render: (_, record) => <StatusBadge status={record.status} />,
            },
            {
              title: "Actions",
              key: "actions",
              align: "right",
              render: (_, record) => (
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Edit"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-700 rounded-lg">
                    <FiMoreVertical size={16} />
                  </button>
                </div>
              ),
            },
          ]}
          dataSource={filteredDoctors}
          rowKey="doctorId"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    approved: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`px-2.5 py-1 text-[11px] uppercase tracking-wide font-bold rounded-full border ${styles[status] || styles.pending}`}
    >
      {status}
    </span>
  );
};

export default DoctorsList;
