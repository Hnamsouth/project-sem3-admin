import api from "./api";

export const login =async (data)=>{
    try {   
        const url="auth/login";
        const rs = await api.post(url,data);
        return rs.data;
    } catch (error) {
        return {};
    }
}