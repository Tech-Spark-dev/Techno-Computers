import React from 'react';
import "../styles.css";
import { SiInstagram,SiLinkedin } from "react-icons/si"; // Import the icons

const Footer = () => {
  return (
    <div className='footer'>
      <p>&copy; {new Date().getFullYear()} Techno Computers E-commerce application | Developed by Ivin Austan  &nbsp;
      <a href='https://www.linkedin.com/in/ivinaustan/' target='_blank' className='socialmedialogos'><SiLinkedin/></a>&nbsp;
      <a href='https://www.instagram.com/ivin_austan_ms/' target='_blank' className='socialmedialogos'><SiInstagram/> </a> </p>
    </div>
  )
}

export default Footer;
