
import React,{useEffect,useState,useContext} from "react";
import {login} from "../../Service/auth.service";
import UserContext from "../../context/userContext";
import api from "../../Service/api";
import { Link } from "react-router-dom";
const AdminLogin =()=>{
    const {state,dispatch}=useContext(UserContext)
    const [user,setUser]=useState({Username:"",Password:""});

    const handleInput=(event)=>{
        user[event.target.name]=event.target.value;
        setUser(user);
    }
    
    const submit = async (event)=>{
        event.preventDefault();
        const rs= await login(user);
        state.token=user.token;
        // nếu bạn thiết lập tiêu đề "common" một lần, tiêu đề đó sẽ tự động được gửi cùng với mọi yêu cầu bạn thực hiện bằng Axios sau đó.
        api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    }


    return (
        <form class="form" method="post" onSubmit={submit}>
            <button class="btn btn-rose btn-link btn-lg"><Link id="asd">go home</Link></button>
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
                    <input type="text" name="Username" onChange={handleInput} class="form-control" placeholder="Username..."/>
                </div>
                </span>
                <span class="bmd-form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="material-icons">lock_outline</i>
                    </span>
                    </div>
                    <input type="password" name="Password" onChange={handleInput} class="form-control" placeholder="Password..."/>
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