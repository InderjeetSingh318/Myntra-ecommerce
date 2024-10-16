import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ThemeContext from "./Context";

import { useContext } from "react";

const ItemPage = () => {
  const { itemId } = useParams();
  const value = useContext(ThemeContext);

  const item = value.items.find((item) => item.id === parseInt(itemId));
  const navigate = useNavigate();

  const handleAddToCart = () => {
    value.addToCart(item);
    navigate("/cart");
  };

  // If no item found, display a message
  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5">
          {/* Display the item's image */}
          <div className="Picture">
            <img src={item.image} className="img-fluid" alt={item.name} />
          </div>
        </div>
        <div className="col-md-6 mt-5">
          {/* Display the item's details */}
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
