
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './pages/Header'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
function Routers() {
  return (
    <div>
      <BrowserRouter>
      <Header/>  
      <Routes>
       
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:id' element={<ResetPassword/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routers;
