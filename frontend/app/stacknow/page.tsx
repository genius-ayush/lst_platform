import Footer from '@/components/LandingPage/Footer'
import Body from '@/components/StackNow/Body'
import Header from '@/components/StackNow/Header'
import React from 'react'

function StacknowPage() {
  return (
    <div className='dark:bg-black h-full bg-[#f2f0ef]'>
        <Header/>
        <Body/>
        <Footer/>
        {/* <Footer/> */}
    </div>
  )
}

export default StacknowPage