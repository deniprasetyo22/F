import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

const MenuList = ({ menus, onEdit, onDelete, onOpenModal }) => {
    const handleDelete = (menuId) => {
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
                onDelete(menuId);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your menu has been deleted.',
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
            <div className="border rounded p-4 mb-5">
                <h2 className="text-lg font-bold mb-2 text-center">Menu List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Category</th>
                                <th className="border p-2">Rating</th>
                                <th className="border p-2">Available</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {(() => {
                                if (menus.length === 0) {
                                    return (
                                        <tr>
                                            <td colSpan="6" className="border p-2 text-center">No items to display</td>
                                        </tr>
                                    );
                                }

                                return menus.map((menu) => (
                                    <tr key={menu.id} className="hover:bg-gray-50">
                                        <td className="border p-2">{menu.name}</td>
                                        <td className="border p-2">Rp.{menu.price}</td>
                                        <td className="border p-2">{menu.category}</td>
                                        <td className="border p-2">{menu.rating}</td>
                                        <td className="border p-2">{menu.isAvailable === 'true' ? 'True' : 'False'}</td>
                                        <td className="border p-2">
                                            <button onClick={() => onEdit(menu)} className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded mr-2 px-3">
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button onClick={() => handleDelete(menu.id)} className="bg-red-500 hover:bg-red-600 text-white p-1 px-3 rounded">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ));
                            })()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default MenuList;
