import Doctor from "../../../models/user/seller/doctor/DoctorAuthentication.js";

export const getDoctors = async (req, res) => {
  try {
    const { district, specialty, page = 1, limit = 21 } = req.query;
    const skip = (page - 1) * limit;

    const query = { account_status: "Pending" };

    if (district && district !== "Island Wide") {
      query.district = district;
    }

    if (specialty && specialty !== "All") {
      query.specialty = specialty;
    }

    const doctorsQuery = Doctor.find(query)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit));

    const countQuery = Doctor.countDocuments(query);

    const [doctors, total] = await Promise.all([doctorsQuery, countQuery]);

    res.status(200).json({
      doctors,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      hasMore: skip + doctors.length < total,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};
