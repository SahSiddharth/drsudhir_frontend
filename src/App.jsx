import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { isAuthenticated } from './utils/LS.helper'
import Home from './components/Home'
import { useAuthContext } from './context/AuthContext'
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import { useThemeContext } from './context/ThemeContext'
import AllPackages from './components/AllPackages'
import PatientPackage from './components/PatientPackage'

function App() {
  const {admin,token} = isAuthenticated()
  const {user,loginUser} = useAuthContext()
  const {theme} = useThemeContext()

  useEffect(()=>{
    if(!user){
      if(admin && token){
        loginUser({admin,token})
      }
    }
  },[admin])
  return (
    <div className={`w-screen min-h-screen h-max relative top-0 ${theme === "light" ? "bg-zinc-50" : "bg-zinc-950"} bg-[url("./assets/light_bg.png")] bg-cover`}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? (<Navigate to="/admin/dashboard" />) : (<LoginForm />)} />
          <Route path='/admin/dashboard' element={user ? (<Home />) : (<Navigate to="/" />)} />
          <Route path='/profile' element={user ? (<Profile />) : (<Navigate to="/" />)} />
          <Route path='/packages/all' element={user ? (<AllPackages />) : (<Navigate to="/" />)} />
          <Route path='/packages/:id' element={<PatientPackage />} />
          <Route path='*' element={<Navigate to="/404" />} />
          <Route path='/404' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
