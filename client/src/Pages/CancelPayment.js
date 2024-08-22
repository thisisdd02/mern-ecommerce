import React from 'react'
import cancel_image from '../../src/assest/cancel.gif'
import {Link}  from 'react-router-dom'

// CancelPayment

const  CancelPayment = () => {
  return (
    
    <div className=' flex items-center justify-center h-full bg-slate-50 w-full max-w-md mx-auto my-9 flex-col p-4 gap-4'>
        <img src={cancel_image} alt="payment success" width={150} height={150} className='' />
        <p className='text-red-600 font-bold'>Payment Failed !</p>
        <Link to={'/cart'} className='w-fit px-3 py-1 border-2 border-red-700 font-medium bg-red-600 rounded text-white hover:bg-slate-50 hover:text-red-600' > Try Again </Link>
    </div>
   

  )
}

export default  CancelPayment