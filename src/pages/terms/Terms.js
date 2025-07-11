import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Form,
  Row
} from "react-bootstrap";
import "../../App.css";
import { AppContext } from "../../Context";

function TermAndConditions() {
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [expandedSections, setExpandedSections] = useState({
    fullFX: false,
    orderFX: false,
    moneyChanger: false,
  });

  const context = useContext(AppContext);

  useEffect(() => {
    context.dispatch({ Type: "NAVIGATION" });
    setUID(window.location.search.split("&")[0].split("=")[1]);
  }, [null]);

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className=" mainbg  " >
      {/* <Navbar className="bgnav fixed-top" expand="lg">
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
              <h4 className="text-center mb-3">
                <strong>Terms and Conditions</strong>
              </h4>
              <br />
              <br />

              {/* Full FX Section */}
              <div onClick={() => toggleSection("fullFX")} style={{ cursor: "pointer" }}>
                <span>{expandedSections.fullFX ? "−" : "+"}</span> Full FX
              </div>
              {expandedSections.fullFX && (
                <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
                  {/* Content for Full FX Section */}
                  Full FX content goes here.
                </div>
              )}

              {/* 1-order FX Section */}
              <div onClick={() => toggleSection("orderFX")} style={{ cursor: "pointer" }}>
                <span>{expandedSections.orderFX ? "−" : "+"}</span> 1-order FX
              </div>
              {expandedSections.orderFX && (
                <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
                  {/* Content for 1-order FX Section */}
                  1-order FX content goes here.
                </div>
              )}

              {/* Money Changer (MC) Section */}
              <div onClick={() => toggleSection("moneyChanger")} style={{ cursor: "pointer" }}>
                <span>{expandedSections.moneyChanger ? "−" : "+"}</span> Money Changer (MC)
              </div>
              {expandedSections.moneyChanger && (
                <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
                  {/* Content for Money Changer (MC) Section */}
                  Money Changer (MC) content goes here.
                </div>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default TermAndConditions;
