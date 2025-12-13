import React from 'react';
import { FiX, FiFileText, FiClock, FiCheckCircle } from 'react-icons/fi';

const XRayDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Scans</p>
              <p className="text-3xl font-bold text-yellow-600">8</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FiClock className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed Today</p>
              <p className="text-3xl font-bold text-green-600">24</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Scans</p>
              <p className="text-3xl font-bold text-[#2F74AA]">856</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiX className="text-[#2F74AA] text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Reports Ready</p>
              <p className="text-3xl font-bold text-purple-600">12</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiFileText className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Scans */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-[#2F74AA] mb-6">Pending X-Ray Scans</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-l-yellow-400 rounded-lg p-4 bg-yellow-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">Chest X-Ray - Patient #1001</h3>
                <p className="text-sm text-gray-600 mt-1">Requested by: Dr. Johnson</p>
                <p className="text-sm text-gray-500">Type: Chest X-Ray</p>
              </div>
              <button className="px-4 py-2 bg-[#2F74AA] text-white rounded-lg font-medium">
                Process
              </button>
            </div>
          </div>

          <div className="border-l-4 border-l-yellow-400 rounded-lg p-4 bg-yellow-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">Chest X-Ray - Patient #1002</h3>
                <p className="text-sm text-gray-600 mt-1">Requested by: Dr. Johnson</p>
                <p className="text-sm text-gray-500">Type: Chest X-Ray</p>
              </div>
              <button className="px-4 py-2 bg-[#2F74AA] text-white rounded-lg font-medium">
                Process
              </button>
            </div>
          </div>

          <div className="border-l-4 border-l-yellow-400 rounded-lg p-4 bg-yellow-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">Chest X-Ray - Patient #1003</h3>
                <p className="text-sm text-gray-600 mt-1">Requested by: Dr. Johnson</p>
                <p className="text-sm text-gray-500">Type: Chest X-Ray</p>
              </div>
              <button className="px-4 py-2 bg-[#2F74AA] text-white rounded-lg font-medium">
                Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XRayDashboard;