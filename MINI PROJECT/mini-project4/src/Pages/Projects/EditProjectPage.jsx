import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import Alert from '../../components/Elements/Alert';
import axios from 'axios';
import { GetAllDepartmentsNoPages, GetProjectById, UpdateProject } from '../../api';

const EditProjectPage = () => {
    const { projno } = useParams();
    const [editProject, setEditProject] = useState({
        projno: projno,
        projname: '',
        deptno: ''
    });
    const [departments, setDepartments] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();

        const fetchProject = async () => {
            setEditProject(await GetProjectById(projno));
        };

        const fetchDeparments = async () => {
            setDepartments(await GetAllDepartmentsNoPages());
        };

        fetchProject();
        fetchDeparments();
    }, [projno]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setEditProject({
            ...editProject,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await UpdateProject(editProject.projno, editProject);
        Alert('success', 'Project updated successfully');
        navigate('/projects');
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-10 text-center">Edit Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="projname">Project Name</Label>
                        <input
                            type="text"
                            name="projname"
                            id="projname"
                            ref={inputRef}
                            value={editProject.projname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Project Name"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="deptno">Department Number</Label>
                        <select
                            name="deptno"
                            id="deptno"
                            value={editProject.deptno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            {departments.map((department) => (
                                <option value={department.deptno} key={department.deptno}>{department.deptno} - {department.deptname}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="text-center">
                    <Button type="submit">Update</Button>
                    <Link to="/projects" className="ml-4">
                        <Button variant="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditProjectPage;
