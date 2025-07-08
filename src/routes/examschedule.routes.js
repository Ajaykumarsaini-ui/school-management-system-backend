import { Router } from "express";
import { addExamSchedule, getAllExams, deleteExamschedule } from "../controllers/examschedule.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();


const examscheduleRouter = () => {
    router.post(
        "/add",
        verifyToken,
        authorizeRoles("SCHOOL", "TEACHER"),
        addExamSchedule
    );

    router.get(
        "/all",
        verifyToken,
        authorizeRoles("SCHOOL", "TEACHER", "STUDENT"),
        getAllExams
    );

    router.delete(
        "/:id",
        verifyToken,
        authorizeRoles("SCHOOL", "TEACHER"),
        deleteExamschedule
    );



    return router
}

export default examscheduleRouter



