import React, {useContext, useState } from 'react'
import logo_icon from '../assest/signin.gif'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SummaryApi } from '../common/common'
import { toast } from 'react-toastify'
import Context from '../Context/context'

const Login = () => {
    const navigate = useNavigate()
   const{fetchUserDetail} =useContext(Context)
    const [data,setData] = useState({
        email: '',
        password: '',
        profilepic:""  
    })

    const onChangeHandler = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
        // console.log(data);
    }
   
   
   
      const onSubmitHandler =async (e)=>{
        e.preventDefault();

        const response =  await axios.post(SummaryApi.Login.url,data,{withCredentials:'include'});

        if(response.data.success){
            toast.success(response.data.message);
            navigate('/') 
            fetchUserDetail()
        }
        else{  
            toast.error(response.data.message);
        }

        setData({
            email: '',
            password: '',
           profilepic:''
        })
    }

  return (
        <section id='login'>
            <div className='mx-auto  container p-5'>
                <div className='bg-white  p-4 w-full max-w-sm mx-auto rounded'>
                    <div className='w-20 h-20 mx-auto'>
                     
                        <div>
                             <img src={data.profilepic||logo_icon} alt='' className='rounded-full'/>
                        </div>
                        <div>
                            <p className='text-xs font-bold'>Let Me Know!</p>
                        </div>    
                        
                     </div>
                <form className='pt-5 flex flex-col gap-4' onSubmit={onSubmitHandler}>
                    <div className='grid'>
                        <label>E-mail:</label>
                       <div className='bg-slate-100 p-2 rounded-2xl '>
                       <input type='email' placeholder='Enter your email' name='email' value={data.email}  onChange={onChangeHandler} className='w-full h-full  outline-none bg-transparent' required/>
                       </div>
                    </div>
                    <div className=''>
                        <label>Password:</label>
                        <div className='bg-slate-100 p-2  rounded-2xl '>
                        <input type='password' placeholder='Enter your password' name='password' value={data.password} onChange={onChangeHandler}   className='w-full  h-full outline-none bg-transparent' required/>
                    </div>
                        <Link to={'/forgot-password'} className='pt-2'>
                            <p className='hover:underline text-blue-400 pt-2' >Forgot password?</p>
                        </Link>
                    </div>
                   <button className='bg-blue-500 text-white px-6 py-2 w-full font-bold max-w-[150px] rounded-full mx-auto block mt-4 transition-all hover:scale-100 hover:bg-blue-400 cursor-pointer'>Login</button>
                </form>
                <p className='my-5'>Don't Have Accoun? <Link to={'/sign-up'}><span className='font-bold text-blue-500 cursor-pointer'>sign up</span></Link></p>
                </div>
            </div>

        </section>
  )
}

export default Login