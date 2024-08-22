import React,{useContext} from 'react'
import { scrollTop } from '../helper/scrollTop'
import displayINR from '../helper/displayINR'
import addToCart from '../helper/addToCart';
import Context from '../Context/context';
import { Link } from 'react-router-dom';

const VerticalCard = ({loading,data=[]}) => {
    const{fetchUserCart}=useContext(Context)

    const handleCount  = async(e,id)=>{
        await addToCart(e,id)
        await fetchUserCart()
    }
    const loadingList = new Array(13).fill(null)
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center  gap-4  md:justify-between md:gap-6 overflow-x-scroll scroll-bar transtion-all'>
             
            {
                loading?

                loadingList.map((i,index)=>{   
                    return(
                    <div className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow" onClick={scrollTop}>
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
  )

}

export default VerticalCard