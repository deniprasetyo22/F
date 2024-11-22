import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Alert from '../../components/Elements/Alert';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';
import axios from 'axios';
import Pagination from '../../components/Fragments/Pagination';
import EmployeeService from '../../Services/EmployeeService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import { formatDateTimeFromDB } from '../../components/Elements/DateTimeFormatFromDB';
import DepartmentService from '../../Services/DepartmentService';

const fetchEmployees = async ({ pageNumber, pageSize, sortField, sortOrder, searchQuery, searchType }) => {
    const params = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SortBy: sortField,
        SortOrder: sortOrder,
        Keyword: searchType === 'keyword' ? searchQuery : '',
        FullName: searchType === 'fullName' ? searchQuery : '',
        Department: searchType === 'department' ? searchQuery : '',
        Position: searchType === 'position' ? searchQuery : '',
        Level: searchType === 'level' ? searchQuery : '',
        EmpType: searchType === 'empType' ? searchQuery : '',
        LastUpdated: searchType === 'lastUpdated' ? searchQuery : ''
    };

    const { data } = await EmployeeService.getAll(params);
    return data;
};

const fetchDepartments = async () => {
    const { data } = await DepartmentService.getAllNoPages();
    return data;
};

const EmployeePage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const pageSizes = [5, 10, 25, 50];
    const [sortField, setSortField] = useState('empid');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('keyword'); // New state for search type

    // Query for Employees
    const { data: employeeData, isLoading: isLoadingEmployees, isError: isErrorEmployees, refetch } = useQuery({
        queryKey: ['employees', pageNumber, pageSize, sortField, sortOrder, searchQuery, searchType],
        queryFn: () => fetchEmployees({ pageNumber, pageSize, sortField, sortOrder, searchQuery, searchType }),
        placeholderData: keepPreviousData,
    });

    // Query for Departments
    const { data: departmentData, isLoading: isLoadingDepartments } = useQuery({
        queryKey: ['departments'],
        queryFn: fetchDepartments,
    });

    if (isLoadingEmployees || isLoadingDepartments) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }
    if (isErrorEmployees) return <p>Error fetching books</p>;

    const totalPages = Math.ceil(employeeData.total / pageSize);

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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPageNumber(1);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
        setSearchQuery(''); // Clear search query when changing type
        setPageNumber(1);
    };

    const handleDelete = async (empid) => {
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
                await EmployeeService.remove(empid);
                Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
                refetch();
            } catch (error) {
                console.error("Error deleting employee:", error);
                Swal.fire("Error", "Failed to delete the employee. Please try again later.", "error");
            }
        }
    };


    return (
        <div className="p-4 border rounded my-5">
            <h2 className="text-lg font-bold text-center mb-4">Employee List</h2>
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                <Button variant="bg-blue-600 hover:bg-blue-700">
                    <Link to="/employees/new" className="flex items-center">
                        <FontAwesomeIcon icon={faPlus} className="mr-1" />
                        <span className="text-sm">Add</span>
                    </Link>
                </Button>
                <div className="flex flex-col md:flex-row  md:space-x-2 w-full md:w-1/2 justify-end">
                    <select value={searchType} onChange={handleSearchTypeChange} className="border border-gray-300 p-2 rounded-lg mb-2 md:mb-0 md:w-1/4">
                        <option value="keyword">By Keyword</option>
                        <option value="fullName">By Full Name</option>
                        <option value="department">By Department</option>
                        <option value="position">By Position</option>
                        <option value="level">By Level</option>
                        <option value="empType">By Employee Type</option>
                        <option value="lastUpdated">By Last Updated</option>
                    </select>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder={`Search By ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`}
                        className="border border-gray-300 rounded-lg p-2 md:w-3/4"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-600 text-white">
                            <th className="border p-2">
                                <button
                                    onClick={() => handleSort('empid')}
                                    className="text-decoration-none text-dark p-0">
                                    Emp ID {getSortIcon('empid')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button
                                    onClick={() => handleSort('fname')}
                                    className="text-decoration-none text-dark p-0">
                                    Full Name {getSortIcon('fname')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button
                                    onClick={() => handleSort('deptid')}
                                    className="text-decoration-none text-dark p-0">
                                    Department {getSortIcon('deptid')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button
                                    onClick={() => handleSort('position')}
                                    className="text-decoration-none text-dark p-0">
                                    Job Position {getSortIcon('position')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button
                                    onClick={() => handleSort('level')}
                                    className="text-decoration-none text-dark p-0">
                                    Level {getSortIcon('level')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button
                                    onClick={() => handleSort('emptype')}
                                    className="text-decoration-none text-dark p-0">
                                    Employment Type {getSortIcon('emptype')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button
                                    onClick={() => handleSort('lastupdateddate')}
                                    className="text-decoration-none text-dark p-0">
                                    Last Updated {getSortIcon('lastupdateddate')}
                                </button>
                            </th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.data.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            employeeData.data.map((employee, index) => {
                                const department = departmentData.find(dept => dept.deptid === employee.deptid);
                                const deptInfo = department ? `${department.deptname}` : employee.deptid;

                                return (
                                    <tr key={employee.empid} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                        <td className="border p-2">{employee.empid}</td>
                                        <td className="border p-2">{employee.fname} {employee.lname}</td>
                                        <td className="border p-2">{deptInfo}</td>
                                        <td className="border p-2">{employee.position}</td>
                                        <td className="border p-2">{employee.level}</td>
                                        <td className="border p-2">{employee.emptype}</td>
                                        <td className="border p-2">{formatDateTimeFromDB(employee.lastupdateddate)}</td>
                                        <td className="p-2 flex justify-center items-center space-x-2">
                                            <Button variant="bg-yellow-500 hover:bg-yellow-600">
                                                <Link to={`/employees/${employee.empid}`}>
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                </Link>
                                            </Button>
                                            <Button variant="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(employee.empid)}>
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
                <select onChange={handlePageSizeChange}
                    value={pageSize}
                    className="border border-gray-300 rounded px-2 py-1"
                >
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

export default EmployeePage;
