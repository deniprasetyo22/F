import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';
import Alert from '../../components/Elements/Alert';
import axios from 'axios';
import Pagination from '../../components/Fragments/Pagination';
import { DeleteDepartment, GetAllDepartments, GetAllEmployeesNoPages } from '../../api';

const DepartmentPage = () => {
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchDeparments = async () => {
            setDepartments(await GetAllDepartments(pageNumber, pageSize));
        };

        fetchDeparments();
    }, [pageNumber, pageSize]);

    useEffect(() => {
        const getAllEmployees = async () => {
            setEmployees(await GetAllEmployeesNoPages());
        };

        getAllEmployees();
    }, []);

    const handleDelete = async (deptno) => {
        const result = await ConfirmationDelete();
        if (result.isConfirmed) {
            setLoading(true);
            await DeleteDepartment(deptno);
            const updatedDepartments = await GetAllDepartments(pageNumber, pageSize);
            setDepartments(updatedDepartments);
            Alert('success', 'Department has been deleted.');
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const filteredDepartments = departments.filter(department =>
        `${department.deptno}`.toLowerCase().includes(search.toLowerCase()) ||
        `${department.deptname}`.toLowerCase().includes(search.toLowerCase()) ||
        `${department.mgrempno}`.toLowerCase().includes(search.toLowerCase()) ||
        employees.find(emp => emp.empno === department.mgrempno &&
            (emp.fname.toLowerCase().includes(search.toLowerCase()) ||
                emp.lname.toLowerCase().includes(search.toLowerCase())))
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded my-5">
            <h2 className="text-lg font-bold text-center mb-4">Department List</h2>
            <div className="flex justify-between items-center mb-2">
                <Button variant="bg-blue-600 hover:bg-blue-700">
                    <Link to="/departments/new">
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
                            <th className="border p-2">Dept.No</th>
                            <th className="border p-2">Department Name</th>
                            <th className="border p-2">Manager Emp.No</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDepartments.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            filteredDepartments.map((department, index) => (
                                <tr key={department.deptno} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{department.deptno}</td>
                                    <td className="border p-2">{department.deptname}</td>
                                    <td className="border p-2">
                                        {department.mgrempno} - {employees.find(e => e.empno === department.mgrempno)?.fname} {employees.find(e => e.empno === department.mgrempno)?.lname}
                                    </td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Button variant="bg-yellow-500 hover:bg-yellow-600">
                                            <Link to={`/departments/${department.deptno}`}>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </Link>
                                        </Button>
                                        <Button variant="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(department.deptno)}>
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
                count={departments.length}
            />
        </div>
    );
};

export default DepartmentPage;
