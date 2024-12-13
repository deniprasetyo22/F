import React, { useEffect, useState, useRef } from 'react';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import BackButton from '../../components/Elements/BackButton';
import Alert from '../../components/Elements/Alert';
import { useNavigate } from 'react-router-dom';
import DepartmentService from '../../Services/DepartmentService';
import ProjectService from '../../Services/ProjectService';

const AddProjectPage = () => {
    const [project, setProject] = useState({
        projname: '',
        deptid: ''
    });
    const [departments, setDepartments] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await DepartmentService.getAllNoPages();
                setDepartments(response.data);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            }
        };

        fetchDepartments();
        inputRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors

        // Basic validation
        const newErrors = {};
        if (!project.projname) newErrors.projname = "Project name is required.";
        if (!project.deptid) newErrors.deptid = "Department is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await ProjectService.create(project);
            Alert('success', 'Project added successfully');
            resetForm();
            navigate('/projects'); // Redirect to projects page after successful submission
        } catch (error) {
            console.error("Error adding project:", error);
            Alert('error', 'Failed to add project. Please try again later.');
        }
    };

    const resetForm = () => {
        setProject({
            projname: '',
            deptid: ''
        });
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
                            value={project.projname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Project Name"
                            ref={inputRef}
                        />
                        {errors.projname && <small className="text-red-500">{errors.projname}</small>}
                    </div>
                    <div>
                        <Label htmlFor="deptid">Department</Label>
                        <select
                            name="deptid"
                            id="deptid"
                            value={project.deptid}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.deptid} value={dept.deptid}>
                                    {dept.deptname}
                                </option>
                            ))}
                        </select>
                        {errors.deptid && <small className="text-red-500">{errors.deptid}</small>}
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
