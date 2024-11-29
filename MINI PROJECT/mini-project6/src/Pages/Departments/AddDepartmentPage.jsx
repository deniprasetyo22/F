import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import BackButton from '../../components/Elements/BackButton';
import Alert from '../../components/Elements/Alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmployeeService from '../../Services/EmployeeService';
import DepartmentService from '../../Services/DepartmentService';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddDepartmentPage = () => {
    const [departments, setDepartments] = useState({
        deptname: '',
        mgrempid: '',
        locations: [{ address: '' }]
    });
    const [employees, setEmployees] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const handleChange = (e) => {
        setDepartments({
            ...departments,
            [e.target.name]: e.target.value
        });
    };

    const handleLocationChange = (index, value) => {
        const newLocations = [...departments.locations];
        newLocations[index].address = value;
        setDepartments({
            ...departments,
            locations: newLocations
        });
    };

    const addLocation = () => {
        setDepartments({
            ...departments,
            locations: [...departments.locations, { address: '' }]
        });
    };

    const removeLocation = (index) => {
        const newLocations = departments.locations.filter((_, i) => i !== index);
        setDepartments({
            ...departments,
            locations: newLocations
        });
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await EmployeeService.getAllNoPages();
                setEmployees(response.data);
            } catch (error) {
                console.error("Failed to fetch employees:", error);
            }
        };

        fetchEmployees();
        inputRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorMessage = {};

        if (!departments.deptname) {
            errorMessage.deptname = 'Department name is required';
        }
        if (!departments.mgrempid) {
            errorMessage.mgrempid = 'Manager employee number is required';
        }
        if (departments.locations.some(location => !location.address)) {
            errorMessage.locations = 'All location fields must be filled';
        }

        setErrors(errorMessage);

        if (Object.keys(errorMessage).length === 0) {
            try {
                await DepartmentService.create(departments);
                Alert('success', 'Department added successfully');
                navigate('/departments');
            } catch (error) {
                console.error("Failed to add department:", error);
                Alert('error', 'Failed to add department');
            }
            resetForm();
        }
    };

    const resetForm = () => {
        setDepartments({
            deptname: '',
            mgrempid: '',
            locations: [{ address: '' }]
        });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/departments" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add Department</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="deptname">Department Name</Label>
                        <input
                            type="text"
                            name="deptname"
                            id="deptname"
                            ref={inputRef}
                            value={departments.deptname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Name"
                        />
                        {errors.deptname && <small className="text-red-500">{errors.deptname}</small>}
                    </div>
                    <div>
                        <Label htmlFor="mgrempid">Manager Employee Number</Label>
                        <select
                            name="mgrempid"
                            id="mgrempid"
                            value={departments.mgrempid}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            <option value="">-- Select a Manager --</option>
                            {employees.map((employee) => (
                                <option key={employee.empid} value={employee.empid}>
                                    {employee.empid} - {employee.fname} {employee.lname}
                                </option>
                            ))}
                        </select>
                        {errors.mgrempid && <small className="text-red-500">{errors.mgrempid}</small>}
                    </div>
                </div>
                <div>
                    <Label>Locations</Label>
                    {departments.locations.map((location, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={location.address}
                                onChange={(e) => handleLocationChange(index, e.target.value)}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder={`Location ${index + 1}`}
                            />
                            <Button variant="bg-red-500" onClick={() => removeLocation(index)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></Button>
                        </div>
                    ))}
                    <button type="button" onClick={addLocation} className="text-blue-500"><FontAwesomeIcon icon={faPlus} /> Add Location</button>
                    {errors.locations && <small className="text-red-500">{errors.locations}</small>}
                </div>
                <div className="text-center">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default AddDepartmentPage;
