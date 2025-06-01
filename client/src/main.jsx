import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductList from './components/ProductList.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import App from './App.jsx'

// Importing the Header component
createRoot(document.getElementById('header-root')).render(
  <StrictMode>
    <Header />
  </StrictMode>,
)
// Rendering the ProductList component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductList />
  </StrictMode>,
)
//Importing the Footer component
createRoot(document.getElementById('footer-root')).render(
  <StrictMode>
    <Footer />
  </StrictMode>,
)