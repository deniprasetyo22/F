import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Alert from '../../components/Elements/Alert';
import Label from '../../components/Elements/Label';
import Button from '../../components/Elements/Button';

const EditAssignmentPage = () => {
    const { empNo, projNo } = useParams();
    const navigate = useNavigate();
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    const assignment = assignments.find(
        (assign) => assign.empNo === empNo && assign.projNo === projNo
    );

    const [editAssignment, setEditAssignment] = useState({
        ...assignment,
    });

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setEditAssignment({
            ...editAssignment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedAssignments = assignments.map((assign) =>
            assign.empNo === empNo && assign.projNo === projNo ? editAssignment : assign
        );
        localStorage.setItem('assignments', JSON.stringify(updatedAssignments));

        Alert('success', 'Assignment has been updated.');
        navigate('/assignments');
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-10 text-center">Edit Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="empNo">Employee No</Label>
                        <input
                            type="text"
                            name="empNo"
                            id="empNo"
                            ref={inputRef}
                            value={editAssignment.empNo}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Employee No"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="projNo">Project No</Label>
                        <input
                            type="text"
                            name="projNo"
                            id="projNo"
                            value={editAssignment.projNo}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Project No"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="dateWorked">Date Worked</Label>
                        <input
                            type="date"
                            name="dateWorked"
                            id="dateWorked"
                            value={editAssignment.dateWorked}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <Label htmlFor="hoursWorked">Hours Worked</Label>
                        <input
                            type="number"
                            name="hoursWorked"
                            id="hoursWorked"
                            value={editAssignment.hoursWorked}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Hours Worked"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <Button type="submit">Update</Button>
                    <Link to="/assignments" className="ml-4">
                        <Button variant="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditAssignmentPage;
