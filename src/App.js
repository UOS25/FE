import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main';
import Sales from './pages/Sales';
import Orders from './pages/Orders';
import Event from './pages/Event';
import Employee from './pages/Employee';
import Receipt from './pages/Receipt';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import Inventory from './pages/Inventory';
import Returns from './pages/Returns';
import Disburse from './pages/Disburse';
export default function App(){
  return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home />}/>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />}/>
        </Routes>
        <Routes>
          <Route path="/" element={<Main />}/>
        </Routes>
        <Routes>
          <Route path="/sales" element={<Sales />}/>
        </Routes>
        <Routes>
          <Route path="/orders" element={<Orders />}/>
        </Routes>
        <Routes>
          <Route path="/events" element={<Event />}/>
        </Routes>
        <Routes>
          <Route path='/employee' element={<Employee/>}/>
        </Routes>
        <Routes>
          <Route path='/receipt' element={<Receipt/>}/>
        </Routes>
        <Routes>
          <Route path='/product' element={<Product/>}/>
        </Routes>
        <Routes>
          <Route path='/product/detail' element={<ProductDetail/>}/>
        </Routes>
        <Routes>
          <Route path='/inventory' element={<Inventory/>}/>
        </Routes>
        <Routes>
          <Route path='/returns' element={<Returns/>}/>
        </Routes>
        <Routes>
          <Route path='/disburse' element={<Disburse/>}/>
        </Routes>
      </Router>
  );
}

