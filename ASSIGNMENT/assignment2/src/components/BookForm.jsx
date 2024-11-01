import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const BookForm = ({ onAdd, onEdit, onUpdate, onCancel }) => {
    const [book, setBook] = useState({
        id: '',
        title: '',
        author: '',
        category: '',
        year: '',
        isbn: ''
    });

    const titleInputRef = useRef(null);

    useEffect(() => {
        if (onEdit) {
            setBook(onEdit);
        }
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [onEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onEdit) {
            onUpdate(book);
        } else {
            const newId = uuidv4();
            onAdd({ ...book, id: newId });
        }
        Swal.fire({
            icon: 'success',
            title: onEdit ? 'Book Updated!' : 'Book Added!',
            text: `The book '${book.title}' has been successfully ${onEdit ? 'updated' : 'added'}.`,
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true,
            willClose: () => {
                Swal.stopTimer();
            }
        });
        resetForm();
    };

    const resetForm = () => {
        setBook({
            id: '',
            title: '',
            author: '',
            category: '',
            year: '',
            isbn: ''
        });
    };

    return (
        <div className="max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg">
                <h2 className="text-lg font-bold text-center">{onEdit ? "Edit Book" : "Add Book"}</h2>
                <div>
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        ref={titleInputRef}
                        value={book.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        placeholder="Author"
                        className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Published Year</label>
                    <input
                        type="number"
                        name="year"
                        value={book.year}
                        onChange={handleChange}
                        placeholder="Publication Year"
                        className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                        placeholder="ISBN"
                        className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Category</label>
                    <select
                        name="category"
                        value={book.category}
                        onChange={handleChange}
                        className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    >
                        <option value="">-- Select Category --</option>
                        <option value="Horror">Horror</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                    </select>
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        type="submit"
                        className={`${onEdit ? 'bg-blue-600' : 'bg-green-600'} text-white p-2 px-5 rounded-md`}
                    >
                        {onEdit ? 'Update' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        onClick={() => { resetForm(); onCancel(); }}
                        className="bg-gray-500 text-white p-2 px-5 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;
