import api from "./api";


const URL = "ad-campaign"
export const get = async (id=null)=>{

    try {
        const url =id==null ? URL: URL + id;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return [];
    }
}

export const getPn = async ()=>{
    try {
        const rs = await api.get("partner");
        return rs.data;
    } catch (error) {
        return [];
    }
}

export const getCll = async ()=>{
    try {
        const rs = await api.get("collection");
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

export const update = async (data)=>{
    try {
        const url=URL+"/update";
        const rs= await api.put(url,data);
        return rs.data;
    } catch (error) {
        return false;
    }
}
export const deleteP = async (id)=>{
    try {
        const url=URL+"/delete";
        const rs = await api.delete(url,{Id:id});
        return rs.data;
    } catch (error) {
        return false;
    }
}