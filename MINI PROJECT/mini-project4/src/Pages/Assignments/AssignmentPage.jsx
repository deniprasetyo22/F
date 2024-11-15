import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Alert from '../../components/Elements/Alert';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';
import axios from 'axios';
import { DeleteAssignment, GetAllAssignments, GetAllEmployeesNoPages, GetAllProjectsNoPages } from '../../api';
import Pagination from '../../components/Fragments/Pagination';

const AssignmentPage = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getAllAssignments = async () => {
            setAssignments(await GetAllAssignments(pageNumber, pageSize));
        };
        getAllAssignments();
    }, [pageNumber, pageSize]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    })

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmployees(await GetAllEmployeesNoPages());
        };

        const fetchProjects = async () => {
            setProjects(await GetAllProjectsNoPages());
        }

        fetchEmployees();
        fetchProjects();
    }, []);

    const handleDelete = async (empno, projno) => {
        const result = await ConfirmationDelete();
        if (result.isConfirmed) {
            setLoading(true);
            await DeleteAssignment(empno, projno);
            const updatedAssignments = await GetAllAssignments(pageNumber, pageSize);
            setAssignments(updatedAssignments);
            Alert('success', 'Assignment has been deleted');
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const filteredAssignments = assignments.filter(assignment => {
        const employee = employees.find(e => e.empno === assignment.empno);
        const project = projects.find(p => p.projno === assignment.projno);

        return (
            `${assignment.empno}`.toLowerCase().includes(search.toLowerCase()) ||
            `${assignment.projno}`.toLowerCase().includes(search.toLowerCase()) ||
            `${assignment.dateworked}`.toLowerCase().includes(search.toLowerCase()) ||
            `${assignment.hoursworked}`.toLowerCase().includes(search.toLowerCase()) ||
            (employee && `${employee.fname}`.toLowerCase().includes(search.toLowerCase())) ||
            (employee && `${employee.lname}`.toLowerCase().includes(search.toLowerCase())) ||
            (project && `${project.projname}`.toLowerCase().includes(search.toLowerCase()))
        );
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded my-5">
            <h2 className="text-lg font-bold text-center mb-4">Assignment List</h2>
            <div className="flex justify-between items-center mb-2">
                <Button variant="bg-blue-600 hover:bg-blue-700">
                    <Link to="/assignments/new">
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
                            <th className="border p-2">Employee No</th>
                            <th className="border p-2">Project No</th>
                            <th className="border p-2">Date Worked</th>
                            <th className="border p-2">Hours Worked</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssignments.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            filteredAssignments.map((assignment, index) => (
                                <tr key={assignment.empno + assignment.projno} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{assignment.empno} - {employees.find(e => e.empno === assignment.empno)?.fname + ' ' + employees.find(e => e.empno === assignment.empno)?.lname}</td>
                                    <td className="border p-2">{assignment.projno} - {projects.find(p => p.projno === assignment.projno)?.projname}</td>
                                    <td className="border p-2">{assignment.dateworked}</td>
                                    <td className="border p-2">{assignment.hoursworked}</td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Button variant="bg-yellow-500 hover:bg-yellow-600">
                                            <Link to={`/assignments/${assignment.empno}/${assignment.projno}`}>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </Link>
                                        </Button>
                                        <Button variant="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(assignment.empno, assignment.projno)}>
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
                count={assignments.length}
            />
        </div>
    );
};

export default AssignmentPage;

