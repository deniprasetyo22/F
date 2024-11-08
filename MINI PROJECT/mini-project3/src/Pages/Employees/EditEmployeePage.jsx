import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import Alert from '../../components/Elements/Alert';

const EditEmployeePage = () => {
    const { empNo } = useParams();
    const navigate = useNavigate();
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = employees.find((emp) => emp.empNo === empNo);

    const [editEmployee, setEditEmployee] = useState({
        ...employee, empNo: empNo,
    });

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setEditEmployee({
            ...editEmployee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedEmployees = employees.map((emp) =>
            emp.empNo === empNo ? editEmployee : emp
        );
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        Alert('success', 'Employee has been updated.');
        navigate('/employees');
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-10 text-center">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="fName">First Name</Label>
                        <input
                            type="text"
                            name="fName"
                            id="fName"
                            ref={inputRef}
                            value={editEmployee.fName}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="lName">Last Name</Label>
                        <input
                            type="text"
                            name="lName"
                            id="lName"
                            value={editEmployee.lName}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <textarea
                            type="text"
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
                        <Label htmlFor="deptNo">Department Number</Label>
                        <input
                            type="text"
                            name="deptNo"
                            id="deptNo"
                            value={editEmployee.deptNo}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Number"
                        />
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
