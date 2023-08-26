
import React,{useEffect,useState,useContext} from "react";
import {login} from "../../Service/auth.service";
import UserContext from "../../context/userContext";
import api from "../../Service/api";
import { Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
const AdminLogin =()=>{
    const {state,dispatch}=useContext(UserContext)
    let navigate = useNavigate();

    const schema = yup.object({
        Email:yup.string().required().email("Invalid"),
        Password:yup.string().required()
    }).required();

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

    const submit = async (data)=>{
        // dispatch({type:"SHOW_LOADING"});
        // dispatch({type:"HIDE_LOADING"});

        const rs= await login(data);
        console.log(rs)
        if(!rs.token) return alert("Tài khoản hoặc mật khẩu không đúng");
        state.token=rs.token;
<<<<<<< HEAD
        localStorage.setItem("token",rs.token)
        api.defaults.headers.common["Authorization"] = `Bearer ${rs.token}`;
        navigate("/")
=======
        // nếu bạn thiết lập tiêu đề "common" một lần, tiêu đề đó sẽ tự động được gửi cùng với mọi yêu cầu bạn thực hiện bằng Axios sau đó.
        api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
        navigate("/dashboard")
>>>>>>> hienndth
    }


    return (
<<<<<<< HEAD
        <form class="form" method="post" onSubmit={handleSubmit(submit)}>
        <Helmet>
        </Helmet>
=======
        <form class="form" method="post" onSubmit={submit}>
>>>>>>> hienndth
            <div class="card card-login card-hidden">
            <div class="card-header card-header-rose text-center">
                <h4 class="card-title">Login</h4>
                <div class="social-line">
                <a href="#pablo" class="btn btn-just-icon btn-link btn-white">
                    <i class="fa fa-facebook-square"></i>
                </a>
                <a href="#pablo" class="btn btn-just-icon btn-link btn-white">
                    <i class="fa fa-twitter"></i>
                </a>
                <a href="#pablo" class="btn btn-just-icon btn-link btn-white">
                    <i class="fa fa-google-plus"></i>
                </a>
                </div>
            </div>
            <div class="card-body ">
                <p class="card-description text-center">Or Be Classical</p>
                <span class="bmd-form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="material-icons">email</i>
                    </span>
                    </div>
                    <input type="text" {...register("Email")} class="form-control" placeholder="Email..."/>
                    <span className='text-danger'>{errors.Email?.message}</span>
                </div>
                </span>
                <span class="bmd-form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="material-icons">lock_outline</i>
                    </span>
                    </div>
                    <input type="password" {...register("Password")} class="form-control" placeholder="Password..."/>
                    <span className='text-danger'>{errors.Password?.message}</span>
                </div>
                </span>
            </div>
            <div class="card-footer justify-content-center">
                <button type="submit" class="btn btn-rose btn-link btn-lg">Lets Go</button>
            </div>
            </div>
    </form>


    );
}
export default AdminLogin;