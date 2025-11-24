import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src="/Logo de _House Owl_.png"
          alt="Logo de _House Owl_"
          className="nav-logo"
        />
        <h2 className="nav-title">House Owl</h2>
      </div>

      <div className="nav-right">
        <a href="/">Home</a>
        <a href="/add-expense">Add Expense</a>
        <a href="/view-expenses">Expenses</a>
      </div>
    </nav>
  );
}

export default Navbar;
