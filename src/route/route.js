import LayoutAdmin from "../Component/AdminLayout";
import RouteProtected from "../Page/auth/Protected";
import { CheckToken } from "../Service/auth.service";


export const prepareRouter = (path,element,child)=>{
    return {
      path:path,
      element:<RouteProtected child={<LayoutAdmin main={element} auth={false}/>}/>,
      loader:async ({})=>{
        return true;
        // await CheckToken();
      },
    };
  }