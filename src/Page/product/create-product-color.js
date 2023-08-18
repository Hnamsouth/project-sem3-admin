import React, { useState,useEffect, useContext } from 'react';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

import { Helmet } from 'react-helmet';
import { end } from '@popperjs/core';
import Files from 'react-files'
import './uploadfile.css'
import UserContext from '../../context/userContext';

import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import { useParams } from 'react-router-dom';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { create_pColor } from '../../Service/products.service';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';

const animatedComponents = makeAnimated();
const options = [
    { value: 'Black', label: 'Black' },
    { value: 'Blue', label: 'Blue' },
    { value: 'White', label: 'White' },
    { value: 'Red', label: 'Red' },
    { value: 'Pink', label: 'Pink' },
    ]

// Initialize once (at the start of your app).
const uploader = Uploader({ apiKey: "public_W142iB7BMmS7q6b1Q1tve8cdSiaP" }); // Your real API key.
const uploaderOptions = {
    multi: true,
    editor: {
        images: {
            crop: false,
            cropRatio: 1,
            cropShape: "circ",
            preview: true
        }
    },
  // Comment out this line & use 'onUpdate' instead of
  // 'onComplete' to have the dropzone close after upload.
    showFinishButton: false,
    styles: {
        colors: {
        primary: "#377dff"
        }
    }
}

function CreateProductColor() {
    const {state,dispatch}=useContext(UserContext)
    let FileUrl=[];
    let Name="";
    const {pId} = useParams();

    const handleFile =async (f)=>{
        console.log(f)
        FileUrl=[];
        await f.map( e=>{
            return ( FileUrl.push(e.fileUrl));
        });
    }
    const handleName= (n)=>{
        Name="";
        n.map(e=>{return (Name+= Name===""?e.value:"/ "+e.value)})
        console.log(Name)
    }
    const {handleSubmit,formState:{errors}}=useForm()

    const Submit =async (data)=>{
        if(!FileUrl.length!=0 || Name ===""){
            alert("require value " + (!FileUrl.length!=0?" File ":"")+(Name ===""?"- Name":""))
        }else{
            console.log(1)
            dispatch({type:"SHOW_LOADING"});
            const rs = await create_pColor({name:Name,productId:pId,img:FileUrl});

            console.log(rs)
            dispatch({type:"HIDE_LOADING"});
        }
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
                        {/* <div className="card-header card-header-rose card-header-text">
                            <div className="card-text">
                                <h4 className="card-title">Form Create Product</h4>
                            </div>
                        </div> */}
                        <div className="card-body ">
                            <form method="post"  onSubmit={handleSubmit(Submit)} className="form-horizontal"  enctype="multipart/form-data">
                                <div className='row mb-3'>
                                    <div className='col-12'>
                                    <UploadDropzone uploader={uploader}
                                        options={uploaderOptions}
                                        onUpdate={files => handleFile(files)}
                                        value={FileUrl}
                                        width="600px"
                                        height="375px"
                                        className='mx-auto'
                                         />
                                    </div>
                                </div>
                                <div className="row mb-3 justify-content-center">
                                    <div className="col-6">
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            // defaultValue={[colourOptions[4], colourOptions[5]]}
                                            onChange={e=>handleName(e)}
                                            isMulti
                                            options={options}
                                            />
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

export default CreateProductColor;