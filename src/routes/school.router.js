import { Router } from "express";
import {
  addSchool,
  getSchools,
  deleteSchool,
  updateSchool,
  loginSchool,
  getSingleSchool,
} from "../controllers/school.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

const schoolRouter = () => {
  router.post("/register", upload.single("school_image"), addSchool);
  router.post("/login", loginSchool);

  router.get("/all", getSchools);
  router.delete("/:id", verifyToken, authorizeRoles("SCHOOL"), deleteSchool);
  router.put("/:id", verifyToken, authorizeRoles("SCHOOL"), updateSchool);
  router.get("/:id", verifyToken, authorizeRoles("SCHOOL"), getSingleSchool);

  return router;
};

export default schoolRouter;
