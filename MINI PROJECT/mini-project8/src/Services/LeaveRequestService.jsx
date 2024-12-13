import API from "../API";

const getAll = async () => {
    return await API.get("/leaverequest");
}

const getAllPaging = async (params) => {
    return await API.get("/leaverequest/paging", { params });
}

const get = async (requestid) => {
    return await API.get(`/leaverequest/${requestid}`);
}

const create = async (data) => {
    return await API.post("/leaverequest", data);
}

const approval = async (processid, data) => {
    return await API.put(`/leaverequest/approval/${processid}`, data);
}

const LeaveRequestService = {
    getAll,
    getAllPaging,
    get,
    create,
    approval
}

export default LeaveRequestService