import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import { SummaryApi } from '../common/common'
import VerticalCard from '../Components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const[data,setData]= useState([])
    const[loading,setLoading]=useState(false)

    const fetchQueryProduct  = async()=>{
        setLoading(true)
        const response = await axios.get(SummaryApi.searchQuery.url+query.search)
         setLoading(false)
        setData(response.data.data)
        // console.log("response",response.data)
    }

    useEffect(()=>{
        fetchQueryProduct()
    },[query])

    //console.log('data',data)

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-center text-lg'> Loading... </p>
        )
      }
      <p className=' text-lg font-semibold my-3'> Search Results : {data.length} </p>

      {
        data.length === 0 &&  !loading&&(
          <p className='text-center text-lg bg-white font-semibold p-4'>No results found</p>
        )
      }
      {
        data.length !==0 && !loading&&(
          <VerticalCard data={data} loading={loading} />
        )
      }
    </div>
  )
}

export default SearchProduct