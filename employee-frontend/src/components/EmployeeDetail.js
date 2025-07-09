import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

function EmployeeDetail(){
    const {id} = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true) ;
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/employees/${id}`)
        .then(response => {
            setEmployee(response.data);
            setLoading(false);
        })
        .catch(err => {
            setError('Failed to fetch details');
            setLoading(false);
        });
    }, [id]);

    const handleDelete = () => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this employee?"
      );
      if (!confirmed) return;

      axios
        .delete(`http://localhost:8080/employees/${id}`)
        .then(() => {
          alert("Employee deleted successfully.");
          navigate("/employees"); // Go back to list after deletion
        })
        .catch(() => {
          alert("Failed to delete employee.");
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!employee) return <div>No employee found.</div>;

    return (
      <div
        className="container mt-4 d-flex flex-column"
        style={{ minHeight: "90vh" }}
      >
        <div>
          <h2>Employee Details</h2>
          <p>
            <strong>Name:</strong> {employee.name}
          </p>
          <p>
          <p>
            <strong>Date of Birth:</strong> {employee.dateOfBirth}
          </p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Job Title:</strong> {employee.position}
          </p>
          <p>
            <strong>Employee Type:</strong> {employee.employeeType}
          </p>
          <p>
            <strong>Salary:</strong> {employee.salary}
          </p>
          <p>
            <strong>Company:</strong> {employee.company}
          </p>

          <div className="mt-3">
            <Link to={`/edit/${employee.id}`} className="btn btn-warning me-2">
              Edit Employee
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete Employee
            </button>
          </div>
        </div>

        <div className="mt-auto mb-3">
          <Link to="/employees">← Back to Employee List</Link>
        </div>
      </div>
    );
}

export default EmployeeDetail;
