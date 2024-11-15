import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Alert from '../../components/Elements/Alert';
import Label from '../../components/Elements/Label';
import Button from '../../components/Elements/Button';
import axios from 'axios';
import { GetAllEmployeesNoPages, GetAllProjectsNoPages, GetAssignmentById, UpdateAssignment } from '../../api';

const EditAssignmentPage = () => {
    const { empno, projno } = useParams();
    const [editAssignment, setEditAssignment] = useState({
        empno: '',
        projno: '',
        dateworked: '',
        hoursworked: ''
    });
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();

        const fetchAssignment = async () => {
            setEditAssignment(await GetAssignmentById(empno, projno));
        };

        const fetchEmployees = async () => {
            setEmployees(await GetAllEmployeesNoPages());
        };

        const fetchProjects = async () => {
            setProjects(await GetAllProjectsNoPages());
        };

        fetchAssignment();
        fetchEmployees();
        fetchProjects();
    }, [empno, projno]);

    const handleChange = (e) => {
        setEditAssignment({
            ...editAssignment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await UpdateAssignment(empno, projno, editAssignment);
        Alert('success', 'Assignment updated successfully');
        navigate('/assignments');
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-10 text-center">Edit Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="empno">Employee No</Label>
                        <select
                            name="empno"
                            id="empno"
                            ref={inputRef}
                            value={editAssignment.empno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                        >
                            {employees.map((employee) => (
                                <option key={employee.empno} value={employee.empno}>
                                    {employee.empno} - {employee.fname} {employee.lname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="projno">Project No</Label>
                        <select
                            name="projno"
                            id="projno"
                            value={editAssignment.projno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                        >
                            {projects.map((project) => (
                                <option key={project.projno} value={project.projno}>
                                    {project.projno} - {project.projname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="dateworked">Date Worked</Label>
                        <input
                            type="date"
                            name="dateworked"
                            id="dateworked"
                            value={editAssignment.dateworked}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <Label htmlFor="hoursworked">Hours Worked</Label>
                        <input
                            type="number"
                            name="hoursworked"
                            id="hoursworked"
                            value={editAssignment.hoursworked}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Hours Worked"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <Button type="submit">Update</Button>
                    <Link to="/assignments" className="ml-4">
                        <Button variant="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditAssignmentPage;
