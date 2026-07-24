import multer from "multer";
import { ApiError } from "../utils/ApiError";

// Setup memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Invalid file type. Only JPG, JPEG, PNG, and WEBP are allowed."));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter,
});
