import React, {useContext, useEffect, useState} from 'react';
import UserContext from "../../context/userContext";
import {create, get} from "../../Service/size.service.js";
import {Helmet} from "react-helmet";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

function Size(props) {
    {
        const {state, dispatch} = useContext(UserContext)
        const [listSize, setListSize] = useState([]);


        const schema = yup.object({
            name:yup.string().required().min(4).max(100,'quá số lượng'),
            sizeType:yup.string().required().min(0),

        }).required();

        const {register,handleSubmit,formState:{errors}}=useForm({
            resolver:yupResolver(schema),
        })
        const submit = async (data) => {
            // data.preventDefault();
            dispatch({type: "SHOW_LOADING"});

            const rs = await create(data);
            console.log(data)

            listSize.push(rs)

            dispatch({type: "HIDE_LOADING"});


        }
        const list = async () => {
            dispatch({type: "SHOW_LOADING"});
            const listSize = await get();
            setListSize(listSize);

            dispatch({type: "HIDE_LOADING"});


        }



        useEffect(() => {
            list()
        }, [])


        return (

            <div>
                <div className="content">
                    <Helmet>
                        <script src="../admin/assets/js/plugins/jquery.dataTables.min.js" type = "text/javascript" ></script>
                        <script src = "../admin/assets/demo/datatable.js" type = "text/javascript" />
                    </Helmet>
                    <div className="container-fluid">
                        <h1>Size</h1>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card ">
                                    <div className="card-header card-header-rose card-header-text">
                                        <div className="card-text">
                                            <h4 className="card-title">Create</h4>
                                        </div>
                                    </div>
                                    <div className="card-body ">
                                        <form method="post" onSubmit={handleSubmit(submit)} className="form-horizontal">
                                            <div className="row">
                                                <label className="col-sm-2 col-form-label">Name</label>
                                                <div className="col-sm-10">
                                                    <div className="form-group">
                                                        <input {...register('name')} type="text"
                                                               className="form-control"/>
                                                        <span className="bmd-help">{errors.name?.message}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="col-sm-2 col-form-label">Size Type</label>
                                                <div className="col-sm-10">
                                                    <div className="form-group">
                                                        <select {...register('sizeType')} type='number'
                                                                className="form-control">
                                                            <option value={1} >Shoes</option>
                                                            <option value={0} >Clothing</option>


                                                        </select>
                                                        <span className="bmd-help">{errors.sizeType?.message}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-10
                                   ">
                                                    <button type={'submit'}
                                                            className={'btn btn-primary '}>Submit
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
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
                                                    <th>Size Type</th>
                                                    <th className="disabled-sorting text-right">Actions</th>
                                                </tr>
                                                </thead>
                                                <tfoot>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Size Type</th>
                                                    <th className="text-right">Actions</th>
                                                </tr>
                                                </tfoot>
                                                <tbody>
                                                {
                                                    listSize.map((e, i) => {
                                                        return (

                                                            <tr key={i}>
                                                                <td>{e.name}</td>


                                                                <td>{e.sizeType?"Shoes":"Clothing"}</td>
                                                                <td className="text-right">
                                                                    <a href="#"
                                                                       className="btn btn-link btn-info btn-just-icon like"><i
                                                                        className="material-icons">favorite</i></a>
                                                                    <a href="#"
                                                                       className="btn btn-link btn-warning btn-just-icon edit"><i
                                                                        className="material-icons">dvr</i></a>
                                                                    <a href="#"
                                                                       className="btn btn-link btn-danger btn-just-icon remove"><i
                                                                        className="material-icons">close</i></a>
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
                            {/* end col-md-12 */}
                        </div>
                        {/* end row */}
                    </div>
                </div>

            </div>
        );
    }
}

export default Size;




