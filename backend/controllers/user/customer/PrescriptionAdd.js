import Request from "../../../models/user/common/Request.js";

export const uploadPrescription = async (req, res) => {
  try {
    const { customer_id, product_id, image, productType, description } =
      req.body;

    if (!customer_id || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newRequest = new Request({
      customer_id,
      product_id,
      productType,
      description,
      image,
      status: "Pending",
    });

    await newRequest.save();

    return res.status(201).json({ message: "Request uploaded successfully !" });
  } catch (error) {
    console.error("Error saving request:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
