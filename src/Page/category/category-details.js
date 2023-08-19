import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import UserContext from "../../context/userContext";

import {createCategoryDetails, getCategoryDetails} from "../../Service/categoryDetails.service.js";
import {get} from "../../Service/categories.service.js"
import {Helmet} from "react-helmet";
import Select from "react-select";
import {forEach} from "react-bootstrap/ElementChildren";
import {selectOptions} from "@testing-library/user-event/dist/select-options";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

function CategoryDetails(props) {

    const {state, dispatch} = useContext(UserContext)
    const [categoryDetailsList, setCategoryDetailList] = useState([]);
    const [categories, setCategories] = useState([]);

    const schema = yup.object({
        Name:yup.string().required().min(4).max(100,'quá số lượng'),
        CategoryId:yup.number().required().min(0),

    }).required();

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })

    const submit = async (data) => {
        // data.preventDefault();
        dispatch({type: "SHOW_LOADING"});
        const rs = await createCategoryDetails(data);
        categoryDetailsList.push(rs)
        dispatch({type: "HIDE_LOADING"});



    }
    const listCategoryDetails = async () => {
        dispatch({type: "SHOW_LOADING"});
        const categoryDetailsList = await getCategoryDetails();
        setCategoryDetailList(categoryDetailsList)
        dispatch({type: "HIDE_LOADING"});


    }

    const list = async () => {
        dispatch({type: "SHOW_LOADING"});
        const categories = await get();
        setCategories(categories);

        dispatch({type: "HIDE_LOADING"});


    }







    useEffect(() => {
        listCategoryDetails();
        list()
    }, [])
    return (
        <div>

            <div className="content">
                <Helmet>
                    <script src="../admin/assets/js/plugins/jquery.dataTables.min.js" type="text/javascript"></script>
                    <script src="../admin/assets/demo/datatable.js" type="text/javascript"/>
                </Helmet>
                <div className="container-fluid">
                    <h1>List Category Details</h1>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card ">
                                <div className="card-header card-header-rose card-header-text">
                                    <div className="card-text">
                                        <h4 className="card-title">Create Category Details</h4>
                                    </div>
                                </div>
                                <div className="card-body ">
                                    <form method="post" onSubmit={handleSubmit(submit)} className="form-horizontal">
                                        <div className="row">
                                            <label className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <div className="form-group">
                                                    <input {...register('Name')} type="text"
                                                           className="form-control" />
                                                    <span className="bmd-help">{errors.Name?.message}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-sm-2 col-form-label">Category</label>

                                            <div className="col-sm-10">
                                                <div className="form-group">
                                                    <select {...register('CategoryId')} className={'form-select form-control'} >
                                                        {
                                                            categories.map((option) => (
                                                                <option value={option.id} >{option.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-sm-10">
                                                <button  type={'submit'}
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
                                                <th>Category</th>
                                                <th className="disabled-sorting text-right">Actions</th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th className="text-right">Actions</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            {
                                                categoryDetailsList.map((e, i) => {
                                                    return (

                                                        <tr key={i}>
                                                            <td>{e.name}</td>
                                                            <td>{e.category.name}</td>
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

export default CategoryDetails;


