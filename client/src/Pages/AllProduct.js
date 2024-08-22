import React, { useEffect, useState } from 'react'
import UploadProduct from '../Components/uploadProduct'
import axios from 'axios'
import { SummaryApi } from '../common/common'
import AdminproductCard from '../Components/AdminproductCard'

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await axios.get(SummaryApi.allProduct.url)
    setAllProduct(response?.data?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex items-center justify-between'>
        <h2 className='font-bold text-lg'>All-Product</h2>
        <button className='border-2 border-blue-600 text-blue-500 hover:bg-blue-400 hover:text-white transition-all py-2 px-4 rounded-full' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/* allProduct */}
      <div className='flex items-center flex-wrap gap-4 py-3  px-2 h-[calc(100vh-190px)]  overflow-y-scroll '>
        {
          allProduct.map((i, index) => {
            return (
              <AdminproductCard data={i} key={index + 'allproduct'} fetchProductData={fetchAllProduct} />

            )
          })
        }

        {/*  uploadProduct Component */}
        {
          openUploadProduct && (
            <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
          )
        }


      </div>

    </div>  
  )
}

export default AllProduct