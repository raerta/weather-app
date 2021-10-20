import React from "react";
import { NavLink } from "react-router-dom";

function FooterNav() {
  return (
    <div className="footerNav">
      <NavLink
        exact to="/"
        activeStyle={{
          fontWeight: "bold",
          color: "blue",
        }}
      >
        Home
      </NavLink>
      <p>|</p>
      <NavLink
        exact to="/about"
        activeStyle={{
          fontWeight: "bold",
          color: "blue",
        }}
      >
        About
      </NavLink>
    </div>
  );
}

export default FooterNav;
