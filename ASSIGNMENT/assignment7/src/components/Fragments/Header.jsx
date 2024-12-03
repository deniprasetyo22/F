// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//     const [currentDateTime, setCurrentDateTime] = useState('');
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const updateDateTime = () => {
//         const options = {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit',
//             hour12: false,
//         };
//         const now = new Date().toLocaleString('id-ID', options);
//         setCurrentDateTime(now);
//     };

//     useEffect(() => {
//         updateDateTime();
//         const interval = setInterval(updateDateTime, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <header>
//             <nav className="bg-blue-600 border-gray-200">
//                 <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//                     <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//                         <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
//                         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Book Management</span>
//                     </Link>
//                     <button
//                         onClick={toggleMenu}
//                         type="button"
//                         className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                         aria-controls="navbar-default"
//                         aria-expanded={isOpen}
//                     >
//                         <span className="sr-only">Open main menu</span>
//                         <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
//                         </svg>
//                     </button>
//                     <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
//                         <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-4 md:mt-0 md:border-0 space-y-2 md:space-y-0">
//                             <li>
//                                 <Link to="/" className="flex w-full md:w-auto py-2 text-white hover:text-gray-300 justify-center">Home</Link>
//                             </li>
//                             <li>
//                                 <Link to="/books" className="flex w-full md:w-auto py-2 text-white hover:text-gray-300 justify-center">Books</Link>
//                             </li>
//                             <li>
//                                 <Link to="/search" className="flex w-full md:w-auto py-2 text-white hover:text-gray-300 justify-center">Search</Link>
//                             </li>
//                             <li>
//                                 <Link to="/members" className="flex w-full md:w-auto py-2 text-white hover:text-gray-300 justify-center">Members</Link>
//                             </li>
//                             <li>
//                                 <Link to="/borrow" className="flex w-full md:w-auto py-2 text-white hover:text-gray-300 justify-center">Borrow</Link>
//                             </li>
//                             <li>
//                                 <Link to="/return" className="flex w-full md:w-auto py-2 text-white hover:text-gray-300 justify-center">Return</Link>
//                             </li>
//                             <li className="w-full md:w-auto">
//                                 <Link to="/" className="flex w-full md:w-auto text-white bg-gray-400 hover:bg-gray-500 border border-gray-800 font-medium rounded-lg text-sm px-5 py-2 justify-center">
//                                     Register
//                                 </Link>
//                             </li>
//                             <li className="w-full md:w-auto">
//                                 <Link to="/" className="flex w-full md:w-auto text-white bg-green-700 hover:bg-green-800 border font-medium rounded-lg text-sm px-5 py-2 justify-center">
//                                     Login
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>


//                 </div>
//             </nav>

//         </header>
//     );
// };

// export default Header;


import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../slice/AuthSlice';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Button from '../Elements/Button';

const Header = () => {
    const { user: currentUser } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const updateDateTime = () => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        const now = new Date().toLocaleString('id-ID', options);
        setCurrentDateTime(now);
    };

    useEffect(() => {
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const menuItems = [
        {
            label: 'Dashboard',
            path: '/dashboard',
            visibleForRoles: ['Librarian', 'Library Manager', 'Library User']
        },
        {
            label: 'Profil',
            path: '/profile',
            visibleForRoles: ['Librarian', 'Library Manager', 'Library User']
        },
        {
            label: 'Books',
            path: '/books',
            visibleForRoles: ['Librarian', 'Library Manager', 'Library User']
        },
        {
            label: 'Book Request',
            path: '/book-request',
            visibleForRoles: ['Librarian', 'Library Manager', 'Library User']
        },
        {
            label: 'Upload',
            path: '/upload',
            visibleForRoles: ['Librarian', 'Library Manager', 'Library User']
        },
        {
            label: 'Users',
            path: '/members',
            visibleForRoles: ['Library Manager']
        },
        {
            label: 'Login',
            path: '/login',
            isAuthenticated: false
        },
        {
            label: 'Register',
            path: '/registerLink',
            visibleForRoles: ['Library Manager']
        },
        {
            label: 'Logout'
        },
    ];

    const isMenuVisible = (item) => {
        // Always show menu for all users
        if (item.visibleForAll) return true;

        // If user is not logged in, show menu items with isAuthenticated false
        if (item.isAuthenticated === false && !currentUser) {
            return true;
        }

        // If user is logged in, show logout
        if (item.label === 'Logout' && currentUser) {
            return true;
        }

        // Check role for specific menu items
        if (item.visibleForRoles && currentUser?.roles) {
            return item.visibleForRoles.some(role =>
                currentUser.roles.includes(role)
            );
        }

        return false;
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header>
            <nav className="bg-blue-600 border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Book Management</span>
                    </Link>
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-4 md:mt-0 md:border-0 space-y-2 md:space-y-0">
                            {menuItems.filter(isMenuVisible).map((item, index) => (
                                <li key={index}>
                                    {item.label === 'Logout' ? (
                                        <Button
                                            onClick={handleLogout}
                                            variant="bg-red-500 hover:bg-red-600"
                                        >
                                            {item.label}
                                        </Button>
                                    ) : item.label === 'Login' ? (
                                        <Button
                                            onClick={() => navigate(item.path)}
                                            variant="bg-green-500 hover:bg-green-600"
                                        >
                                            {item.label}
                                        </Button>
                                    ) : item.label === 'Register' ? (
                                        <Button
                                            onClick={() => navigate(item.path)}
                                            variant="bg-blue-500 hover:bg-blue-600"
                                        >
                                            {item.label}
                                        </Button>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="flex w-full md:w-auto py-2 text-white hover:text-gray-300 justify-center"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
