import TeacherLeave from "../models/teacherleave.model.js";
import Teacher from "../models/teacher.model.js";


export const createteacherLeave = async (req, res) => {
    const { fromDate, toDate, leaveReason } = req.body;

    console.log("req.body:", req.body)
    console.log("req.user:", req.user)

    
    if ( !fromDate || !toDate || !leaveReason) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const teacherdata = await Teacher.findById(req.user._id);
    if (!teacherdata) {
        return res.status(404).json({ message: "teacher not found" });
    }

    try {
        const leave = new TeacherLeave({
            school: req.user.schoolId,
            teacher : req.user._id,
            teacher_name: teacherdata.teacher_name,
            fromDate,
            toDate,
            leaveReason,
            leaveStatus: "pending",
        })
        await leave.save();
        res.status(201).json(leave);
    } catch (error) {
        console.error("Error creating leave:", error);
        res.status(500).json({ error: error.message });
    }
};


export const deleteteacherLeave = async (req, res) => {
    try {
        const deleted = await TeacherLeave.findByIdAndDelete(req.params.id);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const patchteacherLeave = async (req, res) => {
  try {
    const { leaveStatus } = req.body;

    const updated = await TeacherLeave.findByIdAndUpdate(
      req.params.id,
      {
        leaveStatus, // ✅ Use correct field name
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getallteacherLeave = async (req, res) => {
    try {
        const leaves = await TeacherLeave.find();
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSingleteacherLeave = async (req, res) => {
    try {
        const leave = await TeacherLeave.find( { teacher: req.user._id } );
        res.status(200).json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};









