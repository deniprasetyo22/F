import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import LeaveRequestService from '../../Services/LeaveRequestService';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { formatDateTimeFromDB } from '../../components/Elements/DateTimeFormatFromDB';

const fetchLeaveRequest = async ({ pageNumber, pageSize, sortField, sortOrder, searchQuery, searchType }) => {
    const params = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SortBy: sortField,
        SortOrder: sortOrder,
        Keyword: searchType === 'keyword' ? searchQuery : '',
        Name: searchType === 'name' ? searchQuery : '',
        LeaveType: searchType === 'leaveType' ? searchQuery : '',
        CurrentStatus: searchType === 'status' ? searchQuery : '',
        RequestDate: searchType === 'requestDate' ? searchQuery : ''
    };

    const { data } = await LeaveRequestService.getAllPaging(params);
    return data;
};

const LeaveRequestPages = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortField, setSortField] = useState('requestid');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('keyword');

    const { user: currentUser } = useSelector((state) => state.auth);
    const userRole = currentUser?.roles[0];

    const { data, isLoading, isError } = useQuery({
        queryKey: ['leaveRequest', pageNumber, pageSize, sortField, sortOrder, searchQuery, searchType],
        queryFn: () => fetchLeaveRequest({ pageNumber, pageSize, sortField, sortOrder, searchQuery, searchType }),
        placeholderData: keepPreviousData,
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
        </div>
    );
    if (isError) return <p>Error fetching leave requests</p>;

    const totalPages = Math.ceil(data.total / pageSize);

    const handlePageClick = (event) => {
        setPageNumber(event.selected + 1);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPageNumber(1);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPageNumber(1);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
        setSearchQuery('');
        setPageNumber(1);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Reviewed By Supervisor':
            case 'Reviewed By HR Manager':
                return 'bg-yellow-200 text-yellow-800';
            case 'Approved':
                return 'bg-green-200 text-green-800';
            case 'Rejected':
                return 'bg-red-200 text-red-800';
            default:
                return '';
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Leave Request List</h1>
            <div className="flex justify-between mb-4">
                <select value={pageSize} onChange={handlePageSizeChange} className="border border-gray-300 p-2 rounded-lg">
                    {[5, 10, 25, 50].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                <div className="flex flex-col md:flex-row  md:space-x-2 w-full md:w-1/2 justify-end">
                    <select value={searchType} onChange={handleSearchTypeChange} className="border border-gray-300 p-2 rounded-lg mb-2 md:mb-0 md:w-1/4">
                        <option value="keyword">By Keyword</option>
                        <option value="name">By Name</option>
                        <option value="leaveType">By Leave Type</option>
                        <option value="status">By Current Status</option>
                        <option value="requestDate">By Submission Date</option>
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
                            <th className="border py-3 px-6">ID</th>
                            <th className="border py-3 px-6">Name</th>
                            <th className="border py-3 px-6">Leave Type</th>
                            <th className="border py-3 px-6">Current Status</th>
                            <th className="border py-3 px-6">Submission Date</th>
                            <th className="border py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            data.data.map((leaveRequest, index) => (
                                <tr key={leaveRequest.requestid} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                    <td className="border py-3 px-6">{leaveRequest.requestid}</td>
                                    <td className="border py-3 px-6">{leaveRequest.emp.fname} {leaveRequest.emp.lname}</td>
                                    <td className="border py-3 px-6">{leaveRequest.leavetype}</td>
                                    <td className="border py-3 px-6">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(leaveRequest.process.status)}`}>
                                            {leaveRequest.process.status}
                                        </span>
                                    </td>
                                    <td className="border py-3 px-6">{formatDateTimeFromDB(leaveRequest.process.requestdate)}</td>
                                    <td className="border py-3 px-6">
                                        <Link to={`/leaverequest/${leaveRequest.requestid}`} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                                            Review
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination flex items-center space-x-2'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link border px-3 py-1 rounded-md hover:bg-blue-600'}
                    previousClassName={'previous-button'}
                    nextClassName={'next-button'}
                    activeClassName={'bg-blue-600 text-white rounded-md py-1'}
                />
            </div>
        </div>
    );
};

export default LeaveRequestPages;
