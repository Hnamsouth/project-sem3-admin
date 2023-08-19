import React, { useState,useEffect,useContext } from 'react';
import {Link} from "react-router-dom";
import {Helmet, HelmetProvider} from 'react-helmet';
import CreateProduct from './create-product';
import { get } from '../../Service/products.service';
import UserContext from '../../context/userContext';



function ListProduct(props) {
    const {state,dispatch}=useContext(UserContext)

    const getProduct = async ()=>{
        dispatch({type:"SHOW_LOADING"})
        let rs = await get();
        dispatch({type:"UPDATE_PRODUCT",payload:rs})
    }
    useEffect(()=>{
        getProduct();
        dispatch({type:"HIDE_LOADING"})
    },[])

    return (
        <div className="content">
            <Helmet>
                <script src="../admin/assets/js/plugins/jquery.dataTables.min.js" type = "text/javascript" ></script>
                <script src = "../admin/assets/demo/datatable.js" type = "text/javascript" />
            </Helmet>

            {/* <AdvancedImage  cldImg={myImage} /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary card-header-icon">
                                <div className="card-icon">
                                    <i className="material-icons">assignment</i>
                                </div>
                                <button class="btn btn-outline-primary" data-toggle="modal" data-target="#myModal" onClick={()=>dispatch({type:"EDIT_PRODUCT",payload:null})} >
                                    Create Product
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="toolbar">
                                    {/*        Here you can write extra buttons/actions for the toolbar              */}
                                </div>
                                <div className="material-datatables">
                                    <table id="datatables" className="table table-striped table-no-bordered table-hover nowrap" cellSpacing={0} width="100%" style={{width: '100%'}}>
                                        <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Des</th>
                                            <th>C-CD</th>
                                            <th>Color</th>
                                            <th>KSP</th>
                                            <th>Status</th>
                                            <th>Gender</th>
                                            <th>Open</th>
                                            <th className="disabled-sorting">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {state.products.length > 0 && state.products.map(e=>{
                                                    return (
                                                        <tr>
                                                            <td>{e.id}</td>
                                                            <td>{e.name}</td>
                                                            <td>{e.price.toFixed(2) + " $"}</td>
                                                            <td>{e.description}</td>
                                                            <td>{e.categoryDetail.category.name + ("/ "+e.categoryDetail.name)}</td>
                                                            <td>{e.productColors.length}</td>
                                                            <td>{e.kindofsport.name}</td>
                                                            <td>{e.status===1?"Stop":e.status===0?"Open":"Coming Soon"}</td>
                                                            <td>{e.gender?"Female":"Male"}</td>
                                                            <td>{new Date(e.openSale).toLocaleString()}</td>
                                                            <td class="">
                                                                <Link to={"/list-product-color/"+e.id} className='btn btn-outline-info'>
                                                                    Add Color
                                                                </Link>
                                                                <button class="btn btn-outline-danger" onClick={()=>dispatch({type:"EDIT_PRODUCT",payload:e})} data-toggle="modal" data-target="#myModal">
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
                    {/* end col-md-12 */}
                </div>
                {/* end row */}
            </div>
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lagre">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Create Product</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        <i class="material-icons">clear</i>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <CreateProduct/>
                                </div>
                            </div>
                        </div>
                </div>
        </div>


    );
}

export default ListProduct;