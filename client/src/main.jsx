import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Rendering the ProductList component
createRoot(document.getElementById('root')).render(
    <App />
)
