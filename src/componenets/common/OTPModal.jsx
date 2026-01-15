import React, { useState, useRef, useEffect } from "react";
import { Modal } from "antd";

export default function OTPModal({ visible, onClose, onVerify, mobileNumber }) {
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
    if (otpString !== "123456") {
      setError("Invalid OTP. Please try again.");
      return;
    }
    setError("");
    onVerify(otpString);
  };

  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={onClose}
      centered
      width={400}
      className="p-0 otp-modal"
    >
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-500 mb-8">
          Enter the code sent to {mobileNumber || "your WhatsApp number"}
        </p>

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

        <button
          onClick={handleVerify}
          className="w-full bg-primary text-white rounded-xl py-3 font-semibold hover:opacity-90 transition shadow-lg"
        >
          Verify & Book
        </button>

        <p className="text-xs text-gray-400 mt-6">
          Didn't receive code?{" "}
          <span className="text-primary font-semibold cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </Modal>
  );
}
