import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import BackButton from '../../components/Elements/BackButton';
import Alert from '../../components/Elements/Alert';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { CreateEmployee, GetAllDepartmentsNoPages } from '../../api';

const AddEmployeePage = () => {
    const [employees, setEmployees] = useState({
        fname: '',
        lname: '',
        address: '',
        dob: '',
        sex: '',
        position: '',
        deptno: ''
    });
    const [departments, setDepartments] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepartments(await GetAllDepartmentsNoPages());
        };
        fetchDepartments();
    }, []);

    const inputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setEmployees({
            ...employees, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorMessage = {};

        if (!employees.fname) {
            errorMessage.fname = 'First name is required';
        }
        if (!employees.address) {
            errorMessage.address = 'Address is required';
        }
        if (!employees.dob) {
            errorMessage.dob = 'Date of birth is required';
        }
        if (!employees.sex) {
            errorMessage.sex = 'Sex is required';
        }
        if (!employees.position) {
            errorMessage.position = 'Position is required';
        }
        if (!employees.deptno) {
            errorMessage.deptno = 'Department number is required';
        }

        setErrors(errorMessage);

        if (Object.keys(errorMessage).length === 0) {
            await CreateEmployee(employees);
            Alert('success', 'Employee added successfully');
            navigate('/employees');
        }
    };

    const resetForm = () => {
        setEmployees({
            fname: '',
            lname: '',
            address: '',
            dob: '',
            sex: '',
            position: '',
            deptno: ''
        });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/employees" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="fname">First Name</Label>
                        <input
                            type="text"
                            name="fname"
                            id="fname"
                            ref={inputRef}
                            value={employees.fname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="First Name"
                        />
                        {errors.fname && <small className="text-red-500">{errors.fname}</small>}
                    </div>
                    <div>
                        <Label htmlFor="lname">Last Name</Label>
                        <input
                            type="text"
                            name="lname"
                            id="lname"
                            value={employees.lname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <textarea
                            type="text"
                            name="address"
                            id="address"
                            value={employees.address}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Address"
                        />
                        {errors.address && <small className="text-red-500">{errors.address}</small>}
                    </div>
                    <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <input
                            type="date"
                            name="dob"
                            id="dob"
                            value={employees.dob}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                        {errors.dob && <small className="text-red-500">{errors.dob}</small>}
                    </div>
                    <div>
                        <Label htmlFor="sex">Sex</Label>
                        <select
                            name="sex"
                            id="sex"
                            value={employees.sex}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.sex && <small className="text-red-500">{errors.sex}</small>}
                    </div>
                    <div>
                        <Label htmlFor="position">Position</Label>
                        <input
                            type="text"
                            name="position"
                            id="position"
                            value={employees.position}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Position"
                        />
                        {errors.position && <small className="text-red-500">{errors.position}</small>}
                    </div>
                    <div>
                        <Label htmlFor="deptno">Department Number</Label>
                        <select
                            name="deptno"
                            id="deptno"
                            value={employees.deptno}
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
                        {errors.deptno && <small className="text-red-500">{errors.deptno}</small>}
                    </div>
                </div>
                <div className="text-center">
                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployeePage;
