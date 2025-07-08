// controllers/attendanceController.js

import Attendance from "../models/attendence.model.js";
import mongoose from "mongoose";
import ExcelJS from "exceljs";


/// 🔵 Mark or update attendance for students (bulk write)
export const markAttendance = async (req, res) => {
    try {
        const { date, classId, students } = req.body;
        const schoolId = req.user.school; // from JWT
        const teacherId = req.user._id;

        if (!date || !classId || !Array.isArray(students)) {
            return res.status(400).json({ message: "Invalid or missing fields" });
        }

        const rawDate = new Date(date);
        const formattedDate = new Date(rawDate.setHours(0, 0, 0, 0)); // ← this is the fix

        const operations = students.map((record) => ({
            updateOne: {
                filter: { student: record.studentId, date: formattedDate },
                update: {
                    $set: {
                        school: schoolId,
                        student: record.studentId,
                        studentClass: classId,
                        present: record.present,
                        date: formattedDate,
                        markedBy: teacherId,
                        teacher_name: record.teacher_name
                    },
                },
                upsert: true,
            },
        }));

        await Attendance.bulkWrite(operations);

        res.status(200).json({ message: "Attendance marked successfully." });
    } catch (error) {
        console.error("Error in markAttendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


/// 🟡 Get attendance of a class by date (e.g., 10th A on 2025-07-01)
export const getAttendanceByDate = async (req, res) => {
    try {
        const { classId, date } = req.query;

        console.log("req.query:", req.query);


        if (!classId || !date) {
            return res.status(400).json({ message: "classId and date are required" });
        }

        const formattedDate = new Date(date);



        const records = await Attendance.find({
            studentClass: classId,
            date: formattedDate,
        })
            .populate("student", "student_name guardian_name guardian_phone")
            .populate("markedBy", "name");

        const total = records.length;
        const present = records.filter((r) => r.present).length;
        const absent = total - present;





        res.status(200).json({
            records,
            total,
            present,
            absent
        });
    } catch (error) {
        console.error("Error in getAttendanceByDate:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


/// 🟢 Get full attendance of a student (e.g., profile view)
export const getStudentAttendance = async (req, res) => {
    try {
        const { studentId } = req.params;

        const records = await Attendance.find({ student: studentId })
            .sort({ date: -1 })
            .populate("studentClass", "class_num")
            .populate("markedBy", "name");

        res.status(200).json(records);
    } catch (error) {
        console.error("Error in getStudentAttendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


/// 🟠 Update single attendance record (Admin or Teacher)
export const updateSingleAttendance = async (req, res) => {
    try {
        const { attendanceId } = req.params;
        const { present } = req.body;

        const record = await Attendance.findByIdAndUpdate(
            attendanceId,
            { present },
            { new: true }
        );

        if (!record) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        res.status(200).json({ message: "Attendance updated", record });
    } catch (error) {
        console.error("Error in updateSingleAttendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


/// 🔴 Delete attendance record (Admin only)
export const deleteAttendanceRecord = async (req, res) => {
    try {
        const { attendanceId } = req.params;

        const deleted = await Attendance.findByIdAndDelete(attendanceId);
        if (!deleted) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
        console.error("Error in deleteAttendanceRecord:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getDailyAttendanceSummary = async (req, res) => {
    try {
        const { classId, date } = req.query;

        if (!classId || !date) {
            return res.status(400).json({ message: "classId and date required" });
        }

        const formattedDate = new Date(date);

        const records = await Attendance.find({
            studentClass: classId,
            date: formattedDate,
        });

        const total = records.length;
        const present = records.filter((r) => r.present).length;
        const absent = total - present;

        res.status(200).json({
            date: formattedDate.toISOString().split("T")[0],
            classId,
            total,
            present,
            absent,
        });
    } catch (err) {
        console.error("Error in getDailyAttendanceSummary:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};






export const exportAttendanceExcel = async (req, res) => {
    try {
        const { classId, date } = req.query;

        const formattedDate = new Date(date);
        const records = await Attendance.find({
            studentClass: classId,
            date: formattedDate,
        }).populate("student", "student_name guardian_name guardian_phone");

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Attendance");

        sheet.columns = [
            { header: "Student Name", key: "name", width: 25 },
            { header: "Guardian", key: "guardian", width: 25 },
            { header: "Phone", key: "phone", width: 15 },
            { header: "Present", key: "present", width: 10 },
        ];

        records.forEach((r) => {
            sheet.addRow({
                name: r.student?.student_name,
                guardian: r.student?.guardian_name,
                phone: r.student?.guardian_phone,
                present: r.present ? "Yes" : "No",
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", `attachment; filename=attendance-${date}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error("Export Error:", err);
        res.status(500).json({ message: "Export failed" });
    }
};



export const getStudentAttendanceStats = async (req, res) => {
    try {
        const { studentId } = req.params;

        const records = await Attendance.find({ student: studentId });
        const total = records.length;
        const present = records.filter((r) => r.present).length;
        const absent = total - present;

        const percentage = total ? Math.round((present / total) * 100) : 0;

        res.status(200).json({
            studentId,
            total,
            present,
            absent,
            percentage,
        });
    } catch (err) {
        console.error("Attendance stats error:", err);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};




