import Lab from "../../../models/user/seller/lab/LabAuthentication.js";

export const getLabs = async (req, res) => {
  try {
    const { district, lab_tests, page = 1, limit = 21 } = req.query;
    const skip = (page - 1) * limit;

    const query = { account_status: "Approved" };

    if (district && district !== "Island Wide") {
      query.district = district;
    }

    if (lab_tests && lab_tests !== "All") {
      const testsArray = Array.isArray(lab_tests) ? lab_tests : [lab_tests];
      query.lab_tests = { $in: testsArray };
    }

    const labsQuery = Lab.find(query)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit));

    const countQuery = Lab.countDocuments(query);

    const [labs, total] = await Promise.all([labsQuery, countQuery]);

    res.status(200).json({
      labs,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      hasMore: skip + labs.length < total,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching labs", error });
  }
};
