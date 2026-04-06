import React from "react";
import { NavLink } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav className="site-nav">
      <div className="brand">Ksheeraja</div>
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/art">Art</NavLink>
        </li>
        <li>
          <NavLink to="/blog">Blog</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
