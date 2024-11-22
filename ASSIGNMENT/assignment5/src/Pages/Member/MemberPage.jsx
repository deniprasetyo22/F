import React, { useEffect, useState } from 'react';
import { faPlus, faArrowUpRightFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import MemberService from '../../Services/MemberService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Loading from '../../components/Elements/Loading';
import ReactPaginate from 'react-paginate';

const fetchMembers = async ({ pageNumber, pageSize, searchQuery, searchType, sortField, sortOrder }) => {
    const params = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        Keyword: searchType === 'keyword' ? searchQuery : '',
        UserId: searchType === 'userId' ? searchQuery : '',
        FullName: searchType === 'fullName' ? searchQuery : '',
        Position: searchType === 'position' ? searchQuery : '',
        LibraryCardNumber: searchType === 'libraryCardNumber' ? searchQuery : '',
        SortBy: sortField,
        SortOrder: sortOrder,
    };

    const { data } = await MemberService.getAll(params);
    return data;
};

const MemberPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const pageSizes = [5, 10, 25, 50];
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('keyword');
    const [sortField, setSortField] = useState('userId'); // Default sort field
    const [sortOrder, setSortOrder] = useState('desc'); // Default sort order

    const { data, isLoading, isError } = useQuery({
        queryKey: ['members', pageNumber, pageSize, searchQuery, searchType, sortField, sortOrder],
        queryFn: () => fetchMembers({ pageNumber, pageSize, searchQuery, searchType, sortField, sortOrder }),
        placeholderData: keepPreviousData,
    });

    if (isLoading) return <Loading isLoading={isLoading} />;
    if (isError) return <p>Error fetching members</p>;

    const totalPages = Math.ceil(data.total / pageSize);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPageNumber(1); // Reset to first page on search
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
        setSearchQuery(''); // Clear search query when changing type
        setPageNumber(1); // Reset to first page on search type change
    };

    const handleDelete = (memberId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                MemberService.remove(memberId).then(() => {
                    Swal.fire('Deleted!', 'Your member has been deleted.', 'success');
                    // Refetch members after deletion
                    refetch();
                }).catch(error => {
                    Swal.fire('Error!', 'Failed to delete the member.', 'error');
                });
            }
        });
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

    return (
        <div className="p-4 border rounded mb-5">
            <h2 className="text-lg font-bold text-center mb-5">Member List</h2>
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                <Link to="/members/add" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    <span className="text-sm">Add</span>
                </Link>
                <div className="flex flex-col md:flex-row md:space-x-2 w-full md:w-1/2 justify-end">
                    <select value={searchType} onChange={handleSearchTypeChange} className="border border-gray-300 p-2 rounded-lg mb-2 md:mb-0 md:w-1/4">
                        <option value="keyword">By Keyword</option>
                        <option value="userId">By User ID</option>
                        <option value="fullName">By Full Name</option>
                        <option value="position">By Position</option>
                        <option value="libraryCardNumber">By Library Card Number</option>
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
                                <button onClick={() => handleSort('userId')} className="text-decoration-none text-dark p-0">
                                    ID {getSortIcon('userId')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button onClick={() => handleSort('firstname')} className="text-decoration-none text-dark p-0">
                                    Full Name {getSortIcon('firstname')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button onClick={() => handleSort('position')} className="text-decoration-none text-dark p-0">
                                    Position {getSortIcon('position')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button onClick={() => handleSort('libraryCardNumber')} className="text-decoration-none text-dark p-0">
                                    Library Card Number {getSortIcon('libraryCardNumber')}
                                </button>
                            </th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            data.data.map((member, index) => (
                                <tr key={member.userId} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{member.userId}</td>
                                    <td className="border p-2">{member.firstName} {member.lastName}</td>
                                    <td className="border p-2">{member.position}</td>
                                    <td className="border p-2">{member.libraryCardNumber}</td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Link to={`/members/${member.userId}`} className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded mr-2 px-3">
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(member.userId)}
                                            className="bg-red-500 hover:bg-red-600 text-white p-1 px-3 rounded"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-3">
                {"Items per Page: "}
                <select onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize} className="border border-gray-300 rounded px-2 py-1">
                    {pageSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center mt-4 mb-4">
                <ReactPaginate
                    previousLabel={<span className="border hover:bg-blue-600 hover:text-white rounded px-3 py-1">{"<"}</span>}
                    nextLabel={<span className="border hover:bg-blue-600 hover:text-white rounded px-3 py-1">{">"}</span>}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) => setPageNumber(selected + 1)}
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

export default MemberPage;
