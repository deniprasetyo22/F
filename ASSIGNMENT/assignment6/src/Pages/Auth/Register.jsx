import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import Swal from 'sweetalert2';
import { reset } from '../../slice/AuthSlice';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const { username, email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }

        if (isSuccess || user) {
            navigate('/login');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

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

        setErrors(currentErrors);

        if (!Object.values(currentErrors).some(Boolean)) {
            try {
                const response = await AuthService.register(formData);
                const message = response.message;
                Swal.fire('Success', message, 'success');
                navigate('/login');
            } catch (error) {
                console.error(error);
                const errorMessaage = error.response?.data?.message || error.message;
                Swal.fire('Error', errorMessaage, 'error');
            }
        }
    };

    if (isLoading) {
        return (
            <div> <span>Loading...</span> </div>
        );
    }

    return (
        <div className="container mx-auto flex items-center justify-center mt-16">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
                <form onSubmit={onSubmit}>
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
    )
}

export default Register