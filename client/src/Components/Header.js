import React, { useContext, useState } from 'react'
import logo from '../assest/logo.png'
import { IoSearch } from "react-icons/io5";
import { TbUserFilled } from "react-icons/tb";
import { HiShoppingCart } from "react-icons/hi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { SummaryApi } from '../common/common';
import {toast} from 'react-toastify'
import { setUserDetail } from '../Store/userSlice';
import ROLE from '../common/role';
import Context from '../Context/context';

const Header = () => {
  const user = useSelector(state =>state?.user?.user)
  const userData = user?.data
  // console.log("userDetail:",userData)
  // console.log("user",user);

  const[menu,setMenu] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const urlSearch = new URLSearchParams(searchInput?.search)
  const searchQry = urlSearch.getAll('q')
  const[serach,setSearch] =useState(searchQry)

  

  const dispatch = useDispatch()


  const LogoutHandler = async()=>{
    const response = await axios.get(SummaryApi.logout.url,{withCredentials:'include'})
    if (response.data.success) {
        toast.success(response?.data?.message)
        dispatch(setUserDetail(null))
        navigate('/')
    }
    else{
      toast.error('Something Went Wrong')
    }
  }    

  const handleSearch= (e)=>{
    const {value}= e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }
    else{
      navigate('/search')
    }
  }
  
  return (
    <header className='h-24 shadow-md bg-white fixed w-full z-40 '>
      <div className=' h-full mx-auto container flex items-center justify-between'>
        <div>
         <Link to={'/'}> <img src={logo} alt='' className='w-[100px] h-[90px] p-1' /> </Link>
        </div>

        <div className=' hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input type='text' placeholder='Search Here' className='w-full outline-none' onChange={handleSearch} value={serach}/>
          <div className='text-lg min-w-[50px] h-8 bg-blue-400 flex items-center justify-center rounded-r-full'>
            <IoSearch size={20} color='white' />
          </div>
        </div>

        <div className='flex items-center gap-5'>
          <div className='relative flex justify-center' > 
          <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenu(prev=>!prev)}>
            {
              user? <div className='bg-blue-400 text-black w-9 h-9 cursor-pointer flex rounded-full items-center justify-center'>
                <p className='text-sm cursor-pointer font-extrabold text-white'>{userData?.name.slice(0,1).toUpperCase()}</p>
                </div>
              :< TbUserFilled/>
            }
           </div>
           {
            menu &&
           ( 
           <div className='absolute gap-1 bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
            <nav>
              {
               userData?.role === ROLE.ADMIN &&(
              <Link to={'admin-panel'} className='whitespace-nowrap hidden md:block hover:bg-slate-100' onClick={()=>setMenu(prev=>!prev)}>Admin Panel</Link>
               )
               }
               <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100' onClick={()=>setMenu(prev=>!prev)}>Order</Link>
            </nav>
           </div>
           )
           }
          
          </div>    
           {
            user &&(
              <Link to={'/cart'} className='relative'>
              <span><HiShoppingCart size={30} color='black' /></span>
                <div className='bg-blue-500 w-5 h-5 flex items-center justify-center p-1 rounded-full text-white absolute -top-2 -right-3'>
                <p className='text-xs cursor-pointer'>{context?.productCount}</p>
                </div>
             </Link>
            )
           }
         

         <div className='p-1'>
          {user?<Link> <button onClick={LogoutHandler} className='px-3 py-1 bg-blue-400 rounded-full hover:bg-blue-500 text-white'>Logout</button></Link>
          : <Link to={'/login'}> <button className='px-3 py-1 bg-blue-400 rounded-full hover:bg-blue-500 text-white'>Login</button></Link>
          }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header