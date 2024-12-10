import React from 'react'
import API from '../API'

const getDashboard = async () => {
    return await API.get("/dashboard");
};

const DashboardService = {
    getDashboard
}

export default DashboardService