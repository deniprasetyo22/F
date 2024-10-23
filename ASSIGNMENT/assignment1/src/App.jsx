import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import EditBookModal from './components/EditBookModal'; // Import the modal
import './index.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const addBook = (book) => {
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  const editBook = (id) => {
    const bookToEdit = books.find((book) => book.id === id);
    setCurrentBook(bookToEdit);
    setIsModalOpen(true);
  };

  const updateBook = (id, updatedFields) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...updatedFields } : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBook(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Book</h2>
            <AddBookForm onAdd={addBook} />
          </div>
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Books List</h2>
            <BookList books={books} onEdit={editBook} onDelete={deleteBook} />
          </div>
        </div>
      </main>
      <Footer />
      {isModalOpen && (
        <EditBookModal
          book={currentBook}
          onUpdate={updateBook}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
