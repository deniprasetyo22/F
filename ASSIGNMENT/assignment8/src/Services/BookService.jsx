import API from "../API";

const getAll = async (params) => {
    return await API.get("/book/search", { params });
};

const get = async (bookId) => {
    return await API.get(`/book/${bookId}`);
};

const create = async (data) => {
    return await API.post("/book", data);
};

const update = async (bookId, data) => {
    return await API.put(`/book/${bookId}`, data);
};

const remove = async (bookId) => {
    return await API.delete(`/book/${bookId}`);
};


const BookService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default BookService;