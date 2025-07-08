import {
  getNotices,
  addNotice,
  deleteNotice,
  updateNotice,
} from "../controllers/notice.controller.js";

import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router(); 
const noticeRouter = () => {
  router.get(
    "/all",
    verifyToken,
    authorizeRoles("SCHOOL", "TEACHER", "STUDENT"),
    getNotices
  );

  router.post(
    "/add",
    verifyToken,
    authorizeRoles("SCHOOL", "TEACHER"),
    upload.single("attachment") ,
    addNotice
  );
  router.put(
    "/:id",
    verifyToken,
    authorizeRoles("SCHOOL", "TEACHER"),
    updateNotice
  );
  router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("SCHOOL", "TEACHER"),
    deleteNotice
  );

  return router;
};

export default noticeRouter;
