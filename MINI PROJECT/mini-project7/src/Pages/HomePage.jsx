import React, { useEffect, useState } from 'react';
import EmployeeService from '../Services/EmployeeService';
import DepartmentService from '../Services/DepartmentService';
import ProjectService from '../Services/ProjectService';
import AssignmentService from '../Services/AssignmentService';

const HomePage = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [departmentCount, setDepartmentCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [assignmentCount, setAssignmentCount] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empData, deptData, projData, assignmentData] = await Promise.all([
                    EmployeeService.getAll(),
                    DepartmentService.getAll(),
                    ProjectService.getAll(),
                    AssignmentService.getAll(),
                ]);

                // Accessing the total count from the response
                setEmployeeCount(empData.data.total || 0); // Default to 0 if total is undefined
                setDepartmentCount(deptData.data.total || 0); // Default to 0 if total is undefined
                setProjectCount(projData.data.total || 0); // Default to 0 if total is undefined
                setAssignmentCount(assignmentData.total || 0); // Default to 0 if total is undefined

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Failed to load data.'); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading indicator
    }

    if (error) {
        return <div>{error}</div>; // Display error message
    }

    return (
        <div className="p-8 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center mb-10 mt-5">Welcome to Company Management System!</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
                    <h2 className="text-2xl font-semibold mb-2">Employee Stats</h2>
                    <p className="text-lg">
                        <span className="font-bold">{employeeCount}</span> {employeeCount === 1 ? "employee" : "employees"} in the company.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
                    <h2 className="text-2xl font-semibold mb-2">Department Stats</h2>
                    <p className="text-lg">
                        <span className="font-bold">{departmentCount}</span> {departmentCount === 1 ? "department" : "departments"} in the company.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
                    <h2 className="text-2xl font-semibold mb-2">Project Stats</h2>
                    <p className="text-lg">
                        <span className="font-bold">{projectCount}</span> {projectCount === 1 ? "project" : "projects"} in the company.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
                    <h2 className="text-2xl font-semibold mb-2">Assignment Stats</h2>
                    <p className="text-lg">
                        <span className="font-bold">{assignmentCount}</span> {assignmentCount === 1 ? "assignment" : "assignments"} in the company.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
