import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DepartmentService from '../../Services/DepartmentService';
import EmployeeService from '../../Services/EmployeeService';
import Button from '../../components/Elements/Button';
import BackButton from '../../components/Elements/BackButton';

const DetailDepartmentPage = () => {
    const { deptid } = useParams();
    const [department, setDepartment] = useState(null);
    const [manager, setManager] = useState("Not Assigned");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartmentDetails = async () => {
            try {
                const response = await DepartmentService.get(deptid);
                setDepartment(response.data);

                // Fetch manager details if mgrempid exists
                if (response.data.mgrempid) {
                    try {
                        const empResponse = await EmployeeService.get(response.data.mgrempid);
                        setManager(`${empResponse.data.fname} ${empResponse.data.lname}`);
                    } catch (empError) {
                        console.error("Error fetching manager details:", empError);
                        setManager("Unknown Manager");
                    }
                }
            } catch (err) {
                console.error("Error fetching department details:", err);
                setError("Failed to fetch department details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchDepartmentDetails();
    }, [deptid]);

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

    if (!department) {
        return <p>No department found.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/departments" />
            <h2 className="text-2xl font-bold mb-4 text-center">Department Details</h2>
            <table className="min-w-full border-collapse border rounded-md overflow-hidden">
                <tbody>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">Department ID</td>
                        <td className="border p-2">{department.deptid}</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-bold">Department Name</td>
                        <td className="border p-2">{department.deptname}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">Manager</td>
                        <td className="border p-2">{manager}</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-bold">Locations</td>
                        <td className="border p-2">
                            {department.locations.map((location, index) => (
                                <div key={index}>{location.address}</div>
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="text-center mt-6">
                <Button variant="bg-blue-600 hover:bg-blue-700" onClick={() => navigate(`/departments/${department.deptid}/edit`)}>
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default DetailDepartmentPage;
