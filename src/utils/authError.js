const DEFAULT_AUTH_ERROR = "Something went wrong. Please try again.";

export const getAuthErrorMessage = (error, fallbackMessage = DEFAULT_AUTH_ERROR) => {
  if (!error?.response) {
    return "We could not reach the server. Please check your connection and try again.";
  }

  const { status, data } = error.response;
  const serverMessage = data?.message || data?.error;

  if (status === 400) {
    return serverMessage || "Please check the details you entered and try again.";
  }

  if (status === 401) {
    return "The WhatsApp number or password is incorrect.";
  }

  if (status === 403) {
    return serverMessage || "Your account does not have permission to access this portal.";
  }

  if (status === 404) {
    return serverMessage || "We could not find an account with these details.";
  }

  if (status >= 500) {
    return "Something went wrong on our side. Please try again in a moment.";
  }

  return serverMessage || fallbackMessage;
};
