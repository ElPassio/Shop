import React , { useContext, useState, useRef, useEffect }from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom' 
import { CartContext } from '../context/CartContext'
function Header() {
  const {cartItems} = useContext(CartContext);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [showLogin, setShowLogin] = useState(false);
  const loginBtnRef = useRef(null);
  const loginBoxRef = useRef(null);
    const navigate = useNavigate(); // 👈 inicializa useNavigate
const toggleLoginForm = () => {
  setShowLogin(!showLogin);
}
 const handleRegisterClick = () => {
    setShowLogin(false);           // 👈 cierra la caja
    navigate('/register');         // 👈 navega a /register
  };
useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        loginBoxRef.current &&
        !loginBoxRef.current.contains(e.target) &&
        (!loginBtnRef.current || !loginBtnRef.current.contains(e.target))
      ) {
        setShowLogin(false);
      }
    };
    if (showLogin) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLogin]);
  return (
    <header>
        <h1>Tienda</h1>
        <nav id="main-nav">
          <a href="/" data-link>Inicio</a>
          <a href="/contacto" data-link>Contacto</a>
        </nav>
        <nav id="user-nav">
            <Link  to="/cart">
            Cart ({totalItems})
            </Link>
          <button>idioma</button>
          <button className="mdi mdi-account" onClick={toggleLoginForm}> login</button>
        {showLogin && (
        <div className="login-dropdown" ref={loginBoxRef}>
                    <p>Log In</p>
          <input type="text" placeholder="Email / Phone number" />
          <input type="password" placeholder="Password" />
          <button className="login-btn">Log In</button>
                    <p>You don't have an account?</p>
          <Link to="/register" className="register-btn" onClick={handleRegisterClick}>Register</Link>
        </div>
      )}
        </nav>

      </header>
  )
}

export default Header