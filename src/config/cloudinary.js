// /middleware/cloudinary.js
import dotenv from "dotenv";
dotenv.config(); // ⬅️ Add this line

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Multer Storage Setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "school-management-system",
    allowed_formats: ["jpg", "png", "jpeg" , "pdf" , "webp"]
  },
});


export { cloudinary, storage };
