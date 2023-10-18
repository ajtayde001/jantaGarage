// import React from 'react'
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useSearchParams } from 'react-router-dom';
// import styled from "styled-components";
// import { getProductDAta } from '../redux/productReducer.js/action';
// import ProductCard from './ProductCard';


// function ProductList() {
//   const dispatch = useDispatch();
//   const [sarchParam] = useSearchParams();
//   const location = useLocation();
//   const { products } = useSelector((store) => store.productReducer)
//   console.log(products)
//   console.log(sarchParam.getAll("data"))
//   let obj = {
//     params: {
//       gender: sarchParam.getAll("data"),
//       _sort:sarchParam.get("dataSort") && "price",
//       _order:sarchParam.get("dataSort")
//     }
//   }
//   console.log(location)
//   useEffect(() => {
//     dispatch(getProductDAta(obj))
//   }, [location.search]);


//   return (
//     <DIV>
//       {products.length > 0 && products.map((item) => {
//         return <ProductCard key={item.id} {...item} />
//       })}

//     </DIV>
//   )
// }
// // console.log( sarchParam.getAll("data"))
// export default ProductList

// const DIV = styled.div`
//     width:90%;
//     display:grid;
//     grid-template-columns:auto auto auto;
//    gap:20px;
//     margin: auto;
//     // border : 1px solid grey;
//     padding : 20px;
  
// `;

