import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helper/productCategory'
import axios from 'axios'
import VerticalCard from '../Components/VerticalCard'
import { SummaryApi } from '../common/common'

const CategoryProduct = () => {

    const params = useParams()

    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryArray = urlSearch.getAll('category')

    const urlCategoryObject = {}
    urlCategoryArray.forEach(category => {
      urlCategoryObject[category] = true
    })

    const[data,setData]= useState([])
    const[loading , setLoading] = useState(false)
    const[select,setSelect] = useState(urlCategoryObject)
    const[filterCategory,setFilterCategory] = useState([])
    const[sortBy,setSortBy] =useState("")
    const navigate= useNavigate()

    console.log("sortBy:",sortBy);
    
  
    const fetchData =async()=>{
      setLoading(true)
      const response = await axios.post(SummaryApi.filter.url,{
        category:filterCategory
      })
      setLoading(false)
      setData(response?.data?.data || [])
    }
    const handleSelect = (e) => {
      const{name,value,checked} = e.target;
      setSelect((prev)=>{
          return{
            ...prev,
            [value] : checked
          }
      })
    }

      useEffect(()=>{
          fetchData()
      },[filterCategory])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(select).map(categoryKey =>{
        if (select[categoryKey]) {
              return categoryKey
        }
        return null
      }).filter(i=>i)
      setFilterCategory(arrayOfCategory)

      const urlFormat = arrayOfCategory.map((i,index)=>{
        if ((arrayOfCategory.length-1)-index) {
            return `category=${i},`
        }
        return `category=${i}&&,`
      })
      const Newurl = urlFormat.join('')
      navigate('/product-category?'+Newurl)
    },[select])

    const handleOnChangeSortBy =(e)=>{
      const {value} = e.target
      setSortBy(value)
      if (value === 'asc') {
        setData(prev=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }
      
      if (value === 'dsc') {
        setData(prev=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }

    }

    useEffect(()=>{

    },[sortBy])

    // console.log("select",select)
    // {params?.categoryName}
  return (
    <div className='container mx-auto p-4'>
        {/* desktop version */}
        <div className='hidden lg:grid grid-cols-[200px,1fr]'>
          {/* left side */}
          <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {/* sortBy */}
           <div className=''>
           <h3 className='text-base uppercase text-slate-500 font-medium border-b pb-2 border-slate-300'> Sort By </h3>
           <form className='text-sm flex flex-col gap-2 py-2'>
            <div className='flex items-center gap-2'>
            <input type='radio' name='sortBy' value={'asc'} checked={sortBy === 'asc'} onChange={handleOnChangeSortBy}/>
            <label>Price - low to high</label>
            </div>
            <div className='flex items-center gap-2'>
            <input type='radio' name='sortBy' checked={sortBy === 'dsc'} value={'dsc'} onChange={handleOnChangeSortBy}/>
            <label>Price - high to low</label>
            </div>
           </form>
           </div>

           {/* filter by */}
            <div className=''>
           <h3 className='text-base uppercase text-slate-500 font-medium border-b pb-2 border-slate-300'> category </h3>
             <form className='text-sm flex flex-col gap-2 py-2'>
                {
                  productCategory.map((i,index)=>{
                      return(
                        <div className='flex items-cneter gap-3'>
                          <input type='checkbox' name={'category'} checked={select[i?.value]}   value={i?.value} id={i?.value} onChange={handleSelect}/>
                          <label htmlFor={i?.value} className='ml-2'>{i?.label}</label>
                        </div>
                      )
                  })
                }
            </form>
           </div>
          </div>
          
          {/* right side (product) */}
                
                <div className='px-4'>
                 <h2 className='text-lg font-semibold text-slate-800 my-2 p-2'>Search Result : {data?.length} </h2>
                  <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                {
                  data.length !==0 && ( 
                    <VerticalCard data={data} loading={loading} />
                  )
                }
                </div>
            </div>
        </div>
     </div>
  )
}

export default CategoryProduct