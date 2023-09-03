import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { Contextreact } from '../Context';
import { Button,Card } from 'react-bootstrap';

const Products = () => {

  const [products, setProducts] = useState([]);
  const {cart,setCart} = useContext(Contextreact);
  console.log(cart);

  useEffect(()=>{
  const fetchData =async()=>{
    try {
      const config ={
        headers:{
          "Content-type": "application/json",
        }};
        const response = await axios.get("http://localhost:5000/api/users/showproducts",config);
        setProducts(response.data);
        
        
    } catch (error) {
      console.log("Response Status:", error.response?.status);
      console.log("Response Data:", error.response?.data);
    }
    
  }
  fetchData();
},[])

  return (


<div className="productContainer ">
{products.map((product)=>(
      <Card className='products' key={product._id}>
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
          <Card.Title>{product.Name}</Card.Title>
         
          <Card.Subtitle style={{ paddingBottom: 10 }}>
          <span>$ {product.price}</span>
          </Card.Subtitle>
          {cart.includes(product)?<Button className='remove' onClick={()=>setCart(cart.filter(c=>c._id!==product._id))} variant="danger">Remove from cart</Button>
        :<Button className='Add' onClick={()=>setCart([...cart,product])} variant="success">Add to cart</Button>}
          </Card.Body>
      </Card>
))}
</div>
   
  );
  
}


export default Products;
