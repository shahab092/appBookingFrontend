// src/components/Calendar.js
import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(25);
  const [selectedTime, setSelectedTime] = useState('03:00 PM');

  const calendarData = {
    month: 'October 2024',
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dates: [
      { date: 29, otherMonth: true }, { date: 30, otherMonth: true },
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      { date: 1, otherMonth: true }, { date: 2, otherMonth: true }
    ]
  };

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true }
  ];

  const hasAppointment = (date) => {
    return [27, 28].includes(date);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">October 2024</h3>
        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
          <i className="far fa-calendar text-purple-600 text-lg"></i>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <i className="fas fa-chevron-left text-gray-600 text-sm"></i>
          </button>
          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <i className="fas fa-chevron-right text-gray-600 text-sm"></i>
          </button>
        </div>
        <h4 className="text-lg font-semibold text-gray-900">{calendarData.month}</h4>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {calendarData.days.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarData.dates.map((dateObj, index) => {
          const date = typeof dateObj === 'object' ? dateObj.date : dateObj;
          const otherMonth = typeof dateObj === 'object' ? dateObj.otherMonth : false;
          const isSelected = date === selectedDate && !otherMonth;
          const hasAppt = hasAppointment(date) && !otherMonth;

          return (
            <div
              key={index}
              className={`
                relative h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200
                ${otherMonth ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}
                ${isSelected ? 'bg-primary text-white hover:bg-primary' : ''}
              `}
              onClick={() => !otherMonth && setSelectedDate(date)}
            >
              {date}
              {hasAppt && !isSelected && (
                <div className="absolute bottom-1 w-1 h-1 bg-green-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Time Slots */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h4>
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`
                text-center py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer
                ${!slot.available 
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                  : slot.time === selectedTime 
                    ? 'bg-primary text-white border-primary' 
                    : 'border-gray-200 hover:border-primary text-gray-700'
                }
              `}
              onClick={() => slot.available && setSelectedTime(slot.time)}
            >
              {slot.time}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;