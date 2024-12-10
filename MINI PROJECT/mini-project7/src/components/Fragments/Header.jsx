import logo from '/img/image.jpg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../Slice/AuthSlice';
import Button from '../Elements/Button';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user: currentUser } = useSelector(state => state.auth);

    const menuItems = [
        {
            label: 'Dashboard',
            path: '/',
            visibleForRoles: ['Administrator', 'HR Manager', 'Department Manager', 'Employee Supervisor', 'Employee']
        },
        {
            label: 'Profile',
            path: '/profile',
            visibleForRoles: ['Administrator', 'HR Manager', 'Department Manager', 'Employee Supervisor', 'Employee']
        },
        {
            label: 'Employees',
            path: '/employees',
            visibleForRoles: ['Administrator', 'HR Manager', 'Department Manager', 'Employee Supervisor']
        },
        {
            label: 'Departments',
            path: '/departments',
            visibleForRoles: ['Administrator', 'Department Manager']
        },
        {
            label: 'Projects',
            path: '/projects',
            visibleForRoles: ['Administrator', 'HR Manager', 'Employee Supervisor', 'Employee']
        },
        {
            label: 'Assignments',
            path: '/assignments',
            visibleForRoles: ['Administrator', 'HR Manager', 'Employee Supervisor', 'Employee']
        },
        // {
        //     label: 'Login',
        //     path: '/login',
        //     isAuthenticated: false
        // },
        // {
        //     label: 'Register',
        //     path: '/register',
        //     isAuthenticated: false
        // },
        {
            label: 'Requests',
            path: '/leaverequests',
            visibleForRoles: ['Administrator', 'HR Manager', 'Employee Supervisor']
        },
        {
            label: 'My Requests',
            path: '/myleaverequests',
            visibleForRoles: ['Administrator', 'HR Manager', 'Employee Supervisor', 'Employee']
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
            <nav className="w-full bg-gray-800 text-white border-gray-200 dark:bg-gray-900 fixed top-0">
                <div className="flex flex-wrap items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                        <img src={logo} alt="Logo" className="w-10 h-10" />
                        <Link to="/" className="md:text-2xl font-bold">COMPANY MANAGEMENT SYSTEM</Link>
                    </div>
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`w-full md:block md:w-auto ${isOpen ? 'block' : 'hidden'}`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
