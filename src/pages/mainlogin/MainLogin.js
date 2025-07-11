import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import "../App.css";
import logo from "../asstes/Logoapp.png";

function MainLogin(props) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [type, settype] = useState("password");
  const navigate = useNavigate();
  const context = useContext(AppContext)

  function navigateToAdmin(){
    context.dispatch({ Type: "NAVIGATION" });
    window.location.href="/AdminLogin"
  }

  function navigateToUser(){
    context.dispatch({ Type: "NAVIGATION" });
    window.location.href="/"
  }
  

  return (
    <div>
      <div className="mainbg">
        <Row className="centeritem  h100vh">
          <Col md={5} className="formbg ">
            <Form className="forminput radius contentcenter">
              <Row>
                <Col></Col>
                <Col>
                  <img src={logo} className="logo" alt="logo" />
                </Col>
                <Col></Col>
              </Row>
                <Row style={{display: "flex",justifyContent: "space-evenly",marginTop: "50px"}}>
                    <Button className="btn btn-danger" onClick={navigateToUser} id="logAsUser" style={{width: "fit-content",background: "greenyellow"}} >Login as User</Button>
                    <Button onClick={navigateToAdmin} id="logAsAdmin" style={{width: "fit-content",background: "greenyellow"}}>Login as Admin</Button>
                </Row>

              
              
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default MainLogin;
