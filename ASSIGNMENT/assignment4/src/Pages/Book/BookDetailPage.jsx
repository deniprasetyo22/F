import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Button from '../../components/Elements/Button';

const BookDetailPage = () => {
    const { bookid } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedBook, setUpdatedBook] = useState({
        bookid: '',
        title: '',
        author: '',
        publicationyear: '',
        isbn: '',
    });

    useEffect(() => {
        axios
            .get(`https://localhost:7208/api/book/${bookid}`)
            .then((response) => {
                setBook(response.data);
                setUpdatedBook({
                    bookid: response.data.bookid,
                    title: response.data.title,
                    author: response.data.author,
                    publicationyear: response.data.publicationyear,
                    isbn: response.data.isbn,
                });
            })
            .catch((error) => {
                console.error("Error fetching book details:", error);
            })
            .finally(() => {
                const timer = setTimeout(() => {
                    setLoading(false); // Selesai loading setelah permintaan selesai
                }, 1000);

                return () => clearTimeout(timer);
            });
    }, [bookid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook({
            ...updatedBook,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Aktifkan loading saat proses pembaruan

        axios
            .put(`https://localhost:7208/api/book/${bookid}`, updatedBook)
            .then(() => {
                return axios.get(`https://localhost:7208/api/book/${bookid}`);
            })
            .then((response) => {
                setBook(response.data); // Perbarui state dengan data terbaru
                setIsModalOpen(false);
                Swal.fire({
                    title: 'Success!',
                    text: 'The book details have been updated.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                    timerProgressBar: true,
                });
            })
            .catch((error) => {
                console.error("Error updating book details:", error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
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
        <div className="container mx-auto p-4 md:w-1/2">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-xl text-center font-bold mb-5">Book Detail</h1>

                <div className="grid grid-cols-3 gap-4 mb-4 md:px-10">
                    <p className="font-semibold">ID</p>
                    <p className="text-center">:</p>
                    <p>{book.bookid}</p>

                    <p className="font-semibold">Title</p>
                    <p className="text-center">:</p>
                    <p>{book.title}</p>

                    <p className="font-semibold">Author</p>
                    <p className="text-center">:</p>
                    <p>{book.author}</p>

                    <p className="font-semibold">Publication Year</p>
                    <p className="text-center">:</p>
                    <p>{book.publicationyear}</p>

                    <p className="font-semibold">ISBN</p>
                    <p className="text-center">:</p>
                    <p>{book.isbn}</p>
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
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Publication Year</label>
                                <input
                                    type="text"
                                    name="publicationyear"
                                    value={updatedBook.publicationyear}
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
