import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const MenuForm = ({ onAdd, onEdit, onUpdate, onCancel }) => {
    const [menus, setMenus] = useState({
        id: '',
        name: '',
        price: '',
        category: 'Food',
        rating: 0,
        isAvailable: 'true'
    });

    const menuCategories = ["Food", "Beverage", "Dessert"];

    const nameInputRef = useRef(null);

    useEffect(() => {
        if (onEdit) {
            setMenus(onEdit);
        }
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [onEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenus({ ...menus, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onEdit) {
            // Jika ada menu yang sedang diedit
            onUpdate(menus);
        } else {
            // Menambahkan menu baru
            const newId = uuidv4();
            onAdd({ ...menus, id: newId });
        }
        Swal.fire({
            icon: 'success',
            title: onEdit ? 'Menu Updated!' : 'Menu Added!',
            text: `The menu ${menus.name} has been successfully ${onEdit ? 'updated' : 'added'}.`,
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true,
            willClose: () => {
                Swal.stopTimer();
            }
        });
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

    // const formatPrice = (value) => {
    //     // Hapus semua karakter non-numeric
    //     const numericValue = value.replace(/\D/g, '');
    //     // Format angka dengan titik setiap tiga digit
    //     return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // };


    return (
        <div className="max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
                <h2 className="text-lg font-bold mb-2 text-center">Add Menu</h2>
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" ref={nameInputRef} value={menus.name} onChange={handleChange} className="border p-2 w-full" required />
                </div>

                <div className="mb-2 relative">
                    <label>Price</label>
                    <input type="number" name="price" value={menus.price}
                        /* onInput={(e) => {
                        // Hanya simpan angka ke state
                        const rawValue = e.target.value.replace(/\D/g, '');
                        handleChange({ target: { name: 'price', value: formatPrice(rawValue) } });
                    }}
                    onChange={(e) => {
                        // Update harga dengan format titik
                        const formattedValue = formatPrice(e.target.value);
                        handleChange({ target: { name: 'price', value: formattedValue } });
                    }}  */
                        onChange={handleChange}
                        className="border p-2 w-full" required />
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
}

export default MenuForm;
