import API from "../API";

const getAll = async (params) => {
    return await API.get("/employee", { params });
};

const getAllNoPages = async () => {
    return await API.get("/employee/NoPages");
};

const get = async (empid) => {
    return await API.get(`/employee/${empid}`);
};

const create = async (data) => {
    return await API.post("/employee", data);
};

const update = async (empid, editEmployee) => {
    return await API.put(`/employee/${empid}`, editEmployee);
};

const remove = async (empid) => {
    return await API.delete(`/employee/${empid}`);
};

const deactive = async (empid, reason) => {
    return await API.put(`/employee/deactivate/${empid}`, JSON.stringify(reason), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const activate = async (empid) => {
    return await API.put(`/employee/activate/${empid}`)
};

const EmployeeService = {
    getAll,
    getAllNoPages,
    get,
    create,
    update,
    remove,
    deactive,
    activate
};

export default EmployeeService;