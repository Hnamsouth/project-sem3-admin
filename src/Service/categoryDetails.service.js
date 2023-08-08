import api from "./api";

const URL = "CategoryDetail";
export const getCategoryDetails = async (id=null)=>{

    try {
        const url =id==null ? URL: URL + id;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return [];
    }
}

export const createCategoryDetails = async (data)=>{
    try {
        const url=URL+"/create";
        const rs = await api.post(url,data);
        return rs.data;
    } catch (error) {
        return false;
    }
}

export const updateCategoryDetails = async (data)=>{
    try {
        const url=URL+"/update";
        const rs= await api.put(url,{Id:data.id,Name:data.name});
        return rs.data;
    } catch (error) {
        return false;
    }
}
export const deleteCategoryDetails = async (id)=>{
    try {
        const url=URL+"/delete";
        const rs = await api.delete(url,{Id:id});
        return rs.data;
    } catch (error) {
        return false;
    }
}