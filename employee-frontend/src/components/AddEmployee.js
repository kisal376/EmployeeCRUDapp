import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
    const navigate  = useNavigate();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      position: "",
      company: "",
      dateOfBirth: "",
      salary: "",
      employeeType: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/employees', formData)
            .then(() => navigate('/employees'))
            .catch(() => alert('Failed to add employee'));
    };

    return (
      <div className="container mt-4">
        <h2>Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Job Title</label>
            <input
              name="position"
              className="form-control"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Employee Type:</label>
            <select
              name="employeeType"
              className="form-select"
              value={formData.employeeType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contractor">Contractor</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Company</label>
            <input
              name="company"
              className="form-control"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Salary:</label>
            <input
              type="number"
              name="salary"
              className="form-control"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Add Employee
          </button>
        </form>
      </div>
    );
}

export default AddEmployee;