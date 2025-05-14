import Medicine from "../../../models/user/common/ProductMedicine.js";
import Pharmacist from "../../../models/user/seller/pharmacist/PharmacistAuthentication.js";

export const getMedicines = async (req, res) => {
  try {
    const { category, district, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    let filter = { quantity: { $gt: 2 } };

    if (category && category !== "All") {
      filter.category = category;
    }

    const medicinesQuery = Medicine.find(filter)
      .populate({
        path: "seller_id",
        model: "Pharmacist",
        select: "district",
      })
      .skip(skip)
      .limit(parseInt(limit));

    const countQuery = Medicine.countDocuments(filter);

    const [medicines, total] = await Promise.all([medicinesQuery, countQuery]);

    const filtered = district
      ? medicines.filter(
          (med) =>
            med.seller_id?.district?.toLowerCase() === district.toLowerCase()
        )
      : medicines;

    res.status(200).json({
      products: filtered,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      hasMore: skip + filtered.length < total,
    });
  } catch (err) {
    console.error("Error fetching medicines:", err);
    res.status(500).json({ message: "Server error" });
  }
};
