import API from "../API";

const getAll = async (params) => {
    return await API.get("/user", { params });
};

const get = async (userId) => {
    return await API.get(`/user/${userId}`);
};

const create = async (data) => {
    return await API.post("/user", data);
};

const update = async (userId, data) => {
    return await API.put(`/user/${userId}`, data);
};

const remove = async (userId) => {
    return await API.delete(`/user/${userId}`);
};


const MemberService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default MemberService;