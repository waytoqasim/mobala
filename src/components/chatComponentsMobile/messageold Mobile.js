import React from "react";
import Profile from "../../asstes/Profilepic.png";
import Heart from "../../asstes/Ratingheart.svg";
import Phone from "../../asstes/phone.svg";
import Send from "../../asstes/Sendbtn.svg";
import Attach from "../../asstes/Attachbtn.svg";
import Location from "../../asstes/locattionbtn.svg";

import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Dropdown,
  InputGroup,
} from "react-bootstrap";

const message = () => {
  return (
    <div>
      <Row className="mt-4">
        <Col>
          <Row className="mainchat">
            <Row className="userinfo">
              <Col
                sm={2}
                className="mr-2"
                style={{ textAlign: "center", lineHeight: "5" }}
              >
                <img className="profilrpic" src={Profile} alt="Profile"></img>
                <h6>husf</h6>
              </Col>
              <Col md={7}>
                <img src={Heart} className="heartfill" alt="Heart"></img>
                <img src={Heart} className="heartfill" alt="Heart"></img>
                <img src={Heart} className="heartfill" alt="Heart"></img>
                <img src={Heart} className="heartunfill" alt="Heart"></img>
                <img src={Heart} className="heartunfill" alt="Heart"></img>

                <span>Valiant, 499 CAD, Location?</span>
                <h6>Phone: *****_****-1234 (Hidden) Country : IND</h6>
                <h6>Email:****@gmail.com(Hidden) Prefer:chat</h6>
              </Col>

              <Col md={3}>
                <img
                  style={{ textAlign: "end" }}
                  className="phoneimg"
                  src={Phone}
                  alt="Phone"
                ></img>
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      border: "1px solid #bebdbd",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    className="btndropdown"
                    variant="Link"
                    id="dropdown-basic"
                  >
                    Initiated
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Option 1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Option 2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Option 3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <hr
                style={{
                  color: "Gray",
                  height: 1,
                }}
              />
            </Row>
            <Row className="chattxt">
              <Col></Col>
            </Row>
            <Row>
              <Col
                style={{
                  textAlign: "center",
                  border: "1px solid #bebdbd",
                  borderRadius: "6px",
                  marginRight: "6px",
                  cursor: "pointer",
                }}
                md={1}
              >
                <h6>Is this rate still available?</h6>
              </Col>
              <Col
                style={{
                  textAlign: "center",
                  border: "1px solid #bebdbd",
                  borderRadius: "6px",
                  marginRight: "6px",
                  cursor: "pointer",
                }}
                md={1}
              >
                <h6>When we chat?</h6>
              </Col>
              <Col
                style={{
                  textAlign: "center",
                  border: "1px solid #bebdbd",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                md={1}
              >
                <h6>Can we talk?</h6>
              </Col>
            </Row>
            <Row className="mt-3 ">
              <Col className="typebar" md={10}>
                <Row>
                  <Col md={11}>
                    <input
                      style={{ height: "35px" }}
                      className="typebar"
                    ></input>
                  </Col>
                  <Col style={{ paddingTop: "4px" }} md={1}>
                    <a
                      style={{
                        alignself: "center",
                        justifyContent: "space-between",
                        marginRight: "11px",
                      }}
                    >
                      <img
                        className="attachbtn"
                        src={Attach}
                        alt="Attach"
                      ></img>
                    </a>
                    <a>
                      <img
                        className="attachbtn"
                        src={Location}
                        alt="Location"
                      ></img>
                    </a>
                  </Col>
                </Row>
              </Col>

              <Col md={1}>
                <img className="sendbtn" src={Send} alt="Send"></img>
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default message;
