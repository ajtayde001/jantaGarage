import React, { useEffect, useRef, useState } from "react";
import {
  getFilterVisiters,
  getMasterVisitors,
  getVisiters,
} from "../redux/productReducer.js/action";
import { useDispatch, useSelector } from "react-redux";
import { FcFilledFilter } from "react-icons/fc";
import { FaDownload } from "react-icons/fa";
import { read, utils, writeFile } from "xlsx";
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
import VisitorsTable from "../components/VisitorsTable";

const mainObj = {
  dateFrom: "",
  dateTo: "",
   page: { number: 0, size: 10 },
  priority: "",
 
 
  
};
const cityData = {
  label: "",
  value: "",
};
const Visitorspage = () => {
  const {
    serchMainData,
    mastervisit,
    visitors,
    purposevisitor
  } = useSelector((store) => store.productReducer);
console.log(purposevisitor)
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();
  const [mainpage, setPage] = useState(0);
  const [mainsize, setPagesize] = useState(10);
  const [searchdata, setSearchdata] = useState("");
  const [mainID, setID] = useState(10);
  const [vote, setVote] = useState(false);
  const initRef = useRef();
  const [mainData1, setMainData1] = useState(mainObj);
  const [city, setCity] = useState(cityData);
  const [gen, setgenData] = useState("");

  const [userSarch, setUserSearch] = useState("");
  const [assemble, setassembleData] = useState(null);
  const [typ, setTypData] = useState("");
  console.log(typ)

  const nest = () => {
    setPage(mainpage + 1);
  };
  const prev = () => {
    setPage(mainpage - 1);
  };
  let dataMain = {
    page: { number: mainpage, size: mainsize },
    purpose: {
      label: "General Visit",
      value: "GENERAL_VISIT",
    },
  };
  
  const JWTToken = localStorage.getItem("token");
  const yourConfig = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",

      Authorization: `Bearer ${JWTToken}`,
    },
  };


  const handleComp = (e) => {
    const { name, value } = e.target;

    setMainData1((pre) => {
      return { ...pre, [name]: value };
    });
   
  };
 console.log(mainData1)
 console.log(gen)
  const handleCity = (e) => {
    const { name, value } = e.target;
    setCity((pre) => {
      return { ...pre, [name]: value };
    });
  };

  if (city.value == "CITY") {
    city.label = "City";
  }

  const mainData = []
 

  const handleExport = () => {
    const obj = mainData?.length > 0 ? mainData[0] : {};

    const array = [];
    const array2 = [];
    const array3 = [];
    for (let key in obj) {
      array.push(key);
      if (Object.keys(key).length > 0) {
        for (let key1 in obj[key]) {
          array.push(key1);
        }
      }
    }
    // console.log(array)
    for (let i = 0; i < array.length; i++) {
      if (array[i] >= 0) {
        array2.push(array[i]);
      } else {
        array3.push(array[i]);
      }
    }
    // console.log(array3)
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, [array3]);
    utils.sheet_add_json(ws, mainData, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Complaint Report.xlsx");
  };

  const hnadleSearch = (e) => {
    e.preventDefault();
    const pros = {
      search: searchdata,
      priority: "",
      dateFrom: "",
      dateTo: "",
      kiosk: false,
      page: { number: 0, size: mainsize },
      flag: null,
    };
    dispatch(getMasterVisitors(pros, yourConfig));
    dispatch(getVisiters(pros, yourConfig));
    
  };

  // const caterf = cat ? JSON.parse(cat) : {};

  const assembleOne = assemble ? JSON.parse(assemble) : {};

  const typdata = [];

  const typKaObj = typ ? JSON.parse(typ) : {};
   
  console.log(typKaObj)
  

  const handleFilter = () => {
   
    if (Object.keys(typKaObj).length > 0) {
      mainData1.purposeCategory={
        label: "General Visit",
        value: "GENERAL_VISIT"
    }
      mainData1.purposeId = typKaObj.id;
    }

     console.log(mainData1)
    
    dispatch(getMasterVisitors(mainData1, yourConfig));
    dispatch(getVisiters(mainData1, yourConfig));
  };

  useEffect(() => {
    dispatch(getMasterVisitors(dataMain, yourConfig));
    dispatch(getVisiters(dataMain, yourConfig));
    dispatch(getFilterVisiters(dataMain, yourConfig));
    
  }, [JWTToken]);

  const [bgun, setBgun] = useState(true);
  const [bgInprog, setInprog] = useState(false);

  const handleUnsolved = () => {
    setBgun(true);
    setInprog(false);
    setHide(false);
  };

  const handleInprogress = () => {
    setInprog(true);
    setBgun(false);
    setHide(true);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "2800px",
          margin: "auto",
          // border: "2px solid blue",
          marginBottom: "100px",
          marginTop: "50px",
          backgroundImage: `url("https://staging.digitaloms.in/Image6.e195202fd0acbdc8b0f9.png")`,
          opacity: "10",
        }}
      >
        <div
          style={{
            width: "95%",
            height: "50px",
            margin: "auto",
            marginTop: "10px",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              fontSize: "1.2em",
              color: "#43425d",
              fontWeight: "400",
              margin: "10px",
            }}
          >
            Visitors
          </h3>
          <div>
            <button
              classNameName="btn"
              style={{
                width: "60px",
                height: "35px",
                color: "#000",
                backgroundColor: "#ffda83",
                border: "1px solid #ffda83",
                borderRadius: "5px",
              }}
            >
              <Link to={"/complaint/add"}>Add</Link>
            </button>
          </div>
        </div>
        {/* {for saecrh} */}
        <div
          style={{
            // border: "2px solid green",
            width: "95.5%",
            height: "100px",
            margin: "auto",
            backgroundColor: "white",

            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <div
            style={{
              float: "right",
              width: "400px",
              height: "50px",

              marginTop: "10px",
              marginRight: "40px",
              // border: "2px solid green",
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              classNameName="btn"
              style={{
                display: "flex",
                width: "80px",
                height: "30px",
                padding: "5px",
                color: "#000",
                backgroundColor: "#ffda83",
                border: "1px solid #ffda83",
                borderRadius: "5px",
              }}
              onClick={handleExport}
            >
              <FaDownload></FaDownload>{" "}
              <h6
                style={{
                  marginLeft: "10px",
                  marginBottom: "1px",
                }}
              >
                Excel
              </h6>
            </button>

            <div className="container">
              <form className="form">
                <input
                  className="input"
                  type="search"
                  placeholder="Search..."
                  value={searchdata}
                  onChange={(e) => {
                    setSearchdata(e.target.value);
                  }}
                />
                <button
                  className="sarchbtn"
                  type="submit"
                  onClick={(e) => {
                    hnadleSearch(e);
                  }}
                >
                  Search
                </button>
              </form>
            </div>
            <div
              style={{
                border: "1px solid gray",
                // padding: "2px",
              }}
            >
              <Popover
                size={"max"}
                closeOnBlur={false}
                placement="bottom"
                initialFocusRef={initRef}
              >
                {({ isOpen, onClose }) => (
                  <>
                    <PopoverTrigger>
                      <Button>
                        {" "}
                        <FcFilledFilter size={25}></FcFilledFilter>
                      </Button>
                    </PopoverTrigger>

                    <Portal size={"max"}>
                      <PopoverContent
                        boxShadow={
                          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                        }
                        w="400px"
                        h="380px"
                        marginRight={"40px"}
                      >
                        <PopoverArrow />
                        <PopoverHeader>Filter</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody size={"max"}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "20px",
                              padding: "10px",
                              borderBottom: "1px dotted gray",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  width: "100%",
                                  // display: "flex",
                                  flexDirection: "karyaKartaData",
                                  justifyContent: "space-between",
                                  gap: "20px",
                                }}
                              >
                                {!hide ? (
                                  <div>
                                    <div>
                                      <h3>Gender</h3>
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "80.2%",
                                        }}
                                      >
                                        <div
                                          className="Background"
                                          style={{
                                            display: "flex",
                                            border: "1px solid grey",
                                          }}
                                          onClick={(e)=>{
                                            
                                            mainData1.gender="MALE"
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "35px",
                                              borderRadius: "20px",
                                              padding: "5px",
                                            }}
                                            src="https://staging.digitaloms.in/assets/icons/man@2x.png"
                                            alt=""
                                          />
                                          <button
                                            style={{ marginRight: "5px" }}

                                          >
                                            Male
                                          </button>
                                        </div>

                                        <div
                                          className="Background"
                                          style={{
                                            display: "flex",
                                            border: "1px solid grey",
                                          }}
                                          onClick={(e)=>{
                                            
                                            mainData1.gender="FEMALE"
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "35px",
                                              borderRadius: "20px",
                                              padding: "5px",
                                            }}
                                            src="https://staging.digitaloms.in/assets/icons/woman@2x.png"
                                            alt=""
                                          />
                                          <button
                                            style={{ marginRight: "5px" }}
                                          >
                                            Female
                                          </button>
                                        </div>
                                        <div
                                          className="Background"
                                          style={{
                                            display: "flex",
                                            border: "1px solid grey",
                                          }}
                                          onClick={(e)=>{
                                            
                                            mainData1.gender="OTHER"
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "35px",
                                              borderRadius: "20px",
                                              padding: "5px",
                                            }}
                                            src="https://staging.digitaloms.in/assets/icons/other.png"
                                            alt=""
                                          />
                                          <button
                                            style={{ marginRight: "5px" }}
                                          >
                                            Other
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                      <h3>Is Voter</h3>
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "100%",
                                        }}
                                      >
                                        <div
                                          className="Background"
                                          style={{
                                            display: "flex",
                                            border: "1px solid grey",
                                          }}
                                          onClick={(e)=>{
                                           
                                            mainData1.isVoter=true
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "22.5px",
                                              borderRadius: "20px",
                                              padding: "5px",
                                            }}
                                            src="https://staging.digitaloms.in/assets/icons/isVoter.svg"
                                            alt=""
                                          />
                                          <button
                                            style={{ marginRight: "5px" }}
                                          >
                                            Our Voter
                                          </button>
                                        </div>

                                        <div
                                          className="Background"
                                          style={{
                                            display: "flex",
                                            border: "1px solid grey",
                                          }}
                                          onClick={(e)=>{
                                           
                                            mainData1.isVoter=false
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "22.5px",
                                              borderRadius: "20px",
                                              padding: "5px",
                                            }}
                                            src="https://staging.digitaloms.in/assets/icons/isVoterred.svg"
                                            alt=""
                                          />
                                          <button
                                            style={{ marginRight: "5px" }}
                                          >
                                            Non Voter
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div>
                                      <h3>Gender</h3>
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "80.2%",
                                        }}
                                      >
                                        <div
                                          className="Background"
                                          style={{
                                            display: "flex",
                                            border: "1px solid grey",
                                          }}
                                          onClick={(e)=>{
                                            
                                            mainData1.gender="MALE"
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "35px",
                                              borderRadius: "20px",
                                              padding: "5px",
                                            }}
                                            src="https://staging.digitaloms.in/assets/icons/man@2x.png"
                                            alt=""
                                          />
                                          <button
                                            style={{ marginRight: "5px" }}
                                          >
                                            Male
                                          </button>
                                        </div>

                                        <div
                                          className="Background"
                                          style={{
                                            display: "flex",
                                            border: "1px solid grey",
                                          }}
                                          onClick={(e)=>{
                                           
                                            mainData1.gender="FEMALE"
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "35px",
                                              borderRadius: "20px",
                                              padding: "5px",
                                            }}
                                            src="https://staging.digitaloms.in/assets/icons/woman@2x.png"
                                            alt=""
                                          />
                                          <button
                                            style={{ marginRight: "5px" }}
                                          >
                                            Female
                                          </button>
                                        </div>
                                        <div
                                          className="Background"
                                          style={{
                                            display: "flex",
                                            border: "1px solid grey",
                                          }}
                                          onClick={(e)=>{
                                            
                                            mainData1.gender="OTHER"
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "35px",
                                              borderRadius: "20px",
                                              padding: "5px",
                                            }}
                                            src="https://staging.digitaloms.in/assets/icons/other.png"
                                            alt=""
                                          />
                                          <button
                                            style={{ marginRight: "5px" }}
                                          >
                                            Other
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                      <h3>Is Voter</h3>
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "100%",
                                        }}
                                      >
                                        <div
                                          className="Background"
                                          style={{
                                            display: "flex",
                                            border: "1px solid grey",
                                          }}
                                          onClick={(e)=>{
                                           
                                            mainData1.isVoter=true
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "22.5px",
                                              borderRadius: "20px",
                                              padding: "5px",
                                            }}
                                            src="https://staging.digitaloms.in/assets/icons/isVoter.svg"
                                            alt=""
                                          />
                                          <button
                                            style={{ marginRight: "5px" }}
                                          >
                                            Our Voter
                                          </button>
                                        </div>

                                        <div
                                          className="Background"
                                          style={{
                                            display: "flex",
                                            border: "1px solid grey",
                                          }}
                                          onClick={(e)=>{
                                            
                                            mainData1.isVoter=false
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "22.5px",
                                              borderRadius: "20px",
                                              padding: "5px",
                                            }}
                                            src="https://staging.digitaloms.in/assets/icons/isVoterred.svg"
                                            alt=""
                                          />
                                          <button
                                            style={{ marginRight: "5px" }}
                                          >
                                            Non Voter
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "20px",
                                        margin: "auto",
                                      }}
                                    >
                                      <div style={{ width: "40%" }}>
                                        <label style={{ float: "left" }}>
                                          Priority
                                        </label>
                                        <br />
                                        <select
                                          placeholder="select"
                                          name="priority"
                                          value={mainData1.priority}
                                          onChange={(e) => {
                                            handleComp(e);
                                          }}
                                          style={{
                                            width: "100%",
                                            height: "34px",
                                            border: "0.5px solid gray",
                                            borderRadius: "3px",
                                            fontSize: "14px",
                                            textAlign: "center",
                                          }}
                                         
                                        >
                                          <option
                                           
                                          >
                                            {"Select One"}
                                          </option>
                                          <option
                                            value="VIP"
                                            // placeholder="select "
                                          >
                                            {"VIP"}
                                          </option>
                                          <option
                                            value="IMPORTANT"
                                            // placeholder="select "
                                          >
                                            {"IMPORTANT"}
                                          </option>
                                          <option
                                            value="REGULAR"
                                            // placeholder="select "
                                          >
                                            {"Regular"}
                                          </option>
                                         
                                        </select>
                                        <br />

                                        <label style={{ float: "left" }}>
                                          From
                                        </label>
                                        <br />
                                        <input
                                          style={{
                                            width: "100%",
                                            height: "34px",
                                            border: "0.5px solid gray",
                                            borderRadius: "3px",
                                            fontSize: "14px",
                                            textAlign: "center",
                                          }}
                                          type="date"
                                          placeholder="DD/MM/YYYY"
                                          value={mainData1.dateFrom}
                                          name="dateFrom"
                                          onChange={(e) => {
                                            handleComp(e);
                                          }}
                                        />
                                      </div>

                                      <div style={{ width: "40%" }}>
                                        <label style={{ float: "left" }}>
                                          Visit Purpose
                                        </label>
                                        <br />
                                        <select
                                          placeholder="select"
                                          value={typ}
                                          onChange={(e) => {
                                            setTypData(e.target.value);
                                            console.log(typ)
                                          }}
                                          style={{
                                            width: "100%",
                                            height: "34px",
                                            border: "0.5px solid gray",
                                            borderRadius: "3px",
                                            fontSize: "14px",
                                            textAlign: "center",
                                          }}
                                        >
                                         <option value="" placeholder="select ">
                                      {"Select One"}
                                    </option>
                                    {purposevisitor?.length > 0 &&
                                      purposevisitor[0]?.map((item) => {
                                        return (
                                          <option
                                            value={JSON.stringify(item)}
                                            placeholder="select "
                                          >
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                          
                                        </select>
                                        <br />
                                        <label style={{ float: "left" }}>
                                          To
                                        </label>
                                        <br />
                                        <input
                                          style={{
                                            width: "100%",
                                            height: "34px",
                                            border: "0.5px solid gray",
                                            borderRadius: "3px",
                                            fontSize: "14px",
                                            textAlign: "center",
                                          }}
                                          type="date"
                                          placeholder="DD/MM/YYYY"
                                          value={mainData1.dateTo}
                                          name="dateTo"
                                          onChange={(e) => {
                                            handleComp(e);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            mt={4}
                            bg={"#ffda83"}
                            // colorScheme='#ffda83'

                            ref={initRef}
                            marginBottom={"25px"}
                            onClick={() => {
                              handleFilter();
                              onClose();
                            }}
                          >
                            Submit
                          </Button>
                          <Button
                            marginLeft={"25px"}
                            marginBottom={"25px"}
                            mt={4}
                            colorScheme="blue"
                            onClick={onClose}
                            ref={initRef}
                          >
                            Close
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "95.5%",
            margin: "auto",
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            marginTop: "-41px",
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
                  MasterData({mastervisit[1] ? mastervisit[1] : ""})
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
                  Visits({visitors[1] ? visitors[1] : 0})
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
                            Name{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Mobile Number{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Identity Card No.{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Local Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Assembly Address{" "}
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
                      {mastervisit[0]?.length == 0 ? (
                        "No data available"
                      ) : (
                        <tbody
                          style={{
                            width: "100%",
                            padding: "20px",
                            height: "20px",

                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                          }}
                        >
                          {mastervisit[0]?.length > 0 &&
                            mastervisit[0]?.reverse().map((item) => {
                              return <VisitorsTable key={item.id} {...item} />;
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
                            Name{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Mobile Number{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Priority{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Local Address{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Visit Purpose{" "}
                          </th>
                          <th
                            _ngcontent-rcy-c20=""
                            className="ng-star-inserted"
                          >
                            {" "}
                            Visited date{" "}
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
                      {visitors[0]?.length == 0 ? (
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
                          {visitors[0]?.length > 0 &&
                            visitors[0]?.map((item) => {
                              return <VisitorsTable key={item.id} {...item} />;
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

        <div
          style={{
            float: "right",
            width: "400px",
            height: "50px",
            marginBottom: "100px",
            marginTop: "10px",
            marginRight: "40px",
            // border: "2px solid green",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            className="page"
            style={{
              width: "50px",
              height: "40px",
              border: "2px solid black",
              background: "white",
            }}
            onClick={prev}
          >
            <GrFormPrevious size={25}></GrFormPrevious>
          </button>
          <button
            className="page"
            style={{
              width: "100px",
              height: "40px",
              border: "2px solid black",
              background: "white",
              cursor: "pointer",
              //  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            // onClick={() => setPage(mainpage - 1)}
          >
            {`Page  ${mainpage}`}
          </button>
          <button
            className="page"
            style={{
              width: "50px",
              height: "40px",
              border: "2px solid black",
              background: "white",
            }}
            onClick={nest}
          >
            <IoIosArrowForward size={20}></IoIosArrowForward>
          </button>

          <select
            className="page"
            style={{
              width: "80px",
              height: "40px",
              border: "2px solid black",
              background: "white",
            }}
            value={mainsize}
            onChange={(e) => {
              setPagesize(Number(e.target.value));
            }}
            name="size"
            id="cars"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <br />
        <br />
        <div
          style={{
            float: "right",
            width: "500px",
            height: "100px",
            marginBottom: "100px",
            marginTop: "10px",
            marginRight: "40px",
          }}
        ></div>
      </div>
    </>
  );
};

export default Visitorspage;
