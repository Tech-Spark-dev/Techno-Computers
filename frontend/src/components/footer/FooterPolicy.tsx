import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../styles.css";

const FooterPolicy = () => {
  return (
    <div>
      <Navbar bg="light" variant="light" className="custom-fixed-bottom">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/termsandconditions" className="hover-effect">
            Terms and Conditions
          </Nav.Link>
          <Nav.Link as={Link} to="/shippingpolicy" className="hover-effect">
            Shipping Policy
          </Nav.Link>
          <Nav.Link as={Link} to="/privacypolicy" className="hover-effect">
            Privacy Policy
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/refund-cancellation"
            className="hover-effect"
          >
            Refund/cancellation Policy
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="hover-effect">
            Contact Us
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default FooterPolicy;
