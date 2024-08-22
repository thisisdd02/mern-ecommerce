import React, { useEffect } from 'react'
import {useSelector} from 'react-redux';
import { TbUserFilled } from "react-icons/tb";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';


const AdminPanel = () => {
    const user = useSelector(state =>state?.user?.user)
    const userData = user?.data
    // console.log("userDetail:",userData)
    // console.log("user:",user)
    const navigate =useNavigate()

    useEffect(()=>{
       if( userData?.role !== ROLE.ADMIN) {
        navigate('/')
      }
    },[user])


  return (
    <div className='min-h-[calc(100vh-100px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 customshadow'>
            <div className='h-32 flex justify-center items-center flex-col'>
            <div className='text-4xl cursor-pointer flex justify-center'>
            {
              user? <div className='bg-blue-600 text-black w-11 h-11 cursor-pointer flex rounded-full items-center justify-center'>
                <p className='text-sm cursor-pointer font-extrabold text-white'>{userData?.name.slice(0,1).toUpperCase()}</p>
                </div>
              :< TbUserFilled/>
            }
           </div>

            <p className='font-bold mt-1 capitalize text-lg'>{user?.data.name}</p>
            <p className='font-semibold mt-1 capitalize text-sm'>{user?.data.role}</p>
            </div>
            {/* navigate all user */}
            <div>
              <nav className='grid p-4'>
                <Link to={'all-user'} className='px-2 py-1 hover:bg-slate-100'>All User</Link>
                <Link to={'all-product'} className='px-2 py-1  hover:bg-slate-100'>Product</Link>

              </nav>
            </div>
        </aside>


        <main className='w-full h-full p-2'>
              <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel 