import React from "react";
import { useContext, useState, useEffect } from "react";
import { Contextreact } from "../Context";
import { Button, Col, Form, ListGroup, ModalFooter } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import Image from "react-bootstrap/Image";
import ErrorMessage from "./ErrorMessage";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { REACT_SERVER_URL } from "../configs/ENV";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(Contextreact);

  const [name, setName] = useState("");
  const [email,setEmail] = useState('');
  const [userid, setUserid] = useState("");
  const [total, setTotal] = useState();
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState(false);
  const [street, setStreet] = useState("");
  const [place, setPlace] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [addressid, setAddressid] = useState("");
  // const [paymentmodel, setPaymentmodel] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const userInfoParsed = JSON.parse(userInfo);
    const username = userInfoParsed.name;
    setName(username);
    const id = userInfoParsed._id;
    setUserid(id);
     const email = userInfoParsed.email;
     setEmail(email);
  }, [userid]);

  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
    // setPaymentmodel(false);
  };

  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, current) => acc + Number(current.price) * current.qty,
      0
    );
    if (newTotal < 1000 && cart.length !== 0) {
      setTotal(newTotal + 50);
    } else setTotal(newTotal);
  }, [cart]);

  const updatePayment = async (id, payment_id) => {
    try {
      await axios.put(`${REACT_SERVER_URL}/api/users/payment/${id}`, {
        razorpay_payment_id: payment_id,
      });
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };
  
  function getaddressId() {
    const addressInfo = localStorage.getItem("address");
    const addressInfoParsed = JSON.parse(addressInfo);
    const address_id = addressInfoParsed._id;
    setAddressid(address_id);
  }

  const newDetails = cart.map((item) => ({
    name: item.name,
    price: item.price,
    qty: item.qty,
  }));

  const checkUser = ()=>{
    if (userid === "23011998") {
      Swal.fire({
        icon: "error",
        title: "You are not logged in",
        text: "Please Login and Buy your products!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/home");
        }
      });
    }
    else(
      setShow(true)
    )
  }

  const submitHandler = async (e) => {
    e.preventDefault();
  if (
      street === "" ||
      phonenumber === "" ||
      state === "" ||
      place === "" ||
      district === ""
    ) {
      setErrorMessage("Please Enter the required Fields");
    } else {
      setErrorMessage("");
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${REACT_SERVER_URL}/api/users/postaddress`,
          {
            userid,
            name,
            street,
            place,
            city, //check the presence of these values are same as cartmodal (DB)
            phonenumber,
            district,
            state,
            landmark,
            details: newDetails,
            total,
          },
          config
        );
        localStorage.setItem("address", JSON.stringify(data));
        console.log(data);
        setAddress(true);
        handleClose();
        getaddressId();
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handlePay = (e) => {
    if (total === "") {
      alert("Please select products!");
    } else {
      var options = {
        key: "rzp_live_aPG4BNzqxBZR3n",
        key_secret: "EfcmXIDEakJYOTBALhf0J4t7",
        amount: Number(total) * 100,
        currency: "INR",
        name: name,
        description: "Live_payment",
        handler: function (response) {
          updatePayment(addressid, response.razorpay_payment_id);
          dispatch({
            type: "CLEAR_CART",
          });
        },
        prefill: {
          name: name,
          email: email,
          contact: phonenumber,
        },
        notes: {
          address: place,
        },
        theme: {
          color: "red",
        },
      };
      console.log(options);
      var pay = new window.Razorpay(options);
      pay.open();
      // setPaymentmodel(true);
    }
  };
  return (
    <>
      <Row className="container">
        <Col md={10}>
          <div className="productcontainer">
            {cart.length < 1 ? (
              <h4 style={{ marginTop: "25%", textAlign: "center" }}>
                No Products in the cart!
              </h4>
            ) : (
              <ListGroup>
                {cart.map((prod) => (
                  <ListGroup.Item key={prod._id}>
                    <Row>
                      <Col md={3}>
                        <Image
                          src={prod.image}
                          alt={prod.Name}
                          fluid
                          rounded
                          className="cartimage"
                        />
                      </Col>
                      <Col md={3} className="cartbox">
                        <span>{prod.name}</span>
                      </Col>
                      <Col md={2} className="cartbox">
                        <span>Rs. {prod.price?.toLocaleString()}.00</span>
                      </Col>
                      <Col md={2} className="cartbox">
                        <Form.Select
                          value={prod.qty}
                          onChange={(e) =>
                            dispatch({
                              type: "CHANGE_CART_QTY",
                              payload: {
                                id: prod._id,
                                qty: e.target.value,
                              },
                            })
                          }
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1}>{x + 1}</option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={2} className="cartbox">
                        <Button
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod,
                            })
                          }
                          className="btn btn-danger"
                        >
                          <AiFillDelete fontSize="20px" />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </Col>
        <Col md={2}>
          <div className="filters summary">
            <span className="title"> Subtotal ({cart.length}) items</span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>
              Total: Rs.{total?.toLocaleString()}.00
            </span>
            <br />
            <span style={{ color: "aquamarine" }}>
              (* Rs.50 included for Delivery Charges)
            </span>
            <div style={{ fontWeight: "600" }}>
              Order above Rs.1000 for free delivery
            </div>
            <Button
              className="btn-info"
              style={{
                marginTop: "25%",
                marginLeft: "25%",
                marginRight: "25%",
                fontWeight: "bold",
              }}
              onClick={checkUser}
            >
              Add Delivery Address
            </Button>
            <br />
            <h6 className="ordermessage">
              * Add your address to place your order
            </h6>
            <Button
              className={address ? "" : "disabled"}
              style={{ margin: 20 }}
              onClick={handlePay}
            >
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Delivery address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errormessage !== "" && (
            <ErrorMessage variant="danger">{errormessage}</ErrorMessage>
          )}
          <Form>
            <Form.Group>
              <Form.Label>
                Street:<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Street Name"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Place:<span className="required"> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Vilage/Place name"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                City:<span className="required"> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="City Name (mention pincode)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                District:<span className="required"> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="District Name"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                State:<span className="required"> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="State Name"
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Phone Number: <span className="required"> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Landmark: (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <ModalFooter>
          <Button onClick={submitHandler}>Save</Button>
          <Button className="btn btn-danger" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {/* <Modal show={paymentmodel} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Complete your payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img
                alt="upiid"
                src="upitechno_gpay.jpeg"
                className="img-fluid"
                rounded
                style={{ height: "300px" }}
              />
            </Col>
            <Col md={6}>
              <div className="d-flex flex-column h-100">
                Also, you can pay in <i>amazonpay/phonepe/gpay</i> for the
                number:{" "}
                <b>
                  <h3>9488978792</h3>
                </b>
              </div>
              <div>
                Click on completed payment after paying the amount to complete
                order!!
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              dispatch({ type: "CLEAR_CART" });
              handleClose();
            }}
          >
            Completed payment
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Footer />
    </>
  );
};

export default Cart;
