import ExamSchedule from "../models/examschedule.model.js";
import Class from "../models/class.model.js";
import Subject from "../models/subject.model.js";

export const addExamSchedule = async (req, res) => {
  try {
    const {
      class_id,
      section,    // Assuming this is section name (e.g. "A")
      subject_id,
      exam_date,
      start_time,
      end_time,
    } = req.body;

    console.log("got data ", req.body);


    // ✅ Validate required fields
    if (!class_id || !section || !subject_id || !exam_date || !start_time || !end_time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Fetch class, subject, and section data in parallel
    const [classData, subjectData] = await Promise.all([
      Class.findById(class_id),
      Subject.findById(subject_id),
    ]);

    if (!classData) {
      return res.status(404).json({ message: "Class not found." });
    }

    if (!subjectData) {
      return res.status(404).json({ message: "Subject not found." });
    }


    // ✅ Check for duplicate exam schedule (same class, section, subject, date, and time)
    // const existingSchedule = await examscheduleModel.findOne({
    //   school: req.user.id,
    //   class_id,
    //   subject_id,
    //   exam_date,
    //   start_time,
    //   end_time,
    // });

    // if (existingSchedule) {
    //   return res.status(409).json({
    //     message: "An exam schedule already exists for this class, section, subject, date, and time.",
    //   });
    // }

    // ✅ Create exam schedule
    const newSchedule = await ExamSchedule.create({
      school: req.user.schoolId,
      class_id,
      class_name: classData.class_num,
      section,
      subject_id,
      subject: subjectData.subject_name,
      exam_date,
      start_time,
      end_time,
    });

    res.status(201).json({
      message: "Exam schedule created successfully.",
      data: newSchedule,
    });

  } catch (error) {
    console.error("Add Exam Schedule Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export const getAllExams = async (req, res) => {
  try {
    // Optional: limit and skip for pagination (if you want)
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;

    const exams = await ExamSchedule.find({})
      .sort({ createdAt: -1 })  // Newest first
      .skip(skip)
      .limit(limit)
      .lean(); // Improves performance if you just need plain JS objects

    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams
    });

  } catch (error) {
    console.error("Error fetching exams:", error);  // Better logging
    res.status(500).json({
      success: false,
      message: "Failed to fetch exams",
      error: error.message
    });
  }
};



export const deleteExamschedule = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam schedule ID"
      });
    }

    const deleted = await ExamSchedule.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Exam schedule not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam schedule deleted successfully",
      data: deleted
    });

  } catch (error) {
    console.error("Error deleting exam schedule:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting exam schedule",
      error: error.message
    });
  }
};




