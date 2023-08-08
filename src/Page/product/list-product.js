import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Helmet, HelmetProvider} from 'react-helmet';
import {get} from "../../Service/products.service.js";
import UserContext from "../../context/userContext";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


function ListProduct(props) {
    const {state, dispatch} = useContext(UserContext)

    const [products,setProducts]=useState([]);



    const list = async () => {
        dispatch({type: "SHOW_LOADING"});
        const products = await get();
        setProducts(products);
        console.log(products)

        dispatch({type: "HIDE_LOADING"});
    }
    useEffect(() => {
        list()
    }, [])


    return (


        <div className="content">
            <Helmet>
                <script src="../admin/assets/js/plugins/jquery.dataTables.min.js" type = "text/javascript" ></script>
                <script src = "../admin/assets/demo/datatable.js" type = "text/javascript" />
            </Helmet>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary card-header-icon">
                                <div className="card-icon">
                                    <i className="material-icons">assignment</i>
                                </div>
                                <button className="btn btn-outline-primary"><Link to={'/create-product'}>Add
                                    product</Link></button>
                            </div>
                            <div className="card-body">
                                <div className="toolbar">
                                    {/*        Here you can write extra buttons/actions for the toolbar              */}
                                </div>
                                <div className="material-datatables">
                                    <table id="datatables" className="table table-striped table-no-bordered table-hover"
                                           cellSpacing={0} width="100%" style={{width: '100%'}}>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Category</th>
                                            <th>Color</th>
                                            <th>Img</th>
                                            <th>Status</th>
                                            <th className="disabled-sorting text-right">Actions</th>
                                        </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Category</th>
                                            <th>Color</th>
                                            <th>Img</th>
                                            <th>Status</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                        </tfoot>
                                        <tbody>
                                        {
                                            products.map((e, i) => {
                                                return (

                                                    <tr key={i}>
                                                        <td>{e.name}</td>
                                                        <td>{e.price}</td>
                                                        <td>{e.description}</td>
                                                        <td>{e.categoryId}</td>
                                                        <td>{e.colorName}</td>
                                                        <td>{e.Gender}</td>
                                                        <td>{e.Img}</td>
                                                        <td>{e.OpenSale}</td>
                                                        <td>{e.Status}</td>
                                                        <td>{e.category_detail_id}</td>
                                                        <td>{e.kindofsport_id}</td>
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


    );
}

export default ListProduct;