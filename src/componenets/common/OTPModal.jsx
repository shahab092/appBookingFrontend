import React, { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import CustomModal from "./CustomModal";

export default function OTPModal({
  visible,
  onClose,
  onVerify,
  mobileNumber,
  loading = false,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (visible) {
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [visible]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    } else if (value && index === 5) {
      inputRefs.current[index].blur(); // Trigger onBlur verification
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on Backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.every((char) => !isNaN(char))) {
      const newOtp = [...otp];
      pastedData.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length, 5)].focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length < 6) return; // Don't verify incomplete OTP

    setError("");
    onVerify?.(otpString);
  };

  const handleBlur = () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      handleVerify();
    }
  };

  return (
    <CustomModal
      visible={visible}
      title="Verify OTP"
      subtitle={`Enter the code sent to ${mobileNumber || "your WhatsApp number"}`}
      onCancel={onClose}
      onSubmit={handleVerify}
      submitText="Verify OTP"
      loading={loading}
      width={450}
    >
      <div className="text-center">
        <div className="flex gap-2 justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onBlur={handleBlur}
              className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none transition-colors ${
                error
                  ? "border-red-500 text-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-primary text-gray-800"
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
        )}

        <p className="text-xs text-gray-400">
          Didn't receive code?{" "}
          <span className="text-primary font-semibold cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </CustomModal>
  );
}
