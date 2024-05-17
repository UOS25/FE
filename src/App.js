import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main';
import Sales from './pages/Sales';
import Orders from './pages/Orders';

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
      </Router>
  );
}

