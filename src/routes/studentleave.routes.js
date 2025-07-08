import { createStudentLeave, getallStudentLeave, deleteStudentLeave, patchStudentLeave , getSingleStudentLeave } from "../controllers/studentleave.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const studentleaveRouter = () => {
    const router = Router(); // ✅ FIXED: declared inside function

    router.post("/add", verifyToken, authorizeRoles("SCHOOL", "TEACHER", "STUDENT"), createStudentLeave);
    router.get("/all", verifyToken, authorizeRoles("SCHOOL", "TEACHER", "STUDENT"), getallStudentLeave);
    router.delete("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER", "STUDENT"), deleteStudentLeave);
    router.patch("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER", "STUDENT"), patchStudentLeave);
    router.get("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER", "STUDENT"), getSingleStudentLeave);

    return router;
};

export default studentleaveRouter;
