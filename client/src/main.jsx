import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductList from './components/ProductList.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <productList />
  </StrictMode>,
)
