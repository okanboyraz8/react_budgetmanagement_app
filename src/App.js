import React from 'react';

//react-router-dom package
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

//components
import Navbar from './components/Navbar';

//react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
