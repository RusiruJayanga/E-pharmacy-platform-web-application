import express from "express";
import { getAccessories } from "../../../controllers/user/customer/SearchPage.js";
import Medicine from "../../../models/user/common/ProductMedicine.js";
import Accessory from "../../../models/user/common/ProductAccessory.js";

const router = express.Router();

router.get("/get", getAccessories);

router.get("/", async (req, res) => {
  const { query } = req.query;
  const regex = new RegExp(query, "i");

  try {
    const [meds, accs] = await Promise.all([
      Medicine.find({ name: regex, quantity: { $gt: 2 } }),
      Accessory.find({ name: regex, quantity: { $gt: 2 } }),
    ]);
    res.json([...meds, ...accs]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
