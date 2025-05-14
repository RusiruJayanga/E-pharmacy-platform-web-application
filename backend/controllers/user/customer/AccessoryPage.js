import Accessory from "../../../models/user/common/ProductAccessory.js";
import Pharmacist from "../../../models/user/seller/pharmacist/PharmacistAuthentication.js";

export const getAccessories = async (req, res) => {
  try {
    const { category, district, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    let filter = { quantity: { $gt: 2 } };

    if (category && category !== "All") {
      filter.category = category;
    }

    const accessoriesQuery = Accessory.find(filter)
      .populate({
        path: "seller_id",
        model: "Pharmacist",
        select: "district",
      })
      .skip(skip)
      .limit(parseInt(limit));

    const countQuery = Accessory.countDocuments(filter);

    const [accessories, total] = await Promise.all([
      accessoriesQuery,
      countQuery,
    ]);

    const filtered = district
      ? accessories.filter(
          (acc) =>
            acc.seller_id?.district?.toLowerCase() === district.toLowerCase()
        )
      : accessories;

    res.status(200).json({
      products: filtered,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      hasMore: skip + filtered.length < total,
    });
  } catch (error) {
    console.error("Error fetching accessories:", error);
    res.status(500).json({ message: "Server error" });
  }
};
