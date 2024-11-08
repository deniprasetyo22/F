import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Elements/Alert';
import BackButton from '../../components/Elements/BackButton';
import Label from '../../components/Elements/Label';
import Button from '../../components/Elements/Button';

const AddAssignmentPage = () => {
    const [assignments, setAssignments] = useState({
        empNo: '',
        projNo: '',
        dateWorked: '',
        hoursWorked: ''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAssignments({
            ...assignments,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorMessage = {};

        if (!assignments.empNo) {
            errorMessage.empNo = 'Employee number is required';
        }
        if (!assignments.projNo) {
            errorMessage.projNo = 'Project number is required';
        }
        if (!assignments.dateWorked) {
            errorMessage.dateWorked = 'Date worked is required';
        }
        if (!assignments.hoursWorked) {
            errorMessage.hoursWorked = 'Hours worked is required';
        }

        setErrors(errorMessage);

        let formValid = true;
        for (let propName in errorMessage) {
            if (errorMessage[propName].length > 0) {
                formValid = false;
            }
        }

        if (formValid) {
            const newAssignment = { ...assignments };
            const storedAssignments = JSON.parse(localStorage.getItem('assignments')) || [];
            storedAssignments.push(newAssignment);
            localStorage.setItem('assignments', JSON.stringify(storedAssignments));
            Alert('success', 'Assignment added successfully');
            resetForm();
            navigate('/assignments');
        }
    };

    const resetForm = () => {
        setAssignments({
            empNo: '',
            projNo: '',
            dateWorked: '',
            hoursWorked: ''
        });
    };
    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/assignments" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="empNo">Employee Number</Label>
                        <input
                            type="text"
                            name="empNo"
                            id="empNo"
                            value={assignments.empNo}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Employee Number"
                        />
                        {errors.empNo && <small className="text-red-500">{errors.empNo}</small>}
                    </div>
                    <div>
                        <Label htmlFor="projNo">Project Number</Label>
                        <input
                            type="text"
                            name="projNo"
                            id="projNo"
                            value={assignments.projNo}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Project Number"
                        />
                        {errors.projNo && <small className="text-red-500">{errors.projNo}</small>}
                    </div>
                    <div>
                        <Label htmlFor="dateWorked">Date Worked</Label>
                        <input
                            type="date"
                            name="dateWorked"
                            id="dateWorked"
                            value={assignments.dateWorked}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                        {errors.dateWorked && <small className="text-red-500">{errors.dateWorked}</small>}
                    </div>
                    <div>
                        <Label htmlFor="hoursWorked">Hours Worked</Label>
                        <input
                            type="number"
                            name="hoursWorked"
                            id="hoursWorked"
                            value={assignments.hoursWorked}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Hours Worked"
                        />
                        {errors.hoursWorked && <small className="text-red-500">{errors.hoursWorked}</small>}
                    </div>
                </div>
                <div className="text-center">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default AddAssignmentPage;
