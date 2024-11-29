import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import HomePage from './Pages/HomePage';
import AddEmployeePage from './Pages/Employees/AddEmployeePage';
import EmployeePage from './Pages/Employees/EmployeePage';
import EditEmployeePage from './Pages/Employees/EditEmployeePage';
import AddDepartmentPage from './Pages/Departments/AddDepartmentPage';
import DepartmentPage from './Pages/Departments/DepartmentPage';
import EditDepartmentPage from './Pages/Departments/EditDepartmentPage';
import ProjectPage from './Pages/Projects/ProjectPage';
import AddProjectPage from './Pages/Projects/AddProjectPage';
import EditProjectPage from './Pages/Projects/EditProjectPage';
import AssignmentPage from './Pages/Assignments/AssignmentPage';
import AddAssignmentPage from './Pages/Assignments/AddAssignmentPage';
import EditAssignmentPage from './Pages/Assignments/EditAssignmentPage';
import DetailEmployeePage from './Pages/Employees/DetailEmployeePage';
import DetailDepartmentPage from './Pages/Departments/DetailDepartmentPage';
import DetailProjectPage from './Pages/Projects/DetailProjectPage';
import PrivateRoute from './PrivateRoute';
import ProfilePage from './Pages/ProfilePage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import Unauthorized from './Pages/Auth/Unauthorized';

const Routes = createBrowserRouter([
    {
        // Route yang Membutuhkan Login (Semua User)
        element: <PrivateRoute allowedRoles={['Administrator', 'HR Manager', 'Department Manager', 'Employee Supervisor', 'Employee']} />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: '/employees',
                element: <EmployeePage />
            },
            {
                path: '/departments',
                element: <DepartmentPage />
            },
            {
                path: '/projects',
                element: <ProjectPage />
            },
            {
                path: '/assignments',
                element: <AssignmentPage />
            },
        ],
    },
    {
        // Route Khusus Administrator
        element: <PrivateRoute allowedRoles={['Administrator', 'HR Manager']} />,
        children: [
            {
                path: '/employees/new',
                element: <AddEmployeePage />
            },
            {
                path: '/employees/:empid',
                element: <DetailEmployeePage />
            },
            {
                path: '/employees/:empid/edit',
                element: <EditEmployeePage />
            },
        ]
    },
    {
        // Route Khusus Department Manager
        element: <PrivateRoute allowedRoles={['Administrator', 'Department Manager']} />,
        children: [
            {
                path: '/departments/new',
                element: <AddDepartmentPage />
            },
            {
                path: '/departments/:deptid',
                element: <DetailDepartmentPage />
            },
            {
                path: '/departments/:deptid/edit',
                element: <EditDepartmentPage />
            }
        ]
    },
    {
        // Route Khusus Employee Supervisor
        element: <PrivateRoute allowedRoles={['Employee Supervisor']} />,
        children: [
            {
                path: '/employees/:empid',
                element: <DetailEmployeePage />
            },
            {
                path: '/projects/new',
                element: <AddProjectPage />
            },
            {
                path: '/projects/:projid',
                element: <DetailProjectPage />
            },
            {
                path: '/projects/:projid/edit',
                element: <EditProjectPage />
            },
            {
                path: '/assignments/new',
                element: <AddAssignmentPage />
            },

            {
                path: '/assignments/:assignid/edit',
                element: <EditAssignmentPage />
            }
        ]
    },
    {
        // Route Khusus Employee
        element: <PrivateRoute allowedRoles={['Employee']} />,
        children: [
            {
                path: '/projects',
                element: <ProjectPage />
            },
            {
                path: '/assignments',
                element: <AssignmentPage />
            },
        ]
    },
    {
        // Rute Publik
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                // Halaman Unauthorized
                path: "/unauthorized",
                element: <Unauthorized />
            },
        ],
    }
]);

export default Routes;
