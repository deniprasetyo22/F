import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const BookPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        setBooks(storedBooks);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleDeleteBook = (bookId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedBooks = books.filter(book => book.id !== bookId);
                setBooks(updatedBooks);
                localStorage.setItem('books', JSON.stringify(updatedBooks));

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your book has been deleted.',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    willClose: () => {
                        Swal.stopTimer();
                    }
                });
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    };

    return (
        <div className="p-4 border rounded mb-5">
            <h2 className="text-lg font-bold text-center">Book List</h2>
            <div className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mb-2 rounded inline-flex items-center">
                <Link to="/books/add">
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    <span className="text-sm">Add</span>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-600 text-white">
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Author</th>
                            <th className="border p-2">Category</th>
                            <th className="border p-2">Year</th>
                            <th className="border p-2">ISBN</th>
                            <th className="border p-2">Available</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            books.map((book, index) => (
                                <tr key={book.id} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{book.title}</td>
                                    <td className="border p-2">{book.author}</td>
                                    <td className="border p-2">{book.category}</td>
                                    <td className="border p-2">{book.year}</td>
                                    <td className="border p-2">{book.isbn}</td>
                                    <td className="border p-2">{book.availability}</td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Link to={`/books/${book.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded mr-2 px-3">
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                        </Link>
                                        <button onClick={() => handleDeleteBook(book.id)} className="bg-red-500 hover:bg-red-600 text-white p-1 px-3 rounded">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookPage;
