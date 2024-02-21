import React, { useState } from 'react';
import './Nav.css'; 
import { Link } from 'react-router-dom';

const Nav = ({ handleCartClick, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="custom-dropdown" type="button" onClick={toggleDropdown}>
        <span className="material-symbols-outlined profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </span>
      </button>
      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="dropdownMenu2">
        <li><Link to="/home"      style={{ color: 'inherit', textDecoration: 'inherit'}}><button className="dropdown-item" type="button">Home</button></Link></li>
        <li><Link to="/cart"      style={{ color: 'inherit', textDecoration: 'inherit'}}><button className="dropdown-item" type="button" onClick={handleCartClick}>Cart</button></Link></li>
        <li><Link to="/ViewOrder" style={{ color: 'inherit', textDecoration: 'inherit'}}><button className="dropdown-item" type="button">View Order</button></Link></li>
        <li><button className="dropdown-item" type="button" onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  );
};

export default Nav;
