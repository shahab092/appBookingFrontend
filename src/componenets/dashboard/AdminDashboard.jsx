import React from 'react';
import { FiUsers, FiUserPlus, FiCalendar, FiBarChart, FiTrendingUp } from 'react-icons/fi';

const AdminDashboard = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('users')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-[#2F74AA]">1,234</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiUsers className="text-[#2F74AA] text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('appointments')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
              <p className="text-3xl font-bold text-green-600">456</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Doctors</p>
              <p className="text-3xl font-bold text-purple-600">45</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiUsers className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
              <p className="text-3xl font-bold text-orange-600">+12%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#2F74AA] mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('create-user')}
              className="w-full bg-gradient-to-r from-[#2F74AA] to-[#3a8ccc] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#256a9a] hover:to-[#2d7bb8] transition-all flex items-center justify-center gap-2"
            >
              <FiUserPlus className="text-lg" />
              Create New User
            </button>
            <button 
              onClick={() => onNavigate('users')}
              className="w-full border-2 border-[#2F74AA] text-[#2F74AA] py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <FiUsers className="text-lg" />
              Manage Users
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-[#2F74AA] mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">New doctor registered</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">5 new appointments</p>
                <p className="text-sm text-gray-600">Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


