import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Row
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import logo from "../../asstes/Logoapp.png";
import { AppContext } from "../../Context";
import { addDoc, setDoc } from "../../Helper";

function Welcome() {
  const navigate = useNavigate();
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [checkValue, setCheckValue] = useState();

  const context = useContext(AppContext);

  useEffect(() => {
    context.dispatch({ Type: "NAVIGATION" });

    setUID(window.location.search.split("&")[0].split("=")[1]);
  }, [null]);

  const Change = async () => {
    setCheckValue(!checkValue);
    //console.log(!checkValue);
  };

  const nextChange = async () => {
    let prev = sessionStorage.getItem("prev");
    if (checkValue === true) {
      const docref = "Welcome";
      addDoc(docref, {
        isWelcome: checkValue,
        Id: uid,
      });

      const docRef = `setWelcomeTime`;
      setDoc(docRef, {
        ID: uid,
        stamp: Date.now(),
      });
    }
    if (prev == "1fx") {
      sessionStorage.removeItem("prev")
      context.dispatch({ Type: "NAVIGATION" });
      navigate(`/OrderFXHome?ID=${uid}&t=${Date.now()}&t=${Date.now()}`);
    } else {
      sessionStorage.removeItem("prev")
      context.dispatch({ Type: "NAVIGATION" });
      navigate(`/OrderCom?ID=${uid}&t=${Date.now()}&t=${Date.now()}`);
    }
  };

  return (
    <div className=" mainbg  ">
      {/* <Navbar className="bgnav" expand="lg">
        <Container>
          <Navbar.Brand>
            <img src={Logo} className="Logo" alt="Logo" />
          </Navbar.Brand>
        </Container>
      </Navbar> */}
      <Row className="centeritem h90vh ">
        <Col md={5} className="formbg contentcenter">
          <Form className="forminput radius contentcenter">
            <Row>
              <Col></Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={logo} className="logo" alt="logo" />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <h3 className="text-center mt-2 mb-3">Welcome to Mobala FX!</h3>
              <br />
              <br />
              <p
                className="text-left mt-3 mb-3"
                style={{
                  borderTopColor: "#e3e3e3",
                  borderTopWidth: 1,
                  borderTopStyle: "solid",
                  paddingTop: 10,
                }}
              >
                Mobala is simply a meeting place. We don’t handle any money and
                have no agents handling money on our behalf.{" "}
              </p>

              <p className="text-left mt-3 mb-3">
                Some countries insist that money exchange should be done at a
                bank, and not between individuals or on Mobala.
              </p>

              <p
                className="text-left mt-3 mb-3"
                style={{
                  borderBottomColor: "#e3e3e3",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  paddingBottom: 10,
                }}
              >
                If you are in such a country, and are bound by such rules please
                work with banks and licensed Money Changers near you.
              </p>
              <br />
              <br />
              <br />
              <br />
            </Row>
            <Form>
              <div key={`default-checkbox`} className="mt-3 mb-3">
                <Form.Check
                  type="checkbox"
                  id={`defaultcheckbox`}
                  checked={checkValue}
                  label={`Hide this message for a month`}
                  onClick={Change}
                />
              </div>
            </Form>

            <Row className="text-center">
              <Col md={6} className="mt-3">
                <Button
                  variant="secondary"
                  className=" btn "
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Exit
                </Button>
              </Col>
              <Col md={6} className="mt-3">
                <Button variant="primary" className="btn" onClick={nextChange}>
                  Continue
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Welcome;
