import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Pagination = ({ pageNumber, setPageNumber, pageSize, setPageSize, count }) => {
    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPageNumber(1);
    };

    return (
        <div className="mt-4 flex justify-center items-center space-x-4">
            <button
                className="border p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                onClick={handlePreviousPage}
                disabled={pageNumber === 1}
            >
                <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </button>

            <span className="text-lg font-semibold">{`Page ${pageNumber}`}</span>

            <button
                className='border p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50'
                onClick={handleNextPage}
                disabled={count < pageSize}
            >
                Next <FontAwesomeIcon icon={faArrowRight} />
            </button>

            <div>
                <select
                    name="pageSize"
                    id="pageSize"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="border p-2 rounded-md ml-4"
                >
                    <option value="5">5 / Page</option>
                    <option value="10">10 / Page</option>
                    <option value="20">20 / Page</option>
                    <option value="50">50 / Page</option>
                    <option value="100">100 / Page</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;
