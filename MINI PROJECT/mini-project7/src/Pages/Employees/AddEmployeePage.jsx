import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import BackButton from '../../components/Elements/BackButton';
import Alert from '../../components/Elements/Alert';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../Services/EmployeeService';
import DepartmentService from '../../Services/DepartmentService';

const AddEmployeePage = () => {
    const [employees, setEmployees] = useState({
        fname: '',
        lname: '',
        ssn: '',
        email: '',
        address: '',
        position: '',
        salary: '',
        sex: '',
        dob: '',
        phoneno: '',
        emptype: '',
        level: '',
        deptid: null,
        supervisorid: null,
        dependents: [] // Initialize dependents as an empty array
    });
    const [departments, setDepartments] = useState([]);
    const [errors, setErrors] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await DepartmentService.getAllNoPages();
                setDepartments(response.data);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            }
        };

        fetchDepartments();
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setEmployees({
            ...employees, [e.target.name]: e.target.value
        });
    };

    const handleDependentChange = (index, e) => {
        const newDependents = [...employees.dependents];
        newDependents[index][e.target.name] = e.target.value;
        setEmployees({ ...employees, dependents: newDependents });
    };

    const addDependent = () => {
        setEmployees({
            ...employees,
            dependents: [...employees.dependents, { fname: '', lname: '', sex: '', dob: '', relationship: '' }]
        });
    };

    const removeDependent = (index) => {
        const newDependents = employees.dependents.filter((_, i) => i !== index);
        setEmployees({ ...employees, dependents: newDependents });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorMessage = {};

        // Validate required fields
        if (!employees.fname) {
            errorMessage.fname = 'First name is required';
        }
        if (!employees.address) {
            errorMessage.address = 'Address is required';
        }
        if (!employees.dob) {
            errorMessage.dob = 'Date of birth is required';
        }
        if (!employees.sex) {
            errorMessage.sex = 'Sex is required';
        }
        if (!employees.position) {
            errorMessage.position = 'Position is required';
        }
        if (!employees.ssn) {
            errorMessage.ssn = 'SSN is required';
        }
        if (!employees.email) {
            errorMessage.email = 'Email is required';
        }
        if (!employees.salary) {
            errorMessage.salary = 'Salary is required';
        }
        if (!employees.phoneno) {
            errorMessage.phoneno = 'Phone number is required';
        }
        if (!employees.emptype) {
            errorMessage.emptype = 'Employment type is required';
        }
        if (!employees.level) {
            errorMessage.level = 'Level is required';
        }

        // Validate dependents (optional)
        employees.dependents.forEach((dependent, index) => {
            if (!dependent.fname) {
                errorMessage[`dependentFname${index}`] = 'Dependent first name is required';
            }
            if (!dependent.lname) {
                errorMessage[`dependentLname${index}`] = 'Dependent last name is required';
            }
            if (!dependent.relationship) {
                errorMessage[`dependentRelationship${index}`] = 'Dependent relationship is required';
            }
        });

        setErrors(errorMessage);

        if (Object.keys(errorMessage).length === 0) {
            try {
                await EmployeeService.create(employees);
                Alert('success', 'Employee added successfully');
                resetForm();
                navigate('/employees');
            } catch (error) {
                if (error.response) {
                    console.error("Error creating employee:", error.response.data);
                    Alert('error', `Failed to add employee. ${error.response.data}`);
                } else {
                    console.error("Error creating employee:", error.message);
                    Alert('error', 'Failed to add employee. Please try again later.');
                }
            }
        }
    };

    const resetForm = () => {
        setEmployees({
            fname: '',
            lname: '',
            ssn: '',
            email: '',
            address: '',
            position: '',
            salary: '',
            sex: '',
            dob: '',
            phoneno: '',
            emptype: '',
            level: '',
            deptid: null,
            supervisorid: null,
            dependents: [] // Reset dependents
        });
        setErrors([]); // Clear any existing errors
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/employees" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Employee Fields */}
                    <div>
                        <Label htmlFor="fname">First Name</Label>
                        <input
                            type="text"
                            name="fname"
                            id="fname"
                            ref={inputRef}
                            value={employees.fname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="First Name"
                        />
                        {errors.fname && <small className="text-red-500">{errors.fname}</small>}
                    </div>
                    <div>
                        <Label htmlFor="lname">Last Name</Label>
                        <input
                            type="text"
                            name="lname"
                            id="lname"
                            value={employees.lname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="ssn">SSN</Label>
                        <input
                            type="text"
                            name="ssn"
                            id="ssn"
                            value={employees.ssn}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Social Security Number"
                        />
                        {errors.ssn && <small className="text-red-500">{errors.ssn}</small>}
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={employees.email}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Email"
                        />
                        {errors.email && <small className="text-red-500">{errors.email}</small>}
                    </div>
                    <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <input
                            type="date"
                            name="dob"
                            id="dob"
                            value={employees.dob}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                        {errors.dob && <small className="text-red-500">{errors.dob}</small>}
                    </div>
                    <div>
                        <Label htmlFor="sex">Sex</Label>
                        <select
                            name="sex"
                            id="sex"
                            value={employees.sex}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.sex && <small className="text-red-500">{errors.sex}</small>}
                    </div>
                    <div>
                        <Label htmlFor="position">Position</Label>
                        <input
                            type="text"
                            name="position"
                            id="position"
                            value={employees.position}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Position"
                        />
                        {errors.position && <small className="text-red-500">{errors.position}</small>}
                    </div>
                    <div>
                        <Label htmlFor="salary">Salary</Label>
                        <input
                            type="text"
                            name="salary"
                            id="salary"
                            value={employees.salary ? new Intl.NumberFormat('id-ID').format(employees.salary) : ''} // Format jika ada nilai
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/\./g, ''); // Hapus titik dari input
                                // Cek jika angka valid sebelum menyimpan ke state
                                if (!isNaN(rawValue) && rawValue !== '') {
                                    handleChange({ target: { name: 'salary', value: parseInt(rawValue, 10) } });
                                } else if (rawValue === '') {
                                    handleChange({ target: { name: 'salary', value: '' } }); // Kosongkan jika input dihapus
                                }
                            }}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Salary"
                        />
                        {errors.salary && <small className="text-red-500">{errors.salary}</small>}
                    </div>
                    <div>
                        <Label htmlFor="phoneno">Phone Number</Label>
                        <input
                            type="tel"
                            name="phoneno"
                            id="phoneno"
                            value={employees.phoneno}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Phone Number"
                        />
                        {errors.phoneno && <small className="text-red-500">{errors.phoneno}</small>}
                    </div>
                    <div>
                        <Label htmlFor="emptype">Employment Type</Label>
                        <select
                            name="emptype"
                            id="emptype"
                            value={employees.emptype}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">-- Select Employment Type --</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Contract">Contract</option>
                        </select>
                        {errors.emptype && <small className="text-red-500">{errors.emptype}</small>}
                    </div>
                    <div>
                        <Label htmlFor="level">Level</Label>
                        <select
                            name="level"
                            id="level"
                            value={employees.level}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">-- Select Level --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        {errors.level && <small className="text-red-500">{errors.level}</small>}
                    </div>
                    <div>
                        <Label htmlFor="deptid">Department</Label>
                        <select
                            name="deptid"
                            id="deptid"
                            value={employees.deptid}
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
                        {errors.deptid && <small className="text-red-500">{errors.deptid}</small>}
                    </div>
                    <div>
                        <Label htmlFor="supervisorid">Supervisor ID</Label>
                        <input
                            type="number"
                            name="supervisorid"
                            id="supervisorid"
                            value={employees.supervisorid}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Supervisor ID"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <textarea
                            name="address"
                            id="address"
                            value={employees.address}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Address"
                        />
                        {errors.address && <small className="text-red-500">{errors.address}</small>}
                    </div>
                </div>

                {/* Dependents Section */}
                <h3 className="text-xl font-bold mt-6">Dependents (Optional)</h3>
                {employees.dependents.map((dependent, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`dependentFname${index}`}>Dependent First Name</Label>
                                <input
                                    type="text"
                                    name="fname"
                                    id={`dependentFname${index}`}
                                    value={dependent.fname}
                                    onChange={(e) => handleDependentChange(index, e)}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="First Name"
                                />
                                {errors[`dependentFname${index}`] && <small className="text-red-500">{errors[`dependentFname${index}`]}</small>}
                            </div>
                            <div>
                                <Label htmlFor={`dependentLname${index}`}>Dependent Last Name</Label>
                                <input
                                    type="text"
                                    name="lname"
                                    id={`dependentLname${index}`}
                                    value={dependent.lname}
                                    onChange={(e) => handleDependentChange(index, e)}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Last Name"
                                />
                                {errors[`dependentLname${index}`] && <small className="text-red-500">{errors[`dependentLname${index}`]}</small>}
                            </div>
                            <div>
                                <Label htmlFor={`dependentSex${index}`}>Dependent Sex</Label>
                                <select
                                    name="sex"
                                    id={`dependentSex${index}`}
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
                                <Label htmlFor={`dependentDob${index}`}>Dependent Date of Birth</Label>
                                <input
                                    type="date"
                                    name="dob"
                                    id={`dependentDob${index}`}
                                    value={dependent.dob}
                                    onChange={(e) => handleDependentChange(index, e)}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`dependentRelationship${index}`}>Relationship</Label>
                                <input
                                    type="text"
                                    name="relationship"
                                    id={`dependentRelationship${index}`}
                                    value={dependent.relationship}
                                    onChange={(e) => handleDependentChange(index, e)}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="Relationship"
                                />
                                {errors[`dependentRelationship${index}`] && <small className="text-red-500">{errors[`dependentRelationship${index}`]}</small>}
                            </div>
                        </div>
                        <button type="button" onClick={() => removeDependent(index)} className="text-red-500 mt-2">
                            Remove Dependent
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addDependent} className="text-blue-500">
                    Add Dependent
                </button>

                <div className="text-center">
                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployeePage;
