import { useEffect,useState } from "react";
import DataTable from "react-data-table-component";
import { get } from "../../Service/products.service";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
// import SortIcon from "@mui/icons-material/ArrowDownward";

import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true
    },
    {
      name: "Directior",
      selector: "director",
      sortable: true
    },
    {
      name: "Runtime (m)",
      selector: "runtime",
      sortable: true,
      right: true
    }
  ];
  const expan = () => {
    return <div>heeolo </div>;
  };

const isIndeterminate = (indeterminate) => indeterminate;
const selectableRowsComponentProps = { indeterminate: isIndeterminate };
const DBTable = ()=>{

    const [products,setProduct] =useState([]);

    const getProduct = async ()=>{
        let rs = await get();
        setProduct(rs)
        console.log(rs)
        setValue("Name","hoangnasdsam")
        setValue("Price",1122)
    }
    useEffect(()=>{
        getProduct();
    },[])


    const schema = yup.object({
      Name:yup.string().required(),
      Price:yup.number().required(),
  }).required();

  const {register,setValue,handleSubmit,formState:{errors}}=useForm({
      resolver:yupResolver(schema),
  })
  

  const Submit =async (data)=>{
      console.log(data)
  }

    return (
      <form method="post"  onSubmit={handleSubmit(Submit)} className="form-horizontal"  enctype="multipart/form-data">
        <div className="row mb-3">
            <div className="col-sm-6">
                <div className="form-group">
                    <input type="text"  {...register("Name")}  className="form-control"  placeholder='Name'/>
                    <span className="text-danger">{errors.Name?.message}</span>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <input type="number" className="form-control" {...register("Price")} placeholder='Price'/>
                    <span className="text-danger">{errors.Price?.message}</span>
                </div>
            </div>
        </div>
      </form>
    );

}

export default DBTable;