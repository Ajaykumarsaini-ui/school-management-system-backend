// controllers/auth.controller.js

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import School from "../models/school.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";

export const refreshAccessToken = (req, res) => {
  const token = req.cookies.RefreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired refresh token" });

    req.user = decoded; // Attach user info to request

    const userId = req.user._id;
    const role = req.user.role;
    const schoolId = req.user.schoolId;


    const newAccessToken = jwt.sign(
      { userId, role, schoolId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      token: newAccessToken,
      role,
      userId,
      schoolId
    });
  });
};


export const logout = async (req, res) => {
  console.log("🍪 Cookies received:", req.cookies);

  const cookies = req.cookies;
  if (!cookies?.RefreshToken) {
    console.log("❌ No refresh token found in cookies");
    return res.sendStatus(404);
  }

  const refreshToken = cookies.RefreshToken;
  console.log("🔑 RefreshToken:", refreshToken);

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log("✅ Decoded Token:", decoded);
  } catch (err) {
    console.log("❌ Invalid Token:", err.message);
    res.clearCookie("RefreshToken", {
      httpOnly: true,
      secure: false, // use false for localhost
      sameSite: "Strict",
      path: "/"
    });
    return res.sendStatus(403);
  }

  // Choose user model
  let userModel;
  switch (decoded.role) {
    case "SCHOOL": userModel = School; break;
    case "STUDENT": userModel = Student; break;
    case "TEACHER": userModel = Teacher; break;
    default: return res.sendStatus(400);
  }

  const user = await userModel.findOne({ refreshToken });
  if (user) {
    console.log("✅ Found user:", user);
    user.refreshToken = "";
    await user.save();
  } else {
    console.log("⚠️ User not found in DB for this token");
  }

  // Clear cookie
  res.clearCookie("RefreshToken", {
    httpOnly: true,
    secure: false, // for localhost
    sameSite: "Strict",
    path: "/"
  });

  return res.sendStatus(204);
};
