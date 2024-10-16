import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ThemeContext from "./Context";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { items } = useContext(ThemeContext);

  // State to hold the search input
  const [searchItem, setSearchItem] = useState("");
  const [debouncedSearchItem, setDebouncedSearchItem] = useState(searchItem);

  // sorting
  const [sortOption, setSortOption] = useState("");
  // Update debounced search value after 5 seconds
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchItem(searchItem);
    }, 500);

    // Cleanup the timeout if the searchItem changes before the 5 seconds are up
    return () => {
      clearTimeout(handler);
    };
  }, [searchItem]);

  // Filter items based on category and search
  let CategoryFiltered = items.filter((item) => {
    return (
      item.type === categoryName &&
      item.name.toLowerCase().includes(debouncedSearchItem.toLowerCase())
    );
  });

  //sort
  if (sortOption === "lowest") {
    CategoryFiltered = CategoryFiltered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "highest") {
    CategoryFiltered = CategoryFiltered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container">
      <h1 className="text-center my-4">{categoryName} Items</h1>

      {/* Search bar */}
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search items..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)} // Update search query
          />
        </div>

        {/* display drop down */}
        <div className="col-md-4">
          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="lowest">Price: Lowest to Highest</option>
            <option value="highest">Price:Highest to Lowest</option>
          </select>
        </div>
      </div>

      {/* Display filtered items */}
      <div className="row">
        {CategoryFiltered.length > 0 ? (
          CategoryFiltered.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{item.name}</h5>
                  <p className="text-center">${item.price}</p>
                  <Link
                    to={`/item/${item.id}`}
                    className="btn btn-primary w-100"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No items found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
