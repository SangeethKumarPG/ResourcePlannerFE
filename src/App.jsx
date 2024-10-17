import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/journal/bootstrap.min.css';
//import routes from react router dom
import { Routes, Route } from'react-router-dom'
import Login from './pages/Login'
import Header from './components/Header'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Routes>
          <Route path="" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
      </Routes>
     
    </>
  )
}

export default App
