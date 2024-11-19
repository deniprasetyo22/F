import React, { useEffect, useState } from 'react';
import { faPlus, faArrowUpRightFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MemberPage = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedMembers = JSON.parse(localStorage.getItem('members')) || [];
        setMembers(storedMembers);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = (memberId) => {
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
                const updatedMembers = members.filter(member => member.id !== memberId);
                setMembers(updatedMembers);
                localStorage.setItem('members', JSON.stringify(updatedMembers));

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your member has been deleted.',
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded mb-5">
            <h2 className="text-lg font-bold text-center">"Member List"</h2>
            <div className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mb-2 rounded inline-flex items-center">
                <Link to="/members/add">
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                    <span className="text-sm">Add</span>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-600 text-white">
                            <th className="border p-2">Full Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Phone</th>
                            <th className="border p-2">Gender</th>
                            <th className="border p-2">Address</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            members.map((member, index) => (
                                <tr key={member.id} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{member.fullName}</td>
                                    <td className="border p-2">{member.email}</td>
                                    <td className="border p-2">{member.phone}</td>
                                    <td className="border p-2">{member.gender}</td>
                                    <td className="border p-2">{member.address}</td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Link to={`/members/${member.id}`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded mr-2 px-3"
                                        >
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(member.id)}
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
    );
};

export default MemberPage;
