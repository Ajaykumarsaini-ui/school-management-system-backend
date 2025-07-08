import jwt from "jsonwebtoken";

export const generateToken = (id, schoolId = null, role) => {
  const payload = {
    _id: id,
    role,
  };

  // Add tenant ID only if available
  if (schoolId) {
    payload.schoolId = schoolId;
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


