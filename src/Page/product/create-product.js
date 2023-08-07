import React, { useState } from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { Helmet } from 'react-helmet';
import { end } from '@popperjs/core';

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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;