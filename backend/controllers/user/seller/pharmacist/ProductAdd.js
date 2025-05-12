import Medicine from "../../../../models/user/common/ProductMedicine.js";
import Accessory from "../../../../models/user/common/ProductAccessory.js";

export const addProduct = async (req, res) => {
  try {
    const {
      seller_id,
      name,
      quantity,
      options,
      description,
      category,
      legality,
      discount,
      images,
      type,
    } = req.body;

    if (!seller_id) {
      return res.status(400).json({ message: "Seller ID missing in request" });
    }

    if (!type || !["Medicine", "Accessory"].includes(type)) {
      return res.status(400).json({ message: "Invalid product type" });
    }

    if (type === "Medicine") {
      const newMedicine = new Medicine({
        seller_id,
        name,
        quantity,
        options,
        description,
        category,
        legality,
        discount,
        images,
      });
      await newMedicine.save();
    } else {
      const newAccessory = new Accessory({
        seller_id,
        name,
        quantity,
        options,
        description,
        category,
        discount,
        images,
      });
      await newAccessory.save();
    }

    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error saving product:", error);
    return res
      .status(500)
      .json({ message: "Server error while saving product" });
  }
};
