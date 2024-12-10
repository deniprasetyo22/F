import React, { useEffect, useState } from 'react';
import BackButton from '../../components/Elements/BackButton';
import Label from '../../components/Elements/Label';
import Button from '../../components/Elements/Button';
import EmployeeService from '../../Services/EmployeeService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../API';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const fetchEmployees = async () => {
    const { data } = await EmployeeService.getAllNoPages();
    return data;
};

const AddLeaveRequestPage = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['employees'],
        queryFn: fetchEmployees,
        placeholderData: keepPreviousData,
    });

    const [leaveRequest, setLeaveRequest] = useState({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoadingUpload, setIsLoadingUpload] = useState(false);
    const navigate = useNavigate();

    const empname = `${currentUser.user.employee.fname} ${currentUser.user.employee.lname}`;
    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
        setLeaveRequest({
            ...leaveRequest, [e.target.name]: e.target.value
        });
    }

    const calculateTotalDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end - start;
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dayDiff >= 0 ? dayDiff : 0;
    };

    const totalDays = calculateTotalDays(leaveRequest.startDate, leaveRequest.endDate);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    if (isError) {
        return <p>Error fetching employees</p>;
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg'];

    const validateFile = (file) => {
        if (file.size > MAX_FILE_SIZE) {
            return 'File size exceeds 5MB limit';
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return 'Only PDF, JPG, and JPEG files are allowed';
        }
        return null;
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validationError = validateFile(selectedFile);
            if (validationError) {
                toast.error(validationError);
                setFile(null);
                e.target.value = '';
                return;
            }
            setFile(selectedFile);
            toast.info(`File selected: ${selectedFile.name}`);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorMessage = {};

        if (!leaveRequest.leaveType) {
            errorMessage.leaveType = 'Leave type is required';
        }
        if (!leaveRequest.startDate) {
            errorMessage.startDate = 'Start date is required';
        }
        if (!leaveRequest.endDate) {
            errorMessage.endDate = 'End date is required';
        }
        if (!leaveRequest.reason) {
            errorMessage.reason = 'Reason is required';
        }

        setError(errorMessage);

        if (Object.keys(errorMessage).length === 0) {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to submit this leave request?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, submit it!'
            });

            if (result.isConfirmed) {
                setIsLoadingUpload(true);
                try {
                    const formData = new FormData();
                    formData.append('leaveType', leaveRequest.leaveType);
                    formData.append('startDate', leaveRequest.startDate);
                    formData.append('endDate', leaveRequest.endDate);
                    formData.append('reason', leaveRequest.reason);
                    if (file) {
                        formData.append('file', file);
                    }

                    await API.post('/leaverequest', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        onUploadProgress: (progressEvent) => {
                            const { loaded, total } = progressEvent;
                            const percent = Math.floor((loaded * 100) / total);
                            setUploadProgress(percent);
                        },
                    });
                    toast.success('Leave request created successfully');
                    setLeaveRequest({
                        leaveType: '',
                        startDate: '',
                        endDate: '',
                        reason: '',
                    });
                    setFile(null);
                    setUploadProgress(0);
                    setError({});
                } catch (error) {
                    console.error('Error creating leave request:', error);
                    toast.error('Failed to create leave request');
                } finally {
                    setIsLoadingUpload(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Leave request created successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myleaverequests');
                }
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg my-8">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop
                closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

            <BackButton to="/myleaverequests" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add Leave Request</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label>Name</Label>
                    <input
                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        id="name"
                        type="text"
                        value={empname}
                        disabled
                    />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <Label>Start Date</Label>
                    <Label>End Date</Label>
                    <input
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        id="startDate"
                        name='startDate'
                        type="date"
                        min={today} // Set minimum date to today
                        value={leaveRequest.startDate}
                        onChange={handleChange}
                    />
                    <input
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        id="endDate"
                        type="date"
                        name='endDate'
                        min={leaveRequest.startDate || today} // Ensure end date is not less than start date
                        value={leaveRequest.endDate}
                        onChange={handleChange}
                    />
                    {error.startDate && <span className="text-sm text-red-500">{error.startDate}</span>}
                    {error.endDate && <span className="text-sm text-red-500">{error.endDate}</span>}
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <Label>Total Days</Label>
                    <Label>Leave Type</Label>
                    <input
                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        id="totaldays"
                        type="number"
                        name='totaldays'
                        value={totalDays} // Display calculated total days
                        disabled
                    />
                    <select
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        id="leaveType"
                        name='leaveType'
                        onChange={handleChange}
                        value={leaveRequest.leaveType}
                    >
                        <option value="">-- Select Leave Type --</option>
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Personal Leave">Personal Leave</option>
                    </select>
                    <br></br>
                    {error.leaveType && <span className="text-sm text-red-500">{error.leaveType}</span>}
                </div>
                <div>
                    <Label>Reason</Label>
                    <textarea
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        id="reason"
                        name='reason'
                        value={leaveRequest.reason}
                        rows="4"
                        onChange={handleChange}
                    ></textarea>
                    {error.reason && <span className="text-sm text-red-500">{error.reason}</span>}
                </div>
                <div>
                    <div className="mb-3">
                        <Label>
                            Medical Certificate (Optional, PDF or JPEG or JPG, max 5MB)
                        </Label>
                        <input
                            id="file"
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            accept=".pdf, .jpg, .jpeg" />
                        {file && (
                            <div className="mt-2 text-muted">
                                Selected file: {file.name} ({formatFileSize(file.size)})
                            </div>
                        )}
                    </div>
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mb-3">
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }}
                                aria-valuenow={uploadProgress} aria-valuemin="0" aria-valuemax="100">
                                {uploadProgress}%
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-center">
                    <Button type="submit" disabled={isLoadingUpload}
                        className={`btn ${isLoadingUpload ? 'btn-secondary' : 'btn-primary'}`}>
                        {isLoadingUpload ? (<>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Uploading...
                        </>
                        ) : ('Submit')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddLeaveRequestPage;
