import { Navigate, Routes, Route } from "react-router-dom";

import Karyakart from "../pages/KaryakartHome";
import { PrivateRoute } from "../pages/PrivateRoute";
import Complaints from "../pages/Complaints";
import PrivateRoute12 from "../pages/PrivateRouts12";
export default function Karyakarta({ isEnabled }) {
    if (isEnabled) {
      return (
     
        <Routes>
        <Route element={<PrivateRoute12/>}>
          <Route path="/dashboard" element={<Karyakart />} />
          <Route path="/complaint" element={< Complaints/>} />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      );
    }
  
    return null;
  }
  