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

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(Contextreact);

  const [name, setName] = useState("");
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

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const userInfoParsed = JSON.parse(userInfo);
    const username = userInfoParsed.name;
    setName(username);
    const id = userInfoParsed._id;
    setUserid(id);
  }, []);

  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
  };
  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, current) => acc + Number(current.price) * current.qty,
        0
      )
    );
  }, [cart]);

  const updatePayment = async (id, payment_id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/payment/${id}`, {
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

  const submitHandler = async (e) => {
    e.preventDefault();

    if (street === "" || phonenumber === "" || state === "" || place === "") {
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
          "http://localhost:5000/api/users/postaddress",
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
        key: "rzp_test_iwU2fkIJhYTfSH",
        key_secret: "udWHu2ARpRy8QYPVOFpsVl5k",
        amount: Number(total) * 100,
        currency: "INR",
        name: "ivin",
        description: "Testing_Demo",
        handler: function (response) {
          updatePayment(addressid, response.razorpay_payment_id);
          dispatch({
            type:'CLEAR_CART'
          })
        },
        prefill: {
          name: "Ivin_Austan",
          email: "a.ivinaustan@gmail.com",
          contact: "9500416612",
        },
        notes: {
          address: "Razorpay",
        },
        theme: {
          color: "red",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  };

  return (
    <>
      {errormessage !== "" && (
        <ErrorMessage variant="danger">{errormessage}</ErrorMessage>
      )}
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
                        <Image src={prod.image} alt={prod.Name} fluid rounded />
                      </Col>
                      <Col md={3} className="cartbox">
                        <span>{prod.name}</span>
                      </Col>
                      <Col md={2} className="cartbox">
                        <span>Rs. {prod.price.toLocaleString()}.00</span>
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
              Total: Rs.{total}.00
            </span>
            <Button
              className="btn-info"
              style={{
                marginTop: "25%",
                marginLeft: "25%",
                marginRight: "25%",
                fontWeight:"bold"
              }}
              onClick={() => setShow(true)}
            >
              Add Delivery Address
            </Button><br/>
              <h6 className="ordermessage">* Add your address to place your order</h6>
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
    </>
  );
};

export default Cart;
