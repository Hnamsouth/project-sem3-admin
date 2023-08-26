import React, {useEffect, useContext, useState } from 'react';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

import { Helmet } from 'react-helmet';
import './uploadfile.css'
import UserContext from '../../context/userContext';

import { Uploader } from "uploader";
import { UploadDropzone  } from "react-uploader";
import { useParams } from 'react-router-dom';

import { create_pColor, deletePImg, updatePcl } from '../../Service/products.service';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
function CreateProductColor({setPrdColor,prdColor,edit}) {
    const {state,dispatch}=useContext(UserContext)
    let FileUrl=[];
    const {pId} = useParams();

    const handleFile =async (f)=>{
        console.log(f)
        FileUrl=[];
        await f.map( e=>{
            return ( FileUrl.push(e.fileUrl));
        });
    }
    const handleName= (n)=>{
        let Name="";
        n.forEach(e=>{ (Name+= Name===""?e:"/ "+e)})
        return Name;
    }
    const schema = yup.object({
        Name:yup.array().required(),
    }).required();

    const {register,setValue,reset,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })

    const handleDelete = async (e)=>{
        if(window.confirm("Delete the item?")){
            dispatch({type:"SHOW_LOADING"})
            const rs = await deletePImg(e);
            if(rs.status){
                edit.productColorImages.forEach((vl2,index)=>{
                    if(vl2.id==e.id){
                        edit.productColorImages.splice(index,1);
                    }
                })
            }else{
                alert(rs.msg);
            }
            dispatch({type:"HIDE_LOADING"})
        }

    }
    const prepEdit =  ()=>{
        if(edit!=null){
            let name = edit.name;
            setValue("Name",name.split(" ").join("").split("/"))
        }else{
            reset();
        }
    }

    useEffect(()=>{
        prepEdit();
    },[edit])

    const Submit =async (data)=>{
        dispatch({type:"SHOW_LOADING"});
        if(edit==null){
            const rs = await create_pColor({name:handleName(data.Name),productId:pId,img:FileUrl});
            prdColor.push(rs);
        }else{
            const rs= await updatePcl({id:edit.id,name:handleName(data.Name),productId:pId,img:FileUrl})
            let dt = prdColor.map(e=>{
                return e.id==edit.id?rs:e;
            })
            setPrdColor(dt);
        }
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
                        {/* <div className="card-header card-header-rose card-header-text">
                            <div className="card-text">
                                <h4 className="card-title">Form Create Product</h4>
                            </div>
                        </div> */}
                        <div className="card-body ">
                            <form method="post"  onSubmit={handleSubmit(Submit)} className="form-horizontal"  enctype="multipart/form-data" style={{marginTop:15+'px'}}>
                                <div className='row mb-3'>
                                    <div className='col-lg-6'>
                                    <UploadDropzone uploader={uploader}
                                        options={uploaderOptions}
                                        onUpdate={files => handleFile(files)}
                                        value={FileUrl}
                                        width="600px"
                                        height="375px"
                                        className='mx-auto'
                                        />
                                    </div>
                                    <div className='col-lg-6'>
                                    {edit && (
                                        <div className='card card-product'>
                                            <Carousel showArrows={true} className='cls-heigth' >
                                            {edit.productColorImages.map(e=>{
                                                return (
                                                    <div>
                                                        <img src={e.url}/>
                                                        <button type="button" class="btn btn-rose btn-fill btn-delete" onClick={()=>handleDelete(e)} rel="tooltip" data-placement="bottom" title="Remove">
                                                            <i class="material-icons">close</i>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                            </Carousel>
                                        </div>
                                    )}
                                        
                                    </div>
                                </div>
                                <div className="row mb-3 justify-content-start">
                                    <div className='col-sm-6'>
                                        <select class="selectpicker" {...register("Name")} data-style="select-with-transition" multiple title="Choose Color" data-size="7">
                                            <option value={"Red"}> Red</option>
                                            <option value={"Black"}> Black</option>
                                            <option value={"Blue"}> Blue</option>
                                            <option value={"Pink"}> Pink</option>
                                        </select>
                                        <span className="text-danger">{errors.Name?.message}</span>
                                    </div>
                                </div>
                                <div class="form-group" style={{textAlign:'start'}}>
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