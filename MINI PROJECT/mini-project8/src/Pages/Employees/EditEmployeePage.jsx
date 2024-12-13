import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EmployeeService from '../../Services/EmployeeService';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import Alert from '../../components/Elements/Alert';
import DepartmentService from '../../Services/DepartmentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const EditEmployeePage = () => {
    const { empid } = useParams();
    const navigate = useNavigate();
    const [editEmployee, setEditEmployee] = useState({
        empid: empid,
        fname: '',
        lname: '',
        address: '',
        dob: '',
        sex: '',
        position: '',
        deptid: '',
        emptype: '',
        email: '',
        phoneno: '',
        supervisorId: '',
        dependents: []
    });
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch departments
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await DepartmentService.getAllNoPages();
                setDepartments(response.data);
            } catch (err) {
                console.error("Error fetching departments:", err);
                setError("Failed to fetch departments.");
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await EmployeeService.getAllNoPages();
                setEmployees(response.data);
            } catch (err) {
                console.error("Error fetching employee details:", err);
                setError("Failed to fetch employee details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
        fetchEmployees();
    }, []);

    // Fetch employee data
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await EmployeeService.get(empid);
                setEditEmployee(response.data);
            } catch (err) {
                console.error("Error fetching employee details:", err);
                setError("Failed to fetch employee details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [empid]);

    const handleChange = (e) => {
        setEditEmployee({
            ...editEmployee,
            [e.target.name]: e.target.value,
        });
    };

    const handleDependentChange = (index, e) => {
        const newDependents = [...editEmployee.dependents];
        newDependents[index][e.target.name] = e.target.value;
        setEditEmployee({ ...editEmployee, dependents: newDependents });
    };

    const addDependent = () => {
        setEditEmployee({
            ...editEmployee,
            dependents: [...editEmployee.dependents, { fName: '', lName: '', sex: '', dob: '', relationship: '' }]
        });
    };

    const removeDependent = (index) => {
        const newDependents = editEmployee.dependents.filter((_, i) => i !== index);
        setEditEmployee({ ...editEmployee, dependents: newDependents });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await EmployeeService.update(empid, editEmployee);
            Alert('success', 'Employee updated successfully');
            navigate(`/employees/${empid}`);
        } catch (err) {
            console.error("Error updating employee:", err);
            Alert('error', 'Failed to update employee. Please try again later.');
        }
    };

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

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-10 text-center">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Employee Fields */}
                    <div className="sm:col-span-2">
                        <Label htmlFor="empid">Employee ID</Label>
                        <input
                            type="text"
                            name="empid"
                            id="empid"
                            value={editEmployee.empid}
                            onChange={handleChange}
                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Employee ID"
                            readOnly
                        />
                    </div>
                    <div>
                        <Label htmlFor="fname">First Name</Label>
                        <input
                            type="text"
                            name="fname"
                            id="fname"
                            value={editEmployee.fname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="lname">Last Name</Label>
                        <input
                            type="text"
                            name="lname"
                            id="lname"
                            value={editEmployee.lname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <textarea
                            name="address"
                            id="address"
                            value={editEmployee.address}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Address"
                        />
                    </div>
                    <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <input
                            type="date"
                            name="dob"
                            id="dob"
                            value={editEmployee.dob}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <Label htmlFor="sex">Sex</Label>
                        <select
                            name="sex"
                            id="sex"
                            value={editEmployee.sex}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="position">Position</Label>
                        <input
                            type="text"
                            name="position"
                            id="position"
                            value={editEmployee.position}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Position"
                        />
                    </div>
                    <div>
                        <Label htmlFor="deptid">Department</Label>
                        <select
                            name="deptid"
                            id="deptid"
                            value={editEmployee.deptid}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">-- Select Department --</option>
                            {departments.map((department) => (
                                <option key={department.deptid} value={department.deptid}>
                                    {department.deptname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="emptype">Employment Type</Label>
                        <select
                            name="emptype"
                            id="emptype"
                            value={editEmployee.emptype}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">-- Select Employment Type --</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={editEmployee.email}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="phoneno">Phone Number</Label>
                        <input
                            type="text"
                            name="phoneno"
                            id="phoneno"
                            value={editEmployee.phoneno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Phone Number"
                        />
                    </div>
                    <div>
                        <Label htmlFor="supervisorId">Supervisor ID</Label>
                        <select
                            name="supervisorId"
                            id="supervisorId"
                            value={editEmployee.supervisorId}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Supervisor ID"
                        >
                            <option value="">-- Select Supervisor --</option>
                            {employees.map((employee) => (
                                <option key={employee.empid} value={employee.empid}>
                                    {employee.empid} - {employee.fname} {employee.lname}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Dependents Section */}
                <h3 className="text-xl font-semibold mt-8">Dependents</h3>
                {editEmployee.dependents.map((dependent, index) => (
                    <div key={index} className="border p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`dependent-fname-${index}`}>First Name</Label>
                                <input
                                    type="text"
                                    name="fName"
                                    id={`dependent-fname-${index}`}
                                    value={dependent.fName}
                                    onChange={(e) => handleDependentChange(index, e)}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="First Name"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor={`dependent-lname-${index}`}>Last Name</Label>
                                <input
                                    type="text"
                                    name="lName"
                                    id={`dependent-lname-${index}`}
                                    value={dependent.lName}
                                    onChange={(e) => handleDependentChange(index, e)}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`dependent-sex-${index}`}>Sex</Label>
                                <select
                                    name="sex"
                                    id={`dependent-sex-${index}`}
                                    value={dependent.sex}
                                    onChange={(e) => handleDependentChange(index, e)}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <Label htmlFor={`dependent-dob-${index}`}>Date of Birth</Label>
                                <input
                                    type="date"
                                    name="dob"
                                    id={`dependent-dob-${index}`}
                                    value={dependent.dob}
                                    onChange={(e) => handleDependentChange(index, e)}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`dependent-relationship-${index}`}>Relationship</Label>
                                <input
                                    type="text"
                                    name="relationship"
                                    id={`dependent-relationship-${index}`}
                                    value={dependent.relationship}
                                    onChange={(e) => handleDependentChange(index, e)}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Relationship"
                                />
                            </div>
                        </div>
                        <button type="button" onClick={() => removeDependent(index)} className="text-red-500 mt-2">
                            Remove Dependent
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addDependent} className="text-blue-500 mt-2">
                    <FontAwesomeIcon icon={faPlus} /> Add Dependent
                </button>

                <div className="text-center">
                    <Button type="submit">
                        Update
                    </Button>
                    <Link to={`/employees/${editEmployee.empid}`} className="ml-4">
                        <Button variant="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditEmployeePage;
