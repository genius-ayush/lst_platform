'use client'
import React from 'react'
import Header from './Header'
import Body from './Body'
import Footer from '../LandingPage/Footer'

function StackNow() {
  return (
    <div className="dark:bg-black bg-[#f2f0ef] min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Body should grow and take up available space */}
      <div className="flex-grow mb-44 md:mb-0">
        <Body />
      </div>

      {/* Footer stays at bottom */}
    <Footer/>
    </div>
  )
}

export default StackNow
