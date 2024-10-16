import React from "react";
import { Link } from "react-router-dom";
import ThemeContext from "./Context";
import { useContext } from "react";

const HomePage = () => {
  const { categories } = useContext(ThemeContext);
  return (
    <div className="container">
      <h1 className="text-center my-4">Categories</h1>
      <div className="row">
        {categories.map((category) => (
          <div key={category.name} className="col-md-4 mb-4">
            <Link to={`/category/${category.name}`}>
              <div className="card">
                <img
                  src={category.image}
                  className="card-img-top h"
                  alt={category.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{category.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
