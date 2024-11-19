import React, { useState } from 'react';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faTrash, faPlus, faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Elements/Button';
import BookService from '../../Services/BookService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

const fetchBooks = async ({ pageNumber, pageSize, searchQuery, sortField, sortOrder }) => {
    const { data } = await BookService.getAll({
        PageNumber: pageNumber,
        PageSize: pageSize,
        Keyword: searchQuery,
        SortBy: sortField,
        SortOrder: sortOrder
    });
    return data;
};

const BookPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const pageSizes = [5, 10, 25, 50];
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['books', pageNumber, pageSize, sortField, sortOrder],
        queryFn: () => fetchBooks({ pageNumber, pageSize, sortField, sortOrder }),
        placeholderData: keepPreviousData
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching books</p>;

    const totalPages = Math.ceil(data.total / pageSize);

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPageNumber(1);
    };

    const handleDeleteBook = async (bookId) => {
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
                await BookService.remove(bookId);
                Swal.fire('Deleted!', 'Your book has been deleted.', 'success');
            } catch (error) {
                console.error("Error deleting book:", error);
                Swal.fire("Error", "Failed to delete the book. Please try again later.", "error");
            }
        }
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


    return (
        <div className="p-4 border rounded mb-5">
            <h2 className="text-lg font-bold text-center">Book List</h2>
            <div className="py-4">
                <Link to="/books/add" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow transition duration-200">
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    <span className="font-semibold text-sm">Add</span>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-600 text-white">
                            <th className="border p-2">
                                <button variant="link"
                                    onClick={() => handleSort('bookId')}
                                    className="text-decoration-none text-dark p-0">
                                    ID {getSortIcon('bookId')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button variant="link"
                                    onClick={() => handleSort('title')}
                                    className="text-decoration-none text-dark p-0">
                                    Title {getSortIcon('title')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button variant="link"
                                    onClick={() => handleSort('author')}
                                    className="text-decoration-none text-dark p-0">
                                    Author {getSortIcon('author')}
                                </button>
                            </th>
                            <th className="border p-2">
                                <button variant="link"
                                    onClick={() => handleSort('isbn')}
                                    className="text-decoration-none text-dark p-0">
                                    ISBN {getSortIcon('isbn')}
                                </button>
                            </th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((book, index) => (
                            <tr key={book.bookId} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                <td className="border p-2">{book.bookId}</td>
                                <td className="border p-2">{book.title}</td>
                                <td className="border p-2">{book.author}</td>
                                <td className="border p-2">{book.isbn}</td>
                                <td className="border p-2 flex justify-center space-x-2">
                                    <Link to={`/books/${book.bookId}`} className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded mr-2 px-3 flex items-center">
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </Link>
                                    <Button onClick={() => handleDeleteBook(book.bookId)} variant="bg-red-500 hover:bg-red-600">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

                <div className="flex justify-center mt-4 mb-4">
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
                        pageRangeDisplayed={5}
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
        </div>
    );
};

export default BookPage;
