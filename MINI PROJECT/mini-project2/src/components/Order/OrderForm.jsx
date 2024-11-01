import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { useRef } from "react";

const OrderForm = ({ customers = [], menus = [], onAddOrder, onEdit, onUpdate, onCancel }) => {
    const [order, setOrder] = useState({
        id: '',
        customerId: '',
        items: [{ menuId: '', quantity: 1, price: 0 }],
        status: "On Progress"
    });

    const customerSeletRef = useRef(null);

    useEffect(() => {
        if (onEdit) {
            setOrder(onEdit);
        }
        if (customerSeletRef.current) {
            customerSeletRef.current.focus();
        }
    }, [onEdit]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItems = [...order.items];
        updatedItems[index] = { ...updatedItems[index], [name]: value };
        setOrder({ ...order, items: updatedItems });
    };

    const handleMenuChange = (e, index) => {
        const selectedMenuId = e.target.value;
        const selectedMenu = menus.find(menu => menu.id === selectedMenuId);
        const updatedItems = [...order.items];

        updatedItems[index] = {
            ...updatedItems[index],
            menuId: selectedMenuId,
            price: selectedMenu ? selectedMenu.price : 0
        };
        setOrder({ ...order, items: updatedItems });
    };

    const addMenuItem = () => {
        setOrder({
            ...order,
            items: [...order.items, { menuId: '', quantity: 1, price: 0 }]
        });
    };

    const removeMenuItem = (index) => {
        const updatedItems = order.items.filter((_, i) => i !== index);
        setOrder({ ...order, items: updatedItems });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onEdit) {
            onUpdate(order);
        } else {
            const newId = uuidv4();
            onAddOrder({ ...order, id: newId });
        }
        Swal.fire({
            icon: 'success',
            title: onEdit ? 'Order Updated!' : 'Order Added!',
            text: `The order has been successfully ${onEdit ? 'updated' : 'added'}.`,
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true,
            willClose: () => {
                Swal.stopTimer();
            }
        });
        resetForm();
    };

    const resetForm = () => {
        setOrder({
            id: '',
            customerId: '',
            items: [{ menuId: '', quantity: 1, price: 0 }],
            status: "On Progress"
        });
    };

    const formatPrice = (value) => {
        return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    };

    const totalPrice = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
                <h2 className="text-lg font-bold text-center">{onEdit ? "Edit Order" : "Create Order"}</h2>

                <div>
                    <label className="block mb-1">Select Customer</label>
                    <select
                        name="customerId"
                        ref={customerSeletRef}
                        value={order.customerId}
                        onChange={(e) => setOrder({ ...order, customerId: e.target.value })}
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

                {order.items.map((item, index) => (
                    <div key={index} className="border rounded p-2 my-2">
                        <div>
                            <label className="block mb-1">Select Menu</label>
                            <select
                                name="menuId"
                                value={item.menuId}
                                onChange={(e) => handleMenuChange(e, index)}
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
                                value={item.quantity}
                                onChange={(e) => handleChange(e, index)}
                                min="1"
                                className="border p-2 w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Price</label>
                            <input
                                type="text"
                                value={formatPrice(item.price * item.quantity)}
                                readOnly
                                className="border p-2 w-full bg-gray-100"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={() => removeMenuItem(index)}
                                className="bg-red-500 text-white p-2 px-4 rounded-md mt-2"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                <div className="mt-2">
                    <label className="block mb-1">Total Price</label>
                    <input
                        type="text"
                        value={formatPrice(totalPrice)}
                        readOnly
                        className="border p-2 w-full bg-gray-100"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-2">
                    <button
                        type="button"
                        onClick={addMenuItem}
                        className="bg-blue-500 text-white p-2 px-7 rounded-md"
                    >
                        Add
                    </button>
                    <button
                        type="submit"
                        className={`${onEdit ? 'bg-blue-600' : 'bg-green-600'} text-white p-2 px-5 rounded-md`}
                    >
                        {onEdit ? 'Update' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        onClick={() => { resetForm(); onCancel(); }}
                        className="bg-gray-500 text-white p-2 px-5 rounded-md"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default OrderForm;
