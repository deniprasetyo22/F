// Footer.jsx
import React from 'react';

const Footer = () => (
    <footer className="bg-white shadow mt-4 dark:bg-blue-500">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-white sm:text-center">
                © 2023 <a href="#" className="hover:underline">Deni Prasetyo</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
                <li>
                    <a href="#" className="hover:underline mr-4 md:mr-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
    </footer>
);

export default Footer;
