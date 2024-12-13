import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeaveRequestService from '../../Services/LeaveRequestService';
import BackButton from '../../components/Elements/BackButton';

const MyLeaveRequestDetailPage = () => {
    const { requestid } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchLeaveRequest = async () => {
        try {
            const response = await LeaveRequestService.get(requestid);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching leave request details:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaveRequest();
    }, []);

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
        </div>
    );
    if (isError) return <p>Error fetching leave requests</p>;

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

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const formatDateWithTime = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Leave Request Detail</h1>
            <div className="flex justify-center">
                {data ? (
                    <div className="bg-white border border-gray-300">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-300 uppercase leading-normal">
                                    <th colSpan="2" className="px-4 py-2">Request Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">ID</td>
                                    <td className="border border-gray-300 px-4 py-2">{data.requestId}</td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 font-bold">Requester</td>
                                    <td className="border border-gray-300 px-4 py-2">{data.name}</td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 font-bold">Submission Date</td>
                                    <td className="border border-gray-300 px-4 py-2">{formatDateWithTime(data.requestDate)}</td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 font-bold">Start Date</td>
                                    <td className="border border-gray-300 px-4 py-2">{formatDate(data.startDate)}</td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 font-bold">End Date</td>
                                    <td className="border border-gray-300 px-4 py-2">{formatDate(data.endDate)}</td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 font-bold">Total Days</td>
                                    <td className="border border-gray-300 px-4 py-2">{data.totalDays} Days</td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 font-bold">Leave Type</td>
                                    <td className="border border-gray-300 px-4 py-2">{data.leaveType}</td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 font-bold">Reason</td>
                                    <td className="border border-gray-300 px-4 py-2">{data.reason}</td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 font-bold">File</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {data.fileUrl && data.fileUrl !== 'https://localhost:7284/files/' ? (
                                            <a href={data.fileUrl} target="_blank" download rel="noopener noreferrer" className="text-blue-500 underline">
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-red-500">File not available</span>
                                        )}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 font-bold">Current Status</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(data.status)}`}>
                                            {data.status}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="min-w-full border-collapse border border-gray-300 mt-4">
                            <thead>
                                <tr className="bg-gray-300 uppercase leading-normal">
                                    <th colSpan="3" className="px-4 py-2">History</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Date</th>
                                    <th className="border border-gray-300 px-4 py-2">Action</th>
                                    <th className="border border-gray-300 px-4 py-2">Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.history.map((history, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {formatDateWithTime(history.actionDate)}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {history.action}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {history.comments}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No leave request found.</p>
                )}
            </div>

        </div >
    );
};

export default MyLeaveRequestDetailPage;
