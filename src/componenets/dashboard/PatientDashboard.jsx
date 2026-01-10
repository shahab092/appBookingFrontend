import React, { useState, useEffect, useRef } from "react";
import {
  FiCalendar,
  FiActivity,
  FiHeart,
  FiDroplet,
  FiThermometer,
  FiVideo,
  FiHome,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AppointmentModal from "./AppointmentModal";
import RecentActivity from "./RecentActivity";
import { useSelector } from "react-redux";
import api from "../../libs/api";
import { useToast } from "../../context/ToastContext";
import AppointmentCard from "./AppointmentCard";
import { useVideoCall } from "../../context/VideoCallProvider";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { socket } = useVideoCall();

  const [modalVisible, setModalVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const hasNavigatedRef = useRef(false);
  const incomingCallHandlerRef = useRef(null);
  const isRegisteredRef = useRef(false);

  // Register patient with socket server and set up listeners
  useEffect(() => {
    if (!socket || !user?.id) {
      return;
    }

    // Only register once per socket connection
    if (!isRegisteredRef.current) {
      socket.emit("register", user.id);
      isRegisteredRef.current = true;
    }

    // Define the incoming call handler
    const handleIncomingCall = (data) => {
      // Prevent multiple navigations
      if (hasNavigatedRef.current) {
        return;
      }

      hasNavigatedRef.current = true;
      incomingCallHandlerRef.current = handleIncomingCall;

      // Clean up socket listeners for incoming-call to prevent conflicts
      socket.off("incoming-call", handleIncomingCall);

      // Navigate to calling page
      navigate("/calling", {
        state: {
          isIncoming: true,
          remoteUserId: data.from,
          remoteUserName: data.fromName || "Doctor",
          offer: data.offer,
        },
      });
    };

    // Listen for incoming calls
    socket.on("incoming-call", handleIncomingCall);

    // Listen for call ended
    const handleCallEnded = () => {
      // Reset navigation flag when call ends
      hasNavigatedRef.current = false;
      // Re-add the incoming call listener for future calls
      if (incomingCallHandlerRef.current) {
        socket.off("incoming-call", incomingCallHandlerRef.current);
        socket.on("incoming-call", incomingCallHandlerRef.current);
      }
    };

    socket.on("call-ended", handleCallEnded);

    // Handle socket errors
    const handleError = (error) => {
      console.error("Socket error:", error);
    };

    socket.on("error", handleError);

    return () => {
      if (socket) {
        socket.off("incoming-call", handleIncomingCall);
        socket.off("call-ended", handleCallEnded);
        socket.off("error", handleError);

        // Reset registered flag when component unmounts
        isRegisteredRef.current = false;
      }
    };
  }, [socket, user?.id, navigate]);

  // Handle socket connection status changes
  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleConnect = () => {
      // Re-register when reconnected
      if (user?.id) {
        socket.emit("register", user.id);
        isRegisteredRef.current = true;
      }
      // Reset navigation flag on reconnect
      hasNavigatedRef.current = false;
    };

    const handleDisconnect = () => {
      // Reset registered flag when disconnected
      isRegisteredRef.current = false;
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      if (socket) {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
      }
    };
  }, [socket, user?.id]);

  // Reset navigation flag when user changes
  useEffect(() => {
    hasNavigatedRef.current = false;
    isRegisteredRef.current = false;
  }, [user?.id]);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await api.get(`appointments/patient/${user.id}`);
      setAppointments(res.data.data || []);
      console.log(res, "resp");
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAppointments();
    }
  }, [user.id]);

  // Format appointment data securely
  const formatAppointmentData = (appt) => {
    const doctorName = appt.doctorId?.fullName
      ? `Dr. ${appt.doctorId.fullName}`
      : "Dr. Name not available";

    const appointmentType = appt.appointmentType || "in-clinic";
    const appointmentIcon =
      appointmentType === "online" ? (
        <FiVideo className="mr-1" />
      ) : (
        <FiHome className="mr-1" />
      );

    const department = appt.department || "General";
    const reason = appt.reason || "General consultation";

    // Format date and time
    const date = appt.date || "Date not specified";
    const timeSlot = appt.timeSlot || "Time not specified";
    const formattedTime = `${date} - ${timeSlot}`;

    // Get status with appropriate color
    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case "booked":
          return "green";
        // case "pending":
        //   return "yellow";
        case "cancelled":
          return "red";
        case "completed":
          return "blue";
        default:
          return "gray";
      }
    };

    // Get status display text
    const getStatusText = (status) => {
      if (!status) return "Pending";
      return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return {
      id: appt._id,
      title: reason,
      time: formattedTime,
      doctor: `${doctorName} (${department})`,
      status: getStatusText(appt.status),
      statusColor: getStatusColor(appt.status),
      type: appointmentType,
      typeIcon: appointmentIcon,
    };
  };

  const { showToast } = useToast();

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const res = await api.patch(`appointments/${appointmentId}/status`, {
        status: "cancelled",
      });

      if (res.status === 200) {
        showToast("Appointment cancelled successfully", "success");
        fetchAppointments();
      }
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to cancel appointment",
        "error"
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* ================= LEFT COLUMN ================= */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        {/* Upcoming Appointments */}
        <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2F74AA]">
                Upcoming Schedule
              </h2>
              <p className="text-sm text-gray-500 font-medium mt-1">
                You have {appointments.length} upcoming appointment
                {appointments.length !== 1 && "s"}
              </p>
            </div>

            <button
              onClick={handleOpenModal}
              className="btn-primary flex items-center gap-2"
            >
              <FiCalendar />
              New Appointment
            </button>

            <AppointmentModal
              visible={modalVisible}
              onCancel={handleCloseModal}
              onRefresh={fetchAppointments}
            />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-light">
            {loading ? (
              <p className="text-gray-500 text-center">
                Loading appointments...
              </p>
            ) : appointments.length > 0 ? (
              appointments.map((appt) => {
                console.log(appt, "sfddsdfsdf");
                const formattedAppt = formatAppointmentData(appt);
                return (
                  <AppointmentCard
                    key={formattedAppt.id}
                    title={formattedAppt.title}
                    time={formattedAppt.time}
                    doctor={formattedAppt.doctor}
                    status={formattedAppt.status}
                    statusColor={formattedAppt.statusColor}
                    type={formattedAppt.type}
                    typeIcon={formattedAppt.typeIcon}
                    handleOpenModal={handleOpenModal}
                    handleCancel={() =>
                      handleCancelAppointment(formattedAppt.id)
                    }
                  />
                );
              })
            ) : (
              <p className="text-gray-500 text-center">
                No upcoming appointments
              </p>
            )}
          </div>
        </section>

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* ================= RIGHT COLUMN ================= */}
      <div className="lg:col-span-1 flex flex-col gap-4 sm:gap-6">
        {/* Patient Vitals */}
        <section className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 flex-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-[#3a8ccc]">
              Patient Vitals & Demographics
            </h2>
            <FiActivity className="text-[#3a8ccc]" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Age", value: "42 ", unit: "yrs" },
              { label: "Weight", value: "78 ", unit: "kg" },
              { label: "Height", value: "165 ", unit: "cm" },
              { label: "BSA", value: "1.87 ", unit: "m²" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-3 rounded-xl bg-gray-50 space-y-3"
              >
                <div className="text-sm text-gray-500">{item.label}</div>
                <div>
                  <span className="text-3xl font-bold text-gray-900">
                    {item.value}
                  </span>
                  <span className="text-sm"> {item.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 my-4" />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 p-2">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiDroplet className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Blood Pressure
                </span>
              </div>
              <span className="font-semibold">130/85 mmHg</span>
            </div>

            <div className="flex justify-between items-center p-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                  <FiHeart className="text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Heart Rate
                </span>
              </div>
              <span className="font-semibold">72 bpm</span>
            </div>

            <div className="flex justify-between items-center p-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                  <FiThermometer className="text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Body Temp
                </span>
              </div>
              <span className="font-semibold">37.0 °C</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;
