import { createteacherLeave, getallteacherLeave, deleteteacherLeave, patchteacherLeave, getSingleteacherLeave } from "../controllers/teacherleave.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const teacherleaveRouter = () => {
    const router = Router();

    router.post("/add", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), createteacherLeave);
    router.get("/all", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), getallteacherLeave);
    router.delete("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), deleteteacherLeave);
    router.patch("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), patchteacherLeave);
    router.get("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), getSingleteacherLeave);

    return router;
};

export default teacherleaveRouter;
