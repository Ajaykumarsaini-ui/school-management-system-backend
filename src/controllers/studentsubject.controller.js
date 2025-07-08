import Subject from "../models/subject.model.js";
import Class from "../models/class.model.js";
import Student from "../models/student.model.js";


export const studentSubject = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const subjects = await Subject.find({ add_class_name : student.student_class });
        res.status(200).json({
            success: true,
            data: subjects,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

