import React, { useCallback, useEffect, useState , useContext } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { SummaryApi } from '../common/common'
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import displayINR from '../helper/displayINR'
import CategoryWiseProduct from '../Components/CategoryWiseDisplayProduct';
import Context from '../Context/context';
import addToCart from '../helper/addToCart';

const ProductDetail = () => {
  const[data,setData]= useState({
    productName :"", 
    brandName:"",
    category :"",
    productImage: [],
    description :"",
    price :"",
    sellingPrice :""
  })
  const[loading,setLoading]= useState(false)
  const[activeImg,setActiveImg] = useState("")
  const[zoomImg,setZoomImg]=useState({x:0,y:0})
  const[zoom,setZoom]= useState(false)
  const productImgLoadingList = new Array(4).fill(null)
  const params = useParams()
  const{fetchUserCart}=useContext(Context)
  const navigate = useNavigate()

  const handleCount  = async(e,id)=>{
    await addToCart(e,id)
    await fetchUserCart()
}
const handleBuy  = async(e,id)=>{
  await addToCart(e,id)
  await fetchUserCart()
  navigate('/cart')
}


  
  const fetchProductDetail =async()=>{
    setLoading(true)
    const response = await axios.post(SummaryApi.productDetail.url,{productId :params?.id})
    setLoading(false)
     setData(response?.data?.data)
    setActiveImg(response?.data?.data?.productImage[0])
  }

  useEffect(()=>{
      fetchProductDetail()
  },[params])

  const handleMouse =(i)=>{
    setActiveImg(i)
  }
  
  const handleZoom = useCallback((e)=>{
    setZoom(true)
    const{left,height,top,width} = e.target.getBoundingClientRect()
    const x = (e.clientX -left) / width
    const y = (e.clientY -top) / height
    setZoomImg({x,y})
  },[zoomImg])

  const handleZoomOut =()=>{
    setZoom(false)
  }

  return (
    <div className='container mx-auto p-4'>
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* product Img */}
          <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
            <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                 <img src={activeImg} className="h-full w-fll object-scale-down mix-blend-multiply" onMouseLeave={handleZoomOut} onMouseMove={handleZoom}/>
                  {/* product Zoom */}
                  {
                    zoom && (
                      <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 top-0 -right-[510px]'> 
                    <div className='w-full h-full min-w-[500px] min-h-[400px] mix-blend-multiply scale-150'
                     style={{backgroundImage : `url(${activeImg})`,
                     backgroundRepeat:'no-repeat',
                     backgroundPosition:`${zoomImg.x*100}% ${zoomImg.y*100}% `
                     }}>

                    </div>
                 </div>)
                  }
                 
            </div>

              <div className='h-full'>
                  {
                    loading ?(
                    <div className='flex gap-2 lg:flex-col overflow-scroll scroll-bar h-full'>
                    {
                    productImgLoadingList?.map((i,index)=>{
                     return(
                       <div className='h-20 w-20 bg-slate-200 animate-pulse rounded' key={index}>

                       </div>
                    )})
                    }
                    </div>
                    ):(
                    <div className='flex gap-2 lg:flex-col overflow-scroll scroll-bar h-full'>
                    {
                    data?.productImage?.map((i,index)=>{
                     return(
                       <div className='h-20 w-20 bg-slate-200 rounded p-1' key={index}>
                          <img src={i} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouse(i)} onClick={()=>handleMouse(i)}/>
                       </div>
                    )})
                    }
                    </div>
                    )
                  }
              </div>
          </div>
          {/* product Detail */}
          {
            loading ?(
              <div className='grid gap-1 w-full lg:h-8'>
              <p className='bg-slate-200 rounded-full px-3 inline-block  p-3 animate-pulse h-6 w-full lg:h-8'></p>
              <h2 className="font-medium text-2xl lg:text-4xl bg-slate-200 p-3 animate-pulse rounded-full h-6w-full lg:h-8 "></h2>
              <p className='capitalize text-slate-400 bg-slate-200 p-3 animate-pulse rounded-full h-6 w-full lg:h-8'></p>
              <div className='flex gap-1 h-6 animate-pulse w-full lg:h-8'>
              <IoStarOutline size={20} color='gray' />
              <IoStarOutline size={20} color='gray'/>
              <IoStarOutline size={20}  color='gray' />
              <IoStarOutline size={20}  color='gray' />
              <IoStarOutline size={20} color='gray'/>
              </div>
              <div className='flex items-center gap-4 text-2xl  lg:text-3xl font-medium  h-6 w-full lg:h-8 text-blue-500 my-1'>
                  <p className='bg-slate-200 p-2  w-full animate-pulse rounded-full h-6 lg:h-8'></p>
                  <p className='text-slate-400 line-through bg-slate-200 p-2 w-full animate-pulse rounded-full h-6 lg:h-8'></p>
               </div>

               <div className='flex items-center gap-3 my-2 w-full'>
                <button className=' px-3 py-1 min-w-[120px] bg-slate-200 p-3 animate-pulse rounded-full h-6 w-full lg:h-8'> </button>
                <button className=' px-3 py-1 min-w-[120px] bg-slate-200 p-3 animate-pulse rounded-full h-6 w-full lg:h-8'>  </button>
               </div>

               <div>
                  <p className='text-slate-600 font-medium my-1 bg-slate-200 p-2 animate-pulse rounded-full h-6 w-full lg:h-8'></p>
                  <p className="p-2 h-10 bg-slate-200 animate-pulse rounded-full w-full lg:h-12"> </p>
                 </div>

          </div> 
            )
            :(
              <div className='flex flex-col gap-1'>
              <p className='bg-blue-300 text-blue-500 rounded-full px-3 inline-block w-fit'>{data?.brandName}</p>
              <h2 className="font-medium text-2xl lg:text-4xl">{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>
              <div className='flex gap-1'>
              <IoStar size={20} color='orange'/>
              <IoStar size={20} color='orange'/>
              <IoStar size={20} color='orange'/>
              <IoStar size={20} color='orange'/>
              <IoStarHalf size={20} color='orange'/>
              </div>
              <div className='flex items-center gap-4 text-2xl  lg:text-3xl font-medium text-blue-500 my-1'>
                  <p>{displayINR(data?.sellingPrice)}</p>
                  <p className='text-slate-400 line-through'>{displayINR(data?.price)}</p>
               </div>

               <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-blue-500 rounded px-3 py-1 min-w-[120px] text-blue-500 font-medium hover:bg-blue-500 hover:text-white'  onClick={(e)=>handleBuy(e,data?._id)}> Buy </button>
                <button className='border-2 border-blue-500 rounded px-3 py-1 min-w-[120px] bg-blue-500 text-white font-medium hover:bg-white hover:text-blue-500' onClick={(e)=>handleCount(e,data?._id)}>AddTo Cart  </button>
               </div>

               <div>
                  <p className='text-slate-600 font-medium my-1'>Description :</p>
                  <p>{data?.description}</p>
                 </div>

          </div> 
            )
          }
       
       </div>

       {
          data?.category &&(
            <CategoryWiseProduct category={data?.category} heading={"Recommended product"}/>
          )
       }
      
    </div>

  )
}

export default ProductDetail