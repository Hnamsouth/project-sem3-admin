import React, { useState,useEffect,useContext } from 'react';
import {Link} from "react-router-dom";
import {Helmet} from 'react-helmet';
import { getPrdColor } from '../../Service/products.service';
import UserContext from '../../context/userContext';

import { useParams } from 'react-router-dom';
import CreateProductColor from './create-product-color';

function ListProductColor() {
    const {state,dispatch}=useContext(UserContext)
    const [prdColor,setprdColor] = useState([]);
    const {pId} = useParams();

    const getProductColor = async ()=>{
        let rs = await getPrdColor(pId);
        console.log(rs)
        setprdColor(rs);
        dispatch({type:"HIDE_LOADING"})
    }
    useEffect(()=>{
        dispatch({type:"SHOW_LOADING"})
        getProductColor();
    },[])

    useEffect(()=>{
        console.log(prdColor)
    },[prdColor])

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
                                <button class="btn btn-outline-primary" data-toggle="modal" data-target="#myModal" onClick={()=>dispatch({type:"EDIT_PRODUCT",payload:null})}>
                                    Create Product Color
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
                                            <th>Img</th>
                                            <th>Name</th>
                                            <th>Product</th>
                                            <th>Size</th>
                                            <th>Qty</th>
                                            <th className="disabled-sorting">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {prdColor.length > 0 && prdColor.map(e=>{
                                                let qty = 0;
                                                e.productSizes.forEach(a=>{
                                                    qty+=a.qty       
                                                            }) ;
                                                    return (
                                                        <tr>
                                                            <td>{e.id}</td>
                                                            <td className='d-flex'>
                                                            {e.productColorImages.length>0 && e.productColorImages.map((c,index)=>{
                                                                if(index<3){
                                                                    return (
                                                                        <img src={c.url} width={50} height={50} style={{objectFit:'contain',marginRight:5+'px'}}/>
                                                                    );
                                                                }
                                                                else if(index==3){
                                                                    return (
                                                                        <div className='product-img' >
                                                                            <img  width={50} height={50} color='red' style={{backgroundColor:'darkgray'}}/>
                                                                            <div class="centered">
                                                                                <span style={{color:'black',fontSize:15+'px',fontWeight:400}}><strong>+ {e.productColorImages.length-3}</strong></span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return e;
                                                                }
                                                            })}
                                                            </td>
                                                            <td>{e.name}</td>
                                                            <td>{e.productId}</td>
                                                            <td>{!e.productSizes.length>0 ?0 : e.productSizes.map((v,index)=>{
                                                                return (index!=0? (" / "+v.size.name):v.size.name)
                                                            })}</td>
                                                            <td>{qty}</td>
                                                            <td class="">
                                                                <Link to={"/list-product-size/"+e.id} className='btn btn-outline-info'>
                                                                    Add Size
                                                                </Link>

                                                                <button class="btn btn-outline-danger" data-toggle="modal" data-target="#myModal"  onClick={()=>dispatch({type:"EDIT_PRODUCT",payload:e})}>
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
                                    <CreateProductColor edit={setprdColor}/>
                                </div>
                            </div>
                        </div>
                </div>
        </div>


    );
}

export default ListProductColor;