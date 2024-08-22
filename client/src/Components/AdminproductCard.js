import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINR from '../helper/displayINR';


const AdminproductCard = ({data,fetchProductData}) => {
    const[editProduct,setEditProduct]=useState(false)
  return (
    <div className='bg-white p-5  rounded '>
      <div className='w-40'>
        <div className='w-40 h-40 flex justify-center items-center'>
             <img src={data?.productImage[0]} width={120} height={120} className='mx-auto object-contain h-full' alt=''/>
        </div>
        <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
        <div>
          <p className='font-semibold'> 
            {
              displayINR(data.sellingPrice)
            } 
            
          </p>
          <div className='w-fit ml-auto p-2 cursor-pointer' onClick={()=>setEditProduct(true)}>
              <MdModeEditOutline size={20} color='gray'  />
           </div>
           </div>
        </div>

        {
            editProduct&&(
                <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchProductData={fetchProductData}/>
            )
        }
    
    </div>  
  )
}

export default AdminproductCard