import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../../features/AuthSlice";
import api from "../../libs/api";
import { useToast } from "../../context/ToastContext";
import CustomModal from "./CustomModal";
import CustomTextField from "./CustomTextField";
import CountryCodeInput from "./CountryCodeInput";
import OTPModal from "./OTPModal";
import { loginSchema } from "../../validation/validation";
import { getAuthErrorMessage } from "../../utils/authError";
import {
  isSuccessfulAuthResponse,
  loginUser,
  registerUser,
  verifyOtp,
} from "../../services/authService";

const DEFAULT_FORM_VALUES = {
  whatsappnumber: "",
  password: "",
  confirmPassword: "",
  role: "",
};

const ROLE_LABELS = {
  doctor: "Doctor",
  patient: "Patient",
  pharmacy: "Pharmacy",
  laboratory: "Laboratory",
  admin: "Admin",
};

const getRoleLabel = (role) => {
  if (!role) return "User";

  const normalizedRole = role.toLowerCase();
  return (
    ROLE_LABELS[normalizedRole] || role.charAt(0).toUpperCase() + role.slice(1)
  );
};

const getModalWidth = (role) => {
  switch (role?.toLowerCase()) {
    case "doctor":
      return 500;
    case "pharmacy":
    case "laboratory":
      return 480;
    default:
      return 450;
  }
};

const getAuthCopy = ({ isLogin, selectedRole }) => {
  if (!selectedRole) {
    return {
      title: "HealthCare Inc.",
      subtitle: isLogin
        ? "Welcome back! Please sign in to continue."
        : "Create your account to get started.",
    };
  }

  const roleLabel = getRoleLabel(selectedRole);

  return {
    title: isLogin ? `${roleLabel} Portal` : `Join as ${roleLabel}`,
    subtitle: isLogin
      ? `Sign in to your ${roleLabel} account`
      : `Register as a ${roleLabel} on our platform`,
  };
};

const createUserFromToken = (loginData) => {
  const { accessToken, user: responseUser } = loginData;
  const decoded = jwtDecode(accessToken);

  return {
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
};

export default function LoginModal({ visible, onCancel, selectedRole }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [storeOtp, setStoreOtp] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const { showToast } = useToast();

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
    context: { isSignup: !isLogin },
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const { handleSubmit, reset, watch } = methods;
  const formValues = watch();

  const modalCopy = useMemo(
    () => getAuthCopy({ isLogin, selectedRole }),
    [isLogin, selectedRole],
  );

  useEffect(() => {
    if (visible) {
      setFormError("");
    }
  }, [visible, isLogin]);

  const showFormError = (message) => {
    setFormError(message);
    showToast(message, "error");
  };

  const finalizeLogin = (loginData) => {
    if (!loginData?.accessToken) {
      showFormError("Login failed because the server did not return a session token.");
      return;
    }

    try {
      const userData = createUserFromToken(loginData);

      dispatch(
        setCredentials({
          token: loginData.accessToken,
          refreshToken: loginData.refreshToken || null,
          user: userData,
        }),
      );

      setFormError("");
      showToast("Login successful! Welcome back.", "success");
      onCancel();
    } catch (error) {
      console.error("Token decode error:", error);
      showFormError("Login failed because the session token is invalid.");
    }
  };

  const handleLogin = async (data) => {
    const loginData = await loginUser({
      whatsappnumber: data.whatsappnumber,
      password: data.password,
      role: selectedRole || data.role,
    });

    if (!isSuccessfulAuthResponse(loginData)) {
      showFormError(loginData?.message || "Login failed. Please try again.");
      return;
    }

    finalizeLogin(loginData);
  };

  const handleRegister = async (data) => {
    const registerData = {
      whatsappnumber: data.whatsappnumber,
      password: data.password,
    };
    const payload = {
      ...registerData,
      role: selectedRole || "patient",
    };

    const registerDataResponse = await registerUser(payload);

    if (!registerDataResponse?.success) {
      showFormError(
        registerDataResponse?.message || "Registration failed. Please try again.",
      );
      return;
    }

    setStoreOtp(
      registerDataResponse.otp || registerDataResponse.data?.otp || null,
    );
    setRegistrationData(registerData);
    setUserId(registerDataResponse.userId || registerDataResponse.data?.userId);
    showToast(registerDataResponse.message || "OTP sent for verification", "info");
    setShowOTP(true);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setFormError("");

    try {
      if (isLogin) {
        await handleLogin(data);
      } else {
        await handleRegister(data);
      }
    } catch (error) {
      console.error("Auth form error:", error);
      showFormError(
        getAuthErrorMessage(
          error,
          isLogin ? "Login failed. Please try again." : "Registration failed. Please try again.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otp) => {
    setIsLoading(true);
    setFormError("");

    try {
      const verificationData = await verifyOtp({ userId, otp });

      if (!verificationData?.success) {
        showFormError(verificationData?.message || "Invalid OTP. Please try again.");
        return;
      }

      if (verificationData?.accessToken) {
        finalizeLogin(verificationData);
        return;
      }

      showToast("Verification successful! Logging you in...", "success");

      const loginData = await loginUser({
        whatsappnumber:
          registrationData?.whatsappnumber || formValues.whatsappnumber,
        password: registrationData?.password || formValues.password,
      });

      if (loginData?.accessToken) {
        finalizeLogin(loginData);
        return;
      }

      setIsLogin(true);
      showToast("Registration complete! Please sign in.", "info");
    } catch (error) {
      console.error("OTP error:", error);
      showFormError(
        getAuthErrorMessage(error, "OTP verification failed. Please try again."),
      );
    } finally {
      setIsLoading(false);
      setShowOTP(false);
      setStoreOtp(null);
    }
  };

  const handleToggleMode = () => {
    const nextIsLogin = !isLogin;

    setIsLogin(nextIsLogin);
    setFormError("");
    setStoreOtp(null);
    setRegistrationData(null);
    setUserId(null);
    reset({
      ...DEFAULT_FORM_VALUES,
      role: selectedRole || "",
    });
  };

  return (
    <CustomModal
      visible={visible}
      onCancel={onCancel}
      title={modalCopy.title}
      subtitle={modalCopy.subtitle}
      showSubmit={false}
      width={getModalWidth(selectedRole)}
    >
      <div className="flex flex-col p-4 sm:p-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {formError && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
              >
                {formError}
              </div>
            )}

            <CountryCodeInput
              name="whatsappnumber"
              label="WhatsApp Number"
              country="pk"
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
              <>
                <CustomTextField
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  required
                />

                {formValues.password && formValues.confirmPassword && (
                  <div
                    className={`text-xs ${
                      formValues.password === formValues.confirmPassword
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formValues.password === formValues.confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </div>
                )}
              </>
            )}

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center cursor-pointer text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
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


