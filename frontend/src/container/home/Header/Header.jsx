import React from 'react'
import './Header.css'
export default function Header() {
  return (
    <div id='header'>
      <div>
        <h4>Lorem iPusm</h4>
      </div>
      <div>
      <nav>
        <ul>
            <li><a href="/#">Home</a></li>
            <li><a href="/#">Services</a></li>
            <li><a href="/#">Portfolio</a></li>
            <li><a href="/#">About us</a></li>
            <li><a href="/#">Contact us</a></li>
        </ul>
    </nav>
      </div>
      <div>
        <button><a href="/login">Login</a></button>
        <button><a href="/signup">Signup</a></button>
      </div>


    </div>
  )
}
