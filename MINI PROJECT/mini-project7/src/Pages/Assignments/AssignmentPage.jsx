import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Alert from '../../components/Elements/Alert';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import AssignmentService from '../../Services/AssignmentService';

const fetchAssignments = async ({ pageNumber, pageSize, searchQuery }) => {
    const params = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        Keyword: searchQuery,
    };
    const { data } = await AssignmentService.getAll(params);
    return data;
};

const AssignmentPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    // Query for Assignments
    const { data: assignmentData, isLoading, isError } = useQuery({
        queryKey: ['assignments', pageNumber, pageSize, searchQuery],
        queryFn: () => fetchAssignments({ pageNumber, pageSize, searchQuery }),
        keepPreviousData: true,
    });

    const totalPages = Math.ceil(assignmentData?.total / pageSize || 1);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    if (isError) {
        return <p>Error fetching assignments</p>;
    }

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPageNumber(1);
    };

    const handlePageClick = (event) => {
        setPageNumber(event.selected + 1);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPageNumber(1);
    };

    const handleDelete = async (empno, projno) => {
        const result = await ConfirmationDelete();
        if (result.isConfirmed) {
            try {
                await worksonService.remove(empno, projno);
                Alert('success', 'Assignment has been deleted');
                // Refetch assignments after deletion
                await fetchAssignments({ pageNumber, pageSize, searchQuery });
            } catch (error) {
                console.error("Error deleting assignment:", error);
                Swal.fire("Error", "Failed to delete the assignment. Please try again later.", "error");
            }
        }
    };

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
                    value={searchQuery}
                    onChange={handleSearchChange}
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
                        {assignmentData.data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            assignmentData.data.map((assignment, index) => (
                                <tr key={assignment.empno + assignment.projno} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{assignment.empno}</td>
                                    <td className="border p-2">{assignment.projno}</td>
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
            <div className="mt-3">
                {"Items per Page: "}
                <select onChange={handlePageSizeChange} value={pageSize} className="border border-gray-300 rounded px-2 py-1">
                    {[5, 10, 25, 50].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center">
                <ReactPaginate
                    previousLabel={<span className="border hover:bg-blue-600 hover:text-white rounded px-3 py-1">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </span>}
                    nextLabel={<span className="border hover:bg-blue-600 hover:text-white rounded px-3 py-1">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </span>}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination flex items-center space-x-2"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link border px-3 py-1 rounded-md hover:bg-blue-600"}
                    previousClassName={"previous-button"}
                    nextClassName={"next-button"}
                    activeClassName={"bg-blue-600 text-white rounded-md py-1"}
                />
            </div>
        </div>
    );
};

export default AssignmentPage;
