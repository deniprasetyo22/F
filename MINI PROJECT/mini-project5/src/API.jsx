// import axios from 'axios';
// import Alert from './components/Elements/Alert';

// const BASE_URL = 'https://localhost:7284/api';

// /* Employees */
// export const GetAllEmployees = async (pageNumber, pageSize) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Employee?pageNumber=${pageNumber}&pageSize=${pageSize}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load employee data');
//     } finally {
//         setTimeout(() => {
//             setLoading(false);
//         }, 2000);
//     }
// };

// export const GetAllEmployeesNoPages = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Employee/noPages`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load employee data');
//     }
// };

// export const GetEmployeeById = async (empno) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Employee/${empno}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load employee data');
//     }
// }

// export const CreateEmployee = async (newEmployee) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/Employee`, newEmployee);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to create employee');
//     }
// };

// export const UpdateEmployee = async (empno, updatedEmployee) => {
//     try {
//         const response = await axios.put(`${BASE_URL}/Employee/${empno}`, updatedEmployee);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to update employee');
//     }
// };

// export const DeleteEmployee = async (empno) => {
//     try {
//         const response = await axios.delete(`${BASE_URL}/Employee/${empno}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to delete employee');
//     }
// };


// /* Departments */
// export const GetAllDepartments = async (pageNumber, pageSize) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Department?pageNumber=${pageNumber}&pageSize=${pageSize}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load department data');
//     } finally {
//         setTimeout(() => {
//             setLoading(false);
//         }, 2000);
//     }
// };

// export const GetAllDepartmentsNoPages = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Department/noPages`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load department data');
//     }
// };

// export const GetDepartmentById = async (deptno) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Department/${deptno}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load department data');
//     }
// };

// export const CreateDepartment = async (newDepartment) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/Department`, newDepartment);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to create department');
//     }
// };

// export const UpdateDepartment = async (deptno, updatedDepartment) => {
//     try {
//         const response = await axios.put(`${BASE_URL}/Department/${deptno}`, updatedDepartment);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to update department');
//     }
// };

// export const DeleteDepartment = async (deptno) => {
//     try {
//         const response = await axios.delete(`${BASE_URL}/Department/${deptno}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to delete department');
//     }
// };


// /* Projects */
// export const GetAllProjects = async (pageNumber, pageSize) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Project?pageNumber=${pageNumber}&pageSize=${pageSize}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load project data');
//     } finally {
//         setTimeout(() => {
//             setLoading(false);
//         }, 2000);
//     }
// };

// export const GetAllProjectsNoPages = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Project/noPages`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load project data');
//     }
// };

// export const GetProjectById = async (projno) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Project/${projno}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load project data');
//     }
// };

// export const CreateProject = async (newProject) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/Project`, newProject);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to create project');
//     }
// };

// export const UpdateProject = async (projno, updatedProject) => {
//     try {
//         const response = await axios.put(`${BASE_URL}/Project/${projno}`, updatedProject);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to update project');
//     }
// };

// export const DeleteProject = async (projno) => {
//     try {
//         const response = await axios.delete(`${BASE_URL}/Project/${projno}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to delete project');
//     }
// };


// /* Assignments */
// export const GetAllAssignments = async (pageNumber, pageSize) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Workson?pageNumber=${pageNumber}&pageSize=${pageSize}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load assignment data');
//     } finally {
//         setTimeout(() => {
//             setLoading(false);
//         }, 2000);
//     }
// };

// export const GetAllAssignmentsNoPages = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Workson/noPages`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load assignment data');
//     }
// };

// export const GetAssignmentById = async (empno, projno) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/Workson/${empno}/${projno}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to load assignment data');
//     }
// };

// export const CreateAssignment = async (newAssignment) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/Workson`, newAssignment);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to create assignment');
//     }
// }

// export const UpdateAssignment = async (empno, projno, updatedAssignment) => {
//     try {
//         const response = await axios.put(`${BASE_URL}/Workson/${empno}/${projno}`, updatedAssignment);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to update assignment');
//     }
// };

// export const DeleteAssignment = async (empno, projno) => {
//     try {
//         const response = await axios.delete(`${BASE_URL}/Workson/${empno}/${projno}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         Alert('error', 'Failed to delete assignment');
//     }
// };


import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL
});