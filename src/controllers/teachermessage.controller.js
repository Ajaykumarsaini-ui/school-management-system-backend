import TeacherMessage from "../models/teachermessages.model.js";
import Teacher from "../models/teacher.model.js";


export const addteacherMessage = async (req, res) => {

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: "Message is required" });
    }

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("req.user:", req.user);

    const teacherdata = await Teacher.findById(req.user._id);
        if (!teacherdata) {
            return res.status(404).json({ message: "teacher not found" });
        }
    
    try {
        const teacherMessage = await TeacherMessage.create({
            teacher: req.user._id,
            teacher_name: teacherdata.teacher_name,
            message,
            attachment: req.file.path,
            school: req.user.schoolId, // Include the school ID in the request body  
        });
        res.status(201).json({ teacherMessage, message: "Message added successfully", success: true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getteacherMessage = async (req, res) => {
    try {
        const teacherMessage = await TeacherMessage.find({ teacher: req.user._id });
        res.status(200).json(teacherMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteteacherMessage = async (req, res) => {
    try {
        const deleted = await TeacherMessage.findByIdAndDelete(req.params.id);
        res.status(200).json(deleted);
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};


export const getSingleteacherMessage = async (req, res) => {
    try {
        const teacherMessage = await TeacherMessage.findById(req.params.id);
        res.status(200).json(teacherMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getallMessages = async (req, res) => {
    try {
        const teacherMessage = await TeacherMessage.find();
        res.status(200).json(teacherMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};