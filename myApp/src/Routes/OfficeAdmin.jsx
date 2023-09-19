import { Navigate, Routes, Route } from "react-router-dom";
// import { PrivateRoute } from "../pages/PrivateRoute";
import OfficeHome from "../pages/OfficeHome";
import PrivateRoute12 from "../pages/PrivateRouts12";

import Complaints from "../pages/Complaints";
export default function OfficeAdmin({ isEnabled }) {
    if (isEnabled) {
      return (
       
        <Routes>
        <Route element={<PrivateRoute12/>}>
          <Route path="/dashboard" element={<OfficeHome />} />
          <Route path="/complaint" element={<Complaints/>} />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      );
    }
  
    return null;
  }
  