import Class from "../models/class.model.js";
import Teacher from "../models/teacher.model.js";

export const getClass = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes" });
  }
};


export const addClass = async (req, res) => {
  const { class_students, class_subjects, class_text, class_num, attendee } = req.body;

  if (!class_students || !class_subjects || !class_text || !class_num || !attendee) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("req.body:", req.body);
  console.log("req.user:", req.user);

  try {
    // Find the teacher by name (case-insensitive match)
    const teacher = await Teacher.findOne({
      teacher_name: { $regex: new RegExp(`^${attendee}$`, "i") }
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Create the class with teacher ID and name
    const newClass = await Class.create({
      school: req.user.schoolId,
      class_students,
      class_subjects,
      class_text,
      class_num,
      attendee: teacher.teacher_name,  // Save teacher name
      teacher: teacher._id             // Save teacher ID
    });

    // Populate school + teacher info
    const populatedClass = await Class.findById(newClass._id)
      .populate("school", "school_name email")
      .populate("teacher", "teacher_name email");

    res.status(201).json(populatedClass);
  } catch (error) {
    console.error("Add Class Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const deleted = await Class.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Error deleting class" });
  }
};

export const updateClass = async (req, res) => {
  try {
    const updated = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating class" });
  }
};



