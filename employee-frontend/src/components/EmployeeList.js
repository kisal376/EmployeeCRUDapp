import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching employees!', error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2>Employee List</h2>
            <Link to="/add" className="btn btn-primary mb-3">
                Add Employee
            </Link>
            <table className="table table-bordered table-striped mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Job Title</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>
                                <Link to={`/employees/${emp.id}`}>{emp.name}</Link>
                            </td>
                            <td>{emp.email}</td>
                            <td>{emp.position}</td>
                            <td>{emp.company}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;