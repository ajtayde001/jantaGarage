import React, { useEffect, useRef, useState } from "react";
import { deleteData, getAssembliesData, getCategoriesData, getFilterDAta, getProductDAta, getSearchDAta, postCommentData } from "../redux/productReducer.js/action";
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
} from '@chakra-ui/react'

const mainObj = {

  
  dateFrom: "",
  dateTo: "",
  kiosk: false,
  page: { number: 0, size: 10 },
  flag: null,
  
};
 const cityData={
  label:"",
  value:"",
 }
const Complaints = () => {
 

  const { products, serchMainData ,CategoriesData,assembliesData} = useSelector((store) => store.productReducer);
  console.log(products)
  const dispatch = useDispatch();
  const [mainpage, setPage] = useState(0);
  const [mainsize, setPagesize] = useState(10);
  const [searchdata, setSearchdata] = useState("");
  const [mainID, setID] = useState(10);
  const [cm, setcm] = useState(false);
  const initRef = useRef()
  const [mainData1, setMainData1] = useState(mainObj);
  const [city, setCity] = useState(cityData);
  const [cat, setcatData] = useState(null);

  const [userSarch, setUserSearch] = useState("");
  const [assemble, setassembleData] = useState(null);
  const [typ, setTypData] = useState(null);
  const nest = () => {
    setPage(mainpage + 1);
  };
  const prev = () => {
    setPage(mainpage - 1);
  };
  let dataMain = { kiosk: false, page: { number: mainpage, size: mainsize } };
  const JWTToken = localStorage.getItem("token");
  const yourConfig = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
     
      Authorization: `Bearer ${JWTToken}`,
    },
  };

  //  console.log(assembliesData);
  //  console.log(CategoriesData);
  //////////////////////////////////
  
  const handleComp = (e) => {
    const { name, value } = e.target;

    setMainData1((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleCity = (e) => {
    const { name, value } = e.target;
      setCity((pre) => {
        return { ...pre, [name]: value };
      })
    
  };
 
  if(city.value=="CITY"){
    city.label = "City";
  }

 
  
  const mainData = products[0]?products[0].reverse():null;
  // console.log(mainData);

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


  const hnadleDelete = (id) => {
    let pros = mainData.find((e) => e.id == id);
    pros.recordStatus = "DELETED";
    // console.log(pros);
    
    dispatch(deleteData(pros, yourConfig));
    // window.location.reload();
  };


  const hnadleSearch = (e) => {
    e.preventDefault();
    const pros ={
      search: searchdata,
      category: null,
      type: null,
      dateFrom: "",
      dateTo: "",
      kiosk: false,
      page: { number: 0, size: mainsize },
      flag: null
  }
 
    dispatch(getSearchDAta(pros, yourConfig));
    // console.log(searchdata)
  };

  const hnadleComment = (id,textdata) => {
    let pros =  {
    text: textdata,
    entityType: "COMPLAIN",
    complains: id
}

    dispatch(postCommentData(pros, yourConfig)).then((res) => {
      dispatch(getProductDAta(dataMain, yourConfig))
  });
    // setcm(true);
    // window.location.reload();
  };
  const caterf = cat ? JSON.parse(cat) : {};
  // console.log(caterf);

  const assembleOne = assemble ? JSON.parse(assemble) : {};
  // console.log(assembleOne);

  const typdata = caterf ? caterf.types : [];

  // console.log(typdata)
  const typKaObj = typ ? JSON.parse(typ) : {};
  // console.log(city);
  ////////////////////

  const handleFilter = () => {
    // alert("show")
    if(Object.keys(assembleOne).length > 0){
      mainData1.assembly = assembleOne;
    }
   if(city.value=="CITY"|| city.value=="VILLAGE" ){
    mainData1.cityType = Object.keys(city).length > 0 ?city:null;
   }
    
    
    mainData1.category = Object.keys(caterf).length > 0 ?caterf:null;
    mainData1.type = Object.keys(typKaObj).length > 0  ? typKaObj:null;
    // console.log(mainData1)

    dispatch(getFilterDAta(mainData1, yourConfig));
    // setMainData1(mainObj)
  };

  useEffect(() => {
    dispatch(getProductDAta(dataMain, yourConfig));
    dispatch(getCategoriesData(yourConfig));
    dispatch(getAssembliesData(yourConfig));
  }, [JWTToken, mainpage, mainsize,cm,searchdata]);


  return (
    <>
    
      <div
        style={
          {
          width: "100%",
          height: "2800px",
          margin: "auto",
          // border: "2px solid blue",
          marginBottom: "100px",
          marginTop:"50px",
          backgroundImage: `url("https://staging.digitaloms.in/Image6.e195202fd0acbdc8b0f9.png")`,
          opacity: "10",
        }
      }
      >
        <div
          style={{
            width: "95%",
            height: "50px",
            margin: "auto",
            marginTop: "10px",
            // border: "2px solid blue",
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
            Complaints and Demands{100}
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
                <button className="sarchbtn" type="submit" onClick={(e)=>{hnadleSearch(e)}}>
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
      <Popover size={"max"} closeOnBlur={false} placement='bottom' initialFocusRef={initRef}
       >
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger >
            <Button> <FcFilledFilter size={25}></FcFilledFilter></Button>
          </PopoverTrigger>
          <Portal size={'max'}>
            <PopoverContent boxShadow={"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}  w="400px" 
              h="320px" marginRight={"40px"}>
              <PopoverArrow />
              <PopoverHeader >Filter</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody size={'max'}>
              <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      padding:"10px",
                      borderBottom:"1px dotted gray",
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
                                value={city.value}
                                name="value"
                                onChange={(e) => {
                                  handleCity(e);
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
                                <option value="VILLAGE">VILLAGE</option>
                                <option value="CITY"> CITY</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div style={{ width: "50%" }}>
                         
                         
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
                            To Date*
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
                         
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                <Button
                  mt={4}
                  bg={"#ffda83"}
                  // colorScheme='#ffda83'
                 
                  ref={initRef}
                  marginBottom={"25px"}
                  onClick={()=>{
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
                  colorScheme='blue'
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
            display: "flex",
            flexDirection: "column",
            width: "95%",

            marginLeft: "30px",

            border: "4px solid black",
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
                  <th _ngcontent-rcy-c20="" className="ng-star-inserted">
                    {" "}
                    Token Number{" "}
                  </th>
                  <th _ngcontent-rcy-c20="" className="ng-star-inserted">
                    {" "}
                    Complaint Category{" "}
                  </th>
                  <th _ngcontent-rcy-c20="" className="ng-star-inserted">
                    {" "}
                    Registered By{" "}
                  </th>
                  <th _ngcontent-rcy-c20="" className="ng-star-inserted">
                    {" "}
                    Address{" "}
                  </th>
                  <th _ngcontent-rcy-c20="" className="ng-star-inserted">
                    {" "}
                    Assembly, Locality : Address{" "}
                  </th>
                  <th _ngcontent-rcy-c20="" className="ng-star-inserted">
                    {" "}
                    Complainer{" "}
                  </th>
                  <th _ngcontent-rcy-c20="" className="ng-star-inserted">
                    {" "}
                    Complaint Date{" "}
                  </th>
                  <th _ngcontent-rcy-c20="" className="ng-star-inserted">
                    {" "}
                    Created Date{" "}
                  </th>
                  <th _ngcontent-rcy-c20="" className="ng-star-inserted">
                    {" "}
                    Actions{" "}
                  </th>
                </tr>
              </thead>
              {mainData?.length==0?"No data available": <tbody
                style={{
                  width: "100%",
                  padding: "20px",
                  height: "50px",

                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                
                {mainData?.length > 0 &&
                  mainData?.reverse().map((item) => {
                    return (
                      <TableList
                        key={item.id}
                        {...item}
                        hnadleDelete={hnadleDelete}
                    
                        hnadleComment={hnadleComment}
                      />
                    );
                  })
                  }
              </tbody>}
             
            </table>
          </div>
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

export default Complaints;
