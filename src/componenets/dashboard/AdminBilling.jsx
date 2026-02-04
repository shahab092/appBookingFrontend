import React, { useState } from "react";
import {
  FiEye,
  FiDownload,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiActivity,
  FiCheck,
} from "react-icons/fi";
import CommonTable from "../common/CommonTable";
import CustomModal from "../common/CustomModal";
import StatCard from "../common/StatCard";
import { FiUsers, FiUserCheck } from "react-icons/fi";

const AdminBilling = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // 'view' or 'payout'

  // Expanded placeholder data to reflect the new requirements
  const billingData = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      image: "https://avatar.iran.liara.run/public/doctor?username=sarah",
      gender: "Female",
      appointments: 45,
      period: "October 2023",
      fee: 45000,
      commission: 4500,
      payable: 40500,
      status: "Paid",
      speciality: "Cardiologist",
      email: "sarah.j@example.com",
      phone: "+92 300 1234567",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      image: "https://avatar.iran.liara.run/public/doctor?username=michael",
      gender: "Male",
      appointments: 32,
      period: "October 2023",
      fee: 32000,
      commission: 3200,
      payable: 28800,
      status: "Pending",
      speciality: "Dermatologist",
      email: "m.chen@example.com",
      phone: "+92 311 9876543",
    },
    {
      id: 3,
      name: "Dr. Aisha Malik",
      image: "https://avatar.iran.liara.run/public/doctor?username=aisha",
      gender: "Female",
      appointments: 58,
      period: "October 2023",
      fee: 87000,
      commission: 8700,
      payable: 78300,
      status: "Paid",
      speciality: "Pediatrician",
      email: "aisha.m@example.com",
      phone: "+92 321 4567890",
    },
  ];

  const handleView = (record) => {
    setSelectedRecord(record);
    setModalMode("view");
    setIsModalVisible(true);
  };

  const handlePayoutInitiate = (record) => {
    setSelectedRecord(record);
    setModalMode("payout");
    setIsModalVisible(true);
  };

  const handleConfirmPayout = () => {
    setIsConfirmModalVisible(true);
  };

  const handleFinalSubmit = () => {
    // Logic for final confirmation (e.g., API call)
    console.log("Payout confirmed for:", selectedRecord.name);
    setIsConfirmModalVisible(false);
    setIsModalVisible(false);
    // In a real app, you'd trigger a success notification here
  };

  const columns = [
    {
      title: "Doctor",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-primary/20 p-0.5">
            <img
              src={record.image}
              alt={text}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-gray-900">{text}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              {record.speciality}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Appointments",
      dataIndex: "appointments",
      key: "appointments",
      align: "center",
      render: (count) => (
        <span className="font-semibold text-gray-700">{count}</span>
      ),
    },
    {
      title: "Period",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      render: (val) => (
        <span className="text-gray-600">Rs. {val.toLocaleString()}</span>
      ),
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      render: (val) => (
        <span className="text-red-500 font-medium">
          Rs. {val.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Payable",
      dataIndex: "payable",
      key: "payable",
      render: (val) => (
        <span className="text-green-600 font-bold">
          Rs. {val.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-3 py-1 text-[11px] font-bold rounded-full border ${
            status === "Paid"
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-yellow-100 text-yellow-700 border-yellow-200"
          }`}
        >
          {status.toUpperCase()}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleView(record)}
            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
            title="View Details"
          >
            <FiEye size={18} />
          </button>
          {record.status !== "Paid" && (
            <button
              onClick={() => handlePayoutInitiate(record)}
              className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-full transition-colors"
              title="Confirm Payout"
            >
              <FiCheck size={18} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {" "}
            Billing & Payouts{" "}
          </h2>
          <p className="text-sm text-typegray font-medium">
            Manage doctor commissions and Net payable amounts
          </p>
        </div>
        <button className="btn-outline min-w-fit! px-4! flex items-center gap-2">
          <FiDownload /> Export Report
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`Rs. ${billingData.reduce((acc, d) => acc + d.fee, 0).toLocaleString()}`}
          sub="+Rs. 12k this week"
          icon={<FiDollarSign />}
          bg="bg-blue-50"
          iconBg="bg-blue-600"
          trend="up"
        />
        <StatCard
          title="Total Commission"
          value={`Rs. ${billingData.reduce((acc, d) => acc + d.commission, 0).toLocaleString()}`}
          sub="Platform Earnings"
          icon={<FiActivity />}
          bg="bg-purple-50"
          iconBg="bg-purple-600"
          trend="up"
        />
        <StatCard
          title="Paid Payouts"
          value={billingData.filter((d) => d.status === "Paid").length}
          sub="Processed Transactions"
          icon={<FiUserCheck />}
          bg="bg-green-50"
          iconBg="bg-green-600"
          trend="neutral"
        />
        <StatCard
          title="Pending Payouts"
          value={billingData.filter((d) => d.status === "Pending").length}
          sub="Needs Approval"
          icon={<FiUsers />}
          bg="bg-orange-50"
          iconBg="bg-orange-600"
          trend="neutral"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <CommonTable
          columns={columns}
          dataSource={billingData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>

      {/* MODAL 1: Billing Details */}
      <CustomModal
        visible={isModalVisible}
        title="Billing Details"
        subtitle={`Transaction ID: #TXN-2023-${selectedRecord?.id}`}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleConfirmPayout}
        submitText="Proceed to Payout"
        showSubmit={modalMode === "payout" && selectedRecord?.status !== "Paid"}
        width={600}
      >
        {selectedRecord && (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-center gap-4 bg-neutral-light p-4 rounded-xl border border-neutral-medium">
              <div className="h-16 w-16 rounded-full border-2 border-primary/20 p-1">
                <img
                  src={selectedRecord.image}
                  alt={selectedRecord.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-dark m-0">
                  {selectedRecord.name}
                </h3>
                <p className="text-primary text-sm font-semibold m-0">
                  {selectedRecord.speciality}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-typegray">
                  <span className="flex items-center gap-1 font-medium">
                    <FiUser size={12} /> {selectedRecord.gender}
                  </span>
                  <span className="flex items-center gap-1 border-l border-neutral-medium pl-3 font-medium">
                    <FiCalendar size={12} /> {selectedRecord.period}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-neutral-medium rounded-xl shadow-sm">
                <p className="text-[10px] text-typegray uppercase font-bold tracking-widest mb-1">
                  Total Fee Collected
                </p>
                <p className="text-xl font-black text-neutral-dark">
                  Rs. {selectedRecord.fee.toLocaleString()}
                </p>
                <p className="text-[11px] text-typegray mt-2 font-medium">
                  From {selectedRecord.appointments} appointments
                </p>
              </div>
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl shadow-sm">
                <p className="text-[10px] text-primary/70 uppercase font-bold tracking-widest mb-1">
                  Platform Commission
                </p>
                <p className="text-xl font-black text-primary">
                  Rs. {selectedRecord.commission.toLocaleString()}
                </p>
                <p className="text-[11px] text-primary/60 mt-2 font-medium">
                  Calculated at 10% rate
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-neutral-light p-5 rounded-2xl border border-neutral-medium space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-neutral-medium">
                <span className="text-typegray font-semibold">Subtotal</span>
                <span className="text-neutral-dark font-bold">
                  Rs. {selectedRecord.fee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-neutral-medium">
                <span className="text-typegray font-semibold">
                  Deductions (Taxes/Fees)
                </span>
                <span className="text-error font-bold italic">
                  - Rs. {selectedRecord.commission.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-success/10 text-success rounded-full flex items-center justify-center">
                    <FiDollarSign />
                  </div>
                  <span className="text-neutral-dark font-black text-lg">
                    Net Payable
                  </span>
                </div>
                <span className="text-success font-black text-2xl">
                  Rs. {selectedRecord.payable.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-[10px] text-typegray uppercase font-bold tracking-wider block mb-1">
                  Email Address
                </label>
                <p className="font-bold text-neutral-dark">
                  {selectedRecord.email}
                </p>
              </div>
              <div>
                <label className="text-[10px] text-typegray uppercase font-bold tracking-wider block mb-1">
                  Contact Number
                </label>
                <p className="font-bold text-neutral-dark">
                  {selectedRecord.phone}
                </p>
              </div>
            </div>

            <div
              className={`mt-4 p-3 rounded-lg text-center text-sm font-black border uppercase tracking-wider ${
                selectedRecord.status === "Paid"
                  ? "bg-success/10 text-success border-success/20"
                  : "bg-warning/10 text-warning border-warning/20"
              }`}
            >
              Payment Status: {selectedRecord.status}
            </div>
          </div>
        )}
      </CustomModal>

      {/* MODAL 2: Final Confirmation */}
      <CustomModal
        visible={isConfirmModalVisible}
        title="Confirm Transaction"
        subtitle="Final verification before payout"
        onCancel={() => setIsConfirmModalVisible(false)}
        onSubmit={handleFinalSubmit}
        submitText="Yes, Confirm Payout"
        width={450}
      >
        <div className="text-center space-y-5 py-4">
          <div className="w-20 h-20 bg-warning/10 text-warning rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-warning/5 shadow-inner">
            <FiDollarSign size={40} className="animate-bounce" />
          </div>
          <h4 className="text-2xl font-black text-neutral-dark">
            Are you sure?
          </h4>
          <div className="bg-neutral-light border border-neutral-medium p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-typegray m-0 leading-relaxed font-medium">
              You are about to authorize a payout of
              <span className="block text-3xl font-black text-success my-2">
                Rs. {selectedRecord?.payable.toLocaleString()}
              </span>
              to{" "}
              <span className="font-black text-neutral-dark underline decoration-primary/30 decoration-4 underline-offset-4">
                {selectedRecord?.name}
              </span>
            </p>
          </div>
          <div className="text-[11px] text-error font-black uppercase tracking-widest bg-error/10 py-3 rounded-xl border border-error/10">
            This action cannot be undone
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default AdminBilling;
