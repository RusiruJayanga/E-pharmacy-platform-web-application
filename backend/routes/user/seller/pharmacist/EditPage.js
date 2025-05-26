import express from "express";
import {
  getAccessoryById,
  updateAccessory,
} from "../../../../controllers/user/seller/pharmacist/EditPage.js";
import {
  getMedicineById,
  updateMedicine,
} from "../../../../controllers/user/seller/pharmacist/EditPage.js";

const router = express.Router();

router.get("/get/accessories/:id", getAccessoryById);
router.put("/put/accessories/:id", updateAccessory);
router.get("/get/medicines/:id", getMedicineById);
router.put("/put/medicines/:id", updateMedicine);

export default router;
