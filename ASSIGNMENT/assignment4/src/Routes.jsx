import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import AddBookPage from './Pages/Book/AddBookPage';
import HomePage from './Pages/HomePage';
import BookDetailPage from './Pages/Book/BookDetailPage';
import AddMemberPage from './Pages/Member/AddMemberPage';
import MemberDetailPage from './Pages/Member/MemberDetailPage';
import BookPage from './Pages/Book/BookPage';
import MemberPage from './Pages/Member/MemberPage';
import BorrowPage from './Pages/Borrow/BorrowPage';
import AddBorrowPage from './Pages/Borrow/AddBorrowPage';

const Routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                {
                    path: '/books',
                    element: <BookPage />
                },
                {
                    path: '/books/add',
                    element: <AddBookPage />
                },
                {
                    path: '/books/:bookid',
                    element: <BookDetailPage />
                },
                {
                    path: '/members',
                    element: <MemberPage />
                },
                {
                    path: '/members/add',
                    element: <AddMemberPage />
                },
                {
                    path: '/members/:id',
                    element: <MemberDetailPage />
                },
                {
                    path: '/borrow',
                    element: <BorrowPage />
                },
                {
                    path: '/borrow/add',
                    element: <AddBorrowPage />
                }
            ]
        }
    ]
);

export default Routes;
