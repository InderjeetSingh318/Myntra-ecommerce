import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import CategoryPage from "./components/CategoryPage";
import ItemPage from "./components/ItemPage";
import CartPage from "./components/CartPage";
import { Categories } from "./constants/Categories";
import { items } from "./constants/Items";
import ThemeContext from "./components/Context";
import LoginPage from "./components/LoginPage";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useContext(ThemeContext);

    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <ThemeContext.Provider
      value={{
        categories: Categories,
        items,
        addToCart,
        cart,
        isLoggedIn,
        setIsLoggedIn,
        PrivateRoute,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/HomePage"
            element={
              <PrivateRoute>
                <HomePage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/category/:categoryName"
            element={
              <PrivateRoute>
                <CategoryPage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/item/:itemId"
            element={
              <PrivateRoute>
                <ItemPage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage cart={cart} />{" "}
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
