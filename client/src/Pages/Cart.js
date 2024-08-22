import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { SummaryApi } from '../common/common'
import Context from '../Context/context'
import displayINR from '../helper/displayINR'
import { MdOutlineDeleteForever } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js'



const Cart = () => {
    const[data,setData]= useState([])
    const[loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingList = new Array(context?.productCount).fill(null)

    const fetchCartDetail = async() =>{
        // setLoading(true)
        const response = await axios.get(SummaryApi.addToCartViewPort.url,{withCredentials:'include'})
        // setLoading(false)

        if (response.data.success) {
            setData(response?.data?.data)
        } 
    }  
    
    const handleLoading = async()=>{
        setLoading(true)    
       await  fetchCartDetail() 
        setLoading(false)
    }

    useEffect(()=>{
        handleLoading()          
    },[])

    const increseQty =async(id,qty)=>{
        
        const  response = await  axios.post(SummaryApi.updateAddtocart.url,{_id:id,quantity:qty+1},{withCredentials:'include'})
        if(response.data.success){
            fetchCartDetail()
        }
        }
        const decreseQty =async(id,qty)=>{
            if(qty > 1 ){
             const  response = await  axios.post(SummaryApi.updateAddtocart.url,{_id:id,quantity:qty-1},{withCredentials:'include'})
            if(response.data.success){
                fetchCartDetail()
            }
             }   
            }
        const deleteCart = async(id)=>{
            const  response = await  axios.post(SummaryApi.deleteAddtocart.url,{_id:id},{withCredentials:'include'})
            if(response.data.success){
                    fetchCartDetail()
                    context?.fetchUserCart()
            }
        }
        const handlePayment = async()=>{
            const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
            const response = await axios.post(SummaryApi.payment.url,{cartItems:data},{withCredentials:'include'})
            if(response.data.id){
                stripePromise.redirectToCheckout({sessionId:response.data.id})
            }
            console.log("payemnt response:",response.data)
        }

    // console.log("data",data)
    const totalQty =  data?.reduce((prevValue,currValue)=> prevValue + currValue?.quantity ,0)
    const totalPrice = data?.reduce((prev,curr)=> prev + (curr?.quantity *curr?.productId?.sellingPrice),0)
  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg font-medium my-3'>
        {
            data.length === 0 &&!loading &&(
                <p className='bg-white py-3 my-5 rounded-full'>No Data</p>
            ) 
        }
        </div>

        <div className=' flex flex-col lg:flex-row gap-10 justify-between p-4'>

            {/* view product */}
            <div className='w-full max-w-3xl'>
                {
                    loading ?(
                        loadingList.map((i,index)=>{
                            return(
                                <div className='w-full bg-slate-200 h-32 my-1 border-2 border-slate-300 animate-pulse rounded' key={index}> 

                                </div>
                            )
                        })
                    ):(
                           data?.map((i,index)=>{ 

                            return(
                                <div className='w-full  bg-white h-32 my-1 border-2 border-slate-300 rounded grid grid-cols-[128px,1fr]' key={index}> 
                               <div className='h-32 w-32 bg-slate-200'>
                                <img src={i?.productId?.productImage[0]} alt="product" className='w-full p-1 h-full object-scale-down mix-blend-multiply'/>
                               </div>
                               <div className='px-4 py-2 relative'>
                                {/* delete product */}
                                <div className='absolute right-0 bottom-0 p-2'onClick={()=>deleteCart(i?._id)}> 
                                    <MdOutlineDeleteForever size={20} color='red'/>
                                </div>
                                    <h2 className='text-lg text-ellipsis line-clamp-1 lg:text-xl'> {i?.productId?.productName}</h2>
                                    <p className='text-sm text-gray-500 line-clamp-1 capitalize'> {i?.productId?.category} </p>
                                    <div className='flex items-center justify-between'>  
                                         <p className='text-blue-500 font-medium text-lg '>{displayINR(i?.productId?.sellingPrice)}</p>
                                         <p className='text-slate-600 font-semibold text-lg '>{displayINR(i?.productId?.sellingPrice*i?.quantity)}</p>
                                    </div>
                                <div className='flex items-center gap-3 mt-1'>
                                    <button className='border-2 w-6 h-6 text-blue-500 border-gray-400 cursor-pointer  hover:bg-blue-500 hover:text-white  flex justify-center items-center rounded' onClick={()=>decreseQty(i?._id,i?.quantity)}> - </button> 
                                    <span>{i?.quantity}</span>
                                    <button className='border-2 w-6 h-6 text-blue-500 border-gray-400 cursor-pointer  hover:bg-blue-500 hover:text-white  flex justify-center items-center rounded' onClick={()=>increseQty(i?._id,i?.quantity)}> + </button>
                                </div>
                                </div>
                                </div>
                            )
                            })  
                    )
                }
            </div>
                {/* product Price Detail */}

                { 
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ?(
                                <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
                                  
                                 </div>  
                            ):(
                                <div className='h-32 bg-white'>
                                    <h2 className='bg-blue-600 text-white px-4 py-1'>summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                     </div>
        
                                     <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayINR(totalPrice)}</p>
                                     </div>
                                     <button className='bg-blue-600 p-2 w-full text-white' onClick={handlePayment}>Payment</button>
                                 </div>
                            )
                        }
                      </div>
                    )
                }
        </div>   
    </div>
  )
}

export default Cart
