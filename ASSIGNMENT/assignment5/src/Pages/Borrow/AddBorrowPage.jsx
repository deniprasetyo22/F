import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../components/Elements/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddBorrowPage = () => {
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);
    const [borrows, setBorrows] = useState({
        borrowId: '',
        memberId: '',
        bookId: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch member data from localStorage
        const storedMembers = JSON.parse(localStorage.getItem('members')) || [];
        const memberOptions = storedMembers.map((member) => ({
            value: member.id,
            label: member.fullName,
        }));
        setMembers(memberOptions);

        // Fetch book data from localStorage
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        const bookOptions = storedBooks.map((book) => ({
            value: book.id,
            label: book.title,
        }));
        setBooks(bookOptions);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBorrows((prevBorrows) => ({
            ...prevBorrows,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const currentBorrows = JSON.parse(localStorage.getItem('borrows')) || [];

        // Check if the selected member has already borrowed 3 books
        const memberBorrowCount = currentBorrows.filter(
            (borrow) => borrow.memberId === borrows.memberId
        ).length;

        if (memberBorrowCount >= 3) {
            Swal.fire({
                title: 'Limit Exceeded',
                text: 'This member has already borrowed the maximum of 3 books.',
                icon: 'warning',
            });
            return;
        }

        // Generate unique borrowId
        const newBorrow = { ...borrows, borrowId: nanoid() };
        const updatedBorrows = [...JSON.parse(localStorage.getItem('borrows') || '[]'), newBorrow];

        localStorage.setItem('borrows', JSON.stringify(updatedBorrows));

        Swal.fire({
            title: 'Success',
            text: 'Book successfully borrowed.',
            icon: 'success',
        });

        // Reset form fields
        resetForm();

        navigate('/borrow')
    };

    const resetForm = () => {
        setBorrows({
            borrowId: '',
            memberId: '',
            bookId: '',
        });
    };

    return (
        <div className="container mx-auto md:w-1/2">
            <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 shadow-lg rounded-lg">
                <div>
                    <Link to="/borrow">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </div>
                <h2 className="text-lg font-bold mb-4 text-center">"Borrow Book"</h2>
                <div>
                    <label htmlFor="memberId" className="block mb-1">Member:</label>
                    <select
                        id="memberId"
                        name="memberId"
                        value={borrows.memberId}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="">Select Member</option>
                        {members.map((member) => (
                            <option key={member.value} value={member.value}>
                                {member.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="bookId" className="block mb-1">Book:</label>
                    <select
                        id="bookId"
                        name="bookId"
                        value={borrows.bookId}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="">Select Book</option>
                        {books.map((book) => (
                            <option key={book.value} value={book.value}>
                                {book.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-center space-x-4 pt-5">
                    <Button type="submit" variant="bg-green-600 hover:bg-green-700">
                        Borrow
                    </Button>
                    {(borrows.memberId || borrows.bookId) && (
                        <Button type="reset" variant="bg-gray-500 hover:bg-gray-600" onClick={resetForm}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddBorrowPage;
