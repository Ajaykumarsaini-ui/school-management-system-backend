import { addSubject, getSubjects, deleteSubject, getSingleSubject, updateSubject } from "../controllers/subject.controller.js";
import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

const subjectRouter = () => {

    router.post("/add", verifyToken, authorizeRoles("SCHOOL"), upload.single("syllabusFile"), addSubject);

    router.get("/all", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), getSubjects);

    router.put("/:id", verifyToken, authorizeRoles("SCHOOL"), updateSubject);

    router.delete("/:id", verifyToken, authorizeRoles("SCHOOL"), deleteSubject);

    router.get("/:id", verifyToken, authorizeRoles("SCHOOL"), getSingleSubject);

    return router;

}

export default subjectRouter