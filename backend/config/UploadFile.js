import express from "express";
import multer from "multer";
import { uploadToCloudinary } from "./Cloudinary.js";

const router = express.Router();
const upload = multer({ dest: "temp/" });

router.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const urls = await Promise.all(
      req.files.map(async (file) => {
        return await uploadToCloudinary(file.path);
      })
    );

    res.status(200).json({ urls });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
