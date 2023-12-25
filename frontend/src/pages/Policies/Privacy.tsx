import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import {FooterPolicy} from '../../components';

const PrivacyPolicy = () => {
  return (
    <div>
      <h1 className="page-header">Privacy Policy</h1>
      <Container>
        <Row>
          <Col md={10}>
            <br />
            We value the trust you place in us and recognize the importance of
            secure transactions and information privacy. This Privacy Policy
            describes how techno computers and its affiliates (collectively
            techno computers, we, our, us”) collect, use, share or otherwise
            process your personal information through our website
            www.technocomputers.org.in, its mobile application, and m-site
            (hereinafter referred to as the “Platform”). While you can browse
            sections of the Platform without the need of sharing any information
            with us, however, please note we do not offer any product or service
            under this Platform outside India.. By visiting this Platform,
            providing your information or availing out product/service, you
            expressly agree to be bound by the terms and conditions of this
            Privacy Policy, the Terms of Use and the applicable service/product
            terms and conditions, and agree to be governed by the laws of India
            including but not limited to the laws applicable to data protection
            and privacy. If you do not agree please do not use or access our
            Platform. Collection of Your Information When you use our Platform,
            we collect and store your information which is provided by you from
            time to time. In general, you can browse the Platform without
            telling us who you are or revealing any personal information about
            yourself. Once you give us your personal information, you are not
            anonymous to us. Where possible, we indicate which fields are
            required and which fields are optional. You always have the option
            to not provide information by choosing not to use a particular
            service, product or feature on the Platform. We may track your
            buying behavior, preferences, and other information that you choose
            to provide on our Platform. We use this information to do internal
            research on our users' demographics, interests, and behavior to
            better understand, protect and serve our users. This information is
            compiled and analyzed on an aggregated basis.
            <br /> <br />
            We may collect personal information (such as email address, delivery
            address, name, phone number, credit card/debit card and other
            payment instrument details) from you when you set up an account or
            transact with us or participate in any event or contest. While you
            can browse some sections of our Platform without being a registered
            member, certain activities (such as placing an order or consuming
            our online content or services) do require registration. We use your
            contact information to send you offers based on your previous orders
            and your interests. If you choose to post messages on our message
            boards, chat rooms or other message areas or leave feedback on the
            Platform or the social media handles maintained by us or if you use
            voice commands or virtual try and buy or similar features to shop on
            the Platform, we will collect that information you provide to us. We
            retain this information as necessary to resolve disputes, provide
            customer support, troubleshoot problems or for internal research and
            analysis as permitted by law. We will also collect your information
            related to your transactions on Techno Computers platform and such
            third-party business partner platforms. When such a third-party
            business partner collects your personal information directly from
            you, you will be governed by their privacy policies. Techno
            computers shall not be responsible for the Ultra-Partner’s privacy
            practices or the content of their privacy policies, and we request
            you to read their privacy policies prior to disclosing any
            information.
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

export default PrivacyPolicy;