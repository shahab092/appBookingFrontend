import React from 'react';
import DoctorRegistrationModal from '../../componenets/landingpage/DoctorRegistrationModal';

export default function DoctorRegistration() {
  // show modal as a page-level component
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <DoctorRegistrationModal visible={true} onCancel={() => window.history.back()} onOk={() => window.history.back()} />
    </div>
  );
}
