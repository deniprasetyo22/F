import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BorrowPage = () => {
    const [borrowList, setBorrowList] = useState([]);

    useEffect(() => {
        // Retrieve borrow data from localStorage
        const storedBorrows = JSON.parse(localStorage.getItem('borrows')) || [];
        const storedMembers = JSON.parse(localStorage.getItem('members')) || [];
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];

        // Map member and book names to their IDs
        const memberMap = Object.fromEntries(storedMembers.map(member => [member.id, member.fullName]));
        const bookMap = Object.fromEntries(storedBooks.map(book => [book.id, book.title]));

        // Populate borrow list with member and book names
        const borrowData = storedBorrows.map(borrow => ({
            ...borrow,
            memberName: memberMap[borrow.memberId] || 'Unknown Member',
            bookTitle: bookMap[borrow.bookId] || 'Unknown Book',
        }));

        setBorrowList(borrowData);
    }, []);

    return (
        <div className="container mx-auto p-4 md:px-36">
            <h2 className="text-lg font-bold mb-4 text-center">"Borrowed Books List"</h2>
            <div className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mb-2 rounded inline-flex items-center">
                <Link to="/borrow/add">
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    <span className="text-sm">Add</span>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border-gray-300 overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border border-gray-300">Borrow ID</th>
                            <th className="p-2 border border-gray-300">Member</th>
                            <th className="p-2 border border-gray-300">Book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowList.length > 0 ? (
                            borrowList.map(borrow => (
                                <tr key={borrow.borrowId}>
                                    <td className="p-2 border border-gray-300">{borrow.borrowId}</td>
                                    <td className="p-2 border border-gray-300">{borrow.memberName}</td>
                                    <td className="p-2 border border-gray-300">{borrow.bookTitle}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-2 text-center text-gray-500">No borrow records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BorrowPage;
