import api from "./api";


const URL = "partner"
export const get = async (id=null)=>{

    try {
        const url =id==null ? URL: URL + id;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return [];
    }
}

export const getPnProfile = async (id)=>{

    try {
        const url = "partners-info/profile?id=" + id;
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

export const update = async (data)=>{
    try {
        console.log(data)
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


// partner info
export const createPnInfo = async (data)=>{
    try {
        const url=URL+"s-info";
        const rs = await api.post(url,data);
        return rs.data;
    } catch (error) {
        return false;
    }
}

export const updatePnInfo = async (data)=>{
    try {
        const url=URL+"s-info";
        const rs= await api.put(url,data);
        return rs.data;
    } catch (error) {
        return false;
    }
}

export const getPnInfo = async (id=null)=>{
    try {
        let url =id==null ? "partners-info": "partners-info?id=" + id;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return {};
    }
}