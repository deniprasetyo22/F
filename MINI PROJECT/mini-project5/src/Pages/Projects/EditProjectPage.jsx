import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProjectService from '../../Services/ProjectService';
import DepartmentService from '../../Services/DepartmentService';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import Alert from '../../components/Elements/Alert';

const EditProjectPage = () => {
    const { projid } = useParams();
    const navigate = useNavigate();
    const [editProject, setEditProject] = useState({
        projid: projid,
        projname: '',
        deptid: ''
    });
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch departments
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await DepartmentService.getAllNoPages();
                setDepartments(response.data);
            } catch (err) {
                console.error("Error fetching departments:", err);
                setError("Failed to fetch departments.");
            }
        };

        fetchDepartments();
    }, []);

    // Fetch project data
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await ProjectService.get(projid);
                setEditProject(response.data);
            } catch (err) {
                console.error("Error fetching project details:", err);
                setError("Failed to fetch project details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projid]);

    const handleChange = (e) => {
        setEditProject({
            ...editProject,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ProjectService.update(projid, editProject);
            Alert('success', 'Project updated successfully');
            navigate(`/projects/${projid}`); // Redirect to project details page
        } catch (err) {
            console.error("Error updating project:", err);
            Alert('error', 'Failed to update project. Please try again later.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

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
                            value={editProject.projname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Project Name"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="deptid">Department</Label>
                        <select
                            name="deptid"
                            id="deptid"
                            value={editProject.deptid}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">-- Select Department --</option>
                            {departments.map((department) => (
                                <option key={department.deptid} value={department.deptid}>
                                    {department.deptid} - {department.deptname}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="text-center">
                    <Button type="submit">Update</Button>
                    <Link to={`/projects/${projid}`} className="ml-4">
                        <Button variant="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditProjectPage;
