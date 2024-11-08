import { faArrowUpRightFromSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Alert from '../../components/Elements/Alert';
import ConfirmationDelete from '../../components/Elements/ConfirmationDelete';

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
        setFilteredEmployees(storedEmployees);
    }, []);

    useEffect(() => {
        setFilteredEmployees(
            employees.filter(employee =>
                `${employee.empNo}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.fName} ${employee.lName}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.address}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.dob}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.sex}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.position}`.toLowerCase().includes(search.toLowerCase()) ||
                `${employee.deptNo}`.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, employees]);

    const handleDelete = (empNo) => {
        ConfirmationDelete().then((result) => {
            if (result.isConfirmed) {
                const newEmployees = employees.filter((employee) => employee.empNo !== empNo);
                localStorage.setItem('employees', JSON.stringify(newEmployees));
                setEmployees(newEmployees);
                Alert('success', 'Employee has been deleted.');
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
            }
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded my-5">
            <h2 className="text-lg font-bold text-center mb-4">Employee List</h2>
            <div className="flex justify-between items-center mb-2">
                <Button variant="bg-blue-600 hover:bg-blue-700">
                    <Link to="/employees/new">
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
                            <th className="border p-2">Emp.No</th>
                            <th className="border p-2">Full Name</th>
                            <th className="border p-2">Address</th>
                            <th className="border p-2">DOB</th>
                            <th className="border p-2">Sex</th>
                            <th className="border p-2">Position</th>
                            <th className="border p-2">Dept.No</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="border p-2 text-center">No items to display</td>
                            </tr>
                        ) : (
                            filteredEmployees.map((employee, index) => (
                                <tr key={employee.empNo} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}>
                                    <td className="border p-2">{employee.empNo}</td>
                                    <td className="border p-2">{employee.fName} {employee.lName}</td>
                                    <td className="border p-2">{employee.address}</td>
                                    <td className="border p-2">{employee.dob}</td>
                                    <td className="border p-2">{employee.sex}</td>
                                    <td className="border p-2">{employee.position}</td>
                                    <td className="border p-2">{employee.deptNo}</td>
                                    <td className="border p-2 flex justify-center space-x-2">
                                        <Button variant="bg-yellow-500 hover:bg-yellow-600">
                                            <Link to={`/employees/${employee.empNo}`}>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </Link>
                                        </Button>
                                        <Button variant="bg-red-500 hover:bg-red-600"
                                            onClick={() => handleDelete(employee.empNo)}
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
        </div>
    );
};

export default EmployeePage;
