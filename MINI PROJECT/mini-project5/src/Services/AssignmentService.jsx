import API from "../API";

const getAll = async (params) => {
    return await API.get("/workson", { params });
};

const getAllNoPages = async () => {
    return await API.get("/workson/NoPages");
};

const get = async (empid, projid) => {
    return await API.get(`/workson/${empid}/${projid}`);
};

const create = async (data) => {
    return await API.post("/workson", data);
};

const update = async (empid, projid, data) => {
    return await API.put(`/workson/${empid}/${projid}`, data);
};

const remove = async (empid, projid) => {
    return await API.delete(`/workson/${empid}/${projid}`);
};

const worksonService = {
    getAll,
    getAllNoPages,
    get,
    create,
    update,
    remove
};

export default worksonService;