import React from 'react'
import {Link} from "react-router-dom";
import styled from 'styled-components';
import { GrLogout } from "react-icons/gr";
export const Navbar = () => {
  const Logout = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <DIV>
        <h3>Janta Garage</h3>
        <Link to={"/dashboard"}>Dashboard</Link>
        {/* <Link to={"/login"}>Log In</Link> */}
        <Link to={"/complaint"}>Complaint</Link>
        <GrLogout onClick={Logout}>logout</GrLogout>
        {/* <Link >Logout</Link> */}

    </DIV>
  );
};


const DIV = styled.div`
  display :flex;
  align-items : center;
  gap : 20px;
  border-bottom : 1px solid gray
`;