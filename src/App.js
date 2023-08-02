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


function App() {
  const [state,dispatch]=useReducer(reducer,STATE);
  return (
    <UserProvider value={{state,dispatch}}>
      <Loading display={state.loading}/>

      <BrowserRouter>
        <Routes>
          <Route  path="/" exact id='asd'  element={iAdmin(<AdminDashboard/>,false)}/>
          <Route  path="/dashboard" element={iAdmin(null,false)}/>
          <Route  path="/list-product" element={iAdmin(<ListProduct/>,false)}/>
          <Route  path="/create-product"  element={iAdmin(<CreateProduct/>,false)}/>
          <Route  path="/list-category"  element={iAdmin(<ListCategory/>,false)}/>
          <Route  path="/login"  element={iAdmin(<AdminLogin/>,true)}/>
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
