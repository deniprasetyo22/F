import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Alert from '../../components/Elements/Alert';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';
import axios from 'axios';
import { DeleteProject, GetAllDepartmentsNoPages, GetAllProjects } from '../../api';
import Pagination from '../../components/Fragments/Pagination';

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            setProjects(await GetAllProjects(pageNumber, pageSize));
        };
        fetchProjects();
    }, [pageNumber, pageSize]);

    useEffect(() => {
        const fetchDeparments = async () => {
            setDepartments(await GetAllDepartmentsNoPages());
        };
        fetchDeparments();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (search) {
            const filteredProjects = projects.filter(project =>
                `${project.projno}`.toLowerCase().includes(search.toLowerCase()) ||
                `${project.projname}`.toLowerCase().includes(search.toLowerCase()) ||
                `${project.deptno}`.toLowerCase().includes(search.toLowerCase())
            );
            setProjects(filteredProjects);
        }
    }, [search, projects]);

    const handleDelete = async (projno) => {
        const result = await ConfirmationDelete();
        if (result.isConfirmed) {
            setLoading(true);
            await DeleteProject(projno);
            const updatedProjects = await GetAllProjects(pageNumber, pageSize);
            setProjects(updatedProjects);
            Alert('success', 'Project has been deleted');
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
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
                <Button variant="bg-blue-600 hover:bg-blue-700">
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
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            projects.map((project, index) => (
                                <tr key={project.projno} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{project.projno}</td>
                                    <td className="border p-2">{project.projname}</td>
                                    <td className="border p-2">{project.deptno} - {departments.find(dept => dept.deptno === project.deptno)?.deptname}</td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Button variant="bg-yellow-500 hover:bg-yellow-600">
                                            <Link to={`/projects/${project.projno}`}>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </Link>
                                        </Button>
                                        <Button variant="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(project.projno)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
                count={projects.length}
            />
        </div>
    );
};

export default ProjectPage;
