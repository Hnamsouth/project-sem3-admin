import api from "./api";

const URL = "product";
export const get = async (id=null)=>{

    try {
        const url =id==null ? URL: URL + id;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return [];
    }
}
export const getPrdColor = async (id)=>{

    try {
        const url =URL+("-color?id="+id);
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return [];
    }
}


export const create = async (data)=>{
    try {
        const url=URL;
        const rs = await api.post(url,data);
        return rs.data;
    } catch (error) {
        return false;
    }
}

export const create_pColor = async (data)=>{
    try {
        const url=URL+"-color";
        const rs = await api.post(url,data);
        return rs.data;
    } catch (error) {
        return false;
    }
}

export const update = async (data)=>{
    try {
        const url=URL+"/update";
        const rs= await api.put(url,{Id:data.id,Name:data.name});
        return rs.data;
    } catch (error) {
        return false;
    }
}
export const deleteC = async (id)=>{
    try {
        const url=URL+"/delete";
        const rs = await api.delete(url,{Id:id});
        return rs.data;
    } catch (error) {
        return false;
    }
}