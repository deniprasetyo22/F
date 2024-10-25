import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function CustomerForm({ onAdd }) {
    const [customers, setCustomers] = useState({
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomers({ ...customers, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = uuidv4();
        onAdd({ ...customers, id: newId });

        resetForm();
    };

    const resetForm = () => {
        setCustomers({
            id: '',
            name: '',
            email: '',
            phoneNumber: '',
            address: ''
        });
    };

    return (
        <div className="p-4 border rounded mb-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-bold text-center">Add Customer</h2>

                <div>
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={customers.name}
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
                        value={customers.email}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Phone Number</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        value={customers.phoneNumber}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Address</label>
                    <textarea
                        type="text"
                        name="address"
                        maxLength={200}
                        value={customers.address}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 px-5 rounded-md"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CustomerForm;
