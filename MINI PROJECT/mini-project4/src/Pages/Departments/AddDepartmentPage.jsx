import React, { useEffect, useState } from 'react';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import BackButton from '../../components/Elements/BackButton';
import Alert from '../../components/Elements/Alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreateDepartment, GetAllEmployeesNoPages } from '../../api';

const AddDepartmentPage = () => {
    const [departments, setDepartments] = useState({
        deptname: '',
        mgrempno: ''
    });
    const [employees, setEmployees] = useState([]);

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setDepartments({
            ...departments,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            setEmployees(await GetAllEmployeesNoPages());
        }
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorMessage = {};

        if (!departments.deptname) {
            errorMessage.deptname = 'Department name is required';
        }
        if (!departments.mgrempno) {
            errorMessage.mgrempno = 'Manager employee number is required';
        }

        setErrors(errorMessage);

        if (Object.keys(errorMessage).length === 0) {
            await CreateDepartment(departments);
            Alert('success', 'Department added successfully');
            navigate('/departments');
        }

    };

    const resetForm = () => {
        setDepartments({
            deptname: '',
            mgrempno: ''
        });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/departments" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add Department</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="deptname">Department Name</Label>
                        <input
                            type="text"
                            name="deptname"
                            id="deptname"
                            value={departments.deptname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Name"
                        />
                        {errors.deptname && <small className="text-red-500">{errors.deptname}</small>}
                    </div>
                    <div>
                        <Label htmlFor="mgrempno">Manager Employee Number</Label>
                        <select
                            name="mgrempno"
                            id="mgrempno"
                            value={departments.mgrempno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            <option value="">Select a Manager</option>
                            {employees.map((employee) => (
                                <option key={employee.empno} value={employee.empno}>
                                    {employee.empno} - {employee.fname} {employee.lname}
                                </option>
                            ))}
                        </select>
                        {errors.mgrempno && <small className="text-red-500">{errors.mgrempno}</small>}
                    </div>
                </div>
                <div className="text-center">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default AddDepartmentPage;
