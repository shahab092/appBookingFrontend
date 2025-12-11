import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, message } from 'antd';
import axios from 'axios';
import { CalendarOutlined, CloseOutlined, LeftOutlined, RightOutlined, VideoCameraOutlined, HomeOutlined, UserOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';

// --- Constants ---
// Moved outside the component to prevent re-declaration on every render.
const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM',
  '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM'
];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

function AppointmentModal({ visible, title = 'Schedule an Appointment', onOk, onCancel }) {
  const [appointmentType, setAppointmentType] = useState('online');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // Month is 1-12
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    if (visible) {
      axios.get(`${API_URL}/api/doctors`)
        .then(res => {
          const fetchedDoctors = res.data.data || [];
          setDoctors(fetchedDoctors);
          setFilteredDoctors(fetchedDoctors); // Initially show all doctors
          // Dynamically populate departments from the fetched doctors
          const uniqueDepartments = [...new Set(fetchedDoctors.map(doc => doc.department).filter(Boolean))];
          setDepartments(uniqueDepartments);
        })
        .catch(err => {
          console.error("Failed to fetch doctors:", err);
          message.error("Could not load doctor information.");
        });
    }
  }, [visible, API_URL]);

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

  const getDaysArray = () => {
    const days = [];
    // The firstDay is 0 for Sunday, 1 for Monday, etc. which matches the grid start.
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleBooking = () => {
    // Validate required fields
    if (!appointmentType || !department || !doctor || !selectedDate || !selectedTime) {
      message.error('Please fill all required fields');
      return;
    }

    // Make API call to create appointment

    const payload = {
      // The backend's createAppointment expects the doctor's ID.
      // The `doctor` state now holds the ID.
      doctorId: doctor, // This is now the doctor's _id
      department,
      date: `${monthNames[currentMonth - 1]} ${selectedDate}, ${currentYear}`,
      timeSlot: selectedTime,
    };

    setLoading(true);
    const token = localStorage.getItem('token');

    axios.post(`${API_URL}/api/appointments`, payload, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })

      .then((res) => {
        message.success(res.data?.message || 'Appointment booked');
        // Pass created appointment data to parent if available
        if (onOk) onOk(res.data?.data || payload);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Failed to book appointment';
        message.error(msg);
      })
      .finally(() => setLoading(false));
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setDepartment(selectedDept);
    setDoctor(''); // Reset doctor selection
    if (selectedDept) {
      setFilteredDoctors(doctors.filter(doc => doc.department === selectedDept));
    } else {
      setFilteredDoctors(doctors); // Show all if no department is selected
    }
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      onCancel={onCancel}
      width="80vw"
      style={{ maxWidth: '800px' }}
      bodyStyle={{ padding: 0, maxHeight: '90vh', overflowY: 'auto' }}
      centered
    >
      <div className="relative rounded-xl overflow-hidden shadow-2xl">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-4 sm:p-6 md:p-8">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="p-3 sm:p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <CalendarOutlined className="text-white text-xl sm:text-2xl md:text-3xl" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">{title}</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-blue-50 line-clamp-2">Complete your appointment booking in just a few steps</p>
              </div>
            </div>

            <button
              onClick={onCancel}
              aria-label="Close"
              className="w-8 sm:w-10 h-8 sm:h-10 text-white hover:bg-white hover:bg-opacity-20 transition-all rounded-lg flex-shrink-0 flex items-center justify-center duration-300"
            >
              <CloseOutlined className="text-lg sm:text-xl" />
            </button>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white animate-[fadeIn_0.5s_ease-in-out]">
          <Row gutter={[20, 28]}>
            {/* Left Column - Form */}
            <Col xs={24} md={12}>
              <div className="space-y-5 sm:space-y-6 md:space-y-7 order-2 md:order-1">
                {/* Appointment Type Section */}
                <div>
                  <label className="block font-bold text-sm sm:text-base md:text-lg text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    Appointment Type
                  </label>
                  <div className="space-y-2.5 sm:space-y-3">
                    {[
                      { type: 'online', icon: VideoCameraOutlined, label: 'Online Consultation', desc: 'Video call with doctor' },
                      { type: 'in-clinic', icon: HomeOutlined, label: 'In-clinic Visit', desc: 'Visit our clinic' }
                    ].map(({ type, icon: Icon, label, desc }) => (
                      <div
                        key={type}
                        onClick={() => setAppointmentType(type)}
                        className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 items-center flex gap-3 group ${
                          appointmentType === type
                            ? 'border-blue-600 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-md'
                            : 'border-gray-200 bg-white hover:shadow-md hover:border-blue-300'
                        }`}
                      >
                        <div className={`p-2.5 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          appointmentType === type
                            ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                            : 'bg-gray-100 group-hover:bg-blue-100'
                        }`}>
                          <Icon className={`text-base sm:text-lg ${appointmentType === type ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm sm:text-base text-gray-900">{label}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{desc}</div>
                        </div>
                        <div className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                          appointmentType === type
                            ? 'border-blue-600 bg-gradient-to-br from-blue-600 to-cyan-600'
                            : 'border-gray-300 group-hover:border-blue-400'
                        }`}>
                          {appointmentType === type && <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white rounded-full" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Department Section */}
                <div>
                  <label className="block font-bold text-sm sm:text-base md:text-lg text-gray-900 mb-2.5 md:mb-3 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    Department
                  </label>
                  <div className="relative">
                    <TeamOutlined className="absolute left-3 top-3 sm:top-3.5 text-blue-500 text-sm sm:text-base" />
                    <select
                      value={department}
                      onChange={handleDepartmentChange}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-blue-50 bg-white text-sm sm:text-base text-gray-700 transition-all duration-300 font-medium"
                    >
                      <option value="">Select a department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Doctor Section */}
                <div>
                  <label className="block font-bold text-sm sm:text-base md:text-lg text-gray-900 mb-2.5 md:mb-3 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    Select Doctor
                  </label>
                  <div className="relative">
                    <UserOutlined className="absolute left-3 top-3 sm:top-3.5 text-blue-500 text-sm sm:text-base" />
                    <select
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-blue-50 bg-white text-sm sm:text-base text-gray-700 transition-all duration-300 font-medium"
                    >
                      <option value="">Select a doctor</option>
                      {filteredDoctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>{doc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Col>

            {/* Right Column - Calendar & Time */}
            <Col xs={24} md={12}>
              <div className="space-y-5 sm:space-y-6 md:space-y-7 order-1 md:order-2">
                {/* Calendar Section */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div>
                      <h4 className="font-bold text-blue-600 text-base sm:text-lg md:text-xl">
                        {monthNames[currentMonth - 1]}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{currentYear}</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        onClick={handlePrevMonth}
                        aria-label="Previous month"
                        className="w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-300 font-bold"
                      >
                        <LeftOutlined />
                      </button>
                      <button
                        onClick={handleNextMonth}
                        aria-label="Next month"
                        className="w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-300 font-bold"
                      >
                        <RightOutlined />
                      </button>
                    </div>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => ( // Calendar starts on Sunday
                      <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysArray().map((day, idx) => (
                      <button
                        key={idx}
                        onClick={() => day && setSelectedDate(day)}
                        className={`h-8 sm:h-9 text-xs sm:text-sm rounded-lg transition-all duration-300 flex items-center justify-center font-bold ${
                          day === null
                            ? 'cursor-default'
                            : selectedDate === day
                            ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg scale-110'
                            : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                        }`}
                        disabled={day === null}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots Section */}
                <div>
                  <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-900 mb-3 flex items-center gap-2">
                    <ClockCircleOutlined className="text-blue-600" />
                    Available Slots on {monthNames[currentMonth - 1]} {selectedDate}, {currentYear}
                  </h4>
                  
                  {/* Mobile: Dropdown */}
                  <div className="block md:hidden">
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-600 focus:bg-blue-50 transition-all duration-300"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  {/* Desktop: Grid */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 transform ${
                            selectedTime === slot
                              ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-md scale-105'
                              : 'bg-gray-100 border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:scale-105'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Enhanced Book Button */}
          <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4 md:pt-6 pb-4 md:pb-6 mt-6 md:mt-8">
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="px-6 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={loading}
                className={`px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base text-white shadow-lg transition-all duration-300 flex items-center gap-2 ${
                  loading
                    ? 'bg-gray-400 opacity-60 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin">⚙️</span>
                    Booking...
                  </>
                ) : (
                  <>
                    ✓ Book Appointment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal> 
  );
}

export default AppointmentModal;