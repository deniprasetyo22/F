import { faArrowLeft, faArrowRight, faArrowUpRightFromSquare, faEye, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import BookService from '../../Services/BookService';
import ReactPaginate from 'react-paginate';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loading from '../../components/Elements/Loading';

const fetchBooks = async ({ pageNumber, pageSize, searchQuery }) => {
    const { data } = await BookService.getAll({
        PageNumber: pageNumber,
        PageSize: pageSize,
        Keyword: searchQuery
    });
    return data;
};

const SearchPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const pageSizes = [8, 16, 32, 64];
    const [searchQuery, setSearchQuery] = useState('');


    const { data, isLoading, isError } = useQuery({
        queryKey: ['books', pageNumber, pageSize, searchQuery],
        queryFn: () => fetchBooks({ pageNumber, pageSize, searchQuery }),
        placeholderData: keepPreviousData
    });

    if (isLoading) return <Loading isLoading={isLoading} />;
    if (isError) return <p>Error fetching books</p>;

    const totalPages = Math.ceil(data.total / pageSize);

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPageNumber(1);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setPageNumber(1);
    };

    const handlePageClick = (event) => {
        setPageNumber(event.selected + 1);
    };

    return (
        <div className="p-4 border rounded mb-5">
            <h2 className="text-lg font-bold text-center">"Search Book"</h2>
            <div className="relative mb-4 mt-5 px-3">
                <div className="absolute inset-y-0 left-5 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search books..."
                    className="pl-14 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out w-full"
                    onChange={handleSearch}
                    value={searchQuery}
                />
            </div>
            <div className="overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {data.data.map((book) => (
                        <div key={book.bookId} className="bg-white border border-gray-300 rounded-lg shadow-md transition duration-200 hover:shadow-lg overflow-hidden">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                                    <Link to={`/books/${book.bookId}`}>
                                        {book.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-700">Author: {book.author}</p>
                                <p className="text-gray-600">ISBN: {book.isbn}</p>
                                <p className="text-gray-600">ID: {book.bookId}</p>
                            </div>
                        </div>
                    ))}
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

export default SearchPage;