import express from "express";
import { addToCart } from "../../../controllers/user/customer/Cart.js";
import {
  getCartItems,
  updateCartQuantity,
  deleteCartItem,
} from "../../../controllers/user/customer/CartPage.js";

const router = express.Router();

router.post("/add-to-cart", addToCart);
router.get("/fetch", getCartItems);
router.put("/update-quantity/:cartId", updateCartQuantity);
router.delete("/:cartId", deleteCartItem);

export default router;
