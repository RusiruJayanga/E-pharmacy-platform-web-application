import express from "express";
import {
  addProductReview,
  addSellerReview,
  checkProductType,
  getProductReviews,
  getProductReviewsPhar,
  getProductReviewsAcc,
} from "../../../controllers/user/customer/Review.js";

const router = express.Router();

router.post("/product", addProductReview);
router.post("/seller", addSellerReview);
router.get("/products/check-type/:id", checkProductType);
router.get("/product/:productId", getProductReviews);
router.get("/pharmacy/:pharmacyId", getProductReviewsPhar);
router.get("/accessories/:accessoriesId", getProductReviewsAcc);

export default router;
