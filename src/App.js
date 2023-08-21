import './App.css';
import React,{useReducer} from 'react';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import { UserProvider } from './context/userContext';
import {BrowserRouter, Routes,Route, createBrowserRouter, RouterProvider} from 'react-router-dom';
import AdminDashboard from "./Page/dashboard";
import AdminLogin from "./Page/auth/login";
import LayoutAdmin from "./Component/AdminLayout";
import ListProduct from "./Page/product/list-product";
import CreateProduct from "./Page/product/create-product";
import ListCategory from "./Page/category/list-category";
import Size from './Page/size/size';
import KindOfSport from './Page/kindOfSport/kind-of-sport';
import Loading from "./Component/loading";
import RouteProtected from './Page/auth/Protected';
import { CheckToken } from './Service/auth.service';
import NotFound from './Page/NotFound';
import CreateProductColor from './Page/product/create-product-color';
import ListProductColor from './Page/product/list-product-color';
import ListProductSize from './Page/product/list-product-size';
import ListAds from './Page/ads/list-ads';
import ListCollection from './Page/ads/list-collection';


const prepareRouter = (path,element,child)=>{
  return {
    path:path,
    element:<RouteProtected child={<LayoutAdmin main={element} auth={false}/>}/>,
    loader:async ({})=>{
      return true;
      // await CheckToken();
    },
  };
}
const router= createBrowserRouter([
  prepareRouter("/",<AdminDashboard/>),
  prepareRouter("/list-product",<ListProduct/>),
  prepareRouter("/create-product",<CreateProduct/>),
  prepareRouter("/list-product-color/:pId",<ListProductColor/>),
  prepareRouter("/create-product-color/:pId",<CreateProductColor/>),
  prepareRouter("/list-product-size/:pclId",<ListProductSize/>),

  prepareRouter("/list-category",<ListCategory/>),
  prepareRouter("/size",<Size/>),
  prepareRouter("/kind-of-sport",<KindOfSport/>),

  prepareRouter('/ad-campaign',<ListAds/>),
  prepareRouter('/collection',<ListCollection/>),
  { path:"/login", element:<LayoutAdmin main={<AdminLogin/>} auth={true}/>},
  { path:"*",element:<LayoutAdmin main={<NotFound/>} auth={true}/>}
])

function App() {
  const [state,dispatch]=useReducer(reducer,STATE);
  return (
    <UserProvider value={{state,dispatch}}>
      <Loading display={state.loading}/>
      <RouterProvider router={router}/> 
    </UserProvider>
  );
}
export default App;
