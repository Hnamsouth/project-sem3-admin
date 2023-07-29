import api from "./api";

export const login =async (data)=>{
    try {   
        const url="auth/admin/login";
        const rs = await api.post(url,data);
        return rs.data;
    } catch (error) {
        alert("Tài khoản hoặc mật khẩu không đúng");
        return {};
    }
}