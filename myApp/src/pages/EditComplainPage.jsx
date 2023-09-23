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
import { BsSquare, BsFillCheckSquareFill } from "react-icons/bs";
// import { ImHome } from "react-icons/im";
import { BiSolidUser, BiSolidUserPlus } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
// import { BsSquare } from "react-icons/bs";
import { ImHome } from "react-icons/im";
// import { BiSolidUser, BiSolidUserPlus } from "react-icons/bi";
import TableList from "../components/TableList";
import photo from "../Photos/officeSystem.webp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdhikariDAta,
  getAssembliesData,
  getCategoriesData,
  getKarykrtaDAta,
  getProductDAta,
  getUserSearchDAta,
  postCOMPLAINERdata,
  postCOMPLANTdata,
} from "../redux/productReducer.js/action";
import { Link, useParams } from "react-router-dom";

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

function EditComplainPage() {
    const {id}=useParams()
    
  const [mainKartaDatais, setmainKartaDatais] = useState()
  console.log(mainKartaDatais);
    const [editData,setEditData]=useState(null)
    const editKarykrta=editData?.karyaKarta
    console.log(editKarykrta)
  const [karyaKartaData, setkaryaKartaData] = useState([]);
  console.log(karyaKartaData);
  const [sarchkaryaKartaData, srchsetkaryaKartaData] = useState("");
 
  const [karyaKartaDataicone, setkaryaKartaDataicone] = useState([]);
  console.log(karyaKartaDataicone);
///////////////////////////////////////

  const [adhikariData, setadhikariData] = useState([]);
  const [sarchAdhikariData, srchsetAdhikaruData] = useState("");
  const [adhikariDataIcone, setadhikariDataIcone] = useState([]);
 
  const [srchData, setsrchData] = useState();
  const [userDataEdit, setuserDataEdit] = useState();

let dataMain = { kiosk: false, page: { number:0 , size: 10 } };
  const {
    CategoriesData,
    assembliesData,
    karykarta,
    adhikari,
    complainerSinleData,
    complaintPostData,
    isSubmitted,
    srch,
    products
  } = useSelector((store) => store.productReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getProductDAta(dataMain, yourConfig));
    dispatch(getProductDAta(dataMain, yourConfig));
    dispatch(getCategoriesData(yourConfig));
    dispatch(getAssembliesData(yourConfig));
    dispatch(getKarykrtaDAta({}, yourConfig));
    dispatch(getAdhikariDAta({}, yourConfig));
    setsrchData(complainerSinleData)

    
  }, []);

 
  useEffect(() => {
    // setuserDataEdit(products)
    const result=products[0]?.find((el)=>el.id==id)
    setEditData(result)
  }, [products]); 
  // console.log(userDataEdit)
  console.log(editData)

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

  console.log(userSarch)




  const [mainAdhikariDatais, setmainAdhikariDatais] = useState()
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
    srchsetkaryaKartaData(e)
    let result = mainKartaDatais?.filter((name) => name.firstName.includes(e));
    // console.log(result)
    setmainKartaDatais(result)
    };

//////////////////////////////////////////////////

  const handleserchAdhikari = (e) => {
    // e.preventDefault();
    srchsetAdhikaruData(e)
    let result = mainAdhikariDatais?.filter((name) => name.firstName.includes(e));
   
    setmainAdhikariDatais(result)

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };
  ///////////////////////////////////////////

  const handleUserSerac1 = (e) => {
    // e.preventDefault();
  
      dispatch(getUserSearchDAta(e, yourConfig));
      
  
      setUserSearch(null)
  };

// console.log(srch)

const handleSarchDataforDisplay = (id) => {
  const result = srch?.filter((name) => name.id == id);
  // console.log(result[0]);
  setsrchData(result[0])
  // setkaryaKartaData([...karyaKartaData, result]);
  
};
// console.log(srchData)

  const handleChange1 = (e) => {
    const { name, value } = e.target;

    setaddssData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSub = (e) => {
    data.addressFields = addssdata;
    data.cast = castdata;
    // console.log(data);
   dispatch(postCOMPLAINERdata(data, yourConfig));
  setsrchData(data)

  };

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
    // alert("show")
    mainData.assembly = assembleOne;

    mainData.category = caterf;
    mainData.type = typKaObj;
  };
  const handleMainObj = () => {
    mainData.complainer = srchData ? srchData: complainerSinleData;
    mainData.karyaKarta = karyaKartaData;
    mainData.adhikari = adhikariData;

    dispatch(postCOMPLANTdata(mainData, yourConfig));
  };

  
  useEffect(() => {
   
    setmainKartaDatais(karykarta)
   
   setmainAdhikariDatais(adhikari)
  }, [karykarta,adhikari]);
  


const categoryData=editData?.category.name





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
        Edit Complain
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
                      <p>Full Name:{srchData?srchData.firstName:""} {editData?.complainer.firstName} {editData?.complainer.lastName}</p>
                      <p>Created Date:</p>
                      <p>Mobile No:{srchData?srchData.phone:""} {editData?.complainer.phone}</p>
                      <p>Gender:{srchData?srchData.gender:""} {editData?.complainer.gender}</p>
                      <p>Aadhar:{srchData?srchData.aadhar:""} {editData?.complainer.aadhar}</p>
                      <p>Voter ID:{srchData?srchData.voterID:""} {editData?.complainer.voterID}</p>
                      <p>Is Our Voter:{} </p>
                      <p>Address:{editData?.complainer.address}</p>
                      <p>Assembly:{editData?.complainer.assembly}</p>
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
                            value={editData?.description}
                            name="description"
                            onChange={(e) => {
                              handleComp(e);
                            }}
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
                            value={editData?.category?.name}
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
                            value={editData?.complainer?.pincode}
                            name="pincode"
                            onChange={(e) => {
                              handleComp(e);
                            }}
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
                            value={editData?.complainDueDate}
                            name="complainDueDate"
                            onChange={(e) => {
                              handleComp(e);
                            }}
                          />

                          <div style={{ display: "flex", gap: "20px" }}>
                            <div>
                              <label style={{ float: "left" }}>Assembly</label>
                              <br />
                              <select
                                placeholder="select"
                                value={editData?.assembly?.name}
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
                                value={editData?.address?.cityType}
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
                            value={editData?.actualComplainDate}
                            name="actualComplainDate"
                            onChange={(e) => {
                              handleComp(e);
                            }}
                          />
                          <br />
                          <label style={{ float: "left" }}>
                            Complaint Type*
                          </label>
                          <br />
                          <select
                            placeholder="select"
                            value={editData?.type?.name}
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
                            value={editData?.addressComp}
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
                    <Button>Cancle</Button>
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
                              onChange={(e)=>{handleserchKaryakarta(e.target.value);
                                if(e.target.value==""){
                                setmainKartaDatais(karykarta)
                              }}}
                            />
                            <button className="sarchbtn" type="submit" >
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
                                  <Tr key={item.id}  >
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
                        <Button>Cancle</Button>
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
                              onChange={(e)=>{handleserchAdhikari(e.target.value) ;if(e.target.value==""){
                                setmainAdhikariDatais(adhikari)
                              }}}
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
                        <Button>Cancle</Button>
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
        <Button style={{ backgroundColor: "#fdc356" }} onClick={()=>{
          handleMainObj();
           docoOnOpen()}}
           >
          Submit
        </Button>
        <Button>Cancle</Button>
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
                <Link to={"/complaint"}>
                  Go To List
                  </Link>
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

export default EditComplainPage;
