import StudentLeave from "../models/studentleave.model.js";
import Student from "../models/student.model.js";


export const createStudentLeave = async (req, res) => {
    const { fromDate, toDate, leaveReason } = req.body;

    console.log("req.body:", req.body)
    console.log("req.user:", req.user)

    
    if ( !fromDate || !toDate || !leaveReason) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const studentdata = await Student.findById(req.user._id);
    if (!studentdata) {
        return res.status(404).json({ message: "Student not found" });
    }

    try {
        const leave = new StudentLeave({
            school: req.user.schoolId,
            student : req.user._id,
            student_name: studentdata.student_name,
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


export const deleteStudentLeave = async (req, res) => {
    try {
        const deleted = await StudentLeave.findByIdAndDelete(req.params.id);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const patchStudentLeave = async (req, res) => {
  try {
    const { leaveStatus } = req.body;

    const updated = await StudentLeave.findByIdAndUpdate(
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


export const getallStudentLeave = async (req, res) => {
    try {
        const leaves = await StudentLeave.find();
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSingleStudentLeave = async (req, res) => {
    try {
        const leave = await StudentLeave.find( { student: req.user._id } );
        res.status(200).json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};









