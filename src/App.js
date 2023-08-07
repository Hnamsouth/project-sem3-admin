import './App.css';
import React,{useReducer} from 'react';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import { UserProvider } from './context/userContext';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import AdminDashboard from "./Page/dashboard";
import AdminLogin from "./Page/auth/login";
import LayoutAdmin from "./Component/AdminLayout";
import ListProduct from "./Page/product/list-product";
import CreateProduct from "./Page/product/create-product";
import ListCategory from "./Page/category/list-category";
import Loading from "./Component/loading";
import FormEXP from "./Page/form/FormEx";
import CategoryDetails from "./Page/category/category-details";


function App() {
  const [state,dispatch]=useReducer(reducer,STATE);
  return (
    <UserProvider value={{state,dispatch}}>
      <Loading display={state.loading}/>

      <BrowserRouter>
        <Routes>
          <Route  path="/dashboard"  id='asd'  element={iAdmin(<AdminDashboard/>,false)}/>
          {/*<Route  path="/dashboard-" element={iAdmin(null,false)}/>*/}
          <Route  path="/list-product" element={iAdmin(<ListProduct/>,false)}/>
          <Route  path="/create-product"  element={iAdmin(<CreateProduct/>,false)}/>
          <Route  path="/list-category"  element={iAdmin(<ListCategory/>,false)}/>
          <Route  path="/list-category-details"  element={iAdmin(<CategoryDetails/>,false)}/>
          <Route  path="/" exact  element={iAdmin(<AdminLogin/>,true)}/>
          <Route  path="/form-ex"  element={iAdmin(<FormEXP/>,true)}/>
          <Route  path='*' element={<div>Page Not FOUND - south</div>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

function iAdmin(page,auth){
  return (
    <LayoutAdmin main={page} auth={auth}/>
  );
}

export default App;
