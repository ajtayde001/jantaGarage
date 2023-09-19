import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../pages/Login";

export const CoreRoutes = ({ isEnabled }) => {
  if (isEnabled) {
    return (
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  return null;
};
