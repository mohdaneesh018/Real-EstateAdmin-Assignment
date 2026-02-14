import axios from "axios";

const API = axios.create({
    baseURL: "https://backend-estate-8awo.onrender.com/api"
})

export default API;