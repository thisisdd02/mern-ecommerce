import React, { useState } from 'react'
import ROLE from '../common/role'
import { RxCrossCircled } from "react-icons/rx";
import axios from 'axios'
import { SummaryApi } from '../common/common';
import { toast } from 'react-toastify';

const ChangeuserRole = ({name,email,role,onClose,userId,callFunc}) => {
    const[userRole,setUserRole] = useState(role)

    const onChangeSelectHandler =(e)=>{
        setUserRole(e.target.value) 
        console.log(e.target.value);
        
    }
    const updateUserRole = async()=>{
        const response = await axios.post(SummaryApi.userUpdate.url,{userId:userId,role:userRole},{withCredentials:'include'})

        if (response.data.success) {
            toast.success(response.data.message)
            onClose()
            callFunc()
        } else {
            toast.error(response.data.message)
        }
        console.log(response.data);
    }

  return (
   
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-40'>
        <div className='w-full mx-auto bg-white shadow-md p-4 max-w-sm'>
            <button className='block ml-auto cursor-pointer' onClick={onClose}> 
                <RxCrossCircled size={25} color='red'/>
             </button>
         <h1 className='pb-4 text-lg font-medium'>Change User Role</h1> 
         <p> Name :  {name}</p>
         <p> Email :  {email}</p>
          <div className='flex justify-between items-center my-4'>
           <p>Role</p>
                <select className='border px-4 py-1' value={userRole} onChange={onChangeSelectHandler}>
                 {
                     Object.values(ROLE).map(i=>{
                    return <option value={i}>{i}</option>
                   })
                  }
                 </select>
          </div>
            <button className='w-fit mx-auto border block py-1 px-2 rounded-full bg-blue-500 text-white hover:bg-blue-700' onClick={updateUserRole}>
                Change Role
            </button>
       </div>
    </div>
  )
}

export default ChangeuserRole