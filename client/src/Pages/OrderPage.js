import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SummaryApi } from '../common/common'
import moment from 'moment'
import displayINR from '../helper/displayINR'

const OrderPage = () => {
  const [data, setData] = useState([])

  const fetchOrderList = async () => {
    const response = await axios.get(SummaryApi.order.url, { withCredentials: 'include' })
    setData(response.data.data)
    console.log("data", response.data)
  }

  useEffect(() => {
    fetchOrderList()
  }, [])

  return (
    <div className=''>
      {
        data.length === 0 && (
          <p className='bg-white py-3 my-5 rounded-full'>No Data</p>
        )
      }
      <div className='p-4 w-full grid gap-2'>
        {
          data.map((item, index) => {
            return (  
              <div key={index} className='border-2 border-gray-400'>
                <p className='font-medium text-lg text-gray-600'>{moment(item.createdAt).format('LL')}</p>
                <div className='flex justify-between'>
                  <div className='grid gap-1'>
                  {
                    item?.productDetail?.map((i, index) => {
                      return (
                        <div key={index} className='flex flex-col gap-3 '>
                         <div className='w-28 h-28 bg-slate-200'>
                            <img src={i.image} alt='' className='w-full p-1 h-full mix-blend-multiply object-scale-down' />
                         </div>
                          <div className=''>
                            <div className='text-ellipsis font-medium line-clamp-1 text-sm'>{i.name}</div>
                            <div className='flex justify-center flex-col lg:flex-row items-center gap-2 lg:gap-3 mt-2 flex-grow-2'>
                              <p className='text-blue-500'>{displayINR(i.price)} </p>
                              <div> Quantity : {i.quantity}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                {/* payment&shipping */}
                <div className='flex flex-col lg:flex-row gap-4 min-w-[320px] ml-1'>
                  {/* payment */}
                  <div>
                    <p className='text-sm font-medium ml-1'> Payment Status : <span className='text-green-700'>{item.paymentDetail.payment_status}</span> </p>
                  </div>
                  {/* shipping */}
                  <div>
                    {
                      item.shipping_options.map((i, index) => {
                        return (
                          <div key={i.shipping_rate + index}>
                            <p className='text-sm font-medium ml-1'>Shipping charge : <span>{displayINR(i.shipping_amount)} </span></p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                    
                    
                     </div>
                {/* total amount */}
                <div className='w-fit ml-auto  font-medium text-md  '>
                  <p className='text-md font-medium'> Total : <span className='text-blue-500'> {displayINR(item.totalAmount)} </span></p>
                </div>

              </div>

            )
          })
        }

      </div>
    </div>
  )
}
export default OrderPage