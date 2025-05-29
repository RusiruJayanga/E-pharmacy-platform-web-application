import Accessory from "../../../models/user/common/ProductAccessory.js";

export const getAccessoriesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    let query = {
      quantity: { $gt: 2 },
    };

    if (category && category !== "All") {
      query.category = category;
    } else {
      query.category = { $nin: ["Cosmetics", "Skin Care", "Hair Care"] };
    }

    const accessories = await Accessory.find(query)
      .limit(20)
      .select("name options images category");

    res.status(200).json(accessories);
  } catch (err) {
    console.error("Accessory fetch error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

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
