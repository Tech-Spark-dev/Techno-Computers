import React from "react";
import Container from "react-bootstrap/Container";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios, { AxiosHeaders, AxiosRequestHeaders } from "axios";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components";
import ErrorMessage from "../components/errors/ErrorMessage";
import "../styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { REACT_SERVER_URL } from "../config/ENV";
import { Footer } from "../components";

const Home = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordtype, setPasswordtype] = useState<string>("password");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const SubmitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const config = {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      setLoading(true);

      const { data } = await axios.post(
        `${REACT_SERVER_URL}/api/users/login`,
        {
          email,
          password,
        },
        // config
      );
      navigate("/products");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setError(false);
      setErrorMessage("");
    } catch (error: any) {
      let message = error?.response?.data?.message || "";
      setError(true);
      setErrorMessage(message ? message : error.message); //error.message - frontend error
      setLoading(false);
    }
  };

  const Guestuser = (e: React.MouseEvent) => {
    e.preventDefault();
    const Guestdata = {
      name: "Guest User",
      email: "guest@example.com",
    };
    localStorage.setItem("userInfo", JSON.stringify(Guestdata));
    navigate("/");
  };

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000, // Time in milliseconds for each slide
    arrows: false, // You can enable navigation arrows if needed
    dots: true, // You can add navigation dots if needed
  };

  const images = [
    // 'techno1.jpg',
    "images/techno2.jpg",
    "images/techno3.jpg",
    "images/techno6.jpg",
    "images/techno9.jpg",
    "images/techno7.jpg",
    "images/technoservice.jpg",
    "images/technosales.jpg",
    "images/technoser.jpg",
    // Add more image paths as needed
  ];

  return (
    <div className="full-height-container">
      <Row className="container-1 gap-5">
        <Col md={6}>
          <Container>
            <h1 className="mb-5 text-center techno">Techno Computers</h1>
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className="slider-item">
                  <img src={image} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </Container>
        </Col>
        <Col md={6} className="loginForm">
          <div className="error-container">
            {error && (
              <ErrorMessage variant="danger">{errorMessage}</ErrorMessage>
            )}
          </div>
          <Form className="login" onSubmit={SubmitHandler}>
            <Form.Group
              className="mb-3"
              style={{ width: "70%", marginLeft: "10%" }}
            >
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              style={{ width: "70%", marginLeft: "10%" }}
            >
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={passwordtype}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  onClick={() =>
                    setPasswordtype((prevtype) =>
                      prevtype === "password" ? "text" : "password"
                    )
                  }
                >
                  {passwordtype === "password" ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Button
                  variant="success"
                  type="submit"
                  style={{ marginLeft: "20%" }}
                >
                  Submit
                </Button>
              </Col>
              <Col md={6}>
                <div style={{ textAlign: "left", position: "fixed" }}>
                  {loading && <Loading />}
                </div>
              </Col>
            </Row>
            <Row>
              <Col style={{ marginLeft: "10%", marginTop: "10%" }}>
                {/* <Link onClick={Guestuser}>Login as Guest</Link> */}
              </Col>
            </Row>
            <Row>
              <Col style={{ marginLeft: "10%", marginTop: "10px" }}>
                New Customer?
                <Link to="/signup" id="signup">
                  &nbsp;Create Account
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Home;