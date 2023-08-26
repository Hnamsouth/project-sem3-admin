import React, { useState,useEffect, useContext } from 'react';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import { Helmet } from 'react-helmet';
import './uploadfile.css'
import UserContext from '../../context/userContext';

import { useParams } from 'react-router-dom';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { create_pSize, getSize, updatePS } from '../../Service/products.service';

const animatedComponents = makeAnimated();
const types =[
    { value: true, label: 'String' },
    { value: false, label: 'Number' }
];


function CreateProductSize({prdSize,setprdSize,edit}) {
    const {state,dispatch}=useContext(UserContext)
    const [sizes,setSizes]=useState([]);
    const [sizeSelect,setsizeSelect]=useState([]);
    const {pclId}=useParams();

    const schema = yup.object({
        Qty:yup.number().typeError("Qty must be number").required().min(1),
        Type:yup.string(),
        sizeId:yup.number().typeError("size required").required().test('isSizeExisted',"Size Existed",(value)=>{
            // check sizeId exists
        })
    }).required();
    const {register,setValue,reset,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

    const Submit =async (data)=>{
            dispatch({type:"SHOW_LOADING"});
            if(edit==null){
                let params={qty:data.Qty,sizeId:data.sizeId,productColorId:pclId}
                const rs = await create_pSize(params);
                prdSize.push(rs);
            }else{
                let params={id:edit.id,qty:data.Qty,sizeId:data.sizeId,productColorId:parseInt(pclId)};
                const rs = await updatePS(params);
                if(rs!={}){
                   let rs2 =  prdSize.map(e=>{
                        return e.id==rs.id?rs:e
                    })
                    setprdSize(rs2)
                }else{
                    alert(rs)
                }
            }

            dispatch({type:"HIDE_LOADING"});
    }
    const getData = async ()=>{
        let rs = await getSize();
        setSizes(rs);
    }
    const handleType =  (e)=>{
        let data=[];
        sizes.map( v =>{
            if(e=="1" && v.type || e=="0" && !v.type){
                data.push(v)
            }
            return v;
        })
        setsizeSelect(data);
    }
    const prepEdit =async ()=>{
        dispatch({type:"SHOW_LOADING"});
        if(edit!=null){
                handleType(edit.size.type?1:0)
                setTimeout(()=>{
                    setValue("Qty",edit.qty)
                    setValue("Type",edit.size.type?1:0)
                    setValue("sizeId",edit.size.id)
                },1000)
        }else{
            reset();
        }
        dispatch({type:"HIDE_LOADING"});
    }
    useEffect(()=>{
        getData();
    },[])

    useEffect(()=>{
        prepEdit();
    },[edit])

    return (
        <div >
        <Helmet>
            <script src="../admin/assets/js/plugins/bootstrap-selectpicker.js" type="text/javascript"></script>
            <script src='../admin/assets/demo/formExtended.js' type="text/javascript"></script>
        </Helmet>
            <div className="col-md-12">
                <div className="card ">
                    <div className='' style={{paddingInline:25 +'px'}}>
                        <div className="card-body ">
                            <form method="post"  onSubmit={handleSubmit(Submit)} className="form-horizontal">
                                <div className="row mb-3">
                                    <div className='col-sm-6'>
                                        <div class="form-group">
                                            <select class="form-control" {...register("Type")} onChange={e=>handleType(e.target.value)}  title="Choose Type" >
                                                <option selected>Choose Type</option>
                                                <option value={1}> String</option>
                                                <option value={0}> Number</option>
                                            </select>
                                            <span className="text-danger">{errors.Name?.message}</span>
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div class="form-group">
                                            <select class="form-control" {...register("sizeId")} title="Choose Color">
                                            <option selected>Choose Color</option>
                                                {sizeSelect.length>0 && sizeSelect.map(e=>{
                                                    return (
                                                        <option value={e.id}> {e.name}</option>
                                                    );
                                                })}
                                            </select>
                                            <span className="text-danger">{errors.sizeId?.message}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mt-5'>
                                    <div className='col-12'>
                                        <div className="form-group">
                                            <input type="number" className="form-control" {...register("Qty")} placeholder='Qty'/>
                                            <span className="text-danger">{errors.Qty?.message}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style={{textAlign:'center'}}>
                                    <button type="submit" class="btn btn-github">
                                        <span>Create</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProductSize;