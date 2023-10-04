import React, { useEffect, useState } from 'react'
// import ProductList from '../components/ProductList'
// import Sidebar from '../components/Sidebar'
import styled from "styled-components";
import { Chart } from "react-google-charts";
import { Box, Card } from '@chakra-ui/react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAssembliesData, getCatTotal, getCategoriesData, getInProgressDAta, getOnHoldDAta, getProductDAta, getQueueDAta, getSolvedDAta, getStatusUpdateDAta } from '../redux/productReducer.js/action';
export const Homepage = () => {
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [cm, setcm] = useState(false);
  const [total,setTotal]=useState(0)
  const [mainpage, setPage] = useState(0);
  const [mainsize, setPagesize] = useState(10);

  const {
    products,
    inprogressdata,
    solvedata,
    onholddata,
    queuedata,
    statusupdatedata,
    catTotal
  } = useSelector((store) => store.productReducer);
  console.log(products);
  console.log(catTotal);

  let dataMain = { kiosk: false };
  const JWTToken = localStorage.getItem("token");
  const yourConfig = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",

      Authorization: `Bearer ${JWTToken}`,
    },
  };


  const dispatch=useDispatch()
  useEffect(()=>{

    axios.get("https://staging-api.digitaloms.in/complainbox/count",yourConfig)
    .then((res)=>setTotal(res.data))
  
  
  },[])
  
  useEffect(() => {
    
    dispatch(getCatTotal(yourConfig));
    dispatch(getProductDAta(dataMain, yourConfig));
    dispatch(getInProgressDAta(dataMain, yourConfig));
    dispatch(getSolvedDAta(dataMain, yourConfig));
    dispatch(getOnHoldDAta(dataMain, yourConfig));
    dispatch(getQueueDAta(dataMain, yourConfig));
    dispatch(getStatusUpdateDAta(dataMain, yourConfig));
    dispatch(getCategoriesData(yourConfig));
    dispatch(getAssembliesData(yourConfig));
   
  }, [JWTToken, cm]);
  
 const catArray= catTotal.length > 0 &&
    catTotal?.map((item) => {
      return (
        { name: item.name, y: item.count }
      );
    })
  console.log(catArray)
  const options = {
    animationEnabled: true,
    animationDuration: 2000,
    width:"270",
    height:"290",
    margin:"auto",
    verticalAlign:"centre",
    gap:"20",
    borderColor: "white",
    borderThickness: 5,
    toolTip:{
      borderColor: "black",
      borderThickness: 5,
      fontColor: "black",
    },
    title: {
      // text: "Customer Satisfaction"
    },
    subtitles: [{
      text: `Total:${total}`,
      verticalAlign: "center",
      fontSize: 16,
      // dockInsidePlotArea: true
    },
  ],
    data: [{
      type: "doughnut",
      margin: 10,
      borderColor: "black",
      lineColor: "red",
      borderThickness: 10,
      // lineDashType: "solid",
      // dockInsidePlotArea: true,
      // showInLegend: true,
      // indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: catArray
    }]
   
  }




  const options1 = {
    animationEnabled: true,
    width:"180",
    height:"230",
    margin:"auto",
    verticalAlign:"centre",
    title: {
      // text: "Customer Satisfaction"
    },
    subtitles: [{
      text: `Total:${total}`,
      verticalAlign: "center",
      fontSize: 16,
      // dockInsidePlotArea: true
    },
  ],
    data: [{
      type: "doughnut",
      showInLegend: true,
      // indexLabel: "{name}: {y}",
      // yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "UNSOLVED", y: products[1] },
        { name: "INPROGRESS", y: inprogressdata[1] },
        { name: "ONHOLD", y: onholddata[1] },
        { name: "QUEUE", y: queuedata[1] },
        { name: "SOLVED", y: solvedata[1] }
      ]
    }]
  }
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
      <span style={{padding:"10px",fontSize:"12px"}}>Complain Category</span>
    <CanvasJSChart  options = {options}
    // width={"50%"}
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
   
    <div style={{width:"90%",marginLeft:"38px",backgroundColor:"white"}}>
    <CanvasJSChart  options = {options1}
    // width={"50%"}
   	/>
    </div>
   
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

   }
   .graphcat{
   padding: 5px; 
     display: flex;
      height:340px;
      gap: 20px;
    width: 70%;


   }
   .graphcat1{
   
display: flex;
background-color: #ffffff;
width: 73%;
gap: 50px;
border-radius: 20px;
padding: 10px;
align-items: center;

   }
   .chart1{
  width: 50%;
  /* border: 2px solid red; */
  align-items: center;
  /* margin-left: -10px; */
  text-align: left;
  /* margin: auto; */
  margin-left: 30px;
   }
  
   .chart2{
    width: 50%;

   }
   .graphcat2{
    width: 30%;
    border:"2px solid red";
    background-color: #ffffff;
    padding: 10px;
    border-radius: 20px;
    /* align-items: center; */
    align-content: center;
    /* margin-left: 40px; */
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
