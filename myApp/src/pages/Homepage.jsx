import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Chart } from "react-google-charts";
import { Box, Card } from "@chakra-ui/react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssembliesData,
  getAttend,
  getCatTotal,
  getCategoriesData,
  getDevelopmentwork,
  getInProgressDAta,
  getInwardOut,
  getOffice,
  getOnHoldDAta,
  getProductDAta,
  getQueueDAta,
  getSolvedDAta,
  getStatus,
  getStatusUpdateDAta,
  getTodayEvent,
} from "../redux/productReducer.js/action";
import ApexChart from "../components/Piechart";
import ReactApexChart from "react-apexcharts";
import ApexChart3 from "../components/Barchart";
import { BsCircle } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

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
    statusdata,
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
  // console.log(catArray)
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
  // const [chartData] = useState({
  //   series:catCountArray||[] ,
  //   options: {
  //     chart: {
  //       type: 'donut',
  //     },
  //     plotOptions: {
  //       pie: {
  //         donut: {
  //           labels: {
  //             show: true,
  //             total: {
  //               showAlways: true,
  //               show: true
  //             }
  //           }
  //         }
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     labels:catNameArray||[],
  //   //   dataLabels: {
  //   //     dropShadow: {
  //   //       blur: 3,
  //   //       opacity: 0.8
  //   //     }
  //   //   },
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 200,
  //           },
  //           legend: {
  //             position: 'bottom',
  //           },
  //         },
  //       },
  //     ],
  //   },
  // });
  // if(catNameArray.length==0 ){
  //   countRef.current= setTimeout(() => {
  //     window.location.reload()
  //    }, 1000)
  // }else{
  //   clearTimeout(countRef.current);
  // }

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
    dispatch(getProductDAta(dataMain, yourConfig));
    dispatch(getInProgressDAta(dataMain, yourConfig));
    dispatch(getSolvedDAta(dataMain, yourConfig));
    dispatch(getOnHoldDAta(dataMain, yourConfig));
    dispatch(getQueueDAta(dataMain, yourConfig));
    dispatch(getStatusUpdateDAta(dataMain, yourConfig));
    dispatch(getCategoriesData(yourConfig));
    dispatch(getAssembliesData(yourConfig));
  }, [JWTToken, cm]);

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
      {isLoading ? (
        <h1>Loading........</h1>
      ) : (
        <div className="graphbigdiv">
          <div className="graphcatMain">
            <div className="graphcat">
              <div className="graphcat1">
                <div className="chart1">
                  <span style={{ padding: "10px", fontSize: "12px" }}>
                    Complain Category
                  </span>
                  {catNameArray && catNameArray.length > 0 ? (
                    <ApexChart
                      catNameArray={catNameArray || []}
                      catCountArray={catCountArray || []}
                      posi={"right"}
                      legenda={true}
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
                <div style={{}}>
                  {statusNameArray && statusNameArray.length > 0 ? (
                    <ApexChart
                      style={{ marginLeft: "-50px" }}
                      catNameArray={statusNameArray || []}
                      catCountArray={statusCountdata || []}
                      posi={"bottom"}
                      legenda={true}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="graphcat">
              <div className="graphcat1">
                <div className="chart1">
                  <span style={{ padding: "10px", fontSize: "12px" }}>
                    Complain Category
                  </span>
                  {attendNameArray && attendNameArray.length > 0 ? (
                    <ApexChart
                      catNameArray={attendNameArray || []}
                      catCountArray={attendCountArray || []}
                      posi={"right"}
                      legenda={true}
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
                <div style={{}}>
                  {inwardNameArray && inwardNameArray.length > 0 ? (
                    <ApexChart
                      style={{ marginLeft: "-50px" }}
                      catNameArray={inwardNameArray || []}
                      catCountArray={inwardCountArray || []}
                      posi={"bottom"}
                      legenda={true}
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="graphcat3">
              <div className="chart1">
                <span style={{ padding: "10px", fontSize: "12px" }}>
                  Complain Category
                </span>

                {statusNameArray && statusNameArray.length > 0 ? (
                  <ApexChart
                    catNameArray={statusNameArray || []}
                    catCountArray={statusCountdata || []}
                    posi={"right"}
                    legenda={false}
                  />
                ) : null}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                  alignContent:"centre",
                  alignItems:"center"
                }}
                className="chart2"
              >
                {statusdata.length > 0 &&
                  statusdata.map((item, ind) => {
                    return (
                      <div style={{ width: "100%" }}>
                        <FaCircle
                            style={{ }}
                            color={colorArray[ind]}
                          ></FaCircle>
                        <p style={{  marginTop:"-20px",marginRight:"10px"}}>
                          
                          {item.count} {item.status}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="graphcat4">
              <div className="chart1">
                <span style={{ padding: "10px", fontSize: "12px" }}>
                  Complain Category
                </span>
                {developNameArray && developNameArray.length > 0 ? (
                  <ApexChart
                    catNameArray={developNameArray || []}
                    catCountArray={developCountdata || []}
                    legenda={false}
                  />
                ) : null}
              </div>

              <div className="chart2" style={{ width: "100%" }}>
                <TableContainer maxWidth={"100%"}>
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

          <div className="lastdivgraph">
            <div className="lastdivgraph1">
              {/* <h1>last</h1> */}
              <ApexChart3 />
            </div>
            <div className="lastdivgraph2">
              <h3>Today's Birthday</h3>
            </div>
            <div className="lastdivgraph3">ajay</div>
          </div>
        </div>
      )}
    </DIV>
  );
};
const DIV = styled.div`
  width: 100%;
  height: 2000px;
  background-color: #eceff5;

  .graphbigdiv {
    width: 95%;
    /* height: 1000px; */
    border: 1px solid red;
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
    gap: 15px;
  }
  .graphcat {
    padding: 5px;
    display: flex;
    height: 340px;
    gap: 20px;
    width: 100%;
  }
  .graphcat1 {
    display: flex;
    background-color: #ffffff;
    width: 75%;
    gap: 50px;
    border-radius: 20px;
    padding: 10px;
    align-items: center;
  }
  .graphcat3 {
    display: flex;
    background-color: #ffffff;
    width: 100%;
    height: 350px;
    gap: 50px;
    border-radius: 20px;
    padding: 10px;
    align-items: center;
  }
  .graphcat4 {
    display: flex;
    background-color: #ffffff;
    width: 100%;
    height: 400px;
    gap: 50px;
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
    /* align-items: center;
    align-content: center; */
    /* margin-left: 40px; */
    /* margin: auto; */
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
    /* border: 1px solid green; */
    border-radius: 20px;
    background-color: #ffffff;
  }
  .lastdivgraph3 {
    height: 80px;
    width: 100%;
    /* border: 1px solid green; */
    border-radius: 20px;
    background-color: #ffffff;
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
