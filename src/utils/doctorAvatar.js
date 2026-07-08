const normalizeGender = (gender) => String(gender || "").trim().toLowerCase();

const encodeSvg = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const getAvatarPalette = (gender) => {
  const normalizedGender = normalizeGender(gender);

  if (normalizedGender.startsWith("f")) {
    return {
      background: "#C8CDDB",
      silhouette: "#FFFFFF",
      accent: "#D6D9E4",
    };
  }

  return {
    background: "#C1C8D8",
    silhouette: "#FFFFFF",
    accent: "#D4D8E3",
  };
};

const createSilhouetteAvatarSvg = (gender) => {
  const palette = getAvatarPalette(gender);
  const isFemale = normalizeGender(gender).startsWith("f");

  const headShape = isFemale
    ? '<path d="M95 96c0-29 18-52 45-52s45 23 45 52v31c0 30-20 55-45 55s-45-25-45-55V96z" fill="white"/>'
    : '<path d="M92 96c0-30 19-52 48-52s48 22 48 52v31c0 30-21 55-48 55s-48-25-48-55V96z" fill="white"/>';

  const shoulderShape = isFemale
    ? '<path d="M35 226c8-19 24-33 50-43l33-13c8 10 14 15 22 15s15-5 23-15l33 13c26 10 42 24 50 43H35z" fill="white"/>'
    : '<path d="M31 226c10-22 29-36 59-47l30-11c6 8 12 12 20 12s14-4 20-12l30 11c30 11 49 25 59 47H31z" fill="white"/>';

  const neckShape = isFemale
    ? '<path d="M119 160h42v27c0 12-9 22-21 22s-21-10-21-22v-27z" fill="white"/>'
    : '<path d="M118 158h44v30c0 13-10 23-22 23s-22-10-22-23v-30z" fill="white"/>';

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 240" role="img" aria-label="Doctor avatar">
      <rect width="280" height="240" rx="14" fill="${palette.background}"/>
      <path d="M20 224c30-22 67-35 120-35s90 13 120 35" fill="${palette.accent}" opacity="0.38"/>
      ${shoulderShape}
      ${neckShape}
      ${headShape}
      <path d="M91 108h-6c-5 0-8 4-8 10v18c0 7 4 12 10 12h7l-3-40z" fill="white"/>
      <path d="M189 108h6c5 0 8 4 8 10v18c0 7-4 12-10 12h-7l3-40z" fill="white"/>
      ${
        isFemale
          ? '<path d="M96 100c4-35 21-56 44-56 24 0 41 21 45 56-13-16-27-24-45-24s-31 8-44 24z" fill="white"/>'
          : '<path d="M95 78c7-21 23-34 45-34 23 0 39 13 46 34-13-7-28-11-46-11s-32 4-45 11z" fill="white"/>'
      }
    </svg>
  `;
};

export const getDoctorAvatarUrl = (doctor = {}) => {
  const image = doctor.image || doctor.profileImage || doctor.avatar;

  if (image) {
    return image;
  }

  return encodeSvg(createSilhouetteAvatarSvg(doctor.gender));
};
