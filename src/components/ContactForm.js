import React, { useState } from 'react';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.message) formErrors.message = 'Message is required';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
      setErrors({});
      console.log('Form data submitted:', formData);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-80vh bg-green-500 overflow-hidden mt-5">
      <img src={img1} className="absolute top-12 right-12 w-[374px] h-[374px]" alt="img1"/>
      <img src={img2} className="absolute bottom-2 left-10 w-[348px] h-[374px]" alt="img2"/>
      <div className="relative bg-white bg-opacity-60 p-8 rounded-2xl shadow-lg w-100 h-110 mt-5">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-5">Contact Us</h2>
        {submitted ? (
          <div className="text-center text-lg text-gray-800 mt-5">Thank you for contacting us!</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-5">
              <label className="block text-gray-800 font-bold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-5">
              <label className="block text-gray-800 font-bold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-5">
              <label className="block text-gray-800 font-bold mb-2">Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-vertical h-15 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <button type="submit" className="w-full p-3 bg-green-500 text-white text-lg font-bold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
