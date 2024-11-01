import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const CustomerForm = ({ onAdd, onEdit, onUpdate, onCancel }) => {
    const [customer, setCustomer] = useState({
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
        address: ''
    });

    const nameInputRef = useRef(null);

    useEffect(() => {
        if (onEdit) {
            setCustomer(onEdit);
        }
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [onEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onEdit) {
            onUpdate(customer);
        } else {
            const newId = uuidv4();
            onAdd({ ...customer, id: newId });
        }
        Swal.fire({
            icon: 'success',
            title: onEdit ? 'Customer Updated!' : 'Customer Added!',
            text: `The customer ${customer.name} has been successfully ${onEdit ? 'updated' : 'added'}.`,
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
        setCustomer({
            id: '',
            name: '',
            email: '',
            phoneNumber: '',
            address: ''
        });
    };

    return (
        <div className="max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-bold text-center">{onEdit ? 'Edit Customer' : 'Add Customer'}</h2>
                <div>
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        ref={nameInputRef}
                        value={customer.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={customer.phoneNumber}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Address</label>
                    <textarea
                        name="address"
                        maxLength={200}
                        value={customer.address}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="flex justify-center space-x-4">
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

export default CustomerForm;
