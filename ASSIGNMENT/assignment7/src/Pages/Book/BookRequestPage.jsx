import React, { useState } from 'react';
import BookRequestService from '../../Services/BookRequestService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Loading from '../../components/Elements/Loading';

const fetchBookRequest = async () => {
    const { data } = await BookRequestService.getAll();
    return data;
}


const BookRequestPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['bookRequests'],
        queryFn: fetchBookRequest,
        placeholderData: keepPreviousData
    });

    if (isLoading) return <Loading isLoading={isLoading} />;
    if (isError) return <p>Error fetching book requests</p>;

    const getStatusClass = (status) => {
        switch (status) {
            case 'Reviewed By Librarian':
                return 'bg-yellow-200 text-yellow-800';
            case 'Reviewed By Manager':
                return 'bg-blue-200 text-blue-800';
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
            <h1 className="text-2xl font-bold mb-4 text-center">Book Request List</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase leading-normal">
                        <th className="py-3 px-6">No</th>
                        <th className="py-3 px-6">Request Date</th>
                        <th className="py-3 px-6">Requester</th>
                        <th className="py-3 px-6">Book Title</th>
                        <th className="py-3 px-6">Author</th>
                        <th className="py-3 px-6">Publisher</th>
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="border p-2 text-center">No items to display</td>
                        </tr>
                    ) : (
                        data.data.map((bookRequest, index) => {
                            return (
                                <tr key={bookRequest.requestid} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                    <td className="py-3 px-6">{bookRequest.requestid}</td>
                                    <td className="py-3 px-6">{new Date(bookRequest.process.requestdate).toLocaleString()}</td>
                                    <td className="py-3 px-6">{bookRequest.process.requester.userName}</td>
                                    <td className="py-3 px-6">{bookRequest.title}</td>
                                    <td className="py-3 px-6">{bookRequest.author}</td>
                                    <td className="py-3 px-6">{bookRequest.publisher}</td>
                                    <td className="py-3 px-6">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(bookRequest.process.status)}`}>
                                            {bookRequest.process.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div >
    );
};

export default BookRequestPage;
