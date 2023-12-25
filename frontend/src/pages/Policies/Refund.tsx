import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import {FooterPolicy} from "../../components";

const RefundPolicy = () => {
  return (
    <div>
      <h1 className="page-header">Refund & Cancellation Policy</h1>
      <Container>
        <Row>
          <Col md={10}>
            <br />
            <b> Cancellation Policy</b> <br />
            <br />
            The customer can choose to cancel an order any time before it's
            dispatched. The order cannot be canceled once it’s out for delivery.
            However, the customer may choose to reject it at the doorstep. The
            time window for cancellation varies based on different categories
            and the order cannot be canceled once the specified time has passed.
            In some cases, the customer may not be allowed to cancel the order
            for free, post the specified time and a cancellation fee will be
            charged. The details about the time window mentioned on the product
            page or order confirmation page will be considered final. In case of
            any cancellation from the seller due to unforeseen circumstances, a
            full refund will be initiated for prepaid orders. Techno Computers
            reserves the right to accept the cancellation of any order. Techno
            Computers also reserves the right to waive off or modify the time
            window or cancellation fee from time to time.
            <br />
            <br />
            <b>Refund Policy</b>
            <br />
            <br /> Returns is a scheme provided by respective sellers directly
            under this policy in terms of which the option of exchange,
            replacement and/ or refund is offered by the respective sellers to
            you. All products listed under a particular category may not have
            the same returns policy. For all products, the returns/replacement
            policy provided on the product page shall prevail over the general
            returns policy. Do refer the respective item's applicable
            return/replacement policy on the product page for any exceptions to
            this returns policy and the table below The return policy is divided
            into three parts; Do read all sections carefully to understand the
            conditions and cases under which returns will be accepted.
          </Col>
        </Row>
        <br />
      </Container>
      <div className="custom-fixed-bottom">
        <FooterPolicy />
      </div>
    </div>
  );
}

export default RefundPolicy;
