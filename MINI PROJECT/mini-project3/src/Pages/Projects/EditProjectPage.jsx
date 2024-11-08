import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import Alert from '../../components/Elements/Alert';

const EditProjectPage = () => {
    const { projNo } = useParams();
    const navigate = useNavigate();
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = projects.find((proj) => proj.projNo === projNo);

    const [editProject, setEditProject] = useState({
        ...project,
        projNo: projNo,
    });

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setEditProject({
            ...editProject,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProjects = projects.map((proj) =>
            proj.projNo === projNo ? editProject : proj
        );
        localStorage.setItem('projects', JSON.stringify(updatedProjects));

        Alert('success', 'Project has been updated.');
        navigate('/projects');
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-10 text-center">Edit Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="projName">Project Name</Label>
                        <input
                            type="text"
                            name="projName"
                            id="projName"
                            ref={inputRef}
                            value={editProject.projName}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Project Name"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="deptNo">Department Number</Label>
                        <input
                            type="text"
                            name="deptNo"
                            id="deptNo"
                            value={editProject.deptNo}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Number"
                            required
                        />
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
