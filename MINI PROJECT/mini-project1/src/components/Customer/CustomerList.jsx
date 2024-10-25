import React from "react";

const CustomerList = ({ customers }) => {
    return (
        <div className="p-4 border rounded">
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
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50">
                                <td className="border p-2">{customer.name}</td>
                                <td className="border p-2">{customer.email}</td>
                                <td className="border p-2">{customer.phoneNumber}</td>
                                <td className="border p-2">{customer.address}</td>
                                <td className="border p-2 text-center">
                                    <button className="bg-yellow-500 text-white p-1 px-3 rounded mr-2">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white p-1 px-3 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerList;
