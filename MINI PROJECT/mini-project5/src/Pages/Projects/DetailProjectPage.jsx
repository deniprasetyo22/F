import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectService from '../../Services/ProjectService';
import DepartmentService from '../../Services/DepartmentService';
import Button from '../../components/Elements/Button';
import BackButton from '../../components/Elements/BackButton';

const DetailProjectPage = () => {
    const { projid } = useParams();
    const [project, setProject] = useState(null);
    const [department, setDepartment] = useState("Not Assigned");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await ProjectService.get(projid);
                setProject(response.data);

                // Fetch department details if deptid exists
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
                console.error("Error fetching project details:", err);
                setError("Failed to fetch project details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projid]);

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

    if (!project) {
        return <p>No project found.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <BackButton to="/projects" />
            <h2 className="text-2xl font-bold mb-4 text-center">Project Details</h2>
            <table className="min-w-full border-collapse border rounded-md overflow-hidden">
                <tbody>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">Project No</td>
                        <td className="border p-2">{project.projid}</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-bold">Project Name</td>
                        <td className="border p-2">{project.projname}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border p-2 font-bold">Department</td>
                        <td className="border p-2">{department}</td>
                    </tr>
                    {/* Add more fields as necessary */}
                </tbody>
            </table>

            <div className="text-center mt-6">
                <Button variant="bg-blue-600 hover:bg-blue-700" onClick={() => navigate(`/projects/${project.projid}/edit`)}>
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default DetailProjectPage;
