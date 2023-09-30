import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
  Switch,
  FormLabel,
  FormControl,
  Flex,
  Text,
  expandedIndex,
  Center,
  useStatStyles,
  Stack,
} from "@chakra-ui/react";

import { BsCircle } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import {
  BsSquare,
  BsFillCheckSquareFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { AiTwotoneCheckCircle } from "react-icons/ai";
// import { ImHome } from "react-icons/im";
import { BiSolidUser, BiSolidUserPlus } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
// import { BsSquare } from "react-icons/bs";
import { ImHome } from "react-icons/im";

import TableList from "../components/TableList";
import photo from "../Photos/officeSystem.webp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdhikariDAta,
  getAssembliesData,
  getCategoriesData,
  getKarykrtaDAta,
  getUserSearchDAta,
  postCOMPLAINERdata,
  postCOMPLANTdata,
} from "../redux/productReducer.js/action";
import { Link } from "react-router-dom";

const IntialValue = {
  extraFields: {},
  addressFields: {},
  firstName: "",
  lastName: "",
  gender: "",
  phone: "",
  middleName: "",
  rationCard: null,
  cityType: null,
};

const addresObj = {
  flatNo: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: "",
  native: "",
  pincode: "",
};

const castObj = {
  id: 4,
  name: "",
  createdDate: "",
  updatedDate: "",
  createdBy: 0,
  updatedBy: 0,
  subcast: [],
};

const mainObj = {
  address: {
    prabhag: null,
    prabhagArea: null,
    gaon: null,
    gat_number: null,
    gan_number: null,
  },
  assembly: {},
  complainer: {},
  isDirectEntry: true,
  commentCreatedBy: 1,
  actualComplainDate: "",
  complainDueDate: "",
  isAddedByKiosk: false,
  category: {},
  type: {},
  office: 1,
  karyaKarta: [],
  adhikari: [],
  pincode: "",

  cityType: "",
};

function AddPage() {
  const [karyaKartaData, setkaryaKartaData] = useState([]);
  const [sarchkaryaKartaData, srchsetkaryaKartaData] = useState("");
  const [karyaKartaDataicone, setkaryaKartaDataicone] = useState([]);
  // const [searchDataIcon,setSearchDataIcon]=useState

  ///////////////////////////////////////

  const [adhikariData, setadhikariData] = useState([]);
  const [sarchAdhikariData, srchsetAdhikaruData] = useState("");
  const [adhikariDataIcone, setadhikariDataIcone] = useState([]);

  const [srchData, setsrchData] = useState();

  const {
    CategoriesData,
    assembliesData,
    karykarta,
    adhikari,
    complainerSinleData,
    complaintPostData,
    isSubmitted,
    srch,
  } = useSelector((store) => store.productReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getProductDAta(dataMain, yourConfig));
    dispatch(getCategoriesData(yourConfig));
    dispatch(getAssembliesData(yourConfig));
    dispatch(getKarykrtaDAta({}, yourConfig));
    dispatch(getAdhikariDAta({}, yourConfig));
    setsrchData(complainerSinleData);
  }, []);

  // console.log(complainerSinleData)

  const JWTToken = localStorage.getItem("token");
  const yourConfig = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",

      Authorization: `Bearer ${JWTToken}`,
    },
  };
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: docoOpen,
    onOpen: docoOnOpen,
    onClose: docoClose,
  } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [error2,setError2]=useState({})
  // if(isSubmitted){

  // }

  const [data, setData] = useState(IntialValue);
  const [mainData, setMainData] = useState(mainObj);
  const [addssdata, setaddssData] = useState(addresObj);
  const [castdata, setcastData] = useState(castObj);

  /////////////////////////////////////////

  const [cat, setcatData] = useState(null);
  const [userSarch, setUserSearch] = useState("");
  const [assemble, setassembleData] = useState(null);
  const [typ, setTypData] = useState(null);

  console.log(userSarch);

  const [mainKartaDatais, setmainKartaDatais] = useState();
  // console.log(mainKartaDatais);

  const [mainAdhikariDatais, setmainAdhikariDatais] = useState();
  // console.log(mainKartaDatais);

  const handlekaryaKartaData = (id) => {
    const result = mainKartaDatais.find((name) => name.id === id);
    // console.log(result);
    setkaryaKartaData([...karyaKartaData, result]);
    setkaryaKartaDataicone([...karyaKartaDataicone, result.id]);
  };

  const handleReomve = (id) => {
    const result = karyaKartaData.filter((name) => name.id !== id);
    const result1 = karyaKartaDataicone.filter((name) => name !== id);
    setkaryaKartaData([...result]);
    setkaryaKartaDataicone([...result1]);
  };
  ////////////////////////////////////////

  const handleserchKaryakarta = (e) => {
    // e.preventDefault();
    // console.log(e,mainKartaDatais)
    srchsetkaryaKartaData(e);
    let result = mainKartaDatais?.filter((name) => name.firstName.includes(e));
    // console.log(result)
    setmainKartaDatais(result);
  };

  //////////////////////////////////////////////////

  const handleserchAdhikari = (e) => {
    // e.preventDefault();
    srchsetAdhikaruData(e);
    let result = mainAdhikariDatais?.filter((name) =>
      name.firstName.includes(e)
    );

    setmainAdhikariDatais(result);
  };

  ////////////////////////////////////////////////////
  const handleCheckremove = (id) => {
    const result = karyaKartaData.filter((name) => name.id !== id);
    const result1 = karyaKartaDataicone.filter((name) => name !== id);
    // console.log(result)
    setkaryaKartaData([...result]);
    setkaryaKartaDataicone([...result1]);
  };

  //for Adhikari

  const handleAdhikarikaryaKartaData = (id) => {
    const result = mainAdhikariDatais.find((name) => name.id === id);
    // console.log(result);
    setadhikariData([...adhikariData, result]);
    setadhikariDataIcone([...adhikariDataIcone, result.id]);
  };

  const handleAdhikariReomve = (id) => {
    const result = adhikariData.filter((name) => name.id !== id);
    const result1 = adhikariDataIcone.filter((name) => name !== id);
    setadhikariData([...result]);
    setadhikariDataIcone([...result1]);
  };
  const handleAdhikariCheckremove = (id) => {
    const result = adhikariData.filter((name) => name.id !== id);
    const result1 = adhikariDataIcone.filter((name) => name !== id);
    // console.log(result)
    setadhikariData([...result]);
    setadhikariDataIcone([...result1]);
  };
  //////////////////////////////////////////////

  ///////////////////////////////////////////

  const handleUserSerac1 = (e) => {
    e.preventDefault();
    // setUserSearch(e)
    dispatch(getUserSearchDAta(userSarch, yourConfig));
    //  setUserSearch(null)
  };

  // console.log(srch)
  const [searchIcone, setSearchIcon] = useState(null);

  const handleSarchDataforDisplay = (id) => {
    setSearchIcon(id);
    const result = srch?.filter((name) => name.id == id);
    setsrchData(result[0]);
  };
  // console.log(srchData)

  const handleChange1 = (e) => {
    const { name, value } = e.target;

    setaddssData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSub = (e) => {
    const validationErrors = {};
    if (data.firstName.trim() === "") {
      validationErrors.firstName = "This field is mandatory.";
    }
    if (data.lastName.trim() === "") {
      validationErrors.lastName = "This field is mandatory.";
    }
    if (data.middleName.trim() === "") {
      validationErrors.middleName = "This field is mandatory.";
    }
    if (data.phone.trim() === "") {
      validationErrors.phone = "This field is mandatory.";
    }
    

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    data.addressFields = addssdata;
    data.cast = castdata;
    // console.log(data);
    dispatch(postCOMPLAINERdata(data, yourConfig));
    setsrchData(data);
  };
  console.log(errors);
  console.log(complainerSinleData);

  const hndlecloss=()=>{
    if((Object.keys(complainerSinleData).length>0)){
      onClose()
    }
  }
  // {(Object.keys(complaintPostData).length>0)?onClose()
                                    //   :  onOpen() }
  ////////////////////////
  const caterf = cat ? JSON.parse(cat) : {};
  // console.log(caterf);

  const assembleOne = assemble ? JSON.parse(assemble) : {};
  // console.log(assembleOne);

  const typdata = caterf ? caterf.types : [];

  // console.log(typdata)
  const typKaObj = typ ? JSON.parse(typ) : {};
  // console.log(typKaObj);
  ////////////////////

  const handleComp = (e) => {
    const { name, value } = e.target;

    setMainData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  

 

  const handleCompSub = () => {
    const validationErrors = {};
    if (mainData.description === "") {
      validationErrors.description = "This field is mandatory.";
    }
    // if (mainData?.category.trim() === "") {
    //   validationErrors.category = "This field is mandatory.";
    // }
    if (mainData.pincode === "") {
      validationErrors.pincode = "This field is mandatory.";
    }
    if (mainData.actualComplainDate === "") {
      validationErrors.actualComplainDate = "This field is mandatory.";
    }
    if (mainData.complainDueDate === "") {
      validationErrors.complainDueDate = "This field is mandatory.";
    }
    // if (mainData?.type === "") {
    //   validationErrors.type = "This field is mandatory.";
    // }
    if (mainData.actualComplainDate === "") {
      validationErrors.phone = "This field is mandatory.";
    }
    if (mainData.addressComp === "") {
      validationErrors.addressComp = "This field is mandatory.";
    }
    // if (mainData?.assembly === "") {
    //   validationErrors.assembly = "This field is mandatory.";
    // }
    if (mainData.cityType === "") {
      validationErrors.cityType = "This field is mandatory.";
    }
    

    if (Object.keys(validationErrors).length > 0) {
      setError2(validationErrors);
      return;
    }

    alert("show")
    mainData.assembly = assembleOne;

    mainData.category = caterf;
    mainData.type = typKaObj;
  };
  console.log(error2)
  const handleMainObj = () => {
    mainData.complainer = srchData ? srchData : complainerSinleData;
    mainData.karyaKarta = karyaKartaData;
    mainData.adhikari = adhikariData;

    dispatch(postCOMPLANTdata(mainData, yourConfig));
  };
  /////////////////////
  const [userEditeData, setuserEditeData] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
      return { ...pre, [name]: value };
    });
    setuserEditeData((pre) => {
      return { ...pre, [name]: value };
    });
  };
  
  const handleUserEdit = (id) => {
    const result = srch?.find((name) => name.id == id);
    console.log(result);
    setuserEditeData(result);
  };
  // console.log(userEditeData);
  useEffect(() => {
    setmainKartaDatais(karykarta);

    setmainAdhikariDatais(adhikari);
  }, [karykarta, adhikari, srch]);

  return (
    <div>
      <h2
        style={{
          textAlign: "left",
          marginLeft: "100px",
          fontFamily: "sans-serif",
          color: "#43425D",
          fontSize: "18px",
          marginTop: "20px",
        }}
      >
        New Complain
      </h2>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderLeft: "2px solid green",
          marginLeft: "20px",
        }}
      >
        <div style={{ width: "90%", margin: "auto" }} id="BoxShedow">
          <Accordion allowToggle>
            <AccordionItem style={{ borderRadius: "8px" }}>
              <h2>
                <AccordionButton
                  _expanded={{
                    bg: "#fdc356",
                    color: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    display="flex"
                    gap="10px"
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "grey",
                        borderRadius: "20px",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ color: "white", textAlign: "center" }}>
                        1
                      </span>
                    </div>
                    <p>Complainer Detail</p>
                    <div style={{width:'100%',border:"2px solid red" ,margin:"auto", marginLeft:"20px" ,alignItems:"center" }}>
                    <p>{srchData ? srchData.firstName : ""}</p>
                     <p>{srchData ? srchData.phone : ""}</p>
                    </div>
                  
                  </Box>
                  {/* <AccordionIcon /> */}
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{ width: "50%", display: "flex", gap: "10px" }}
                      >
                        <h2 style={{ fontSize: "20px", fontWeight: "inherit" }}>
                          Search
                        </h2>
                        <div className="container">
                          <form className="form">
                            <input
                              className="input"
                              type="search"
                              placeholder="SearchByName/Phone/Aadhar"
                              value={userSarch}
                              onChange={(e) => {
                                setUserSearch(e.target.value);
                              }}
                            />
                            <button
                              className="sarchbtn"
                              type="submit"
                              onClick={(e) => {
                                handleUserSerac1(e);
                              }}
                            >
                              Search
                            </button>
                          </form>
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <Button
                          style={{
                            width: "80px",
                            height: "35px",
                            color: "#000",
                            backgroundColor: "#fdc356",
                            border: "1px solid #ffda83",
                            borderRadius: "5px",
                          }}
                          onClick={onOpen}
                        >
                          Add New
                        </Button>
                        <Modal
                          isCentered
                          onClose={onClose}
                          isOpen={isOpen}
                          size={"min"}
                          motionPreset="slideInBottom"
                        >
                          <ModalContent
                            w="1350px"
                            h="370px"
                            marginTop={"150px"}
                            id="BoxShedow"
                          >
                            <ModalHeader>New Complainer </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  gap: "20px",
                                  height: "230px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "45%",
                                    display: "flex",
                                    gap: "30%",
                                  }}
                                >
                                  <div style={{ width: "25%" }}>
                                    <label
                                      style={{ float: "left", color: "grey" }}
                                    >
                                      First Name*
                                    </label>
                                    <br />
                                    <input
                                      style={{
                                        // width: "100%",
                                        height: "34px",
                                        border: "0.5px solid gray",
                                        borderRadius: "3px",
                                        fontSize: "14px",
                                        // textAlign: "center",
                                        padding: "5px",
                                        float: "left",
                                      }}
                                      onChange={handleChange}
                                      type="text"
                                      name="firstName"
                                      id=""
                                      value={data.firstName}
                                      placeholder="First Name"
                                    />
                                    {errors.firstName && (
                                      <span
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {errors.firstName}
                                      </span>
                                    )}
                                    <br />
                                    <label
                                      style={{ float: "left", color: "grey" }}
                                    >
                                      Last Name*
                                    </label>
                                    <br />
                                    <input
                                      style={{
                                        width: "100%",
                                        height: "34px",
                                        border: "0.5px solid gray",
                                        borderRadius: "3px",
                                        fontSize: "14px",
                                        // textAlign: "center",
                                        padding: "5px",
                                        float: "left",
                                      }}
                                      onChange={handleChange}
                                      type="text"
                                      name="lastName"
                                      id=""
                                      value={data.lastName}
                                      placeholder="Last Name"
                                    />
                                     {<errors className="las"></errors> && (
                                      <span
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {errors.lastName}
                                      </span>
                                    )}
                                    <br />
                                    <label
                                      style={{ float: "left", color: "grey" }}
                                    >
                                      Mobile Number*
                                    </label>
                                    <br />
                                    <input
                                      style={{
                                        width: "100%",
                                        height: "34px",
                                        border: "0.5px solid gray",
                                        borderRadius: "3px",
                                        fontSize: "14px",
                                        // textAlign: "center",
                                        padding: "5px",
                                        float: "left",
                                      }}
                                      onChange={handleChange}
                                      type="number"
                                      name="phone"
                                      id=""
                                      value={data.phone}
                                      placeholder="Mobile Number"
                                    />
                                     {errors.phone && (
                                      <span
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {errors.phone}
                                      </span>
                                    )}
                                    <br />
                                  </div>
                                  <div style={{ width: "25%" }}>
                                    <label
                                      style={{ float: "left", color: "grey" }}
                                    >
                                      Middle Name*
                                    </label>
                                    <br />
                                    <input
                                      style={{
                                        width: "100%",
                                        height: "34px",
                                        border: "0.5px solid gray",
                                        borderRadius: "3px",
                                        fontSize: "14px",
                                        padding: "5px",
                                        // textAlign: "center",
                                        float: "left",
                                      }}
                                      onChange={handleChange}
                                      type="text"
                                      name="middleName"
                                      id=""
                                      value={data.middleName}
                                      placeholder="Middle Name"
                                    />
                                     {errors.middleName && (
                                      <span
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {errors.middleName}
                                      </span>
                                    )}
                                    <br />

                                    <label
                                      style={{
                                        float: "left",
                                        color: "grey",
                                        marginTop: "5px",
                                      }}
                                    >
                                      Gender*
                                    </label>
                                    <br />
                                    <br />
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        gap: "20px",
                                        borderRadius: "5px",
                                      }}
                                      // name="gender"
                                      // value={data.gender}
                                      // onChange={handleChange}
                                    >
                                      <button
                                        onClick={() => {
                                          data.gender = "MALE";
                                        }}
                                        style={{
                                          width: "150px",
                                          height: "41px",

                                          // borderRadius: "1px",
                                          // border: "1px solid grey",
                                        }}
                                      >
                                        Male
                                      </button>
                                      <button
                                        onClick={() => {
                                          data.gender = "FEMALE";
                                        }}
                                        style={{
                                          width: "150px",
                                          height: "41px",
                                          // borderRadius: "1px",
                                          // border: "1px solid grey",
                                        }}
                                      >
                                        Female
                                      </button>
                                      <button
                                        onClick={() => {
                                          data.gender = "OTHER";
                                        }}
                                        style={{
                                          width: "150px",
                                          height: "41px",
                                          marginBottom: "1px",
                                          // borderRadius: "1px",
                                          // border: "1px solid grey",
                                        }}
                                      >
                                        Other
                                      </button>
                                    </div>

                                    <label
                                      style={{ float: "left", color: "grey" }}
                                    >
                                      Landline Number*
                                    </label>
                                    <br />
                                    <input
                                      style={{
                                        // width: "100%",
                                        height: "34px",
                                        border: "0.5px solid gray",
                                        borderRadius: "3px",
                                        fontSize: "14px",
                                        // textAlign: "center",
                                        float: "left",
                                      }}
                                      onChange={handleChange}
                                      type="number"
                                      name="landline"
                                      id=""
                                      value={data.landline}
                                      placeholder="Landline Number"
                                    />
                                    <br />
                                  </div>
                                </div>
                                <div style={{ width: "55%" }}>
                                  <div
                                    style={{
                                      width: "100%",
                                      borderLeft: "1px solid black",
                                      borderTop: "1px solid black",
                                      borderStyle: "dashed",
                                      // height:"100%",
                                    }}
                                  >
                                    <Tabs
                                      variant="soft-rounded"
                                      colorScheme="yellow"
                                    >
                                      <TabList>
                                        <Tab
                                          display={"flex"}
                                          flexDirection={"column"}
                                        >
                                          <BiSolidUser></BiSolidUser>{" "}
                                          <Text>Details</Text>
                                        </Tab>
                                        <Tab
                                          display={"flex"}
                                          flexDirection={"column"}
                                        >
                                          {" "}
                                          <BiSolidUser></BiSolidUser>
                                          <Text> Other Details</Text>
                                        </Tab>
                                        <Tab
                                          display={"flex"}
                                          flexDirection={"column"}
                                        >
                                          {" "}
                                          <ImHome></ImHome>
                                          <Text> Address Details</Text>
                                        </Tab>
                                        <Tab
                                          display={"flex"}
                                          flexDirection={"column"}
                                        >
                                          {" "}
                                          <BiSolidUserPlus></BiSolidUserPlus>
                                          <Text> Voter Details</Text>
                                        </Tab>
                                        <Tab
                                          display={"flex"}
                                          flexDirection={"column"}
                                        >
                                          {" "}
                                          <BiSolidUserPlus></BiSolidUserPlus>
                                          <Text>Photo</Text>
                                        </Tab>
                                      </TabList>
                                      <TabPanels>
                                        <TabPanel>
                                          {/* <div style={{width:"100%"}}> */}
                                          <div style={{ width: "100%" }}>
                                            <div
                                              style={{
                                                display: "flex",
                                                gap: "10px",
                                              }}
                                            >
                                              <div>
                                                <label
                                                  style={{
                                                    float: "left",
                                                    color: "grey",
                                                  }}
                                                >
                                                  Date Of Birth*
                                                </label>
                                                <br />
                                                <input
                                                  style={{
                                                    // width: "100%",
                                                    height: "34px",
                                                    border: "0.5px solid gray",
                                                    borderRadius: "3px",
                                                    fontSize: "14px",
                                                    // textAlign: "center",
                                                    float: "left",
                                                  }}
                                                  onChange={handleChange}
                                                  type="date"
                                                  name="dob"
                                                  id=""
                                                  value={data.dob}
                                                  placeholder="DOB"
                                                />
                                              </div>

                                              <div>
                                                <label
                                                  style={{
                                                    float: "left",
                                                    color: "grey",
                                                  }}
                                                >
                                                  Age *
                                                </label>
                                                <br />
                                                <input
                                                  style={{
                                                    // width: "100%",
                                                    height: "34px",
                                                    border: "0.5px solid gray",
                                                    borderRadius: "3px",
                                                    fontSize: "14px",
                                                    // textAlign: "center",
                                                    float: "left",
                                                  }}
                                                  onChange={handleChange}
                                                  type="text"
                                                  name="age"
                                                  id=""
                                                  value={data.age}
                                                  placeholder=" Enter Your Age"
                                                />
                                              </div>
                                              <div>
                                                <label
                                                  style={{
                                                    float: "left",
                                                    color: "grey",
                                                  }}
                                                >
                                                  Education*
                                                </label>
                                                <br />
                                                <select
                                                  name="education"
                                                  id=""
                                                  value={data.education}
                                                  onChange={handleChange}
                                                  style={{
                                                    width: "100%",
                                                    height: "34px",
                                                    border: "0.5px solid gray",
                                                    borderRadius: "3px",
                                                    fontSize: "14px",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  <option value="">
                                                    Select Education
                                                  </option>
                                                  <option value="10th">
                                                    10th
                                                  </option>
                                                  <option value="12th">
                                                    12th
                                                  </option>
                                                </select>
                                              </div>
                                              <div>
                                                <label
                                                  style={{
                                                    float: "left",
                                                    color: "grey",
                                                  }}
                                                >
                                                  Occupation*
                                                </label>
                                                <br />
                                                <input
                                                  style={{
                                                    // width: "100%",
                                                    height: "34px",
                                                    border: "0.5px solid gray",
                                                    borderRadius: "3px",
                                                    fontSize: "14px",
                                                    // textAlign: "center",
                                                    float: "left",
                                                  }}
                                                  onChange={handleChange}
                                                  type="text"
                                                  name="occupation"
                                                  id=""
                                                  value={data.occupation}
                                                  placeholder="Occupation"
                                                />
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                gap: "10px",
                                              }}
                                            >
                                              <div>
                                                <label
                                                  style={{
                                                    float: "left",
                                                    color: "grey",
                                                  }}
                                                >
                                                  Aadhar Card*
                                                </label>
                                                <br />
                                                <input
                                                  style={{
                                                    // width: "100%",
                                                    height: "34px",
                                                    border: "0.5px solid gray",
                                                    borderRadius: "3px",
                                                    fontSize: "14px",
                                                    // textAlign: "center",
                                                    float: "left",
                                                  }}
                                                  onChange={handleChange}
                                                  type="text"
                                                  name="aadhar"
                                                  id=""
                                                  value={data.aadhar}
                                                  placeholder="Aadhar Card"
                                                />
                                              </div>

                                              <div>
                                                <label
                                                  style={{
                                                    float: "left",
                                                    color: "grey",
                                                  }}
                                                >
                                                  PAN Card*
                                                </label>
                                                <br />
                                                <input
                                                  style={{
                                                    // width: "100%",
                                                    height: "34px",
                                                    border: "0.5px solid gray",
                                                    borderRadius: "3px",
                                                    fontSize: "14px",
                                                    // textAlign: "center",
                                                    float: "left",
                                                  }}
                                                  onChange={handleChange}
                                                  type="text"
                                                  name="pancard"
                                                  id=""
                                                  value={data.pancard}
                                                  placeholder="PAN Card"
                                                />
                                              </div>
                                              <div>
                                                <label
                                                  style={{
                                                    float: "left",
                                                    color: "grey",
                                                  }}
                                                >
                                                  Voter ID*
                                                </label>
                                                <br />
                                                <input
                                                  style={{
                                                    // width: "100%",
                                                    height: "34px",
                                                    border: "0.5px solid gray",
                                                    borderRadius: "3px",
                                                    fontSize: "14px",
                                                    // textAlign: "center",
                                                    float: "left",
                                                  }}
                                                  onChange={handleChange}
                                                  type="text"
                                                  name="voterId"
                                                  id=""
                                                  value={data.voterID}
                                                  placeholder="Voter ID"
                                                />
                                              </div>
                                              <div>
                                                <label
                                                  style={{
                                                    float: "left",
                                                    color: "grey",
                                                  }}
                                                >
                                                  Ration Card*
                                                </label>
                                                <br />
                                                <select
                                                  name="rationCard"
                                                  id=""
                                                  value={data.rationCard}
                                                  onChange={handleChange}
                                                  style={{
                                                    width: "100%",
                                                    height: "34px",
                                                    border: "0.5px solid gray",
                                                    borderRadius: "3px",
                                                    fontSize: "14px",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  <option value="">
                                                    Select Card
                                                  </option>
                                                  <option value="white">
                                                    White
                                                  </option>
                                                  <option value="yellow">
                                                    Yellow
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>

                                          {/* </div> */}
                                        </TabPanel>
                                        <TabPanel>
                                          <div
                                            style={{
                                              display: "flex",
                                              gap: "10px",
                                            }}
                                          >
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                Cast*
                                              </label>
                                              <br />
                                              <select
                                                name="cast"
                                                id=""
                                                value={data.cast}
                                                style={{
                                                  width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  textAlign: "center",
                                                }}
                                                onChange={handleChange}
                                              >
                                                <option value="">
                                                  Select Cast
                                                </option>
                                                <option value="obc">Obc</option>
                                                <option value="sc">Sc</option>
                                              </select>
                                            </div>

                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                SubCast*
                                              </label>
                                              <br />
                                              <select
                                                name="subcast"
                                                id=""
                                                value={data.subcast}
                                                onChange={handleChange}
                                                style={{
                                                  width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  textAlign: "center",
                                                }}
                                              >
                                                <option value="">
                                                  Select SubCast
                                                </option>
                                                <option value="sc">Sc</option>
                                                <option value="st">St</option>
                                              </select>
                                            </div>
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                E-Mail Address*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange}
                                                type="text"
                                                name="email"
                                                id=""
                                                value={data.email}
                                                placeholder="Email"
                                              />
                                            </div>
                                            <div></div>
                                          </div>
                                        </TabPanel>
                                        <TabPanel>
                                          <div
                                            style={{
                                              display: "flex",
                                              gap: "10px",
                                            }}
                                          >
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                Flate Number*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",

                                                  float: "left",
                                                }}
                                                onChange={handleChange1}
                                                type="text"
                                                name="flatNo"
                                                id=""
                                                value={addssdata.flatNo}
                                                placeholder="Flate Number"
                                              />
                                            </div>

                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                Address Line 1*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange1}
                                                type="text"
                                                name="addressLine1"
                                                id=""
                                                value={addssdata.addressLine1}
                                                placeholder="Address Line 1"
                                              />
                                            </div>
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                Address Line 2*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange1}
                                                type="text"
                                                name="addressLine2"
                                                id=""
                                                value={addssdata.addressLine2}
                                                placeholder="Address Line 2"
                                              />
                                            </div>
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                City*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange1}
                                                type="text"
                                                name="city"
                                                id=""
                                                value={addssdata.city}
                                                placeholder="City"
                                              />
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              gap: "10px",
                                            }}
                                          >
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                District*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange1}
                                                type="text"
                                                name="district"
                                                id=""
                                                value={addssdata.district}
                                                placeholder="District"
                                              />
                                            </div>

                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                Native Place*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange1}
                                                type="text"
                                                name="native"
                                                id=""
                                                value={addssdata.native}
                                                placeholder="Native Place"
                                              />
                                            </div>
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                Pincode*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange1}
                                                type="text"
                                                name="pincode"
                                                id=""
                                                value={addssdata.pincode}
                                                placeholder="Pincode"
                                              />
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              gap: "10px",
                                            }}
                                          >
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                Assembly*
                                              </label>
                                              <br />
                                              <select
                                                name="assembly"
                                                id=""
                                                value={data.assembly}
                                                onChange={handleChange1}
                                                style={{
                                                  width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  textAlign: "center",
                                                }}
                                              >
                                                <option value="">
                                                  Select Assembly
                                                </option>
                                                <option value="burhanpur">
                                                  burhnapur
                                                </option>
                                                <option value="burhanpur">
                                                  Pune
                                                </option>
                                              </select>
                                            </div>

                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                City Type*
                                              </label>
                                              <br />
                                              <select
                                                name="city"
                                                id=""
                                                value={data.city}
                                                style={{
                                                  width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  textAlign: "center",
                                                }}
                                                onChange={handleChange}
                                              >
                                                <option value="">
                                                  Select City
                                                </option>
                                                <option value="">
                                                  burhnapur
                                                </option>
                                                <option value="">Pune</option>
                                              </select>
                                            </div>
                                            <div></div>
                                          </div>
                                        </TabPanel>
                                        <TabPanel>
                                          <div
                                            style={{
                                              display: "flex",
                                              gap: "10px",
                                            }}
                                          >
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                Account Number*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange}
                                                type="text"
                                                name="acNumber"
                                                id=""
                                                value={data.acNumber}
                                                placeholder="Account Number"
                                              />
                                            </div>

                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                Part Number*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange}
                                                type="text"
                                                name="partNumber"
                                                id=""
                                                value={data.partNumber}
                                                placeholder="Part Number"
                                              />
                                            </div>
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                Section Number*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange}
                                                type="text"
                                                name="sectionNumber"
                                                id=""
                                                value={data.sectionNumber}
                                                placeholder="Section Number"
                                              />
                                            </div>
                                            <div>
                                              <label
                                                style={{
                                                  float: "left",
                                                  color: "grey",
                                                }}
                                              >
                                                SLN-Number-In-Part*
                                              </label>
                                              <br />
                                              <input
                                                style={{
                                                  // width: "100%",
                                                  height: "34px",
                                                  border: "0.5px solid gray",
                                                  borderRadius: "3px",
                                                  fontSize: "14px",
                                                  // textAlign: "center",
                                                  float: "left",
                                                }}
                                                onChange={handleChange}
                                                type="text"
                                                name="slnNumberInPart"
                                                id=""
                                                value={data.slnNumberInPart}
                                                placeholder="SLN-Number-In-Part"
                                              />
                                            </div>
                                          </div>
                                        </TabPanel>
                                        <TabPanel>
                                          <div
                                            style={{
                                              display: "flex",
                                              gap: "20px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "80px",
                                                height: "30px",
                                              }}
                                            >
                                              <img
                                                src={photo}
                                                alt=""
                                                name="ProfileImage"
                                                value={data.ProfileImage}
                                                onChange={handleChange}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                marginTop: "20px",
                                                paddingTop: "8px",
                                              }}
                                            >
                                              <input
                                                type="file"
                                                id="file-input"
                                                name="file-input"
                                              />

                                              <label
                                                id="file-input-label"
                                                for="file-input"
                                              >
                                                +Choose File
                                              </label>
                                            </div>
                                            <div
                                              style={{
                                                width: "80px",
                                                height: "30px",
                                                border: "1px solid grey",
                                                marginTop: "25px",
                                                textAlign: "center",
                                                // paddingTop:"8px"
                                              }}
                                            >
                                              Cancel
                                            </div>
                                          </div>
                                        </TabPanel>
                                      </TabPanels>
                                    </Tabs>
                                  </div>
                                  <FormControl
                                    display="flex"
                                    alignItems="center"
                                    marginLeft="10px"
                                  >
                                    <FormLabel
                                      htmlFor="email-alerts"
                                      mb="0"
                                      name="isVoter"
                                      value={data.isVoter}
                                      onChange={handleChange}
                                    >
                                      Our Voter
                                    </FormLabel>
                                    <Switch id="email-alerts" />
                                  </FormControl>
                                </div>
                              </div>

                              <div
                                style={{
                                  float: "left",
                                  marginTop: "20px",
                                  // width:"100%",
                                  // display:"block",
                                  // gap:"100px"
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    handleSub();
                                    {
                                      ((Object.keys(errors).length == 0 || errors.firstName=="This field is mandatory." ||    errors.lastName=="This field is mandatory." ||    errors.middleName=="This field is mandatory." ||    errors.phone=="This field is mandatory."))
                                        ? onOpen() 
                                        : onClose()
                                        
                                    }
                                    hndlecloss()
                                  }}
                                  backgroundColor={"#fdc356"}
                                >
                                  Add
                                </Button>
                                <Button variant="ghost" marginLeft="20px">
                                  Clear
                                </Button>
                                <Button onClick={onClose} marginLeft="20px">
                                  Cancel
                                </Button>
                              </div>
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                          </ModalContent>
                        </Modal>
                      </div>
                    </div>
                    <div>
                      <TableContainer
                        style={{ maxHeight: "300px", overflowY: "auto" }}
                      >
                        <Table variant="simple">
                          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                          <Thead>
                            <Tr
                              style={{
                                backgroundColor: "#f4f1fb",
                                color: "grey",
                              }}
                            >
                              <Th>
                                {" "}
                                <BsCircle></BsCircle>
                              </Th>
                              <Th>Full Name</Th>
                              <Th>Mobile No.</Th>
                              <Th>Identity Card No.</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {srch?.length > 0 &&
                              srch?.map((item) => {
                                return (
                                  <Tr>
                                    <Td>
                                      {searchIcone == item.id ? (
                                        <BsFillCheckCircleFill
                                          color="#fdc356"
                                          size={22}
                                        ></BsFillCheckCircleFill>
                                      ) : (
                                        <BsCircle
                                          onClick={() => {
                                            handleSarchDataforDisplay(item.id);
                                          }}
                                        ></BsCircle>
                                      )}
                                    </Td>
                                    <Td>{item.firstName}</Td>
                                    <Td>{item.phone}</Td>
                                    <Td>{item.role}</Td>
                                    <Td>
                                      <GrEdit
                                        onClick={() => {
                                          onOpen();
                                          handleUserEdit(item.id);
                                        }}
                                      ></GrEdit>
                                      <Modal
                                        isCentered
                                        onClose={onClose}
                                        isOpen={isOpen}
                                        size={"min"}
                                        motionPreset="slideInBottom"
                                      >
                                        <ModalContent
                                          w="1350px"
                                          h="370px"
                                          marginTop={"150px"}
                                          id="BoxShedow"
                                        >
                                          <ModalHeader>
                                            New Complainer
                                          </ModalHeader>
                                          <ModalCloseButton />
                                          <ModalBody>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: "20px",
                                                height: "230px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "45%",
                                                  display: "flex",
                                                  gap: "30%",
                                                }}
                                              >
                                                <div style={{ width: "25%" }}>
                                                  <label
                                                    style={{
                                                      float: "left",
                                                      color: "grey",
                                                    }}
                                                  >
                                                    First Name*
                                                  </label>
                                                  <br />
                                                  <input
                                                    style={{
                                                      // width: "100%",
                                                      height: "34px",
                                                      border:
                                                        "0.5px solid gray",
                                                      borderRadius: "3px",
                                                      fontSize: "14px",
                                                      // textAlign: "center",
                                                      padding: "5px",
                                                      float: "left",
                                                    }}
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="firstName"
                                                    id=""
                                                    value={
                                                      userEditeData?.firstName
                                                    }
                                                    placeholder="First Name"
                                                  />
                                                  <br />
                                                  <label
                                                    style={{
                                                      float: "left",
                                                      color: "grey",
                                                    }}
                                                  >
                                                    Last Name*
                                                  </label>
                                                  <br />
                                                  <input
                                                    style={{
                                                      width: "100%",
                                                      height: "34px",
                                                      border:
                                                        "0.5px solid gray",
                                                      borderRadius: "3px",
                                                      fontSize: "14px",
                                                      // textAlign: "center",
                                                      padding: "5px",
                                                      float: "left",
                                                    }}
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="lastName"
                                                    id=""
                                                    value={
                                                      userEditeData?.lastName
                                                    }
                                                    placeholder="Last Name"
                                                  />
                                                  <br />
                                                  <label
                                                    style={{
                                                      float: "left",
                                                      color: "grey",
                                                    }}
                                                  >
                                                    Mobile Number*
                                                  </label>
                                                  <br />
                                                  <input
                                                    style={{
                                                      width: "100%",
                                                      height: "34px",
                                                      border:
                                                        "0.5px solid gray",
                                                      borderRadius: "3px",
                                                      fontSize: "14px",
                                                      // textAlign: "center",
                                                      padding: "5px",
                                                      float: "left",
                                                    }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="phone"
                                                    id=""
                                                    value={userEditeData?.phone}
                                                    placeholder="Mobile Number"
                                                  />
                                                  <br />
                                                </div>
                                                <div style={{ width: "25%" }}>
                                                  <label
                                                    style={{
                                                      float: "left",
                                                      color: "grey",
                                                    }}
                                                  >
                                                    Middle Name*
                                                  </label>
                                                  <br />
                                                  <input
                                                    style={{
                                                      width: "100%",
                                                      height: "34px",
                                                      border:
                                                        "0.5px solid gray",
                                                      borderRadius: "3px",
                                                      fontSize: "14px",
                                                      padding: "5px",
                                                      // textAlign: "center",
                                                      float: "left",
                                                    }}
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="middleName"
                                                    id=""
                                                    value={
                                                      userEditeData?.middleName
                                                    }
                                                    placeholder="Middle Name"
                                                  />
                                                  <br />

                                                  <label
                                                    style={{
                                                      float: "left",
                                                      color: "grey",
                                                      marginTop: "5px",
                                                    }}
                                                  >
                                                    Gender*
                                                  </label>
                                                  <br />
                                                  <br />
                                                  <div
                                                    style={{
                                                      width: "100%",
                                                      display: "flex",
                                                      gap: "20px",
                                                      borderRadius: "5px",
                                                    }}
                                                    // name="gender"
                                                    // value={data.gender}
                                                    // onChange={handleChange}
                                                  >
                                                    <button
                                                      onClick={() => {
                                                        userEditeData.gender =
                                                          "MALE";
                                                      }}
                                                      style={{
                                                        width: "150px",
                                                        height: "41px",

                                                        // borderRadius: "1px",
                                                        // border: "1px solid grey",
                                                      }}
                                                    >
                                                      Male
                                                    </button>
                                                    <button
                                                      onClick={() => {
                                                        userEditeData.gender =
                                                          "FEMALE";
                                                      }}
                                                      style={{
                                                        width: "150px",
                                                        height: "41px",
                                                        // borderRadius: "1px",
                                                        // border: "1px solid grey",
                                                      }}
                                                    >
                                                      Female
                                                    </button>
                                                    <button
                                                      onClick={() => {
                                                        userEditeData.gender =
                                                          "OTHER";
                                                      }}
                                                      style={{
                                                        width: "150px",
                                                        height: "41px",
                                                        marginBottom: "1px",
                                                        // borderRadius: "1px",
                                                        // border: "1px solid grey",
                                                      }}
                                                    >
                                                      Other
                                                    </button>
                                                  </div>

                                                  <label
                                                    style={{
                                                      float: "left",
                                                      color: "grey",
                                                    }}
                                                  >
                                                    Landline Number*
                                                  </label>
                                                  <br />
                                                  <input
                                                    style={{
                                                      // width: "100%",
                                                      height: "34px",
                                                      border:
                                                        "0.5px solid gray",
                                                      borderRadius: "3px",
                                                      fontSize: "14px",
                                                      // textAlign: "center",
                                                      float: "left",
                                                    }}
                                                    onChange={handleChange}
                                                    type="number"
                                                    name="landline"
                                                    id=""
                                                    value={
                                                      userEditeData?.landline
                                                    }
                                                    placeholder="Landline Number"
                                                  />
                                                  <br />
                                                </div>
                                              </div>
                                              <div style={{ width: "55%" }}>
                                                <div
                                                  style={{
                                                    width: "100%",
                                                    borderLeft:
                                                      "1px solid black",
                                                    borderTop:
                                                      "1px solid black",
                                                    borderStyle: "dashed",
                                                    // height:"100%",
                                                  }}
                                                >
                                                  <Tabs
                                                    variant="soft-rounded"
                                                    colorScheme="yellow"
                                                  >
                                                    <TabList>
                                                      <Tab
                                                        display={"flex"}
                                                        flexDirection={"column"}
                                                      >
                                                        <BiSolidUser></BiSolidUser>{" "}
                                                        <Text>Details</Text>
                                                      </Tab>
                                                      <Tab
                                                        display={"flex"}
                                                        flexDirection={"column"}
                                                      >
                                                        {" "}
                                                        <BiSolidUser></BiSolidUser>
                                                        <Text>
                                                          {" "}
                                                          Other Details
                                                        </Text>
                                                      </Tab>
                                                      <Tab
                                                        display={"flex"}
                                                        flexDirection={"column"}
                                                      >
                                                        {" "}
                                                        <ImHome></ImHome>
                                                        <Text>
                                                          {" "}
                                                          Address Details
                                                        </Text>
                                                      </Tab>
                                                      <Tab
                                                        display={"flex"}
                                                        flexDirection={"column"}
                                                      >
                                                        {" "}
                                                        <BiSolidUserPlus></BiSolidUserPlus>
                                                        <Text>
                                                          {" "}
                                                          Voter Details
                                                        </Text>
                                                      </Tab>
                                                      <Tab
                                                        display={"flex"}
                                                        flexDirection={"column"}
                                                      >
                                                        {" "}
                                                        <BiSolidUserPlus></BiSolidUserPlus>
                                                        <Text>Photo</Text>
                                                      </Tab>
                                                    </TabList>
                                                    <TabPanels>
                                                      <TabPanel>
                                                        {/* <div style={{width:"100%"}}> */}
                                                        <div
                                                          style={{
                                                            width: "100%",
                                                          }}
                                                        >
                                                          <div
                                                            style={{
                                                              display: "flex",
                                                              gap: "10px",
                                                            }}
                                                          >
                                                            <div>
                                                              <label
                                                                style={{
                                                                  float: "left",
                                                                  color: "grey",
                                                                }}
                                                              >
                                                                Date Of Birth*
                                                              </label>
                                                              <br />
                                                              <input
                                                                style={{
                                                                  // width: "100%",
                                                                  height:
                                                                    "34px",
                                                                  border:
                                                                    "0.5px solid gray",
                                                                  borderRadius:
                                                                    "3px",
                                                                  fontSize:
                                                                    "14px",
                                                                  // textAlign: "center",
                                                                  float: "left",
                                                                }}
                                                                onChange={
                                                                  handleChange
                                                                }
                                                                type="date"
                                                                name="dob"
                                                                id=""
                                                                value={
                                                                  userEditeData?.dob
                                                                }
                                                                placeholder="DOB"
                                                              />
                                                            </div>

                                                            <div>
                                                              <label
                                                                style={{
                                                                  float: "left",
                                                                  color: "grey",
                                                                }}
                                                              >
                                                                Age *
                                                              </label>
                                                              <br />
                                                              <input
                                                                style={{
                                                                  // width: "100%",
                                                                  height:
                                                                    "34px",
                                                                  border:
                                                                    "0.5px solid gray",
                                                                  borderRadius:
                                                                    "3px",
                                                                  fontSize:
                                                                    "14px",
                                                                  // textAlign: "center",
                                                                  float: "left",
                                                                }}
                                                                onChange={
                                                                  handleChange
                                                                }
                                                                type="text"
                                                                name="age"
                                                                id=""
                                                                value={
                                                                  userEditeData?.age
                                                                }
                                                                placeholder=" Enter Your Age"
                                                              />
                                                            </div>
                                                            <div>
                                                              <label
                                                                style={{
                                                                  float: "left",
                                                                  color: "grey",
                                                                }}
                                                              >
                                                                Education*
                                                              </label>
                                                              <br />
                                                              <select
                                                                name="education"
                                                                id=""
                                                                value={
                                                                  userEditeData?.education
                                                                }
                                                                onChange={
                                                                  handleChange
                                                                }
                                                                style={{
                                                                  width: "100%",
                                                                  height:
                                                                    "34px",
                                                                  border:
                                                                    "0.5px solid gray",
                                                                  borderRadius:
                                                                    "3px",
                                                                  fontSize:
                                                                    "14px",
                                                                  textAlign:
                                                                    "center",
                                                                }}
                                                              >
                                                                <option value="">
                                                                  Select
                                                                  Education
                                                                </option>
                                                                <option value="10th">
                                                                  10th
                                                                </option>
                                                                <option value="12th">
                                                                  12th
                                                                </option>
                                                              </select>
                                                            </div>
                                                            <div>
                                                              <label
                                                                style={{
                                                                  float: "left",
                                                                  color: "grey",
                                                                }}
                                                              >
                                                                Occupation*
                                                              </label>
                                                              <br />
                                                              <input
                                                                style={{
                                                                  // width: "100%",
                                                                  height:
                                                                    "34px",
                                                                  border:
                                                                    "0.5px solid gray",
                                                                  borderRadius:
                                                                    "3px",
                                                                  fontSize:
                                                                    "14px",
                                                                  // textAlign: "center",
                                                                  float: "left",
                                                                }}
                                                                onChange={
                                                                  handleChange
                                                                }
                                                                type="text"
                                                                name="occupation"
                                                                id=""
                                                                value={
                                                                  userEditeData?.occupation
                                                                }
                                                                placeholder="Occupation"
                                                              />
                                                            </div>
                                                          </div>
                                                          <div
                                                            style={{
                                                              display: "flex",
                                                              gap: "10px",
                                                            }}
                                                          >
                                                            <div>
                                                              <label
                                                                style={{
                                                                  float: "left",
                                                                  color: "grey",
                                                                }}
                                                              >
                                                                Aadhar Card*
                                                              </label>
                                                              <br />
                                                              <input
                                                                style={{
                                                                  // width: "100%",
                                                                  height:
                                                                    "34px",
                                                                  border:
                                                                    "0.5px solid gray",
                                                                  borderRadius:
                                                                    "3px",
                                                                  fontSize:
                                                                    "14px",
                                                                  // textAlign: "center",
                                                                  float: "left",
                                                                }}
                                                                onChange={
                                                                  handleChange
                                                                }
                                                                type="text"
                                                                name="aadhar"
                                                                id=""
                                                                value={
                                                                  userEditeData?.aadhar
                                                                }
                                                                placeholder="Aadhar Card"
                                                              />
                                                            </div>

                                                            <div>
                                                              <label
                                                                style={{
                                                                  float: "left",
                                                                  color: "grey",
                                                                }}
                                                              >
                                                                PAN Card*
                                                              </label>
                                                              <br />
                                                              <input
                                                                style={{
                                                                  // width: "100%",
                                                                  height:
                                                                    "34px",
                                                                  border:
                                                                    "0.5px solid gray",
                                                                  borderRadius:
                                                                    "3px",
                                                                  fontSize:
                                                                    "14px",
                                                                  // textAlign: "center",
                                                                  float: "left",
                                                                }}
                                                                onChange={
                                                                  handleChange
                                                                }
                                                                type="text"
                                                                name="pancard"
                                                                id=""
                                                                value={
                                                                  userEditeData?.pancard
                                                                }
                                                                placeholder="PAN Card"
                                                              />
                                                            </div>
                                                            <div>
                                                              <label
                                                                style={{
                                                                  float: "left",
                                                                  color: "grey",
                                                                }}
                                                              >
                                                                Voter ID*
                                                              </label>
                                                              <br />
                                                              <input
                                                                style={{
                                                                  // width: "100%",
                                                                  height:
                                                                    "34px",
                                                                  border:
                                                                    "0.5px solid gray",
                                                                  borderRadius:
                                                                    "3px",
                                                                  fontSize:
                                                                    "14px",
                                                                  // textAlign: "center",
                                                                  float: "left",
                                                                }}
                                                                onChange={
                                                                  handleChange
                                                                }
                                                                type="text"
                                                                name="voterId"
                                                                id=""
                                                                value={
                                                                  userEditeData?.voterID
                                                                }
                                                                placeholder="Voter ID"
                                                              />
                                                            </div>
                                                            <div>
                                                              <label
                                                                style={{
                                                                  float: "left",
                                                                  color: "grey",
                                                                }}
                                                              >
                                                                Ration Card*
                                                              </label>
                                                              <br />
                                                              <select
                                                                name="rationCard"
                                                                id=""
                                                                value={
                                                                  userEditeData?.rationCard
                                                                }
                                                                onChange={
                                                                  handleChange
                                                                }
                                                                style={{
                                                                  width: "100%",
                                                                  height:
                                                                    "34px",
                                                                  border:
                                                                    "0.5px solid gray",
                                                                  borderRadius:
                                                                    "3px",
                                                                  fontSize:
                                                                    "14px",
                                                                  textAlign:
                                                                    "center",
                                                                }}
                                                              >
                                                                <option value="">
                                                                  Select Card
                                                                </option>
                                                                <option value="white">
                                                                  White
                                                                </option>
                                                                <option value="yellow">
                                                                  Yellow
                                                                </option>
                                                              </select>
                                                            </div>
                                                          </div>
                                                        </div>

                                                        {/* </div> */}
                                                      </TabPanel>
                                                      <TabPanel>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                          }}
                                                        >
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              Cast*
                                                            </label>
                                                            <br />
                                                            <select
                                                              name="cast"
                                                              id=""
                                                              value={
                                                                userEditeData?.cast
                                                              }
                                                              style={{
                                                                width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                textAlign:
                                                                  "center",
                                                              }}
                                                              onChange={
                                                                handleChange
                                                              }
                                                            >
                                                              <option value="">
                                                                Select Cast
                                                              </option>
                                                              <option value="obc">
                                                                Obc
                                                              </option>
                                                              <option value="sc">
                                                                Sc
                                                              </option>
                                                            </select>
                                                          </div>

                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              SubCast*
                                                            </label>
                                                            <br />
                                                            <select
                                                              name="subcast"
                                                              id=""
                                                              value={
                                                                userEditeData?.subcast
                                                              }
                                                              onChange={
                                                                handleChange
                                                              }
                                                              style={{
                                                                width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                textAlign:
                                                                  "center",
                                                              }}
                                                            >
                                                              <option value="">
                                                                Select SubCast
                                                              </option>
                                                              <option value="sc">
                                                                Sc
                                                              </option>
                                                              <option value="st">
                                                                St
                                                              </option>
                                                            </select>
                                                          </div>
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              E-Mail Address*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange
                                                              }
                                                              type="text"
                                                              name="email"
                                                              id=""
                                                              value={
                                                                userEditeData?.email
                                                              }
                                                              placeholder="Email"
                                                            />
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </TabPanel>
                                                      <TabPanel>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                          }}
                                                        >
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              Flate Number*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",

                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange1
                                                              }
                                                              type="text"
                                                              name="flatNo"
                                                              id=""
                                                              value={
                                                                userEditeData
                                                                  ?.addressFields
                                                                  ?.flatNo
                                                              }
                                                              placeholder="Flate Number"
                                                            />
                                                          </div>

                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              Address Line 1*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange1
                                                              }
                                                              type="text"
                                                              name="addressLine1"
                                                              id=""
                                                              value={
                                                                userEditeData
                                                                  ?.addressFields
                                                                  ?.addressLine1
                                                              }
                                                              placeholder="Address Line 1"
                                                            />
                                                          </div>
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              Address Line 2*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange1
                                                              }
                                                              type="text"
                                                              name="addressLine2"
                                                              id=""
                                                              value={
                                                                userEditeData
                                                                  ?.addressFields
                                                                  ?.addressLine2
                                                              }
                                                              placeholder="Address Line 2"
                                                            />
                                                          </div>
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              City*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange1
                                                              }
                                                              type="text"
                                                              name="city"
                                                              id=""
                                                              value={
                                                                userEditeData
                                                                  ?.addressFields
                                                                  ?.city
                                                              }
                                                              placeholder="City"
                                                            />
                                                          </div>
                                                        </div>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                          }}
                                                        >
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              District*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange1
                                                              }
                                                              type="text"
                                                              name="district"
                                                              id=""
                                                              value={
                                                                userEditeData
                                                                  ?.addressFields
                                                                  ?.district
                                                              }
                                                              placeholder="District"
                                                            />
                                                          </div>

                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              Native Place*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange1
                                                              }
                                                              type="text"
                                                              name="native"
                                                              id=""
                                                              value={
                                                                userEditeData
                                                                  ?.addressFields
                                                                  ?.native
                                                              }
                                                              placeholder="Native Place"
                                                            />
                                                          </div>
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              Pincode*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange1
                                                              }
                                                              type="text"
                                                              name="pincode"
                                                              id=""
                                                              value={
                                                                userEditeData
                                                                  ?.addressFields
                                                                  ?.pincode
                                                              }
                                                              placeholder="Pincode"
                                                            />
                                                          </div>
                                                        </div>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                          }}
                                                        >
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              Assembly*
                                                            </label>
                                                            <br />
                                                            <select
                                                              name="assembly"
                                                              id=""
                                                              value={
                                                                userEditeData?.assembly
                                                              }
                                                              onChange={
                                                                handleChange1
                                                              }
                                                              style={{
                                                                width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                textAlign:
                                                                  "center",
                                                              }}
                                                            >
                                                              <option value="">
                                                                Select Assembly
                                                              </option>
                                                              <option value="burhanpur">
                                                                burhnapur
                                                              </option>
                                                              <option value="burhanpur">
                                                                Pune
                                                              </option>
                                                            </select>
                                                          </div>

                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              City Type*
                                                            </label>
                                                            <br />
                                                            <select
                                                              name="city"
                                                              id=""
                                                              value={
                                                                userEditeData?.city
                                                              }
                                                              style={{
                                                                width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                textAlign:
                                                                  "center",
                                                              }}
                                                              onChange={
                                                                handleChange
                                                              }
                                                            >
                                                              <option value="">
                                                                Select City
                                                              </option>
                                                              <option value="">
                                                                burhnapur
                                                              </option>
                                                              <option value="">
                                                                Pune
                                                              </option>
                                                            </select>
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </TabPanel>
                                                      <TabPanel>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                          }}
                                                        >
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              Account Number*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange
                                                              }
                                                              type="text"
                                                              name="acNumber"
                                                              id=""
                                                              value={
                                                                userEditeData?.acNumber
                                                              }
                                                              placeholder="Account Number"
                                                            />
                                                          </div>

                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              Part Number*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange
                                                              }
                                                              type="text"
                                                              name="partNumber"
                                                              id=""
                                                              value={
                                                                userEditeData?.partNumber
                                                              }
                                                              placeholder="Part Number"
                                                            />
                                                          </div>
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              Section Number*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange
                                                              }
                                                              type="text"
                                                              name="sectionNumber"
                                                              id=""
                                                              value={
                                                                userEditeData?.sectionNumber
                                                              }
                                                              placeholder="Section Number"
                                                            />
                                                          </div>
                                                          <div>
                                                            <label
                                                              style={{
                                                                float: "left",
                                                                color: "grey",
                                                              }}
                                                            >
                                                              SLN-Number-In-Part*
                                                            </label>
                                                            <br />
                                                            <input
                                                              style={{
                                                                // width: "100%",
                                                                height: "34px",
                                                                border:
                                                                  "0.5px solid gray",
                                                                borderRadius:
                                                                  "3px",
                                                                fontSize:
                                                                  "14px",
                                                                // textAlign: "center",
                                                                float: "left",
                                                              }}
                                                              onChange={
                                                                handleChange
                                                              }
                                                              type="text"
                                                              name="slnNumberInPart"
                                                              id=""
                                                              value={
                                                                userEditeData?.slnNumberInPart
                                                              }
                                                              placeholder="SLN-Number-In-Part"
                                                            />
                                                          </div>
                                                        </div>
                                                      </TabPanel>
                                                      <TabPanel>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            gap: "20px",
                                                          }}
                                                        >
                                                          <div
                                                            style={{
                                                              width: "80px",
                                                              height: "30px",
                                                            }}
                                                          >
                                                            <img
                                                              src={photo}
                                                              alt=""
                                                              name="ProfileImage"
                                                              value={
                                                                userEditeData?.ProfileImage
                                                              }
                                                              onChange={
                                                                handleChange
                                                              }
                                                            />
                                                          </div>
                                                          <div
                                                            style={{
                                                              marginTop: "20px",
                                                              paddingTop: "8px",
                                                            }}
                                                          >
                                                            <input
                                                              type="file"
                                                              id="file-input"
                                                              name="file-input"
                                                            />

                                                            <label
                                                              id="file-input-label"
                                                              for="file-input"
                                                            >
                                                              +Choose File
                                                            </label>
                                                          </div>
                                                          <div
                                                            style={{
                                                              width: "80px",
                                                              height: "30px",
                                                              border:
                                                                "1px solid grey",
                                                              marginTop: "25px",
                                                              textAlign:
                                                                "center",
                                                              // paddingTop:"8px"
                                                            }}
                                                          >
                                                            Cancel
                                                          </div>
                                                        </div>
                                                      </TabPanel>
                                                    </TabPanels>
                                                  </Tabs>
                                                </div>
                                                <FormControl
                                                  display="flex"
                                                  alignItems="center"
                                                  marginLeft="10px"
                                                >
                                                  <FormLabel
                                                    htmlFor="email-alerts"
                                                    mb="0"
                                                    name="isVoter"
                                                    value={
                                                      userEditeData?.isVoter
                                                    }
                                                    onChange={handleChange}
                                                  >
                                                    Our Voter
                                                  </FormLabel>
                                                  <Switch id="email-alerts" />
                                                </FormControl>
                                              </div>
                                            </div>

                                            <div
                                              style={{
                                                float: "left",
                                                marginTop: "20px",
                                                // width:"100%",
                                                // display:"block",
                                                // gap:"100px"
                                              }}
                                            >
                                              <Button
                                                onClick={() => {
                                                  handleSub();
                                                  onClose();
                                                }}
                                                backgroundColor={"#fdc356"}
                                              >
                                                Add
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                marginLeft="20px"
                                              >
                                                Clear
                                              </Button>
                                              <Button
                                                onClick={onClose}
                                                marginLeft="20px"
                                              >
                                                Cancel
                                              </Button>
                                            </div>
                                          </ModalBody>
                                          <ModalFooter></ModalFooter>
                                        </ModalContent>
                                      </Modal>
                                    </Td>
                                  </Tr>
                                );
                              })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                      {/* {(Object.keys(srchData).length >0) ? */}
                        <div
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          gap: "25px",
                        }}
                      >
                        <AccordionButton >
                          <Button style={{ backgroundColor: "#fdc356" }}>
                            Continue
                          </Button>
                        </AccordionButton>
                        {/* <Button onChange={(expandedIndex: expandedIndex) => void} >Cancel</Button > */}
                      </div>
                      {/* :<span></span>} */}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      borderLeft: "1px solid black",
                      borderTop: "1px solid black",
                      borderStyle: "dashed",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        textAlign: "start",
                        margin: "10px",
                        color: "gray",
                      }}
                    >
                      <div style={{ color: "black", fontWeight: "bold" }}>
                        Information
                      </div>
                      <p>Full Name:{srchData ? srchData.firstName : ""}</p>
                      <p>Created Date:</p>
                      <p>Mobile No:{srchData ? srchData.phone : ""}</p>
                      <p>Gender:{srchData ? srchData.gender : ""}</p>
                      <p>Aadhar:{srchData ? srchData.aadhar : ""}</p>
                      <p>Voter ID:{srchData ? srchData.voterID : ""}</p>
                      <p>Is Our Voter:{}</p>
                      <p>Address:</p>
                      <p>Assembly:</p>
                    </div>
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderLeft: "2px solid green",
          marginLeft: "20px",
        }}
      >
        <div style={{ width: "90%", margin: "auto" }} id="BoxShedow">
          <Accordion allowToggle>
            <AccordionItem style={{ borderRadius: "8px" }}>
              <h2>
                <AccordionButton
                  _expanded={{
                    bg: "#fdc356",
                    color: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    display="flex"
                    gap="10px"
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "grey",
                        borderRadius: "20px",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ color: "white", textAlign: "center" }}>
                        2
                      </span>
                    </div>
                    Complainet Detail
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "30px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "karyaKartaData",
                          justifyContent: "space-between",
                          gap: "20px",
                        }}
                      >
                        <div style={{ width: "50%" }}>
                          <label style={{ float: "left" }}>
                            Describe Issue
                          </label>
                          <br />
                          <input
                            style={{
                              width: "100%",
                              height: "60px",
                              border: "0.5px solid gray",
                              borderRadius: "3px",
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                            value={mainData.description}
                            name="description"
                            onChange={(e) => {
                              handleComp(e);
                            }}
                            type="text"
                            placeholder="Please add description"
                          />
                          {error2.description && (
                                      <span
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {error2.description}
                                      </span>
                                    )}
                          <br />
                          <label style={{ float: "left" }}>
                            Complaint Category
                          </label>
                          <br />
                          <select
                            placeholder="select"
                            value={cat}
                            onChange={(e) => {
                              setcatData(e.target.value);
                            }}
                            style={{
                              width: "100%",
                              height: "34px",
                              border: "0.5px solid gray",
                              borderRadius: "3px",
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                            name=""
                            id=""
                          >
                            <option value="" placeholder="select ">
                              {"Select One"}
                            </option>
                            {CategoriesData?.length > 0 &&
                              CategoriesData?.map((item) => {
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
                          {error2.category && (
                                      <span
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {error2.category}
                                      </span>
                                    )}
                          <br />
                          <label style={{ float: "left" }}>Pincode</label>
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
                            value={mainData.pincode}
                            name="pincode"
                            onChange={(e) => {
                              handleComp(e);
                            }}
                            type="number"
                            placeholder="1234"
                          />
                          {error2.pincode && (
                                      <span
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {error2.pincode}
                                      </span>
                                    )}
                          <br />
                          <label style={{ float: "left" }}>
                            Complaint Due Date
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
                            value={mainData.complainDueDate}
                            name="complainDueDate"
                            onChange={(e) => {
                              handleComp(e);
                            }}
                          />
                           {error2.complainDueDate && (
                                      <span
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {error2.complainDueDate}
                                      </span>
                                    )}

                          <div style={{ display: "flex", gap: "20px" }}>
                            <div>
                              <label style={{ float: "left" }}>Assembly</label>
                              <br />
                              <select
                                placeholder="select"
                                value={cat}
                                onChange={(e) => {
                                  setassembleData(e.target.value);
                                }}
                                style={{
                                  width: "100%",
                                  height: "34px",
                                  border: "0.5px solid gray",
                                  borderRadius: "3px",
                                  fontSize: "14px",
                                  textAlign: "center",
                                }}
                                name=""
                                id=""
                              >
                                <option value="" placeholder="select ">
                                  {"Select One"}
                                </option>
                                {assembliesData?.length > 0 &&
                                  assembliesData?.map((item) => {
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
                            </div>
                            <div>
                              <label style={{ float: "left" }}>City Type</label>
                              <br />
                              <select
                                value={mainData.cityType}
                                name="cityType"
                                onChange={(e) => {
                                  handleComp(e);
                                }}
                                id=""
                                style={{
                                  width: "100%",
                                  height: "34px",
                                  border: "0.5px solid gray",
                                  borderRadius: "3px",
                                  fontSize: "14px",
                                  textAlign: "center",
                                }}
                              >
                                <option value="">Select City</option>
                                <option value="VILLAGE"> VILLAGE</option>
                                <option value="CITY"> CITY</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div style={{ width: "50%" }}>
                          <label style={{ float: "left" }}>
                            Actual Compaint Date*
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
                            value={mainData.actualComplainDate}
                            name="actualComplainDate"
                            onChange={(e) => {
                              handleComp(e);
                            }}
                          />
                           {error2.actualComplainDate && (
                                      <span
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {error2.actualComplainDate}
                                      </span>
                                    )}
                          <br />
                          <label style={{ float: "left" }}>
                            Complaint Type*
                          </label>
                          <br />
                          <select
                            placeholder="select"
                            value={typ}
                            onChange={(e) => {
                              setTypData(e.target.value);
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
                            {typdata?.length > 0 &&
                              typdata?.map((item) => {
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
                            Address Details*
                          </label>
                          <br />
                          <input
                            value={mainData.addressComp}
                            name="addressComp"
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
                            type="text"
                            placeholder="Please add address here"
                          />
                           {error2.addressComp && (
                                      <span
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {error2.addressComp}
                                      </span>
                                    )}
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      border: "5px solid black",
                      // borderTop: "1px solid black",
                      //   borderStyle: "dashed",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        textAlign: "start",
                        margin: "10px",
                        color: "gray",
                      }}
                    >
                      <div>
                        <TableContainer>
                          <Table variant="simple">
                            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                            <Thead>
                              <Tr
                                style={{
                                  backgroundColor: "#f4f1fb",
                                  color: "grey",
                                }}
                              >
                                <Th>Token No.</Th>
                                <Th>Category Type</Th>
                                <Th>Status</Th>
                                <Th>Date</Th>
                              </Tr>
                            </Thead>
                            <Tbody></Tbody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "25px",
                  }}
                >
                  <AccordionButton>
                    <Button
                      style={{
                        backgroundColor: "#fdc356",
                        marginRight: "20px",
                      }}
                      onClick={handleCompSub}
                    >
                      Continue
                    </Button>
                    <Button>Cancel</Button>
                  </AccordionButton>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderLeft: "2px solid green",
          marginLeft: "20px",
          //   gap:"20px"
        }}
      >
        <div style={{ width: "90%", margin: "auto" }} id="BoxShedow">
          <Accordion allowToggle>
            <AccordionItem style={{ borderRadius: "8px" }}>
              <h2>
                <AccordionButton
                  _expanded={{
                    bg: "#fdc356",
                    color: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    display="flex"
                    gap="10px"
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "grey",
                        borderRadius: "20px",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ color: "white", textAlign: "center" }}>
                        3
                      </span>
                    </div>
                    Assigned Karyakarta
                  </Box>
                  {/* <AccordionIcon /> */}
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "30px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          // width: "50%",
                          display: "flex",
                          gap: "10px",
                          margin: "auto",
                        }}
                      >
                        <div className="container">
                          <form className="form">
                            <input
                              className="input"
                              type="search"
                              placeholder="Search Karykarta Name"
                              value={sarchkaryaKartaData}
                              onChange={(e) => {
                                handleserchKaryakarta(e.target.value);
                                if (e.target.value == "") {
                                  setmainKartaDatais(karykarta);
                                }
                              }}
                            />
                            <button className="sarchbtn" type="submit">
                              Search
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      <TableContainer>
                        {/* <h1>History</h1> */}
                        <Table variant="simple">
                          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}

                          <Thead
                            style={{
                              position: "sticky",
                              top: 0,
                              overflowY: "hidden",
                            }}
                          >
                            <Tr
                              style={{
                                backgroundColor: "#f4f1fb",
                                color: "grey",
                                // position:"fixed",
                              }}
                            >
                              <Th>
                                <BsSquare></BsSquare>
                              </Th>
                              <Th>Name</Th>
                              <Th>Department</Th>
                              <Th>Designation</Th>
                              <Th>Email</Th>
                              <Th>Contact No.</Th>
                            </Tr>
                          </Thead>

                          <Tbody style={{ height: "2px" }}>
                            {mainKartaDatais?.length > 0 &&
                              mainKartaDatais?.map((item) => {
                                return (
                                  <Tr key={item.id}>
                                    <Td>
                                      {karyaKartaDataicone.includes(item.id) ? (
                                        <BsFillCheckSquareFill
                                          color="#fdc356"
                                          onClick={() =>
                                            handleCheckremove(item.id)
                                          }
                                        ></BsFillCheckSquareFill>
                                      ) : (
                                        <BsSquare
                                          onClick={() =>
                                            handlekaryaKartaData(item.id)
                                          }
                                        ></BsSquare>
                                      )}
                                    </Td>
                                    <Td>{item.firstName}</Td>
                                    <Td>{item.lastName} </Td>
                                    <Td>{item.gender}</Td>
                                    <Td>aj@gmail.com</Td>
                                    <Td>9977679355</Td>
                                  </Tr>
                                );
                              })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                      <label style={{ float: "left", color: "grey" }}>
                        Note For Assinged Karykrta
                      </label>
                      <br />
                      <input
                        style={{
                          // width: "100%",
                          height: "34px",
                          border: "0.5px solid gray",
                          borderRadius: "3px",
                          fontSize: "14px",
                          textAlign: "center",
                          float: "left",
                        }}
                        type="discription"
                        name=""
                        id=""
                        placeholder="Note"
                      />
                      <br />
                    </div>
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <AccordionButton>
                        <Button
                          style={{
                            backgroundColor: "#fdc356",
                            marginRight: "20px",
                          }}
                          onClick={handleCompSub}
                        >
                          Continue
                        </Button>
                        <Button>Cancel</Button>
                      </AccordionButton>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      border: "5px solid #1c204f",
                      // borderTop: "1px solid black",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        textAlign: "start",
                        // margin: "10px",
                        color: "gray",
                      }}
                    >
                      <div>
                        <TableContainer>
                          <h1>Selected Karykrta</h1>
                          <Table variant="simple">
                            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                            <Thead>
                              <Tr
                                style={{
                                  backgroundColor: "#f4f1fb",
                                  color: "grey",
                                  textAlign: "center",
                                }}
                              >
                                <Th>Name</Th>
                                <Th>Phone</Th>
                                <Th>Remove</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {karyaKartaData.length > 0 &&
                                karyaKartaData?.map((el) => {
                                  return (
                                    <Tr key={el.id}>
                                      <Td>{el.firstName}</Td>
                                      <Td>{el.lastName} </Td>
                                      <Td>
                                        <button
                                          onClick={() => handleReomve(el.id)}
                                        >
                                          <ImCross></ImCross>
                                        </button>
                                      </Td>
                                    </Tr>
                                  );
                                })}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderLeft: "2px solid green",
          marginLeft: "20px",

          //   gap:"20px"
        }}
      >
        <div style={{ width: "90%", margin: "auto" }} id="BoxShedow">
          <Accordion allowToggle>
            <AccordionItem style={{ borderRadius: "8px" }}>
              <h2>
                <AccordionButton
                  _expanded={{
                    bg: "#fdc356",
                    color: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    display="flex"
                    gap="10px"
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "grey",
                        borderRadius: "20px",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ color: "white", textAlign: "center" }}>
                        4
                      </span>
                    </div>
                    Assigned Adhikari
                  </Box>
                  {/* <AccordionIcon /> */}
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "30px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          gap: "10px",
                          margin: "auto",
                        }}
                      >
                        <div className="container">
                          <form className="form">
                            <input
                              className="input"
                              type="search"
                              placeholder="Search Adhikari name"
                              value={sarchAdhikariData}
                              onChange={(e) => {
                                handleserchAdhikari(e.target.value);
                                if (e.target.value == "") {
                                  setmainAdhikariDatais(adhikari);
                                }
                              }}
                            />
                            <button className="sarchbtn" type="submit">
                              Search
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      <TableContainer>
                        {/* <h1>History</h1> */}
                        <Table variant="simple">
                          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                          <Thead>
                            <Tr
                              style={{
                                backgroundColor: "#f4f1fb",
                                color: "grey",
                              }}
                            >
                              <Th>
                                <BsSquare></BsSquare>
                              </Th>
                              <Th>Name</Th>
                              <Th>Department</Th>
                              <Th>Designation</Th>
                              <Th>Email</Th>
                              <Th>Contact No.</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {mainAdhikariDatais?.length > 0 &&
                              mainAdhikariDatais?.map((item) => {
                                return (
                                  <Tr key={item.id}>
                                    <Td>
                                      {adhikariDataIcone.includes(item.id) ? (
                                        <BsFillCheckSquareFill
                                          color="#fdc356"
                                          onClick={() =>
                                            handleAdhikariCheckremove(item.id)
                                          }
                                        ></BsFillCheckSquareFill>
                                      ) : (
                                        <BsSquare
                                          onClick={() =>
                                            handleAdhikarikaryaKartaData(
                                              item.id
                                            )
                                          }
                                        ></BsSquare>
                                      )}
                                    </Td>
                                    <Td>{item.firstName}</Td>
                                    <Td>{item.lastName} </Td>
                                    <Td>{item.gender}</Td>
                                    <Td>aj@gmail.com</Td>
                                    <Td>9977679355</Td>
                                  </Tr>
                                );
                              })}
                          </Tbody>
                        </Table>
                      </TableContainer>

                      <br />
                      <div style={{ display: "flex", gap: "20px" }}>
                        <BsSquare></BsSquare>
                        <label style={{ float: "left", color: "grey" }}>
                          Send Message
                        </label>
                      </div>

                      <br />
                    </div>
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <AccordionButton>
                        <Button
                          style={{
                            backgroundColor: "#fdc356",
                            marginRight: "20px",
                          }}
                          onClick={handleCompSub}
                        >
                          Continue
                        </Button>
                        <Button>Cancel</Button>
                      </AccordionButton>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      border: "5px solid #1c204f",
                      // borderTop: "1px solid black",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        textAlign: "start",
                        margin: "10px",
                        color: "gray",
                      }}
                    >
                      <div>
                        <TableContainer>
                          <h1>Selected Adhikari</h1>
                          <Table variant="simple">
                            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                            <Thead>
                              <Tr
                                style={{
                                  backgroundColor: "#f4f1fb",
                                  color: "grey",
                                  textAlign: "center",
                                }}
                              >
                                <Th>Name</Th>
                                <Th>Phone</Th>
                                <Th>Remove</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {adhikariData.length > 0 &&
                                adhikariData?.map((el) => {
                                  return (
                                    <Tr key={el.id}>
                                      <Td>{el.firstName}</Td>
                                      <Td>{el.lastName} </Td>
                                      <Td>
                                        <button
                                          onClick={() =>
                                            handleAdhikariReomve(el.id)
                                          }
                                        >
                                          <ImCross></ImCross>
                                        </button>
                                      </Td>
                                    </Tr>
                                  );
                                })}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "25px",
          marginLeft: "100px",
        }}
      >
        <Button
          style={{ backgroundColor: "#fdc356" }}
          onClick={() => {
            handleMainObj();
            docoOnOpen();
          }}
        >
          Submit
        </Button>
        <Button>Cancel</Button>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={docoOpen}
        onClose={docoClose}
        // w="1000px" h="320px"

        size={"min"}

        // width="2000px"
      >
        <ModalOverlay />
        <ModalContent w="1100px" h="450px">
          <ModalCloseButton />
          <ModalBody pb={6} w="1100px">
            <Box
              w="1000px"
              h="250px"
              margin={"auto"}
              marginTop={"20px"}
              fontSize="lg"
              fontWeight="bold"
              border="1px"
              borderColor="gray.200"
              bg={"rgba(95,227,161,.2)"}
            >
              <Center>
                <Box
                  margin={"auto"}
                  marginTop={"20px"}
                  fontSize="lg"
                  fontWeight="bold"
                >
                  <IoCheckmarkDoneCircleOutline
                    size={"120px"}
                    color="#5fe3a1"
                  ></IoCheckmarkDoneCircleOutline>
                  <Center>
                    <Text fontSize="4xl" color="#5fe3a1">
                      Success!
                    </Text>
                    <br />
                  </Center>
                </Box>
              </Center>
            </Box>
            <Center>
              <Box marginTop={"15px"}>
                <Stack spacing={3}>
                  <Center>
                    <Text>Token Number</Text>
                  </Center>
                  <Center>
                    <Text fontSize="lg" fontWeight="bold">
                      {complaintPostData.tokenNumber}
                    </Text>
                  </Center>
                </Stack>
              </Box>
            </Center>
            <Center>
              <div>
                <Button marginTop="25px">
                  <Link to={"/complaint"}>Go To List</Link>
                </Button>

                <Button
                  variant="ghost"
                  marginLeft="20px"
                  marginTop="25px"
                  backgroundColor={"#fdc356"}
                  onClick={docoClose}
                >
                  Add New List
                </Button>

                <Button
                  onClick={docoClose}
                  marginLeft="20px"
                  marginTop="25px"
                  backgroundColor={"#fdc356"}
                >
                  Set Reminder
                </Button>
              </div>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddPage;
