import React from "react";

const OrderList = ({ orders, customers, menus }) => {
    const getCustomerName = (customerId) =>
        customers.find((customer) => customer.id === customerId)?.name || "Unknown";

    const getMenuName = (menuId) =>
        menus.find((menu) => menu.id === menuId)?.name || "Unknown";

    return (
        <div className="p-4 border rounded">
            <h2 className="text-lg font-bold mb-2 text-center">Order List</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Customer</th>
                            <th className="border p-2">Menu</th>
                            <th className="border p-2">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border p-2">{getCustomerName(order.customerId)}</td>
                                <td className="border p-2">{getMenuName(order.menuId)}</td>
                                <td className="border p-2 text-center">{order.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default OrderList;
