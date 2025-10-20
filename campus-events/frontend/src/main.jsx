import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tailwind.css'
import './auth'

createRoot(document.getElementById('root')).render(<App />)