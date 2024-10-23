import React from "react";

const Header = () => {
    const today = new Date().toLocaleDateString();

    return (
        <header className="container text-white text-center bg-blue-500 p-4">
            <h1>Library Management System</h1>
            <p>{`Today's Date: ${today}`}</p>
        </header>
    );
};

export default Header;