import express from "express";
import multer from "multer";
import { uploadMultipleFilesToDrive } from "./GoogleDrive.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "temp/" });

router.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const folderId = "10WvIZAxXKi_EO-PD5bIFeHyW7rdht-zU";
    const urls = await uploadMultipleFilesToDrive(req.files, folderId);
    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    res.status(200).json({ urls });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
