import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SummaryApi } from '../common/common'
import { Link } from 'react-router-dom'

const CategoryList = () => {

    const[categoryProduct,setCategoryProduct] = useState([])
    const[loading,setLoading]=useState(false)

    const categoryLoading = new Array(13).fill(null)


    const fetchCategoryProduct = async()=>{
        setLoading(true)
        const response = await axios.get(SummaryApi.categoryProduct.url)
        setLoading(false)
        setCategoryProduct(response.data.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scroll-bar'>
            {
                loading ?(
                       
                          categoryLoading.map((item,index)=>{
                                return(
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                    
                                </div>
                                )}   
                ))
               
                 :(
                    categoryProduct?.map((i,index)=>{
                        return(
                            <Link to={'/product-category?category='+i?.category} className='cursor-pointer'key={i.category+index}>
                                <div className='h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img src={i?.productImage[0]} alt={i?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transtion-all'/>
                                 </div>
                                 <p className='text-center capitalize text-sm  md:text-base font-semibold'>{i?.category}</p>
                             </Link>
                        )
                    })
                 )
            }
       
        </div>
    </div>
  )
}

export default CategoryList
