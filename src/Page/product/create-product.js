import React, { useState,useEffect, useContext } from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { Helmet } from 'react-helmet';
import { end } from '@popperjs/core';
import './uploadfile.css'
import { getCtgr ,getKosp} from '../../Service/categories.service';
import { create, update } from '../../Service/products.service';
import UserContext from '../../context/userContext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function CreateProduct({edit,setEdit}) {

    const {state,dispatch}=useContext(UserContext)
    const [CategoryDetail,setCategoryDetail]=useState([]);

    const [prepData,setprepData]=useState({Categories:[],Kindofsport:[],gender:null})
    const [Description,setDescription]=useState()

    const schema = yup.object({
        Name:yup.string().required().min(4).max(100,'quá số lượng'),
        Price:yup.number().required().min(0),
        Gender:yup.number().required(),
        OpenSale:yup.string().required(),
        Status:yup.number().required(),
        CategoryDetailId:yup.number().required(),
        KindofsportId:yup.number().required(),
    }).required();

    const {register,setValue,reset,resetField,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })
    const prepEdit =()=>{
        dispatch({type:"SHOW_LOADING"});
        if(edit!=null){
            Change(edit.categoryDetail.category.id);
            setTimeout(()=>{
                setValue("Name",edit.name)
                setValue("Price",edit.price)
                setValue("Gender",edit.gender)
                setValue("OpenSale",edit.openSale)
                setValue("Status",edit.status)
                setValue("CategoryDetailId",edit.categoryDetail.id)
                setValue("KindofsportId",edit.kindofsport.id)
            },1000)
        }else{
            reset();
        }
        dispatch({type:"HIDE_LOADING"});
    }
    const GetData = async ()=>{
        let ctgrs = await getCtgr();
        let Kosp= await getKosp();
        prepData['Categories']=ctgrs;
        prepData['Kindofsport']=Kosp;
    }
    const Change = (id)=>{
        if(id=="") return setCategoryDetail([]);
        prepData['Categories'].map(e=>{
                if(e.id==id){
                    setCategoryDetail(e.categoryDetails)
                }
                return e;
            })
    }
    const Submit =async (data)=>{
        dispatch({type:"SHOW_LOADING"});
        data['Description']=Description;
        if(edit!=null){
            data['Id']=edit.id;
            const rs= await update(data)
            let listp= state.products.map(e=>{
                return rs.id==e.id?rs:e;
            })
            dispatch({type:"UPDATE_PRODUCT",payload:listp})
        }else{
            const rs = await create(data);
            state.products.push(rs)
        }
        dispatch({type:"HIDE_LOADING"});
    }

    useEffect(()=>{
        GetData();
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
                                <div className="row mb-3">
                                    <div className='col-sm-6 checkbox-radios'>
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="radio" {...register("Gender")} value={0} checked/> Male
                                                <span class="circle">
                                                <span class="check"></span>
                                                </span>
                                            </label>
                                            </div>
                                            <div class="form-check">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="radio" {...register("Gender")} value={1}/> Female
                                                <span class="circle">
                                                <span class="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <span className='text-danger'>{errors.Gender?.message}</span>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div class="form-group">
                                            <input type="text" {...register("OpenSale")}  class="form-control datetimepicker" placeholder='Choose OpenSale' />
                                            <span className='text-danger'>{errors.OpenSale?.message}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mb-3">
                                    <div className='col-sm-6'>
                                            <select class="form-control"  {...register("KindofsportId")}  title="Choose Kind of sport">
                                            <option >Choose Kind of sport</option>
                                                {prepData['Kindofsport'].length>0 && prepData['Kindofsport'].map((e,i) =>{
                                                    return (<option value={e.id} >{e.name}</option>)
                                                })}
                                            </select>
                                            <span className='text-danger'>{errors.KindofsportId?.message}</span>
                                        
                                    </div>
                                    <div className='col-sm-6'>
                                    <div class="form-group">
                                                <select   class='form-control'    {...register("Status")} title="Status">
                                                <option >Status</option>
                                                    <option value={0}>Published</option>
                                                    <option value={1}>Inactive</option>
                                                    <option value={2}>Scheduled</option>
                                                </select>
                                                <span className='text-danger'>{errors.Status?.message}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row  mb-5">
                                    <div className='col-sm-6'>
                                        <select class='form-control' onChange={e=>Change(e.target.value)} title='Choose Category' >
                                            <option >Category</option>
                                            {prepData['Categories'].length>0 && prepData['Categories'].map(e=>{
                                                return (<option value={e.id} selected={edit && edit.categoryDetail.categoryId==e.id}>{e.name}</option>)
                                            })}
                                        </select>
                                    <span className='text-danger'>{errors.CategoryId?.message}</span>
                                    </div>
                                    <div className='col-sm-6'>
                                        <select  class='form-control' {...register("CategoryDetailId")} title='Category Detail' >
                                        <option >Choose Category Detail</option>
                                            {CategoryDetail.length>0 && CategoryDetail.map(e=>{
                                                return (<option value={e.id} >{e.name}</option>)
                                            })}
                                        </select>
                                        <span className='text-danger'>{errors.CategoryDetailId?.message}</span>
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <CKEditor
                                            editor={ ClassicEditor }
                                            data={(edit&&edit.description)??""}
                                            onReady={ editor => {
                                                console.log( 'Editor is ready to use!', editor );
                                            } }
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setDescription(data)
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