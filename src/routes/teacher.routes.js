import { Router } from "express";
import {
  getTeachers,
  addTeacher,
  deleteTeacher,
  updateTeacher,
  LoginTeacher,
  getSingleTeacher,
  getAllclassassignedstudentTeacher
} from "../controllers/teacher.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

const teacherRouter = () => {
  router.post("/login", LoginTeacher);

  router.post(
    "/add",
    verifyToken,
    authorizeRoles("SCHOOL"),
    upload.single("teacher_image"),
    addTeacher
  );

  router.get(
    "/all",
    verifyToken,
    authorizeRoles("SCHOOL", "TEACHER"),
    getTeachers
  );
  
  router.get("/classassignedstudent", verifyToken, authorizeRoles("SCHOOL" , "TEACHER" , "STUDENT"), getAllclassassignedstudentTeacher);

  router.put("/:id", verifyToken, authorizeRoles("SCHOOL"), updateTeacher);

  router.delete("/:id", verifyToken, authorizeRoles("SCHOOL"), deleteTeacher);

  router.get("/:id", verifyToken, authorizeRoles("SCHOOL" , "TEACHER"), getSingleTeacher);


  return router;
};

export default teacherRouter;
