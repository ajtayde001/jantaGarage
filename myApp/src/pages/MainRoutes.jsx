
import { useSelector } from "react-redux";
import Admin from "../Routes/Admin";
import { CoreRoutes } from "../Routes/CoreRoute";
import Karyakarta from "../Routes/Karyakarta";
import OfficeAdmin from "../Routes/OfficeAdmin";
import Viewer from "../Routes/Viewer";
import { useEffect } from "react";


export default function MainRoutes() {
  // const { authUser } = useSelector((state) => {
  //   return {
  //     authUser: state.authReducer.authUser,
  //   };
  // });

  //
  

  const authUser = JSON.parse(localStorage.getItem("user")) ;
  console.log(authUser)

  const isAdmin = authUser ? authUser?.role == "SUPER_ADMIN" : false;

  const isViewer = authUser ? authUser?.role == "VIEWER" : false;

  const isofficeAdmin = authUser ? authUser?.role == "OFFICE_ADMIN" : false;

  const isKaryakarta = authUser ? authUser?.role == "KARYA_KARTA" : false;

 
  return (
  
    <div>

      <CoreRoutes isEnabled={authUser === null} />
      <Admin isEnabled={authUser !== null && isAdmin} />
      <Viewer isEnabled={authUser !== null && isViewer} />
      <OfficeAdmin isEnabled={authUser !== null && isofficeAdmin} />
      <Karyakarta isEnabled={authUser !== null && isKaryakarta} />
      </div>
  
  );
}
