import React from 'react';
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import {FaShoppingCart} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


import '../styles.css';

const Header = () => {
  return (
    <>
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
     <Container>
      <div className='col-md-6'>
        <Navbar.Brand>
          <Link to='/products' style={{color:'white'}}>Products</Link>
        </Navbar.Brand>
        </div>
        <div className='col-md-6' style={{textAlign:'right'}}>
       <Dropdown as={ButtonGroup}>
      <Button variant="success"><FaShoppingCart/></Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item href="/products">Products</Dropdown.Item>
        <Dropdown.Item href="/">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

       
        
</div>
        </Container>
     </Navbar>
     
     </>
  )
}

export default Header;
