import React, { useState } from 'react';
import shortid from 'shortid';
import Button from '../../components/Elements/Button';
import Label from '../../components/Elements/Label';
import BackButton from '../../components/Elements/BackButton';
import Alert from '../../components/Elements/Alert';
import { useNavigate } from 'react-router-dom';

const AddProjectPage = ({ onAdd }) => {
    const [projects, setProjects] = useState({
        projNo: '',
        projName: '',
        deptNo: ''
    });

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProjects({
            ...projects,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProjNo = shortid.generate();

        let errorMessage = {};

        if (!projects.projName) {
            errorMessage.projName = 'Project name is required';
        }
        if (!projects.deptNo) {
            errorMessage.deptNo = 'Department number is required';
        }

        setErrors(errorMessage);

        let formValid = true;
        for (let propName in errorMessage) {
            if (errorMessage[propName].length > 0) {
                formValid = false;
            }
        }

        if (formValid) {
            const newProject = ({ ...projects, projNo: newProjNo });
            const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
            storedProjects.push(newProject);
            localStorage.setItem('projects', JSON.stringify(storedProjects));
            Alert('success', 'Project added successfully');
            resetForm();
            navigate('/projects');
        }
    };

    const resetForm = () => {
        setProjects({
            projNo: '',
            projName: '',
            deptNo: ''
        });
    };




    const handleAddProject = (projects) => {

    };


    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/projects" />
            <h2 className="text-2xl font-bold mb-10 text-center">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="projName">Project Name</Label>
                        <input
                            type="text"
                            name="projName"
                            id="projName"
                            value={projects.projName}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Project Name"
                        />
                        {errors.projName && <small className="text-red-500">{errors.projName}</small>}
                    </div>
                    <div>
                        <Label htmlFor="deptNo">Department Number</Label>
                        <input
                            type="text"
                            name="deptNo"
                            id="deptNo"
                            value={projects.deptNo}
                            onChange={handleChange}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Department Number"
                        />
                        {errors.deptNo && <small className="text-red-500">{errors.deptNo}</small>}
                    </div>
                </div>
                <div className="text-center">
                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddProjectPage;
