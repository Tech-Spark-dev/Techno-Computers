import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Contextreact } from "../Context";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiClick } from "react-icons/gi";
import { REACT_SERVER_URL } from "../configs/ENV";
import { AiFillInfoCircle } from "react-icons/ai";
import {GrFormPrevious,GrFormNext} from "react-icons/gr";
import Swal from "sweetalert2";
import { AiTwotoneEdit } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Loading from "./Loading";
import { useLocation } from 'react-router-dom';

import { LazyLoadImage } from "react-lazy-load-image-component";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredproducts] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading,setLoading] = useState(true);
  const [image, setImage] = useState();
  const [page, setPage] = useState(1);

  const location = useLocation();
  
  if(location.pathname ==='/'){
      const Guestdata = {
        name: "Guest User",
        email: "guest@example.com",
        isAdmin:false
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
    productstate: { searchQuery },
  } = useContext(Contextreact);

  const transformProducts = useCallback(async () => {
    let sortedProducts = products;

    if (searchQuery) {
      try {
        const response = await axios.get(`${REACT_SERVER_URL}/api/users/showproducts?search=${searchQuery}&limit=8`);
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);

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

  useEffect(() => {
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
        const sortedProduct = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProduct);
        setLoading(false); 
      } catch (error) {
        console.log("Response Status:", error.response?.status);
        console.log("Response Data:", error.response?.data);
      }
    };
    fetchData();
  }, [page]);

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

  const updateProduct = async (id) => {
    const updatedProductInfo = {
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
    };
    console.log(updatedProductInfo);
    let updatedImage = null; 
    if(image){
      updatedImage = image;
      updatedProductInfo.image = updatedImage;
    }
    await axios.put(
      `${REACT_SERVER_URL}/api/users/updateproductinfo/${id}`,
      updatedProductInfo
    );
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
          const imageUrl =  data.secure_url;
          setImage(imageUrl);
         }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

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
      }
    });
  };

  return (
    <div>
      {guest_user && (
        <Link to="/home">
          <h4 className="guest_login">
            Login <GiClick /> and place your orders!!
          </h4>
        </Link>
      )}
        {loading && <Loading size={100} style={{marginTop:'20%'}} />}
      <div className="productContainer">
        {filteredproducts.length > 0 && filteredproducts.map((product) => (
          <Card className="products" key={product._id}>
            <LazyLoadImage
              variant="top"
              src={product.image}
              alt={product.name}
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>
                <h6>{product.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  {isAdmin && (
                    <AiTwotoneEdit onClick={() => handleEdit(product)} style={{cursor: 'pointer'}}/>
                  )}
                </span></h6>
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
              <Form.Label>Product Price:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Product Price"
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
     {filteredproducts.length > 0 &&
      <div>
      <Button onClick={()=>setPage(page+1)} style={{float: 'right',padding:'1%'}}> Next <GrFormNext/><GrFormNext/></Button>
      <Button onClick={()=>setPage(page-1)} style={{padding:'1%'}}><GrFormPrevious/><GrFormPrevious/> Previous</Button>
      </div>
}
    </div>
  );
};

export default Products;