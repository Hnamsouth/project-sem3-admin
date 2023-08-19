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
import { create_pSize, getPrdSize, getSize } from '../../Service/products.service';

const animatedComponents = makeAnimated();
const options = [];
const types =[
    { value: true, label: 'String' },
    { value: false, label: 'Number' }
];


function CreateProductSize() {
    const {state,dispatch}=useContext(UserContext)
    const [sizes,setSizes]=useState([]);
    const [sizeSelect,setsizeSelect]=useState([]);
    const {pclId}=useParams();

    const [prdSizeCreate,setprdSizeCreate]=useState({qty:0,sizeId:0,productColorId:pclId})
    const schema = yup.object({
        Qty:yup.number().required().min(1),
    }).required();
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

    const Submit =async (data)=>{
            dispatch({type:"SHOW_LOADING"});
            prdSizeCreate['qty']=data.Qty;
            await create_pSize(prdSizeCreate);
            dispatch({type:"HIDE_LOADING"});
    }

    const getData = async ()=>{
        let rs = await getSize();
        setSizes(rs);
    }
    const handleType = (e)=>{
        let data=[];
        sizes.forEach( v=>{
            if(v.type===e.value){
                data.push({value:v.id,label:v.name})
            }
        })
        setsizeSelect(data);
    }
    const handleSize =(e)=>{
        prdSizeCreate['sizeId']=e.value;
    }
    useEffect(()=>{
        getData();
    },[])

    return (
        <div >
        <Helmet>
            <script src="../admin/assets/js/plugins/bootstrap-selectpicker.js" type="text/javascript"></script>
            <script src='../admin/assets/demo/formExtended.js' type="text/javascript"></script>
        </Helmet>
            <div className="col-md-12">
                <div className="card ">
                    <div className='' style={{paddingInline:25 +'px'}}>
                        {/* <div className="card-header card-header-rose card-header-text">
                            <div className="card-text">
                                <h4 className="card-title">Form Create Product</h4>
                            </div>
                        </div> */}
                        <div className="card-body ">
                            <form method="post"  onSubmit={handleSubmit(Submit)} className="form-horizontal">
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <Select
                                            closeMenuOnSelect={true}
                                            components={animatedComponents}
                                            onChange={e=>handleType(e)}
                                            options={types}
                                            placeholder="Select Type Size..."
                                            />
                                    </div>
                                    <div className="col-sm-6">
                                        <Select
                                            closeMenuOnSelect={true}
                                            components={animatedComponents}
                                            onChange={e=>handleSize(e)}
                                            options={sizeSelect}
                                            placeholder="Select Size..."
                                            />
                                    </div>
                                </div>
                                <div className='row mb-3'>
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