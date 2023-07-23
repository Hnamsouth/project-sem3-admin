
import axios from "axios";
const BASE_URL = "https://localhost:7133/api/";
const api = ()=>{
    return axios.create({
        baseURL:BASE_URL,
        //headers: {"Authorization":"Bearer ..."}
    })
}
export default api;