import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Alert from '../../components/Elements/Alert';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';
import axios from 'axios';
import { DeleteEmployee, GetAllDepartmentsNoPages, GetAllEmployees } from '../../api';
import Pagination from '../../components/Fragments/Pagination';

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmployees(await GetAllEmployees(pageNumber, pageSize));
        };
        fetchEmployees();
    }, [pageNumber, pageSize]);

    useEffect(() => {
        const getAllDepartments = async () => {
            setDepartments(await GetAllDepartmentsNoPages());
        };
        getAllDepartments();
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (search) {
            const filteredEmployees = employees.filter(employee =>
                `${employee.empno}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.fname}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.lname}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.address}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.dob}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.sex}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.position}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.deptNo}`.toLowerCase().includes(search.toLowerCase())
            );
            setEmployees(filteredEmployees);
        }
    }, [search, employees]);

    const handleDelete = async (empno) => {
        const result = await ConfirmationDelete();
        if (result.isConfirmed) {
            setLoading(true);
            await DeleteEmployee(empno);
            const updatedEmployees = await GetAllEmployees(pageNumber, pageSize);
            setEmployees(updatedEmployees);
            Alert('success', 'Employee has been deleted.');
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded my-5">
            <h2 className="text-lg font-bold text-center mb-4">Employee List</h2>
            <div className="flex justify-between items-center mb-2">
                <Button variant="bg-blue-600 hover:bg-blue-700">
                    <Link to="/employees/new">
                        <FontAwesomeIcon icon={faPlus} className="mr-1" />
                        <span className="text-sm">Add</span>
                    </Link>
                </Button>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border p-2 rounded-lg w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-600 text-white">
                            <th className="border p-2">Emp.No</th>
                            <th className="border p-2">Full Name</th>
                            <th className="border p-2">Address</th>
                            <th className="border p-2">DOB</th>
                            <th className="border p-2">Sex</th>
                            <th className="border p-2">Position</th>
                            <th className="border p-2">Dept.No</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            employees.map((employee, index) => (
                                <tr key={employee.empno} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{employee.empno}</td>
                                    <td className="border p-2">{employee.fname} {employee.lname}</td>
                                    <td className="border p-2">{employee.address}</td>
                                    <td className="border p-2">{employee.dob}</td>
                                    <td className="border p-2">{employee.sex}</td>
                                    <td className="border p-2">{employee.position}</td>
                                    <td className="border p-2">{employee.deptno} - {departments.find(dept => dept.deptno === employee.deptno)?.deptname}</td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Button variant="bg-yellow-500 hover:bg-yellow-600">
                                            <Link to={`/employees/${employee.empno}`}>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </Link>
                                        </Button>
                                        <Button variant="bg-red-500 hover:bg-red-600"
                                            onClick={() => handleDelete(employee.empno)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
                count={employees.length}
            />

        </div>
    );
};

export default EmployeePage;
