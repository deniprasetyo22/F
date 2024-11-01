import React, { useState, useEffect } from 'react';

const Header = () => {
    const [currentDateTime, setCurrentDateTime] = useState('');

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

    return (
        <header className="container text-white text-center bg-blue-500 p-4">
            <h1>Library Management System</h1>
            <p>{`Today's Date and Time: ${currentDateTime}`}</p>
        </header>
    );
};

export default Header;
