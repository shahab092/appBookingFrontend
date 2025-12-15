import React, { useState } from "react";
import { Modal, Row, Col, message } from "antd";
import axios from "axios";
import {
  FaStethoscope,
  FaTimes,
  FaUser,
  FaIdCard,
  FaMapMarkerAlt,
} from "react-icons/fa";

// ---------------------- Reusable Input Components ----------------------
const InputField = ({ label, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm mb-1 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

const TextAreaField = ({ label, value, onChange, rows = 4, placeholder }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm mb-1 font-medium">{label}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
    />
  </div>
);

// ---------------------- Main Modal Component ----------------------
export default function DoctorRegistrationModal({
  visible,
  title = "Doctor Registration",
  onOk,
  onCancel,
}) {
  // Personal Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Professional Profile
  const [pmdcRegistrationNumber, setPmdcRegistrationNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");

  // Office Address
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    import.meta.env.REACT_APP_API_URL ||
    "http://localhost:3000/api/doctor/register";

  const handleSubmit = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !pmdcRegistrationNumber
    ) {
      message.error("Please fill all required fields");
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      password,
      doctorProfile: {
        licenseNumber: pmdcRegistrationNumber,
        experience,
        specialization,
        department,
      },
      address: { street, city, state, zip, country },
      about,
      status: "pending",
      isAvailable: false,
    };

    console.log("Form submitted with data:", payload);

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}`, payload);
      message.success("Registration submitted successfully");
      onOk?.(res.data);
    } catch (err) {
      message.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const sectionTitle = (icon, text) => (
    <div className="flex items-center gap-2 text-blue-600 font-semibold mt-6 mb-4">
      {icon}
      <span className="uppercase text-sm tracking-wide">{text}</span>
    </div>
  );

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      width={800}
      centered
      className="p-0"
    >
      {/* Header */}
      <div className="bg-blue-50 p-4 flex justify-between items-start rounded-t-lg">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaStethoscope className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Register as a doctor. We will review and contact you shortly.
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 text-lg"
        >
          <FaTimes />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 bg-white max-h-[75vh] overflow-y-auto scrollbar-light">
        {/* Personal Information */}
        {sectionTitle(
          <FaUser className="text-blue-500" />,
          "Personal Information"
        )}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <InputField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
            />
          </Col>
          <Col xs={24} sm={12}>
            <InputField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
            />
          </Col>
          <Col xs={24} sm={12}>
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </Col>
          <Col xs={24} sm={12}>
            <InputField
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 890"
            />
          </Col>
          <Col xs={24}>
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </Col>
        </Row>

        {/* Professional Profile */}
        {sectionTitle(
          <FaIdCard className="text-blue-500" />,
          "Professional Profile"
        )}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <InputField
              label="License / PMDC Number"
              value={pmdcRegistrationNumber}
              onChange={(e) => setPmdcRegistrationNumber(e.target.value)}
              placeholder="PMDC12345"
            />
          </Col>
          <Col xs={24} sm={12}>
            <InputField
              label="Experience (Years)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="5"
            />
          </Col>
          <Col xs={24} sm={12}>
            <InputField
              label="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Cardiology"
            />
          </Col>
          <Col xs={24} sm={12}>
            <InputField
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Heart Center"
            />
          </Col>
        </Row>

        {/* Office Address */}
        {sectionTitle(
          <FaMapMarkerAlt className="text-blue-500" />,
          "Office Address"
        )}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <InputField
              label="Street Address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="123 Main Street"
            />
          </Col>
          <Col xs={24} sm={8}>
            <InputField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </Col>
          <Col xs={24} sm={8}>
            <InputField
              label="State / Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
            />
          </Col>
          <Col xs={24} sm={8}>
            <InputField
              label="Zip / Postal Code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="12345"
            />
          </Col>
          <Col xs={24}>
            <InputField
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col xs={24}>
            <TextAreaField
              label="About / Notes"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Brief description about you"
            />
          </Col>
        </Row>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
