import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./EmployeeList.css";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc")
    const pageSize = 20;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/employees?page=${page}&size=${pageSize}&sortBy=${sortField}&direction=${sortDirection}`)
            .then(response => {
                setEmployees(response.data.content); //contains employee list
                setTotalPages(response.data.totalPages); //total number of pages
            })
            .catch(error => {
                console.error('There was an error fetching employees!', error);
            });
    }, [page, sortField, sortDirection]);

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    }

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Employee List</h2>
            <Link to="/add" className="btn btn-primary mb-3">
                Add Employee
            </Link>
            <table className="table table-bordered table-striped mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th onClick={() => { handleSort('name') }} style={{ cursor: 'pointer' }}>
                            Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                        </th>
                        <th>Email</th>
                        <th onClick={() => { handleSort('position') }} style={{ cursor: 'pointer' }}>
                            Job Title {sortField === 'position' && (sortDirection === 'asc' ? '▲' : '▼')}
                        </th>
                        <th onClick={() => { handleSort('company') }} style={{ cursor: 'pointer' }}>
                            Company {sortField === 'company' && (sortDirection === 'asc' ? '▲' : '▼')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr
                            key={emp.id}
                            className="table-row-hover"
                            onClick={() => navigate(`/employees/${emp.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.position}</td>
                            <td>{emp.company}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-secondary"
                    onClick={handlePrev}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <span>
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    className="btn btn-secondary"
                    onClick={handleNext}
                    disabled={page === totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default EmployeeList;