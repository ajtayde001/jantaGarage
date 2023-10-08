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
const OfficeTable = ({
    address,
    officeImage,
    users,
    name,
    karyakartas,
    InProgress,
    hold,
    solved,
    total,
    unSolved,
    officedata
}) => {

    const officename = name ? name : "__";
    const karykertaname=karyakartas?karyakartas:"__"
    const totalkarykrta=total?total:"__"
    const userName=users[0]?users[0].firstName+users[0].lastName:"__"
    const UserPhone=users[0]?users[0].phone:"__"
    const UserImage=<img src="https://staging.digitaloms.in/assets/icons/man.svg" alt="" />

    const offImage= officeImage&&JSON.parse(officeImage).length>0?<img src= {JSON.parse(officeImage)[0].access_url} alt="image"/>:<img src="https://staging.digitaloms.in/assets/layout/icon/office.svg"/>
  let arr=[InProgress,hold,solved,unSolved]
  let arrName=["InProgress","hold","solved","unSolved"]
  // console.log(arr)
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
        <td style={{width:"100px",textAlign:"left"}}>
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
        <td style={{width:"200px",textAlign:"left"}}>
            <div style={{display:"flex",width:"60px",borderRadius:"20px",gap:"5px"}}>
           
            {officeImage&&JSON.parse(officeImage).length>0?<img src= {JSON.parse(officeImage)[0].access_url} alt="image" style={{  width:"100px",height:"50px", borderRadius:"50%"}}/>:<img src="https://staging.digitaloms.in/assets/layout/icon/office.svg"/>}
            <GoDotFill style={{color:"greenyellow"}}></GoDotFill>
            {officename}
            </div>
       </td>
        <td style={{width:"300px",textAlign:"left"}}>
            <div style={{ width:"200px", display:"flex",gap:"5px",marginTop:"10px"}}>
            <div style={{ marginTop:"10px"}}>
            <img src="https://staging.digitaloms.in/assets/icons/man.svg" alt="" />
                </div>
                <div>
                    <div>
                    {userName}
                    </div>
                    <div style={{color:"grey"}}>
                    {UserPhone}
                    </div>
                    
                </div>     
                </div>     
        </td>       
        <td> 
        {totalkarykrta}      
          <ApexChart widths={105} legenda={false} catCountArray={arr} catNameArray={arrName} lableshow={false}/>
            
            </td>
        <td>
          {karykertaname}
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
                // display: "grid",
                // gridTemplateColumns: "repeat(4, 1fr)",
                width: "100%",
                padding: "10px",
                height: "150px",
                margin: "auto",
                gap: "20px",
                marginBottom: "20px",
                // border: "2px solid red",
                // backgroundColor: "#f5f6fa",
              }}
            >
              <div
                style={{
                  width: "100%",
                  padding: "10px",
                  // border:"1px solid red",
                  // backgroundColor: "#f5f6fa",
                }}
              >


                <div
                  style={{
                    width: "100%",
                    padding: "10px",
                    // boxShadow:
                    //   "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    height: "50px",
                   backgroundColor: "white",
                  }}
                >
                 
                 <div style={{ maxHeight: "150px", overflowY: "auto" }}>
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
                             
                              <Th>Name</Th>
                              <Th>Mobile Number</Th>
                              <Th>Actions</Th>
                             
                            </Tr>
                          </Thead>
                          <Tbody>
                            {users?.length > 0 &&
                              users?.map((item) => {
                                return (
                                  <Tr key={item.id}>
                                    <Td>{`${item?.firstName} ${item?.lastName}`}</Td>
                                    <Td>{item.phone} </Td>
                                    <Td>edit</Td>
                                   
                                  </Tr>
                                );
                              })}
                          </Tbody>
                        </Table>
                      </TableContainer>

                      <br />
                  

                      <br />
                    </div>
                 
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

export default OfficeTable;
