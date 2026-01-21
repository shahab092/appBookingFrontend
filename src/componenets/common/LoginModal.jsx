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
import CountryCodeInput from "./CountryCodeInput";
import { loginSchema } from "../../validation/validation";

export default function LoginModal({ visible, onCancel }) {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const { handleSubmit } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", data);
      const { accessToken, refreshToken } = res.data.data;

      const decoded = jwtDecode(accessToken);
      const userData = {
        email: decoded.email,
        role: decoded.role,
        id: decoded.id || decoded._id,
        name: decoded.name,
      };

      dispatch(
        setCredentials({
          token: accessToken,
          refreshToken,
          user: userData,
        }),
      );

      showToast("Login successful! Welcome back.", "success");
      onCancel(); // Close modal on success
    } catch (error) {
      showToast("Invalid email or password. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credential) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/google-login", { tokenId: credential });
      dispatch(
        setCredentials({
          token: res.data.data.accessToken,
          user: res.data.data.user,
        }),
      );
      showToast("Google login successful!", "success");
      onCancel();
    } catch (err) {
      showToast("Google login failed!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => alert("Forgot password clicked");
  const handleSignUp = () => alert("Sign up clicked");

  return (
    <CustomModal
      visible={visible}
      onCancel={onCancel}
      title="HealthCare Inc."
      subtitle="Patient Portal Login"
      showSubmit={false} // We have a separate submit button in form
      width={450}
    >
      <div className="flex flex-col">
        {/* Google Login */}
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={(res) => handleGoogleLogin(res.credential)}
            onError={() => alert("Google login failed")}
          />
        </div>

        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <div className="mx-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">
            or email login
          </div>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Email/Password Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CountryCodeInput
              name="phone"
              label="Phone Number"
              country={"pk"}
            />
            <CustomTextField
              name="email"
              label="Email or Username"
              placeholder="Enter your email"
            />
            <CustomTextField
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />

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
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 mt-2"
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </form>
        </FormProvider>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSignUp}
              className="text-primary hover:text-primary/80 font-bold ml-1 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>

        <div className="mt-8 text-center text-gray-400 text-[10px] sm:text-xs">
          <p>Secure • HIPAA Compliant • Encrypted</p>
        </div>
      </div>
    </CustomModal>
  );
}
