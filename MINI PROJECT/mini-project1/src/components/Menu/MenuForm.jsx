import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid

function MenuForm({ onAdd, menuToEdit, onUpdate, onCancel }) {
    const [menus, setMenus] = useState({
        id: '',
        name: '',
        price: '',
        category: 'Food',
        rating: 0,
        isAvailable: 'true'
    });

    const menuCategories = ["Food", "Beverage", "Dessert"];

    useEffect(() => {
        if (menuToEdit) {
            setMenus(menuToEdit);
        }
    }, [menuToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenus({ ...menus, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (menuToEdit) {
            // Jika ada menu yang sedang diedit
            onUpdate(menus);
        } else {
            // Menambahkan menu baru
            const newId = uuidv4();
            onAdd({ ...menus, id: newId });
        }

        // Reset form data setelah pengiriman
        resetForm();
    };

    const resetForm = () => {
        setMenus({
            id: '',
            name: '',
            price: '',
            category: 'Food',
            rating: 0,
            isAvailable: 'true'
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
                <h2 className="text-lg font-bold mb-2 text-center">Add Menu</h2>
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" value={menus.name} onChange={handleChange} className="border p-2 w-full" required />
                </div>

                <div className="mb-2">
                    <label>Price</label>
                    <input type="number" name="price" value={menus.price} onChange={handleChange} className="border p-2 w-full" required />
                </div>

                <div className="mb-2">
                    <label>Category</label>
                    <select name="category" value={menus.category} onChange={handleChange} className="border p-2 w-full" >
                        {menuCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-2">
                    <label>Rating</label>
                    <input type="number" name="rating" value={menus.rating} onChange={handleChange} className="border p-2 w-full" min="0" max="5" />
                </div>

                <div className="mb-2">
                    <label>Available</label>
                    <select name="isAvailable" value={menus.isAvailable} onChange={handleChange} className="border p-2 w-full" >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className={`${menuToEdit ? 'bg-blue-500' : 'bg-green-500'} text-white p-2 px-5 rounded-md`}>
                        {menuToEdit ? 'Update' : 'Save'}
                    </button>
                    {menuToEdit && (
                        <button type="button" onClick={() => { resetForm(); onCancel(); }} className="bg-red-500 text-white p-2 px-5 rounded-md mx-5" >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default MenuForm;
