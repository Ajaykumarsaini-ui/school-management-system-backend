// /middleware/multer.middleware.js

import multer from "multer";
import { storage } from "../config/cloudinary.js"; // use correct relative path

export const upload = multer({ storage });
