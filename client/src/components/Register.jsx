import React from 'react'
import './Register.css'

function Register() {
return (
<div className="register-container">
  <h2 className='register-title'>Register</h2>
  <form>
    <div className="register-form">
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" required />
    
    
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
    
    
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />
    </div>
    <button className='register-button' type="submit">Register</button>
  </form>
</div>
)
}

export default Register