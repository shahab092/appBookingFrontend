// src/dashboard/RecentActivity.jsx
import React from 'react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'lab',
      title: 'New lab results are available',
      description: 'Blood Panel - Oct 23, 2024',
      icon: 'fas fa-file-medical-alt',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      type: 'message',
      title: 'Message from Dr. Evelyn Reed',
      description: 'Oct 22, 2024',
      icon: 'fas fa-envelope',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'prescription',
      title: 'Prescription refill is ready',
      description: 'Metformin - Ready for pickup',
      icon: 'fas fa-pills',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
        <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
          <i className="fas fa-history text-yellow-600 text-lg"></i>
        </div>
      </div>
      
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors duration-200">
            <div className={`w-12 h-12 ${activity.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
              <i className={`${activity.icon} ${activity.color}`}></i>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity; // Make sure this line exists