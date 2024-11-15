import React, { useEffect, useState } from 'react';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import BackButton from '../../components/Elements/BackButton';
import Alert from '../../components/Elements/Alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreateProject, GetAllDepartmentsNoPages } from '../../api';

const AddProjectPage = () => {
    const [projects, setProjects] = useState({
        projname: '',
        deptno: ''
    });
    const [departments, setDepartments] = useState([]);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepartments(await GetAllDepartmentsNoPages());
        };

        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        setProjects({
            ...projects,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorMessage = {};

        if (!projects.projname) {
            errorMessage.projname = 'Project name is required';
        }

        if (!projects.deptno) {
            errorMessage.deptno = 'Department number is required';
        }
        setErrors(errorMessage);

        if (Object.keys(errorMessage).length === 0) {
            await CreateProject(projects);
            Alert('success', 'Project added successfully');
            navigate('/projects');
        }
    };


    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/projects" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="projname">Project Name</Label>
                        <input
                            type="text"
                            name="projname"
                            id="projname"
                            value={projects.projname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Project Name"
                        />
                        {errors.projname && <small className="text-red-500">{errors.projname}</small>}
                    </div>
                    <div>
                        <Label htmlFor="deptno">Department Number</Label>
                        <select
                            name="deptno"
                            id="deptno"
                            value={projects.deptno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.deptno} value={dept.deptno}>
                                    {dept.deptname}
                                </option>
                            ))}
                        </select>
                        {errors.deptno && <small className="text-red-500">{errors.deptno}</small>}
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

export default AddProjectPage;
