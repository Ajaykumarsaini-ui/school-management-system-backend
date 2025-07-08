import { Router } from "express";
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  LoginStudent,
  getSingleStudent,
} from "../controllers/student.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

const studentRouter = () => {

  router.post("/login", LoginStudent);

  router.post("/add", verifyToken, authorizeRoles("SCHOOL"), upload.single("student_image"), addStudent);

  router.get("/all", verifyToken, authorizeRoles("SCHOOL", "TEACHER"), getStudents);

  router.put("/:id", verifyToken, authorizeRoles("SCHOOL"), updateStudent);
  router.delete("/:id", verifyToken, authorizeRoles("SCHOOL"), deleteStudent);

  router.get("/:id", verifyToken, authorizeRoles("SCHOOL" , "TEACHER" , "STUDENT"), getSingleStudent);


  return router;
};

export default studentRouter;
