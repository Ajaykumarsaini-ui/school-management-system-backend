import StudentMessage from "../models/studentmessage.model.js";
import Student from "../models/student.model.js";


export const addStudentMessage = async (req, res) => {

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: "Message is required" });
    }

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("req.user:", req.user);

    const studentdata = await Student.findById(req.user._id);
        if (!studentdata) {
            return res.status(404).json({ message: "Student not found" });
        }
    



    try {
        const studentMessage = await StudentMessage.create({
            student: req.user._id,
            student_name: studentdata.student_name,
            message,
            attachment: req.file.path,
            school: req.user.schoolId, // Include the school ID in the request body  
        });
        res.status(201).json({ studentMessage, message: "Message added successfully", success: true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getStudentMessage = async (req, res) => {
    try {
        const studentMessage = await StudentMessage.find({ student: req.user._id });
        res.status(200).json(studentMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const deleteStudentMessage = async (req, res) => {
    try {
        const deleted = await StudentMessage.findByIdAndDelete(req.params.id);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getSingleStudentMessage = async (req, res) => {
    try {
        const studentMessage = await StudentMessage.findById(req.params.id);
        res.status(200).json(studentMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getallMessages = async (req, res) => {
    try {
        const studentMessage = await StudentMessage.find();
        res.status(200).json(studentMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};