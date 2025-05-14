import Accessory from "../../../models/user/common/ProductAccessory.js";

export const getAccessoryById = async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id).populate(
      "seller_id",
      "pharmacy_name district"
    );
    if (!accessory) {
      return res.status(404).json({ message: "Accessory not found" });
    }
    res.status(200).json(accessory);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
