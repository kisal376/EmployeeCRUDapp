// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeDetail from "./components/EmployeeDetail";
import Sidebar from "./components/Sidebar";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <div
          className="main-content"
          style={{
            marginLeft: collapsed ? "60px" : "250px",
            padding: "20px",
            transition: "margin-left 0.3s",
            width: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/employees" />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/edit/:id" element={<EditEmployee />} />
            <Route path="/employees/:id" element={<EmployeeDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
