import express from "express";
import {
  getAccessoriesByCategory,
  getBeautyAccessories,
} from "../../../controllers/user/customer/HomePage.js";

const router = express.Router();

router.get("/category/:category", getAccessoriesByCategory);
router.get("/beauty", getBeautyAccessories);

export default router;
