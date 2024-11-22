import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import BookService from '../../Services/BookService';
import Button from '../../components/Elements/Button';

const BookDetailPage = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedBook, setUpdatedBook] = useState({
        bookId: bookId,
        title: '',
        author: '',
        category: '',
        publicationyear: '',
        isbn: '',
        description: '',
        language: '',
        location: '',
        price: '',
        totalBook: '',
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await BookService.get(bookId);
                setBook(response.data);
                setUpdatedBook({
                    bookId: response.data.bookId,
                    title: response.data.title,
                    author: response.data.author,
                    category: response.data.category,
                    publisher: response.data.publisher,
                    isbn: response.data.isbn,
                    description: response.data.description,
                    language: response.data.language,
                    location: response.data.location,
                    price: response.data.price,
                    totalBook: response.data.totalBook,
                });
            } catch (error) {
                console.error("Error fetching book details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await BookService.update(bookId, {
                bookId: updatedBook.bookId,
                title: updatedBook.title,
                author: updatedBook.author,
                category: updatedBook.category,
                isbn: updatedBook.isbn,
                publisher: updatedBook.publisher,
                description: updatedBook.description,
                language: updatedBook.language,
                location: updatedBook.location,
                price: updatedBook.price,
                totalBook: updatedBook.totalBook
            });
            const response = await BookService.get(bookId);
            setBook(response.data);
            setIsModalOpen(false);
            Swal.fire({
                title: 'Success!',
                text: 'The book details have been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 2000,
                timerProgressBar: true,
            });
        } catch (error) {
            console.error("Error updating book details:", error);
            console.error("Error details:", error.response.data);
            const errorMessage = error.response?.data?.message || 'There was an error updating the book details. Please try again.';
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:w-1/2">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-xl text-center font-bold mb-5">Book Detail</h1>

                <div className="grid grid-cols-3 gap-4 mb-4 md:px-10">
                    <p className="font-semibold">ID</p>
                    <p className="text-center">:</p>
                    <p>{book.bookId}</p>

                    <p className="font-semibold">Title</p>
                    <p className="text-center">:</p>
                    <p>{book.title}</p>

                    <p className="font-semibold">Category</p>
                    <p className="text-center">:</p>
                    <p>{book.category}</p>

                    <p className="font-semibold">Author</p>
                    <p className="text-center">:</p>
                    <p>{book.author}</p>

                    <p className="font-semibold">ISBN</p>
                    <p className="text-center">:</p>
                    <p>{book.isbn}</p>

                    <p className="font-semibold">Description</p>
                    <p className="text-center">:</p>
                    <p>{book.description}</p>

                    <p className="font-semibold">Language</p>
                    <p className="text-center">:</p>
                    <p>{book.language}</p>

                    <p className="font-semibold">Location</p>
                    <p className="text-center">:</p>
                    <p>{book.location}</p>

                    <p className="font-semibold">Price</p>
                    <p className="text-center">:</p>
                    <p>Rp. {book.price}</p>

                    <p className="font-semibold">Total Book</p>
                    <p className="text-center">:</p>
                    <p>{book.totalBook}</p>
                </div>

                <div className="flex justify-center mt-5 space-x-4">
                    <Link to={'/books'} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Back
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
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
                                <label className="block text-sm font-semibold">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={updatedBook.category}
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
                                <label className="block text-sm font-semibold">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={updatedBook.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Language</label>
                                <input
                                    type="text"
                                    name="language"
                                    value={updatedBook.language}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={updatedBook.location}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={updatedBook.price}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Total Book</label>
                                <input
                                    type="number"
                                    name="totalBook"
                                    value={updatedBook.totalBook}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-center space-x-4">
                                <Button
                                    type="submit"
                                    variant="bg-green-500 hover:bg-green-600"
                                >
                                    Save
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
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
