import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie"
const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    quantityAvailable: '',
    categoryName: '',
    unitOfMeasure: 'Kilograms', // Default value
    image: null,
  });
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    
    

    try {
        const token = Cookies.get('token');
  console.log(token)
  const data = new FormData();
    data.append('token', token)
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    console.log(data);
      const response = await fetch('http://localhost:5000/api/v1/auth/create-product', {
        method: 'POST',
        body: data,
        credentials: 'include', // This is important for including credentials like cookies
      });

      const result = await response.json();
      console.log("hii")
      console.log(result);

      if (response.ok) {
        // Handle successful creation, e.g., redirect or show a success message
        alert('Product created successfully');
      } else {
        // Handle error
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto max-w-lg py-8">
      <h1 className="text-3xl font-bold mb-8">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2">Quantity Available:</label>
          <input
            type="number"
            name="quantityAvailable"
            value={formData.quantityAvailable}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2">Category Name:</label>
          <select
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          >
            <option value="">Select Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Grains">Grains</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Unit of Measure:</label>
          <select
            name="unitOfMeasure"
            value={formData.unitOfMeasure}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          >
            <option value="Kilograms">Kilograms</option>
            <option value="Units">Units</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Product Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
