import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
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

const Routes = createBrowserRouter([{
    path: '/',
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/employees',
            element: <EmployeePage />
        },
        {
            path: '/employees/new',
            element: <AddEmployeePage />
        },
        {
            path: '/employees/:empNo',
            element: <EditEmployeePage />
        },
        {
            path: '/departments',
            element: <DepartmentPage />
        },
        {
            path: '/departments/new',
            element: <AddDepartmentPage />
        },
        {
            path: '/departments/:deptNo',
            element: <EditDepartmentPage />
        },
        {
            path: '/projects',
            element: <ProjectPage />
        },
        {
            path: '/projects/new',
            element: <AddProjectPage />
        },
        {
            path: '/projects/:projNo',
            element: <EditProjectPage />
        },
        {
            path: '/assignments',
            element: <AssignmentPage />
        },
        {
            path: '/assignments/new',
            element: <AddAssignmentPage />
        },
        {
            path: '/assignments/:empNo/:projNo',
            element: <EditAssignmentPage />
        }
    ]
}]);

export default Routes;