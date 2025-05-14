import Accessory from "../../../models/user/common/ProductAccessory.js";

//slider filter
export const getAccessoriesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const accessories = await Accessory.find({
      category,
      quantity: { $gt: 2 },
    })
      .limit(20)
      .select("name options images category");

    res.status(200).json(accessories);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

//beauty filter
export const getBeautyAccessories = async (req, res) => {
  const beautyCategories = ["Cosmetics", "Skin Care", "Hair Care"];

  try {
    const accessories = await Accessory.find({
      category: { $in: beautyCategories },
      quantity: { $gt: 2 },
    })
      .limit(20)
      .select("name options images category");

    res.status(200).json(accessories);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
