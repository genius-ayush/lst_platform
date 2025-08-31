import React from 'react'
import Hero from './Hero'
import Features from './Features'
import CallToAction from './CallToAction'
import Footer from './Footer'
import { Header } from './Header'

function Landing() {
  return (
    <div>
        <Header/>
        <Hero/>
        <Features/>
        <CallToAction/>
        <Footer/>
    </div>
  )
}

export default Landing