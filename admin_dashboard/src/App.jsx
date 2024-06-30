import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react'
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import ForgatePassword from "./page/ForgatePassword";
import PasswordReset from "./page/PasswordReset";
import MannageProject from "./page/MannageProject";
import ViewProject from "./page/ViewProject";
import UpdatesSkills from "./page/UpdatesSkills";
import SendMessage from "./page/SendMessage";
import { useDispatch } from "react-redux";
import { getprofile } from "./store/slice/userSlice";

function App() {
  const dispatch  = useDispatch()

  useEffect(()=>
  {
    dispatch(getprofile())
  },[])
  return (
    
      <Router>

        <Routes>
          <Route path="/" element ={<HomePage/>}/>
          <Route path="/login" element ={<LoginPage/>}/>
          <Route path="/forgate-password" element ={<ForgatePassword/>}/>
          <Route path="/forgate-password/:token" element ={<PasswordReset/>}/>
          <Route path="/manage/project" element ={<MannageProject/>}/>
          <Route path="/view/project" element ={<ViewProject/>}/>
          <Route path="/mannage/skill" element ={<UpdatesSkills/>}/>
          <Route path="/message" element ={<SendMessage/>}/>
        </Routes>
        <ToastContainer theme="dark"/>
      </Router>

  )
}

export default App