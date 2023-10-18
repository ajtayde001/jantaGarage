import {
  Box,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Image,
  Input,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Table,
  Tbody,
  Tr,
  TableContainer,

} from '@chakra-ui/react';

import { Search2Icon  } from '@chakra-ui/icons';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import logo from "../Photos/officeSystem.webp";
import { IoIosNotifications ,IoMdSettings,IoIosPeople} from 'react-icons/io';
import { AiOutlineMenu } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';
import { IoNotificationsSharp } from 'react-icons/io5';


export  function Navbar() {

  const [page, setPage] = useState(1);
 
  const Logout = () => {
        localStorage.clear();
        window.location.reload();
      }


  const handleSearch = val => {
    if (val) {
      // setStatus(true);
    }

    axios
      .get(`https://elated-gold-bandicoot.cyclic.app/laboratory/?q=${val}&_page=${page}&_limit=12`)
      .then(res => {
        console.log(res);
        // setData(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleDebounce = val => {
    if (id) clearTimeout(id);
    var id = setTimeout(() => {
      handleSearch(val);
    }, 1000);
  };

  return (
    <Box
      position={'fixed'}
      top="0"
      w="100%"
      zIndex={'overlay'}
      className="animate__animated animate__fadeInDown"
    >
      <Flex
        alignItems={'center'}
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'} 
      >
        
        <Flex
          w="100%"
          alignItems={'center'}
          // flex={{ base: 1 }}
          justify={{ base: 'center', md: 'end' }}
          justifyContent={"space-between"}
         
          gap={50}

        >
         <Flex width={"20%"}>
          <Text  fontSize={14} color={'blue'} fontWeight={"bold"}>Office Managment System</Text>
          </Flex> 

   <Flex width={"80%"} gap={"20px"}>
          <Flex
         
          // border={"1px solid red"}
          flex={{ base: 1 }}
         
        >
          <Box

            display={{
              base: 'none',
              sm: 'none',
              md: 'none',
              lg: 'flex',
              xl: 'flex',
              '2xl': 'flex',
            }}
            w="90%"
            // border={"1px solid black"}
         
          >
            <Input
              placeholder="Search something here..."
              borderRadius={'10px'}
              onChange={e => handleDebounce(e.target.value)}
            />
            <Box position={'relative'} right="40px" top="5px">  
              <Search2Icon />
            </Box>
          </Box>
        </Flex>

        <Flex   ml={10}  margin={'auto'} color={'blue'} gap={"7px"}> 
            
            <Link to={"/dashboard"}>Dashboard</Link>
            <Link to={"/"}>Register</Link>
            <Link >Schedule</Link>
            <Link to={"complaint"}>Complaintes</Link>
            <Link to={"visitors"}>Visitors</Link>
            <Link>Call</Link>
            <Link>Todo</Link>
           
          </Flex>
          <Flex  >
          <Popover >
  <PopoverTrigger>
  <Image width={10} src={logo}/>
  </PopoverTrigger>
  <Portal>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>Welcome Super Admin</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
      <TableContainer>
  <Table variant='striped' >
    <Tbody>
      <Tr style={{display:"flex",gap:"4px"}}>
        <div>
        <IoMdSettings style={{color:"grey"}}></IoMdSettings>
        </div>
        
           <Text marginTop={-1}>Settings</Text>
      </Tr>
      <Tr style={{display:"flex",gap:"4px"}}>
        <div>
        <AiOutlineMenu style={{color:"grey"}}></AiOutlineMenu>
        </div>
        
           <Text marginTop={-1}>System Menu</Text>
      </Tr>
      <Tr style={{display:"flex",gap:"4px"}}>
        <div>
        <IoIosPeople style={{color:"grey"}}></IoIosPeople>
        </div>
        
           <Text marginTop={-1}>Role</Text>
      </Tr>
      <Tr style={{display:"flex",gap:"4px"}} onClick={Logout}>
        <div>
        <TbLogout style={{color:"grey"}} ></TbLogout>
        </div>
        
           <Text marginTop={-1}><Link >Logout</Link></Text>
      </Tr>
      <Tr>
    
      </Tr>
    </Tbody>
  
  </Table>
</TableContainer>
      </PopoverBody>    
    </PopoverContent>
  </Portal>
</Popover>
</Flex>
<Flex >
          <div style={{width:"25px" ,border:"1px solid orange",borderRadius:"50px",height:"25px",marginRight:"20px",margin:"auto"}}>
          <IoNotificationsSharp style={{width:"24px", color:"yellowgreen",marginTop:"5px"}}></IoNotificationsSharp>
          </div>
          </Flex>
          </Flex>
        </Flex>   
      </Flex>
    </Box>
  );
}

