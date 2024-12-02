import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import Swal from 'sweetalert2';
import { reset } from '../../slice/AuthSlice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        position: '',
        libraryCardNumber: '',
        privilage: null,
        notes: null,
        role: [],
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { username, email, password, firstname, lastname, position, libraryCardNumber, privilage, notes, role } = formData;

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }

        if (isError) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                confirmButtonText: 'OK'
            })
        }

        if (isSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: message,
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/registerLink');
        }

        dispatch(reset());
    }, [currentUser, isError, isSuccess, message, navigate, dispatch]);


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const currentErrors = {};
        if (!username.trim()) {
            currentErrors.username = 'Username is required.';
        }
        if (!email.trim()) {
            currentErrors.email = 'Email is required.';
        }
        if (!password.trim()) {
            currentErrors.password = 'Password is required.';
        }
        if (!firstname.trim()) {
            currentErrors.firstname = 'First name is required.';
        }
        if (!position.trim()) {
            currentErrors.position = 'Position is required.';
        }
        if (!libraryCardNumber.trim()) {
            currentErrors.libraryCardNumber = 'Library Card Number is required.';
        }

        setErrors(currentErrors);

        if (!Object.values(currentErrors).some(Boolean)) {
            setLoading(true);
            try {
                const response = await AuthService.register(formData);
                const message = response.message;
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: message,
                    showConfirmButton: false,
                    timer: 1500
                });
                resetForm();
                navigate('/registerLink');
            } catch (error) {
                console.error(error);
                const errorMessage = error.response?.data?.message || error.message;
                Swal.fire('Error', errorMessage, 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            position: '',
            libraryCardNumber: '',
            privilage: null,
            notes: null,
            role: [],
        });
    };

    if (loading || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto flex items-center justify-center mt-16">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={onChange}
                                placeholder="Enter username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                            />
                            {errors.username && <small className="text-red-500">{errors.username}</small>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Enter email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                            />
                            {errors.email && <small className="text-red-500">{errors.email}</small>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Enter password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                            />
                            {errors.password && <small className="text-red-500">{errors.password}</small>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={firstname}
                                onChange={onChange}
                                placeholder="Enter first name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                            />
                            {errors.firstname && <small className="text-red-500">{errors.firstname}</small>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={lastname}
                                onChange={onChange}
                                placeholder="Enter last name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-700">Position</label>
                            <select
                                id="position"
                                name="position"
                                value={position}
                                onChange={onChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                            >
                                <option value="">-- Select Position --</option>
                                <option value="Library Manager">Library Manager</option>
                                <option value="Librarian">Librarian</option>
                                <option value="Library User">Library User</option>
                            </select>
                            {errors.position && <small className="text-red-500">{errors.position}</small>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="libraryCardNumber" className="block mb-2 text-sm font-medium text-gray-700">Library Card Number</label>
                            <input
                                type="text"
                                id="libraryCardNumber"
                                name="libraryCardNumber"
                                value={libraryCardNumber}
                                onChange={onChange}
                                placeholder="Enter library card number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                            />
                            {errors.libraryCardNumber && <small className="text-red-500">{errors.libraryCardNumber}</small>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="privilage" className="block mb-2 text-sm font-medium text-gray-700">Privilage</label>
                            <input
                                type="text"
                                id="privilage"
                                name="privilage"
                                value={privilage}
                                onChange={onChange}
                                placeholder="Enter privilage"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={onChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                            >
                                <option value="">-- Select Position --</option>
                                <option value="Library Manager">Library Manager</option>
                                <option value="Librarian">Librarian</option>
                                <option value="Library User">Library User</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={notes}
                            onChange={onChange}
                            placeholder="Enter any notes"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200 ease-in-out`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {message && (
                    <div className="mt-4">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {message}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;
