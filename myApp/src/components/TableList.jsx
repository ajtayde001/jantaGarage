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
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { Complainerdata } from "./Complainerdata";
const TableList = ({
  id,
  tokenNumber,
  category,
  type,
  registeredBy,
  address,
  complainer,
  actualComplainDate,
  createdDate,
  hnadleDelete,
  deleteItem,
  recordStatus,
  hnadleComment,
  description,
  comments,
  karyaKarta,
  complainDueDate,
  status,
  requestedStatus,
  documents,
}) => {
  const mainDataComent = comments ? comments.reverse() : null;
  const assemblyName = address.assembly ? address.assembly.name : "_ _";
  const newuserName = registeredBy ? registeredBy.username : "";
  const newComplainDate = actualComplainDate
    ? actualComplainDate.split("T")[0]
    : null;
  const newComplainDate123 = actualComplainDate ? actualComplainDate : null;

  // const commenttextData=comments[0]?comments[0]?.text:"";
  const MaleFemalData =
    comments?.createdBy?.gender == "MALE" ? (
      <img
        style={{
          width: "35px",
          border: "1px solid orange",
          borderRadius: "20px",
          padding: "5px",
        }}
        src="https://staging.digitaloms.in/assets/icons/man@2x.png"
        alt=""
      />
    ) : (
      <img
        style={{
          width: "35px",
          border: "1px solid orange",
          borderRadius: "20px",
          padding: "5px",
        }}
        src="https://staging.digitaloms.in/assets/icons/woman@2x.png"
        alt=""
      />
    );

  const currentDate = new Date();
  // const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1;
  // const year = currentDate.getFullYear();

  // const formattedDate = `${year}-${month}-${day}`;
  // console.log(date)
  const newcreatedDate = createdDate ? createdDate.split("T")[0] : null;
  const complainDueData = complainDueDate ? complainDueDate.split("T")[0] : "";
  const newDate = new Date(complainDueData);
  console.log(currentDate < complainDueData);
  const karykrtaMaleFemal =
    karyaKarta?.gender == "MALE" ? (
      <img
        style={{
          width: "35px",
          border: "1px solid orange",
          borderRadius: "20px",
          padding: "5px",
        }}
        src="https://staging.digitaloms.in/assets/icons/man@2x.png"
        alt=""
      />
    ) : (
      <img
        style={{
          width: "35px",
          border: "1px solid orange",
          borderRadius: "20px",
          padding: "5px",
        }}
        src="https://staging.digitaloms.in/assets/icons/woman@2x.png"
        alt=""
      />
    );
  const karykrtaData = karyaKarta[0]
    ? `${karyaKarta[0]?.firstName}  ${karyaKarta[0]?.lastName}`
    : "_ _";
  const karykartaPhone = karyaKarta ? karyaKarta[0]?.phone : "_ _";
  const commentsData = comments ? comments[0] : "_ _";
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
          height: "200px",
          display: "table",
          background: "white",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <td>
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
        <td>
          <Flex>
            <Tooltip label={newComplainDate} placement="right">
              <CustomCard>
                <BsFillBookmarkFill
                  color={
                     status == "SOLVED"  ? "green":
                    currentDate <= newDate || newComplainDate123 == null
                      ? "gray"
                      
                    
                      : "red"
                  }
                  style={{
                    transform: "rotate(270deg)",
                    display: "inline-block",
                    marginRight: "6px",
                    marginBottom: "5px",
                  }}
                ></BsFillBookmarkFill>
              </CustomCard>
            </Tooltip>

            {tokenNumber ? tokenNumber : ""}
          </Flex>
        </td>
        <td>
          {" "}
          {category?.name ? category?.name : ""} <br />
          {type?.name ? type.name : ""}{" "}
        </td>
        <td>{newuserName}</td>
        <td>{address.line1 ? address.line1 : ""}</td>
        <td>{assemblyName}</td>
        <td>
          <Complainerdata complainer={complainer} />
        </td>
        <td>{newComplainDate}</td>
        <td>{newcreatedDate}</td>
        <td>
          {recordStatus == "DELETED" ? (
            <h1 style={{ color: "red" }}>Deleted</h1>
          ) : (
            <div
              style={{
                // width:"100%",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                //   marginLeft: "20px",
                flexDirection: "column",
              }}
            >
              <Tooltip label={"Edit"} placement="left">
                <Link to={`/complaint/edit/${id}`}>
                  <CustomCard>
                    <MdModeEdit 
                    size="18px"color="orange" type="button"></MdModeEdit>
                  </CustomCard>
                </Link>
              </Tooltip>
              <Tooltip label={"Delete"} placement="left">
                <CustomCard>
                  <RiDeleteBin5Line
                   size="18px"
                    color="orange"
                    type="button"
                    onClick={deletOnOpen}
                  ></RiDeleteBin5Line>
                </CustomCard>
              </Tooltip>
              <AlertDialog
                isOpen={deletOpen}
                leastDestructiveRef={cancelRef}
                onClose={deletClose}
              >
                <AlertDialogOverlay textAlign={"center"}>
                  <AlertDialogContent>
                    <AlertDialogHeader
                      fontSize="lg"
                      fontWeight="bold"
                      border="1px"
                      borderColor="gray.200"
                      bg={"#ffda83"}
                    >
                      Delete Customer
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={deletClose}>
                        Cancel
                      </Button>

                      <Button
                        colorScheme="red"
                        onClick={() => {
                          deletClose();
                          hnadleDelete(id);
                        }}
                        ml={3}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>

              {status != "SOLVED" ? (
                <Tooltip label={"Update Status"} placement="left">
                  <CustomCard>
                    <BiPlusMedical
                     size="18px"
                      onClick={statusOnOpen}
                      color="orange"
                      type="button"
                    ></BiPlusMedical>
                  </CustomCard>
                </Tooltip>
              ) : null}
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={statusOpen}
                onClose={statusClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader
                    fontSize="lg"
                    fontWeight="bold"
                    border="1px"
                    borderColor="gray.200"
                    bg={"#ffda83"}
                  >
                    Request For Status
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    {/* <Box border={"1px solid gray"} marginTop={"10px"}> */}
                    <Text>Current Status:{status}</Text>
                    <br />
                    <Select placeholder="Select Status">
                      {status != "HOLD" && status != "QUEUE" ? (
                        <option value="option1">Solved</option>
                      ) : null}
                      {status != "HOLD" ? (
                        <option value="option3">Hold</option>
                      ) : null}
                      {status != "INPROGRESS" ? (
                        <option value="option2">Inprogress</option>
                      ) : null}
                      {status != "INPROGRESS" && status != "QUEUE" ? (
                        <option value="option3">Unsolved</option>
                      ) : null}
                      {status != "INPROGRESS" &&
                      status != "HOLD" &&
                      status != "QUEUE" ? (
                        <option value="option3">Queue</option>
                      ) : null}
                    </Select>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <hr />
                    <br />
                    <Flex gap={5}>
                      <Button bg="#ffda83" mr={3}>
                        Save
                      </Button>
                      <Button bg="#ffda83" mr={3}>
                        Cencel
                      </Button>
                    </Flex>
                    {/* </Box> */}
                  </ModalBody>
                </ModalContent>
              </Modal>

              <Tooltip label={"Add Comments"} placement="left">
                <CustomCard>
                  <FaComments
                   size="18px"
                    onClick={comentOnOpen}
                    color="orange"
                    type="button"
                  ></FaComments>
                </CustomCard>
              </Tooltip>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={comentOpen}
                onClose={comentClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader
                    fontSize="lg"
                    fontWeight="bold"
                    border="1px"
                    borderColor="gray.200"
                    bg={"#ffda83"}
                  >
                    Add Comment
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Flex gap={5}>
                      <Input
                        type="text"
                        placeholder="comment"
                        onChange={(e) => {
                          setTextdata(e.target.value);
                        }}
                        value={textdata}
                      />

                      <Button
                        bg="#ffda83"
                        mr={3}
                        onClick={() => {
                          hnadleComment(id, textdata);
                          comentClose();
                        }}
                      >
                        Save
                      </Button>
                    </Flex>
                    <Box
                      marginTop={"10px"}
                      maxHeight={"100px"}
                      overflowY={"auto"}
                    >
                      {mainDataComent?.length > 0 &&
                        mainDataComent?.map((item) => {
                          return (
                            <>
                              <hr />
                              <div
                                style={{
                                  padding: "5px",
                                  marginBottom: "10px",
                                }}
                              >
                                <div style={{ display: "flex", gap: "5px" }}>
                                  {MaleFemalData}
                                  <h2
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Super Admin
                                  </h2>
                                  <p style={{ fontSize: "12px" }}>
                                    {newcreatedDate}
                                  </p>
                                </div>
                                <p
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    marginLeft: "30px",
                                  }}
                                >
                                  {item.text}
                                </p>
                              </div>
                              <hr />
                            </>
                          );
                        })}
                    </Box>
                  </ModalBody>
                </ModalContent>
              </Modal>
              {requestedStatus == "SOLVED" ? (
                <BsFillCheckCircleFill
                  color="orange"
                  type="button"
                ></BsFillCheckCircleFill>
              ) : null}
              <Flex>
              <Tooltip label={"Documents"} placement="left">
                <Box ml="1">
                  
                   
                      <IoIosDocument
                        onClick={docoOnOpen}
                        color="orange"
                        type="button"
                        size="18px"
                        overflow={"hidden"}
                      ></IoIosDocument>
                    
              
                  <Badge
                    ml="2"
                    marginTop="-60px"
                    bg={"transparent"}
                    color={"blue"}
                  >
                    {documents ? documents[0].length : 0}
                  </Badge>
                  
                </Box>
                </Tooltip>
              </Flex>

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
                <ModalContent w="1200px" h="300px">
                  <ModalHeader
                    fontSize="lg"
                    fontWeight="bold"
                    border="1px"
                    borderColor="gray.200"
                    bg={"#ffda83"}
                  >
                    Documents
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Text>Uploaded Documents</Text>
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
                            <Th>Document Name.</Th>
                            <Th>Comment</Th>
                            <Th>Size </Th>
                            <Th> Date </Th>
                            <Th> Added By</Th>
                            <Th> Download </Th>
                          </Tr>
                        </Thead>
                        <Tbody></Tbody>
                      </Table>
                    </TableContainer>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
          )}
        </td>
      </tr>

      {/* //////////////////////////// */}

      {hide ? (
        <tr
          style={{
            width: "100%",
            // padding: "10px",
            alignItems: "center",
            height: "200px",
            // gap: "20px",
            //  display:"flex",
            backgroundColor: "white",
            margin: "auto",
          }}
        >
          <td>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
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
                  width: "80%",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  // height: "6px",
                  // gap: "20px",
                  // border: "1px solid blue",
                  backgroundColor: "#f5f6fa",
                }}
              >
                <h1 style={{ display: "inline-block" }}>Description</h1>

                <div
                  style={{
                    width: "100%",
                    padding: "10px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    height: "50px",
                    // gap: "20px",
                    // border: "1px solid black",
                    backgroundColor: "white",
                  }}
                >
                  {description ? description : "_ _"}
                </div>
              </div>
              <div
                style={{
                  width: "80%",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  // height: "6px",
                  // gap: "20px",
                  // border: "1px solid blue",
                  backgroundColor: "#f5f6fa",
                }}
              >
                <h1 style={{ display: "inline-block" }}>Comments</h1>

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
                  {commentsData}
                </div>
              </div>
              <div
                style={{
                  width: "80%",
                  padding: "10px",
                  backgroundColor: "#f5f6fa",
                }}
              >
                <h1 style={{ display: "inline-block" }}>Address</h1>

                <div
                  style={{
                    width: "100%",
                    padding: "10px",

                    // height: "50px",
                    // gap: "20px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    height: "50px",
                    backgroundColor: "white",
                  }}
                >
                  {assemblyName}
                </div>
              </div>

              <div
                style={{
                  width: "80%",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  // height: "6px",
                  // gap: "20px",
                  // border: "1px solid blue",
                  // backgroundColor: "#f5f6fa",
                }}
              >
                <h1 style={{ display: "inline-block" }}>Assigned Karyakarta</h1>

                <div
                  style={{
                    width: "100%",
                    padding: "10px",

                    // height: "50px",
                    // gap: "20px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    height: "50px",
                    backgroundColor: "white",
                    display: "flex",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  <div>{karykrtaMaleFemal}</div>
                  <div style={{ marginTop: "-10px" }}>
                    <td>
                      {karykrtaData} {karykartaPhone}
                    </td>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      ) : null}

      {/* <div style={{
      width: "500px",
      padding: "10px",
      height: "60px",
      gap: "10px",
    border:'1px solid red',
      background: "white",
      overflow: "hidden"
      }}>
    <h1>ajay tayde</h1>
     <div style={{
      width: "20%",
      padding: "10px",
      height: "6px",
      gap: "20px",
    border:'1px solid blue',
      background: "white",
      }}>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, magni. Ipsa aut minus quae veritatis minima perferendis eius voluptas velit.</p>
     </div>
   
</div> */}

      <br />
    </>
  );
};

export default TableList;
