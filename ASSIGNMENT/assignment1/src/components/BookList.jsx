import React from 'react';

const BookList = ({ books, onEdit, onDelete }) => (
    <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left text-white">
            <thead className="text-xs uppercase bg-gray-500 text-center">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Title</th>
                    <th scope="col" className="px-6 py-3">Author</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Year</th>
                    <th scope="col" className="px-6 py-3">ISBN</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id} className="bg-white border-b dark:bg-gray-700 dark:border-gray-700 text-center">
                        <td className="px-6 py-4">{book.id}</td>
                        <td className="px-6 py-4">{book.title}</td>
                        <td className="px-6 py-4">{book.author}</td>
                        <td className="px-6 py-4">{book.category}</td>
                        <td className="px-6 py-4">{book.year}</td>
                        <td className="px-6 py-4">{book.isbn}</td>
                        <td className="px-6 py-4">
                            <button onClick={() => onEdit(book.id)} className="text-yellow-600 hover:underline me-4" >
                                Edit
                            </button>
                            <button onClick={() => onDelete(book.id)} className="text-red-600 hover:underline" >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default BookList;
