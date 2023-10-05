import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Chart } from "react-google-charts";
import { Box, Card } from '@chakra-ui/react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAssembliesData, getAttend, getCatTotal, getCategoriesData, getDevelopmentwork, getInProgressDAta, getInwardOut, getOffice, getOnHoldDAta, getProductDAta, getQueueDAta, getSolvedDAta, getStatus, getStatusUpdateDAta, getTodayEvent } from '../redux/productReducer.js/action';
import ApexChart from '../components/Piechart';
import ReactApexChart from 'react-apexcharts';
export const Homepage = () => {
  // var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [cm, setcm] = useState(false);
  const [total,setTotal]=useState(0)
  const [mainpage, setPage] = useState(0);
  const [mainsize, setPagesize] = useState(10);

  const {
    isLoading,
    products,
    inprogressdata,
    solvedata,
    onholddata,
    queuedata,
    statusupdatedata,
    catTotal,
    attenddata,
    inwardoutdata,
    devlopmentdata,
    todayevent,
    officedata,
    statusdata
    
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
  const [time,setTime]=useState(false)
  useEffect(() => { 

    dispatch(getCatTotal(yourConfig));
    dispatch(getAttend(yourConfig));
    dispatch(getInwardOut(yourConfig));
    dispatch(getDevelopmentwork(yourConfig));
    dispatch(getTodayEvent(yourConfig));
    dispatch(getOffice(yourConfig));
    dispatch(getStatus(yourConfig));
    dispatch(getProductDAta(dataMain, yourConfig));
    dispatch(getInProgressDAta(dataMain, yourConfig));
    dispatch(getSolvedDAta(dataMain, yourConfig));
    dispatch(getOnHoldDAta(dataMain, yourConfig));
    dispatch(getQueueDAta(dataMain, yourConfig));
    dispatch(getStatusUpdateDAta(dataMain, yourConfig));
    dispatch(getCategoriesData(yourConfig));
    dispatch(getAssembliesData(yourConfig));
  

  }, [JWTToken, cm]);
  
  // console.log(time)




 const catNameArray= catTotal.length > 0 &&
    catTotal?.map((item) => {
      return (
       item.name==null?"null":item.name
      );
    })
  // console.log(catArray)
 const catCountArray= catTotal.length > 0 &&
    catTotal?.map((item) => {
      return (
        +item.count
      );
    })
  console.log(catNameArray)
  console.log(catCountArray)
// let arr1=catNameArray?catNameArray:[]
// let arr2=catCountArray?catCountArray:[]

  const attendArray= attenddata.length > 0 &&
  attenddata?.map((item) => {
    return (
      { name: item.attended, y: item.count }
    );
  })


  const inwarddArray= inwardoutdata.length > 0 &&
  inwardoutdata?.map((item) => {
    return (
      { name: item.entryType, y: item.count }
    );
  })

  const statusdArray= statusdata.length > 0 &&
  statusdata?.map((item) => {
    return (
      { name: item.status, y: item.count }
    );
  })

  const statusNameArray= statusdata.length > 0 &&
  statusdata?.map((item) => {
    return (
     item.status
    );
  })
// console.log(catArray)
const statusCountdata= statusdata.length > 0 &&
statusdata?.map((item) => {
    return (
      +item.count
    );
  })

  const developmentdArray= devlopmentdata.length > 0 &&
  devlopmentdata?.map((item) => {
    return (
      { name: item.status, y: item.count }
    );
  })











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
      // borderColor: "white",
      // borderWidth: 10,
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





  const options2 = {
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
      dataPoints: attendArray
    }]
   
  }





  const options3 = {
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
      dataPoints: inwarddArray
    }]
  }

  const options4 = {
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
      dataPoints: statusdArray
    }]
  }


  const options5 = {
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
      dataPoints: developmentdArray
    }]
   
  }
/////////////////////////////////
const [chartData] = useState({
  series:catCountArray , 
  options: {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    labels:catNameArray,
  //   dataLabels: {
  //     dropShadow: {
  //       blur: 3,
  //       opacity: 0.8
  //     }
  //   },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  },
});



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
{isLoading?<h1>Loading........</h1>:<div className='graphbigdiv'>
  <div className='graphcatMain'>
  <div className='graphcat'>
    <div className='graphcat1'>
      <div className='chart1'>
      <span style={{padding:"10px",fontSize:"12px"}}>Complain Category</span>
    {/* <CanvasJSChart  options = {options}
    
    // width={"50%"}
   	/> */}
    <div id="chart" style={{width:"400px"}}>
      <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
    </div>
      
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
  <div className='graphcat'>
    <div className='graphcat1'>
      <div className='chart1'>
      <span style={{padding:"10px",fontSize:"12px"}}>Complain Category</span>
    <CanvasJSChart  options = {options2}
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
    <CanvasJSChart  options = {options3}
    // width={"50%"}
   	/>
    </div>
   
    </div>
  </div>



  <div className='graphcat3'>
      <div className='chart1'>
      <span style={{padding:"10px",fontSize:"12px"}}>Complain Category</span>
    {/* <CanvasJSChart  options = {options4}
    // width={"50%"}
   	/> */}
       {/* <ApexChart catNameArray={statusNameArray||[]}
    catCountArray={statusCountdata||[]} /> */}
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
  <div className='graphcat4'>
      <div className='chart1'>
      <span style={{padding:"10px",fontSize:"12px"}}>Complain Category</span>
    <CanvasJSChart  options = {options5}
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
  </div>

  
  <div className='lastdivgraph'>
  <div className='lastdivgraph1' >
    <h1>last</h1>
  </div>
  <div className='lastdivgraph2'>
    <h3>Today's Birthday</h3>
  </div>
  <div className='lastdivgraph3'>ajay</div>
  </div>
 
</div> }
 




    </DIV>
  )
}
const DIV = styled.div`
    width: 100%;
    height:2000px;
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
   .graphcatMain{
   padding: 5px; 
     display: flex;
     flex-direction: column;
     width: 77%;
/* border: 2px solid pink; */
gap: 15px;

   }
   .graphcat{
   padding: 5px; 
     display: flex;
      height:340px;
      gap: 20px;
    width: 100%;
/* border: 2px solid Green; */

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
   .graphcat3{
   
display: flex;
background-color: #ffffff;
width: 100%;
height: 350px;
gap: 50px;
border-radius: 20px;
padding: 10px;
align-items: center;

   }
   .graphcat4{
   
display: flex;
background-color: #ffffff;
width: 100%;
height: 400px;
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
    height: 800px;
    width: 23%;
    border: 1px solid green;
    border-radius: 20px;
    /* background-color: #ffffff; */
    /* margin-left: 20px; */
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
   }
   .lastdivgraph1{
    height: 540px;
    width: 100%;
    /* border: 1px solid green; */
    border-radius: 20px;
    background-color: #ffffff;
   }
   .lastdivgraph2{
    height: 100px;
    width: 100%;
    /* border: 1px solid green; */
    border-radius: 20px;
    background-color: #ffffff;
   }
   .lastdivgraph3{
    height: 80px;
    width: 100%;
    /* border: 1px solid green; */
    border-radius: 20px;
    background-color: #ffffff;
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
