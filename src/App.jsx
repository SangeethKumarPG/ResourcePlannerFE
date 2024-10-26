import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/journal/bootstrap.min.css';
//import routes from react router dom
import { Routes, Route, useLocation } from'react-router-dom'
import Login from './pages/Login'
import Header from './components/Header'
import Home from './pages/Home'
import { ToastContainer } from'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PaymentRedirect from './components/PaymentRedirect'

function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/payment") &&
      (<Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>)
      }
      <Routes>
          <Route path="" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/payment/:id" element={<PaymentRedirect/>}/>
      </Routes>
      <ToastContainer autoClose={2000} hideProgressBar={true}/>
    </>
  )
}

export default App
