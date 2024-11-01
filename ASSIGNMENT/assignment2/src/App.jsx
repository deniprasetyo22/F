import { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* Add */
  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setIsModalOpen(false);
  };

  /* Edit */
  const handleEditBook = (book) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  /* Update */
  const handleUpdateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setCurrentBook(null);
    setIsModalOpen(false);
  };

  /* Delete */
  const handleDeleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  /* Cancel */
  const handleCancelEdit = () => {
    setCurrentBook(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto max-w-7xl p-5">
        <BookList
          books={books}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
          onOpenModal={() => setIsModalOpen(true)}
        />
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-5 rounded-xl shadow-lg max-w-md w-full">
              <BookForm
                onAdd={handleAddBook}
                onEdit={currentBook}
                onUpdate={handleUpdateBook}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
