import React from 'react'
import API from '../API'

const getAll = async () => {
    return await API.get("/bookrequest");
};

const BookRequestService = {
    getAll
};

export default BookRequestService