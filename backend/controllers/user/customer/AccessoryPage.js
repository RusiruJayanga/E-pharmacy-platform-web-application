import Accessory from "../../../models/user/common/ProductAccessory.js";
import Pharmacist from "../../../models/user/seller/pharmacist/PharmacistAuthentication.js";

export const getAccessories = async (req, res) => {
  try {
    const { category, district } = req.query;

    let filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }

    const accessories = await Accessory.find(filter).populate({
      path: "seller_id",
      model: "Pharmacist",
      select: "district",
    });

    const filtered = district
      ? accessories.filter(
          (acc) =>
            acc.seller_id?.district?.toLowerCase() === district.toLowerCase()
        )
      : accessories;

    res.status(200).json(filtered);
  } catch (error) {
    console.error("Error fetching accessories:", error);
    res.status(500).json({ message: "Server error" });
  }
};
