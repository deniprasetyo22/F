import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-scroll'; // Ensure to import Link from react-scroll

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white shadow py-5">
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex justify-center">
                    &copy; {new Date().getFullYear()} Deni Prasetyo. All Rights Reserved.
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto p-4 max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <Link to="menu-section" smooth={true} className="hover:underline cursor-pointer">
                        Menu
                    </Link>
                    <Link to="customer-section" smooth={true} className="hover:underline cursor-pointer">
                        Customer
                    </Link>
                    <Link to="order-section" smooth={true} className="hover:underline cursor-pointer">
                        Order
                    </Link>
                    <Link to="#" smooth={true} className="hover:underline cursor-pointer">
                        Promotion
                    </Link>
                    <Link to="#" smooth={true} className="hover:underline cursor-pointer">
                        Contact
                    </Link>
                </div>
                <div className="flex flex-col sm:flex-row justify-start items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <a href="#" className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300">
                        <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
                        <span>Facebook</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 hover:text-pink-400 transition-colors duration-300">
                        <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                        <span>Instagram</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-300">
                        <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
                        <span>Email</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 hover:text-green-400 transition-colors duration-300">
                        <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>

        </footer >
    );
};

export default Footer;
