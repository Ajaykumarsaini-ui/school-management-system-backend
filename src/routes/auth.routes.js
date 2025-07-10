// routes/auth.routes.js

import express from "express";
import { refreshAccessToken , logout } from "../controllers/auth.controller.js";

const router = express.Router();

// POST /api/auth/refresh-token
router.post("/refresh-token", refreshAccessToken);

// POST /api/auth/logout
router.post("/logout", logout);

export default router;
