import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faTrash, faPlus, faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Elements/Button';
import BookService from '../../Services/BookService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import Loading from '../../components/Elements/Loading';

const fetchBooks = async ({ pageNumber, pageSize, searchQuery, sortField, sortOrder, searchType }) => {
    const params = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SortBy: sortField,
        SortOrder: sortOrder,
        Keyword: searchType === 'keyword' ? searchQuery : '',
        BookId: searchType === 'bookId' ? searchQuery : '',
        Title: searchType === 'title' ? searchQuery : '',
        Author: searchType === 'author' ? searchQuery : '',
        ISBN: searchType === 'isbn' ? searchQuery : '',
    };

    const { data } = await BookService.getAll(params);
    return data;
};

const BookPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const pageSizes = [5, 10, 25, 50];
    const [sortField, setSortField] = useState('bookId');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('keyword');

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['books', pageNumber, pageSize, sortField, sortOrder, searchQuery, searchType],
        queryFn: () => fetchBooks({ pageNumber, pageSize, sortField, sortOrder, searchQuery, searchType }),
        placeholderData: keepPreviousData,
    });

    if (isLoading) return <Loading isLoading={isLoading} />;
    if (isError) return <p>Error fetching books</p>;

    const totalPages = Math.ceil(data.total / pageSize);

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
                refetch();
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
            <h2 className="text-lg font-bold text-center mb-5">Book List</h2>
            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                <Button variant="bg-blue-600 hover:bg-blue-700">
                    <Link to="/books/add" className="flex items-center">
                        <FontAwesomeIcon icon={faPlus} className="mr-1" />
                        <span className="text-sm">Add</span>
                    </Link>
                </Button>
                <div className="flex flex-col md:flex-row  md:space-x-2 w-full md:w-1/2 justify-end">
                    <select value={searchType} onChange={handleSearchTypeChange} className="border border-gray-300 p-2 rounded-lg mb-2 md:mb-0 md:w-1/4">
                        <option value="keyword">By Keyword</option>
                        <option value="bookId">By Book ID</option>
                        <option value="title">By Title</option>
                        <option value="author">By Author</option>
                        <option value="isbn">By ISBN</option>
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
                                <button variant="link"
                                    onClick={() => handleSort('bookid')}
                                    className="text-decoration-none text-dark p-0">
                                    ID {getSortIcon('bookid')}
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
