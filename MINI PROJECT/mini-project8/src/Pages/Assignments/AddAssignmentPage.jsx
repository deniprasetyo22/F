import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Elements/Alert';
import BackButton from '../../components/Elements/BackButton';
import Label from '../../components/Elements/Label';
import Button from '../../components/Elements/Button';
import EmployeeService from '../../Services/EmployeeService';
import ProjectService from '../../Services/ProjectService';
import AssignmentService from '../../Services/AssignmentService';

const AddAssignmentPage = () => {
    const [assignments, setAssignments] = useState({
        empid: '',
        projid: '',
        dateworked: '',
        hoursworked: '',
        userid: ''
    });
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await EmployeeService.getAllNoPages();
                setEmployees(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchProjects = async () => {
            try {
                const response = await ProjectService.getAllNoPages();
                setProjects(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmployees();
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssignments((prev) => ({
            ...prev,
            [name]: value
        }));

        if (name === 'empid') {
            const selectedEmployee = employees.find(emp => emp.empid === parseInt(value));
            if (selectedEmployee) {
                setAssignments(prev => ({
                    ...prev,
                    userid: selectedEmployee.userId
                }));
            } else {
                setAssignments(prev => ({
                    ...prev,
                    userid: ''
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorMessage = {};

        if (!assignments.empid) {
            errorMessage.empid = 'Employee number is required';
        }
        if (!assignments.projid) {
            errorMessage.projid = 'Project number is required';
        }
        if (!assignments.dateworked) {
            errorMessage.dateworked = 'Date worked is required';
        }
        if (!assignments.hoursworked) {
            errorMessage.hoursworked = 'Hours worked is required';
        }

        setErrors(errorMessage);

        if (Object.keys(errorMessage).length === 0) {
            try {
                const response = await AssignmentService.create(assignments);
                const successMessage = response.data.message || 'Assignment added successfully';
                Alert('success', successMessage);
                navigate('/assignments');
                resetForm();
            } catch (error) {
                console.error(error);
                const errorMessage = error.response?.data?.message || 'Failed to add assignment';
                Alert('error', errorMessage);
            }
        }
    };

    const resetForm = () => {
        setAssignments({
            empid: '',
            projid: '',
            dateworked: '',
            hoursworked: '',
            userid: ''
        });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/assignments" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="empid">Employee Number</Label>
                        <select
                            name="empid"
                            id="empid"
                            value={assignments.empid}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Employee Number"
                        >
                            <option value="">-- Select Employee --</option>
                            {employees.map((emp) => (
                                <option
                                    key={emp.empid} value={emp.empid} >{emp.empid} - {emp.fname} {emp.lname}
                                </option>
                            ))}
                        </select>
                        {errors.empid && <small className="text-red-500">{errors.empid}</small>}
                    </div>
                    <div>
                        <Label htmlFor="projid">Project Number</Label>
                        <select
                            name="projid"
                            id="projid"
                            value={assignments.projid}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Project Number"
                        >
                            <option value="">-- Select Project --</option>
                            {projects.map((proj) => (
                                <option key={proj.projid} value={proj.projid} >{proj.projid} - {proj.projname}</option>
                            ))}
                        </select>
                        {errors.projid && <small className="text-red-500">{errors.projid}</small>}
                    </div>
                    <div>
                        <Label htmlFor="dateworked">Date Worked</Label>
                        <input
                            type="date"
                            name="dateworked"
                            id="dateworked"
                            value={assignments.dateworked}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                        {errors.dateworked && <small className="text-red-500">{errors.dateworked}</small>}
                    </div>
                    <div>
                        <Label htmlFor="hoursworked">Hours Worked</Label>
                        <input
                            type="number"
                            name="hoursworked"
                            id="hoursworked"
                            value={assignments.hoursworked}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Hours Worked"
                        />
                        {errors.hoursworked && <small className="text-red-500">{errors.hoursworked}</small>}
                    </div>
                    {/* Input hidden untuk userid */}
                    <input
                        type="hidden"
                        name="userid"
                        value={assignments.userid}
                    />
                </div>
                <div className="text-center">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default AddAssignmentPage;
