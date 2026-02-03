import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCredentials } from "../../features/AuthSlice";
import api from "../../libs/api";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../../context/ToastContext";
import CustomModal from "./CustomModal";
import CustomTextField from "./CustomTextField";
import CountryCodeInput from "./CountryCodeInput";
import { loginSchema } from "../../validation/validation";
import CustomSelect from "./CustomSelect";
import OTPModal from "./OTPModal";

export default function LoginModal({ visible, onCancel, selectedRole }) {
  const [isLogin, setIsLogin] = useState(true);

  // Format role for display
  const formatRoleName = (role) => {
    if (!role) return "User";

    // Handle special cases
    if (role.toLowerCase() === "doctor") return "Doctor";
    if (role.toLowerCase() === "patient") return "Patient";
    if (role.toLowerCase() === "pharmacy") return "Pharmacy";
    if (role.toLowerCase() === "laboratory") return "Laboratory";
    if (role.toLowerCase() === "admin") return "Admin";

    // Default: capitalize first letter
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  // Get appropriate title and subtitle based on role and mode
  const getTitle = () => {
    if (!selectedRole) return "HealthCare Inc.";

    const roleName = formatRoleName(selectedRole);

    if (isLogin) {
      return `${roleName} Portal`;
    } else {
      return `Join as ${roleName}`;
    }
  };

  const getSubtitle = () => {
    if (!selectedRole) {
      return isLogin
        ? "Welcome back! Please sign in to continue."
        : "Create your account to get started.";
    }

    const roleName = formatRoleName(selectedRole);

    if (isLogin) {
      return `Sign in to your ${roleName} account`;
    } else {
      return `Register as a ${roleName} on our platform`;
    }
  };

  const getModalWidth = () => {
    // Adjust width based on role for better visual presentation
    switch (selectedRole?.toLowerCase()) {
      case "doctor":
        return 500;
      case "pharmacy":
      case "laboratory":
        return 480;
      default:
        return 450;
    }
  };

  // Pass isSignup context to schema for conditional validation
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
    context: { isSignup: !isLogin }, // Pass context to schema
    defaultValues: {
      whatsappnumber: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [storeOtp, setStoreOtp] = useState(null);
  const [registrationData, setRegistrationData] = useState(null); // To store signup data
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Log validation errors for debugging
  if (Object.keys(errors).length > 0) {
    console.log("Validation Errors:", errors);
  }

  // Watch values
  const formValues = watch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        // LOGIN FLOW
        const res = await api.post("/auth/login", {
          whatsappnumber: data.whatsappnumber,
          password: data.password,
          role: selectedRole || data.role, // Send role with login
        });

        if (
          res.data?.success ||
          res.data?.data?.accessToken ||
          res.data?.accessToken
        ) {
          const loginData = res.data.data || res.data;
          if (loginData.accessToken) {
            finalizeLogin(loginData);
          } else {
            showToast("Login failed: Access token missing.", "error");
          }
        } else {
          showToast(res.data?.message || "Login failed.", "error");
        }
      } else {
        const { confirmPassword, ...registerData } = data;

        // Add selectedRole to registration data
        const registrationPayload = {
          ...registerData,
          role: selectedRole || "patient", // Default to patient if no role selected
        };

        const res = await api.post("/auth/register", registrationPayload);

        if (res.data?.success) {
          console.log(res.data, "registration user response");

          const receivedOtp = res.data.otp || res.data.data?.otp;
          if (receivedOtp) {
            setStoreOtp(receivedOtp);
          }

          setRegistrationData(registerData); // Save data for possible login later
          setUserId(res.data.userId || res.data.data?.userId);
          showToast(res.data.message || "OTP sent for verification", "info");
          setShowOTP(true);
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

    const userData = {
      id: responseUser?._id || decoded.id || decoded._id || decoded.userId,
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
      const res = await api.post("/auth/verify-otp", {
        userId,
        otp,
      });

      if (res.data?.success) {
        const loginData = res.data.data || res.data;
        if (loginData?.accessToken) {
          finalizeLogin(loginData);
        } else {
          showToast("Verification successful! Logging you in...", "success");

          const loginRes = await api.post("/auth/login", {
            whatsappnumber:
              registrationData?.whatsappnumber || formValues.whatsappnumber,
            password: registrationData?.password || formValues.password,
          });

          const autoLoginData = loginRes.data.data || loginRes.data;
          if (autoLoginData?.accessToken) {
            finalizeLogin(autoLoginData);
          } else {
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
      setStoreOtp(null); // Reset storeOtp after verification attempts
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    // Reset form when switching modes
    reset({
      whatsappnumber: "",
      password: "",
      confirmPassword: "",
      role: selectedRole || "",
    });
    setStoreOtp(null); // Reset OTP when switching modes
  };

  return (
    <CustomModal
      visible={visible}
      onCancel={onCancel}
      title={getTitle()}
      subtitle={getSubtitle()}
      showSubmit={false}
      width={getModalWidth()}
    >
      <div className="flex flex-col p-4 sm:p-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CountryCodeInput
              name="whatsappnumber"
              label="WhatsApp Number"
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

            {/* Show confirm password only for signup */}
            {!isLogin && (
              <>
                <CustomTextField
                  name="confirmPassword" // Use camelCase to match schema
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  required
                />

                {/* Optional: Show password match indicator */}
                {formValues.password && formValues.confirmPassword && (
                  <div
                    className={`text-xs ${formValues.password === formValues.confirmPassword ? "text-green-600" : "text-red-600"}`}
                  >
                    {formValues.password === formValues.confirmPassword
                      ? "✓ Passwords match"
                      : "✗ Passwords do not match"}
                  </div>
                )}
              </>
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

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={handleToggleMode}
              className="text-primary hover:text-primary/80 font-bold ml-1 transition-colors"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>

      <OTPModal
        visible={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleOTPVerify}
        mobileNumber={formValues.whatsappnumber}
        loading={isLoading}
        autoOtp={storeOtp}
      />
    </CustomModal>
  );
}
