import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCredentials } from "../../features/AuthSlice";
import api from "../../libs/api";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../../context/ToastContext";
import CustomModal from "./CustomModal";
import CustomTextField from "./CustomTextField";
import CountryCodeInput from "./countryCodeInput";
import { loginSchema } from "../../validation/validation";
import CustomSelect from "./CustomSelect";
import OTPModal from "./OTPModal";

export default function LoginModal({ visible, onCancel }) {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods; // Added formState for debugging
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [tempData, setTempData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLogin, setIsLogin] = useState(true); // Toggle state

  const dispatch = useDispatch();
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        // LOGIN FLOW: Direct login with whatsappnumber and password
        console.log("Login attempt:", {
          whatsappnumber: data.whatsappnumber,
          password: data.password,
        });

        const res = await api.post("/auth/login", {
          whatsappnumber: data.whatsappnumber,
          password: data.password,
        });

        console.log("Login response:", res.data);

        if (res.data?.data?.accessToken) {
          finalizeLogin(res.data.data);
        } else {
          showToast(
            res.data?.message || "Login failed: No access token received.",
            "error",
          );
        }
      } else {
        // SIGN UP FLOW: Register with whatsappnumber, password, and role
        console.log("Register attempt:", data);

        const res = await api.post("/auth/register", data);
        console.log("Register response:", res.data);

        // Always trigger OTP for registration success
        if (res.data?.success) {
          setTempData(data);
          setUserId(res.data.userId || res.data.data?.userId);
          setShowOTP(true);
          showToast(res.data.message || "OTP sent for verification", "info");
        } else {
          showToast(res.data?.message || "Registration failed", "error");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const finalizeLogin = (loginData) => {
    if (!loginData?.accessToken) {
      console.error("finalizeLogin called without accessToken");
      return;
    }

    const { accessToken, refreshToken, user: responseUser } = loginData;
    const decoded = jwtDecode(accessToken);

    // Prefer data from the 'user' object in the response, fallback to token
    const userData = {
      id: responseUser?._id || decoded.id || decoded._id || decoded.userId,
      // email: responseUser?.email || decoded.email || "",
      role: responseUser?.role || decoded.role,
      name:
        responseUser?.name ||
        decoded.name ||
        decoded.username ||
        decoded.email?.split("@")[0] ||
        "User",
      whatsappnumber: responseUser?.whatsappnumber || decoded.whatsappnumber,
      isVerified: responseUser?.isVerified ?? decoded.isVerified,
      status: responseUser?.status || decoded.status,
    };

    dispatch(
      setCredentials({
        token: accessToken,
        refreshToken: refreshToken || null,
        user: userData,
      }),
    );

    showToast("Login successful! Welcome back.", "success");
    onCancel();
  };

  const handleOTPVerify = async (otp) => {
    setIsLoading(true);
    try {
      // Verify OTP
      const res = await api.post("/auth/verify-otp", {
        userId,
        otp,
      });

      if (res.data?.success) {
        // If the verification response includes tokens, log in directly
        if (res.data.data?.accessToken) {
          finalizeLogin(res.data.data);
        } else {
          // If no tokens (registration flow success), auto-login using saved credentials
          showToast("Verification successful! Logging you in...", "success");

          const loginRes = await api.post("/auth/login", {
            whatsappnumber: tempData.whatsappnumber,
            password: tempData.password,
          });

          if (loginRes.data?.data?.accessToken) {
            finalizeLogin(loginRes.data.data);
          } else {
            // Fallback: switch to login mode if auto-login fails
            setIsLogin(true);
            showToast("Registration complete! Please sign in.", "info");
          }
        }
      } else {
        showToast(
          res.data?.message || "Invalid OTP. Please try again.",
          "error",
        );
      }
    } catch (error) {
      console.error("OTP Error:", error);
      showToast(
        error.response?.data?.message || "OTP verification failed",
        "error",
      );
    } finally {
      setIsLoading(false);
      setShowOTP(false);
    }
  };

  return (
    <CustomModal
      visible={visible}
      onCancel={onCancel}
      title="HealthCare Inc."
      subtitle={isLogin ? "Patient Portal Login" : "Create Patient Account"}
      showSubmit={false}
      width={450}
    >
      <div className="flex flex-col p-4 sm:p-6">
        {/* Debug: Show form errors */}

        {/* Email/Password Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CountryCodeInput
              name="whatsappnumber"
              label="Whatsapp Number"
              country={"pk"}
              required
            />

            <CustomTextField
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              required
            />

            {!isLogin && (
              <CustomSelect
                name="role"
                label="Role"
                placeholder="Select your role"
                options={[
                  { value: "patient", label: "Patient" },
                  { value: "doctor", label: "Doctor" },
                ]}
                required
              />
            )}

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center cursor-pointer text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-primary font-semibold hover:underline"
                // onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? isLogin
                  ? "Logging in..."
                  : "Registering..."
                : isLogin
                  ? "Sign In"
                  : "Sign Up"}
            </button>
          </form>
        </FormProvider>

        {/* Google Login */}

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary/80 font-bold ml-1 transition-colors"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        <div className="mt-8 text-center text-gray-400 text-[10px] sm:text-xs">
          <p>Secure • HIPAA Compliant • Encrypted</p>
        </div>
      </div>

      <OTPModal
        visible={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleOTPVerify}
        mobileNumber={tempData?.whatsappnumber}
        loading={isLoading}
      />
    </CustomModal>
  );
}
