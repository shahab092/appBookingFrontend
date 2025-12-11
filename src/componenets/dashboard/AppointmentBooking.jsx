// src/components/AppointmentBooking.js
import React, { useState } from 'react';

const AppointmentBooking = () => {
  const [appointmentType, setAppointmentType] = useState('clinic');
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  const doctors = [
    { id: 'dr-reed', name: 'Dr. Evelyn Reed', specialty: 'Cardiology' },
    { id: 'dr-carter', name: 'Dr. Ben Carter', specialty: 'General Practice' },
    { id: 'dr-wong', name: 'Dr. Sarah Wong', specialty: 'Dermatology' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking appointment:', { type: appointmentType, ...formData });
    alert('Appointment booked successfully!');
    // Reset form
    setFormData({
      doctor: '',
      date: '',
      time: '',
      reason: ''
    });
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Schedule a New Consultation</h3>
        <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
          <i className="fas fa-calendar-plus text-primary text-lg"></i>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6">Need to see a doctor? Book your next appointment here.</p>
      
      {/* Appointment Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div 
          className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
            appointmentType === 'online' 
              ? 'border-primary bg-primary-light' 
              : 'border-gray-200 hover:border-primary'
          }`}
          onClick={() => setAppointmentType('online')}
        >
          <i className="fas fa-video text-primary text-2xl mb-3"></i>
          <h4 className="font-semibold text-gray-900 mb-1">Online Consultation</h4>
          <p className="text-sm text-gray-600">Video call with a doctor</p>
        </div>
        
        <div 
          className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
            appointmentType === 'clinic' 
              ? 'border-primary bg-primary-light' 
              : 'border-gray-200 hover:border-primary'
          }`}
          onClick={() => setAppointmentType('clinic')}
        >
          <i className="fas fa-clinic-medical text-primary text-2xl mb-3"></i>
          <h4 className="font-semibold text-gray-900 mb-1">In-Clinic Appointment</h4>
          <p className="text-sm text-gray-600">Visit our facility</p>
        </div>
      </div>
      
      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Doctor
          </label>
          <select 
            name="doctor"
            value={formData.doctor}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            <option value="">Choose a doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} ({doctor.specialty})
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date
            </label>
            <input 
              type="date" 
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time
            </label>
            <select 
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              <option value="">Select a time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Visit
          </label>
          <textarea 
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            rows="3"
            placeholder="Briefly describe your symptoms or reason for consultation"
            className="form-input"
            required
          ></textarea>
        </div>
        
        <button type="submit" className=" w-full">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentBooking;