import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", // backend url
});

export const getObservations = () => API.get("/observations");
export const getObservation = (id) => API.get(`/observations/${id}`);
export const createObservation = (data) => API.post("/observations", data);
 