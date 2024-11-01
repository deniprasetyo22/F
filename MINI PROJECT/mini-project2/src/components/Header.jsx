import logo from '/img/image.jpg';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = ({ setView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header>
            <nav className="w-full bg-gray-800 text-white border-gray-200 dark:bg-gray-900 fixed top-0">
                <div className="container mx-auto max-w-7xl flex flex-wrap items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                        <img src={logo} alt="Logo" className="w-10 h-10" />
                        <h1 className="text-2xl font-bold">ORIGIN RESTO</h1>
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
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <button onClick={() => setView('menu')} className="hover:text-gray-300 cursor-pointer block py-2 px-3">
                                    Menu
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setView('customer')} className="hover:text-gray-300 cursor-pointer block py-2 px-3">
                                    Customer
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setView('order')} className="hover:text-gray-300 cursor-pointer block py-2 px-3">
                                    Order
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setView('promotion')} className="hover:text-gray-300 cursor-pointer block py-2 px-3">
                                    Promotion
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setView('contact')} className="hover:text-gray-300 cursor-pointer block py-2 px-3">
                                    Contact
                                </button>
                            </li>
                            <li className="flex items-center">
                                <button>
                                    <FontAwesomeIcon icon={faCartShopping} className="hover:text-gray-300 w-5 h-5" />
                                </button>
                            </li>
                            <li className="flex justify-center">
                                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    Register
                                </button>
                                <button type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Login
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
