import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Slice/AuthSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        navigate('/login');
        return null;
    }

    const emp = currentUser.user.employee;

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Profile Information</h2>
            <div className="flex flex-wrap justify-center my-5">
                {emp ? (
                    <table className="md:w-1/2 border border-collapse border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-gray-400">
                                <th colSpan="2" className="border border-gray-300 px-4 py-2">Profile Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">ID</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.empid}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Full Name</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.fname} {emp.lname}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">SSN</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.ssn}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Email</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.email}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Sex</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.sex}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Position</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.position}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Salary</td>
                                <td className="border border-gray-300 px-4 py-2">Rp. {emp.salary}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Address</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.address}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Phone Number</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.phoneno}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Date of Birth</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.dob}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Employment Type</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.emptype}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Level</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.level}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Department</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.deptid}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Manager</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.supervisorId}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Status</td>
                                <td className="border border-gray-300 px-4 py-2">{emp.status}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-bold">Role</td>
                                <td className="border border-gray-300 px-4 py-2">{currentUser.roles}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No employee details available.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
