import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import Alert from '../../components/Elements/Alert';
import { GetAllDepartmentsNoPages, GetEmployeeById, UpdateEmployee } from '../../api';

const EditEmployeePage = () => {
    const { empno } = useParams();
    const navigate = useNavigate();
    const [editEmployee, setEditEmployee] = useState({
        empno: empno,
        fname: '',
        lname: '',
        address: '',
        dob: '',
        sex: '',
        position: '',
        deptno: ''
    });
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepartments(await GetAllDepartmentsNoPages());
        };
        fetchDepartments();
    }, []);

    const inputRef = useRef(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            setEditEmployee(await GetEmployeeById(empno));
        };

        fetchEmployee();
    }, [empno]);

    const handleChange = (e) => {
        setEditEmployee({
            ...editEmployee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await UpdateEmployee(empno, editEmployee);
        Alert('success', 'Employee updated successfully');
        navigate('/employees');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-10 text-center">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="fname">First Name</Label>
                        <input
                            type="text"
                            name="fname"
                            id="fname"
                            ref={inputRef}
                            value={editEmployee.fname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="lname">Last Name</Label>
                        <input
                            type="text"
                            name="lname"
                            id="lname"
                            value={editEmployee.lname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <textarea
                            name="address"
                            id="address"
                            value={editEmployee.address}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Address"
                        />
                    </div>
                    <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <input
                            type="date"
                            name="dob"
                            id="dob"
                            value={editEmployee.dob}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <Label htmlFor="sex">Sex</Label>
                        <select
                            name="sex"
                            id="sex"
                            value={editEmployee.sex}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="position">Position</Label>
                        <input
                            type="text"
                            name="position"
                            id="position"
                            value={editEmployee.position}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Position"
                        />
                    </div>
                    <div>
                        <Label htmlFor="deptno">Department Number</Label>
                        <select
                            name="deptno"
                            id="deptno"
                            value={editEmployee.deptno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Number"
                        >
                            <option value="">-- Select Department --</option>
                            {departments.map((department) => (
                                <option key={department.deptno} value={department.deptno}>
                                    {department.deptname}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="text-center">
                    <Button type="submit">
                        Update
                    </Button>
                    <Link to="/employees" className="ml-4">
                        <Button variant="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditEmployeePage;
