import React from "react";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        config
      ); 
      navigate("/products");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setError(false)
      setErrorMessage("");
    } catch (error) {
      let message = error?.response?.data?.message;
      setError(true)
      setErrorMessage(message ? message : error.message); //error.message - frontend error
      setLoading(false);
    }
  };


  const Guestuser =  (e) => {
    e.preventDefault();
        const Guestdata = {
          name:"Guest User",
          email:"guest@example.com"
        };
        localStorage.setItem("userInfo",JSON.stringify(Guestdata));
        navigate("/products");
  };

  return (
    <div className="full-height-container">
      <Container>
        <Row>
          <Col md={6}>
            <h1 className="techno">Techno Computers</h1>
          </Col>
          <Col md={6} className="loginForm">
            {error!=="" && <ErrorMessage variant="danger">{errorMessage}</ErrorMessage>}
          
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
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Row>
              <Col md={6}>
              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "20%" }}
              >
                Submit
              </Button>
              </Col>
              <Col md={6}>
                  <div style={{textAlign:'left',position:'fixed'}}>
                {loading && <Loading />}
                </div>
                  </Col>
                  </Row>
              <Row>
             
              <Col style={{ marginLeft: "10%",marginTop: "10%" }}>
               <Link onClick={Guestuser}>Login as Guest</Link>
                </Col>
                </Row>
                <Row>
                <Col style={{ marginLeft: "10%",marginTop:'10px'}}>
                  New Customer?
                  <Link to="/signup" id="signup">
                  &nbsp;Create Account
                  </Link>
                </Col>
              </Row>
            
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
