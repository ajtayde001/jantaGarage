import React, { useEffect, useRef, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoIosDocument } from "react-icons/io";
import {
  Box,
  Tag,
  Tooltip,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";

const VisitorsTable = ({
  id,
  visitor,
  firstName,
  lastName,
address,
aadhar,
phone,
role,
uniqueId,
pancard,
assembly,
ProfileImage,
gender,
tokenNumber,
purposeCategory,
purpose,
priority,
actualVisitDate
}) => {

const AssemblyNumber=assembly==null?"_ _":assembly
  // console.log(visitor)   
const Firstname=firstName?firstName:visitor?visitor.firstName:"_ _"
  const Lastname=lastName?lastName:visitor?visitor.lastName:"_ _"
  const Adhar=aadhar?aadhar:visitor?visitor.aadhar:"_ _"
  const Pannum=pancard?pancard:visitor?visitor.pancard:"_ _"
  const Addre=address?address:visitor?visitor.address:"_ _"
  const PhoneNuber=phone?phone:visitor?visitor.phone:"_ _"
  const UNIQID=uniqueId?uniqueId:visitor?visitor.uniqueId:"_ _"

  const newcreatedDate = actualVisitDate?actualVisitDate.split("T")[0] : "";
  // console.log(Firstname) 
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
 
  return (
    <>
      <tr
        class="fst"
        style={{
          width: "100%",
          height: "75px",
          display: "table",
          background: "white",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
         
        }}
      >
        <td style={{width:"15%"}}>
        <div style={{width:"100%",display:"flex",gap:"5px"}}>
            <img style={{ width:"20%", height:"40px",border:"1px solid orange",borderRadius:"20px",padding:"5px"}}
             src="https://staging.digitaloms.in/assets/icons/isVoter.svg" alt="" />
            {gender=="MAlE"?<img style={{ width:"20%", height:"40px",border:"1px solid orange",borderRadius:"20px",padding:"5px"}} 
            src="https://staging.digitaloms.in/assets/icons/man@2x.png" alt="" />:gender=="FEMALE"? <img style={{  width:"20%", height:"40px",border:"1px solid orange",borderRadius:"20px",padding:"5px"}} 
            src="https://staging.digitaloms.in/assets/icons/woman@2x.png" alt="" />:ProfileImage&&JSON.parse(ProfileImage).length>0?<img src= {JSON.parse(ProfileImage)[0].access_url} alt="image" style={{ width:"20%", height:"40px",border:"1px solid orange",borderRadius:"20px",padding:"5px"}}/>:<img src="https://staging.digitaloms.in/assets/icons/man@2x.png" style={{ width:"20%", height:"40px",border:"1px solid orange",borderRadius:"20px",padding:"5px"}}/>}
            <div style={{marginTop:"-17px"}} >
                <p  style={{fontSize:"14px"}}>{UNIQID}</p>
                <p style={{fontSize:"14px",color:"gray"}}>{Firstname} {Lastname}</p>
            </div>
        </div>
        </td>
        <td style={{width:"15%"}}>
          {PhoneNuber}
        </td>
        {purposeCategory? <td style={{width:"15%"}}>
          {priority}
        </td>:null}


        {purposeCategory? null:<td style={{width:"15%"}}>
          {" "}
          Aadhar:-{Adhar}
          <br />
          PanCard:-{Pannum}
        </td>}

        
        
        {purposeCategory? <td style={{width:"15%"}}>
            _ _
        </td>: <td style={{width:"15%"}}>
            {Addre}
        </td>}
       

        {purposeCategory? <td style={{width:"15%"}}>
          {purpose.name}
        </td>:null}

        {purposeCategory? <td style={{width:"15%"}}>
          {newcreatedDate}
        </td>:null}

        {purposeCategory? null:<td style={{width:"15%",margin:"auto"}}>
            {AssemblyNumber}
            </td>}
        
        <td style={{color:"#fdc356",width:"10%",margin:"auto"}}>
          {
            purposeCategory?<IoIosDocument></IoIosDocument>:<MdModeEdit ></MdModeEdit>
          }
         </td>
      </tr>

      <br />
    </>
  );
};

export default VisitorsTable;
