import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './components/Fragments/Footer';
import Header from './components/Fragments/Header';

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useSelector(state => state.auth);
    const hasRequiredRole = () => {
        if (!allowedRoles) return true;

        return user?.roles?.some(role =>
            allowedRoles.includes(role)
        ) || false;
    };


    if (allowedRoles && !hasRequiredRole()) {
        // Redirect ke halaman unauthorized jika role tidak sesuai
        return <Navigate to="/login" />;
    }


    return user ?
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main> {/* Render child component */}
            <Footer />
        </div>
        : <Navigate to="/login" replace />;
};

export default PrivateRoute;
