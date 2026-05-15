import React, { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import CustomModal from "./CustomModal";

export default function OTPModal({
  visible,
  onClose,
  onVerify,
  mobileNumber,
  loading = false,
  autoOtp = "", // Added autoOtp prop
  lockTimer = 0,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (visible) {
      if (autoOtp) {
        const otpArray = autoOtp.toString().split("").slice(0, 6);

        while (otpArray.length < 6) otpArray.push("");
        setOtp(otpArray);
        setError("");

        if (autoOtp.toString().length === 6 && !loading) {
          setTimeout(() => {
            onVerify?.(autoOtp.toString());
          }, 600);
        }
      } else {
        setOtp(["", "", "", "", "", ""]);
        setError("");
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    }
  }, [visible, autoOtp, loading]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    } else if (value && index === 5) {
      inputRefs.current[index].blur();
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
    if (loading) return;
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
      subtitle={
        <div className="flex flex-col gap-1 items-center">
          <p>
            {`Enter the code sent to ${mobileNumber || "your WhatsApp number"}`}
          </p>
          {lockTimer > 0 && (
            <p className="text-blue-600 font-mono text-[10px] flex items-center gap-1 bg-blue-50 w-fit px-2 py-0.5 rounded">
              Reservation expires in: {formatTimer(lockTimer)}
            </p>
          )}
        </div>
      }
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
