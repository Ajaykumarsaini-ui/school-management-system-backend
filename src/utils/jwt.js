import jwt from "jsonwebtoken";

export const generateRefreshToken = (id, schoolId = null, role) => {
  const payload = {
    _id: id,
    role,
  };

  // Add tenant ID only if available
  if (schoolId) {
    payload.schoolId = schoolId;
  }

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
export const generateAccessToken = (id, schoolId = null, role) => {
  const payload = {
    _id: id,
    role,
  };

  // Add tenant ID only if available
  if (schoolId) {
    payload.schoolId = schoolId;
  }

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};


