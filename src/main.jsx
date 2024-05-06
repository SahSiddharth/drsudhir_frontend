import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PackagesProvider } from './context/PackagesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <AuthProvider>
      <PackagesProvider>
        <ThemeProvider>
          <App /> 
        </ThemeProvider>
      </PackagesProvider>
    </AuthProvider>
  </React.StrictMode>
)
