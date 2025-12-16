import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { setCredentials } from "./../features/AuthSlice";
import axios from "axios";
import api from "../libs/api";
import { jwtDecode } from "jwt-decode";

const Xlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Email/password login
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const res = await api.post(
  //       "/auth/login",
  //       { email, password },
  //       { withCredentials: true }
  //     );

  //     dispatch(
  //       setCredentials({
  //         token: res.data.data.accessToken,
  //         refreshToken: res.data.data.refreshToken,
  //         user: res.data.data.user,
  //       })
  //     );

  //     navigate("/dashboardme");
  //     alert("Login successful!");
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     alert("Invalid username or password.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = res.data.data;

      // Decode token
      const decoded = jwtDecode(accessToken);

      // Build user object manually
      const userData = {
        email: decoded.email,
        role: decoded.role,
        id: decoded.id || decoded._id,
      };

      dispatch(
        setCredentials({
          token: accessToken,
          refreshToken,
          user: userData,
        })
      );

    
      if (decoded.role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async (credential) => {
    setIsLoading(true);
    try {
      const res = await api.post(
        "/auth/google-login",
        { tokenId: credential },
        { withCredentials: true }
      );
      console.log(res, "response in the login section");
      dispatch(
        setCredentials({
          token: res.data.data.accessToken,
          user: res.data.data.user,
        })
      );

      navigate("/patient/dashboard");
      alert("Google login successful!");
    } catch (err) {
      console.error("Google login error:", err);
      alert("Google login failed!");
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Username"
              className="w-full mb-4 px-4 py-3 border-2 border-gray-200 rounded-lg"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full mb-4 px-4 py-3 border-2 border-gray-200 rounded-lg"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </form>

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
