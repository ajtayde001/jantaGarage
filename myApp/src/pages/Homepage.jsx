import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Chart } from "react-google-charts";
import { Box, Card } from '@chakra-ui/react';
export const Homepage = () => {
  // var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [cm, setcm] = useState(false);
  const [total, setTotal] = useState(0);
  const [mainpage, setPage] = useState(0);
  const [mainsize, setPagesize] = useState(10);
  const countRef = useRef(null);
  const {
    isLoading,
    products,
   
    catTotal,
    attenddata,
    inwardoutdata,
    devlopmentdata,
    todayevent,
    officedata,
    statusdata,
  } = useSelector((store) => store.productReducer);
  // console.log(products);
  // console.log(catTotal);

  let dataMain = { kiosk: false };
  const JWTToken = localStorage.getItem("token");
  const yourConfig = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",

      Authorization: `Bearer ${JWTToken}`,
    },
  };

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://staging-api.digitaloms.in/complainbox/count", yourConfig)
      .then((res) => setTotal(res.data));
  }, []);

  const catNameArray =
    catTotal.length > 0 &&
    catTotal?.map((item) => {
      return item.name == null ? "null" : item.name;
    });

  const catCountArray =
    catTotal.length > 0 &&
    catTotal?.map((item) => {
      return +item.count;
    });
  console.log(catNameArray);
  console.log(catCountArray);

  const attendNameArray =
    attenddata.length > 0 &&
    attenddata?.map((item) => {
      return item.attended;
    });
  // console.log(catArray)
  const attendCountArray =
    attenddata.length > 0 &&
    attenddata?.map((item) => {
      return +item.count;
    });

  const inwardNameArray =
    inwardoutdata.length > 0 &&
    inwardoutdata?.map((item) => {
      return item.entryType;
    });
  // console.log(catArray)
  const inwardCountArray =
    inwardoutdata.length > 0 &&
    inwardoutdata?.map((item) => {
      return +item.count;
    });

  const statusNameArray =
    statusdata.length > 0 &&
    statusdata?.map((item) => {
      return item.status;
    });

  const statusCountdata =
    statusdata.length > 0 &&
    statusdata?.map((item) => {
      return +item.count;
    });

  const developNameArray =
    devlopmentdata.length > 0 &&
    devlopmentdata?.map((item) => {
      return item.status == null ? "No Status" : item.status;
    });

  const developCountdata =
    devlopmentdata.length > 0 &&
    devlopmentdata?.map((item) => {
      return +item.count;
    });

  console.log(statusdata);
  /////////////////////////////////
  
  const colorArray = [
    "rgb(0, 143, 251)",
    "rgb(0, 227, 150)",
    "rgb(254, 176, 25)",
    "rgb(255, 69, 96)",
    "rgb(119, 93, 208)",
  ];
  useEffect(() => {
    dispatch(getCatTotal(yourConfig));
    dispatch(getAttend(yourConfig));
    dispatch(getInwardOut(yourConfig));
    dispatch(getDevelopmentwork(yourConfig));
    dispatch(getTodayEvent(yourConfig));
    dispatch(getOffice(yourConfig));
    dispatch(getStatus(yourConfig));
   dispatch(getKarykrtaDAta({},yourConfig))
  }, []);

  return (
    <DIV>
      <DIV1>
        <div className="dashboarduper">
          <div className="dashh3">
            <h3>Dashboard</h3>
          </div>
          <div className="dashrightdiv">
            <button> View All States</button>
            <div className="dashimg">
              <img
                src="https://staging.digitaloms.in/assets/tempIcons/Path%20281.png"
                alt=""
              />
              <span>Sampark Karyalay</span>
            </div>
          </div>
        </div>
      </DIV1>
      {/* {isLoading ? (
        <h1>Loading........</h1>
      ) : ( */}

        <div className="graphbigdiv">
          <div className="graphcatMain">
            <div className="graphcat">
              <div className="graphcat1">
              <span style={{ fontSize: "12px",float:"left" }}>
                    Complain Category
                  </span>
                <div className="chart1">
                 
                  {catNameArray && catNameArray.length > 0 ? (
                    <ApexChart
                      catNameArray={catNameArray || []}
                      catCountArray={catCountArray || []}
                      posi={"right"}
                      legenda={true}
                      widths={410}
                      lableshow={true}
                    />
                  ) : null}
                </div>
                <div className="chart2">
                  <ul>
                    <li style={{ display: "flex", gap: "10px" }}>
                      {/* <span>$</span>
          <p>0</p>
          <p>kachra</p> */}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="graphcat2">
              <span style={{ padding: "10px", fontSize: "12px" ,float:"left"}}>
                  Complaints
                </span>
                <div style={{}}>
                  {statusNameArray && statusNameArray.length > 0 ? (
                    <ApexChart
                      style={{ marginLeft: "-50px" }}
                      catNameArray={statusNameArray || []}
                      catCountArray={statusCountdata || []}
                      posi={"bottom"}
                      legenda={true}
                      widths={380}
                      lableshow={true}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="graphcat">
              <div className="graphcat1">
              <span style={{ padding: "10px", fontSize: "12px",float:"left" }}>
                    Schedule Book
                  </span>
                <div className="chart1">
                  
                  {attendNameArray && attendNameArray.length > 0 ? (
                    <ApexChart
                      catNameArray={attendNameArray || []}
                      catCountArray={attendCountArray || []}
                      posi={"right"}
                      legenda={true}
                      widths={410}
                      lableshow={true}
                    />
                  ) : null}
                </div>
                <div className="chart2">
                  <ul>
                    <li style={{ display: "flex", gap: "10px" }}>
                      {/* <span>$</span>
          <p>0</p>
          <p>kachra</p> */}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="graphcat2">
              <span style={{ padding: "10px", fontSize: "12px",float:"left" }}>
                  Register Book
                </span>
                <div style={{}}>
                  {inwardNameArray && inwardNameArray.length > 0 ? (
                    <ApexChart
                      style={{ marginLeft: "-50px" }}
                      catNameArray={inwardNameArray || []}
                      catCountArray={inwardCountArray || []}
                      posi={"bottom"}
                      legenda={true}
                      widths={380}
                      lableshow={true}
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="graphcat3">
             <span style={{  fontSize: "12px",padding:"10px" }}>
                  Register Book
                </span>
            
                <div style={{display:"flex",marginTop:"20px",marginLeft:"50px",gap:"80px"}}>
                <div>
               {statusNameArray && statusNameArray.length > 0 ? (
                 <ApexChart
                   catNameArray={statusNameArray || []}
                   catCountArray={statusCountdata || []}
                   posi={"right"}
                   legenda={false}
                   widths={290}
                   lableshow={true}
                 />
               ) : null}
             </div>

             <div
               style={{
                // width:"300px",
                height:"100px",
                 display: "grid",
                 gridTemplateColumns: "repeat(3, 1fr)",
                //  gap: "8px",
                 alignContent:"centre",
                 alignItems:"center"
               }}
              //  className="chart2"
             >  
               {statusdata.length > 0 &&
                 statusdata.map((item, ind) => {
                   return (
                     <div style={{ width: "100%",display:"flex",gap:"5px" }}>
                       <FaCircle
                           style={{ marginTop:"5px"}}
                           color={colorArray[ind]}
                         ></FaCircle>
                       <p style={{marginRight:"10px",fontSize:"14px"}}>
                         
                         {item.count} {item.status}
                       </p>
                     </div>
                   );
                 })}
             </div>

                </div>
              
            </div>
            <div className="graphcat4">
              <div style={{textAlign:"start"}}>
              <span style={{ padding: "10px", fontSize: "12px"}}>
                  Development Category
                </span>
              </div>
             
             
           
                <div style={{display:"flex",marginTop:"20px"}}>
                <div className="chart1">
                
                {developNameArray && developNameArray.length > 0 ? (
                  <ApexChart
                    catNameArray={developNameArray || []}
                    catCountArray={developCountdata || []}
                    legenda={false}
                    widths={290}
                    lableshow={true}
                  />
                ) : null}
              </div>

              <div className="chart2" style={{ width: "100%" }}>
                <TableContainer maxWidth={"100%"} fontSize={"14px"}>
                  <Table variant="simple" bg={"white"} textDecoration={"none"}>
                    <Thead bg={"white"} color={"white"}>
                      <Tr color={"white"}>
                        <Th>Count</Th>
                        <Th>Status</Th>
                        <Th>Proposed Amount</Th>
                        <Th>Sanctioned Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {devlopmentdata?.length > 0 &&
                        devlopmentdata?.map((item, ind) => {
                          console.log(ind);
                          return (
                            <Tr key={ind}>
                              <Td display={"flex"} gap={"8px"}>
                                <FaCircle
                                  style={{ marginTop: "3.5px" }}
                                  color={colorArray[ind]}
                                ></FaCircle>
                                {item.count}
                              </Td>
                              <Td>
                                {item.status == null
                                  ? "No Status"
                                  : item.status}{" "}
                              </Td>
                              <Td>{item.proposedAmount}</Td>
                              <Td>{item.sactionedAmount}</Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
                </div>
              
            </div>

            <div className="box">
             <p style={{padding:"10px",textAlign:"start",fontSize:"14px"}}>Recent Complaints</p>
                <Complaincard/>
                <div >
                 
              <Link color={"blue"} textDecoration={"none"} to={"/complaint"}>See More...</Link>
                </div>
            </div>
            
<div className="officecard">
  <p style={{textAlign:"start"}}>Offices</p>
<Officecard/>
</div>
<div className="karykrtacard">
  <p style={{textAlign:"start"}}>Top Performer Karyakartas</p>
<KarykrtaCard/>
</div>


          </div>

          

          <div className="lastdivgraph">
            <div className="lastdivgraph1">
              <div style={{ width:"90%",display:"flex",justifyContent:"space-between",margin:'auto',fontSize:"12px",padding:"10px",marginTop:"20px"}}>
                <p style={{}}>No.Of Visitor's <button></button></p>
                <p>Today,Fiday,23Oct 2023</p>
              </div>
              <ApexChart3  />
              <div style={{width:"90%",display:"flex",justifyContent:"space-between",margin:'auto',marginTop:"20px"}}>
              <GrFormPrevious size={25}></GrFormPrevious>
              <IoIosArrowForward size={20}></IoIosArrowForward>
              </div>
              <div style={{width:"90%",display:"flex",justifyContent:"space-between",margin:'auto',marginTop:"20px"}}>
              <p>Total No. of Visitor's</p>
             <img src="https://staging.digitaloms.in/assets/layout/icon/leader.svg" alt="" />
              </div>
              <div style={{width:"90%",backgroundColor:"rgb(254, 176, 25)",margin:'auto',marginTop:"20px"}}>
              <button>Add Visitor</button>
              </div>
              
            </div>
            <div className="lastdivgraph2">
              <h1>Today's Birthday</h1>
            </div>
            <div className="lastdivgraph3">
              <div style={{width:"90%",display:"flex",gap:"20px",margin:"auto",alignContent:"center"}}>
                <div>
                  <h2>Karykrta</h2>
                  <p>45</p>
                </div>
                <div>
                  <h2>Inactive</h2>
                  <p>78</p>
                </div>
                <img src="https://staging.digitaloms.in/assets/layout/icon/leader.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
 
    </DIV>
  );
};
const DIV = styled.div`
  width: 100%;
  height: 3500px;
  background-color: #eceff5;

  .graphbigdiv {
    width: 95%;
    /* height: 1000px; */
    /* border: 1px solid red; */
    margin: auto;
    margin-top: 10px;
    display: flex;
    gap: 20px;
    padding: 5px;
  }
  .graphcatMain {
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 77%;
    /* border: 2px solid pink; */
    gap: 20px;
  }
  .graphcat {
    padding: 5px;
    display: flex;
    height: 340px;
    gap: 20px;
    width: 100%;
  }
  .graphcat1 {
    /* display: flex; */
    background-color: #ffffff;
    width: 75%;
    gap: 50px;
    border-radius: 20px;
    padding: 10px;
    align-items: center;
  }
  .graphcat3 {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff; 
    height: 350px;
    border-radius: 20px;
    padding: 10px;
    
    align-items: start;
   
  }
  .graphcat4 {
    /* display: flex; */
    /* flex-direction:"column"; */
    background-color: #ffffff;
    width: 100%;
    height: 400px;
    /* gap: 80px; */
    border-radius: 20px;
    padding: 10px;
    align-items: center;
  }
  .chart1 {
    width: 50%;
    /* border: 2px solid red; */
    align-items: center;
    /* margin-left: -10px; */
    text-align: left;
    /* margin: auto; */
    margin-left: 30px;
    /* width: "400px" */
  }

  .chart2 {
    width: 50%;
  }
  .graphcat2 {
    width: 45%;
    border: "2px solid red";
    background-color: #ffffff;
    padding: 10px;
    border-radius: 20px;
    
  }

  .lastdivgraph {
    height: 800px;
    width: 23%;
    /* border: 1px solid green; */
    border-radius: 20px;

    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .lastdivgraph1 {
    height: 500px;
    width: 100%;
    /* border: 1px solid green; */
    border-radius: 20px;
    background-color: #ffffff;
  }
  .lastdivgraph2 {
    height: 100px;
    width: 100%;
    padding:12px;
    text-align: start;
    border-radius: 20px;
    background-color: #ffffff;
    font-size: 20px;
  }
  .lastdivgraph3 {
    height: 80px;
    width: 100%;
    margin:"auto";
    align-content:center;
    border-radius: 20px;
    background-color: #ffffff;
  }

  .box{
    margin: auto;
    background-color: #ffffff;
    width: 100%;
    height: 470px;
    border-radius: 20px;
  }
  .officecard{
    background-color: #ffffff;
    width: 100%;
    height: 630px;
    border-radius: 20px;
    padding: 10px;
    align-items: center;
  }
  .karykrtacard{
    background-color: #ffffff;
    width: 100%;
    height: 450px;
    border-radius: 20px;
    padding: 10px;
    align-items: center;
  }
`;

const DIV1 = styled.div`
  width: 95%;
  margin: auto;

  .side {
    width: 15%;
    border-right: 1px solid grey;
  }

  /* background-color: #eef2f4; */

  .dashh3 > h3 {
    font-size: 20px;
    color: #0b1834;
  }
  .dashboarduper {
    display: flex;
    justify-content: space-between;
    margin: auto;
    margin-top: 10px;
  }
  .dashrightdiv {
    display: flex;
    gap: 15px;
  }
  .dashrightdiv > button {
    background-color: #fdc356;
    /* padding: 2px; */
    border-radius: 5px;
    width: 155px;
    color: #0b1834;
  }
  .dashimg {
    display: flex;
    gap: 4px;
  }
  .dashimg {
    width: 160px;
    color: #0b1834;
  }
`;
