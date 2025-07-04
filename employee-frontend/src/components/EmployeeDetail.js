import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

function EmployeeDetail(){
    const {id} = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true) ;
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!employee) return <div>No employee found.</div>;

    return (
        <div className="container mt-4">
            <h2>Employee Details</h2>
            <Link to={`/edit/${employee.id}`} className="btn btn-warning">
                Edit Employee
            </Link>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Job Title:</strong> {employee.position}</p>
            <p><strong>Company:</strong> {employee.company}</p>
            {/* Add any other fields you have */}
    
            <Link to="/">
            <i className="bi bi-arrow-left"></i> Back to Employee List
            </Link>
        </div>
        );
}

export default EmployeeDetail;
