import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import "../../App.css";
import BackButton from "../../components/tips/BackButton";
import { AppContext } from "../../Context";

function OurMission() {
  const navigate = useNavigate();
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const context = useContext(AppContext);

  useEffect(() => {
    document.getElementById("root").scrollTop = 0;
    sessionStorage.setItem("previousPathName", window.location.pathname);
  }, [null],Navigate);
  return (
    <div className=" mainbg  mobile-margin">
      <Row className="centeritem h90vh ">
        <Col md={7} className="formbg contentcenter">
          <Form className="forminput radius contentcenter">
            <h1 className="text-center mb-3">
              <strong>Our Mission</strong>
            </h1>
            <br />
            <p className="text-left mb-3">
              With money exchange taking away at least 2.5% of your money, we
              feel the frustration and pain you have to go through. Someone is
              asking for a cut, without any value add, and almost demanding.{" "}
            </p>

            <p className="text-left mt-3 mb-3">
              Our mission is clear: <strong>Your money is only yours.</strong>
            </p>

            <p className="text-left mt-3 mb-3">
              While some may think we are like Uber and Airbnb, we are not. We
              do not arrange any service for you. We are rather a telephone
              station or a WhatsApp group, we just connect people with similar
              needs.{" "}
            </p>

            <p className="text-left mt-3 mb-3">
              You do your own deals - independently.
            </p>
            <BackButton />
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default OurMission;
