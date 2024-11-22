import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Button from '../../components/Elements/Button';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BookService from '../../Services/BookService';

const AddBookPage = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        category: '',
        year: '',
        isbn: '',
        publisher: '',
        description: '',
        location: '',
        price: '',
        totalBook: '',
        language: '',
        status: ''
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
            [name]: type === 'checkbox' ? (checked ? 'Available' : 'Unavailable') : value,
        }));

        if (name === 'title' && (!value.trim() || value.length < 3)) {
            setErrors((prev) => ({ ...prev, title: 'Title must be at least 3 characters.' }));
        } else if (name === 'author' && !value.trim()) {
            setErrors((prev) => ({ ...prev, author: 'Author is required.' }));
        } else if (name === 'isbn' && !value.trim()) {
            setErrors((prev) => ({ ...prev, isbn: 'ISBN must be unique and non-empty.' }));
        } else if (name === 'year' && (isNaN(value) || value < 0 || value > new Date().getFullYear())) {
            setErrors((prev) => ({ ...prev, year: 'Enter a valid publication year.' }));
        } else if (name === 'category' && !value.trim()) {
            setErrors((prev) => ({ ...prev, category: 'Category is required.' }));
        } else if (name === 'publisher' && !value.trim()) {
            setErrors((prev) => ({ ...prev, publisher: 'Publisher is required.' }));
        } else if (name === 'description' && !value.trim()) {
            setErrors((prev) => ({ ...prev, description: 'Description is required.' }));
        } else if (name === 'location' && !value.trim()) {
            setErrors((prev) => ({ ...prev, location: 'Location is required.' }));
        } else if (name === 'price' && (isNaN(value) || value < 0)) {
            setErrors((prev) => ({ ...prev, price: 'Enter a valid price.' }));
        } else if (name === 'totalBook' && (isNaN(value) || value < 0)) {
            setErrors((prev) => ({ ...prev, totalBook: 'Enter a valid total book count.' }));
        } else if (name === 'language' && !value.trim()) {
            setErrors((prev) => ({ ...prev, language: 'Language is required.' }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentErrors = {};
        if (!book.title.trim()) currentErrors.title = "Title is required.";
        if (!book.author.trim()) currentErrors.author = "Author is required.";
        if (!book.isbn.trim()) currentErrors.isbn = "ISBN is required.";
        if (!book.year.trim()) currentErrors.year = "Publication Year is required.";
        if (!book.category.trim()) currentErrors.category = "Category is required.";
        if (!book.publisher.trim()) currentErrors.publisher = "Publisher is required.";
        if (!book.description.trim()) currentErrors.description = "Description is required.";
        if (!book.location.trim()) currentErrors.location = "Location is required.";
        if (!String(book.price).trim() || isNaN(book.price) || parseInt(book.price, 10) < 0) {
            currentErrors.price = "Enter a valid price.";
        }
        if (!String(book.totalBook).trim() || isNaN(book.totalBook) || parseInt(book.totalBook, 10) < 0) {
            currentErrors.totalBook = "Enter a valid total book count.";
        }
        if (!book.language.trim()) currentErrors.language = "Language is required.";

        setErrors(currentErrors);

        if (!Object.values(currentErrors).some(Boolean)) {
            try {
                await BookService.create(book);
                Swal.fire('Book Added!', `The book '${book.title}' has been successfully added.`, 'success');
                navigate('/books');
            } catch (error) {
                Swal.fire('Error!', 'There was an error adding the book. Please check your data or try again later.', 'error');
            }
        } else {
            Swal.fire('Oops...', 'Please fix the errors before submitting the form.', 'error');
        }
    };

    const resetForm = () => {
        setBook({ title: '', author: '', category: '', year: '', isbn: '', publisher: '', description: '', location: '', price: '', totalBook: '', language: '', status: '' });
        setHasInput(false);
        setErrors({});
    };

    return (
        <div className="container mx-auto md:px-96">
            <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg">
                <div>
                    <Link to="/books">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </div>
                <h2 className="text-lg font-bold text-center">Add Book</h2>

                {/* Title */}
                <div>
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Book Title"
                        ref={titleInputRef}
                        value={book.title}
                        onChange={handleChange}
                        className={`bg-white border ${errors.title ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                </div>

                {/* Author */}
                <div>
                    <label className="block mb-1">Author</label>
                    <input
                        type="text"
                        name="author"
                        placeholder="Book Author"
                        value={book.author}
                        onChange={handleChange}
                        className={`bg-white border ${errors.author ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.author && <p className="text-red-500 text-xs">{errors.author}</p>}
                </div>

                {/* Year */}
                <div>
                    <label className="block mb-1">Published Year</label>
                    <input
                        type="number"
                        name="year"
                        placeholder="Publication Year"
                        value={book.year}
                        onChange={handleChange}
                        className={`bg-white border ${errors.year ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.year && <p className="text-red-500 text-xs">{errors.year}</p>}
                </div>

                {/* ISBN */}
                <div>
                    <label className="block mb-1">ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        placeholder="ISBN"
                        value={book.isbn}
                        onChange={(e) => handleChange({
                            target: {
                                name: 'isbn',
                                value: e.target.value.toUpperCase()
                            }
                        })}
                        className={`bg-white border ${errors.isbn ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.isbn && <p className="text-red-500 text-xs">{errors.isbn}</p>}
                </div>

                {/* Publisher */}
                <div>
                    <label className="block mb-1">Publisher</label>
                    <input
                        type="text"
                        name="publisher"
                        placeholder="Publisher"
                        value={book.publisher}
                        onChange={handleChange}
                        className={`bg-white border ${errors.publisher ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.publisher && <p className="text-red-500 text-xs">{errors.publisher}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={book.description}
                        onChange={handleChange}
                        className={`bg-white border ${errors.description ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="block mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={book.location}
                        onChange={handleChange}
                        className={`bg-white border ${errors.location ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1">Price</label>
                    <div className="flex items-center">
                        <span className="absolute ml-4">Rp.</span>
                        <input
                            type="text" // Ubah tipe input ke "text" untuk mendukung format tampilan
                            name="price"
                            placeholder="Price"
                            value={book.price ? new Intl.NumberFormat('id-ID').format(book.price) : ''} // Format jika ada nilai
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/\./g, ''); // Hapus titik dari input
                                // Cek jika angka valid sebelum menyimpan ke state
                                if (!isNaN(rawValue) && rawValue !== '') {
                                    handleChange({ target: { name: 'price', value: parseInt(rawValue, 10) } });
                                } else if (rawValue === '') {
                                    handleChange({ target: { name: 'price', value: '' } }); // Kosongkan jika input dihapus
                                }
                            }}
                            className={`bg-white border ${errors.price ? 'border-red-500' : 'border-gray-500'
                                } text-sm rounded-lg block w-full pl-8 p-2.5 pl-16`}
                        />
                    </div>
                    {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
                </div>

                {/* Total Books */}
                <div>
                    <label className="block mb-1">Total Books</label>
                    <input
                        type="number"
                        name="totalBook"
                        placeholder="Total Books"
                        value={book.totalBook}
                        onChange={handleChange}
                        className={`bg-white border ${errors.totalBook ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.totalBook && <p className="text-red-500 text-xs">{errors.totalBook}</p>}
                </div>

                {/* Language */}
                <div>
                    <label className="block mb-1">Language</label>
                    <input
                        type="text"
                        name="language"
                        placeholder="Language"
                        value={book.language}
                        onChange={handleChange}
                        className={`bg-white border ${errors.language ? 'border-red-500' : 'border-gray-500'} text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors.language && <p className="text-red-500 text-xs">{errors.language}</p>}
                </div>

                {/* Category */}
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

                {/* Availability Checkbox */}
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="status"
                            checked={book.status === 'Available'}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <span className="ml-2">Available</span>
                    </label>
                </div>

                {/* Buttons */}
                <div className="flex justify-center space-x-4">
                    <Button type="submit" variant="bg-green-600 hover:bg-green-700">Submit</Button>
                    <Button
                        type="button"
                        onClick={resetForm}
                        variant="bg-gray-500 hover:bg-gray-600"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddBookPage;
