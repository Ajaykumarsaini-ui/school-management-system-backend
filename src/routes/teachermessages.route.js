import { addteacherMessage, getteacherMessage, getallMessages, getSingleteacherMessage, deleteteacherMessage } from "../controllers/teachermessage.controller.js";

import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

const teachermessageRouter = () => {
    router.post("/add", verifyToken, authorizeRoles("TEACHER", "SCHOOL"), upload.single("attachment"), addteacherMessage);
    router.get("/all", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), getallMessages);
    router.get("/all/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), getteacherMessage);
    router.get("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), getSingleteacherMessage);
    router.delete("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), deleteteacherMessage);
    return router;
};

export default teachermessageRouter;