import React, { useState,useEffect, useContext } from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { Helmet } from 'react-helmet';
import { end } from '@popperjs/core';
import Files from 'react-files'
import './uploadfile.css'
import { getCtgr ,getKosp} from '../../Service/categories.service';
import { create } from '../../Service/products.service';
import api from '../../Service/api';
import UserContext from '../../context/userContext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function CreateProduct() {
    const {state,dispatch}=useContext(UserContext)

    const [files,setFiles]=useState([]);
    const [Categories,setCategories]=useState([]);
    const [CategoryDetail,setCategoryDetail]=useState([]);
    const [Kindofsport,setKindofsport]=useState([])
    const [Description,setDescription]=useState([])

    const GetData = async ()=>{
        let ctgrs = await getCtgr();
        setCategories(ctgrs)
        let Kosp= await getKosp();
        setKindofsport(Kosp)
    }

    useEffect( ()=>{
        GetData();
    },[])
   

    const Change = (id)=>{
        console.log(id)
        if(id=="") return setCategoryDetail([]);
            Categories.map(e=>{
                if(e.id==id){
                    setCategoryDetail(e.categoryDetails)
                }
                return e;
            })
    }

    const schema = yup.object({
        Name:yup.string().required().min(4).max(100,'quá số lượng'),
        Price:yup.number().required().min(0),
        Gender:yup.number().required(),
        OpenSale:yup.date().required(),
        Status:yup.number().required(),
        CategoryId:yup.number().required(),
        CategoryDetailId:yup.number().required(),
        KindofsportId:yup.number().required(),
    }).required();

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })

    const Submit =async (data)=>{
        console.log(data)
        dispatch({type:"SHOW_LOADING"});
        const rs = await create(data);
        state.products.push(rs)
        dispatch({type:"UPDATE_PRODUCT",payload:rs})
        
        dispatch({type:"HIDE_LOADING"});
    }


    return (
        <div >
        <Helmet>
            <script src="../admin/assets/js/plugins/bootstrap-selectpicker.js" type="text/javascript"></script>
            <script src='../admin/assets/demo/formExtended.js' type="text/javascript"></script>
        </Helmet>
            <div className="col-md-12">
                <div className="card ">
                    <div className='' style={{paddingInline:25 +'px'}}>
                        <div className="card-header card-header-rose card-header-text">
                            <div className="card-text">
                                <h4 className="card-title">Form Create Product</h4>
                            </div>
                        </div>
                        <div className="card-body ">
                            <form method="post"  onSubmit={handleSubmit(Submit)} className="form-horizontal"  enctype="multipart/form-data">
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" {...register("Name")} placeholder='Name'/>
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
                                <div className="row mb-3">
                                    <div className='col-sm-6'>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" {...register("Gender")} defaultValue="0" defaultChecked /> Male
                                                <span className="circle"><span className="check" /></span>
                                            </label>
                                        </div>
                                        <div className="form-check">
                                                <label className="form-check-label">
                                                    <input className="form-check-input" type="radio"{...register("Gender")} defaultValue="1" /> FeMale
                                                    <span className="circle">
                                                    <span className="check" /></span>
                                                </label>
                                        </div>
                                        <span className='text-danger'>{errors.Gender?.message}</span>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div class="form-group">
                                            <input type="text" {...register("OpenSale")}  class="form-control datetimepicker" placeholder='Choose OpenSale'/>
                                            <span className='text-danger'>{errors.OpenSale?.message}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="row  mb-3">
                                    <div className='col-sm-6'>
                                            <select class="form-control"  {...register("KindofsportId")}  title="Choose KindofsportId" >
                                            <option selected>Kind of sport</option>
                                                {Kindofsport.length>0 && Kindofsport.map((e,i) =>{
                                                    return (<option value={e.id}>{e.name}</option>)
                                                })}
                                            </select>
                                            <span className='text-danger'>{errors.KindofsportId?.message}</span>
                                        
                                    </div>
                                    <div className='col-sm-6'>
                                    <div class="form-group">
                                                <select   class='form-control'    {...register("Status")} title="Status">
                                                    <option selected>Status</option>
                                                    <option value={0}>Open</option>
                                                    <option value={1}>Stop</option>
                                                    <option value={2}>Coming Soon</option>
                                                </select>
                                                <span className='text-danger'>{errors.Status?.message}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mb-5">
                                    <div className='col-sm-6'>
                                        <select class='form-control'  {...register("CategoryId")} onChange={e=>Change(e.target.value)}  >
                                            <option selected value="">Category</option>
                                            {Categories.length>0 && Categories.map(e=>{
                                                return (<option value={e.id}>{e.name}</option>)
                                            })}
                                        </select>
                                    <span className='text-danger'>{errors.CategoryId?.message}</span>
                                    </div>
                                    <div className='col-sm-6'>
                                        <select  class='form-control' {...register("CategoryDetailId")} title='Category Detail' >
                                        <option selected value="">Category Detail</option>
                                            {Categories.length>0 && CategoryDetail.map(e=>{
                                                return (<option value={e.id}>{e.name}</option>)
                                            })}
                                        </select>
                                        <span className='text-danger'>{errors.CategoryDetailId?.message}</span>
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <CKEditor
                                            editor={ ClassicEditor }
                                            // {...register("Description")} 
                                            data="<p>Hello from CKEditor&nbsp;5!</p>"
                                            onReady={ editor => {
                                                // You can store the "editor" and use when it is needed.
                                                //console.log( 'Editor is ready to use!', editor );
                                            } }
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                console.log(data)
                                                console.log( { event, editor, data } );
                                            } }
                                    />
                                </div>
                                <div class="form-group" style={{textAlign:end}}>
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

export default CreateProduct;