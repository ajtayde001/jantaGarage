import React from 'react'
import Officecard from '../components/OfficeCard'
import KarykrtaCard from '../components/KarykrtaCard'
import { useSelector } from 'react-redux';

const Karykartadatapage = () => {
    const {
        karykarta
      } = useSelector((store) => store.productReducer);
 
  return (
    <div >
        <div style={{width:"88%",display:"flex",justifyContent:"space-between",margin:"auto",marginTop:"20px"}}>
            <h3>Karykartas({karykarta.length})</h3>
            <div style={{display:"flex"}}>
                <img src="https://staging.digitaloms.in/assets/tempIcons/Path%20281.png" alt="" />
                <p>New Office</p>
            </div>
        </div>

        <div style={{width:"98%", height:"100%",margin:"auto"}}>
 
<KarykrtaCard limit={false}/>
</div>
    </div>
  )
}

export default Karykartadatapage