import { useState } from "react";
import { Modal, Row, Col } from "antd";
import { useToast } from "../../context/ToastContext";
import {
  FaStethoscope,
  FaTimes,
  FaUser,
  FaIdCard,
  FaMapMarkerAlt,
} from "react-icons/fa";
import api from "../../libs/api";
import CustomTextField from "../common/CustomTextField";
import CustomSelect from "../common/CustomSelect";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { doctorRegistrationSchema } from "../../validation/validation";
import { departmentOptions, specializationOptions } from "../../constant/data";
import CustomModal from "../common/CustomModal";

export default function DoctorRegistrationModal({
  visible,
  title = "Doctor Registration",
  onOk,
  onCancel,
}) {
  const methods = useForm({
    resolver: yupResolver(doctorRegistrationSchema),
    mode: "onTouched",
  });

  const { handleSubmit, reset } = methods;
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      doctorProfile: {
        licenseNumber: data.licenseNumber,
        experience: data.experience,
        specialization: data.specialization,
        department: data.department,
      },
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
      },
      about: data.about,
      status: "pending",
      isAvailable: false,
    };

    try {
      setLoading(true);
      const res = await api.post("/doctor/register", payload);
      showToast(
        "Registration submitted successfully! We will review it shortly.",
        "success",
      );

      // Reset form after successful submission
      reset();

      // Call optional callback with API response
      onOk?.(res.data);
    } catch (err) {
      showToast(err.response?.data?.message || "Registration failed", "error");
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
    <CustomModal
      visible={visible}
      title={title}
      subtitle="Register as a doctor. We will review and contact you shortly."
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      submitText={loading ? "Submitting..." : "Submit Registration"}
      loading={loading}
      width={800}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Body */}
          <div className="p-0">
            {/* Personal Info */}
            {sectionTitle(<FaUser />, "Personal Information")}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <CustomTextField
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                  rules={{ required: "First name is required" }}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CustomTextField
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                  rules={{ required: "Last name is required" }}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CustomTextField
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="example@email.com"
                  rules={{ required: "Email is required" }}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CustomTextField
                  name="phone"
                  label="Phone Number"
                  placeholder="+92 300 1234567"
                />
              </Col>
              <Col xs={24}>
                <CustomTextField
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  rules={{ required: "Password is required" }}
                />
              </Col>
            </Row>

            {/* Professional */}
            {sectionTitle(<FaIdCard />, "Professional Profile")}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <CustomTextField
                  name="licenseNumber"
                  label="License / PMDC Number"
                  placeholder="PMDC-12345"
                  rules={{ required: "PMDC number is required" }}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CustomTextField
                  name="experience"
                  label="Experience (Years)"
                  placeholder="e.g. 5"
                  allowOnly="numeric"
                />
              </Col>
              <Col xs={24} sm={12}>
                <CustomSelect
                  name="specialization"
                  label="Specialization"
                  options={specializationOptions}
                  rules={{ required: "Specialization is required" }}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CustomSelect
                  name="department"
                  label="Department"
                  options={departmentOptions}
                  rules={{ required: "Department is required" }}
                />
              </Col>
            </Row>

            {/* Address */}
            {sectionTitle(<FaMapMarkerAlt />, "Office Address")}
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <CustomTextField
                  name="street"
                  label="Street Address"
                  placeholder="Street address"
                />
              </Col>
              <Col xs={24} sm={8}>
                <CustomTextField name="city" label="City" placeholder="City" />
              </Col>
              <Col xs={24} sm={8}>
                <CustomTextField
                  name="state"
                  label="State"
                  placeholder="State / Province"
                />
              </Col>
              <Col xs={24} sm={8}>
                <CustomTextField
                  name="zip"
                  label="Zip Code"
                  placeholder="Postal code"
                  allowOnly="numeric"
                />
              </Col>
              <Col xs={24}>
                <CustomTextField
                  name="country"
                  label="Country"
                  placeholder="Country"
                />
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs={24}>
                <CustomTextField
                  name="about"
                  label="About / Notes"
                  placeholder="Write something about yourself"
                  multiline
                  minRows={4}
                />
              </Col>
            </Row>
          </div>
        </form>
      </FormProvider>
    </CustomModal>
  );
}
