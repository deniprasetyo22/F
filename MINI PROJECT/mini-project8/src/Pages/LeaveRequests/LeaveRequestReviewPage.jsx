import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LeaveRequestService from '../../Services/LeaveRequestService';
import BackButton from '../../components/Elements/BackButton';
import Swal from 'sweetalert2';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';

const LeaveRequestReviewPage = () => {
    const { requestid } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [status, setStatus] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user: currentUser, message } = useSelector((state) => state.auth);

    const userRole = currentUser?.roles[0];

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

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const processId = data?.processId;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!status) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Please select a status before submitting.',
            });
            return;
        }

        const payload = { status };
        setIsLoading(true);

        try {
            await LeaveRequestService.approval(processId, payload);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Leave request status updated successfully',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/leaverequests');
        } catch (error) {
            console.error('Error updating leave request status:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while updating the status.',
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setIsLoading(false);
            closeModal();
        }
    };


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // const handleActionSubmit = (e) => {
    //     e.preventDefault();
    //     handleSubmit(e);
    //     closeModal();
    // };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Leave Request Review</h1>
            <div className="flex flex-col items-center">
                {data ? (
                    <table className="bg-white border border-gray-300 md:w-1/2">
                        <thead>
                            <tr className="bg-gray-300 uppercase leading-normal">
                                <th colSpan="2" className="px-4 py-2">Request Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">ID</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/2">{data.requestId}</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">Requester</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/2">{data.name}</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">Submission Date</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/2">{formatDateWithTime(data.requestDate)}</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">Start Date</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/2">{formatDate(data.startDate)}</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">End Date</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/2">{formatDate(data.endDate)}</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">Total Days</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/2">{data.totalDays} Days</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">Leave Type</td>
                                <td className="border border-gray-300 px-4 py-2">{data.leaveType}</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">Reason</td>
                                <td className="border border-gray-300 px-4 py-2">{data.reason}</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">File</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/2">
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
                                <td className="border border-gray-300 px-4 py-2 font-bold w-1/2">Current Status</td>
                                <td className="border border-gray-300 px-4 py-2 w-1/2">
                                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(data.status)}`}>
                                        {data.status}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No leave request found.</p>
                )}
                {userRole === 'Administrator' && (
                    <button type="button" onClick={openModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Update Status
                    </button>
                )}

                {userRole === 'HR Manager' && data.status === 'Reviewed By HR Manager' && (
                    <button type="button" onClick={openModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Update Status
                    </button>
                )}

                {userRole === 'Employee Supervisor' && data.status === 'Reviewed By Supervisor' && (
                    <button type="button" onClick={openModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Update Status
                    </button>
                )}
            </div>

            {/* Modal for status approval/rejection */}
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '500px',
                        height: '300px',
                        padding: '20px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: dim the background
                    }
                }}
            >
                <div className='flex flex-col items-center justify-center h-full gap-y-5'>
                    <h2 className="text-lg font-bold mb-4">Update Leave Request Status</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='flex items-center'>
                            <label>
                                <input
                                    type="radio"
                                    value="Approve"
                                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                                    checked={status === 'Approve'}
                                    onChange={handleStatusChange}
                                />
                                Approved
                            </label>
                            <label className="ml-4">
                                <input
                                    type="radio"
                                    value="Reject"
                                    checked={status === 'Reject'}
                                    onChange={handleStatusChange}
                                />
                                Rejected
                            </label>
                        </div>
                        <div className="mt-10">
                            <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
                            <button type="button" onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                        </div>
                    </form>
                </div>
            </ReactModal>
        </div>
    );
};

export default LeaveRequestReviewPage;
