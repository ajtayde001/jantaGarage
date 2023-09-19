// import React from 'react'
// import { useSelector } from 'react-redux'
// import {Navigate, useLocation} from "react-router-dom";

// export const PrivateRoute = ({children}) => {
//   const userInfo = JSON.parse(localStorage.getItem("user"));
//   const token = userInfo?.accessToken;
//   // const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
//     // const {auth} = useSelector((store)=>store.authReducer);
//     const location = useLocation();
//     // console.log(auth)
//   return (
//     !token ? children : <Navigate to={"/login"} />
//   )
// }
// import { Navigate, Outlet } from "react-router-dom";

// export default function PrivateRoute() {
//   const userInfo = JSON.parse(localStorage.getItem("user"));
//   const token = userInfo?.accessToken;
//   const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
//   const expiry = payload ? new Date(payload.expiry * 1000) : null;
//   const state = {
//     referrer: window.location.pathname,
//     message: "You must sign in to your Deciphr account to continue.",
//   };

//   // Check if token is available
//   if (!payload) {
//     return <Navigate to="/login" state={state} />
//   }


//   // Check token validity
//   if (expiry < new Date()) {
//     localStorage.removeItem("userInfo");

//     return <Navigate to="/login" state={state} />
//   }

//   return <Outlet />
// }



