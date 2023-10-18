import React, { useEffect, useState } from 'react'
import Officecard from '../components/OfficeCard'
import axios from 'axios';
import { useSelector } from 'react-redux';

const Officedatapage = () => {

const {
    officedata
  } = useSelector((store) => store.productReducer);

  return (
    <div style={{height:"2500px", backgroundColor: "#eceff5"}}>
        <div style={{width:"88%",display:"flex",justifyContent:"space-between",margin:"auto",marginTop:"20px"}}>
            <h3>Office({officedata.length})</h3>
            <div style={{display:"flex"}}>
                <img src="https://staging.digitaloms.in/assets/tempIcons/Path%20281.png" alt="" />
                <p>New Office</p>
            </div>
        </div>

        <div style={{width:"98%", height:"100%",margin:"auto",border:"1px solid grey",alignContent:"center",marginLeft:"20px"}}>
 
<Officecard limit={false}/>
</div>
    </div>
  )
}

export default Officedatapage