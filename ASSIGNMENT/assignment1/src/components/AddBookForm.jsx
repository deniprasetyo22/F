import React, { useState } from 'react';

const AddBookForm = ({ onAdd }) => {
    const [book, setBook] = useState({
        id: '',
        title: '',
        author: '',
        category: '',
        year: '',
        isbn: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(book);
        setBook({ id: '', title: '', author: '', category: '', year: '', isbn: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
                <input type="text" name="id" placeholder="ID" value={book.id} onChange={handleChange} required className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-5">
                <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} required className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-5">
                <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} required className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-5">
                <input type="number" name="year" placeholder="Publication Year" value={book.year} onChange={handleChange} required className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-5">
                <input type="text" name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} required className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-5">
                <select name="category" value={book.category} onChange={handleChange} required className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="">-- Pilih Kategori --</option>
                    <option value="Horror">Horror</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                </select>
            </div>
            <div className="mb-5 flex justify-center">
                <button type="submit" className="text-center text-white bg-green-700 hover:bg-green-800 rounded-lg px-5 py-2.5 me-2 mb-2">Add Book</button>
            </div>
        </form >
    );
};

export default AddBookForm;
