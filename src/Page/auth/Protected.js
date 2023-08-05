
import React from "react";
import { Navigate,useLoaderData } from "react-router-dom";

const RouteProtected= ({child})=>{
    const check = useLoaderData();
    console.log(check)
    if(check){return child;}
    return <Navigate to="/login"   replace/>;
}
export default RouteProtected;