import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SummaryApi } from '../common/common'
import {toast} from 'react-toastify'
import moment from 'moment'
import { FaUserEdit } from "react-icons/fa";
import ChangeuserRole from '../Components/ChangeuserRole'


const AllUser = () => {

  const[allUser,setAlluser] = useState([])
  const[openUpdateRole,setOpenUpdateRole] = useState(false)
  const[updateUserDetail,setUpdateUserDetail] = useState({
    name:'',
    email:'',
    role:'',
    _id:''
  })

  const fetchAllUser = async()=>{
    const response = await axios.get(SummaryApi.allUser.url,{withCredentials:'include'})

    if (response.data.success) {
        setAlluser(response.data.data)
    } else {  
      toast.error('error')
    }

     console.log(response.data);
   
  }

  useEffect(()=>{
    fetchAllUser()
  },[])

  return (
    <div className ='pb-4 bg-white '>
      <table className='w-full customtable text-center'>
      <thead>
          <tr className='bg-gray-500 text-white'>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Action</th>
          </tr>
        </thead>
      <tbody>
        {
           allUser.map((i,index) => {
            return(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{i?.name}</td>
              <td>{i?.email}</td>
              <td>{i?.role}</td>
              <td>{moment(i?.createdAt).format('ll')}</td>
              <td>
                <button className='text-2xl cursor-pointer'
                 onClick={()=>
                  {
                    setUpdateUserDetail(i)
                    setOpenUpdateRole(true)
                  }}>
                  <FaUserEdit className='text-blue-500 hover:text-blue-700'/>
                </button>
               </td>
              </tr>
            )
           })
        }
      </tbody>
      </table>
      {
          openUpdateRole&&(
              <ChangeuserRole onClose={()=>setOpenUpdateRole(false)}
                name={updateUserDetail.name}
                email={updateUserDetail.email}
                role={updateUserDetail.role}
                userId={updateUserDetail._id}
                callFunc={fetchAllUser}
              />
          )
      }
      
    </div>
  )
}

export default AllUser