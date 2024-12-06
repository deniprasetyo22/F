import API from "../API";

const getAll = async (params) => {
    return await API.get("/project", { params });
};

const getAllNoPages = async () => {
    return await API.get("/project/NoPages");
};

const get = async (projid) => {
    return await API.get(`/project/${projid}`);
};

const create = async (data) => {
    return await API.post("/project", data);
};

const update = async (projid, editproject) => {
    return await API.put(`/project/${projid}`, editproject);
};

const remove = async (projid) => {
    return await API.delete(`/project/${projid}`);
};

const ProjectService = {
    getAll,
    getAllNoPages,
    get,
    create,
    update,
    remove,
};

export default ProjectService;