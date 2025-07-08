import { studentSubject } from "../controllers/studentsubject.controller.js";
import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
const router = express.Router();

const studentsubjectRouter = () => {
    router.get("/:id", verifyToken, authorizeRoles("SCHOOL", "TEACHER" , "STUDENT"), studentSubject);
    return router;
}

export default studentsubjectRouter;