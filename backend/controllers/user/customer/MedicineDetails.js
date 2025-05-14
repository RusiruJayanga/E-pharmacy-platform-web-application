import Medicine from "../../../models/user/common/ProductMedicine.js";

export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id).populate(
      "seller_id",
      "pharmacy_name district"
    );
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
