import {
  getClass,
  addClass,
  deleteClass,
  updateClass,
} from "../controllers/class.controller.js";

import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js" ;

const router = Router();

const classRouter = () => {
  router.get("/all", verifyToken, authorizeRoles("SCHOOL", "TEACHER", "STUDENT"), getClass);

  router.post("/add", verifyToken, authorizeRoles("SCHOOL"), addClass);
  router.put("/:id", verifyToken, authorizeRoles("SCHOOL"), updateClass);
  router.delete("/:id", verifyToken, authorizeRoles("SCHOOL"), deleteClass);

  return router;
};

export default classRouter;
