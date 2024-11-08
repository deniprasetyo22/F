import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
    const [book, setBook] = useState({
        id: '',
        title: '',
        author: '',
        category: '',
        year: '',
        isbn: '',
        availability: 'No'
    });

    const [hasInput, setHasInput] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const titleInputRef = useRef(null);

    useEffect(() => {
        titleInputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: type === 'checkbox' ? (checked ? 'Yes' : 'No') : value,
        }));

        if (name === 'title' && (!value.trim() || value.length < 3)) {
            setErrors((prev) => ({ ...prev, title: 'Title must be at least 3 characters.' }));
        } else if (name === 'author' && !value.trim()) {
            setErrors((prev) => ({ ...prev, author: 'Author is required.' }));
        } else if (name === 'isbn' && (!value.trim() || books.some(b => b.isbn === value))) {
            setErrors((prev) => ({ ...prev, isbn: 'ISBN must be unique and non-empty.' }));
        } else if (name === 'year' && (isNaN(value) || value < 0 || value > new Date().getFullYear())) {
            setErrors((prev) => ({ ...prev, year: 'Enter a valid publication year.' }));
        } else if (name === 'category' && !value.trim()) {
            setErrors((prev) => ({ ...prev, category: 'Category is required.' }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentErrors = {};
        if (!book.title.trim()) currentErrors.title = "Title is required.";
        if (!book.author.trim()) currentErrors.author = "Author is required.";
        if (!book.isbn.trim()) currentErrors.isbn = "ISBN is required.";
        if (!book.year.trim()) currentErrors.year = "Publication Year is required.";
        if (!book.category.trim()) currentErrors.category = "Category is required.";

        setErrors(currentErrors);

        if (!Object.values(currentErrors).some(Boolean)) {
            const newBook = { ...book, id: uuidv4() };
            const updatedBooks = [...JSON.parse(localStorage.getItem('books') || '[]'), newBook];
            localStorage.setItem('books', JSON.stringify(updatedBooks));
            Swal.fire('Book Added!', `The book '${book.title}' has been successfully added.`, 'success');
            navigate('/books');
        } else {
            Swal.fire('Oops...', 'Please fix the errors before submitting the form.', 'error');
        }
    };

    const resetForm = () => {
        setBook({ id: '', title: '', author: '', category: '', year: '', isbn: '', availability: 'No' });
        setHasInput(false);
        setErrors({});
    };

    return (
        <div className="container mx-auto md:px-96">
            <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg">
                <h2 className="text-lg font-bold text-center">Add Book</h2>

                <div>
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        ref={titleInputRef}
                        value={book.title}
                        onChange={handleChange}
                        className={`bg-white border ${errors.title ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                </div>

                <div>
                    <label className="block mb-1">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        className={`bg-white border ${errors.author ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.author && <p className="text-red-500 text-xs">{errors.author}</p>}
                </div>

                <div>
                    <label className="block mb-1">Published Year</label>
                    <input
                        type="number"
                        name="year"
                        value={book.year}
                        onChange={handleChange}
                        className={`bg-white border ${errors.year ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.year && <p className="text-red-500 text-xs">{errors.year}</p>}
                </div>

                <div>
                    <label className="block mb-1">ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                        className={`bg-white border ${errors.isbn ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.isbn && <p className="text-red-500 text-xs">{errors.isbn}</p>}
                </div>

                <div>
                    <label className="block mb-1">Category</label>
                    <select
                        name="category"
                        value={book.category}
                        onChange={handleChange}
                        className={`bg-white border ${errors.category ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    >
                        <option value="">-- Select Category --</option>
                        <option value="Horror">Horror</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
                </div>

                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="availability"
                            checked={book.availability === 'Yes'}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <span className="ml-2">Available</span>
                    </label>
                </div>

                <div className="flex justify-center space-x-4">
                    <button type="submit" className="bg-green-600 text-white p-2 px-5 rounded-md">Submit</button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-500 text-white p-2 px-5 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBookPage;
