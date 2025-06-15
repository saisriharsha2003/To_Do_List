import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/nav.css';
import logo from '../assets/images/logo.png'; 

const Nav = () => {
    return (
        <div>
          <nav >
          <Link to="/">
            <img className="logo" src={logo} alt="CodeGenie Logo" />
          </Link>
          <ul>
            <li><Link to="/" >Home</Link></li>
            
          </ul>
        </nav>
        </div>
    )
};

export default Nav;
