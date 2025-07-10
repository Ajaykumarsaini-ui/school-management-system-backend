import bcrypt from "bcryptjs"; // ya "bcrypt" jo aap use kar rahe ho
import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import Class from "../models/class.model.js";

// Register Student
export const addStudent = async (req, res) => {
  const {
    student_name,
    email,
    student_class,
    age,
    gender,
    guardian_name,
    guardian_phone,
    student_password,
    status,
  } = req.body;


  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("req.user:", req.user);

  try {
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const classExists = await Class.findById(student_class);
    if (!classExists) {
      return res.status(400).json({ message: "Class does not exist" });
    }


    const hashedPassword = await bcrypt.hash(student_password, 10);

    let newStudent = new Student({
      student_name,
      student_class_id: classExists._id,
      email,
      student_class: classExists.class_num,
      age,
      gender,
      student_image: req.file?.path,
      guardian_name,
      guardian_phone,
      status,
      student_password: hashedPassword,
      school: req.user.schoolId,
    });

    await newStudent.save(); // ✅ Add this line


    res
      .status(201)
      .json({ message: "Student registered", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Student

export const LoginStudent = async (req, res) => {
  const { email, password } = req.body; // 🟢 Yahan password lo client se

  // ✅ Input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // ✅ Find student
    const student = await Student.findOne({ email });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found. Please register first." });
    }

    // ✅ Check if student_password exists
    if (!student.student_password) {
      return res.status(500).json({ message: "Student password not set in database." });
    }

    // ✅ Compare password safely
    const isPasswordValid = await bcrypt.compare(password, student.student_password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." }); // Better generic msg
    }

    // ✅ Generate token
    const AccessToken = generateAccessToken(student._id, student.school, "STUDENT");

    const RefreshToken = generateRefreshToken(student._id, student.school, "STUDENT");
    student.refreshToken = RefreshToken;
    await student.save();


    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      secure: true, // set to false only in development
      sameSite: "Strict", // or "None" if cross-site
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


    // ✅ Send success response
    res.status(200).json({
      message: "Login successful",
      token: AccessToken,
      user: {
        _id: student._id,
        student_name: student.student_name,
        email: student.email,
        student_class: student.student_class,
        age: student.age,
        gender: student.gender,
        student_image: student.student_image,
        role: "STUDENT",
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// Get All Students
export const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 2,
      sort: { student_class: 1 },

    }



    const students = await Student.paginate({}, options);
    // const students = await Student.find().populate("school");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleStudent = async (req, res) => {
  try {


    const student = await Student.findById(req.params.id).populate("school");
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
