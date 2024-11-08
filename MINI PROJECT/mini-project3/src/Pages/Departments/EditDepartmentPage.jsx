import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import Alert from '../../components/Elements/Alert';

const EditDepartmentPage = () => {
    const { deptNo } = useParams();
    const navigate = useNavigate();
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    const department = departments.find((dept) => dept.deptNo === deptNo);

    const [editDepartment, setEditDepartment] = useState({
        ...department, deptNo: deptNo,
    });

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setEditDepartment({
            ...editDepartment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDepartments = departments.map((dept) =>
            dept.deptNo === deptNo ? editDepartment : dept
        );
        localStorage.setItem('departments', JSON.stringify(updatedDepartments));

        Alert('success', 'Department has been updated');
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
                            name="deptName"
                            id="deptName"
                            ref={inputRef}
                            value={editDepartment.deptName}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Name"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="mgrEmpNo">Manager Emp.No</Label>
                        <input
                            type="text"
                            name="mgrEmpNo"
                            id="mgrEmpNo"
                            value={editDepartment.mgrEmpNo}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Manager Employee Number"
                        />
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
