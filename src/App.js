import logo from './logo.svg';
import './App.css';
import React,{useReducer} from 'react';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import { UserProvider } from './context/userContext';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import AdminDashboard from "./Page/dashboard";
import AdminLogin from "./Page/auth/login";
import LayoutAdmin from "./Component/AdminLayout";


const URL_ADMIN="/admin-adios";
function App() {
  const [state,dispatch]=useReducer(reducer,STATE);
  return (
    <UserProvider value={{state,dispatch}}>
      <BrowserRouter>
        <Routes>
          <Route  path={URL_ADMIN}  element={iAdmin(<AdminDashboard/>,false)}/>
          <Route  path={URL_ADMIN+"/dashboard"} element={iAdmin(null,false)}/>
          <Route  path={URL_ADMIN+"/login"}  element={iAdmin(<AdminLogin/>,true)}/>
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
