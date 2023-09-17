import { Link } from "react-router-dom";
import { Badge, Container, Navbar, Nav, Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";
import "../styles.css";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Contextreact } from "../Context";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();
  const [isAvailable] = useState(true);
  const [description, setDescription] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [canvasshow, setCanvasshow] = useState(false);

  const handlecloseCanvas = () => setCanvasshow(false);
  const handleshowCanvas = () => setCanvasshow(true);

  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = useContext(Contextreact);

  const handleLogout = () => {
    localStorage.clear();
  };
  const cloudName = "dxhpxvyih";

  const handleClose = () => {
    setShow(false);
    setName("");
    setPrice("");
    setDescription("");
    setErrorMessage("");
  };
  const handleShow = () => setShow(true);

  const userInfo = localStorage.getItem("userInfo");
  const userInfoParsed = JSON.parse(userInfo);
  const isAdmin = userInfoParsed.isAdmin;
  const userName = userInfoParsed.name;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Techno_computers");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setImage(imageUrl);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (name === "" || price === "" || description === "") {
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
          "http://localhost:5000/api/users/products",
          {
            name,
            price,
            description,
            image,
            isAvailable,
          },
          config
        );
        console.log(data);
        handleClose();
      } catch (error) {
        console.log("error");
      }
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="header">
      <Button
        variant="light"
        onMouseOver={handleshowCanvas}
        style={{ padding: "10px" }}
      >
        <AiOutlineMenu />
      </Button>
      <Offcanvas
        show={canvasshow}
        onMouseLeave={handlecloseCanvas}
        onHide={handlecloseCanvas}
        style={{ backgroundColor: "white", width: "20%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Techno Computers</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link as={Link} to="/products" className="hover-effect">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="hover-effect">
              Cart
            </Nav.Link>
            {!isAdmin && (
              <Nav.Link as={Link} to="/myorders" className="hover-effect">
                My Orders
              </Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/orders" className="hover-effect">
                User's Orders
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/about" className="hover-effect">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <Link
                className="hover-effect"
                to="/"
                onClick={() => {
                  handleLogout();
                  dispatch({
                    type: "CLEAR_CART",
                  });
                }}
              >
                Logout
              </Link>
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <Container>
        <Col md={2}>
          <Navbar.Brand>
            <Link to="/products" style={{ color: "white" }}>
              Home
            </Link>
          </Navbar.Brand>
        </Col>
        <Col md={5}>
          <Navbar.Text>
            <Form.Control
              style={{ width: 500, marginLeft: "10%" }}
              placeholder="Search a product"
              type="text"
              onChange={(e) => {
                productDispatch({
                  type: "search_product",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
        </Col>
        <Col md={2}>
          <h5 className="welcome">Welcome, {userName}!</h5>
        </Col>

        <Col md={3} style={{ textAlign: "right" }}>
          <Dropdown as={ButtonGroup} style={{ marginRight: "10%" }}>
            <Button variant="success">
              <Link to="/cart">
                <FaShoppingCart color="white" />
              </Link>
              {cart.length ? <Badge bg="primary">{cart.length}</Badge> : ""}
            </Button>
            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-split-basic"
            />
            <Dropdown.Menu>
              {isAdmin && (
                <>
                  <Dropdown.Item onClick={handleShow}>
                    Upload New Products
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Item>
                {" "}
                <Link to="/products">Products</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/"
                  onClick={() => {
                    handleLogout();
                    dispatch({
                      type: "CLEAR_CART",
                    });
                  }}
                >
                  Logout
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload New Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errormessage !== "" && (
              <ErrorMessage variant="danger">{errormessage}</ErrorMessage>
            )}
            <Form>
              <Form.Group
                className="mb-3"
                style={{ width: "70%", marginLeft: "10%" }}
              >
                <Form.Label>Product Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                style={{ width: "70%", marginLeft: "10%" }}
              >
                <Form.Label>Product Price:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                style={{ width: "70%", marginLeft: "10%" }}
              >
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the Product details"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                style={{ width: "70%", marginLeft: "10%" }}
              >
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={SubmitHandler}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default Header;
