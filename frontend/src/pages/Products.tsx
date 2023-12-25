import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useState } from "react"; 
import { useProduct } from "../context/products-context";
import { useCart } from "../context/cart-context";
import { Button, Card, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { GiClick } from "react-icons/gi";
import { REACT_SERVER_URL } from "../config/ENV";
import { AiFillInfoCircle } from "react-icons/ai";
// import {GrFormPrevious,GrFormNext} from "react-icons/gr";
import Swal from "sweetalert2";
import { AiTwotoneEdit } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { Loading } from "../components";
import { useLocation } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { FooterPolicy } from "../components";

const Products = () => {
  const [products, setProducts] = useState<any>([]);
  const [filteredproducts, setFilteredproducts] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<any>();
  const [page, setPage] = useState<number>(1);
  // const [trackpage,settrackpage] = useState(0);
  const [count, setCount] = useState<number>(0); //for storing the total products count
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState<boolean>(false); //to avoid unwanted duplications on initial load

  if (location.pathname === "/") {
    const Guestdata = {
      name: "Guest User",
      email: "guest@example.com",
      isAdmin: false,
      _id: "23011998",
    };
    localStorage.setItem("userInfo", JSON.stringify(Guestdata));
  }

  const userInfo = localStorage.getItem("userInfo") || "";
  const userInfoParsed = JSON.parse(userInfo);
  const isAdmin = userInfoParsed.isAdmin;

  var guest_user = false;
  var guest = userInfoParsed.email;
  if (guest === "guest@example.com") {
    guest_user = true;
  }
  const { cart, CartDispatch, } = useCart();

  const { products: productstate, ProductsDispatch } = useProduct();
const searchQuery="";
  const transformProducts = useCallback(async () => {
    let sortedProducts = products;

    if (productstate) {
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

  const handleEdit = (product:any) => {
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
          // (a:any, b:any) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setCount(response.data.totalProductCount);

        setProducts((prevProducts:any) => [...prevProducts, ...sortedProduct]);
        setLoading(false);
        setInitialLoad(true);
        console.log(sortedProduct.length);
      } catch (error:any) {
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
  }, [page, maxAvailablePage, initialLoad]);

  const updateData = async (id:number) => {
    const update = await axios.put(
      `${REACT_SERVER_URL}/api/users/updateproducts/${id}`
    ); //update the availability of product

    if (update) {
      const updatedProduct = products.map((prod:any) =>
        prod._id === id ? { ...prod, isavailable: !prod.isavailable } : prod
      );
      setProducts(updatedProduct);
    }
  };

  const updateProduct = async (id: number) => {
    const updatedProductInfo = {
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
      image:"",
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

    setProducts((prevproducts:any) => {
      return prevproducts.map((prod:any) =>
        prod._id === id ? { ...prod, ...updatedProductInfo } : prod
      );
    });

    setShow(false);
    setImage(null);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleNamechange = (e:any) => {
    setSelectedProduct({
      ...selectedProduct,
      name: e.target.value,
    });
  };
  const cloudName = "dxhpxvyih";

  const handleFileUpload = async (e:any) => {
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

  // useEffect(()=>{
  //   if(selectedProduct){
  //     setSelectedProduct(selectedProduct.image);
  //     console.log(selectedProduct.image);
  //   }
  // },[selectedProduct?.image,selectedProduct])

  const handlePricechange = (e:any) => {
    setSelectedProduct({
      ...selectedProduct,
      price: e.target.value,
    });
  };

  const handleDescriptionchange = (e:any) => {
    setSelectedProduct({
      ...selectedProduct,
      description: e.target.value,
    });
  };
  const removeData = async (id: number) => {
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
        setProducts((prevproducts:any) => {
          return prevproducts.filter((prod:any) => prod._id !== id);
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
          filteredproducts.map((product:any) => (
            <Card className="products" key={product._id}>
              <LazyLoadImage
                src={product.image}
                alt={product.name}
                style={{ height: "300px", width: "100%", objectFit: "cover" }}
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

                {cart.some((p:any) => p._id === product._id) ? (
                  <Button
                    onClick={() => {
                      CartDispatch({
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
                      CartDispatch({
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
      {page * 12 > count && !loading && <FooterPolicy />}
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
      {/* {filteredproducts.length > 0 &&
      <div>
      <Button onClick={handleNextpage} style={{float: 'right',padding:'1%'}} disabled ={trackpage*12 >=count }> Next <GrFormNext/><GrFormNext/></Button>
      <Button onClick={handlePreviouspage} style={{padding:'1%'}} disabled={trackpage === 1}><GrFormPrevious/><GrFormPrevious/> Previous</Button>
      </div>
} */}
    </div>
  );
};

export default Products;