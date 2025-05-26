import Review from "../../../models/user/common/Review.js";
import Medicine from "../../../models/user/common/ProductMedicine.js";
import Accessory from "../../../models/user/common/ProductAccessory.js";
import Customer from "../../../models/user/customer/CustomerAuthentication.js";
import jwt from "jsonwebtoken";

// Create a new review
const getCustomerIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.customerId;
};

export const addProductReview = async (req, res) => {
  try {
    const customer_id = getCustomerIdFromToken(req);
    const { product_id, productType, rating, comment } = req.body;
    const review = new Review({
      customer_id,
      product_id,
      productType,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Product review added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addSellerReview = async (req, res) => {
  try {
    const customer_id = getCustomerIdFromToken(req);
    const { product_id, productType, rating, comment } = req.body;

    let product = null;
    if (productType === "Medicine") {
      product = await Medicine.findById(product_id);
    } else if (productType === "Accessory") {
      product = await Accessory.findById(product_id);
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const seller_id = product.seller_id;

    const review = new Review({
      customer_id,
      seller_id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Seller review added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkProductType = async (req, res) => {
  const { id } = req.params;
  const isMedicine = await Medicine.exists({ _id: id });
  if (isMedicine) return res.json({ productType: "Medicine" });

  const isAccessory = await Accessory.exists({ _id: id });
  if (isAccessory) return res.json({ productType: "Accessory" });

  res.status(404).json({ error: "Product not found" });
};

export const getProductReviews = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.find({ product_id: productId })
      .sort({ date: -1 })
      .populate("customer_id", "name");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

export const getProductReviewsPhar = async (req, res) => {
  const { pharmacyId } = req.params;
  try {
    const reviews = await Review.find({ seller_id: pharmacyId })
      .sort({ date: -1 })
      .populate("customer_id", "name");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

export const getProductReviewsAcc = async (req, res) => {
  const { accessoriesId } = req.params;
  try {
    const reviews = await Review.find({ product_id: accessoriesId })
      .sort({ date: -1 })
      .populate("customer_id", "name");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};
