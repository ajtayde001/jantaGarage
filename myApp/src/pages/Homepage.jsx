import React from 'react'
// import ProductList from '../components/ProductList'
// import Sidebar from '../components/Sidebar'
import styled from "styled-components";
export const Homepage = () => {
  const JWTToken = localStorage.getItem("token");
  console.log(JWTToken);
  const auth = JSON.parse(localStorage.getItem("user")) ;
  console.log(auth)

  return (
    <DIV>
     
   <div className='product'>
    <h1>
      Welcome To Admin Dashboard

    </h1>
    
   </div>
   
    </DIV>
  )
}
const DIV = styled.div`
    
    display:flex;
    // padding : 10px;

  .side{
 width:15%;
 border-right:1px solid grey
  }
  .product{
    width:85%;
  }
`;
