import React, { useContext, useEffect, useState } from 'react';

import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import { Helmet } from 'react-helmet';
import { end } from '@popperjs/core';

import UserContext from '../../context/userContext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { create } from '../../Service/collection.service';
import { get } from '../../Service/collection.service';

function ListCollection(props){
    const {state,dispatch}=useContext(UserContext)
    const {collection,setCollection} = useState([]);

    const schema = yup.object({
        Name:yup.string().required().min(4,'Tối thiểu 4 ký tự').max(100,'Quá số lượng'),
        Description:yup.string().nullable(),
    }).required('Vui lòng điền thông tin');

    const {register,setValue,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })

    const submit = async (data) => {
        // data.preventDefault();
        dispatch({type: "SHOW_LOADING"});
        const rs = await create(data);
        collection.push(rs)
        dispatch({type: "HIDE_LOADING"});
    }

    const list = async () => {
        dispatch({type: "SHOW_LOADING"});
        const collection = await get();
        setCollection(collection)
        dispatch({type: "HIDE_LOADING"});
    }
    useEffect(()=>{
       list();
    },[]);

    return(
        <div >
        <Helmet>
            <script src="../admin/assets/js/plugins/bootstrap-selectpicker.js" type="text/javascript"></script>
            <script src='../admin/assets/demo/formExtended.js' type="text/javascript"></script>
        </Helmet>
            <div className='ontainer-fluid'>
                <h1>List Collection</h1>
                <div className="col-md-12">
                <div className="card ">
                    <div className='' style={{paddingInline:25 +'px'}}>
                        <div className="card-header card-header-rose card-header-text">
                            <div className="card-text">
                                <h4 className="card-title">Form Create Collection</h4>
                            </div>
                        </div>
                        <div className="card-body ">
                            <form method="post"  onSubmit={handleSubmit(submit)} className="form-horizontal"  enctype="multipart/form-data">
                                <div className="row mb-5">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" {...register("Name")} placeholder='Name'/>
                                            <span className="text-danger">{errors.Name?.message}</span>
                                        </div>
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
                <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-primary card-header-icon">
                                    <div className="card-icon">
                                        <i className="material-icons">assignment</i>
                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="toolbar">
                                        {/*        Here you can write extra buttons/actions for the toolbar              */}
                                    </div>
                                    <div className="material-datatables">

                                        <table id="datatables"
                                               className="table table-striped table-no-bordered table-hover"
                                               cellSpacing={0} width="100%" style={{width: '100%'}}>
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Description</th>
                                            </tr>
                                            </thead>
                                            
                                            <tbody>
                                            {
                                                collection.map((e,i)=>{
                                                    return(
                                                        <tr key={i}>
                                                            <td>{e.name}</td>
                                                            <td>{e.description}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                                {/* end content*/}
                            </div>
                            {/*  end card  */}
                        </div>
            </div>
        </div>
    );

}

export default ListCollection;