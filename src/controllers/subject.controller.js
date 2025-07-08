import Subject from "../models/subject.model.js";
import Class from "../models/class.model.js";
import Teacher from "../models/teacher.model.js";

export const addSubject = async (req, res) => {
  try {
    let {
      subject_name,
      subjectType,
      addclass,
      // teacher,
      subject_code 
    } = req.body;

    // Validate fields
    if (!subject_name || !subjectType || !addclass || !subject_code) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate syllabus file
     const syllabusFile = req.file?.path;
    if (!syllabusFile) {
      return res.status(400).json({ message: "Syllabus file is required" });
    }

    // Check if subject_code exists
    const existing = await Subject.findOne({ subject_code });
    if (existing) {
      return res.status(400).json({ message: "Subject code already exists" });
    }

    // Validate class
    const classExists = await Class.findById(addclass);
    if (!classExists) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Validate teacher
    // const teacherExists = await Teacher.findById(teacher);
    // if (!teacherExists) {
    //   return res.status(404).json({ message: "Teacher not found" });
    // }

    // Create subject
    const newSubject = await Subject.create({
      school: req.user.schoolId,  // From token/session
      subject_name,
      syllabusFile,
      subjectType,
      addclass,
      // teacher,
      subject_code ,
      add_class_name: classExists.class_num,
      // add_teacher_name: teacherExists.teacher_name
    });

    // Populate for response (optional)
    const populatedSubject = await Subject.findById(newSubject._id)
      .populate("school", "school_name email")
      .populate("addclass", "class_text class_num")
      .populate("teacher", "teacher_name email");

    res.status(201).json(populatedSubject);
  } catch (error) {
    console.error("Add Subject Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("school");
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate("school");
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteSubject = async (req, res) => {
  try {
    const deleted = await Subject.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateSubject = async (req, res) => {
  try {
    const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


