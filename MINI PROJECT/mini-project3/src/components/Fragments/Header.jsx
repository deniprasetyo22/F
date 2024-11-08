import logo from '/img/image.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

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
                            <li>
                                <Link to="/" className="hover:text-gray-300 cursor-pointer block py-2">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/employees" className="hover:text-gray-300 cursor-pointer block py-2">
                                    Employees
                                </Link>
                            </li>
                            <li>
                                <Link to="/departments" className="hover:text-gray-300 cursor-pointer block py-2">
                                    Departments
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects" className="hover:text-gray-300 cursor-pointer block py-2">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/assignments" className="hover:text-gray-300 cursor-pointer block py-2">
                                    Assignments
                                </Link>
                            </li>
                            <li className="flex justify-center">
                                <Link to="/" type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    Register
                                </Link>
                                <Link to="/" type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
