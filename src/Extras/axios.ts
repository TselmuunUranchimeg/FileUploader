import axios from "axios";

const axiosDefault = axios.create({
    baseURL: "http://localhost:8000"
});

export default axiosDefault;