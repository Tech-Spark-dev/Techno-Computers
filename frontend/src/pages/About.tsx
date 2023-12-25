import React from "react";
import {Footer} from "../components";
import { Col, Container, Row } from "react-bootstrap";
import "../styles.css";

const About = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={5}>
            <img
              src="technoboard1.jpg"
              alt="techno"
              className="productsimage"
            />
          </Col>
          <Col md={6}>
            <p className="aboutcontent">
              Techno Computers was established in July 2012, offering
              comprehensive servicing for both desktops and laptops, regardless
              of their condition. Additionally, we provide a wide range of
              computer accessories at budget-friendly prices. Our services
              extend beyond computer repairs, including facilities such as Eb
              bill payments, photocopying, printing services, exam application
              assistance, and various other computer-related tasks. We are
              committed to ensuring that our pricing remains affordable and
              accessible to all our valued customers. You can find us situated
              in Thammathu Konam, Nagercoil-4, serving the local community.{" "}
            </p>
            <br></br>
            <b> Address:</b> Thammathu Konam (Near Golden Bakery), Nagercoil -4. 
            <br />
            <b> Phone:</b> +91-9488978792
            <br />
            <b> Email: </b>technosoftware13@gmail.com
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default About;
