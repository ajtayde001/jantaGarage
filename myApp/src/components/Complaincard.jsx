import React, { useEffect, useRef, useState } from "react";
import {
  deleteData,
  getAssembliesData,
  getCategoriesData,
  getFilterDAta,
  getFilterInprogress,
  getFilterOnHold,
  getFilterQueue,
  getFilterSolved,
  getFilterStatusupdate,
  getInProgressDAta,
  getOnHoldDAta,
  getProductDAta,
  getQueueDAta,
  getSearchDAta,
  getSearchInprogress,
  getSearchOnHold,
  getSearchQueue,
  getSearchSolved,
  getSearchsStatusUpdate,
  getSolvedDAta,
  getStatusUpdateDAta,
  postCommentData,
} from "../redux/productReducer.js/action";
import { useDispatch, useSelector } from "react-redux";
import { FcFilledFilter } from "react-icons/fc";
import { FaDownload } from "react-icons/fa";
import { read, utils, writeFile } from "xlsx";
import TableList from "../components/TableList";
import { IoIosArrowForward } from "react-icons/io";
import { GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Box,
  Button,
  Portal,
  TabList,
  Tabs,
  Tab,
  Text,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import styled from "@emotion/styled";
import axios from "axios";

const mainObj = {
  dateFrom: "",
  dateTo: "",
  kiosk: false,
  page: { number: 0, size: 10 },
  flag: null,
};
const cityData = {
  label: "",
  value: "",
};
const Complaincard = () => {
  const {
    products,
    serchMainData,
    CategoriesData,
    assembliesData,
    inprogressdata,
    solvedata,
    onholddata,
    queuedata,
    statusupdatedata,
  } = useSelector((store) => store.productReducer);
  console.log(products);
 
  const [total,setTotal]=useState(0)


  const dispatch = useDispatch();
  const [mainpage, setPage] = useState(0);
  const [mainsize, setPagesize] = useState(1);
  const [searchdata, setSearchdata] = useState("");
  const [mainID, setID] = useState(10);
  const [cm, setcm] = useState(false);
  const initRef = useRef();
  const [mainData1, setMainData1] = useState(mainObj);
  const [city, setCity] = useState(cityData);
  const [cat, setcatData] = useState(null);

  const [userSarch, setUserSearch] = useState("");
  const [assemble, setassembleData] = useState(null);
  const [typ, setTypData] = useState(null);
  const nest = () => {
    setPage(mainpage + 1);
  };
  const prev = () => {
    setPage(mainpage - 1);
  };
  let dataMain = { kiosk: false, page: { number: mainpage, size: mainsize } };
  const JWTToken = localStorage.getItem("token");
  const yourConfig = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",

      Authorization: `Bearer ${JWTToken}`,
    },
  };


  useEffect(()=>{

    axios.get("https://staging-api.digitaloms.in/complainbox/count",yourConfig)
    .then((res)=>setTotal(res.data))
  
  
  },[])
 

  const mainData = products[0] ? products[0].reverse() : null;
  // console.log(mainData);

 
  const hnadleDelete = (id) => {
    let pros = mainData.find((e) => e.id == id);
    pros.recordStatus = "DELETED";
    // console.log(pros);

    dispatch(deleteData(pros, yourConfig));
    // window.location.reload();
  };

  // const hnadleSearch = (e) => {
  //   e.preventDefault();
  //   const pros = {
  //     search: searchdata,
  //     category: null,
  //     type: null,
  //     dateFrom: "",
  //     dateTo: "",
  //     kiosk: false,
  //     page: { number: 0, size: mainsize },
  //     flag: null,
  //   };
  //   dispatch(getSearchDAta(pros, yourConfig));
  //   dispatch(getSearchInprogress(pros, yourConfig));
  //   dispatch(getSearchSolved(pros, yourConfig));
  //   dispatch(getSearchOnHold(pros, yourConfig));
  //   dispatch(getSearchQueue(pros, yourConfig));
  //   dispatch(getSearchsStatusUpdate(pros, yourConfig));
  //   // setSearchdata("")

  // };

  const hnadleComment = (id, textdata) => {
    let pros = {
      text: textdata,
      entityType: "COMPLAIN",
      complains: id,
    };

    dispatch(postCommentData(pros, yourConfig)).then((res) => {
      dispatch(getProductDAta(dataMain, yourConfig));
    });

    
  };
  const caterf = cat ? JSON.parse(cat) : {};
  // console.log(caterf);

  const assembleOne = assemble ? JSON.parse(assemble) : {};
  // console.log(assembleOne);

  const typdata = caterf ? caterf.types : [];

  // console.log(typdata)
  const typKaObj = typ ? JSON.parse(typ) : {};
  // console.log(city);
  ////////////////////

  

  useEffect(() => {
    dispatch(getProductDAta(dataMain, yourConfig));
    dispatch(getInProgressDAta(dataMain, yourConfig));
    dispatch(getSolvedDAta(dataMain, yourConfig));
    dispatch(getOnHoldDAta(dataMain, yourConfig));
    dispatch(getQueueDAta(dataMain, yourConfig));
    dispatch(getStatusUpdateDAta(dataMain, yourConfig));
    dispatch(getCategoriesData(yourConfig));
    dispatch(getAssembliesData(yourConfig));
   
  }, [JWTToken]);

  const [bgun, setBgun] = useState(true);
  const [bgInprog, setInprog] = useState(false);
  const [bgSolve, setSolve] = useState(false);
  const [bgOnhold, setOnhold] = useState(false);
  const [bgQueue, setQueue] = useState(false);
  const [bgStatus, setStatus] = useState(false);
  const Styledcomp = {
    border: "1px solid red",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    color: "white",
  };

  const handleUnsolved = () => {
    setBgun(true);
    setStatus(false);
    setOnhold(false);
    setQueue(false);
    setInprog(false);
    setSolve(false);
  };

  const handleInprogress = () => {
    setInprog(true);
    setBgun(false);
    setStatus(false);
    setOnhold(false);
    setQueue(false);
    setSolve(false);
  };
  const handleSolved = () => {
    setSolve(true);
    setBgun(false);
    setStatus(false);
    setOnhold(false);
    setQueue(false);
    setInprog(false);
  };
  const handleOnHold = () => {
    setOnhold(true);
    setBgun(false);
    setSolve(false);
    setStatus(false);
    setQueue(false);
    setInprog(false);
  };
  const handleQueue = () => {
    setQueue(true);
    setBgun(false);
    setSolve(false);
    setOnhold(false);
    setStatus(false);
    setInprog(false);
  };
  const handleStatus = () => {
    setStatus(true);
    setBgun(false);
    setSolve(false);
    setOnhold(false);
    setQueue(false);
    setInprog(false);
  };
  console.log(bgun);


  return (
    
      <div
        style={{
          width: "100%",
          // border:"2px solid red",
          padding:"10px",
          marginTop:"15px",
          maxHeight:"380px",
          overflowY:"auto",
          // height: "345px",
          
        }}
      >       <div
          style={{
            width: "95.5%",
            margin: "auto",
            float:"left",
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            // marginTop: "-41px",
          }}
        >
          <Tabs variant={"soft-rounded"} colorScheme="white">
            <TabList gap={"2"} marginLeft={"16.5px"}>
              <Tab
                style={{
                  border: "1px solid black",
                  borderRadius: "8px",
                  
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={handleUnsolved}
              >
                <Text color={bgun ? "white" : "gray"}>
                  Unsolved({products[1] ? products[1] : ""})
                </Text>
              </Tab>
              <Tab
                display={"flex"}
                border={"1px solid gray"}
                borderRadius={"8px"}
                flexDirection={"column"}
                onClick={handleInprogress}
              >
                <Text color={bgInprog ? "white" : "gray"}>
                  {" "}
                  In-Progress({inprogressdata[1] ? inprogressdata[1] : 0})
                </Text>
              </Tab>
              <Tab
                display={"flex"}
                border={"1px solid black"}
                borderRadius={"10px"}
                flexDirection={"column"}
                onClick={handleSolved}
              >
                <Text color={bgSolve ? "white" : "gray"}>
                  {" "}
                  Solved({solvedata[1] ? solvedata[1] : 0})
                </Text>
              </Tab>
              <Tab
                display={"flex"}
                border={"1px solid gray"}
                borderRadius={"8px"}
                flexDirection={"column"}
                onClick={handleOnHold}
              >
                <Text color={bgOnhold ? "white" : "gray"}>
                  {" "}
                  On-Hold({onholddata[1] ? onholddata[1] : 0})
                </Text>
              </Tab>
              <Tab
                display={"flex"}
                border={"1px solid gray"}
                borderRadius={"8px"}
                flexDirection={"column"}
                onClick={handleQueue}
              >
                <Text color={bgQueue ? "white" : "gray"}>
                  Queue({queuedata[1] ? queuedata[1] : 0})
                </Text>
              </Tab>
              <Tab
                display={"flex"}
                border={"1px solid gray"}
                borderRadius={"8px"}
                flexDirection={"column"}
                onClick={handleStatus}
              >
                <Text color={bgStatus ? "white" : "gray"}>
                  Status Update({statusupdatedata[1] ? statusupdatedata[1] : 0}
                  )
                </Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    marginTop: "-15.5px",
                    // marginLeft: "30px",

                    border: "3px solid black",
                    backgroundColor: "#f5f6fa",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      alignContent: "center",

                      justifyContent: "center",
                    }}
                  >
                    <table
                      style={{
                        width: "95%",
                        display: "table",
                        padding: "10px",
                        // alignItems: "center",
                        verticalAlign: "middle",
                        // justifyContent: "center",
                        borderColor: "inherit",
                        borderCollapse: "collapse",
                        margin: "auto",
                      }}
                    >
                      <thead
                        className="ui-table-thead"
                        style={{
                          borderSpacing: "45px",
                          display: "table",
                          width: "100%",
                          padding: "10px",
                          height: "50px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr
                          style={
                            {
                              // background:"gray",
                            }
                          }
                          _ngcontent-rcy-c20=""
                          className="ng-star-inserted"
                        >
                          <th
                            _ngcontent-rcy-c20=""
                            className="widthTwo ng-star-inserted"
                          >
                            {" "}
                            &nbsp;{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Token Number{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Category{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Registered By{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Assembly, Locality : Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complainer{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Created Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Actions{" "}
                          </th>
                        </tr>
                      </thead>
                      {mainData?.length == 0 ? (
                        "No data available"
                      ) : (
                        <tbody
                          style={{
                            width: "100%",
                            padding: "20px",
                            height: "50px",

                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                          }}
                        >
                          {mainData?.length > 0 &&
                            mainData?.reverse().map((item) => {
                              return (
                                <TableList
                                  key={item.id}
                                  {...item}
                                  hnadleDelete={hnadleDelete}
                                  hnadleComment={hnadleComment}
                                />
                              );
                            })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    border: "3px solid black",
                    backgroundColor: "#f5f6fa",
                    marginTop: "-15.5px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      alignContent: "center",

                      justifyContent: "center",
                    }}
                  >
                    <table
                      style={{
                        width: "95%",
                        display: "table",
                        padding: "10px",
                        // alignItems: "center",
                        verticalAlign: "middle",
                        // justifyContent: "center",
                        borderColor: "inherit",
                        borderCollapse: "collapse",
                        margin: "auto",
                      }}
                    >
                      <thead
                        className="ui-table-thead"
                        style={{
                          borderSpacing: "45px",
                          display: "table",
                          width: "100%",
                          padding: "10px",
                          height: "50px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr
                          style={
                            {
                              // background:"gray",
                            }
                          }
                          _ngcontent-rcy-c20=""
                          className="ng-star-inserted"
                        >
                          <th
                            _ngcontent-rcy-c20=""
                            className="widthTwo ng-star-inserted"
                          >
                            {" "}
                            &nbsp;{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Token Number{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Category{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Registered By{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Assembly, Locality : Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complainer{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Created Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Actions{" "}
                          </th>
                        </tr>
                      </thead>
                      {inprogressdata[0]?.length == 0 ? (
                        "No data available"
                      ) : (
                        <tbody
                          style={{
                            width: "100%",
                            padding: "20px",
                            height: "50px",

                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                          }}
                        >
                          {inprogressdata[0]?.length > 0 &&
                            inprogressdata[0]?.map((item) => {
                              return (
                                <TableList
                                  key={item.id}
                                  {...item}
                                  hnadleDelete={hnadleDelete}
                                  hnadleComment={hnadleComment}
                                />
                              );
                            })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    border: "3px solid black",
                    backgroundColor: "#f5f6fa",
                    marginTop: "-15.5px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      alignContent: "center",

                      justifyContent: "center",
                    }}
                  >
                    <table
                      style={{
                        width: "95%",
                        display: "table",
                        padding: "10px",
                        // alignItems: "center",
                        verticalAlign: "middle",
                        // justifyContent: "center",
                        borderColor: "inherit",
                        borderCollapse: "collapse",
                        margin: "auto",
                      }}
                    >
                      <thead
                        className="ui-table-thead"
                        style={{
                          borderSpacing: "45px",
                          display: "table",
                          width: "100%",
                          padding: "10px",
                          height: "50px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr
                          style={
                            {
                              // background:"gray",
                            }
                          }
                          _ngcontent-rcy-c20=""
                          className="ng-star-inserted"
                        >
                          <th
                            _ngcontent-rcy-c20=""
                            className="widthTwo ng-star-inserted"
                          >
                            {" "}
                            &nbsp;{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Token Number{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Category{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Registered By{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Assembly, Locality : Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complainer{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Created Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Actions{" "}
                          </th>
                        </tr>
                      </thead>
                      {solvedata[0]?.length == 0 ? (
                        "No data available"
                      ) : (
                        <tbody
                          style={{
                            width: "100%",
                            padding: "20px",
                            height: "50px",

                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                          }}
                        >
                          {solvedata[0]?.length > 0 &&
                            solvedata[0]?.map((item) => {
                              return (
                                <TableList
                                  key={item.id}
                                  {...item}
                                  hnadleDelete={hnadleDelete}
                                  hnadleComment={hnadleComment}
                                />
                              );
                            })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    border: "3px solid black",
                    backgroundColor: "#f5f6fa",
                    marginTop: "-15.5px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      alignContent: "center",

                      justifyContent: "center",
                    }}
                  >
                    <table
                      style={{
                        width: "95%",
                        display: "table",
                        padding: "10px",
                        // alignItems: "center",
                        verticalAlign: "middle",
                        // justifyContent: "center",
                        borderColor: "inherit",
                        borderCollapse: "collapse",
                        margin: "auto",
                      }}
                    >
                      <thead
                        className="ui-table-thead"
                        style={{
                          borderSpacing: "45px",
                          display: "table",
                          width: "100%",
                          padding: "10px",
                          height: "50px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr
                          style={
                            {
                              // background:"gray",
                            }
                          }
                          _ngcontent-rcy-c20=""
                          className="ng-star-inserted"
                        >
                          <th
                            _ngcontent-rcy-c20=""
                            className="widthTwo ng-star-inserted"
                          >
                            {" "}
                            &nbsp;{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Token Number{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Category{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Registered By{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Assembly, Locality : Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complainer{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Created Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Actions{" "}
                          </th>
                        </tr>
                      </thead>
                      {onholddata[0]?.length == 0 ? (
                        "No data available"
                      ) : (
                        <tbody
                          style={{
                            width: "100%",
                            padding: "20px",
                            height: "50px",

                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                          }}
                        >
                          {onholddata[0]?.length > 0 &&
                            onholddata[0]?.map((item) => {
                              return (
                                <TableList
                                  key={item.id}
                                  {...item}
                                  hnadleDelete={hnadleDelete}
                                  hnadleComment={hnadleComment}
                                />
                              );
                            })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    border: "3px solid black",
                    backgroundColor: "#f5f6fa",
                    marginTop: "-15.5px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      alignContent: "center",

                      justifyContent: "center",
                    }}
                  >
                    <table
                      style={{
                        width: "95%",
                        display: "table",
                        padding: "10px",
                        // alignItems: "center",
                        verticalAlign: "middle",
                        // justifyContent: "center",
                        borderColor: "inherit",
                        borderCollapse: "collapse",
                        margin: "auto",
                      }}
                    >
                      <thead
                        className="ui-table-thead"
                        style={{
                          borderSpacing: "45px",
                          display: "table",
                          width: "100%",
                          padding: "10px",
                          height: "50px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr
                          style={
                            {
                              // background:"gray",
                            }
                          }
                          _ngcontent-rcy-c20=""
                          className="ng-star-inserted"
                        >
                          <th
                            _ngcontent-rcy-c20=""
                            className="widthTwo ng-star-inserted"
                          >
                            {" "}
                            &nbsp;{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Token Number{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Category{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Registered By{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Assembly, Locality : Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complainer{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Created Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Actions{" "}
                          </th>
                        </tr>
                      </thead>
                      {queuedata[0]?.length == 0 ? (
                        "No data available"
                      ) : (
                        <tbody
                          style={{
                            width: "100%",
                            padding: "20px",
                            height: "50px",

                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                          }}
                        >
                          {queuedata[0]?.length > 0 &&
                            queuedata[0]?.map((item) => {
                              return (
                                <TableList
                                  key={item.id}
                                  {...item}
                                  hnadleDelete={hnadleDelete}
                                  hnadleComment={hnadleComment}
                                />
                              );
                            })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    border: "3px solid black",
                    backgroundColor: "#f5f6fa",
                    marginTop: "-15.5px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      alignItems: "center",
                      alignContent: "center",

                      justifyContent: "center",
                    }}
                  >
                    <table
                      style={{
                        width: "95%",
                        display: "table",
                        padding: "10px",
                        // alignItems: "center",
                        verticalAlign: "middle",
                        // justifyContent: "center",
                        borderColor: "inherit",
                        borderCollapse: "collapse",
                        margin: "auto",
                      }}
                    >
                      <thead
                        className="ui-table-thead"
                        style={{
                          borderSpacing: "45px",
                          display: "table",
                          width: "100%",
                          padding: "10px",
                          height: "50px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr
                          style={
                            {
                              // background:"gray",
                            }
                          }
                          _ngcontent-rcy-c20=""
                          className="ng-star-inserted"
                        >
                          <th
                            _ngcontent-rcy-c20=""
                            className="widthTwo ng-star-inserted"
                          >
                            {" "}
                            &nbsp;{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Token Number{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Category{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Registered By{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Assembly, Locality : Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complainer{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaint Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Created Date{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Actions{" "}
                          </th>
                        </tr>
                      </thead>
                      {statusupdatedata[0]?.length == 0 ? (
                        "No data available"
                      ) : (
                        <tbody
                          style={{
                            width: "100%",
                            padding: "20px",
                            height: "50px",

                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                          }}
                        >
                          {statusupdatedata[0]?.length > 0 &&
                            statusupdatedata[0]?.map((item) => {
                              return (
                                <TableList
                                  key={item.id}
                                  {...item}
                                  hnadleDelete={hnadleDelete}
                                  hnadleComment={hnadleComment}
                                />
                              );
                            })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    
  );
};

export default Complaincard;
