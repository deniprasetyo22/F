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
  const [currentMenu, setCurrentMenu] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [view, setView] = useState('menu');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  /* Add */
  const handleAddMenu = (newMenu) => {
    setMenus((prevMenus) => [...prevMenus, newMenu]);
    setIsModalOpen(false);
  };
  const handleAddCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    setIsModalOpen(false);
  };
  const handleAddOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setIsModalOpen(false);
  };

  /* Edit */
  const handleEditMenu = (menu) => {
    setCurrentMenu(menu);
    setIsModalOpen(true);
  };
  const handleEditCustomer = (customer) => {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };
  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  /* Update */
  const handleUpdateMenu = (updatedMenu) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) => (menu.id === updatedMenu.id ? updatedMenu : menu))
    );
    setCurrentMenu(null);
    setIsModalOpen(false);
  };
  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) => (customer.id === updatedCustomer.id ? updatedCustomer : customer))
    );
    setCurrentCustomer(null);
    setIsModalOpen(false);
  };
  const handleUpdateOrder = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
    setCurrentOrder(null);
    setIsModalOpen(false);
  };

  /* Delete */
  const handleDeleteMenu = (id) => {
    setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
  };
  const handleDeleteCustomer = (id) => {
    setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
  };
  const handleDeleteOrder = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  /* Cancel */
  const handleCancelEdit = () => {
    setCurrentMenu(null);
    setCurrentCustomer(null);
    setCurrentOrder(null);
    setIsModalOpen(false);
  };

  const handleCompleteOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: "Completed" } : order
    ));
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: "Canceled" } : order
    ));
  };

  /* Render view based on selected section */
  const renderView = () => {
    switch (view) {
      case 'menu':
        return (
          <>
            <MenuList
              menus={menus}
              onEdit={handleEditMenu}
              onDelete={handleDeleteMenu}
              onOpenModal={() => setIsModalOpen(true)}
            />
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
                  <MenuForm
                    onAdd={handleAddMenu}
                    onEdit={currentMenu}
                    onUpdate={handleUpdateMenu}
                    onCancel={handleCancelEdit}
                  />
                </div>
              </div>
            )}
          </>
        );
      case 'customer':
        return (
          <>
            <CustomerList
              customers={customers}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteCustomer}
              onOpenModal={() => setIsModalOpen(true)}
            />
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
                  <CustomerForm
                    onAdd={handleAddCustomer}
                    onEdit={currentCustomer}
                    onUpdate={handleUpdateCustomer}
                    onCancel={handleCancelEdit}
                  />
                </div>
              </div>
            )}
          </>
        );
      case 'order':
        return (
          <>
            <OrderList
              orders={orders}
              customers={customers}
              menus={menus}
              onEdit={handleEditOrder}
              onCancel={handleCancelOrder}
              onComplete={handleCompleteOrder}
              onOpenModal={() => setIsModalOpen(true)}
            />
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
                  <OrderForm
                    customers={customers}
                    menus={menus}
                    onAddOrder={handleAddOrder}
                    onEdit={currentOrder}
                    onUpdate={handleUpdateOrder}
                    onCancel={handleCancelEdit}
                  />
                </div>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen space-y-24">
      {/* Header with view-switching functionality */}
      <Header setView={setView} />

      {/* Render the selected view */}
      <div className="flex-grow container mx-auto max-w-7xl p-5">
        {renderView()}
      </div>

      {/* Footer */}
      <Footer setView={setView} />
    </div>
  );
};

export default App;
