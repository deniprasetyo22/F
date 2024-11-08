import React, { useEffect, useState } from 'react';
import Button from '../../components/Elements/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowUpRightFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../components/Elements/Alert';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';

const ProjectPage = () => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjects(projects);
    }, []);

    useEffect(() => {
        if (Array.isArray(projects)) {
            setFilteredProjects(
                projects.filter(project =>
                    `${project.projNo}`.toLowerCase().includes(search.toLowerCase()) ||
                    `${project.projName}`.toLowerCase().includes(search.toLowerCase()) ||
                    `${project.deptNo}`.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, projects]);

    const handleDelete = (projNo) => {
        ConfirmationDelete().then((result) => {
            if (result.isConfirmed) {
                const newProjects = projects.filter((project) => project.projNo !== projNo);
                localStorage.setItem('projects', JSON.stringify(newProjects));
                setProjects(newProjects);
                Alert('success', 'Project has been deleted.');
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded my-5">
            <h2 className="text-lg font-bold text-center mb-4">Project List</h2>
            <div className="flex justify-between items-center mb-2">
                <Button variant="bg-blue-600 hover:bg-blue-700 mb-2">
                    <Link to="/projects/new">
                        <FontAwesomeIcon icon={faPlus} className="mr-1" />
                        <span className="text-sm">Add</span>
                    </Link>
                </Button>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border p-2 rounded-lg w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-600 text-white">
                            <th className="border p-2">Project No</th>
                            <th className="border p-2">Project Name</th>
                            <th className="border p-2">Department No</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="border p-2 text-center">
                                    No items to display
                                </td>
                            </tr>
                        ) : (
                            filteredProjects.map((project, index) => (
                                <tr key={project.projNo} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{project.projNo}</td>
                                    <td className="border p-2">{project.projName}</td>
                                    <td className="border p-2">{project.deptNo}</td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Button variant="bg-yellow-500 hover:bg-yellow-600">
                                            <Link to={`/projects/${project.projNo}`}>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </Link>
                                        </Button>
                                        <Button variant="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(project.projNo)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectPage;
