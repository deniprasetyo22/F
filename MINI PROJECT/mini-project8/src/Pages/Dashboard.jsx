import React, { useEffect, useState } from 'react';
import DashboardService from '../Services/DashboardService';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip, Cell, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import { formatDate } from '../components/Elements/DateTimeFormat';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
    const [empDistributionByDept, setEmpDistributionByDept] = useState([]);
    const [topEmployees, setTopEmployees] = useState([]);
    const [averageSalaryByDept, setAverageSalaryByDept] = useState([]);
    const [processes, setProcesses] = useState([]);
    const [employeesTotal, setEmployeesTotal] = useState([]);
    const [departmentsTotal, setDepartmentsTotal] = useState([]);
    const [projectsTotal, setProjectsTotal] = useState([]);
    const [assignmentsTotal, setAssignmentsTotal] = useState([]);
    const { user: currentUser } = useSelector((state) => state.auth);

    const userRole = currentUser.roles;

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await DashboardService.getAll();
                console.log(response.data);
                // Transform data for the pie chart
                const empDistributionByDeptData = response.data.employeeDistribution.map(dept => ({
                    name: dept.deptName,
                    value: dept.employeeCount
                }));

                //Top Employees
                const topEmployeesData = response.data.topEmployees;

                //Average Salary
                const averageSalaryByDeptData = response.data.averageSalary.map(dept => ({
                    name: dept.deptName,
                    value: dept.averageSalary
                }));

                //Process
                const processesData = response.data.processes;

                //Employees Total
                const employeesTotal = response.data.employeesTotal.employeesTotal;

                //Departments Total
                const departmentsTotal = response.data.departmentsTotal.departmentsTotal;

                //Projects Total
                const projectsTotal = response.data.projectsTotal.projectsTotal;

                //Assignments Total
                const assignmentsTotal = response.data.assignmentsTotal.assignmentsTotal;

                setEmpDistributionByDept(empDistributionByDeptData);
                setTopEmployees(topEmployeesData);
                setAverageSalaryByDept(averageSalaryByDeptData);
                setProcesses(processesData);
                setEmployeesTotal(employeesTotal);
                setDepartmentsTotal(departmentsTotal);
                setProjectsTotal(projectsTotal);
                setAssignmentsTotal(assignmentsTotal);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-8">Dashboard</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="w-full h-36 md:w-1/3 rounded-lg shadow-xl p-4 bg-red-400 text-white flex flex-col justify-center items-center gap-4">
                    <p className='text-center'>Total Employees</p>
                    <p className='text-center text-3xl font-bold'>{employeesTotal}</p>
                </div>
                <div className="w-full h-36 md:w-1/3 rounded-lg shadow-xl p-4 bg-blue-400 text-white flex flex-col justify-center items-center gap-4">
                    <p className='text-center'>Total Departments</p>
                    <p className='text-center text-3xl font-bold'>{departmentsTotal}</p>
                </div>
                <div className="w-full h-36 md:w-1/3 rounded-lg shadow-xl p-4 bg-green-400 text-white flex flex-col justify-center items-center gap-4">
                    <p className='text-center'>Total Projects</p>
                    <p className='text-center text-3xl font-bold'>{projectsTotal}</p>
                </div>
                <div className="w-full h-36 md:w-1/3 rounded-lg shadow-xl p-4 bg-yellow-400 text-white flex flex-col justify-center items-center gap-4">
                    <p className='text-center'>Total Assignment</p>
                    <p className='text-center text-3xl font-bold'>{assignmentsTotal}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center mb-8 gap-4">
                <div className="w-full md:w-1/2 h-96 bg-white rounded-lg shadow-xl p-4">
                    <h2 className="text-xl font-semibold text-center mb-4">Employee Distribution by Department</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={empDistributionByDept}
                                margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {empDistributionByDept.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full md:w-1/2 h-96 bg-white rounded-lg shadow-xl p-4">
                    <h2 className="text-xl font-semibold text-center mb-4">Average Salary by Department</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={averageSalaryByDept} margin={{ top: 25, right: 25, left: 25, bottom: 25 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full md:w-1/2 h-96 bg-white rounded-lg shadow-xl p-4">
                    <h2 className="text-xl font-semibold text-center mb-4">Top Employees</h2>
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600">
                                <th className="py-2 px-4 border">Employee ID</th>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Total Hours Worked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topEmployees.map(employee => (
                                <tr key={employee.empId} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border">{employee.empId}</td>
                                    <td className="py-2 px-4 border">{employee.employeeName}</td>
                                    <td className="py-2 px-4 border">{employee.totalHoursWorked}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {(userRole.includes("Employee Supervisor") || userRole.includes("HR Manager")) && (
                <div className="overflow-x-auto border bg-white rounded-lg shadow-lg p-5">
                    <h2 className="text-xl font-semibold text-center mb-4">Leave Requests</h2>
                    <div className='overflow-x-auto'>
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600">
                                    <th className="py-2 px-4 border">Request ID</th>
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Leave Type</th>
                                    <th className="py-2 px-4 border">Start Date</th>
                                    <th className="py-2 px-4 border">End Date</th>
                                    <th className="py-2 px-4 border">Total Days</th>
                                    <th className="py-2 px-4 border">Reason</th>
                                    <th className="py-2 px-4 border">Status</th>
                                    <th className="py-2 px-4 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {processes.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="py-2 px-4 border text-center">
                                            No leave requests found.
                                        </td>
                                    </tr>
                                ) : (
                                    processes.map(process => (
                                        <tr key={process.requestId} className="hover:bg-gray-100 text-center">
                                            <td className="py-2 px-4 border">{process.requestId}</td>
                                            <td className="py-2 px-4 border">{process.requester}</td>
                                            <td className="py-2 px-4 border">{process.leaveType}</td>
                                            <td className="py-2 px-4 border">{formatDate(process.startDate)}</td>
                                            <td className="py-2 px-4 border">{formatDate(process.endDate)}</td>
                                            <td className="py-2 px-4 border">{process.totalDays}</td>
                                            <td className="py-2 px-4 border">{process.reason}</td>
                                            <td className="py-2 px-4 border">{process.status}</td>
                                            <td className="py-2 px-4 border">
                                                <Link to={`/leaverequest/${process.requestId}`} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                                                    Review
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Dashboard;


