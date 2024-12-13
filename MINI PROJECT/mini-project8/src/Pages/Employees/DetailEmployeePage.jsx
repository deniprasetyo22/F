import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../../Services/EmployeeService';
import Button from '../../components/Elements/Button';
import BackButton from '../../components/Elements/BackButton';
import { formatDate, formatDateTime } from '../../components/Elements/DateTimeFormat';
import DepartmentService from '../../Services/DepartmentService';
import Swal from 'sweetalert2';

const DetailEmployeePage = () => {
    const { empid } = useParams();
    const [employee, setEmployee] = useState(null);
    const [department, setDepartment] = useState("Not Assigned");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchEmployeeDetails = async () => {
        try {
            const response = await EmployeeService.get(empid);
            setEmployee(response.data);

            if (response.data.deptid) {
                try {
                    const deptResponse = await DepartmentService.get(response.data.deptid);
                    setDepartment(deptResponse.data.deptname);
                } catch (deptError) {
                    console.error("Error fetching department details:", deptError);
                    setDepartment("Unknown Department");
                }
            }
        } catch (err) {
            console.error("Error fetching employee details:", err);
            setError("Failed to fetch employee details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployeeDetails();
    }, [empid]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-indigo-500 w-16 h-16"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!employee) {
        return <p>No employee found.</p>;
    }


    const handleDeactivate = async (empid) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This employee will be deactivated!",
            icon: 'warning',
            input: 'text',
            inputPlaceholder: 'Enter reason for deactivation',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, deactivate it!',
        });

        if (result.isConfirmed) {
            const reason = result.value;
            if (reason) {
                try {
                    await EmployeeService.deactive(empid, reason);
                    Swal.fire('Deactivated!', 'Employee has been deactivated.', 'success');
                    fetchEmployeeDetails();
                } catch (error) {
                    console.error("Error deactivating employee:", error);
                    Swal.fire("Error", "Failed to deactivate the employee. Please try again later.", "error");
                }
            } else {
                Swal.fire("Error", "Reason for deactivation is required.", "error");
            }
        }
    };

    const handleActivate = async (empid) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This employee will be activated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, activate it!',
        });

        if (result.isConfirmed) {
            const reason = null;
            const status = 'Active';
            try {
                await EmployeeService.activate(empid, status, reason);
                Swal.fire('Activated!', 'Employee has been activated.', 'success');
                fetchEmployeeDetails();
            } catch (error) {
                console.error("Error activating employee:", error);
                Swal.fire("Error", "Failed to activate the employee. Please try again later.", "error");
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/employees" />
            <h2 className="text-2xl font-bold mb-4 text-center">Employee Details</h2>
            <table className="min-w-full border-collapse border rounded-md overflow-hidden">
                <tbody>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">Employee ID</td>
                        <td className="border p-2">{employee.empid}</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-bold">Full Name</td>
                        <td className="border p-2">{employee.fname} {employee.lname}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">SSN</td>
                        <td className="border p-2">{employee.ssn}</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-bold">Department</td>
                        <td className="border p-2">{department}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">Position</td>
                        <td className="border p-2">{employee.position}</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-bold">Level</td>
                        <td className="border p-2">{employee.level}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">Employment Type</td>
                        <td className="border p-2">{employee.emptype}</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-bold">Supervisor ID</td>
                        <td className="border p-2">{employee.supervisorId}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">Email</td>
                        <td className="border p-2">{employee.email}</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-bold">Phone Number</td>
                        <td className="border p-2">{employee.phoneno}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">Address</td>
                        <td className="border p-2">{employee.address}</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-bold">Date of Birth</td>
                        <td className="border p-2">{formatDate(employee.dob)}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">Last Updated</td>
                        <td className="border p-2">{formatDateTime(employee.lastupdateddate)}</td>
                    </tr>
                </tbody>
            </table>

            {/* Dependents Section */}
            <h3 className="text-xl font-bold mt-6">Dependents</h3>
            <div className="overflow-x-auto">
                {employee.dependents && employee.dependents.length > 0 ? (
                    <table className="min-w-full border-collapse border rounded-md overflow-hidden mt-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">First Name</th>
                                <th className="border p-2">Last Name</th>
                                <th className="border p-2">Sex</th>
                                <th className="border p-2">Date of Birth</th>
                                <th className="border p-2">Relationship</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.dependents.map((dependent, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className="border p-2">{dependent.fName}</td>
                                    <td className="border p-2">{dependent.lName}</td>
                                    <td className="border p-2">{dependent.sex}</td>
                                    <td className="border p-2">{formatDate(dependent.dob)}</td>
                                    <td className="border p-2">{dependent.relationship}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-2">No dependents found.</p>
                )}
            </div>

            <div className="text-center mt-6 space-x-2">
                <Button variant="bg-blue-600 hover:bg-blue-700" onClick={() => navigate(`/employees/${employee.empid}/edit`)}>
                    Edit
                </Button>
                {employee.status === "Active" && (
                    <Button variant="bg-red-600 hover:bg-red-700" onClick={() => handleDeactivate(employee.empid)}>
                        Deactivate
                    </Button>
                )}
                {employee.status === "Not Active" && (
                    <Button variant="bg-green-600 hover:bg-green-700" onClick={() => handleActivate(employee.empid)}>
                        Activate
                    </Button>
                )}
            </div>
        </div>
    );
};

export default DetailEmployeePage;
