import { useState } from 'react';
import MenuForm from './components/Menu/MenuForm';
import MenuList from './components/Menu/MenuList';
import CustomerForm from './components/Customer/CustomerForm';
import CustomerList from './components/Customer/CustomerList';
import OrderForm from './components/Order/OrderForm';
import OrderList from './components/Order/OrderList';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [menus, setMenus] = useState([]);
  const [menuToEdit, setMenuToEdit] = useState(null);

  const [customers, setCustomers] = useState([]);

  const [orders, setOrders] = useState([]);

  /* Add */
  const handleAddMenu = (newMenu) => {
    setMenus((prevMenus) => [...prevMenus, newMenu]);
  };
  const handleAddCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };
  const handleAddOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  /* Edit */
  const handleEditMenu = (menu) => {
    setMenuToEdit(menu);
  };

  /* Update */
  const handleUpdateMenu = (updatedMenu) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) => (menu.id === updatedMenu.id ? updatedMenu : menu))
    );
    setMenuToEdit(null); // Reset menuToEdit setelah pembaruan
  };

  /* Delete */
  const handleDeleteMenu = (id) => {
    setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
  };

  /* Cancel */
  const handleCancelEdit = () => {
    setMenuToEdit(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Header />

      {/* Section Menu */}
      <section id="menu-section" className="w-full bg-white min-h-screen flex pt-10">
        <div className="container mx-auto max-w-7xl bg-white rounded shadow">
          <div className="p-5">
            <MenuList menus={menus} onEdit={handleEditMenu} onDelete={handleDeleteMenu} />
          </div>
          <div className="p-5">
            <MenuForm
              onAdd={handleAddMenu}
              menuToEdit={menuToEdit}
              onUpdate={handleUpdateMenu}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      </section>

      {/* Section Customer */}
      <section id="customer-section" className="w-full bg-gray-100 min-h-screen flex py-10">
        <div className="container mx-auto max-w-7xl bg-white rounded shadow">
          <div className="p-5">
            <CustomerList customers={customers} />
          </div>
          <div className="p-5">
            <CustomerForm onAdd={handleAddCustomer} />
          </div>
        </div>
      </section>

      {/* Section Order */}
      <section id="order-section" className="w-full bg-white min-h-screen flex pt-10">
        <div className="container mx-auto max-w-7xl bg-white rounded shadow">
          <div className="p-5">
            <OrderList orders={orders} customers={customers} menus={menus} />
          </div>
          <div className="p-5">
            <OrderForm customers={customers} menus={menus} onAddOrder={handleAddOrder} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>

  );

};

export default App;
