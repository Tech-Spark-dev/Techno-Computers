import React from "react";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Button, Form,InputGroup } from "react-bootstrap";
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import {REACT_SERVER_URL} from '../configs/ENV'
import Footer from './Footer';


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [passwordtype,setPasswordtype] = useState("password");
  const [confirmpasswordtype,setconfirmPasswordtype] = useState("password");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords donot match!");
    } else {
      setMessage("");
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
        setLoading(true);

        const { data } = await axios.post(
          `${REACT_SERVER_URL}/api/users/`,
          {
            name,
            email,
            password,
          },
          config
        );
        navigate("/");
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setError(false);
        alert("Account created successfully!");
        setErrorMessage("");
      } catch (error) {
        let message = error?.response?.data?.message;
        setError(true);
        setErrorMessage(message ? message : error.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="full-height-container d-flex align-items-center">
      <Container className="align-items-right container">
      <Row className="align-items-center ">
          <Col md={6}>
        

            <h1 className="techno">Techno Computers</h1>
          
          </Col>
          
          <Col md={6} className="loginForm">
          <div className="error-container">
              {error && <ErrorMessage variant="danger">{errorMessage}</ErrorMessage>}
              {message !== "" && (
              <ErrorMessage variant="danger" style={{marginTop:'200%'}}>{message}</ErrorMessage>
            )}
            </div>  

           
            <Form className="login" onSubmit={SubmitHandler}>
              <Form.Group
                className="mb-3"
                style={{ width: "70%", marginLeft: "10%" }}
              >
                <Form.Label>User Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter email"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
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
                   <Button onClick={()=>setPasswordtype((prevtype)=>(prevtype==='password'?'text':'password'))}>
                    {passwordtype ==='password' ?<AiFillEye/>:<AiFillEyeInvisible/>}
                    </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group
                className="mb-3"
                style={{ width: "70%", marginLeft: "10%" }}
              >
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                <Form.Control
                  type={confirmpasswordtype}
                  value={confirmPassword}
                  placeholder="Enter your password"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
                 <Button onClick={()=>setconfirmPasswordtype((prevtype)=>(prevtype==='password'?'text':'password'))}>
                    {confirmpasswordtype ==='password' ?<AiFillEye/>:<AiFillEyeInvisible/>}
                    </Button>
                </InputGroup>
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
                  <div style={{ textAlign: "left", position: "fixed" }}>
                    {loading && <Loading />}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col style={{ marginLeft: "10%", marginTop: "10%" }}>
                  <Link to="/" id="home">
                    Back to Login
                  </Link>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
};

export default Signup;
