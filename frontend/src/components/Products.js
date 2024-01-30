import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Contextreact } from "../Context";
import { Button, Card, Form } from "react-bootstrap";
import { REACT_SERVER_URL } from "../configs/ENV";
// import {GrFormPrevious,GrFormNext} from "react-icons/gr";
import Swal from "sweetalert2";
import { AiTwotoneEdit } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import Footerpolicy from "./footerpolicy";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredproducts] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState();
  const [page, setPage] = useState(1);
  // const [trackpage,settrackpage] = useState(0);
  const [count, setCount] = useState(true); //for storing the total products count
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState(false); //to avoid unwanted duplications on initial load
  const navigate = useNavigate();

  if (location.pathname === "/") {
    const Guestdata = {
      name: "Guest User",
      email: "guest@example.com",
      isAdmin: false,
      _id: "23011998",
    };
    localStorage.setItem("userInfo", JSON.stringify(Guestdata));
  }

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
    productstate: { searchQuery, updatedproducts },
    setProdview,
  } = useContext(Contextreact);

  const transformProducts = useCallback(async () => {
    let sortedProducts = products;

    if (searchQuery) {
      try {
        const response = await axios.get(
          `${REACT_SERVER_URL}/api/users/showproducts?search=${searchQuery}&limit=12`
        );
        return response.data.products;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    return sortedProducts;
  }, [products, searchQuery]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const filtered = await transformProducts();
      setFilteredproducts(filtered);
    };
    fetchFilteredProducts();
  }, [searchQuery, transformProducts]);

  const maxAvailablePage = count / 12; //to get the maximum available

  useEffect(() => {
    const handleScroll = () => {
      if (
        page < maxAvailablePage &&
        initialLoad &&
        window.innerHeight + document.documentElement.scrollTop + 500 >=
          document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
        setInitialLoad(false); //to avoid the initial duplication of requests
      }
    };

    window.addEventListener("scroll", handleScroll);


    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `${REACT_SERVER_URL}/api/users/showproducts?page=${page}&limit=12`,
          config
        );

        const sortedProduct = response.data.products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setCount(response.data.totalProductCount);

        setProducts((prevProducts) => [...prevProducts, ...sortedProduct]);
        setLoading(false);
        setInitialLoad(true);
        console.log(sortedProduct.length);
      } catch (error) {
        console.log("Response Status:", error.response?.status);
        console.log("Response Data:", error.response?.data);
      }
    };
    if (!initialLoad) {
      fetchData();
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, updatedproducts, maxAvailablePage, initialLoad]);

  const updateData = async (id) => {
    const update = await axios.put(
      `${REACT_SERVER_URL}/api/users/updateproducts/${id}`
    ); //update the availability of product

    if (update) {
      const updatedProduct = products.map((prod) =>
        prod._id === id ? { ...prod, isavailable: !prod.isavailable } : prod
      );
      setProducts(updatedProduct);
    }
  };

  const updateProduct = async (id) => {
    const updatedProductInfo = {
      name: selectedProduct.name,
      originalprice: selectedProduct.originalprice,
      price: selectedProduct.price,
      description: selectedProduct.description,
    };
    // console.log(updatedProductInfo);
    let updatedImage = null;
    if (image) {
      updatedImage = image;
      updatedProductInfo.image = updatedImage;
    }
    await axios.put(
      `${REACT_SERVER_URL}/api/users/updateproductinfo/${id}`,
      updatedProductInfo
    );

    setProducts((prevproducts) => {
      return prevproducts.map((prod) =>
        prod._id === id ? { ...prod, ...updatedProductInfo } : prod
      );
    });

    setShow(false);
    setImage(null);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleNamechange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      name: e.target.value,
    });
  };
  const cloudName = "dxhpxvyih";

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

  const productView = (singleProd)=>{
   navigate(`/Productview/`);
  //  console.log(singleProd);
   setProdview(singleProd);
  }

  // useEffect(()=>{
  //   if(selectedProduct){
  //     setSelectedProduct(selectedProduct.image);
  //     console.log(selectedProduct.image);
  //   }
  // },[selectedProduct?.image,selectedProduct])

  const handlePricechange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      price: e.target.value,
    });
  };
  const handleoriginalpricechange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      originalprice: e.target.value,
    });
  };

  const handleDescriptionchange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      description: e.target.value,
    });
  };
  const removeData = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${REACT_SERVER_URL}/api/users/delete/${id}`);
        } catch (error) {
          console.error("Error deleting product:", error);
        }
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        setProducts((prevproducts) => {
          return prevproducts.filter((prod) => prod._id !== id);
        });
      }
    });
  };
  // const handleNextpage =()=>{
  // setPage(page+1);
  // }

  // const handlePreviouspage = ()=>{
  //     setPage(page-1);
  // }

  return (
    <div>
      {/* {guest_user && (
        <Link to="/home">
          <h4 className="guest_login">
            Login <GiClick /> and place your orders!!
          </h4>
        </Link>
      )} */}
      {loading && <Loading size={100} style={{ marginTop: "20%" }} />}
      <div className="productContainer">
        {filteredproducts.length > 0 &&
          filteredproducts.map((product) => (
            <Card className="products" key={product._id}>
              <LazyLoadImage
                className="prod_img"
                variant="top"
                src={product.image}
                alt={product.name}
                style={{
                  height: "300px",
                  width: "100%",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={() => productView(product)}
              />

              <Card.Body>
                <Card.Title>
                  <h6>
                    {product.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                      {isAdmin && (
                        <AiTwotoneEdit
                          onClick={() => handleEdit(product)}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </span>
                  </h6>
                </Card.Title>
                <Card.Subtitle style={{ paddingBottom: 10 }}>
                  <b>
                    <span>
                      {" "}
                      <span
                        style={{
                          paddingBottom: 10,
                        }}
                      >
                        {" "}
                        ₹ {product.price.toLocaleString()}
                        {product.originalprice ? (
                          <del
                            style={{
                              color: "red",
                              paddingLeft: "5%",
                              fontWeight: "bold",
                            }}
                          >
                            ₹ {product.originalprice}
                          </del>
                        ) : (
                          <span
                            style={{
                              paddingBottom: 10,
                              paddingRight: "25%",
                            }}
                          ></span>
                        )}
                      </span>
                      <span className="discount">
                        {(
                          ((product.originalprice - product.price) /
                            product.originalprice) *
                          100
                        ).toFixed(0)}
                        % off
                      </span>
                    </span>
                  </b>
                  <br />
                  <br />
                  <div className="description-container">
                    <span className="description">{product.description}</span>
                    {/* <span className="info-icon dropdown">
                      <AiFillInfoCircle />
                      <div className="dropdown-content">
                        {product.description}
                      </div>
                    </span> */}
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
                    disabled={!product.isavailable}
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
                  <div>
                    <Button
                      variant="danger"
                      onClick={() => removeData(product._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      style={{ float: "right" }}
                      onClick={() => updateData(product._id)}
                      disabled={!product.isavailable || guest_user}
                    >
                      {product.isavailable ? "Mark Sold Out" : "Marked as sold"}
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
      </div>
      {page * 12 > count && !loading && <Footerpolicy />}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              style={{ width: "70%", marginLeft: "10%" }}
            >
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Product Name"
                value={selectedProduct && selectedProduct.name}
                onChange={handleNamechange}
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
            <Form.Group
              className="mb-3"
              style={{ width: "70%", marginLeft: "10%" }}
            >
              <Form.Label>MRP:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the actual Price"
                value={selectedProduct && selectedProduct.originalprice}
                onChange={handleoriginalpricechange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              style={{ width: "70%", marginLeft: "10%" }}
            >
              <Form.Label>Product Price:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the discounted Price"
                value={selectedProduct && selectedProduct.price}
                onChange={handlePricechange}
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
                value={selectedProduct && selectedProduct.description}
                onChange={handleDescriptionchange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => updateProduct(selectedProduct._id)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {filteredproducts.length > 0 &&
      <div>
      <Button onClick={handleNextpage} style={{float: 'right',padding:'1%'}} disabled ={trackpage*12 >=count }> Next <GrFormNext/><GrFormNext/></Button>
      <Button onClick={handlePreviouspage} style={{padding:'1%'}} disabled={trackpage === 1}><GrFormPrevious/><GrFormPrevious/> Previous</Button>
      </div>
} */}
      <style>
        {`
                  .prod_img {
                    transition: transform 0.3s;
                  }
                  .prod_img:hover {
                    transform: scale(1.05);
                  }
                `}
      </style>
    </div>
  );
};


export default Products;
