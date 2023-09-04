import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Contextreact } from '../Context';
import { Col, ListGroup } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import Image from 'react-bootstrap/Image';


const Cart = () => {
  const { cart } = useContext(Contextreact);
  const [total, setTotal] = useState();
  console.log(cart);

  useEffect(() => {
    setTotal(cart.reduce((acc, current) => acc + Number(current.price), 0))
  }, [cart])
  

  return (
  
    <div className='productcontainer'>
    <ListGroup>
      {cart.map((prod)=>(
        <ListGroup.Item key={prod.name}>
          <Row>
             <Col md={4}>
               <Image src={prod.image} alt={prod.Name} fluid rounded/>
              </Col>
              <Col md={3}>
                <span>{prod.Name}</span>
              </Col>
              <Col md={2}>
              <span>Rs. {prod.price}.00</span>
              </Col>
              <Col md={3}>
              <AiFillDelete fontSize="20px"/>
              </Col>
              </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>


    <div className='filters summary'>
       <span className='title'> Subtotal ({cart.length}) items</span>
       <span style={{fontWeight:700,fontSize:20}}>Total: ${total}</span>

      </div>
      </div>
    

  )
}

export default Cart;
