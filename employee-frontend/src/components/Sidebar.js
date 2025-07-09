// Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ collapsed, toggleSidebar }) {
  const location = useLocation();

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center p-3 border-bottom">
        {!collapsed && <h5 className="mb-0">Employee Manager</h5>}
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={toggleSidebar}
        >
          {collapsed ? "➤" : "◀"}
        </button>
      </div>
      <ul className="nav flex-column">
        <li
          className={`nav-item ${
            location.pathname === "/employees" ? "active" : ""
          }`}
        >
          <Link className="nav-link" to="/employees">
            {!collapsed ? "Employee List" : "👥"}
          </Link>
        </li>
        <li
          className={`nav-item ${location.pathname === "/add" ? "active" : ""}`}
        >
          <Link className="nav-link" to="/add">
            {!collapsed ? "Add Employee" : "➕"}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
