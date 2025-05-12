import fs from "fs";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(__dirname, "credentials.json"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

export const drive = google.drive({ version: "v3", auth });

const generateUniqueFileName = (originalName) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `${timestamp}-${originalName}`;
};

export const uploadFileToDrive = async (file, folderId) => {
  try {
    const fileName = generateUniqueFileName(file.originalname);

    const res = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
    });

    const fileId = res.data.id;

    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
    } catch (permError) {
      console.error("Failed to set permissions:", permError.message);
    }

    const fileInfo = await drive.files.get({
      fileId,
      fields: "thumbnailLink, webContentLink",
    });

    let directLink =
      fileInfo.data.thumbnailLink || fileInfo.data.webContentLink;

    if (directLink.includes("&export=download")) {
      directLink = directLink.replace("&export=download", "");
    }

    return directLink;
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw error;
  }
};

export const uploadMultipleFilesToDrive = async (files, folderId) => {
  try {
    const uploadPromises = files.map((file) =>
      uploadFileToDrive(file, folderId)
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    throw error;
  }
};
