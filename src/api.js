import axios from "axios";

const API = axios.create({
    baseURL: "/api", // backend url
});

export const getObservations = () => API.get("/observations");
export const getObservation = (id) => API.get(`/observations/${id}`);
export const createObservation = (data) => API.post("/observations", data);
 


export const loginUser = (credentials) => API.post("/persons/login", credentials);
export const getPersons = () => API.get("/persons"); // ✅ fixed

