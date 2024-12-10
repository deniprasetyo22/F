import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white shadow py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                <div className="flex justify-center md:justify-start mb-2 md:mb-0">
                    <span className="text-sm text-gray-500 dark:text-gray-400 md:ml-5">
                        &copy; {new Date().getFullYear()} Deni Prasetyo. All Rights Reserved.
                    </span>
                </div>

                <div className="flex flex-col items-center space-y-2 my-2 md:space-y-0 md:flex-row md:space-x-4 md:justify-center">
                    <Link to="/" className="text-sm hover:text-gray-300 cursor-pointer">
                        Home
                    </Link>
                    <Link to="/employees" className="text-sm hover:text-gray-300 cursor-pointer">
                        Employees
                    </Link>
                    <Link to="/departments" className="text-sm hover:text-gray-300 cursor-pointer">
                        Departments
                    </Link>
                    <Link to="/projects" className="text-sm hover:text-gray-300 cursor-pointer">
                        Projects
                    </Link>
                    <Link to="/assignments" className="text-sm hover:text-gray-300 cursor-pointer">
                        Assignments
                    </Link>
                </div>

                <div className="flex flex-col items-center space-y-2 my-2 md:space-y-0 md:flex-row md:space-x-4 md:justify-end md:mr-5">
                    <a href="#" aria-label="Facebook" className="text-sm hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
                        <span>Facebook</span>
                    </a>
                    <a href="#" aria-label="Instagram" className="text-sm hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                        <span>Instagram</span>
                    </a>
                    <a href="#" aria-label="Email" className="text-sm hover:text-gray-400 transition-colors duration-300 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                        <span>Email</span>
                    </a>
                    <a href="#" aria-label="WhatsApp" className="text-sm hover:text-green-400 transition-colors duration-300 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
