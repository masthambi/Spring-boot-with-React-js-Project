import React from 'react';
import './Footer.css';  // Footer specific styles
import image from '../image/image.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links-div">
            <h3>Courses Offer</h3>
            <a href="java full stack"><p>Java Full Stack</p></a>
            <a href="python full stack"><p>Python Full Stack</p></a>
            <a href="digital science"><p>Digital Science</p></a>
            <a href="testing tools"><p>Testing Tools</p></a>
            <a href="devpos aws"><p>Devpos AWS</p></a>
          </div>

          <div className="sb_footer-links-div">
            <h3>Services</h3>
            <a href="100% placements"><p>100% Placements</p></a>
            <a href="aptitude class"><p>Aptitude Class</p></a>
            <a href="grooming class and gd"><p>Grooming Class and GD</p></a>
            <a href="testing tools"><p>Testing Tools</p></a>
            <a href="devpos aws"><p>Devpos AWS</p></a>
          </div>

          <div className="sb_footer-links-div">
            <h3>Company</h3>
            <a href="about"><p>About</p></a>
            <a href="contact us"><p>Contact Us</p></a>
          </div>

          <div className="sb_footer-links-div">
            <h3>Coming Soon On</h3>
             {/* <p><img src={image} alt="Coming Soon 1" /></p> */}
           
           
           </div> 
         </div>
      </div>

      <hr />
      <div className="sb_footer-below">
        <div className="sb_footer-copyright">
          <p>@{new Date().getFullYear()} CodeInn. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
