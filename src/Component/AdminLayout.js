
import Sidebar from "./sidebar";
import React,{useEffect} from "react";
import Plugin from "./plugin";
import Main from "./main";
import Footer from "./footer";
import AdminNav from "./nav";
import NavLoginAdmin from "./auth/NavLogin";
import FooterLoginAdmin from "./auth/FooterLogin";
const style ={
    backgroundImage:"url('../../admin/assets/img/login.jpg')",
    backgroundSize:"cover",
    backgroundPosition:"top center"

}
const LayoutAdmin=(props)=>{
    

    return ( 
        <div>
        {!props.auth? (
                <div class="wrapper ">
                    <Sidebar/>
                    <div class="main-panel">
                        <AdminNav/>
                        <div class="content">
                            {props.main}
                        </div>
                        <Footer/>
                    </div>
                </div>
        ):(
            <div  class="off-canvas-sidebar">
                <NavLoginAdmin/>
                <div class="wrapper wrapper-full-page">
                    <div class="page-header login-page header-filter" filter-color="black" style={style}>
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
                                {props.main}
                                </div>
                            </div>
                        </div>
                        <FooterLoginAdmin/>
                    </div>
                </div>
            </div>
        )}
        </div>

    );
}
export default LayoutAdmin;