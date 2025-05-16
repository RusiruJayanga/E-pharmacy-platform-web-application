import express from "express";
import { addToWishlist } from "../../../controllers/user/customer/Save.js";
import {
  getSavedItems,
  deleteSavedItem,
} from "../../../controllers/user/customer/SavePage.js";

const router = express.Router();

router.post("/add-to-save", addToWishlist);
router.get("/get/:customer_id", getSavedItems);
router.delete("/delete/:id", deleteSavedItem);

export default router;
