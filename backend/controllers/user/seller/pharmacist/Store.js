import Medicine from "../../../../models/user/common/ProductMedicine.js";
import Accessory from "../../../../models/user/common/ProductAccessory.js";

export const getSellerProducts = async (req, res) => {
  try {
    const { seller_id } = req.params;

    const medicines = await Medicine.find({ seller_id });
    const accessories = await Accessory.find({ seller_id });

    res.status(200).json([...medicines, ...accessories]);
  } catch (error) {
    console.error("Error fetching seller products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id, type } = req.params;

    if (type === "medicine") {
      await Medicine.findByIdAndDelete(id);
    } else if (type === "accessory") {
      await Accessory.findByIdAndDelete(id);
    } else {
      return res.status(400).json({ message: "Invalid product type" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
