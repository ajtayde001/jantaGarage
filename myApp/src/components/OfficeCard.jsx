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
import OfficeTable from "./OfficeTable";

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
const Officecard = () => {
  const {
    
    officedata
  } = useSelector((store) => store.productReducer);
  // console.log(officedata[0].InProgress);
  const [total,setTotal]=useState(0)
  const dispatch = useDispatch();
  const [mainpage, setPage] = useState(0);
  const [mainsize, setPagesize] = useState(1);
  ;
  const nest = () => {
    setPage(mainpage + 1);
  };
  const prev = () => {
    setPage(mainpage - 1);
  };
 

  const mainData = officedata&&officedata.length>0 ? officedata : [];
  // console.log(mainData);
  


  return (
    
      <div
        style={{
          width: "100%",
          // border:"2px solid red",
          padding:"10px",
          marginTop:"15px",
          // maxHeight:"300px",
          // overflowY:"auto"
          height: "345px",
          
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
            </TabList>
            <TabPanels>
              <TabPanel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "95%",
                    marginTop: "-15.5px",
                    // marginLeft: "30px",
                      // height:"600px",
                    // border: "3px solid black",
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
                          _ngcontent-rcy-c20=""
                          className="ng-star-inserted"
                        >
                            <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                          </th>
                          
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Office Name{" "}
                          </th>
                          
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Admin{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Complaints {" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Karykrtas {" "}
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
                            mainData?.map((item,index) => {
                                if(index<=3){
                                    return (
                                        <OfficeTable
                                          key={item.id}
                                          {...item}
                                         
                                        />
                                      );
                                }
                              
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

export default Officecard;
