import React, { useState,useEffect,useContext } from 'react';
import {Link} from "react-router-dom";
import {Helmet, HelmetProvider} from 'react-helmet';
import { getPrdSize } from '../../Service/products.service';
import UserContext from '../../context/userContext';

import { useParams } from 'react-router-dom';
import CreateProductSize from './create-product-size';

function ListProductSize(props) {
    const {state,dispatch}=useContext(UserContext)
    const [prdSize,setprdSize] = useState([]);
    const {pclId} = useParams();

    const [edit,setEdit]=useState();

    const getProductColor = async ()=>{
        dispatch({type:"SHOW_LOADING"})
        let rs = await getPrdSize(pclId);
        setprdSize(rs);
    }
    useEffect(()=>{
        getProductColor();
        dispatch({type:"HIDE_LOADING"})
    },[])

    useEffect(()=>{

    },[prdSize])

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
                                <button class="btn btn-outline-primary" data-toggle="modal" data-target="#myModal" onClick={()=>setEdit()}>
                                    Create Product Size
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
                                            <th>Size</th>
                                            <th>Qty</th>
                                            <th className="disabled-sorting">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {prdSize.length > 0 && prdSize.map(e=>{
                                                    return (
                                                        <tr>
                                                            <td>{e.id}</td>
                                                            <td>{e.size.name}</td>
                                                            <td>{e.qty}</td>
                                                            <td class="">
                                                                <Link to={"/create-product-color/"+e.id} className='btn btn-info'>
                                                                    Add Size
                                                                </Link>
                                                                <button class="btn btn-outline-danger" onClick={()=>setEdit(e)} data-toggle="modal" data-target="#myModal">
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
                                    <CreateProductSize prdSize={prdSize} setprdSize={setprdSize} edit={edit}/>
                                </div>
                            </div>
                        </div>
                </div>
        </div>


    );
}

export default ListProductSize;