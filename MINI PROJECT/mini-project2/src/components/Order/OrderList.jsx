import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

const OrderList = ({ orders, customers, menus, onEdit, onCancel, onComplete, onOpenModal }) => {
    const getCustomerName = (customerId) =>
        customers.find((customer) => customer.id === customerId)?.name || "Unknown";

    const getMenuName = (menuId) =>
        menus.find((menu) => menu.id === menuId)?.name || "Unknown";

    const formatPrice = (value) => {
        return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    };

    const handleCancleOrder = (orderId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onCancel(orderId);
                Swal.fire({
                    title: 'Canceled!',
                    text: 'Your order has been canceled.',
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

    const handleOnComplete = (orderId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Make sure the order has been complete!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                onComplete(orderId);
                Swal.fire({
                    title: 'Completed!',
                    text: 'The order has been completed.',
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
                <h2 className="text-lg font-bold mb-4 text-center">Order List</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {orders.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No orders to display</div>
                    ) : (
                        orders.map((order) => {

                            const totalPrice = order.items.reduce((total, item) => total + item.price * item.quantity, 0);

                            return (
                                <div key={order.id} className="border p-4 rounded shadow flex flex-col h-full">
                                    <div className="flex-grow">
                                        {/* Display Customer and Status for the order once */}
                                        <p className="mb-4"><strong>Customer: </strong>{getCustomerName(order.customerId)}</p>

                                        {/* Tabel untuk menampilkan item pesanan */}
                                        <table className="w-full text-left mb-4 border border-gray-300">
                                            <thead>
                                                <tr className="border-b border-gray-300 text-center">
                                                    <th className="px-4 py-2">Menu</th>
                                                    <th className="px-4 py-2">Quantity</th>
                                                    <th className="px-4 py-2">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item, index) => (
                                                    <tr key={index} className="border-b border-gray-300">
                                                        <td className="px-4 py-2">{getMenuName(item.menuId)}</td>
                                                        <td className="px-4 py-2 text-center">{item.quantity}</td>
                                                        <td className="px-4 py-2">{formatPrice(item.price * item.quantity)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr className="font-semibold">
                                                    <td colSpan="2" className="px-4 py-2 text-right">Total Price :</td>
                                                    <td className="px-4 py-2">{formatPrice(totalPrice)}</td>
                                                </tr>
                                            </tfoot>
                                        </table>

                                        {/* Display order status */}
                                        <p className="mb-4"><strong>Status: </strong>{order.status}</p>
                                    </div>

                                    {order.status !== "Completed" && order.status !== "Canceled" && (
                                        <div className="mt-auto flex gap-2 justify-center">
                                            <button onClick={() => onEdit(order)} className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded px-3">
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button onClick={() => handleCancleOrder(order.id)} className="bg-red-500 hover:bg-red-600 text-white p-1 px-3 rounded">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <button onClick={() => handleOnComplete(order.id)} className="bg-green-500 hover:bg-green-600 text-white p-1 px-3 rounded">
                                                <FontAwesomeIcon icon={faSquareCheck} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
