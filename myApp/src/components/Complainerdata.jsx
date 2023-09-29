export const Complainerdata = ({complainer}) => {
   
  return <>
   <div style={{display:"flex",gap:"5px"}}>
    <div>
        {
            complainer?.isVoter? <img style={{width:"15px",marginLeft:"20px"}} src="https://staging.digitaloms.in/assets/icons/isVoter.svg" alt="" />: <img style={{width:"15px",marginLeft:"20px"}} src="https://staging.digitaloms.in/assets/icons/isVoterred.svg" alt="" />
        }
        {/* <img style={{width:"15px",marginLeft:"20px"}} src="https://staging.digitaloms.in/assets/icons/isVoter.svg" alt="" /> */}
    </div>
    <div >
        {
            complainer?.gender=="MALE"? <img style={{ width:"35px",border:"1px solid orange",borderRadius:"20px",padding:"5px"}} src="https://staging.digitaloms.in/assets/icons/man@2x.png" alt="" />:<img style={{ width:"35px",border:"1px solid orange",borderRadius:"20px",padding:"5px"}} src="https://staging.digitaloms.in/assets/icons/woman@2x.png" alt="" />
        }
        
    </div>
    <div style={{marginTop:"-10px"}}>
       <p style={{color:"gray",fontSize:"14px"}}>{(complainer?.uniqueId)?complainer?.uniqueId:""}</p>
       <p>{complainer?.firstName
    ? complainer?.firstName
    : "" + " " + complainer?.lastName
    ? complainer?.lastName
    : ""}</p>
       <p style={{color:"gray",fontSize:"14px"}}>{complainer?.phone
    ? complainer?.phone
    : "_ _"}</p>
    </div>
   </div>
  
  </>;
};

