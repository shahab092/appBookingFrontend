import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCredentials } from "./../features/AuthSlice";
import api from "../libs/api";
import { jwtDecode } from "jwt-decode";

import CustomTextField from "../componenets/common/CustomTextField";
import { loginSchema } from "../validation/validation";
import { useToast } from "../context/ToastContext";
import CountryCodeInput from "../componenets/common/countryCodeInput";

const Xlogin = () => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const { handleSubmit } = methods;

  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Email/password login
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", data);
      const { accessToken, refreshToken } = res.data.data;

      const decoded = jwtDecode(accessToken);
      console.log(decoded, "all the user information");
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

      if (decoded.role === "admin") navigate("/admin/dashboard");
      else navigate("/patient/dashboard");
      showToast("Login successful! Welcome back.", "success");
    } catch (error) {
      showToast("Invalid email or password. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async (credential) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/google-login", { tokenId: credential });
      console.log(res, "response in the login page of user");
      dispatch(
        setCredentials({
          token: res.data.data.accessToken,
          user: res.data.data.user,
        }),
      );
      navigate("/patient/dashboard");
      showToast("Google login successful!", "success");
    } catch (err) {
      showToast("Google login failed!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => alert("Forgot password clicked");
  const handleSignUp = () => alert("Sign up clicked");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            HealthCare Inc.
          </h1>
          <h2 className="text-2xl text-gray-600 mb-4">Patient Portal Login</h2>
          <p className="text-gray-500 text-lg">
            Access your secure health information.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-xl p-10">
          {/* Google Login */}
          <GoogleLogin
            onSuccess={(res) => handleGoogleLogin(res.credential)}
            onError={() => alert("Google login failed")}
          />

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="mx-4 text-gray-500">or</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          {/* Email/Password Form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
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

              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-blue-600"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </button>
            </form>
          </FormProvider>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleSignUp}
                className="text-blue-600 hover:text-blue-800 font-bold"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-base">
          <p>Secure • HIPAA Compliant • Encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Xlogin;
