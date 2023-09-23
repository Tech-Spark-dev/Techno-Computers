import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Contextreact } from "../Context";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiClick } from "react-icons/gi";
import { REACT_SERVER_URL } from "../configs/ENV";
import { AiFillInfoCircle } from "react-icons/ai";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredproducts] = useState([]);

  const userInfo = localStorage.getItem("userInfo");
  const userInfoParsed = JSON.parse(userInfo);
  const isAdmin = userInfoParsed.isAdmin;

  var guest_user = false;
  var guest = userInfoParsed.email;
  if (guest === "guest@example.com") {
    guest_user = true;
  }

  const {
    state: { cart },
    dispatch,
    productstate: { searchQuery },
  } = useContext(Contextreact);

  const transformProducts = useCallback(() => {
    let sortedProducts = products;

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedProducts;
  }, [products, searchQuery]);

  useEffect(() => {
    const filtered = transformProducts();
    setFilteredproducts(filtered);
  }, [searchQuery, transformProducts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `${REACT_SERVER_URL}/api/users/showproducts`,
          config
        );
        const sortedProduct = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProduct);
      } catch (error) {
        console.log("Response Status:", error.response?.status);
        console.log("Response Data:", error.response?.data);
      }
    };
    fetchData();
  }, [products]);

  const updateData = async (id) => {
    const update = await axios.put(
      `${REACT_SERVER_URL}/api/users/updateproducts/${id}`
    ); //update the availability of product

    if (update) {
      const updatedProducts = products.map((prod) =>
        prod._id === id ? { ...prod, isavailable: !prod.isavailable } : prod
      );
      setProducts(updatedProducts);
    }
  };

  return (
    <div>
      {guest_user && (
        <Link to="/">
          <h4 className="guest_login">
            Login <GiClick /> and place your orders!!
          </h4>
        </Link>
      )}

      <div className="productContainer">
        {filteredproducts.map((product) => (
          <Card className="products" key={product._id}>
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.name}
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>
                <h6>{product.name}</h6>
              </Card.Title>
              <Card.Subtitle style={{ paddingBottom: 10 }}>
                <b>
                  <span
                    style={{
                      paddingBottom: 10,
                      paddingLeft: "70%",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    Rs. {product.price.toLocaleString()}.00
                  </span>
                </b>
                <br />
                <br />
                <div className="description-container">
                  <span className="description">{product.description}</span>
                  <span className="info-icon dropdown">
                    <AiFillInfoCircle />
                    <div className="dropdown-content">
                      {product.description}
                    </div>
                  </span>
                </div>
              </Card.Subtitle>

              {cart.some((p) => p._id === product._id) ? (
                <Button
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product,
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
                      payload: product,
                    });
                  }}
                  variant={product.isavailable ? "success" : "danger"}
                  disabled={!product.isavailable || guest_user}
                  hidden={isAdmin}
                >
                  {product.isavailable && !isAdmin
                    ? "Add to cart"
                    : isAdmin
                    ? "Out of Stock"
                    : "Sold Out"}
                </Button>
              )}
              {isAdmin && (
                <Button
                  style={{ float: "right" }}
                  onClick={() => updateData(product._id)}
                  disabled={!product.isavailable || guest_user}
                >
                  {product.isavailable ? "Mark Sold Out" : "Marked as sold"}
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
