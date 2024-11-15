import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [departmentCount, setDepartmentCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [assignmentCount, setAssignmentCount] = useState(0);

    useEffect(() => {
        const getAllEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployeeCount(getAllEmployees.length);

        const getAllDepartments = JSON.parse(localStorage.getItem('departments')) || [];
        setDepartmentCount(getAllDepartments.length);

        const getAllProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjectCount(getAllProjects.length);

        const getAllAssignments = JSON.parse(localStorage.getItem('assignments')) || [];
        setAssignmentCount(getAllAssignments.length);
    }, []);

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
    )
}

export default HomePage