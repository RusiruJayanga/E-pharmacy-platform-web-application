import OrderItem from "../../../../models/user/common/OrderItem.js";

export const getSellerOrders = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const items = await OrderItem.find({ seller_id: sellerId })
      .populate("product_id")
      .populate("customer_id", "name address phone_number")
      .populate("order_id", "delevery_method")
      .lean();

    const group = {
      newOrders: items.filter((i) =>
        ["processing", "shipped"].includes(i.status)
      ),
      deliveredOrders: items.filter((i) => i.status === "delivered"),
      cancelledOrders: items.filter((i) => i.status === "cancelled"),
    };

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

export const updateOrderItemStatus = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { status } = req.body;

    if (!["shipped", "delivered", "cancelled"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const item = await OrderItem.findByIdAndUpdate(
      itemId,
      { status },
      { new: true }
    )
      .populate("product_id")
      .populate("customer_id", "name address phone_number")
      .populate("order_id", "delevery_method")
      .lean();

    if (!item) return res.status(404).json({ message: "Order item not found" });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error updating status" });
  }
};
