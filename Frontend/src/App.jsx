import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <>
      {/* {showHome ? <Home /> : <Login />} */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  );
}

export default App;