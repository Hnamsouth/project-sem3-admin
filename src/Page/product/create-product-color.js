import React, { useState,useEffect, useContext } from 'react';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

import { Helmet } from 'react-helmet';
import './uploadfile.css'
import UserContext from '../../context/userContext';

import { Uploader } from "uploader";
import { UploadDropzone,UploadButton  } from "react-uploader";
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
const uploaderOptions2 = {
    multi: false,
    styles: {
      colors: {
        primary: "#377dff"
      }
    }
  }


function CreateProductColor() {
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
        n.map(e=>{return (Name+= Name===""?e.value:"/ "+e.value)})
        return Name;
    }

    const schema = yup.object({
        Name:yup.array().required(),
    }).required();

    const {register,setValue,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })

    const onClickImg =(e)=>{
        console.log(e)
    }
    const handleDelete = async (e)=>{
        if(window.confirm("Delete the item?")){
            // console.log(e)
            dispatch({type:"SHOW_LOADING"})
            const rs = await deletePImg(e);
            if(rs.status){
                state.EditProduct.productColorImages.forEach((vl2,index)=>{
                    if(vl2.id==e.id){
                        state.EditProduct.productColorImages.splice(index,1);
                    }
                })
            }else{
                alert(rs.msg);
            }
            dispatch({type:"HIDE_LOADING"})
        }

    }

    useEffect(()=>{
        console.log(state.EditProduct)
    },[state.EditProduct])



    const Submit =async (data)=>{
        console.log(data)
        dispatch({type:"SHOW_LOADING"});
        if(state.EditProduct==null){
            const rs = await create_pColor({name:handleName(data.Name),productId:pId,img:FileUrl});
            console.log(rs)
        }else{
            const rs= await updatePcl({name:handleName(data.Name),productId:pId,img:FileUrl})
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
                                    {state.EditProduct && (
                                        <div className='card card-product'>
                                            <Carousel showArrows={true} onClickItem={c=>onClickImg(c)} className='cls-heigth' >
                                            {state.EditProduct.productColorImages.map(e=>{
                                                return (
                                                    <div>
                                                        <img src={e.url}/>
                                                        <button type="button" class="btn btn-rose btn-fill btn-delete" onClick={()=>handleDelete(e)} rel="tooltip" data-placement="bottom" title="Remove">
                                                            <i class="material-icons">close</i>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                                <div>
                                                    <img src="http://react-responsive-carousel.js.org/assets/1.jpeg" />
                                                </div>
                                                <div>
                                                    <img src="http://react-responsive-carousel.js.org/assets/2.jpeg" />
                                                </div>
                                                <div>
                                                    <img src="http://react-responsive-carousel.js.org/assets/2.jpeg" />
                                                </div>
                                            </Carousel>
                                        </div>
                                    )}
                                        
                                    </div>
                                </div>
                                <div className="row mb-3 justify-content-start">
                                    <div className='col-sm-6'>
                                        <select class="selectpicker" {...register("Name")} data-style="select-with-transition" multiple title="Choose Color" data-size="7">
                                            <option value="red"> Paris</option>
                                            <option value="black"> Paris2</option>
                                            <option value="blue"> Paris3</option>
                                            <option value="pink"> Paris4</option>
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