import axios from "axios";
import { apiHost } from "./constants";

const api = axios.create({
    baseURL: apiHost,
    headers:{
        "Content-Type":"application/json"
    }
})

export default api;