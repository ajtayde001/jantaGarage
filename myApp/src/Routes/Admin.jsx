import { Navigate, Routes, Route } from "react-router-dom";
// import { PrivateRoute } from '..pages/PrivateRoute'
import { Homepage } from "../pages/Homepage";
// import { PrivateRoute } from "../pages/PrivateRoute";
import Complaints from "../pages/Complaints";
import PrivateRoute12 from "../pages/PrivateRouts12";
import AddPage from "../pages/AddPage";
import EditComplainPage from "../pages/EditComplainPage";
import Officedatapage from "../pages/Officedatapage";
import Karykartadatapage from "../pages/Karykartadatapage";
import Visitorspage from "../pages/Visitorspage";
export default function Admin({ isEnabled }) {
   
    if (isEnabled) {
      return (
       
        <Routes>
        <Route element={<PrivateRoute12/>}>
          <Route path="/dashboard" element={<Homepage />} />
          <Route path="/complaint" element={< Complaints/>} />
          <Route path="/complaint/add" element={< AddPage/>} /> 
          <Route path="/complaint/edit/:id" element={< EditComplainPage/>} />  
          <Route path="/officedata" element={< Officedatapage/>} /> 
          <Route path="/karykartadata" element={< Karykartadatapage/>} /> 
          <Route path="/visitors" element={< Visitorspage/>} /> 
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      );
    }
  
    return null;
  }
  