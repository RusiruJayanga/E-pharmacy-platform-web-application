import express from "express";
import {
  getSellerProducts,
  deleteProduct,
} from "../../../../controllers/user/seller/pharmacist/Store.js";

const router = express.Router();

router.get("/seller/:seller_id", getSellerProducts);

router.delete("/delete/:type/:id", deleteProduct);

export default router;
