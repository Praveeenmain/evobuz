import React from "react";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="evo__navbar">
      <div className="evo__navbar-links">
        <div className="evo__navbar-links_logo">
          <div className="logo">
            <Link to="/home">
              <p>EvoBuz</p>
            </Link>
          </div>
        </div>
        <div className="evo__navbar-links_container">
          <Link to="/home">
            <p>Home</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
          <Link to="/contact">
            <p>Contact</p>
          </Link>
          <Link to="/manage">
            <p>Manage</p>
          </Link>
          <p>Login</p>
          <button
            type="button"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;