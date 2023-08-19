import React, { useState,useEffect } from 'react';
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


function CreateProduct(props) {
    const [files,setFiles]=useState([]);
    const [Categories,setCategories]=useState([]);
    const [CategoryDetail,setCategoryDetail]=useState([]);
    const [Kindofsport,setKindofsport]=useState([])

    const GetData = async ()=>{
        let ctgrs = await getCtgr();
        setCategories(ctgrs)
        console.log(Categories)
        let Kosp= await getKosp();
        setKindofsport(Kosp)
        console.log(Kosp)

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
    const handleFile = (e)=>{
        let f = e.target.files;
        setFiles(f)
        console.log(files)
    }
    const handleChange = (newFiles) => {
        console.log(newFiles)
        setFiles(prevFiles => [...prevFiles, ...newFiles])
    }
    const handleFileRemove = (fileId) => {
        setFiles(prevFiles => prevFiles.filter(prevFile => prevFile.id !== fileId))
    }
    const ClearFile = ()=>{setFiles([]);}
    
    const schema = yup.object({
        Name:yup.string().required().min(4).max(100,'quá số lượng'),
        Price:yup.number().required().min(0),
        Description:yup.string().required(),
        CategoryId:yup.number().required(),
        ColorName:yup.string().required(),
        Gender:yup.number().required(),
        OpenSale:yup.date().required(),
        Status:yup.number().required(),
        CategoryDetailId:yup.number().required(),
        KindofsportId:yup.number().required(),
    }).required();

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })

    const Submit =async (data)=>{
    //    data["Img"]=files;
        console.log(data);
        const formData  = new FormData();
        formData.append("name",data.Name);
        formData.append("price",data.Price);
        formData.append("description",data.Description);
        formData.append("categoryId",data.CategoryId);
        formData.append("colorName",data.ColorName);
        formData.append("gender",data.Gender);
        formData.append("openSale",new Date(data.OpenSale).toISOString());
        formData.append("status",data.Status);
        formData.append("categoryDetailId",data.CategoryDetailId);
        formData.append("kindofsportId",data.KindofsportId);
        for(var i=0;i<files.length;i++){
            console.log(files[i])
            formData.append("img",files[i]);
        }
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        };
        const rs = await api.post("product",formData,config);
        console.log(rs)

        //let rs = await create(data);
        //console.log(formData);
    }


    return (
        <div className={'container'}>
        <Helmet>
            <script src="../admin/assets/js/plugins/bootstrap-selectpicker.js" type="text/javascript"></script>
            <script src='../admin/assets/demo/formExtended.js' type="text/javascript"></script>
        </Helmet>
            <div className="col-md-12">
                <div className="card ">
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
                            <div className="row mb-4">
                                <div className='col-sm-6'>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" {...register("Gender")} defaultValue="0" defaultChecked /> Male
                                            <span className="circle"><span className="check" /></span>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio"{...register("Gender")} defaultValue="1" /> Female
                                                <span className="circle">
                                                <span className="check" /></span>
                                            </label>
                                    </div>
                                    <span className='text-danger'>{errors.Gender?.message}</span>
                                </div>
                               
                                
                            </div>
                            <div className="row  mb-4">
                                <div className='col-sm-6'>
                                        <select class="form-control"  {...register("KindofsportId")}  title="Choose KindofsportId" >
                                        <option selected>Kind of sport</option>
                                            {Kindofsport.map((e,i) =>{
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
                            
                           
                            
                            <div className="row  mb-4">
                                <div className='col-sm-6'>
                                    <select class='form-control'  {...register("CategoryId")} onChange={e=>Change(e.target.value)}  >
                                        <option selected value="">Category</option>
                                        {Categories.map(e=>{
                                            return (<option value={e.id}>{e.name}</option>)
                                        })}
                                    </select>
                                <span className='text-danger'>{errors.CategoryId?.message}</span>
                                </div>
                                <div className='col-sm-6'>
                                    <select  class='form-control' {...register("CategoryDetailId")} title='Category Detail' >
                                    <option selected value="">Category Detail</option>
                                        {CategoryDetail.map(e=>{
                                            return (<option value={e.id}>{e.name}</option>)
                                        })}
                                    </select>
                                    <span className='text-danger'>{errors.CategoryDetailId?.message}</span>
                                </div>
                            </div>
                            <div className='row mb-4'>
                                <div className='col-sm-6'>
                                    <select  class='form-control' {...register("ColorName")} title='Color'  >
                                        <option selected value="">Color Name</option>
                                        <option  value="Black">Black</option>
                                        <option  value="Red">Red</option>
                                        <option  value="Blue">Blue</option>
                                        <option  value="White">White</option>
                                    </select>
                                    <span className='text-danger'>{errors.ColorName?.message}</span>
                                </div>
                                <div className='col-sm-6'>
                                    <div class="form-group">
                                        <input type="date" {...register("OpenSale")}  class="form-control datetimepicker" placeholder='Choose OpenSale'/>
                                        <span className='text-danger'>{errors.OpenSale?.message}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='row mb-4'>
                                <div className='col-sm-12'>
                                    <div class="form-group">
                                        <textarea type="text" {...register("Description")}  class="form-control"  placeholder='Description' rows={4}></textarea>
                                        <span className='text-danger'>{errors.Description?.message}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-sm-4'>
                                    <span class="btn btn-rose btn-round btn-file">
                                        <span class="fileinput-new">Select image</span>
                                        <span class="fileinput-exists">({files.length})</span>
                                        <input type="file" name="img" onChange={e=>setFiles(e.target.files)} multiple/>
                                    </span>
                                    <a href="#" onClick={()=>setFiles([])} class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i> Remove</a>
                                </div>
                            </div>
                            {/* <div className='row'>
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
                                    <button type='button' className='btn btn-outline-secondary' onClick={ClearFile}>Clear</button>
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
                                                </div>*/}
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
    );
}

export default CreateProduct;