import axios from "axios";
const instance = axios.create({
    baseURL:"http://localhost/api/",
withCredentials: false,});
export default instance;