import React from 'react';
import { useContext,useState,useEffect } from 'react';
import Products from './Products';
import { Contextreact } from '../Context';
import { Button } from 'react-bootstrap';

const Cart = () => {
  const {cart}=useContext(Contextreact);
  const [total,setTotal]=useState(52);

  useEffect(()=>{
  setTotal(cart.reduce((acc,current)=>acc+Number(current.price),0))
  },[cart])

  return (
    <div>
    <span style={{fontSize:30}}>My Cart</span>
    <br/>
    {total ? total : 'No Products in cart'}
    <br/><Button className='btn btn-primary' href='/products'>Buy Now</Button> 
    <div className='productContainer'>
      {cart.map(product=>(
       <Products product={product}  key={product._id}/> 
      ))}
    </div>
    </div>
  )
}

export default Cart;
