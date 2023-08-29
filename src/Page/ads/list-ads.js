import React, { useState, useEffect, useContext } from 'react';

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Helmet } from 'react-helmet';
import { end } from '@popperjs/core';

import { getPn, getCll, get } from '../../Service/adCampaign.service';
import { create,update } from '../../Service/adCampaign.service';
import './uploadfile.css'

import { Uploader } from "uploader";
import { UploadDropzone, UploadButton } from "react-uploader";

import UserContext from '../../context/userContext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

function ListAds(props) {
    const { state, dispatch } = useContext(UserContext)
    const [ads, setAds] = useState([]);
    const [Description, setDescription] = useState();
    const [EditAd, setEditAd] = useState();
    const [fileUrl, setFileUrl] = useState();

    const [Partner, setPartner] = useState([])
    const [Collection, setCollection] = useState([])

    const GetData = async () => {
        let pn = await getPn();
        setPartner(pn)
        let cll = await getCll();
        setCollection(cll)
    }
    useEffect(() => {
        GetData();
    }, [])

    const schema = yup.object({
        Name: yup.string().required().min(4, 'Tối thiểu 4 ký tự').max(100, 'Quá số lượng'),
        OpenDate: yup.string().required(),
        EndDate: yup.string().required(),
        PartnersId: yup.number().nullable(),
        CollectionId: yup.number().nullable()
    }).required('Vui lòng điền thông tin');

    const { register, setValue, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })


    const prepEdit = () => {
        if (EditAd != null) {
            setValue("Name", EditAd.name)
            setValue("OpenDate", EditAd.openDate)
            setValue("EndDate", EditAd.endDate)
            setValue("PartnersId", EditAd.partnersId)
            setValue("CollectionId", EditAd.collectionId)
        } else {
            reset();
        }
    }
    useEffect(() => {
        prepEdit();
    }, [EditAd]);

    const submit = async (data) => {
        // data.preventDefault();
        dispatch({ type: "SHOW_LOADING" });
        if (EditAd != null) {
            data['Id'] = EditAd.id;
            data['img'] = fileUrl;
            data['Desciption'] = Description;
            const rs = await update(data)
            let listp = ads.map(e => {
                return rs.id == e.id ? rs : e;
            })
            setAds(listp);
            setEditAd(null);
        } else {
            data['Desciption'] = Description;
            data['img'] = fileUrl;
            const rs = await create(data);
            ads.push(rs);
        }
        dispatch({ type: "HIDE_LOADING" });
    }

    const list = async () => {
        dispatch({ type: "SHOW_LOADING" });
        const getAds = await get();
        setAds(getAds)
        dispatch({ type: "HIDE_LOADING" });
    }
    useEffect(() => {
        list();
    }, []);
    console.log(ads)
    return (
        <div >
            <Helmet>
                <script src="../admin/assets/js/plugins/bootstrap-selectpicker.js" type="text/javascript"></script>
                <script src='../admin/assets/demo/formExtended.js' type="text/javascript"></script>
            </Helmet>
            <div className='ontainer-fluid'>
                <h1>List Advertisement</h1>
                <div className="col-md-12">
                    <div className="card ">
                        <div className='' style={{ paddingInline: 25 + 'px' }}>
                            <div className="card-header card-header-rose card-header-text">
                                <div className="card-text">
                                    <h4 className="card-title">Form Create Advertisement</h4>
                                </div>
                            </div>
                            <div className="card-body ">
                                <form method="post" onSubmit={handleSubmit(submit)} className="form-horizontal" enctype="multipart/form-data">
                                    <div className="row mb-3">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" {...register("Name")} placeholder='Name' />
                                                <span className="text-danger">{errors.Name?.message}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col-sm-6'>
                                            <div class="form-group">

                                                <input type="text" {...register("OpenDate")} class="form-control datetimepicker" placeholder='Choose Start Date' />
                                                <span className='text-danger'>{errors.OpenDate?.message}</span>
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div class="form-group">

                                                <input type="text" {...register("EndDate")} class="form-control datetimepicker" placeholder='Choose End Date' />
                                                <span className='text-danger'>{errors.EndDate?.message}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row  mb-5">
                                        <div className='col-sm-6'>
                                            <select class="form-control"  {...register("PartnersId")} title="Choose PartnerId" >
                                                <option selected value='0'>Partner</option>
                                                {Partner.length > 0 && Partner.map(e => {
                                                    return (<option value={e.id}>{e.representativeName}</option>)
                                                })}
                                            </select>
                                            <span className='text-danger'>{errors.PartnersId?.message}</span>
                                        </div>
                                        <div className='col-sm-6'>
                                            <select class='form-control'  {...register("CollectionId")}   >
                                                <option selected value='0'>Collection</option>
                                                {Collection.length > 0 && Collection.map(e => {
                                                    return (<option value={e.id}>{e.name}</option>)
                                                })}
                                            </select>
                                            <span className='text-danger'>{errors.CategoryId?.message}</span>
                                        </div>

                                    </div>

                                    <div className='mb-3'>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={(EditAd && EditAd.description) ?? ""}
                                            onReady={editor => {
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data)
                                            }}
                                        />
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
                                            <span>{EditAd != null ? "Save" : "Create"}</span>

                                            <i class="icon-long-arrow-right"></i>
                                        </button>
                                        {EditAd != null ? (
                                            <button class="btn btn-outline-danger" onClick={() => setEditAd(null)} >
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
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Partner</th>
                                            <th>Collection</th>
                                            <th>Image</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            ads.length > 0 && ads.map(e => {
                                                return (
                                                    <tr>
                                                        <td>{e.name}</td>
                                                        <td>{e.desciption}</td>
                                                        <td>{e.openDate}</td>
                                                        <td>{e.endDate}</td>
                                                        <td>{e.partners.representativeName}</td>
                                                        <td>{e.collection.name}</td>
                                                        <td><img src={e.img} width={50} height={50}/></td>
                                                        <td>
                                                            <button class="btn btn-outline-danger" onClick={() => setEditAd(e)} >
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

export default ListAds;