import express from "express";
import {
  getLabsByStatus,
  updateLabStatus,
  getLabDetails,
} from "../../controllers/admin/LabsPage.js";

const router = express.Router();

router.get("/lab/status/:status", getLabsByStatus);
router.put("/lab/:id/status", updateLabStatus);
router.get("/lab/:id", getLabDetails);

export default router;
