import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "pharmacy_uploads",
    });

    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw err;
  }
};

export const uploadMultipleFilesToDrive = async (files) => {
  try {
    const uploadPromises = files.map((file) => uploadFileToDrive(file));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Cloudinary multiple upload error:", error);
    throw error;
  }
};
