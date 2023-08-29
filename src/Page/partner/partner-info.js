import React, { useContext, useEffect, useState } from 'react';

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Helmet } from 'react-helmet';
import { end } from '@popperjs/core';

import UserContext from '../../context/userContext';

import './uploadfile.css'

import { Uploader } from "uploader";
import { UploadDropzone, UploadButton } from "react-uploader";

import { createPnInfo, getPnInfo, get, update } from '../../Service/partner.service';



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


function PartnerProfile(props) {
    const { state, dispatch } = useContext(UserContext);
    const [PnInfo, setPnInfo] = useState([]);
    const [fileUrl, setFileUrl] = useState();
    const [EditPnIf, setEditPnIf] = useState();

    const schema = yup.object({
        Phone: yup.number().typeError("Must be the number").required().min(9, 'At least 10 characters'),
        CompanyName: yup.string().nullable(),
        Address: yup.string().nullable(),
        PartnersId: yup.number().typeError("Invalid").required().min(0),
    }).required('Fill out missing information');

    const { register, setValue, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const prepEdit = () => {
        if (EditPnIf != null) {

            setValue("Phone", EditPnIf.phone)
            setValue("CompanyName", EditPnIf.companyName)
            setValue("Address", EditPnIf.address)
            setValue("PartnersId", EditPnIf.partnersId)

        } else {
            reset();
        }
    }
    useEffect(() => {
        prepEdit();
    }, [EditPnIf])


    const [Partner, setPartner] = useState([])
    const getPnId = async () => {
        let rs = await get();
        setPartner(rs);
    }
    useEffect(() => {
        getPnId();
    }, [])

    const submit = async (data) => {
        // data.preventDefault();
        dispatch({ type: "SHOW_LOADING" });
        if (EditPnIf != null) {
            data['Id'] = EditPnIf.id;
            data['img'] = fileUrl
            const rs = await update(data)
            let listp = PnInfo.map(e => {
                return rs.id == e.id ? rs : e;
            })
            setPnInfo(listp);
            setEditPnIf(null);
        } else {
            data['img'] = fileUrl
            const rs = await createPnInfo(data);
            PnInfo.push(rs)
            console.log(rs)
        }
        dispatch({ type: "HIDE_LOADING" });
    }

    // useEffect(() => {
    //     console.log(PnInfo)
    // }, [PnInfo])

    const list = async () => {
        dispatch({ type: "SHOW_LOADING" });
        const getPn = await getPnInfo();
        setPnInfo(getPn)
        dispatch({ type: "HIDE_LOADING" });
    }
    useEffect(() => {
        list();
    }, []);



    return (
        <div >
            <Helmet>
                <script src="../admin/assets/js/plugins/bootstrap-selectpicker.js" type="text/javascript"></script>
                <script src='../admin/assets/demo/formExtended.js' type="text/javascript"></script>
            </Helmet>
            <div className='ontainer-fluid'>
                <h1>Partners Profiles</h1>
                <div className="col-md-12">
                    <div className="card ">
                        <div className='' style={{ paddingInline: 25 + 'px' }}>
                            <div className="card-header card-header-rose card-header-text">
                                <div className="card-text">
                                    <h4 className="card-title">Form Create Partner Profile</h4>
                                </div>
                            </div>
                            <div className="card-body ">
                                <form method="post" onSubmit={handleSubmit(submit)} className="form-horizontal" enctype="multipart/form-data">
                                    <div className="row mb-5">

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" {...register("Phone")} placeholder='Phone Number' />
                                                <span className="text-danger">{errors.Phone?.message}</span>
                                            </div>
                                        </div>


                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" {...register("CompanyName")} placeholder='Company Name' />
                                                <span className="text-danger">{errors.CompanyName?.message}</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row mb-5">

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" {...register("Address")} placeholder='Address' />
                                                <span className="text-danger">{errors.Address?.message}</span>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <select class="form-control"  {...register("PartnersId")} title="PartnerId" >
                                                <option selected value=''>Partner</option>
                                                {
                                                    Partner.map(e => {
                                                        return (
                                                            <option value={e.id}>{e.representativeName}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                            <span className='text-danger'>{errors.PartnersId?.message}</span>
                                        </div>

                                    </div>

                                    <div className='row mb-5'>
                                        <div className='col-lg-6'>
                                            <UploadDropzone uploader={uploader}
                                                options={uploaderOptions}
                                                onUpdate={files => setFileUrl(files[0].fileUrl)}

                                                width="600px"
                                                height="375px"
                                                className='mx-auto'
                                            />
                                        </div>
                                    </div>

                                    
                                    <div class="form-group" style={{ textAlign: end }}>
                                        <button type="submit" class="btn btn-github">
                                            <span>{EditPnIf != null ? "Save" : "Create"}</span>

                                            <i class="icon-long-arrow-right"></i>
                                        </button>
                                        {EditPnIf != null ? (
                                            <button class="btn btn-outline-danger" onClick={() => setEditPnIf(null)} >
                                                Cancel Edit
                                            </button>
                                        ) : ("")}
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
                                    cellSpacing={0} width="100%" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Phone</th>
                                            <th>Company Name</th>
                                            <th>Address</th>
                                            <th>Partner</th>
                                            <th>Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            PnInfo.map((e, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{e.phone}</td>
                                                        <td>{e.companyName}</td>
                                                        <td>{e.address}</td>
                                                        <td>{e.partners.representativeName}</td>
                                                        <td><img width={50} height={50} src={e.img} /></td>
                                                        <td>
                                                            <button class="btn btn-outline-danger" onClick={() => setEditPnIf(e)} >
                                                                Edit
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
        </div>
    );

}

export default PartnerProfile;