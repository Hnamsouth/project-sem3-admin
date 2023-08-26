<<<<<<< HEAD
import React, { useState,useEffect, useContext } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> hienndth
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { Helmet } from 'react-helmet';
import { end } from '@popperjs/core';
<<<<<<< HEAD
import Files from 'react-files'
import './uploadfile.css'
import { getCtgr ,getKosp} from '../../Service/categories.service';
import { create, update } from '../../Service/products.service';
import api from '../../Service/api';
import UserContext from '../../context/userContext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function CreateProduct() {

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
        if(state.EditProduct!=null){
            Change(state.EditProduct.categoryDetail.category.id);
            setValue("Name",state.EditProduct.name)
            setValue("Price",state.EditProduct.price)
            setValue("Gender",state.EditProduct.gender)
            setValue("OpenSale",state.EditProduct.openSale)
            setValue("Status",state.EditProduct.status)
            setValue("CategoryDetailId",state.EditProduct.categoryDetail.id)
            setValue("KindofsportId",state.EditProduct.kindofsport.id)
        }else{
            reset();
        }
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
        let arr=[];
        console.log(data)
        if(state.EditProduct!=null){
            data['Id']=state.EditProduct.id;
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
        return ()=>{
            if(state.EditProduct!=null) dispatch({type:"EDIT_PRODUCT",payload:null});
        }
    },[])

    useEffect(()=>{
        prepEdit();
    },[state.EditProduct])
    return (
        <div >
        <Helmet>
            <script src="../admin/assets/js/plugins/bootstrap-selectpicker.js" type="text/javascript"></script>
=======

import Files from 'react-files'

function CreateProduct(props) {
    const [files,setFiles]=useState([]);

    const handleChange = (newFiles) => {
        console.log(newFiles)
        setFiles(prevFiles => [...prevFiles, ...newFiles])
     }
  
     const handleFileRemove = (fileId) => {
        setFiles(prevFiles => prevFiles.filter(prevFile => prevFile.id !== fileId))
     }
    
    const schema = yup.object({
        Name:yup.string().required().min(4).max(100,'quá số lượng'),
        Price:yup.number().required().min(0),
        Description:yup.string().required(),
        CategoryId:yup.string().required(),
        ColorName:yup.string().required(),
        Gender:yup.number().required(),
        OpenSale:yup.date().required(),
        Status:yup.string().required(),
        CategoryDetailId:yup.number().required(),
        KindofsportId:yup.number().required(),

    }).required();

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })

    const Submit = async (data)=>{
        data["Img"]=files;
        console.log(data);
    }

    return (
        <div className={'container'}>
        <Helmet>
>>>>>>> hienndth
            <script src='../admin/assets/demo/formExtended.js' type="text/javascript"></script>
        </Helmet>
            <div className="col-md-12">
                <div className="card ">
<<<<<<< HEAD
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
                                        <select class='form-control' onChange={e=>Change(e.target.value)} title='Choose Category' >
                                            <option >Category</option>
                                            {prepData['Categories'].length>0 && prepData['Categories'].map(e=>{
                                                return (<option value={e.id} selected={state.EditProduct && state.EditProduct.categoryDetail.categoryId==e.id}>{e.name}</option>)
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
                                            data={(state.EditProduct&&state.EditProduct.description)??""}
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
=======
                    <div className="card-header card-header-rose card-header-text">
                        <div className="card-text">
                            <h4 className="card-title">Form Create Product</h4>
                        </div>
                    </div>
                    <div className="card-body ">
                        <form method="get" action="https://demos.creative-tim.com/" onSubmit={handleSubmit(Submit)} className="form-horizontal">
                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" {...register("Name")} placeholder='Name'/>
                                        <span className="text-danger">{errors.Name?.message}</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" {...register("Price")} placeholder='Price'/>
                                        <span className="text-danger">{errors.Price?.message}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className='col-sm-6'>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name="exampleRadios" defaultValue="option2" defaultChecked /> First Radio
                                            <span className="circle"><span className="check" /></span>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="exampleRadios" defaultValue="option1" /> Second Radio
                                                <span className="circle">
                                                <span className="check" /></span>
                                            </label>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div class="form-group">
                                        <input type="text" {...register("OpenSale")}  class="form-control datetimepicker" value="11/06/2018" placeholder='Choose OpenSale'/>
                                        <span className='text-danger'>{errors.OpenSale?.message}</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row  mb-3">
                                <div className='col-sm-6'>
                                        <select class="selectpicker" data-style="select-with-transition" {...register("KindofsportId")} multiple title="Choose KindofsportId" data-size="7">
                                            <option value="2">Paris </option>
                                            <option value="24">Paris2 </option>
                                            <option value="25">Paris3 </option>
                                        </select>
                                        <span className='text-danger'>{errors.KindofsportId?.message}</span>
                                    
                                </div>
                                <div className='col-sm-6'>
                                <div class="form-group">
                                            <select   class='selectpicker' data-style="select-with-transition"  {...register("Status")} title="Status">
                                                <option value={1}>Male</option>
                                                <option value={0}>FeMale</option>
                                            </select>
                                            <span className='text-danger'>{errors.Status?.message}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row  mb-3">
                                <div className='col-sm-6'>
                                    <select  class='selectpicker' data-style="select-with-transition"  {...register("CategoryId")} title='Category'>
                                        <option selected>Select CategoryI </option>
                                        <option value={1}>Male</option>
                                        <option value={0}>FeMale</option>
                                    </select>
                                <span className='text-danger'>{errors.CategoryId?.message}</span>
                                </div>
                                <div className='col-sm-6'>
                                    <select   class='selectpicker' data-style="select-with-transition"  {...register("CategoryDetail")}>
                                        <option selected> CategoryDetail </option>
                                        <option value={1}>Male</option>
                                        <option value={0}>FeMale</option>
                                    </select>
                                    <span className='text-danger'>{errors.CategoryDetailId?.message}</span>
                                </div>
                            </div>
                            <div className='row'>
                                
                            </div>

                            <div className='row'>
                                <div className='col-sm-4'>
                                    <div class="form-group">
                                        <Files
                                            className="files-dropzone-list"
                                            dragActiveClassName="files-dropzone-active"
                                            style={{ height: '100px' }}
                                            onChange={handleChange}
                                            multiple
                                            maxFiles={5}
                                            maxFileSize={10000000}
                                            minFileSize={0}
                                            clickable>
                                            Drop files here or click to upload
                                        </Files>
                                    </div>
                                </div>
                                <div className='col-sm-8'>
                                        {files.length > 0 && (
                                    <div className='row'> 
                                                {files.map(file => (
                                                <div className="col-6">
                                                    <div key={file.id} className="files-list-item">
                                                        <div className="files-list-item-preview">
                                                        {file.preview.type === 'image'
                                                            ? <img className="files-list-item-preview-image" src={file.preview.url} />
                                                            : <div className="files-list-item-preview-extension">{file.extension}</div>}
                                                        </div>
                                                        <div className="files-list-item-content">
                                                        <div className="files-list-item-content-item files-list-item-content-item-1">{file.name}</div>
                                                        <div className="files-list-item-content-item files-list-item-content-item-2">{file.sizeReadable}</div>
                                                        </div>
                                                        <div
                                                        className="files-list-item-remove"
                                                        onClick={() => handleFileRemove(file.id)}
                                                        />
                                                    </div>
                                                </div>
                                                ))}
                                    </div>
                                        )}
                                </div>
                            </div>
                            
                            <div class="form-group" style={{textAlign:end}}>
                                <button type="submit" class="btn btn-outline-primary-2">
                                    <span>Create</span>
                                    <i class="icon-long-arrow-right"></i>
                                </button>
                            </div>
                        </form>
>>>>>>> hienndth
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;