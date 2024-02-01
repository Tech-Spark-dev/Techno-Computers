import React from "react";
import { useContext, useEffect } from "react";
import { Contextreact } from "../Context";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { REACT_SERVER_URL } from "../configs/ENV";
import { useNavigate } from "react-router-dom";

import "../styles.css";
import Rating from "./Rating";

  const generateRandomRating = () => {
    return (Math.random() * (5 - 2) + 2).toFixed(1);
  };

const Productview = () => {
  const { prodview } = useContext(Contextreact);
  const [products, setProducts] = useState(prodview);
  const [rating] = useState(generateRandomRating());

  const {
    state: { cart },
    dispatch,
  } = useContext(Contextreact);

  const navigate = useNavigate();

  useEffect(() => {
    if (prodview.length < 1) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prodview]);

  const userInfo = localStorage.getItem("userInfo");
  const userInfoParsed = JSON.parse(userInfo);
  const isAdmin = userInfoParsed.isAdmin;

  var guest_user = false;
  var guest = userInfoParsed.email;
  if (guest === "guest@example.com") {
    guest_user = true;
  }

  const updateData = async (id) => {
    const update = await axios.put(
      `${REACT_SERVER_URL}/api/users/updateproducts/${id}`
    ); //update the availability of product

    if (update) {
      const updatedProduct =
        prodview._id === id
          ? { ...prodview, isavailable: !prodview.isavailable }
          : prodview;
      setProducts(updatedProduct);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={6}>
            <div className="blank-space"></div>
            <Card>
              <img
                className="prodview_img"
                src={products.image}
                alt={prodview.name}
              />
              {cart.some((p) => p._id === prodview._id) ? (
                <Button
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: prodview,
                    });
                  }}
                  variant="warning"
                >
                  Remove from cart
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: prodview,
                    });
                  }}
                  variant={prodview.isavailable ? "success" : "danger"}
                  disabled={!prodview.isavailable}
                  hidden={isAdmin}
                >
                  {prodview.isavailable && !isAdmin
                    ? "Add to cart"
                    : isAdmin
                    ? "Out of Stock"
                    : "Sold Out"}
                </Button>
              )}
              {isAdmin && (
                <Button
                  onClick={() => updateData(products._id)}
                  disabled={!products.isavailable || guest_user}
                >
                  {products.isavailable ? "Mark Sold Out" : "Marked as sold"}
                </Button>
              )}
            </Card>
          </Col>
          <Col md={6}>
            <div className="blank-space"></div>
            <span style={{ fontSize: "30px", fontFamily: "arial" }}>
              {prodview.name}
            </span>
            <Col md={3}>
              <div
                className={prodview.isavailable ? "stock" : "stockunavailable"}
              >
                {prodview.isavailable ? "In Stock" : "Not Available"}
              </div>
            </Col>
            <div>
              <Rating randomrating={rating} />

              <span
                style={{
                  fontSize: "50px",
                  fontFamily: "arial",
                  display: "inline-block",
                  marginTop: "10%",
                  fontWeight: "bold",
                }}
              >
                {" "}
                ₹ {prodview.price?.toLocaleString()}
              </span>
              <span>
                <del
                  style={{
                    fontSize: "30px",
                    fontFamily: "arial",
                    color: "red",
                    paddingLeft: "5%",
                    fontWeight: "lighter",
                    display: "inline-block",
                  }}
                >
                  ₹ {prodview.originalprice?.toLocaleString()}
                </del>
              </span>
              <span className="discount_view">
                {(
                  ((prodview.originalprice - prodview.price) /
                    prodview.originalprice) *
                  100
                ).toFixed(0)}
                % off
              </span>

              <div>
                {" "}
                <b>Description:</b> <br />
                {prodview.description}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Productview;
