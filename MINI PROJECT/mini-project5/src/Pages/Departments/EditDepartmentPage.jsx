import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import Alert from '../../components/Elements/Alert';
import DepartmentService from '../../Services/DepartmentService';
import EmployeeService from '../../Services/EmployeeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const EditDepartmentPage = () => {
    const { deptid } = useParams();
    const navigate = useNavigate();
    const [editDepartment, setEditDepartment] = useState({
        deptid: deptid,
        deptname: '',
        mgrempid: '',
        locations: [{ address: '' }]
    });
    const [employees, setEmployees] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();

        const fetchDepartment = async () => {
            try {
                const response = await DepartmentService.get(deptid);
                setEditDepartment({
                    deptid: response.data.deptid,
                    deptname: response.data.deptname,
                    mgrempid: response.data.mgrempid,
                    locations: response.data.locations || [{ address: '' }]
                });
            } catch (error) {
                console.error("Error fetching department:", error);
                Alert('error', 'Failed to fetch department details.');
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await EmployeeService.getAllNoPages();
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
                Alert('error', 'Failed to fetch employees.');
            }
        };

        fetchDepartment();
        fetchEmployees();
    }, [deptid]);

    const handleChange = (e) => {
        setEditDepartment({
            ...editDepartment,
            [e.target.name]: e.target.value,
        });
    };

    const handleLocationChange = (index, value) => {
        const newLocations = [...editDepartment.locations];
        newLocations[index].address = value;
        setEditDepartment({
            ...editDepartment,
            locations: newLocations
        });
    };

    const addLocation = () => {
        setEditDepartment({
            ...editDepartment,
            locations: [...editDepartment.locations, { address: '' }]
        });
    };

    const removeLocation = (index) => {
        const newLocations = editDepartment.locations.filter((_, i) => i !== index);
        setEditDepartment({
            ...editDepartment,
            locations: newLocations
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await DepartmentService.update(deptid, editDepartment);
            Alert('success', 'Department updated successfully');
            navigate('/departments');
        } catch (error) {
            console.error("Error updating department:", error);
            Alert('error', 'Failed to update department.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-10 text-center">Edit Department</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="deptname">Department Name</Label>
                        <input
                            type="text"
                            name="deptname"
                            id="deptname"
                            ref={inputRef}
                            value={editDepartment.deptname}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Name"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="mgrempid">Manager Employee Number</Label>
                        <select
                            name="mgrempid"
                            id="mgrempid"
                            value={editDepartment.mgrempid}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="">Select Manager</option>
                            {employees.map((employee) => (
                                <option key={employee.empid} value={employee.empid}>
                                    {employee.empid} - {employee.fname} {employee.lname}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <Label>Locations</Label>
                    {editDepartment.locations.map((location, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={location.address}
                                onChange={(e) => handleLocationChange(index, e.target.value)}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder={`Location ${index + 1}`}
                            />
                            <Button variant="bg-red-500" onClick={() => removeLocation(index)} className="text-red-500">
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </div>
                    ))}
                    <button type="button" onClick={addLocation} className="text-blue-500">
                        <FontAwesomeIcon icon={faPlus} /> Add Location
                    </button>
                </div>
                <div className="text-center">
                    <Button type="submit">Update</Button>
                    <Link to={`/departments/${deptid}`} className="ml-4">
                        <Button variant="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditDepartmentPage;
