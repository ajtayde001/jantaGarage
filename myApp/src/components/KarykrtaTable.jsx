import React, { useEffect, useRef, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { GrDocument, GrDocumentDownload } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiPlusMedical } from "react-icons/bi";
import {
  BsBookmark,
  BsFillBookmarkFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

import {
  Badge,
  Box,
  Tag,
  Tooltip,
  WrapItem,
  useDisclosure,
  
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  TableContainer,
  Table,
  Flex,
  Select,
  Input,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Td,

} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { Complainerdata } from "./Complainerdata";
import ApexChart from "./Piechart";

const KartkrtaTable = ({

    address,
    officeImage,
    users,
    name,
    indexData,
    karyakartas,
    InProgress,
    hold,
    solved,
    total,
    unSolved,
    officedata,
    email,
    phone,
    firstName,
    lastName,
    officeName,
    createdDate,
    aadhar,
    registerHold,
    registerInProgress,
    registerSolved,
    registerUnSolved,
    // officeName
}) => {

    // const officename = name ? name : "__";
    // const karykertaname=karyakartas?karyakartas:"__"
    // const totalkarykrta=total?total:"__"
    const userName=firstName+lastName
  
    let Inpro=InProgress==null?0:+InProgress
let Hold=hold==null?0:+hold
let Solve=solved==null?0:+solved
let Unsolve=unSolved==null?0:+unSolved


  let arr=[Inpro,Hold,Solve,Unsolve]
  let arrName=["InProgress","hold","solved","unSolved"]

let regInpro=registerInProgress==null?0:+registerInProgress
let regHold=registerHold==null?0:+registerHold
let regSolve=registerSolved==null?0:+registerSolved
let regUnsolve=registerUnSolved==null?0:+registerUnSolved



  let registerarray=[regInpro,regHold,regSolve,regUnsolve]
  let registerNamearray=['registerInProgress','registerHold','registerSolved','registerUnSolved']
// console.log(arr)
// console.log(arrName)


const newcreatedDate = createdDate?createdDate.split("T")[0] : "";
  const {
    isOpen: deletOpen,
    onOpen: deletOnOpen,
    onClose: deletClose,
  } = useDisclosure();
  const {
    isOpen: comentOpen,
    onOpen: comentOnOpen,
    onClose: comentClose,
  } = useDisclosure();
  const {
    isOpen: docoOpen,
    onOpen: docoOnOpen,
    onClose: docoClose,
  } = useDisclosure();
  const {
    isOpen: statusOpen,
    onOpen: statusOnOpen,
    onClose: statusClose,
  } = useDisclosure();
  // const { cmntIsOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [textdata, setTextdata] = useState("");
  const [hide, setHide] = useState(false);
  const [btn, setBtn] = useState(true);
  const [deletbtn, setdeleteBtn] = useState(false);
  const [comentbtn, setcomentBtn] = useState(false);
  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Flex>
      <Box>
        <Tag bg={"white"}  ref={ref} {...rest}>
          {children}
        </Tag>
      </Box>
    </Flex>
  ));
  // console.log(textdata)
  const hidehaddele = () => {
    setHide(true);
    setBtn(false);
    // alert("Please select");
  };
  const unhidehaddele = () => {
    setHide(false);
    setBtn(true);
    // alert("Please select");
  };

  return (
    <>
      <tr
        class="fst"
        style={{
          width: "100%",
          // height: "200px",
          display: "table",
          background: "white",
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <td style={{width:"20px",textAlign:"left"}}>
          {btn ? (
            <IoIosArrowForward
              margin="100px"
              color="#0f97c7"
              size={22}
              type="button"
              onClick={hidehaddele}
            ></IoIosArrowForward>
          ) : (
            <FaChevronDown
              color="#0f97c7"
              size={22}
              type="button"
              onClick={unhidehaddele}
            ></FaChevronDown>
          )}
        </td>
        <td style={{width:"50px"}}>
        <Flex>
              <Tooltip label={"Documents"} placement="left">
                <Box ml="1" marginTop={4}>
                  
                   
                <img style={{width:"30px"}} src="https://staging.digitaloms.in/assets/layout/icon/big-cup-svgrepo-com.svg" alt="" />
                    
              
                  <Badge
                    ml="2"
                    marginTop="-69px"
                    bg={"transparent"}
                    color={"blue"}
                  >
                  {indexData+1}
                  </Badge>
                  
                </Box>
                </Tooltip>
              </Flex>
           
        </td>
       
        <td style={{width:"150px",textAlign:"left"}}>
            <div style={{ width:"150px", display:"flex",gap:"5px",marginTop:"10px"}}>
            <div style={{ marginTop:"10px"}}>
            <img src="https://staging.digitaloms.in/assets/icons/man.svg" alt="" />
                </div>
                <GoDotFill style={{color:"greenyellow"}}></GoDotFill>
                <div>
                    <div>
                    {userName}
                    </div>
                    <div style={{color:"grey",fontSize:"10px"}}>
                    {officeName}
                    </div>
                    
                </div>     
                </div>     
        </td> 
        <td style={{width:"20px",fontSize:"13px"}}>
          {phone}
        </td>      
        <td style={{width:"70px"}}> 
        {email?email:"__"}      
        
            
            </td>
        
            <td style={{width:"70px"}}>
          {aadhar?aadhar:"__"}
        </td>

        <td style={{width:"50px"}}>
           <ApexChart widths={100} legenda={false} catCountArray={arr} catNameArray={arrName} lableshow={false}/>
        </td>
        <td style={{width:"50px"}}>
        <ApexChart widths={100} legenda={false} catCountArray={registerarray} catNameArray={registerNamearray} lableshow={false}/>
        </td>
        <td style={{width:"70px",fontSize:"13px"}}>
          {newcreatedDate}
        </td>
      </tr>

      {/* //////////////////////////// */}

      {hide ? (
        <tr
          style={{
            width: "100%",
            alignItems: "center",
            height: "200px",
           
         backgroundColor: "white",
            margin: "auto",
            // border:"1px solid red"
          }}
        >
          <td  style={{
            width: "100%",
            // border:"1px solid red"
          }}>
            <div
              style={{
                display: "flex",
                // gridTemplateColumns: "repeat(2, 1fr)",
                width: "95%",
                padding: "10px",
                height: "150px",
                margin: "auto",
                gap: "20px",
                marginBottom: "20px",
                // border: "2px solid red",
                backgroundColor: "#f5f6fa",
              }}
            >
              <div
                style={{
                  width: "100%",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  // height: "6px",
                  // gap: "20px",
                  // border: "1px solid blue",
                  backgroundColor: "#f5f6fa",
                }}
              >
                <h1 style={{ display: "inline-block" }}>Address Details</h1>

                <div
                  style={{
                    width: "70%",
                    padding: "10px",
                    display: "flex",
                    justifyContent:"space-between",
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    height: "50px",
                    // gap: "60px",
                    // border: "1px solid black",
                    backgroundColor: "white",
                  }}
                >
                  <div>Assembly:-</div>
                  <div>City Type:-</div>
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  // height: "6px",
                  // gap: "20px",
                  // border: "1px solid blue",
                  backgroundColor: "#f5f6fa",
                }}
              >
                <h1 style={{ display: "inline-block" }}>Local Address</h1>

                <div
                  style={{
                    width: "100%",
                    padding: "10px",

                    height: "40px",
                    // gap: "20px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    height: "50px",
                    backgroundColor: "white",
                  }}
                >
                  --
                </div>
              </div>
             
            </div>
          </td>
        </tr>
      ) : null}

      <br />
    </>
  );
};

export default KartkrtaTable;
