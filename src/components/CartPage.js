import React from "react";
import ThemeContext from "./Context";
import { useContext, useState } from "react";

const CartPage = () => {
  // Calculate the total amount for all items in the cart
  const value = useContext(ThemeContext);
  const [cartItems, setCartItems] = useState(
    value.cart.map((item) => ({ ...item, quantity: 1 }))
  );
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const increamentQuantity = (index) => {
    const newCart = [...cartItems];
    newCart[index].quantity += 1;
    setCartItems(newCart);
  };

  const decrementQuantity = (index) => {
    const newCart = [...cartItems];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    }
    setCartItems(newCart);
  };
  return (
    <div className="container">
      <h1 className="text-center my-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="row">
          {cartItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top h"
                  style={{ height: "200px", objectFit: "contain" }}
                />

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4>
                      Product: {item.name} <br /> Price: ${item.price}
                    </h4>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => decrementQuantity(index)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="form-control text-center"
                      style={{ width: "50px" }}
                    />
                    <button
                      className="btn btn-success ms-2"
                      onClick={() => increamentQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <h3>Total: ${totalAmount}</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
