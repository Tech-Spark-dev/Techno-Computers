import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import Footerpolicy from "./footerpolicy";

const Refundpolicy = () => {
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
            returns policy. We accept returns within 5 days of the original
            purchase date. To be eligible for a return, your item must be
            unused, in the same condition that you received it, and in the
            original packaging. Once your return is received and inspected, we
            will send you an email to notify you that we have received your
            returned item. We will also notify you of the approval or rejection
            of your refund. If your return is approved, the refund will be
            processed, and a credit will automatically be applied to your
            original method of payment within 5 days. We only replace items if
            they are defective or damaged. If you need to exchange an item for
            the same product, please contact our customer service team at
            [technosoftware13@gmail.com].
          </Col>
        </Row>
        <br />
      </Container>
      <div className="custom-fixed-bottom">
        <Footerpolicy />
      </div>
    </div>
  );
}

export default Refundpolicy;
