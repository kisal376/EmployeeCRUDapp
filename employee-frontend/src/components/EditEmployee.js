import React, {useState, useEffect} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function EditEmployee() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
      name: "",
      email: "",
      position: "",
      company: "",
      dateOfBirth: "",
      salary: "",
      employeeType: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/employees/${id}`)
            .then(respose => {
                setEmployee(respose.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to load data");
                setLoading(false);
            })
    }, [id]);

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/employees/${id}`, employee)
            .then(() => {
                navigate('/employees');
            })
            .catch(() => {
                setError("Failed to update employee.");
            });
    };

    if (loading) return <div>Loading data ...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div
        className="container mt-4 d-flex flex-column"
        style={{ minHeight: "90vh" }}
      >
        <div>
          <h2>Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={employee.name}
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
                value={employee.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={employee.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Position:</label>
              <input
                type="text"
                name="position"
                className="form-control"
                value={employee.position}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Employee Type:</label>
              <select
                name="employeeType"
                className="form-select"
                value={employee.employeeType}
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
              <label className="form-label">Salary:</label>
              <input
                type="number"
                name="salary"
                className="form-control"
                value={employee.salary}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Company:</label>
              <input
                type="text"
                name="company"
                className="form-control"
                value={employee.company}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update Employee
            </button>
          </form>
        </div>

        <div className="mt-auto mb-3">
          <Link to="/employees">← Back to Employee List</Link>
        </div>
      </div>
    );
}

export default EditEmployee;