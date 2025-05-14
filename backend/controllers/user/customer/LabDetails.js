import Lab from "../../../models/user/seller/lab/LabAuthentication.js";

export const getLabById = async (req, res) => {
  try {
    const { id } = req.params;
    const lab = await Lab.findById(id);

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    res.status(200).json(lab);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
