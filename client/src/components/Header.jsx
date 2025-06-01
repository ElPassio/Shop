import React from 'react'
import './Header.css' 
function Header() {
  return (
    <header>
        <h1>Tienda</h1>
        <nav id="main-nav">
          <a href="/" data-link>Inicio</a>
          <a href="/contacto" data-link>Contacto</a>
        </nav>
        <nav id="user-nav">
          <a href="/carrito" data-link>Carrito</a>
          <button>idioma</button>
          <button className="mdi mdi-account"> login</button>
        </nav>
      </header>
  )
}

export default Header