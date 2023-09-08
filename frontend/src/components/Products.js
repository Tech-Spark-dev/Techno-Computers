import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Contextreact } from "../Context";
import { Button, Card } from "react-bootstrap";

const Products = () => {
  const [products, setProducts] = useState([]);

  const userInfo = localStorage.getItem("userInfo");
  const userInfoParsed = JSON.parse(userInfo);
  const isAdmin = userInfoParsed.isAdmin;

  const {
    state: { cart },
    dispatch,
  } = useContext(Contextreact);
  // console.log(cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          "http://localhost:5000/api/users/showproducts",
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
  }, []);

  const updateData = async (id) => {
    const update = await axios.put(
      `http://localhost:5000/api/users/updateproducts/${id}`
    ); //update the availability of product

    if (update) {
      const updatedProducts = products.map((prod) =>
        prod._id === id ? { ...prod, isavailable: !prod.isavailable } : prod
      );
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="productContainer">
      {products.map((product) => (
        <Card className="products" key={product._id}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            style={{ height: "300px", width: "100%" }}
          />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span>Rs. {product.price.toLocaleString()}.00</span>
              <br />
              <span style={{ height: "10%" }}>{product.description}</span>
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
                disabled={!product.isavailable}
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
                disabled={!product.isavailable}
              >
                {product.isavailable ? "Mark Sold Out" : "Marked as sold"}
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Products;
