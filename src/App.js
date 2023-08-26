import './App.css';
import React,{useReducer} from 'react';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import { UserProvider } from './context/userContext';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import AdminDashboard from "./Page/dashboard";
import AdminLogin from "./Page/auth/login";
import LayoutAdmin from "./Component/AdminLayout";
import ListProduct from "./Page/product/list-product";
import CreateProduct from "./Page/product/create-product";
import ListCategory from "./Page/category/list-category";
import Loading from "./Component/loading";
<<<<<<< HEAD
import NotFound from './Page/NotFound';
import CreateProductColor from './Page/product/create-product-color';
import ListProductColor from './Page/product/list-product-color';
import ListProductSize from './Page/product/list-product-size';
import DBTable from './Page/product/db-table';
import UserList from './Page/account/users';
import StaffList from './Page/account/staffs';
import { prepareRouter } from './route/route';
=======
import FormEXP from "./Page/form/FormEx";
import CategoryDetails from "./Page/category/category-details";
import KindOfSport from "./Page/kindOfSport/kind-of-sport";
import Size from "./Page/size/size";
import Profile from "./Page/auth/profile";
>>>>>>> hienndth


const router= createBrowserRouter([
  prepareRouter("/",<AdminDashboard/>),
  prepareRouter("/list-product",<ListProduct/>),
  prepareRouter("/create-product",<CreateProduct/>),
  prepareRouter("/list-product-color/:pId",<ListProductColor/>),
  prepareRouter("/create-product-color/:pId",<CreateProductColor/>),
  prepareRouter("/list-product-size/:pclId",<ListProductSize/>),
  prepareRouter("/user-list",<UserList/>),
  prepareRouter("/staff-list",<StaffList/>),
  prepareRouter("/db-table",<DBTable/>),
  prepareRouter("/list-category",<ListCategory/>),
  { path:"/login", element:<LayoutAdmin main={<AdminLogin/>} auth={true}/>},
  { path:"*",element:<LayoutAdmin main={<NotFound/>} auth={true}/>}
])
function App() {
  const [state,dispatch]=useReducer(reducer,STATE);
  return (
    <UserProvider value={{state,dispatch}}>
      <Loading display={state.loading}/>
<<<<<<< HEAD
      <RouterProvider router={router}/> 
=======

      <BrowserRouter>
        <Routes>
          <Route  path="/dashboard"  id='asd'  element={iAdmin(<AdminDashboard/>,false)}/>
          {/*<Route  path="/dashboard-" element={iAdmin(null,false)}/>*/}
          <Route  path="/profile" element={iAdmin(<Profile/>,false)}/>
          <Route  path="/list-product" element={iAdmin(<ListProduct/>,false)}/>
          <Route  path="/create-product"  element={iAdmin(<CreateProduct/>,false)}/>
          <Route  path="/list-category"  element={iAdmin(<ListCategory/>,false)}/>
          <Route  path="/list-category-details"  element={iAdmin(<CategoryDetails/>,false)}/>
          <Route  path="/kind-of-sport"  element={iAdmin(<KindOfSport/>,false)}/>
          <Route  path="/size"  element={iAdmin(<Size/>,false)}/>
          <Route  path="/" exact  element={iAdmin(<AdminLogin/>,true)}/>
          <Route  path="/form-ex"  element={iAdmin(<FormEXP/>,true)}/>
          <Route  path='*' element={<div>Page Not FOUND - south</div>}/>
        </Routes>
      </BrowserRouter>
>>>>>>> hienndth
    </UserProvider>
  );
}
export default App;
