import React , { useContext }from 'react'
import './Header.css'
import { Link } from 'react-router-dom' 
import { CartContext } from '../context/CartContext'
function Header() {
  const {cartItems} = useContext(CartContext);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <header>
        <h1>Tienda</h1>
        <nav id="main-nav">
          <a href="/" data-link>Inicio</a>
          <a href="/contacto" data-link>Contacto</a>
        </nav>
            <Link to="/cart">
            Cart ({totalItems})
            </Link>
          <button>idioma</button>
          <button className="mdi mdi-account"> login</button>

      </header>
  )
}

export default Header