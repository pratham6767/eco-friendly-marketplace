import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles.module.css';
import imge from '../assets/unsplash_amI09sbNZdE.jpg'
function SignupPage() {
  const [Firstname, setFirstName] = useState('');
  const [Lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState('');
  const [Address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          Firstname, 
          Lastname, 
          email, 
          accountType, 
          Address 
        }),
      });
      console.log('Response received', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful', data);
        navigate('/login');
      } else {
        const data = await response.json();
        console.error('Signup failed', data);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div className='w-full min-h-screen bg-customGreen flex flex-row items-center'>
      <div className='bg-cg h-[550px] w-[450px] rounded-xl flex flex-col items-center justify-center ml-20'>
        <h1 className='font-bold  '>Sign up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label>
            <span className='font-bold'>First Name:</span>
            <input
              type="text"
              value={Firstname}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="First Name"
              className="px-2 py-2  border border-gray-300 rounded-md text-base transition duration-300 focus:border-green-500"
               
            />
          </label>
          <label>
            <span className='font-semibold' >Last Name:</span>
            <input
              type="text"
              value={Lastname}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Last Name"
              className="px-2 py-2   border border-gray-300 rounded-md text-base transition duration-300 focus:border-green-500"
            />
          </label>
          <label>
            <span className='font-semibold'>Email:</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className=" px-2 py-2  border border-gray-300 rounded-md text-base transition duration-300 focus:border-green-500"
            />
          </label>
          <label>
            <span  className='font-semibold'>Address:</span>
            <input
              type="text"
              value={Address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Address"
              className="px-2 py-2  border border-gray-300 rounded-md text-base transition duration-300 focus:border-green-500"
            />
          </label>
          <label>
            <span className='font-semibold' >Account Type:</span>
            <select
              value={accountType}
              onChange={(event) => setAccountType(event.target.value)}
              className='px-2 py-2  border border-gray-300 rounded-md text-base transition duration-300 focus:border-green-500'
            >
              <option value="">Select Account Type</option>
              <option value="Customer">Customer</option>
              <option value="Farmer">Farmer</option>
            </select>
          </label>
          
          <button type="submit" className='bg-cf  text-white font-bold py-2 px-[5px] rounded-md'>
            SignUp
          </button>
        </form>
      </div>
      <div>
      <img src={imge} alt='img' className="object-cover h-[594px] w-[734px] "  />
      </div>
    </div>
  );
}

export default SignupPage;
