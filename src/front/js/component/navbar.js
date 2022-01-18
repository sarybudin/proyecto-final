import React from "react";
import "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid mt-3 text-center" id="title">
        <a href="/">
          <span>Áni</span>
          <span id="bot">bot</span>
        </a>
      </div>
    </nav>
  );
};
