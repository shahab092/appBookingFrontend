import React from 'react';
import { FiDroplet, FiFileText, FiClock, FiCheckCircle } from 'react-icons/fi';

const LabDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Tests</p>
              <p className="text-3xl font-bold text-yellow-600">18</p>
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
              <p className="text-3xl font-bold text-green-600">42</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Tests</p>
              <p className="text-3xl font-bold text-[#2F74AA]">1,234</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiDroplet className="text-[#2F74AA] text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Results Ready</p>
              <p className="text-3xl font-bold text-purple-600">15</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiFileText className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-[#2F74AA] mb-6">Pending Lab Tests</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-l-4 border-l-yellow-400 rounded-lg p-4 bg-yellow-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">Blood Test - Patient #{1000 + item}</h3>
                  <p className="text-sm text-gray-600 mt-1">Requested by: Dr. Smith</p>
                  <p className="text-sm text-gray-500">Priority: Normal</p>
                </div>
                <button className="px-4 py-2 bg-[#2F74AA] text-white rounded-lg font-medium hover:bg-[#256a9a] transition-colors">
                  Process
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;

