import React, { useContext, useEffect, useState } from 'react';

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Helmet } from 'react-helmet';
import { end } from '@popperjs/core';

import UserContext from '../../context/userContext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { get, getPnInfo, getPnProfile } from '../../Service/partner.service';
import { create, update } from '../../Service/partner.service';

import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PartnerProfile from './partner-info';
import { Ellipsis } from 'react-bootstrap/esm/PageItem';

function ListPartner(props) {
    const { state, dispatch } = useContext(UserContext);
    const [partner, setPartner] = useState([]);
    

    const [Description, setDescription] = useState();
    const [EditPn, setEditPn] = useState();

    const schema = yup.object({
        RepresentativeName: yup.string().required().min(4, 'At least 4 characters').max(100, 'Out of range'),
        Type: yup.string().required(),
        Status: yup.string().required(),
    }).required('Fill out missing information');

    const { register, setValue, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })


    const prepEdit = () => {
        if (EditPn != null) {
            setValue("RepresentativeName", EditPn.representativeName)
            setValue("Type", EditPn.type?"1":"0")
            setValue("Status", EditPn.status?"1":"0")
        } else {
            reset();
        }
    }



    const submit = async (data) => {
        // data.preventDefault();
        dispatch({ type: "SHOW_LOADING" });
        if(EditPn!=null){
            data['Id']=EditPn.id;
            data['Description'] = Description;
            data['Type'] = data['Type'] == "0" ? false : true
            data['Status'] = data['Status'] == "0" ? false : true
            const rs= await update(data)
            let listp= partner.map(e=>{
                
                return rs.id==e.id?rs:e;
            })
            setPartner(listp);
            setEditPn(null);
        }else{
        data['Description'] = Description;
        data['Type'] = data['Type'] == "0" ? false : true
        data['Status'] = data['Status'] == "0" ? false : true
        const rs = await create(data);
        partner.push(rs)
        }
        dispatch({ type: "HIDE_LOADING" });
    }

    const list = async () => {
        dispatch({ type: "SHOW_LOADING" });
        const getPn = await get();
        setPartner(getPn)
        dispatch({ type: "HIDE_LOADING" });
    }
    useEffect(() => {
        
        list();
    }, []);

    
    useEffect(() => {
        prepEdit();
    }, [EditPn]);



    return (
        <div >
            <Helmet>
                <script src="../admin/assets/js/plugins/bootstrap-selectpicker.js" type="text/javascript"></script>
                <script src='../admin/assets/demo/formExtended.js' type="text/javascript"></script>
            </Helmet>
            <div className='ontainer-fluid'>
                <h1>List Partner</h1>
                {/* CREATE */}
                <div className="col-md-12">
                    <div className="card ">
                        <div className='' style={{ paddingInline: 25 + 'px' }}>
                            <div className="card-header card-header-rose card-header-text">
                                <div className="card-text">
                                    <h4 className="card-title">Form Create Partner</h4>
                                </div>
                            </div>
                            <div className="card-body ">
                                <form method="post" onSubmit={handleSubmit(submit)} className="form-horizontal" enctype="multipart/form-data">
                                    <div className="row mb-5">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" {...register("RepresentativeName")} placeholder='Name' />
                                                <span className="text-danger">{errors.RepresentativeName?.message}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-sm-6">
                                            <select class="form-control"  {...register("Type")} title="Choose Type" >
                                                <option selected >Choose Type...</option>
                                                <option value='0'>Personal</option>
                                                <option value='1'>Company</option>
                                            </select>
                                            <span className='text-danger'>{errors.Type?.message}</span>
                                        </div>

                                        <div className="col-sm-6">
                                            <select class="form-control"  {...register("Status")} title="Choose Status" >
                                                <option selected >Choose Status...</option>
                                                <option value='0'>Cooperating</option>
                                                <option value='1'>Stop Cooperating</option>
                                            </select>
                                            <span className='text-danger'>{errors.Status?.message}</span>
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={(EditPn && EditPn.description) ?? ""}
                                            onReady={editor => {
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data)
                                            }}
                                        />
                                    </div>
                                    <div class="form-group" style={{ textAlign: end }}>
                                        <button type="submit" class="btn btn-github">
                                            <span>{EditPn != null?"Save":"Create"}</span>

                                            <i class="icon-long-arrow-right"></i>
                                        </button>
                                        {EditPn != null ? (
                                            <button class="btn btn-outline-danger" onClick={() => setEditPn(null)} >
                                                Cancel Edit
                                            </button>
                                        ) : ("")}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* LIST */}
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
                                    cellSpacing={0} width="100%" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Representative Name</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            partner.map((e, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{e.representativeName}</td>
                                                        <td>{!e.type ? "Personal" : "Company"}</td>
                                                        <td>{!e.status ? "Cooperating" : "Stop Cooperating"}</td>
                                                        <td>{e.description}</td>
                                                        <td>
                                                            <button class="btn btn-outline-danger" onClick={() => setEditPn(e)} >
                                                                Edit
                                                            </button>
                                                            <button class="btn btn-outline-danger" onClick={() => setEditPn(e)} >
                                                                Profile
                                                            </button>
                                                        </td>
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

            {/* MODAL
            <div class="modal fade" id="PartnerProfile" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lagre">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                <i class="material-icons">clear</i>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div className="col-md-12">
                    <div className="card ">
                        <div className='' style={{ paddingInline: 25 + 'px' }}>
                            <div className="card-header card-header-rose card-header-text">
                                <div className="card-text">
                                    <h4 className="card-title">Form Create Partner</h4>
                                </div>
                            </div>
                            <div className="card-body ">
                                <form method="post" onSubmit={handleSubmit(submit)} className="form-horizontal" enctype="multipart/form-data">
                                    <div className="row mb-5">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" {...register("RepresentativeName")} placeholder='Name' />
                                                <span className="text-danger">{errors.RepresentativeName?.message}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-sm-6">
                                            <select class="form-control"  {...register("Type")} title="Choose Type" >
                                                <option selected value='true'>Personal</option>
                                                <option value='false'>Company</option>
                                            </select>
                                            <span className='text-danger'>{errors.Type?.message}</span>
                                        </div>

                                        <div className="col-sm-6">
                                            <select class="form-control"  {...register("Status")} title="Choose Status" >
                                                <option selected value='true'>Cooperating</option>
                                                <option value='false'>Stop Cooperating</option>
                                            </select>
                                            <span className='text-danger'>{errors.Status?.message}</span>
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={(EditPn && EditPn.description) ?? ""}
                                            onReady={editor => {
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data)
                                            }}
                                        />
                                    </div>
                                    <div class="form-group" style={{ textAlign: end }}>
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
                    </div>
                </div>
            </div> */}
        </div>
    );

}

export default ListPartner;