import express from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import vision from "@google-cloud/vision";
import Medicine from "../../../models/user/common/ProductMedicine.js";

const router = express.Router();
const client = new vision.ImageAnnotatorClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, `${uuid()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const [result] = await client.documentTextDetection(req.file.path);
    const text = result.fullTextAnnotation.text;

    const tokens = Array.from(
      new Set(
        text
          .split(/[^A-Za-z]+/)
          .filter(Boolean)
          .map((t) => t.toUpperCase())
      )
    );

    const regexArr = tokens.map((t) => new RegExp(t, "i"));
    const meds = await Medicine.find({
      $or: regexArr.map((r) => ({ name: r })),
      quantity: { $gt: 2 },
    });

    res.json({ detected: tokens, matches: meds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OCR failed" });
  }
});

export default router;
