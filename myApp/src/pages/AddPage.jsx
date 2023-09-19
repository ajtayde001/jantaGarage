import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { BsCircle } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { BsSquare,BsFillCheckSquareFill } from "react-icons/bs";
// import { ImHome } from "react-icons/im";
import { BiSolidUser, BiSolidUserPlus } from "react-icons/bi";
import { ImCross } from "react-icons/im";
// import { BsSquare } from "react-icons/bs";
import { ImHome } from "react-icons/im";
// import { BiSolidUser, BiSolidUserPlus } from "react-icons/bi";
import TableList from "../components/TableList";
import photo from "../Photos/officeSystem.webp"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAdhikariDAta, getAssembliesData, getCategoriesData, getKarykrtaDAta, postCOMPLAINERdata, postCOMPLANTdata } from "../redux/productReducer.js/action";

const IntialValue={
  extraFields: {},
  addressFields: {},
  firstName: "",
  lastName: "",
  gender:"" ,
  phone:"" ,
  middleName:"" ,
  rationCard:null,
  cityType: null,
}

const addresObj={ flatNo:"" ,
addressLine1:"" ,
addressLine2:"" ,
city:"" ,
district: "",
native:"" ,
pincode:"" }

const castObj={
  id: 4,
  name: "",
  createdDate: "",
  updatedDate: "",
  createdBy: 0,
  updatedBy: 0,
  subcast: []
}

const mainObj={
  address: {
     
      prabhag: null,
      prabhagArea: null,
      gaon: null,
      gat_number: null,
      gan_number: null
  },
  assembly: {},
  complainer:{},
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
}
// const mainObjForAdd={
//   address: {
     
//       prabhag: null,
//       prabhagArea: null,
//       gaon: null,
//       gat_number: null,
//       gan_number: null
//   },
//   assembly: {},
//   complainer:{},
//   isDirectEntry: true,
//   commentCreatedBy: 1,
//   actualComplainDate: "",
//   complainDueDate: "",
//   isAddedByKiosk: false,
//   category: {},
//   type: {},
//   office: 1,
//   karyaKarta: [],
//   adhikari: [],
//   pincode: "",
    
//   cityType: "",
// }


function AddPage() {
  const [karyaKartaData,setkaryaKartaData]=useState([])
const [karyaKartaDataicone,setkaryaKartaDataicone]=useState([])


const [adhikariData,setadhikariData]=useState([])
const [adhikariDataIcone,setadhikariDataIcone]=useState([])

  const { CategoriesData,assembliesData,karykarta,adhikari,complainerSinleData} = useSelector((store) => store.productReducer);
  const dispatch = useDispatch();
  const JWTToken = localStorage.getItem("token");
  const yourConfig = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
     
      Authorization: `Bearer ${JWTToken}`,
    },
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

const [data,setData]=useState(IntialValue)
const [mainData,setMainData]=useState(mainObj)
const [addssdata,setaddssData]=useState(addresObj)
const [castdata,setcastData]=useState(castObj)
/////////////////////////////////////////
const [cat,setcatData]=useState(null)
const [assemble,setassembleData]=useState(null)
const [typ,setTypData]=useState(null)
// const [typ,setTypData]=useState([])
   
  useEffect(() => {
    // dispatch(getProductDAta(dataMain, yourConfig));
    dispatch(getCategoriesData(yourConfig));
    dispatch(getAssembliesData(yourConfig));
    dispatch(getKarykrtaDAta({}, yourConfig));
    dispatch(getAdhikariDAta({}, yourConfig));
    
  }, []);
 
  console.log(complainerSinleData)
///for karykrta
const handlekaryaKartaData=(id)=>{ 
  const result = karykarta[0].find((name ) => name.id === id)
  console.log(result)
  setkaryaKartaData([...karyaKartaData,result])
  setkaryaKartaDataicone([...karyaKartaDataicone,result.id])
  }
  
  const handleReomve=(id)=>{
  const result=karyaKartaData.filter((name)=>name.id!==id)
  const result1=karyaKartaDataicone.filter((name)=>name!==id) 
  setkaryaKartaData([...result])
  setkaryaKartaDataicone([...result1])
  }
  const handleCheckremove=(id)=>{
    const result=karyaKartaData.filter((name)=>name.id!==id) 
    const result1=karyaKartaDataicone.filter((name)=>name!==id) 
    // console.log(result)
    setkaryaKartaData([...result])
    setkaryaKartaDataicone([...result1])
    }
  
    //for Adhikari
  
    const handleAdhikarikaryaKartaData=(id)=>{ 
      const result = adhikari[0].find((name ) => name.id === id)
      console.log(result)
      setadhikariData([...adhikariData,result])
      setadhikariDataIcone([...adhikariDataIcone,result.id])
      }
      
      const handleAdhikariReomve=(id)=>{
      const result=adhikariData.filter((name)=>name.id!==id)
      const result1=adhikariDataIcone.filter((name)=>name!==id)
      setadhikariData([...result])
      setadhikariDataIcone([...result1])
      }
      const handleAdhikariCheckremove=(id)=>{
        const result=adhikariData.filter((name)=>name.id!==id) 
        const result1=adhikariDataIcone.filter((name)=>name!==id) 
        // console.log(result)
        setadhikariData([...result])
        setadhikariDataIcone([...result1])
        }
 //////////////////////////////////////////////  

const handleChange=(e)=>{
const {name,value}=e.target;

setData((pre)=>{
  return {...pre,[name]:value}
})
}

   
const handleChange1=(e)=>{
const {name,value}=e.target;

setaddssData((pre)=>{
  return {...pre,[name]:value}
})
}
   
const handleSub=(e)=>{
  data.addressFields=addssdata
  data.cast=castdata
 console.log(data)
//  console.log(addssdata)
dispatch(postCOMPLAINERdata(data, yourConfig));
 }
 ////////////////////////

const caterf = cat ? JSON.parse(cat):{}
console.log(caterf)

const assembleOne = assemble ? JSON.parse(assemble):{}
console.log(assembleOne)

const typdata = caterf ? caterf.types:[]

// console.log(typdata)
const typKaObj= typ? JSON.parse(typ):{}
console.log(typKaObj)
////////////////////

const handleComp=(e)=>{
  const {name,value}=e.target;
  
  setMainData((pre)=>{
    return {...pre,[name]:value}
  })
  }
const handleCompSub=()=>{
  // alert("show")
  mainData.assembly=assembleOne
 
  mainData.category=caterf
  mainData.type=typKaObj
 
  }
const handleMainObj=()=>{
  mainData.complainer=complainerSinleData?complainerSinleData:data
  mainData.karyaKarta=karyaKartaData
  mainData.adhikari=adhikariData
  console.log(mainData)
  dispatch(postCOMPLANTdata(mainData, yourConfig));
  }
  
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
                    Complainer Detail
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
                            />
                            <button className="sarchbtn" type="submit">
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
                            <ModalHeader>New Complainer</ModalHeader>
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
                                      onClick={()=>{data.gender="MALE"}}
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
                                       onClick={()=>{data.gender="FEMALE"}}
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
                                       onClick={()=>{data.gender="OTHER"}}
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
                                                  <option value="10th">10th</option>
                                                  <option value="12th">12th</option>
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
                                                <option value="burhanpur">Pune</option>
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
                                            <img src={photo} alt="" name="ProfileImage" value={data.ProfileImage}  onChange={handleChange}/>
                                            </div>
                                            <div style={{marginTop:"20px",paddingTop:"8px"}}>
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
                                                marginTop:"25px",
                                                textAlign:"center",
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
                                    <FormLabel htmlFor="email-alerts" mb="0" name="isVoter" value={data.isVoter}  onChange={handleChange}>
                                      Our Voter
                                    </FormLabel>
                                    <Switch id="email-alerts"  />
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
                               
                                <Button onClick={()=>{handleSub();onClose()}}
                                backgroundColor={"#fdc356"} >Add</Button>
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
                              <Th> </Th>
                              <Th>Full Name</Th>
                              <Th>Mobile No.</Th>
                              <Th>Identity Card No.</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>
                                <BsCircle></BsCircle>
                              </Td>
                              <Td>Ajay Tayde</Td>
                              <Td>7898079499</Td>
                              <Td isNumeric>25</Td>
                              <Td>
                                <GrEdit></GrEdit>
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                      <div
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          gap: "25px",
                        }}
                      >
                        <AccordionButton>
                        <Button style={{ backgroundColor: "#fdc356" }} onClick={()=>{alert("i am back")}} >
                          Continue
                        </Button>
                        </AccordionButton>
                        {/* <Button onChange={(expandedIndex: expandedIndex) => void} >Cancle</Button > */}
                      </div>
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
                      <p>Full Name:</p>
                      <p>Created Date:</p>
                      <p>Mobile No:</p>
                      <p>Gender:</p>
                      <p>Aadhar:</p>
                      <p>Voter ID:</p>
                      <p>Is Our Voter:</p>
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
                            onChange={(e)=>{handleComp(e)}}
                            type="text"
                            placeholder="Please add description"
                          />
                          <br />
                          <label style={{ float: "left" }}>
                            Complaint Category
                          </label>
                          <br />
                          <select
                          placeholder="select"
                          value={cat}
                          onChange={(e)=>{setcatData(e.target.value)}}
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
                             <option value="" placeholder="select ">{"Select One"}</option>
                            {CategoriesData?.length > 0 &&
                          CategoriesData?.map((item) => {
                        return (
                          <option value={JSON.stringify(item)} placeholder="select ">{item.name}</option>
                    );
                  })
                  }
                           
                            
                          </select>
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
                            onChange={(e)=>{handleComp(e)}}
                            type="number"
                            placeholder="1234"
                          />
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
                            onChange={(e)=>{handleComp(e)}}
                          />

                          <div style={{ display: "flex", gap: "20px" }}>
                            <div>
                              <label style={{ float: "left" }}>Assembly</label>
                              <br />
                              <select
                          placeholder="select"
                          value={cat}
                          onChange={(e)=>{setassembleData(e.target.value)}}
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
                             <option value="" placeholder="select ">{"Select One"}</option>
                            {assembliesData?.length > 0 &&
                          assembliesData?.map((item) => {
                        return (
                          <option value={JSON.stringify(item)} placeholder="select ">{item.name}</option>
                    );
                  })
                  }
                           
                            
                          </select>
                            </div>
                            <div>
                              <label style={{ float: "left" }}>City Type</label>
                              <br />
                              <select
                               value={mainData.cityType}
                               name="cityType"
                               onChange={(e)=>{handleComp(e)}}
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
                               onChange={(e)=>{handleComp(e)}}
                          />
                          <br />
                          <label style={{ float: "left" }}>
                            Complaint Type*
                          </label>
                          <br />
                          <select
                          placeholder="select"
                          value={typ}
                          onChange={(e)=>{setTypData(e.target.value)}}
                            style={{
                              width: "100%",
                              height: "34px",
                              border: "0.5px solid gray",
                              borderRadius: "3px",
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                           
                          >
                             <option value="" placeholder="select ">{"Select One"}</option>
                            {typdata?.length > 0 &&
                          typdata?.map((item) => {
                        return (
                          <option value={JSON.stringify(item)} placeholder="select ">{item.name}</option>
                    );
                  })
                  }
                           
                            
                          </select>
                          <br />
                          <label style={{ float: "left" }}>
                            Address Details*
                          </label>
                          <br />
                          <input
                             value={mainData.addressComp}
                             name="addressComp"
                             onChange={(e)=>{handleComp(e)}}
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
                  <Button style={{ backgroundColor: "#fdc356" ,marginRight:"20px"}} onClick={handleCompSub}>
                    Continue
                  </Button>
                  <Button >Cancle</Button >
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
                            />
                            <button className="sarchbtn" type="submit">
                              Search
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div style={{ maxHeight: "300px", overflowY: "auto"}}>
                      <TableContainer  >
                        {/* <h1>History</h1> */}
                        <Table variant="simple"  >
                          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                         
                          <Thead style={{position:'sticky',top:0,overflowY:"hidden"}}>
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

                          <Tbody style={{height:"2px"}}>
                          {karykarta[0]?.length > 0 &&
                          karykarta[0]?.map((item) => {
                        return (
                        
                          <Tr key={item.id} >
                                <Td>
                                  {karyaKartaDataicone.includes(item.id)?<BsFillCheckSquareFill color="#fdc356" onClick={()=>handleCheckremove(item.id)}></BsFillCheckSquareFill>:<BsSquare onClick={()=>handlekaryaKartaData(item.id)}></BsSquare>}
                                </Td>
                                <Td>{item.firstName}</Td>
                                <Td>{item.lastName} </Td>
                                <Td>{item.gender}</Td>
                                <Td>aj@gmail.com</Td>
                                <Td>9977679355</Td>
                              </Tr>
                             
                    );
                  })
                  }           
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
                  <Button style={{ backgroundColor: "#fdc356" ,marginRight:"20px"}} onClick={handleCompSub}>
                    Continue
                  </Button>
                  <Button >Cancle</Button >
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
                               {
                                karyaKartaData.length>0&&karyaKartaData?.map((el)=>{
                                  return (
                                    <Tr key={el.id} >
                               
                                <Td>{el.firstName}</Td>
                                <Td>{el.lastName} </Td>
                                <Td><button onClick={()=>handleReomve(el.id)}><ImCross></ImCross></button></Td>
                              </Tr>
                                  )
                                })
                               }
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
                            />
                            <button className="sarchbtn" type="submit">
                              Search
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div style={{maxHeight: "300px", overflowY: "auto"}}>
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
                          {adhikari[0]?.length > 0 &&
                          adhikari[0]?.map((item) => {
                        return (
                        
                          <Tr key={item.id} >
                                <Td>
                                  {adhikariDataIcone.includes(item.id)?<BsFillCheckSquareFill color="#fdc356" onClick={()=>handleAdhikariCheckremove(item.id)}></BsFillCheckSquareFill>:<BsSquare onClick={()=>handleAdhikarikaryaKartaData(item.id)}></BsSquare>}
                                </Td>
                                <Td>{item.firstName}</Td>
                                <Td>{item.lastName} </Td>
                                <Td>{item.gender}</Td>
                                <Td>aj@gmail.com</Td>
                                <Td>9977679355</Td>
                              </Tr>
                             
                    );
                  })
                  }
                          
                          </Tbody>


                        </Table>
                      </TableContainer>
                     
                      {/* <label style={{float:"left",color:"grey"}}>Note For Assinged Karykrta</label>
              <br />
              <input style={{
                    // width: "100%",
                    height: "34px",
                    border: "0.5px solid gray",
                    borderRadius: "3px",
                    fontSize: "14px",
                    textAlign: "center",
                    float:"left"
                    
                  }} type="discription" name="" id="" placeholder="Note" /> */}
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
                  <Button style={{ backgroundColor: "#fdc356" ,marginRight:"20px"}} onClick={handleCompSub}>
                    Continue
                  </Button>
                  <Button >Cancle</Button >
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
                            {
                                adhikariData.length>0&&adhikariData?.map((el)=>{
                                  return (
                                    <Tr key={el.id} >
                               
                                <Td>{el.firstName}</Td>
                                <Td>{el.lastName} </Td>
                                <Td><button onClick={()=>handleAdhikariReomve(el.id)}><ImCross></ImCross></button></Td>
                              </Tr>
                                  )
                                })
                               }
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
        <Button style={{ backgroundColor: "#fdc356" }} onClick={handleMainObj}>Submit</Button>
        <Button>Cancle</Button>
      </div>
    </div>
  );
}

export default AddPage;
