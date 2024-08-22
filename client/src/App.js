import { Outlet } from 'react-router-dom';
import './App.css';
import {useState} from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import {ToastContainer} from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios'
import { SummaryApi } from './common/common';
import Context from './Context/context';
import { useDispatch } from 'react-redux';
import { setUserDetail } from './Store/userSlice';

function App() {

  const dispatch = useDispatch()
  const[productCount,setproductCount] = useState(0)

  const fetchUserDetail = async()=>{
    const response = await  axios.get(SummaryApi.userDetail.url,{withCredentials:'include'})
    // console.log(response.data); 
    if (response.data.success) {
        dispatch(setUserDetail(response.data))
    }
  }  

  const fetchUserCart =async()=>{
    const response = await axios.get(SummaryApi.countCartproduct.url,{withCredentials:'include'})
    setproductCount(response?.data?.data?.count)
  }  
  
  //console.log("data Count :",productCount)


  useEffect(()=>{ 
  // user Deatil
    fetchUserDetail() 
    //userCart count
    fetchUserCart()
    
  },[]) 

 
  return (
    <>
   <Context.Provider value={
    {fetchUserDetail,  //fetch user detail
    productCount, //user cart detail
    fetchUserCart } 
   }>
    <ToastContainer theme='dark' position='top-center'/>
  <Header/>
  <main className='min-h-[calc(100vh-100px)] pt-24'>
    <Outlet/>
  </main>
  <Footer/>
  </Context.Provider>
    </>
  );
}

export default App;
