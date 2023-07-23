
import api from "./api";

const URL = "category";
export const get = async (id=null)=>{
    try {
        const url =id==null ? URL: URL + id;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        
    }
}

export const create = async (data)=>{
    try {
        const url=URL+"create";
    } catch (error) {
        
    }

}