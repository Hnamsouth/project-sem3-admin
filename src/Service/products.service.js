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

export const create = async (data)=>{
       const formdata = new FormData();
        formdata.append("Name",data.Name);
        formdata.append("Price",data.Price);
        formdata.append("Description",data.Description);
        formdata.append("CategoryId",data.CategoryId);
        formdata.append("ColorName",data.ColorName);
        formdata.append("Gender",data.Gender);
        formdata.append("OpenSale",data.OpenSale);
        formdata.append("Status",data.Status);
        formdata.append("CategoryDetailId",data.CategoryDetailId);
        formdata.append("KindofsportId",data.KindofsportId);
        // formdata.append("Img",data.Img);
        console.log(formdata)
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    };
    try {
        const url=URL;
     
        const rs = await api.post(url,formdata,config);
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