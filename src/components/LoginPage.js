import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "./Context";
import "./LoginPage.css";

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(ThemeContext);
  const [action, setAction] = useState("Log in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //validate the email
  const validateEmail = (name) => {
    const regex = /[a-zA-Z0-9.-]+(.[a-zA-Z]{2,})+/;
    return regex.test(email);
  };

  const validateName = (email) => {
    const regex = /[a-zA-Z]/;
    return regex.test(email);
  };

  //validate all inputes
  const validateForm = () => {
    let formErrors = {};
    if (!name.trim() || !validateName(name)) {
      formErrors.name = "Name is required";
    }
    if (!email.trim() || !validateEmail(email)) {
      formErrors.email = "A valid email is required";
    }
    if (!password || password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }
    setErrors(formErrors);

    // else
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (action) => {
    setAction(action);
    // If the form is valid, proceed to the home page
    if (validateForm()) {
      setIsLoggedIn(true);
      navigate("/HomePage");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="input">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="input">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
      </div>
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
            handleSubmit("Login");
          }}
        >
          Login
        </div>
        <div
          className={action === "Sign up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign up");
            handleSubmit("Sign up");
          }}
        >
          Signup
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
