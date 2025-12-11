import React, { useState } from 'react';
import { Modal, Row, Col, message } from 'antd';
import axios from 'axios';
import { FaStethoscope, FaTimes } from 'react-icons/fa';

export default function DoctorRegistrationModal({ visible, title = 'Docter Registration', onOk, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [phone, setPhone] = useState('');
  const [pmdcRegistrationNumber, setPmdcRegistrationNumber] = useState('');
  const [address, setAddress] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async () => {
    if (!name || !email || !specialization || !pmdcRegistrationNumber || !address) {
      message.error('Please fill required fields (name, email, specialization, PMDC registration, address)');
      return;
    }

    const payload = {
      name,
      email,
      phone,
      pmdcRegistrationNumber,
      specialization,
      department,
      address,
      experience,
      about,
      isAvailable: false,
      status: 'pending'
    };

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/api/doctors`, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      message.success(res.data?.message || 'Registration submitted');
      if (onOk) onOk(res.data?.data || payload);
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || 'Failed to submit registration';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      onCancel={onCancel}
      width="720px"
      centered
    >
      <div className="relative rounded-lg overflow-hidden">
        <div className="relative bg-gradient-to-r from-blue-50 to-white p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaStethoscope className="text-blue-600 text-xl" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-blue-800 truncate">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">Register as a doctor. We will review and contact you.</p>
              </div>
            </div>

            <button onClick={onCancel} aria-label="Close" className="w-8 h-8 text-gray-400 hover:text-gray-600 transition flex items-center justify-center">
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="p-6 bg-white">
          <Row gutter={[16, 12]}>
            <Col xs={24} sm={12}>
              <label className="block text-sm font-semibold mb-1">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Dr. Jane Doe" />
            </Col>
            <Col xs={24} sm={12}>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="email@domain.com" />
            </Col>
            <Col xs={24} sm={12}>
              <label className="block text-sm font-semibold mb-1">Specialization</label>
              <input value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Cardiology" />
            </Col>
            <Col xs={24} sm={12}>
              <label className="block text-sm font-semibold mb-1">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="+1 (555) 123-4567" />
            </Col>
            <Col xs={24} sm={12}>
              <label className="block text-sm font-semibold mb-1">PMDC Registration Number *</label>
              <input value={pmdcRegistrationNumber} onChange={(e) => setPmdcRegistrationNumber(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="PMDC-12345" />
            </Col>
            <Col xs={24} sm={12}>
              <label className="block text-sm font-semibold mb-1">Department</label>
              <input value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Cardiology Department" />
            </Col>
            <Col xs={24}>
              <label className="block text-sm font-semibold mb-1">Address *</label>
              <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="123 Medical St, Karachi" />
            </Col>
            <Col xs={24} sm={12}>
              <label className="block text-sm font-semibold mb-1">Experience (years)</label>
              <input value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="5" />
            </Col>
            <Col xs={24}>
              <label className="block text-sm font-semibold mb-1">About / Notes</label>
              <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg" placeholder="Brief bio, clinic details, availability..." />
            </Col>
          </Row>

          <div className="mt-4 flex justify-end">
            <button onClick={onCancel} className="px-4 py-2 rounded-lg border mr-3">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className={`px-4 py-2 rounded-lg font-semibold text-white ${loading ? 'bg-blue-600 opacity-60 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {loading ? 'Submitting...' : 'Submit Registration'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
