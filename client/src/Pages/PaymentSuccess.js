import React from 'react'
import success_image from '../../src/assest/success.gif'
import {Link}  from 'react-router-dom'

// CancelPayment

const PaymentSuccess = () => {
  return (
    
    <div className=' flex items-center justify-center h-full bg-slate-50 w-full max-w-md mx-auto my-9 flex-col p-4 gap-4'>
        <img src={success_image} alt="payment success" width={150} height={150} className='' />
        <p className='text-green-600 font-bold'>Payment SuccessFull !</p>
        <Link to={'/order'} className='w-fit px-3 py-1 border-2 border-green-700 font-medium bg-green-600 rounded text-white hover:bg-slate-50 hover:text-green-600' > See Order </Link>
    </div>
   

  )
}

export default PaymentSuccess