import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./cart.css";
//ribben css
import "../../../../components/user/common/margin/margin.css";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  //cart items fatch
  const [cartItems, setCartItems] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("Standard");

  const fetchCart = async () => {
    const token = localStorage.getItem("customerToken");
    if (!token) {
      toast.error("Please log in");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/cart/fetch", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Cart fetch failed:", err.response?.data || err.message);
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  //quantity update
  const updateQuantity = async (cartId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;

    const item = cartItems.find((item) => item._id === cartId);
    const stockQty = item.product_id.quantity;

    if (newQty > stockQty) {
      toast.warning("Cannot exceed available stock");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/cart/update-quantity/${cartId}`,
        {
          newQuantity: newQty,
        }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === cartId ? { ...item, quantity: newQty } : item
        )
      );
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  //remove item
  const removeItem = async (cartId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${cartId}`);
      setCartItems((prev) => prev.filter((item) => item._id !== cartId));
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const deliveryCharge = deliveryMethod === "Standard" ? 250 : 750;

  //total price
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.price;
    return acc + price * item.quantity;
  }, deliveryCharge);

  //details page
  const navigate = useNavigate();
  const handleCardClick = (productId, productType) => {
    let path = "/";

    switch (productType) {
      case "Accessory":
        path = "/Accessories_details";
        break;
      case "Medicine":
        path = "/Medicines_details";
        break;
    }

    navigate(path, { state: { productId } });
  };

  //paypal
  const PAYPAL_CLIENT_ID =
    "ASUsq6Nhh-mX4v3WU5vNc7cLHGZWGNPxJclU53zxypB1UNcYpsXLkkCwLzBODLZPwT2cTR61EMW4_Lrn";
  const EX_RATE = 330;
  const paypalRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (window.paypal) return setSdkReady(true);
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!sdkReady || cartItems.length === 0) return;

    // clean previous button
    if (paypalRef.current) paypalRef.current.innerHTML = "";

    const usdTotal = (totalPrice / EX_RATE).toFixed(2);

    window.paypal
      .Buttons({
        createOrder: (_d, actions) =>
          actions.order.create({
            purchase_units: [{ amount: { value: usdTotal } }],
          }),

        onApprove: async (_d, actions) => {
          await actions.order.capture();
          toast.success("Payment complete!");

          try {
            const token = localStorage.getItem("customerToken");
            await axios.post(
              "http://localhost:5000/api/payment/paypal-success",
              {
                deliveryMethod,
                deliveryFee: deliveryCharge,
                lkrTotal: totalPrice,
                usdTotal,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Order placed!");
            navigate("/Thank");
            setCartItems([]);
          } catch {
            toast.error("Back-end order store failed");
          }
        },

        onError: () => toast.error("PayPal error"),
      })
      .render(paypalRef.current);
  }, [sdkReady, cartItems, deliveryMethod, totalPrice]);

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="cart-head">
        <h2>My Cart</h2>
      </div>
      {}
      {/* cart section */}
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="advertisement-product-available">
            <h4>Your Cart Is Empty</h4>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-container">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.product_id.images[0]}
                    alt={item.product_id.name}
                  />
                  <div className="cart-info">
                    <div className="cart-info-left">
                      <h3>{item.product_id.name}</h3>
                      <h5>{item.option}</h5>
                      <h4>Rs/ {item.price.toFixed(2)}</h4>
                      <div className="cart-quantity-control">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity, -1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity, 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-info-right">
                      <div className="cart-action">
                        <button
                          onClick={() =>
                            handleCardClick(
                              item.product_id?._id || item.product_id,
                              item.productType
                            )
                          }
                        >
                          Show
                        </button>
                        <button onClick={() => removeItem(item._id)}>
                          <i class="bi bi-trash3"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Summary</h3>
              <span>
                <h6>Total Items - </h6>
                <h6>{cartItems.length}</h6>
              </span>
              <span>
                <h6>Shipping - </h6>
                <h6>Rs/ {deliveryCharge}</h6>
              </span>
              <div className="cart-summary-delevery-method">
                <p>Standard</p>
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "Standard"}
                  onChange={() => setDeliveryMethod("Standard")}
                />
              </div>
              <div className="cart-summary-delevery-method">
                <p>Express (+500)</p>
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "Express"}
                  onChange={() => setDeliveryMethod("Express")}
                />
              </div>
              <span>
                <h4>Total Price - </h4>
                <h4>Rs/ {totalPrice.toFixed(2)}</h4>
              </span>
              <div className="cart-summary-button">
                {sdkReady && <div ref={paypalRef}></div>}
              </div>
            </div>
          </div>
        )}
      </div>
      {}
    </div>
  );
};

export default Cart;
