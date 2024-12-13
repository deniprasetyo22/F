import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Alert from '../../components/Elements/Alert';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';
import ProjectService from '../../Services/ProjectService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import DepartmentService from '../../Services/DepartmentService';

const fetchProjects = async ({ pageNumber, pageSize, sortField, sortOrder, searchQuery }) => {
    const { data } = await ProjectService.getAll({
        PageNumber: pageNumber,
        PageSize: pageSize,
        SortBy: sortField,
        SortOrder: sortOrder,
        Keyword: searchQuery
    });
    return data;
};

const fetchDepartments = async () => {
    const { data } = await DepartmentService.getAllNoPages();
    return data;
};

const ProjectPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const pageSizes = [5, 10, 25, 50];
    const [sortField, setSortField] = useState('projid');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: projectData, isLoading: isLoadingProjects, isError, refetch } = useQuery({
        queryKey: ['projects', pageNumber, pageSize, sortField, sortOrder, searchQuery],
        queryFn: () => fetchProjects({ pageNumber, pageSize, sortField, sortOrder, searchQuery }),
        placeholderData: keepPreviousData,
    });

    const { data: departmentData, isLoading: isLoadingDepartments } = useQuery({
        queryKey: ['departments'],
        queryFn: fetchDepartments,
    });

    if (isLoadingProjects || isLoadingDepartments) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    if (isError) {
        return <p className="text-red-500">Error fetching projects</p>;
    }

    const totalPages = Math.ceil(projectData.total / pageSize);

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPageNumber(1);
    };

    const handlePageClick = (event) => {
        setPageNumber(event.selected + 1);
    };

    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return '↕️';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setPageNumber(1);
    };

    const handleDelete = async (projid) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await ProjectService.remove(projid);
                Swal.fire('Deleted!', 'Project has been deleted.', 'success');
                refetch();
            } catch (error) {
                console.error("Error deleting project:", error);
                Swal.fire("Error", "Failed to delete the project. Please try again later.", "error");
            }
        }
    };

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
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-600 text-white">
                            <th className="border p-2 cursor-pointer" onClick={() => handleSort('projid')}>
                                Project No {getSortIcon('projid')}
                            </th>
                            <th className="border p-2 cursor-pointer" onClick={() => handleSort('projname')}>
                                Project Name {getSortIcon('projname')}
                            </th>
                            <th className="border p-2 cursor-pointer" onClick={() => handleSort('deptid')}>
                                Department No {getSortIcon('deptid')}
                            </th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectData.data.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            projectData.data.map((project, index) => {
                                const department = departmentData.find(dept => dept.deptid === project.deptid);
                                const deptInfo = department ? department.deptname : project.deptid;

                                return (
                                    <tr key={project.projid} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                        <td className="border p-2">{project.projid}</td>
                                        <td className="border p-2">{project.projname}</td>
                                        <td className="border p-2">{deptInfo}</td>
                                        <td className="border p-2 flex justify-center space-x-2">
                                            <Button variant="bg-yellow-500 hover:bg-yellow-600">
                                                <Link to={`/projects/${project.projid}`}>
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                </Link>
                                            </Button>
                                            <Button variant="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(project.projid)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-3">
                {"Items per Page: "}
                <select onChange={handlePageSizeChange} value={pageSize} className="border border-gray-300 rounded px-2 py-1">
                    {pageSizes.map((size) => (
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

export default ProjectPage;
