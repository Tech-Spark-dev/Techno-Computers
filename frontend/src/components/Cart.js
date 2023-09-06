import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Contextreact } from '../Context';
import { Button, Col, Form, ListGroup } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import Image from 'react-bootstrap/Image';


const Cart = () => {
  const { state:{cart},dispatch } = useContext(Contextreact);
  const [total, setTotal] = useState();
  // console.log(cart);

  useEffect(() => {
    setTotal(cart.reduce((acc, current) => acc + Number(current.price)* current.qty, 0))
  }, [cart])
  
  return (
  
    <div className='productcontainer'>
     {cart.length<1?<h4 style={{margin: 'auto'}}>No Products in the cart!</h4>:
    <ListGroup>
      {cart.map((prod)=>(
        <ListGroup.Item key={prod.name}>
          <Row>
             <Col md={3}>
               <Image src={prod.image} alt={prod.Name} fluid rounded/>
              </Col>
              <Col md={3}>
                <span>{prod.Name}</span>
              </Col>
              <Col md={2}>
              <span>Rs. {prod.price.toLocaleString()}.00</span>
              </Col>
              <Col md={2}>
              <Form.Select value={prod.qty}
              onChange={(e)=>dispatch({
                type:'CHANGE_CART_QTY',
                payload:{
                  id:prod._id,
                  qty:e.target.value
                }
              })}
              >
                {[...Array(10).keys()].map((x)=>(
                <option key={x+1}>{x+1}</option>

                ))}
              </Form.Select>

              </Col>
              <Col md={2}><Button onClick={()=>dispatch({
                type:"REMOVE_FROM_CART",
                payload:prod,
              })} className='btn btn-danger'>
              <AiFillDelete fontSize="20px"/>
              </Button>
              </Col>
              </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  }

    <div className='filters summary'>
       <span className='title'> Subtotal ({cart.length}) items</span>
       <span style={{fontWeight:700,fontSize:20}}>Total: Rs.{total}</span>

      </div>
      </div>
    

  )
}

export default Cart;
