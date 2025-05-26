import Pharmacy from "../../../models/user/seller/pharmacist/PharmacistAuthentication.js";

export const getPharmacies = async (req, res) => {
  try {
    const { district, page = 1, limit = 21 } = req.query;
    const skip = (page - 1) * limit;

    const query = { account_status: "Approved" };

    if (district && district !== "Island Wide") {
      query.district = district;
    }

    const pharmaciesQuery = Pharmacy.find(query)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit));

    const countQuery = Pharmacy.countDocuments(query);

    const [pharmacies, total] = await Promise.all([
      pharmaciesQuery,
      countQuery,
    ]);

    res.status(200).json({
      pharmacies,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      hasMore: skip + pharmacies.length < total,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pharmacies", error });
  }
};
