import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
import image from '../image/image.png';  

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <div className="logo">
          <img src={image} alt="Vcube Logo" />
          <h4>Vcube Software Solutions</h4>
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li className="services">
            <Link to="/services">Services</Link>
            <ul className="dropdown">
              <li><Link to="/placements">Placements</Link></li>
              <li><Link to="/resume-building">Resume Building</Link></li>
              <li><Link to="/mock-interviews">Mock Interviews</Link></li>
              <li><Link to="/aptitude-classes">Aptitude Classes</Link></li>
              <li><Link to="/communication-classes">Communication Classes</Link></li>
            </ul>
          </li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
