import { token } from "morgan";
import School from "../models/school.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";
// import {
//   generateAccessToken,
//   generateRefreshToken,
// } from "../utils/generateTokens.js";


export const addSchool = async (req, res) => {
  const { school_name, email, owner_name, password } = req.body;

  try {
    // check if image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "School image is required" });
    }

    const existing = await School.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const school_image = req.file.path;

    const newSchool = new School({
      school_name,
      email,
      owner_name,
      school_image,
      password: hashedPassword,
    });

    await newSchool.save();
    res.status(201).json({ message: "School registered", school: newSchool });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: error.message });
  }
};

export const getSchools = async (req, res) => {
  try {
    const schools = await School.find().select("school_name school_image");
    res.status(200).json(schools);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const loginSchool = async (req, res) => {
  const { email, password } = req.body;

  try {
    const school = await School.findOne({ email });
    if (!school) return res.status(404).json({ message: "School not found" });

    const isPasswordValid = await bcrypt.compare(password, school.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(school._id  , school._id, "SCHOOL");

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: school._id,
        school_name: school.school_name,
        email: school.email,
        owner_name: school.owner_name,
        school_image: school.school_image,
        role: "SCHOOL",
        
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSchool = async (req, res) => {
  try {
    const deleted = await School.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSchool = async (req, res) => {
  try {
    const updated = await School.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
