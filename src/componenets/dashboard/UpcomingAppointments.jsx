// src/components/UpcomingAppointments.js

const UpcomingAppointments = ({ appointments = [] }) => {
  // If no appointments are passed, we can show a placeholder or nothing
  if (appointments.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Upcoming Appointments
          </h3>
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
            <i className="fas fa-calendar-check text-green-600 text-lg"></i>
          </div>
        </div>
        <p className="text-gray-500 text-center py-4">
          No upcoming appointments
        </p>
      </div>
    );
  }

  const getStatusInfo = (type, status) => {
    if (type === "online") {
      return { text: "Online", class: "status-online" };
    }
    return { text: "Upcoming", class: "status-upcoming" };
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Upcoming Appointments
        </h3>
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
          <i className="fas fa-calendar-check text-green-600 text-lg"></i>
        </div>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => {
          const statusInfo = getStatusInfo(
            appointment.appointmentType,
            appointment.status,
          );

          return (
            <div
              key={appointment._id || appointment.id}
              className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors duration-200"
            >
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                <i
                  className={`fas ${appointment.appointmentType === "online" ? "fa-video" : "fa-stethoscope"} text-primary`}
                ></i>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {appointment.reason || "Consultation"}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  {appointment.date} - {appointment.timeSlot}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  {appointment.doctorId?.name
                    ? `Dr. ${appointment.doctorId.name}`
                    : appointment.doctor || "Doctor Name Not Available"}
                </p>
                {appointment.locationName && (
                  <p className="text-sm text-gray-500">
                    {appointment.locationName}
                  </p>
                )}
              </div>

              <div className={`status-badge ${statusInfo.class}`}>
                {statusInfo.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
