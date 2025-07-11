import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Form,
  Row
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import "../../App.css";
import BackButton from "../../components/tips/BackButton";
import { AppContext } from "../../Context";

function WhatWeDo() {
  const navigate = useNavigate();
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const context = useContext(AppContext);

  useEffect(() => {
    document.getElementById("root").scrollTop = 0;
    sessionStorage.setItem("previousPathName", window.location.pathname);
  }, [null],Navigate);

  return (
    <div className=" mainbg  mobile-margin">
      {/* <Navbar className="bgnav fixed-top" expand="lg">
        <Container>
          <Navbar.Brand>
            <img src={Logo} className="Logo" alt="Logo" />
          </Navbar.Brand>
        </Container>
      </Navbar> */}
      <Row className="centeritem h90vh ">
        <Col md={7} className="formbg contentcenter">
          <Form className="forminput radius contentcenter">
            <p>
              <h1 className="text-center mb-3">
                <strong>What We Do</strong>
              </h1>
              <br />
              <div>
                <p>
                  Our objective at Mobala is to get people to be social, and
                  work together for mutual benefit. This will dent the culture
                  of fees, which is almost extortionist as there is little, if
                  any, value being added.
                </p>
                <p>
                  Mobala, just like a Tinder or a Whatsapp channel, gets people
                  to know each other’s needs. Plainly speaking it{" "}
                  <strong>
                    <em>Matches</em>
                  </strong>{" "}
                  your{" "}
                  <strong>
                    <em>Orders</em>
                  </strong>
                  . Depending on demand-supply you might get a good rate, close
                  to you. You could then negotiate and{" "}
                  <strong>
                    <em>Finalize</em>
                  </strong>{" "}
                  with parties you feel inclined to work with.
                </p>
                <u>What we do not do:</u>
                <p>
                  1. We do not screen the parties or their orders for fraud and
                  ill-intent. Mobala is a free street and you must exercise
                  utmost caution.
                  <br />
                  2. The Money Changers (MCs) listed on the website are based on
                  self-declaration. Generally speaking, it sounds safer to deal
                  with someone who has a shop or an office.
                  <br />
                  3. We do not check anyone’s credentials and have no policing
                  powers.
                  <br />
                  4. We do not handle any cash, nor do we have agents working on
                  our behalf.
                </p>
              </div>
            </p>
            <BackButton />
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default WhatWeDo;
