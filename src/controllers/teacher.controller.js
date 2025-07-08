// controllers/teacher.controller.js
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import Class from "../models/class.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

// GET ALL TEACHERS for the current school
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD TEACHER
export const addTeacher = async (req, res) => {
  let {
    teacher_name,
    email,
    qualification,
    age,
    gender,
    teacher_image,
    password,
  } = req.body;

  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("req.user:", req.user);


  teacher_image = req.file?.path;

  if (!teacher_image) {
    return res.status(400).json({ message: "Image upload failed" });
  }

  try {
    const existing = await Teacher.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let newTeacher = new Teacher({
      teacher_name,
      email,
      qualification,
      age,
      gender,
      teacher_image,
      password: hashedPassword,
      school: req.user.schoolId,
    });

    await newTeacher.save();
    newTeacher = await newTeacher.populate("school");
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error("Add Teacher Error:", error);

    res.status(500).json({ message: error.message });
  }
};

// LOGIN TEACHER
export const LoginTeacher = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res
        .status(404)
        .json({ message: "Teacher not found please register first." });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(teacher._id, teacher.school, "TEACHER");

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: teacher._id,
        teacher_name: teacher.teacher_name,
        email: teacher.email,
        qualification: teacher.qualification,
        age: teacher.age,
        gender: teacher.gender,
        teacher_image: teacher.teacher_image,
        role: "TEACHER",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TEACHER
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher || teacher.school.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TEACHER
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher || teacher.school.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deleted = await Teacher.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate("school");
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllclassassignedstudentTeacher = async (req, res) => {
  try {
    const Teacherassignedclass = await Class.find({ teacher: req.user._id });
    const Assignedstudents = await Student.find({ student_class_id: { $in: Teacherassignedclass.map((c) => c._id) } });
    res.status(200).json({
      "Teacherassignedclass": Teacherassignedclass,
      "Assignedstudents": Assignedstudents
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
