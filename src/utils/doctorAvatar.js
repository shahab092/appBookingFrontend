const DOCTOR_AVATAR_BASE_URL = "https://avatar.iran.liara.run/public/doctor";

const normalizeGender = (gender) => String(gender || "").trim().toLowerCase();

export const getDoctorAvatarUrl = (doctor = {}) => {
  const image = doctor.image || doctor.profileImage || doctor.avatar;

  if (image) {
    return image;
  }

  const gender = normalizeGender(doctor.gender);
  const avatarGender = gender.startsWith("f") ? "female" : "male";
  const name = doctor.name || doctor.fullName || avatarGender;

  return `${DOCTOR_AVATAR_BASE_URL}?username=${encodeURIComponent(
    `${avatarGender}-${name}`,
  )}`;
};
