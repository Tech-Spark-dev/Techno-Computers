import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import {FooterPolicy} from "../../components";

const Shippingpolicy = () => {
  return (
    <div>
      <h1 className="page-header">Shipping Policy</h1>
      <Container>
        <Row>
          <Col md={10}>
            <br />
            <br />
            <b> 1. What are the delivery charges? </b>6
            <br />
            <br />
            Delivery charge varies with each Seller. Sellers incur relatively
            higher shipping costs on low value items. In such cases, charging a
            nominal delivery charge helps them offset logistics costs. Please
            check your order summary to understand the delivery charges for
            individual products. For all Products, a Rs 50 charge for delivery
            per item may be applied if the order value is less than Rs 1000.
            While, orders of Rs 1000 or above are delivered free.
            <br />
            <br />
            <b>2. What is the estimated delivery time? </b>
            <br />
            <br />
            Sellers generally procure and ship the items within the time
            specified on the product page. Business days exclude public holidays
            and Sundays. Estimated delivery time depends on the following
            factors: The Seller offering the product Product's availability with
            the Seller The destination to which you want the order shipped to
            and location of the Seller.
            <br />
            <br />
            <b> 3.Why is the CoD option not offered in my location? </b>
            <br />
            <br />
            Availability of CoD depends on the ability of our courier partner
            servicing your location to accept cash as payment at the time of
            delivery. Our courier partners have limits on the cash amount
            payable on delivery depending on the destination and your order
            value might have exceeded this limit. Please enter your pin code on
            the product page to check if CoD is available in your location.
          </Col>
        </Row>
        <br />
      </Container>
      <div className="custom-fixed-bottom" >
        <FooterPolicy />
      </div>
    </div>
  );
}

export default Shippingpolicy;
