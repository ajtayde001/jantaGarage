import React from 'react'
// import ProductList from '../components/ProductList'
// import Sidebar from '../components/Sidebar'
import styled from "styled-components";
import { Chart } from "react-google-charts";
// import { Box, Card } from '@chakra-ui/react';
export const Homepage = () => {
  const JWTToken = localStorage.getItem("token");
  console.log(JWTToken);
  const auth = JSON.parse(localStorage.getItem("user")) ;
  console.log(auth)



   const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7], // CSS-style declaration
  ];
  
  const options = {
    // title: "M",
    legend:"none",
    pieHole: 0.7,
    is3D: false,
    pieSliceText: "none",
  };

  return (
    <DIV>
     
   <DIV1 >
    <div className='dashboarduper'>
      <div className='dashh3'>
        <h3>Dashboard</h3>
      </div>
      <div className='dashrightdiv'>
        <button> View All States</button>
        <div className='dashimg' >
          <img src="https://staging.digitaloms.in/assets/tempIcons/Path%20281.png" alt="" />
          <span >Sampark Karyalay</span>
        </div>
      </div>
    </div> 
   </DIV1>

<div className='graphbigdiv'>
  <div className='graphcat'>
    <div className='graphcat1'>
      <div className='chart1'> 
        <Chart  
        // width={500}
        width="100%"
        height="300px"
      chartType="PieChart"
      // width={"10%"}
      data={data}
      options={options}
    />
      </div>
      <div className='chart2'>
        <ul>
        <li style={{display:"flex",gap:"10px"}}>
          <span>$</span>
          <p>0</p>
          <p>kachra</p>
        </li>
        </ul>
      </div>
    </div>
    <div className='graphcat2'>
    <Chart  
      chartType="PieChart"
      // width={"10%"}
      data={data}
      options={options}
    />
    </div>
  </div>
  <div className='lastdivgraph'>
    <h1>last</h1>
  </div>
</div>

   
    </DIV>
  )
}
const DIV = styled.div`
    width: 100%;
    height:1000px;
    background-color: #eceff5;

   .graphbigdiv{
    width: 95%;
    /* height: 1000px; */
    border: 1px solid red;
    margin: auto;
    margin-top: 10px;
    display: flex;
    gap: 20px;
    padding: 5px;
    /* border-radius: 20px; */
   }
   .graphcat{
   
    padding: 5px;
    /* background-color: white; */
display: flex;
height:320px;
gap: 20px;
width: 70%;
/* margin: auto; */

   }
   .graphcat1{
   
display: flex;
background-color: #ffffff;
width: 70%;
/* border:"2px solid red"; */
border-radius: 20px;
padding: 10px;
align-items: center;

   }
   .chart1{
   /* margin-left: 10px; */
   /* margin-top: 10px; */
   }
   .chart2{
    border:"2px solid blue";
    /* margin: 18px 18px 0px; */
   }
   .graphcat2{
    width: 30%;
    
    border:"2px solid red";
    background-color: #ffffff;
    padding: 10px;
    /* border: 1px solid blue; */
    border-radius: 20px;
   }
   
   .lastdivgraph{
    height: 200px;
    width: 30%;
    border: 1px solid green;
    border-radius: 20px;
   }
`;

const DIV1 = styled.div`
    
    width:95%;
    margin: auto;
  

  .side{
 width:15%;
 border-right:1px solid grey
  }
 
    /* background-color: #eef2f4; */
  
  .dashh3 >h3{
  font-size: 20px;
  color: #0b1834;
  }
  .dashboarduper{
    display: flex;
    justify-content: space-between;
    margin: auto;
    margin-top: 10px;
    
  }
  .dashrightdiv{
    display: flex;
    gap: 15px;
    
  }
  .dashrightdiv>button{
    background-color: #fdc356;
    /* padding: 2px; */
    border-radius: 5px;
    width: 155px;
    color: #0b1834;
  }
  .dashimg{
    display: flex;
    gap: 4px;
  }
  .dashimg{
    width: 160px;
    color: #0b1834;
  }
  
`;
