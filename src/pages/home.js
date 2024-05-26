import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
export const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <Footer></Footer>
    </div>
  )
}

export default Home;

