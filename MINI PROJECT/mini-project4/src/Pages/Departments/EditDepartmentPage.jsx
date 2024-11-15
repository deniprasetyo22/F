import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import Alert from '../../components/Elements/Alert';
import axios from 'axios';
import { GetAllEmployeesNoPages, GetDepartmentById, UpdateDepartment } from '../../api';

const EditDepartmentPage = () => {
    const { deptno } = useParams();
    const navigate = useNavigate();
    const [editDepartment, setEditDepartment] = useState({
        deptno: deptno,
        deptname: '',
        mgrempno: '',
    });
    const [employees, setEmployees] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();

        const fetchDepartment = async () => {
            setEditDepartment(await GetDepartmentById(deptno));
        };

        const fetchEmployees = async () => {
            setEmployees(await GetAllEmployeesNoPages());
        };

        fetchDepartment();
        fetchEmployees();
    }, [deptno]);

    const handleChange = (e) => {
        setEditDepartment({
            ...editDepartment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await UpdateDepartment(deptno, editDepartment);
        Alert('success', 'Department updated successfully');
        navigate('/departments');
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-10 text-center">Edit Department</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="deptName">Department Name</Label>
                        <input
                            type="text"
                            name="deptname"
                            id="deptname"
                            ref={inputRef}
                            value={editDepartment.deptname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Name"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="mgrEmpNo">Manager Emp.No</Label>
                        <select
                            name="mgrempno"
                            id="mgrempno"
                            value={editDepartment.mgrempno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">Select Manager</option>
                            {employees.map((employee) => (
                                <option key={employee.empno} value={employee.empno}>
                                    {employee.empno} - {employee.fname} {employee.lname}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="text-center">
                    <Button type="submit">
                        Update
                    </Button>
                    <Link to="/departments" className="ml-4">
                        <Button variant="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditDepartmentPage;
