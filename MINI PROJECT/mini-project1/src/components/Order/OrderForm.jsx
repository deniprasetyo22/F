import { useState } from "react";

const OrderForm = ({ customers, menus, onAddOrder }) => {
    const [order, setOrder] = useState({
        customerId: '',
        menuId: '',
        quantity: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddOrder(order);
        resetForm();
    };

    const resetForm = () => {
        setOrder({ customerId: '', menuId: '', quantity: 1 });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
                <h2 className="text-lg font-bold text-center">Create Order</h2>

                <div>
                    <label className="block mb-1">Select Customer</label>
                    <select
                        name="customerId"
                        value={order.customerId}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="">-- Select Customer --</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Select Menu</label>
                    <select
                        name="menuId"
                        value={order.menuId}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="">-- Select Menu --</option>
                        {menus.map((menu) => (
                            <option key={menu.id} value={menu.id}>
                                {menu.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={order.quantity}
                        onChange={handleChange}
                        min="1"
                        className="border p-2 w-full"
                        required
                    />
                </div>

                <div className="flex justify-center mt-2">
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 px-5 rounded-md"
                    >
                        Add Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;
