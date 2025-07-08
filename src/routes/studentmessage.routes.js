import { addStudentMessage, getStudentMessage, getallMessages, getSingleStudentMessage, deleteStudentMessage } from "../controllers/studentmessage.controller.js";

import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

const studentmessageRouter = () => {
    router.post("/add", verifyToken, authorizeRoles("STUDENT", "TEACHER" , "SCHOOL" ), upload.single("attachment"), addStudentMessage);
    router.get("/all", verifyToken, authorizeRoles("SCHOOL", "TEACHER", "STUDENT"), getallMessages);
    router.get("/all/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER", "STUDENT"), getStudentMessage);
    router.get("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER", "STUDENT"), getSingleStudentMessage);
    router.delete("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER", "STUDENT"), deleteStudentMessage);
    return router;
};

export default studentmessageRouter;