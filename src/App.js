import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginpage from './pages/login';
import SignupPage from './pages/signup';  // Correct import
import Home from './pages/home';
import Aboutus from "./pages/aboutus";
import YourProduct from "./pages/Yourproduct";
import CreateProduct from './pages/CreateProducts';
import Categories from "./pages/categories";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/YourProduct" element={<YourProduct />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
