import api from "../libs/api";

const AUTH_REQUEST_CONFIG = { skipAuthRedirect: true };

const normalizeAuthResponse = (response) => response.data?.data || response.data;

export const loginUser = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials,
    AUTH_REQUEST_CONFIG,
  );

  return normalizeAuthResponse(response);
};

export const registerUser = async (payload) => {
  const response = await api.post(
    "/auth/register",
    payload,
    AUTH_REQUEST_CONFIG,
  );

  return normalizeAuthResponse(response);
};

export const verifyOtp = async (payload) => {
  const response = await api.post(
    "/auth/verify-otp",
    payload,
    AUTH_REQUEST_CONFIG,
  );

  return normalizeAuthResponse(response);
};

export const isSuccessfulAuthResponse = (data) =>
  Boolean(data?.success || data?.accessToken);
