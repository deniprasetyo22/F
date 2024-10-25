import React from "react";

const MenuList = ({ menus, onEdit, onDelete }) => (
    <div className="border rounded p-4">
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
                    {menus.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="border p-2 text-center">No items to display</td>
                        </tr>
                    ) : (
                        menus.map((menu) => (
                            <tr key={menu.id} className="hover:bg-gray-50">
                                <td className="border p-2">{menu.name}</td>
                                <td className="border p-2">{menu.price}</td>
                                <td className="border p-2">{menu.category}</td>
                                <td className="border p-2">{menu.rating}</td>
                                <td className="border p-2">{menu.isAvailable === 'true' ? 'True' : 'False'}</td>
                                <td className="border p-2">
                                    <button onClick={() => onEdit(menu)} className="bg-yellow-500 text-white p-1 rounded mr-2 px-3">
                                        Edit
                                    </button>
                                    <button onClick={() => onDelete(menu.id)} className="bg-red-500 text-white p-1 px-3 rounded">
                                        Delete
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

export default MenuList;
