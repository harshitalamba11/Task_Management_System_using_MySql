import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import CreateTasks from './pages/CreateTasks';
import AllUsers from './pages/AllUsers';
import UpdateUser from './pages/UpdateUser';
import Project from './pages/Project';

function App() {

  return (
    <>
      {/* {showHome ? <Home /> : <Login />} */}
      <Navbar/>
      <Routes>
        {/* <Route path="/" element={<DashboardLayout />}></Route> */}
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/projects" element={<Project/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/create-tasks" element={<CreateTasks/>} />
        <Route path="/allUsers" element={<AllUsers/>} />
        <Route path="/update-user/:id" element={<UpdateUser/>} />
      </Routes>
    </>
  );
}

export default App;