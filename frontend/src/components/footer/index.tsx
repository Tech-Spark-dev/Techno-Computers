import { SiLinkedin } from "react-icons/si";
import "../styles.css";

const Footer = () => {
  return (
    <div className="footer fixed-bottom">
      <p>
        &copy; {new Date().getFullYear()} Techno Computers E-commerce
        application | Developed by Ivin Austan &nbsp;
        <a
          href="https://www.linkedin.com/in/ivinaustan/"
          target="_blank"
          rel="noopener noreferrer"
          className="socialmedialogos"
        >
          <SiLinkedin />
        </a>
        &nbsp;
      </p>
    </div>
  );
}

export default Footer;
