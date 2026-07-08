import api from "../libs/api";

export const createReview = async (payload) => {
  const response = await api.post("/reviews", payload);
  return response.data?.data || response.data;
};

export const getDoctorReviews = async (doctorId) => {
  if (!doctorId) return [];

  const response = await api.get(`/reviews/${doctorId}`);
  return response.data?.data || [];
};
