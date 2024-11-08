import React, { useState } from 'react';
import shortid from 'shortid';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import BackButton from '../../components/Elements/BackButton';
import Alert from '../../components/Elements/Alert';
import { useNavigate } from 'react-router-dom';

const AddDepartmentPage = () => {
    const [departments, setDepartments] = useState({
        deptNo: '',
        deptName: '',
        mgrEmpNo: ''
    });

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setDepartments({
            ...departments,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDeptNo = shortid.generate();

        let errorMessage = {};

        if (!departments.deptName) {
            errorMessage.deptName = 'Department name is required';
        }
        if (!departments.mgrEmpNo) {
            errorMessage.mgrEmpNo = 'Manager employee number is required';
        }

        setErrors(errorMessage);

        let formValid = true;
        for (let propName in errorMessage) {
            if (errorMessage[propName].length > 0) {
                formValid = false;
            }
        };

        if (formValid) {
            const newDepartment = ({ ...departments, deptNo: newDeptNo });
            const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
            storedDepartments.push(newDepartment);
            localStorage.setItem('departments', JSON.stringify(storedDepartments));
            Alert('success', 'Department added successfully');
            resetForm();
            navigate('/departments');
        };
    };

    const resetForm = () => {
        setDepartments({
            deptNo: '',
            deptName: '',
            mgrEmpNo: ''
        });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/departments" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add Department</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="deptName">Department Name</Label>
                        <input
                            type="text"
                            name="deptName"
                            id="deptName"
                            value={departments.deptName}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Name"
                        />
                        {errors.deptName && <small className="text-red-500">{errors.deptName}</small>}
                    </div>
                    <div>
                        <Label htmlFor="mgrEmpNo">Manager Employee Number</Label>
                        <input
                            type="text"
                            name="mgrEmpNo"
                            id="mgrEmpNo"
                            value={departments.mgrEmpNo}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Manager Employee Number"
                        />
                        {errors.mgrEmpNo && <small className="text-red-500">{errors.mgrEmpNo}</small>}
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
