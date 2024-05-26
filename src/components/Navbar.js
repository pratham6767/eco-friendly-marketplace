import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo_black from '../assets/Logo_black.png';
import Cookies from "js-cookie"
import { jwtDecode } from 'jwt-decode';





const Navbars = () => {
  const[isFarmer,setIsFarmer]=useState(false)
  const navigate = useNavigate();

 

  useEffect(() => {
    const token = Cookies.get('token');
    console.log(token)
    // Get the token from cookies
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token using jwt-decode
        console.log(decodedToken)
        setIsFarmer(decodedToken.payload.accountType === 'Farmer');
      } catch (error) {
        console.error('Invalid token', error);
      }

    }
  }, []);






  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className={`w-full fixed top-0 left-0 z-10 transition-colors duration-300 bg-white shadow-md`}>
      <div className='container mx-auto flex items-center justify-between py-4'>
        {/* Logo */}
        <Link to='/home'>
          <img src={logo_black} alt='grocery' />
        </Link>

        {/* Navigation Links */}
        <div className='flex items-center'>
          <ul className='flex space-x-6'>
            <li>
              <Link to='/home' className='hover:text-gray-600'>Home</Link>
            </li>
            <li>
              <Link to='/about' className='hover:text-gray-600'>About us</Link>
            </li>
            <li>
              <Link to='/categories' className='hover:text-gray-600'>Categories</Link>
            </li>
            {isFarmer && (
              <li>
                <Link to='/createProduct' className='hover:text-gray-600'>AddProducts</Link>
              </li>
            )}
            
            <li>
              <Link to='/contact' className='hover:text-gray-600'>Contact</Link>
            </li>
          </ul>
          <button 
            onClick={handleLoginClick} 
            className='ml-6 bg-green-500 py-[4px] px-[10px] rounded-md text-white'>
            Log in
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbars;
