import { faArrowUpRightFromSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/Elements/Alert';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';
import Button from '../../components/Elements/Button';

const AssignmentPage = () => {
    const [loading, setLoading] = useState(true);
    const [assignments, setAssignments] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredAssignments, setFilteredAssignments] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const storedAssignments = JSON.parse(localStorage.getItem('assignments')) || [];
        setAssignments(storedAssignments);
    }, []);

    useEffect(() => {
        setFilteredAssignments(
            assignments.filter(assignment =>
                `${assignment.empNo}`.toLowerCase().includes(search.toLowerCase()) ||
                `${assignment.projNo}`.toLowerCase().includes(search.toLowerCase()) ||
                `${assignment.dateWorked}`.toLowerCase().includes(search.toLowerCase()) ||
                `${assignment.hoursWorked}`.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, assignments]);

    const handleDelete = (assignmentId) => {
        ConfirmationDelete()
            .then((result) => {
                if (result.isConfirmed) {
                    const newAssignments = assignments.filter(
                        (assignment) => assignment.empNo + assignment.projNo !== assignmentId
                    );
                    localStorage.setItem('assignments', JSON.stringify(newAssignments));
                    setAssignments(newAssignments);
                    Alert('success', 'Assignment has been deleted.');
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
            <h2 className="text-lg font-bold text-center mb-4">Assignment List</h2>
            <div className="flex justify-between items-center mb-2">
                <Button variant="bg-blue-600 hover:bg-blue-700 mb-2">
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
                                <tr
                                    key={assignment.empNo + assignment.projNo}
                                    className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}
                                >
                                    <td className="border p-2">{assignment.empNo}</td>
                                    <td className="border p-2">{assignment.projNo}</td>
                                    <td className="border p-2">{assignment.dateWorked}</td>
                                    <td className="border p-2">{assignment.hoursWorked}</td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Button variant="bg-yellow-500 hover:bg-yellow-600">
                                            <Link to={`/assignments/${assignment.empNo}/${assignment.projNo}`}>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="bg-red-500 hover:bg-red-600"
                                            onClick={() => handleDelete(assignment.empNo + assignment.projNo)}
                                        >
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

export default AssignmentPage;
