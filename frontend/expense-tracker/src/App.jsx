import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expenses from "./pages/Dashboard/Expenses";
import UserProvider from "./context/UserContext";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login"  element={<Login/>} />
          <Route path="/signup"  element={<SignUp/>} />
          <Route path="/dashboard"  element={<Home/>} />
          <Route path="/income"  element={<Income/>} />
          <Route path="/expense"  element={<Expenses/>} />
        </Routes> 
      </Router>
    </div>

    <Toaster 
      toastOptions={{
        className:" ",
        style: {
          fontSize: '13px'
        },
      }}
    />
    </UserProvider>
  );
}

export default App;

const Root = () =>{
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token');
  // Redirect to dashboard if authenticated, otherwise redirect to login
  return isAuthenticated ? 
  (<Navigate to="/DashBoard" /> ):( <Navigate to="/dashboard" />);
}