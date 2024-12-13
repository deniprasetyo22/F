import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import Swal from 'sweetalert2';
import { reset } from '../../Slice/AuthSlice';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        ssn: '',
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
        role: '',
        dependents: []
    });
    const [errors, setErrors] = useState({});

    const { username, email, password, firstName, lastName, ssn, address, position, salary, sex, dob, phoneno, emptype, level, role, deptid, supervisorid, dependents } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }

        if (isSuccess || user) {
            navigate('/login');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onDependentChange = (index, e) => {
        const { name, value } = e.target;
        const newDependents = [...dependents];
        newDependents[index][name] = value;
        setFormData((prevState) => ({
            ...prevState,
            dependents: newDependents,
        }));
    };

    const addDependent = () => {
        setFormData((prevState) => ({
            ...prevState,
            dependents: [...prevState.dependents, { fName: '', lName: '', sex: '', dob: '', relationship: '' }]
        }));
    };

    const removeDependent = (index) => {
        const newDependents = dependents.filter((_, i) => i !== index);
        setFormData((prevState) => ({
            ...prevState,
            dependents: newDependents,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const currentErrors = {};
        if (!username.trim()) currentErrors.username = 'Username is required.';
        if (!email.trim()) currentErrors.email = 'Email is required.';
        if (!password.trim()) currentErrors.password = 'Password is required.';
        if (!firstName.trim()) currentErrors.firstName = 'First name is required.';
        if (!ssn.trim()) currentErrors.ssn = 'SSN is required.';
        if (!address.trim()) currentErrors.address = 'Address is required.';
        if (!position.trim()) currentErrors.position = 'Position is required.';
        if (!salary) currentErrors.salary = 'Salary is required.';
        if (!sex.trim()) currentErrors.sex = 'Sex is required.';
        if (!dob.trim()) currentErrors.dob = 'Date of birth is required.';
        if (!phoneno.trim()) currentErrors.phoneno = 'Phone number is required.';
        if (!emptype.trim()) currentErrors.emptype = 'Employment type is required.';
        if (!level) currentErrors.level = 'Level is required.';
        if (!role) currentErrors.role = 'Role is required.';

        setErrors(currentErrors);

        if (!Object.values(currentErrors).some(Boolean)) {
            try {
                const response = await AuthService.register(formData);
                const message = response.message;
                Swal.fire('Success', message, 'success');
                navigate('/login');
            } catch (error) {
                console.error(error);
                const errorMessage = error.response?.data?.message || error.message;
                Swal.fire('Error', errorMessage, 'error');
            }
        }
    };

    if (isLoading) {
        return (
            <div> <span>Loading...</span> </div>
        );
    }

    const formatCurrency = (value) => {
        if (!value) return '';
        const numberValue = parseFloat(value);
        if (isNaN(numberValue)) return '';

        return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <div className="container mx-auto flex items-center justify-center my-10">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={onChange}
                            placeholder="Enter username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.username && <small className="text-red-500">{errors.username}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Enter email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.email && <small className="text-red-500">{errors.email}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.password && <small className="text-red-500">{errors.password}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={onChange}
                            placeholder="Enter first name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.firstName && <small className="text-red-500">{errors.firstName}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={onChange}
                            placeholder="Enter last name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.lastName && <small className="text-red-500">{errors.lastName}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ssn" className="block mb-2 text-sm font-medium text-gray-700">SSN</label>
                        <input
                            type="text"
                            id="ssn"
                            name="ssn"
                            value={ssn}
                            onChange={onChange}
                            placeholder="Enter SSN"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.ssn && <small className="text-red-500">{errors.ssn}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={onChange}
                            placeholder="Enter address"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.address && <small className="text-red-500">{errors.address}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-700">Position</label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={position}
                            onChange={onChange}
                            placeholder="Enter position"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.position && <small className="text-red-500">{errors.position}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-700">Salary</label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            value={salary}
                            onChange={onChange}
                            placeholder="Enter salary"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.salary && <small className="text-red-500">{errors.salary}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-700">Sex</label>
                        <select
                            id="sex"
                            name="sex"
                            value={sex}
                            onChange={onChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        >
                            <option value="">Select sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.sex && <small className="text-red-500">{errors.sex}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={dob}
                            onChange={onChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.dob && <small className="text-red-500">{errors.dob}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneno" className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            id="phoneno"
                            name="phoneno"
                            value={phoneno}
                            onChange={onChange}
                            placeholder="Enter phone number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        />
                        {errors.phoneno && <small className="text-red-500">{errors.phoneno}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="emptype" className="block mb-2 text-sm font-medium text-gray-700">Employment Type</label>
                        <select
                            name="emptype"
                            id="emptype"
                            value={emptype}
                            onChange={onChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        >
                            <option value="">-- Select Employment Type --</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Contract">Contract</option>
                        </select>
                        {errors.emptype && <small className="text-red-500">{errors.emptype}</small>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-700">Level</label>
                        <select
                            id="level"
                            name="level"
                            value={level}
                            onChange={onChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
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
                    {/* <div className="mb-4">
                        <label htmlFor="deptid" className="block mb-2 text-sm font-medium text-gray-700">Department</label>
                        <select
                            id="deptid"
                            name="deptid"
                            value={deptid}
                            onChange={onChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        >
                            <option value="">-- Select Department --</option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                        {errors.role && <small className="text-red-500">{errors.role}</small>}
                    </div> */}
                    {/* <div className="mb-4">
                        <label htmlFor="supervisorid" className="block mb-2 text-sm font-medium text-gray-700">Supervisor</label>
                        <select
                            id="supervisorid"
                            name="supervisorid"
                            value={supervisorid}
                            onChange={onChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        >
                            <option value="">-- Select Supervisor --</option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                        {errors.role && <small className="text-red-500">{errors.role}</small>}
                    </div> */}
                    <div className="mb-4">
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={onChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                        >
                            <option value="">-- Select Role --</option>
                            <option value="Administrator">Administrator</option>
                            <option value="HR Manager">HR Manager</option>
                            <option value="Department Manager">Department Manager</option>
                            <option value="Employee Supervisor">Employee Supervisor</option>
                            <option value="Employee">Employee</option>
                        </select>
                        {errors.role && <small className="text-red-500">{errors.role}</small>}
                    </div>

                    {/* Dependents Section */}
                    <h3 className="text-lg font-semibold mb-2 col-span-2">Dependents</h3>
                    {dependents.map((dependent, index) => (
                        <div key={index} className="mb-4 border p-4 rounded-lg col-span-2">
                            <h4 className="font-medium">Dependent {index + 1}</h4>
                            <div className="mb-2">
                                <label htmlFor={`dependent-fName-${index}`} className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    id={`dependent-fName-${index}`}
                                    name="fName"
                                    value={dependent.fName}
                                    onChange={(e) => onDependentChange(index, e)}
                                    placeholder="Enter first name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor={`dependent-lName-${index}`} className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    id={`dependent-lName-${index}`}
                                    name="lName"
                                    value={dependent.lName}
                                    onChange={(e) => onDependentChange(index, e)}
                                    placeholder="Enter last name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor={`dependent-sex-${index}`} className="block mb-1 text-sm font-medium text-gray-700">Sex</label>
                                <select
                                    id={`dependent-sex-${index}`}
                                    name="sex"
                                    value={dependent.sex}
                                    onChange={(e) => onDependentChange(index, e)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                                >
                                    <option value="">Select sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor={`dependent-dob-${index}`} className="block mb-1 text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    id={`dependent-dob-${index}`}
                                    name="dob"
                                    value={dependent.dob}
                                    onChange={(e) => onDependentChange(index, e)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor={`dependent-relationship-${index}`} className="block mb-1 text-sm font-medium text-gray-700">Relationship</label>
                                <input
                                    type="text"
                                    id={`dependent-relationship-${index}`}
                                    name="relationship"
                                    value={dependent.relationship}
                                    onChange={(e) => onDependentChange(index, e)}
                                    placeholder="Enter relationship"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeDependent(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove Dependent
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addDependent}
                        className="mb-4 w-full py-2 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700 transition duration-200 ease-in-out col-span-2"
                    >
                        Add Dependent
                    </button>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200 ease-in-out col-span-2`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {message && (
                    <div className="mt-4">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {message}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
