import API from "../API";

const getAll = async () => {
    return await API.get("/dashboard");
}

const DashboardService = {
    getAll,
}

export default DashboardService