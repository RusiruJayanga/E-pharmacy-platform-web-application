import Medicine from "../../../models/user/common/ProductMedicine.js";
import Pharmacist from "../../../models/user/seller/pharmacist/PharmacistAuthentication.js";

export const getMedicines = async (req, res) => {
  try {
    const { category, district } = req.query;

    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    const medicines = await Medicine.find(filter).populate({
      path: "seller_id",
      model: "Pharmacist",
      select: "district",
    });

    const filtered = district
      ? medicines.filter(
          (med) =>
            med.seller_id?.district?.toLowerCase() === district.toLowerCase()
        )
      : medicines;

    res.status(200).json(filtered);
  } catch (err) {
    console.error("Error fetching medicines:", err);
    res.status(500).json({ message: "Server error" });
  }
};
