import API from "../API";

const getAll = async (params) => {
    return await API.get("/department", { params });
};

const getAllNoPages = async () => {
    return await API.get("/department/NoPages");
};

const get = async (deptid) => {
    return await API.get(`/department/${deptid}`);
};

const create = async (data) => {
    return await API.post("/department", data);
};

const update = async (deptid, data) => {
    return await API.put(`/department/${deptid}`, data);
};

const remove = async (deptid) => {
    return await API.delete(`/department/${deptid}`);
};

const DepartmentService = {
    getAll,
    getAllNoPages,
    get,
    create,
    update,
    remove
};

export default DepartmentService;