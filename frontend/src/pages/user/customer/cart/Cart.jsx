import React, { useState } from "react";
import "./cart.css";
//ribben css
import "../../../../components/user/customer/margin/margin.css";

const Cart = () => {
  //cart items fatch
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 120,
      quantity: 1,
      option: "Paracetamol",
      image: "/details/1.png",
    },
    {
      id: 2,
      name: "Vitamin C Capsules",
      price: 300,
      quantity: 1,
      option: "Paracetamol",
      image: "/details/1.png",
    },
    {
      id: 2,
      name: "Vitamin C Capsules",
      price: 300,
      quantity: 1,
      option: "Paracetamol",
      image: "/details/1.png",
    },
  ]);
  //admin discount
  const discount = 9;
  //quantity update
  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };
  //remove item
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  //total price
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc +
      item.price * item.quantity -
      ((acc + item.price * item.quantity) / 100) * discount,
    0
  );

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
          <p className="empty">Your cart is empty!</p>
        ) : (
          <div className="cart-content">
            <div className="cart-items-container">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-info">
                    <div className="cart-info-left">
                      <h3>{item.name}</h3>
                      <h5>{item.option}</h5>
                      <h4>Rs/ {item.price}</h4>
                      <div className="cart-quantity-control">
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-info-right">
                      <div className="cart-action">
                        <h4>Show</h4>
                        <h4 onClick={() => removeItem(item.id)}>
                          <i class="bi bi-trash3"></i>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Summary</h3>
              <span>
                <p>Total Items: </p>
                <h6>{cartItems.length}</h6>
              </span>
              <span>
                <p>Discount: </p>
                <h6>{discount}%</h6>
              </span>
              <span>
                <p>Shipping: </p>
                <h6>Rs/ 250</h6>
              </span>
              <span>
                <h4>Total Price: </h4>
                <h4>Rs/ {totalPrice.toFixed(2)}</h4>
              </span>
              <h5>
                <img src="paypal.png" alt="paypal" />
              </h5>
              <h5 className="cart-card-option">
                <i class="bi bi-credit-card-2-back"></i>Debit Or Credit Card
              </h5>
            </div>
          </div>
        )}
      </div>
      {}
    </div>
  );
};

export default Cart;
