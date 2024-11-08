import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faPlus, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';
import Alert from '../../components/Elements/Alert';

const DepartmentPage = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    useEffect(() => {
        const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
        setDepartments(storedDepartments);
    }, []);

    useEffect(() => {
        setFilteredDepartments(
            departments.filter(department =>
                `${department.deptNo}`.toLowerCase().includes(search.toLowerCase()) ||
                `${department.deptName}`.toLowerCase().includes(search.toLowerCase()) ||
                `${department.mgrEmpNo}`.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, departments]);

    const handleDelete = (deptNo) => {
        ConfirmationDelete().then((result) => {
            if (result.isConfirmed) {
                const newDepartments = departments.filter(department => department.deptNo !== deptNo);
                localStorage.setItem('departments', JSON.stringify(newDepartments));
                setDepartments(newDepartments);
                Alert('success', 'Department has been deleted.');
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
            }
        });
    };

    const openModal = (department) => {
        setSelectedDepartment(department);
    };

    const closeModal = () => {
        setSelectedDepartment(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded my-5">
            <h2 className="text-lg font-bold text-center mb-4">Department List</h2>
            <div className="flex justify-between items-center mb-2">
                <Button variant="bg-blue-600 hover:bg-blue-700 mb-2">
                    <Link to="/departments/new">
                        <FontAwesomeIcon icon={faPlus} className="mr-1" />
                        <span className="text-sm">Add</span>
                    </Link>
                </Button>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border p-2 rounded-lg w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-600 text-white">
                            <th className="border p-2">Dept.No</th>
                            <th className="border p-2">Department Name</th>
                            <th className="border p-2">Manager Emp.No</th>
                            <th className="border p-2">Employees</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDepartments.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            filteredDepartments.map((department, index) => (
                                <tr key={department.deptNo} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{department.deptNo}</td>
                                    <td className="border p-2">{department.deptName}</td>
                                    <td className="border p-2">{department.mgrEmpNo}</td>
                                    <td className="border p-2">
                                        <Button variant="bg-blue-500 hover:bg-blue-600" onClick={() => openModal(department)}>
                                            View
                                        </Button>
                                    </td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Button variant="bg-yellow-500 hover:bg-yellow-600">
                                            <Link to={`/departments/${department.deptNo}`}>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="bg-red-500 hover:bg-red-600"
                                            onClick={() => handleDelete(department.deptNo)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedDepartment && (
                <div
                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Employees in {selectedDepartment.deptName}
                            </h3>
                            <button
                                onClick={closeModal}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            >
                                <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal Body */}
                        <div className="py-10 flex justify-center">
                            {employees.filter(emp => emp.deptNo === selectedDepartment.deptNo).length > 0 ? (
                                <ul>
                                    {employees.filter(emp => emp.deptNo === selectedDepartment.deptNo).map(emp => (
                                        <li key={emp.empNo}>{emp.empNo} - {emp.fName} {emp.lName}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span>No employees</span>
                            )}
                        </div>
                        {/* Modal Footer */}
                        <div className="flex justify-center p-4 border-t border-gray-200">
                            <Button variant="bg-gray-500 hover:bg-gray-600" onClick={closeModal}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentPage
