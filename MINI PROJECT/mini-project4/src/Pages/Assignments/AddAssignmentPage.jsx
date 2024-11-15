import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Elements/Alert';
import BackButton from '../../components/Elements/BackButton';
import Label from '../../components/Elements/Label';
import Button from '../../components/Elements/Button';
import axios from 'axios';

const AddAssignmentPage = () => {
    const [assignments, setAssignments] = useState({
        empno: '',
        projno: '',
        dateworked: '',
        hoursworked: ''
    });
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://localhost:7171/api/v1/Employee/nopages');
                setEmployees(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://localhost:7171/api/v1/Project/nopages');
                setProjects(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmployees();
        fetchProjects();
    }, []);

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAssignments({
            ...assignments,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorMessage = {};

        if (!assignments.empno) {
            errorMessage.empno = 'Employee number is required';
        }
        if (!assignments.projno) {
            errorMessage.projno = 'Project number is required';
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
                await axios.post('https://localhost:7171/api/v1/workson', assignments);
                Alert('success', 'Assignment added successfully');
                navigate('/assignments');
            } catch (error) {
                console.error(error);
                Alert('error', 'Failed to add assignment');
            }
        }
    };

    const resetForm = () => {
        setAssignments({
            empno: '',
            projno: '',
            dateworked: '',
            hoursworked: ''
        });
    };
    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/assignments" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="empno">Employee Number</Label>
                        <select
                            name="empno"
                            id="empno"
                            value={assignments.empno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Employee Number"
                        >
                            <option value="">-- Select Employee --</option>
                            {employees.map((emp) => (
                                <option key={emp.empno} value={emp.empno} >{emp.empno} - {emp.fname} {emp.lname}</option>
                            ))}
                        </select>
                        {errors.empno && <small className="text-red-500">{errors.empno}</small>}
                    </div>
                    <div>
                        <Label htmlFor="projno">Project Number</Label>
                        <select
                            type="text"
                            name="projno"
                            id="projno"
                            value={assignments.projno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Project Number"
                        >
                            <option value="">-- Select Project --</option>
                            {projects.map((proj) => (
                                <option key={proj.projno} value={proj.projno} >{proj.projno} - {proj.projname}</option>
                            ))}
                        </select>
                        {errors.projno && <small className="text-red-500">{errors.projno}</small>}
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
                </div>
                <div className="text-center">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default AddAssignmentPage;
