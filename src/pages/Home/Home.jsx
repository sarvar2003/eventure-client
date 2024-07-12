import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Events from './sections/Events'
import './Home.css'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <Events/>
    </>
  )
}

export default Home