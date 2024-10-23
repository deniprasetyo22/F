import React, { useState } from 'react';

const EditBookModal = ({ book, onUpdate, onClose }) => {
    const [updatedBook, setUpdatedBook] = useState({
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
        year: book.year,
        isbn: book.isbn,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook({ ...updatedBook, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(book.id, updatedBook);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <input
                            type="text"
                            name="id"
                            placeholder="ID"
                            value={updatedBook.id}
                            onChange={handleChange}
                            required
                            className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={updatedBook.title}
                            onChange={handleChange}
                            required
                            className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="text"
                            name="author"
                            placeholder="Author"
                            value={updatedBook.author}
                            onChange={handleChange}
                            required
                            className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="number"
                            name="year"
                            placeholder="Publication Year"
                            value={updatedBook.year}
                            onChange={handleChange}
                            required
                            className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="text"
                            name="isbn"
                            placeholder="ISBN"
                            value={updatedBook.isbn}
                            onChange={handleChange}
                            required
                            className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <select
                            name="category"
                            value={updatedBook.category}
                            onChange={handleChange}
                            className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="Horror">Horror</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                        </select>
                    </div>
                    <div className="mb-5 flex justify-center">
                        <button type="submit" className="text-center text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-5 py-2.5 me-2">
                            Update Book
                        </button>
                        <button type="button" onClick={onClose} className="text-center text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-lg px-5 py-2.5">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookModal;
