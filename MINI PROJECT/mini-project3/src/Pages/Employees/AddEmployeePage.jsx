import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import shortid from 'shortid';
import BackButton from '../../components/Elements/BackButton';
import Alert from '../../components/Elements/Alert';
import { useNavigate } from 'react-router-dom';

const AddEmployeePage = () => {
    const [employees, setEmployees] = useState({
        empNo: '',
        fName: '',
        lName: '',
        address: '',
        dob: '',
        sex: '',
        position: '',
        deptNo: ''
    });

    const [errors, setErrors] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmpNo = shortid.generate();

        let errorMessage = {};

        if (!employees.fName) {
            errorMessage.fName = 'First name is required';
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
        if (!employees.deptNo) {
            errorMessage.deptNo = 'Department number is required';
        }

        setErrors(errorMessage);

        let formValid = true;
        for (let propName in errorMessage) {
            if (errorMessage[propName].length > 0) {
                formValid = false;
            }
        }

        if (formValid) {
            const newEmployee = { ...employees, empNo: newEmpNo };
            const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
            storedEmployees.push(newEmployee);
            localStorage.setItem('employees', JSON.stringify(storedEmployees));
            Alert("success", "Employee added successfully");
            resetForm();
            navigate('/employees');
        }
    };

    const resetForm = () => {
        setEmployees({
            empNo: '',
            fName: '',
            lName: '',
            address: '',
            dob: '',
            sex: '',
            position: '',
            deptNo: ''
        });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/employees" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="fName">First Name</Label>
                        <input
                            type="text"
                            name="fName"
                            id="fName"
                            ref={inputRef}
                            value={employees.fName}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="First Name"
                        />
                        {errors.fName && <small className="text-red-500">{errors.fName}</small>}
                    </div>
                    <div>
                        <Label htmlFor="lName">Last Name</Label>
                        <input
                            type="text"
                            name="lName"
                            id="lName"
                            value={employees.lName}
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
                        <Label htmlFor="deptNo">Department Number</Label>
                        <input
                            type="text"
                            name="deptNo"
                            id="deptNo"
                            value={employees.deptNo}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Number"
                        />
                        {errors.deptNo && <small className="text-red-500">{errors.deptNo}</small>}
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
