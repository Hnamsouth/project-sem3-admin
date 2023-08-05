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

export const CheckToken = async () =>{
    const url = "auth/check-token";
    const token =localStorage.getItem("token");
    api.defaults.headers.common["Authorization"]=`Bearer ${token}`;
    try {
        let rs = await api.post(url);
        return rs.data.checkToken
    } catch (error) {
        return false;
    }
}