import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import displayINR from '../helper/displayINR';
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import Context from '../Context/context';
import { scrollTop } from '../helper/scrollTop';

const CategoryWiseProduct = ({category,heading}) => {
    const[data,setData]=useState([])
    const[loading,setLoading] = useState(false)
    const{fetchUserCart}=useContext(Context)
    const loadingList = new Array(13).fill(null)

    const handleCount  = async(e,id)=>{
        await addToCart(e,id)
        await fetchUserCart()
    }

    const fetchData = async()=>{
        setLoading(true)
        const categoryProudct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProudct.data)
    }

    useEffect(()=>{
        fetchData()
    },[])   

    
  return (
    
    <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between gap-4 md:gap-6 overflow-x-scroll scroll-bar transtion-all'>
             
            {
                loading?

                loadingList.map((i,index)=>{   
                    return(
                    <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow" onClick={scrollTop}>
                        <div className='bg-slate-200 h-48 p-4 min-w-[130px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                       </div>       
                        <div className='p-4 grid gap-3'>
                            <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 bg-slate-200 p-1 py-2 animate-pulse rounded-full'></h2>
                            <p className='capitalize text-slate-500 bg-slate-200 p-1 animate-pulse rounded-full py-2'></p>
                            <div className='flex  gap-3'> 
                                <p className='text-blue-700 font-medium w-full bg-slate-200 p-1 animate-pulse rounded-full py-2'></p>
                                <p className='text-slate-500 text-sm line-through w-full bg-slate-200 p-1 py-2 animate-pulse rounded-full'></p>
                             </div>
                             <button className='text-sm bg-slate-200 px-3 py-2  w-full animate-pulse rounded-full'></button>
                        </div>
                   </div>
                    )
                })
                :data.map((i,index)=>{
                    return(
                    <Link to={'/product/'+i?._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow" onClick={scrollTop}>
                        <div className='bg-slate-200 h-48 p-4 min-w-[130px] md:min-w-[145px] flex justify-center items-center'>
                           <img src={i?.productImage[0]} alt='' className='h-full object-scale-down hover:scale-110 transtion-all mix-blend-multiply'/>
                       </div>       
                        <div className='p-4 grid gap-3'>
                            <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1'>{i?.productName}</h2>
                            <p className='capitalize text-slate-500'>{i?.category}</p>
                            <div className='flex  gap-3'> 
                                <p className='text-blue-700 font-medium'>{displayINR(i?.sellingPrice)}</p>
                                <p className='text-slate-500 text-sm line-through'>{displayINR(i?.price)} </p>
                             </div>
                             <button className='text-sm bg-blue-500 hover:bg-blue-700 px-3 py-0.5 rounded-full' onClick={(e)=>handleCount(e,i?._id)}> Add To Cart</button>
                        </div>
                   </Link>
                    )
                })

            }
         </div>
    </div>  
  )
}

export default CategoryWiseProduct