import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

const CustomerList = ({ customers, onEdit, onDelete, onOpenModal }) => {
    const handleDelete = (customerId) => {
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
                onDelete(customerId);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your customer has been deleted.',
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
                <h2 className="text-lg font-bold mb-2 text-center">Customer List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Phone Number</th>
                                <th className="border p-2">Address</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="border p-2 text-center">No items to display</td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50 text-center">
                                        <td className="border p-2">{customer.name}</td>
                                        <td className="border p-2">{customer.email}</td>
                                        <td className="border p-2">{customer.phoneNumber}</td>
                                        <td className="border p-2">{customer.address}</td>
                                        <td className="border p-2">
                                            <button
                                                onClick={() => onEdit(customer)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded mr-2 px-3"
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(customer.id)}
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

export default CustomerList;
