import React, { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../styles/styles.module.css';
import imge from '../assets/unsplash_pRJhn4MbsMM.png'
function Loginpage() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsMetamaskInstalled(!!window.ethereum);
  }, []);

  async function handleMetamaskLogin() {
    try {
      if (!isMetamaskInstalled) {
        throw new Error('Metamask is not installed');
      }

      const provider = new Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const response = await fetch('http://localhost:5000/api/v1/auth/nounce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
      }
      const resp = await response.json();
      const nonce = resp.message;

      const signedMessage = await signer.signMessage(nonce);
      const data = { signedMessage, nonce, address };
      console.log(data);
      const token = localStorage.getItem('token');

      const authResponse = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data }),
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('token', data.token);
        } else {
          console.error('Login failed:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
      if (response.ok) {
        
        console.log('login successful', data);
        navigate('/home');}

    } catch (error) {
      console.error(error);
      alert('Failed to login with Metamask');
    }
  }

  return (
<div className="w-full min-h-screen bg-customGreen flex flex-row items-center ">
      <img src={imge} alt='img' className="object-cover h-[594px] w-[734px]" />
      <div className='bg-cg h-[456px] w-[450px] rounded-xl flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>Welcome Back...</h1>
        <p className='text-lg my-4'>It's so good to have you back! ...</p>
        <div className='flex flex-col justify-center items-center'>
          <button className='bg-cf  text-white font-bold py-2 px-4 rounded-md ' onClick={handleMetamaskLogin}>
            Login with Metamask
          </button>
          <br />
          <Link to="/signup">
            <button className='bg-cf  text-white font-bold py-2 px-4 rounded-md'>
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
