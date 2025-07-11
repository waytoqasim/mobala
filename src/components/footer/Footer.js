import emailjs from "@emailjs/browser";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Chaticon from "../../asstes/chaticon.svg";
import Logo from "../../asstes/HoneyLogo.svg";
import greenCheck from "../../asstes/success-green-check-mark-icon.webp";

function Footer({ expiryTimestamp }) {
  const [cardshow, setcardShow] = useState(false);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [username, setUsername] = useState(sessionStorage.getItem("UserName"));
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [contact, setContact] = useState(sessionStorage.getItem("contact"));
  const [category, setCategory] = useState(sessionStorage.getItem("category"));
  const [querymsg, setquerymsg] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUID(window.location.search.split("&")[0].split("=")[1]);
  }, [uid]);

  // console.log(email, contact, username, category);
  // console.log(
  //   sessionStorage.getItem("email"),
  //   sessionStorage.getItem("UserName"),
  //   sessionStorage.getItem("contact"),
  //   sessionStorage.getItem("category"),
  // );

  // const GetData = async () => {
  //   let url = `${apiHost}/api/User/GetUserById?UserId=${uid}`;
  //   axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     })
  //     .then((docSnap) => {
  //       const username = docSnap.data.UserName;
  //       setUsername(username);
  //       const email = docSnap.data.Email;
  //       setEmail(email);
  //       const contact = docSnap.data.MobileCode + docSnap.data.Mobilenumber;
  //       setContact(contact);
  //     });
  // };
  const sendEmail = () => {
    if (querymsg != "") {
      setquerymsg("");
      setMsgSent(true);
      setTimeout(() => {
        setcardShow(false);
        setMsgSent(false);
      }, 1500);
      emailjs
        .send(
          "service_uokau4q",
          "template_bg26dfb",
          {
            msg: `User Name: ${username} \nContact: ${contact} \nEmail: ${email} \nMessage: \n${querymsg} \nCategory: \n${category}`,
            subject: "Customer Query",
            reply_to: "Noor",
            user_email: "ppflabs@gmail.com",
          },
          "kVSkHBIPDdRRI9T9n"
        )
        .then(() => {
          //console.log("send");
        });
    }
  };

  function navigateToMission() {
    sessionStorage.setItem(
      "previousPath",
      window.location.pathname + window.location.search
    );
    navigate("/OurMission");
  }

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    if (cardshow === true) {
      setUsername(sessionStorage.getItem("UserName"));
      setContact(sessionStorage.getItem("contact"));
      setEmail(sessionStorage.getItem("email"));
      setCategory(sessionStorage.getItem("category"));
    }
  }, [cardshow]);

  useEffect(() => {
    if (document.scrollingElement.getAttribute("style")) {
      document.scrollingElement.removeAttribute("style");
    }
  }, []);

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div className="FooterLocationbar">
      <footer className="footer-distributed">
        <div className="footer-left footer-left-flex">
          <img
            src={Logo}
            style={{ marginBottom: 6 }}
            className="footerLogo md-mr-0 md-ml-0 -ml-3 mr-2"
            alt="Logo"
          />
          <br />
          <span
            className="text-wrap"
            style={{
              color: "#b1e6ff",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Why go to banks when you can exchange with other people
          </span>
        </div>

        <div className="footer-center">
          <div className="" id="footer-content-responsive">
            <div
              className="d-flex align-items-center centerdiv justify-content-center footer-mobile-screen"
              id="footer-content-responsive-tags"
              style={{ textWrap: "nowrap", paddingRight: "4px" }}
            >
              <p
                style={{
                  marginTop: 5,
                  fontSize: 14,
                  fontWeight: 400,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/HowItWorks");
                }}
              >
                How it works
              </p>
              <span className="p-2 pipline">|</span>
              <br></br>
              <p
                style={{
                  marginTop: 5,
                  fontSize: 14,
                  fontWeight: 400,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/WhatWeDo");
                }}
              >
                What we do
              </p>
              <span className="p-2 pipline">|</span>
              <br></br>
              <p
                style={{
                  marginTop: 5,
                  fontSize: 14,
                  fontWeight: 400,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/Blog");
                }}
              >
                Blog
              </p>
              <span className="p-2 pipline">|</span>
              <br></br>

              <p
                style={{
                  marginTop: 5,
                  fontSize: 14,
                  fontWeight: 400,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/PrivacyPolicy");
                }}
              >
                Privacy Policy
              </p>
              <span className="p-2 pipline">|</span>
              {/* our mission */}
              <div>
                <p>
                  <h4
                    style={{
                      color: "#f5f5f5",
                      fontSize: 14,
                      fontWeight: 400,
                      cursor: "pointer",
                      marginBottom: -3,
                    }}
                    onClick={() => {
                      navigateToMission();
                    }}
                  >
                    Our Mission
                  </h4>
                </p>
              </div>
              <span className="p-2 pipline" id="footer-letusknow-seperator">
                |
              </span>
              {/* let us know */}

              <br></br>
            </div>
            <div className="d-flex justify-content-between mt-2 footer-privacy ">
              <p
                className="d-flex"
                style={{ alignItems: "center", whiteSpace: "nowrap" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (cardshow) {
                      setcardShow(false);
                    } else {
                      setcardShow(true);
                    }
                  }}
                >
                  <h4
                    className="footer-let-us-know-screen hoverEffectOnletusknow"
                    style={{
                      color: "#f5f5f5",
                      marginBottom: 0,
                      fontSize: 14,
                      fontWeight: 400,
                      marginRight: 5,
                    }}
                  >
                    Let us know
                  </h4>
                  <div style={{ marginLeft: "5px", marginRight: "35px" }}>
                    <a className="sned-msg-btn1">
                      <img
                        className="footer-let-us-know-img-screen"
                        src={Chaticon}
                        style={{ width: 30, height: 30, fill: "#fff" }}
                      />
                    </a>
                  </div>
                </div>
                <form
                  className={`chatbox card ${
                    cardshow == true ? "d-block" : "d-none"
                  }`}
                  id="chatCard"
                  style={{
                    marginLeft: "-20px",
                    textAlign: msgSent == true ? "center" : "initial",
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    zIndex: "8888",
                  }}
                >
                  {msgSent ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <img
                        src={greenCheck}
                        alt="close"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginTop: "10px",
                          marginLeft: "5px",
                        }}
                      ></img>
                      <h5
                        style={{
                          marginTop: "10px",
                          color: "black",
                          marginLeft: "5px",
                        }}
                      >
                        Message sent successfully
                      </h5>
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          position: "relative",
                          backgroundColor: "#2995be",
                          padding: "1px",
                        }}
                      >
                        <h5
                          className="card-title text-center"
                          style={{ marginTop: "5px", color: "white" }}
                        >
                          Message
                        </h5>
                        <img
                          src="static/media/cancel.81e2a42bd6accde29c52.png"
                          alt="close"
                          style={{
                            height: "18px",
                            cursor: "pointer",
                            position: "absolute",
                            top: "10px",
                            right: "3px",
                            filter: "invert(100%)", // Turns the image white
                          }}
                          onClick={() => {
                            setcardShow(!cardshow);
                          }}
                        />
                      </div>
                      <p style={{ color: "grey", margin: "5px 5px -5px 14px", whiteSpace: "break-spaces", fontStyle: "italic"}}>
                        Multiple messages for the same topic will put you behind
                        in the queue
                      </p>
                      <div className="card-body d-flex flex-column">
                        <p
                          className="username"
                          style={{ color: "black", flex: 1 }}
                        >
                          User name:{" "}
                          <input
                            style={{ outline: "none" }}
                            type="text"
                            placeholder="User Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={
                              sessionStorage.getItem("logedin") === "true"
                            }
                            className={`input-wide notranslate`}
                          />
                        </p>
                        <p
                          className="sm-mt-0 mt-1 email"
                          style={{ color: "black", flex: 1 }}
                        >
                          Email:{" "}
                          <input
                            style={{ outline: "none" }}
                            type="email"
                            placeholder="email@xyz.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={
                              sessionStorage.getItem("logedin") === "true"
                            }
                            className="input-wide"
                          />
                        </p>
                        <p
                          className="sm-mt-0 mt-1 username"
                          style={{ color: "black", flex: 1 }}
                        >
                          Contact number:{" "}
                          <input
                            style={{ outline: "none" }}
                            type="text"
                            placeholder="contact number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            disabled={
                              sessionStorage.getItem("logedin") === "true"
                            }
                            className="input-wide"
                          />
                        </p>

                        {/* New Category Dropdown */}
                        <p
                          className="sm-mt-0 mt-1 category"
                          style={{ color: "black", flex: 1 }}
                        >
                          Category:{" "}
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="input-wide"
                            style={{ outline: "none" }}
                          >
                            <option value="" disabled>
                              Select Category
                            </option>
                            <option value="Access issue">Access issue</option>
                            <option value="Need help with something">
                              Need help with something
                            </option>
                            <option value="Complaint">Complaint</option>
                            <option value="Regulatory">Regulatory</option>
                            <option value="Fraud">Fraud</option>
                            <option value="Sales">Sales</option>
                            <option value="Other">Other</option>
                          </select>
                        </p>
                      </div>
                      <div style={{ display: "flex", position: "relative" }}>
                        <textarea
                          type="text"
                          id="chattextbox"
                          onChange={(e) => setquerymsg(e.target.value)}
                          value={querymsg}
                          placeholder="Write a message in English Language only"
                        />
                        <img
                          type="image"
                          src="static/media/Sendbtn.a558b36f8e977f8cfcaa93407cf3d7cc.svg"
                          className="sendbtn"
                          onClick={sendEmail}
                          alt="Submit"
                          style={{ width: "39px", margin: "0" }}
                        />
                      </div>
                    </>
                  )}
                </form>
              </p>
              <div
                id="google_translate_element"
                className="translateStyle"
              ></div>
            </div>
          </div>
        </div>
      </footer>

      <div
        style={{ textAlign: "center", padding: 5, backgroundColor: "#202020" }}
      >
        <Row
          style={{
            textAlign: "center",
            padding: 5,
            backgroundColor: "#202020",
          }}
        >
          <Col sm={4} className="notranslate">
            {" "}
            <p style={{ margin: 0, fontSize: 14, color: "#f5f5f5" }}>
              Mobala is not a money services business.
            </p>
          </Col>

          <Col sm={4}>
            <p style={{ margin: 0, fontSize: 14, color: "#f5f5f5" }}>
              All Rights Reserved Mobala FX 2024
            </p>
          </Col>
          <Col sm={4}>
            <p style={{ margin: 0, fontSize: 14, color: "#f5f5f5" }}>
              Version 1.0.31 29-Oct-2024
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
