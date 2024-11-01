import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

const BookList = ({ books, onEdit, onDelete, onOpenModal }) => {
    const handleDelete = (bookId) => {
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
                onDelete(bookId);
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

    return (
        <div>
            <div className="mb-3">
                <button onClick={onOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded mr-2 px-3">
                    <FontAwesomeIcon icon={faPlus} /> Add
                </button>
            </div>
            <div className="p-4 border rounded mb-5">
                <h2 className="text-lg font-bold mb-2 text-center">Book List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border rounded-md overflow-hidden">
                        <thead>
                            <tr className="bg-gray-600 text-white">
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Author</th>
                                <th className="border p-2">Category</th>
                                <th className="border p-2">Year</th>
                                <th className="border p-2">ISBN</th>
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
                                        <td className="border p-2 flex justify-center space-x-2">
                                            <button
                                                onClick={() => onEdit(book)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded mr-2 px-3"
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-1 px-3 rounded"
                                            >
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
        </div>
    );
};

export default BookList;
