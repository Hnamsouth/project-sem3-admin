import api from "./api";

const URL = "size";
export const get = async (id=null)=>{

    try {
        const url =id==null ? URL: URL + id;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return [];
    }
}

export const create = async (data)=>{
    try {
        const url=URL+"/create";
        const rs = await api.post(url,data);
        return rs.data;
    } catch (error) {
        return false;
    }
}

