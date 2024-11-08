import React, { useEffect, useState } from 'react';

const HomePage = () => {
    const [bookCount, setBookCount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        setBookCount(storedBooks.length);

        const storedMembers = JSON.parse(localStorage.getItem('members')) || [];
        setMemberCount(storedMembers.length);
    }, []);

    return (
        <div className="p-8 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center mb-24 mt-5">Welcome to Book Management System!</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
                    <h2 className="text-2xl font-semibold mb-2">Book Collection Stats</h2>
                    <p className="text-lg">
                        <span className="font-bold">{bookCount}</span> {bookCount === 1 ? "book" : "books"} in your collection.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
                    <h2 className="text-2xl font-semibold mb-2">Member Collection Stats</h2>
                    <p className="text-lg">
                        <span className="font-bold">{memberCount}</span> {memberCount === 1 ? "member" : "members"} in your collection.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
