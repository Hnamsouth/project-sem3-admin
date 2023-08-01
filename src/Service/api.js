import axios from "axios";
const url="https://localhost:7133/api/";
const api = axios.create({
    baseURL:url
    // header:{"Authorization":"base urv"}
});
export default api;