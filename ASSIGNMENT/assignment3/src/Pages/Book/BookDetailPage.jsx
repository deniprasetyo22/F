import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const BookDetailPage = () => {
    const { id } = useParams(); // Retrieve the book ID from the URL
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find((b) => b.id === id); // Find the specific book by ID

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedBook, setUpdatedBook] = useState({
        ...book, availability: book.availability || "No" // Default to "No" if undefined
    });

    // Handle input changes for the modal form
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdatedBook({
            ...updatedBook, [name]: type === "checkbox" ? (checked ? "Yes" : "No") : value,
        });
    };

    // Handle form submission to update book details
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBooks = books.map((b) =>
            b.id === updatedBook.id ? updatedBook : b
        );
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        setIsModalOpen(false);
        Swal.fire({
            title: 'Success!',
            text: 'The book details have been updated.',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true,
            willClose: () => {
                Swal.stopTimer();
            }
        });
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-xl text-center font-bold mb-5">Book Detail</h1>

                <div className="grid grid-cols-3 gap-4 mb-4 md:px-10">
                    <p className="font-semibold">Title</p>
                    <p className="text-center">:</p>
                    <p>{book.title}</p>

                    <p className="font-semibold">Author</p>
                    <p className="text-center">:</p>
                    <p>{book.author}</p>

                    <p className="font-semibold">Category</p>
                    <p className="text-center">:</p>
                    <p>{book.category}</p>

                    <p className="font-semibold">Year</p>
                    <p className="text-center">:</p>
                    <p>{book.year}</p>

                    <p className="font-semibold">ISBN</p>
                    <p className="text-center">:</p>
                    <p>{book.isbn}</p>

                    <p className="font-semibold">Available</p>
                    <p className="text-center">:</p>
                    <p>{book.availability}</p>
                </div>

                <div className="flex justify-center mt-5 space-x-4">
                    <Link to={'/books'} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Back
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)} // Open the modal on click
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {/* Modal for editing the book */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-center">Edit Book</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={updatedBook.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={updatedBook.author}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Category</label>
                                <select
                                    name="category"
                                    value={updatedBook.category}
                                    onChange={handleInputChange}
                                    className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                >
                                    <option value="Horror">Horror</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Science">Science</option>
                                    <option value="History">History</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Year</label>
                                <input
                                    type="text"
                                    name="year"
                                    value={updatedBook.year}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">ISBN</label>
                                <input
                                    type="text"
                                    name="isbn"
                                    value={updatedBook.isbn}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="availability"
                                        checked={updatedBook.availability === 'Yes'}
                                        onChange={handleInputChange}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Available</span>
                                </label>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)} // Close the modal
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetailPage;
