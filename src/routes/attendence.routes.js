import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { 
    markAttendance, 
    getAttendanceByDate, 
    getStudentAttendance, 
    updateSingleAttendance, 
    deleteAttendanceRecord, 
    getDailyAttendanceSummary, 
    exportAttendanceExcel, 
    getStudentAttendanceStats 
} from "../controllers/attendence.controller.js";

const attendenceRouter = () => {
    const router = express.Router();

    router.post("/mark", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), markAttendance);
    router.get("/by-date", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), getAttendanceByDate);
    router.get("/student/:studentId", verifyToken, authorizeRoles("SCHOOL", "TEACHER" , "STUDENT"), getStudentAttendance);
    router.put("/:attendanceId", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), updateSingleAttendance);
    router.delete("/:attendanceId", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), deleteAttendanceRecord);
    router.get("/summary", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), getDailyAttendanceSummary);
    router.get("/export/excel", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), exportAttendanceExcel);
    router.get("/stats/student/:studentId", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), getStudentAttendanceStats);

    return router;
}

export default attendenceRouter;