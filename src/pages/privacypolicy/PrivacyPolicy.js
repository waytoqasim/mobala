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

function PrivacyPolicy() {
  const navigate = useNavigate();
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const context = useContext(AppContext);
  
  useEffect(()=>{
    document.getElementById("root").scrollTop=0;
    sessionStorage.setItem("previousPathName", window.location.pathname);
  },[null],Navigate)
  return (
    <div className=" mainbg  mobile-margin">
      <Row className="centeritem h90vh ">
        <Col md={7} className="formbg contentcenter">
          <Form className="forminput radius contentcenter">
              <h1 className="text-center mb-3">
                <strong>Privacy Policy</strong>
              </h1>
              <br />
              <br />
        <BackButton />
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default PrivacyPolicy;
