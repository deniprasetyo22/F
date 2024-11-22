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
import DetailEmployeePage from './Pages/Employees/DetailEmployeePage';
import DetailDepartmentPage from './Pages/Departments/DetailDepartmentPage';
import DetailProjectPage from './Pages/Projects/DetailProjectPage';

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
            path: '/employees/:empid',
            element: <DetailEmployeePage />
        },
        {
            path: '/employees/:empid/edit',
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
            path: '/departments/:deptid',
            element: <DetailDepartmentPage />
        },
        {
            path: '/departments/:deptid/edit',
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
            path: '/projects/:projid',
            element: <DetailProjectPage />
        },
        {
            path: '/assignments',
            element: <AssignmentPage />
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
            path: '/assignments/:empid/:projid',
            element: <EditAssignmentPage />
        }
    ]
}]);

export default Routes;