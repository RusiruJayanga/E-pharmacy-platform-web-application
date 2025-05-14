import Pharmacist from "../../../models/user/seller/pharmacist/PharmacistAuthentication.js";

export const getPharmacyById = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacy = await Pharmacist.findById(id);

    if (!pharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    res.status(200).json(pharmacy);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
