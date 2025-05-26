import express from "express";
import {
  getPharmacistsByStatus,
  updatePharmacistStatus,
  getPharmacistDetails,
} from "../../controllers/admin/PharmaciesPage.js";

const router = express.Router();

router.get("/pharmacist/status/:status", getPharmacistsByStatus);
router.put("/pharmacist/:id/status", updatePharmacistStatus);
router.get("/pharmacist/:id", getPharmacistDetails);

export default router;
