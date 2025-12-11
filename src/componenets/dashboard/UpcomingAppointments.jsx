// src/components/UpcomingAppointments.js
import React from 'react';

const UpcomingAppointments = () => {
  const appointments = [
    {
      id: 1,
      title: 'Annual Physical Exam',
      date: 'Mon, Oct 28, 2024 - 10:30 AM',
      doctor: 'Dr. Evelyn Reed (Cardiology)',
      type: 'clinic',
      location: 'Main Hospital, 123 Health St.',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Follow-up Consultation',
      date: 'Wed, Nov 06, 2024 - 2:00 PM',
      doctor: 'Dr. Ben Carter (Dermatology)',
      type: 'online',
      status: 'upcoming'
    }
  ];

  const getStatusInfo = (type, status) => {
    if (type === 'online') {
      return { text: 'Online', class: 'status-online' };
    }
    return { text: 'Upcoming', class: 'status-upcoming' };
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h3>
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
          <i className="fas fa-calendar-check text-green-600 text-lg"></i>
        </div>
      </div>
      
      <div className="space-y-4">
        {appointments.map(appointment => {
          const statusInfo = getStatusInfo(appointment.type, appointment.status);
          
          return (
            <div key={appointment.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors duration-200">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                <i className={`fas ${appointment.type === 'online' ? 'fa-video' : 'fa-stethoscope'} text-primary`}></i>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1">{appointment.title}</h4>
                <p className="text-sm text-gray-600 mb-1">{appointment.date}</p>
                <p className="text-sm text-gray-600 mb-1">{appointment.doctor}</p>
                {appointment.location && (
                  <p className="text-sm text-gray-500">{appointment.location}</p>
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