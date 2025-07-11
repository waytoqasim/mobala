import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Logo from "../../asstes/Logoapp.png";
import { apiHost } from "../../Helper";

function Passreset(props) {
  var CryptoJS = require("crypto-js");
  const form = useRef();
  const [email, setemail] = useState("");
  const [emailerror, setEmailerror] = useState("");
  const [time, settime] = useState("");
  const [list, setlist] = useState("");
  const [okmsg, setokmsg] = useState("");
  const [encryptemail, setencryptemail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let lowerEmail = email.toLowerCase();
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(time + "/" + lowerEmail),
      "my-secret-key@123"
    ).toString();

    //console.log("Encrypt Data -", ciphertext);
    setencryptemail(ciphertext);

    var bytes = CryptoJS.AES.decrypt(ciphertext, "my-secret-key@123");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    //console.log("decrypted Data -");
    //console.log(decryptedData);
  }, [email]);

  const sendEmail = async (e) => {
    e.preventDefault();
    let y = moment();
    let z = y.add(10, "minutes").toDate();
    settime(z);
    let emailLower = email.toLowerCase();

    if (emailLower.length === 0) {
      setEmailerror("Please enter your email");
      window.scroll(0, 0);
      setTimeout(() => {
        setEmailerror("");
      }, 5000);
    } else {
      let url = `${apiHost}/api/User/CheckIfUsernameAndEmailExists?userName=aa&email=${emailLower}`;
      axios.get(url).then(async (response) => {
        if (response.data.emailCount == 0) {
          setEmailerror("This email is not Registered");
          setTimeout(() => {
            setEmailerror("");
          }, 6000);
        } else {
          //console.log(form);
          let newPassUrl = `${window.location.origin}/newpass?=${encryptemail}`;
          let url = `${apiHost}/api/Email/ResetPassword?toEmail=${email}&url=${newPassUrl}&time=${z}`;
          axios
            .post(url)
            .then(async (response) => {
              setokmsg("Reset Link sent successfully. Check email");
              //console.log(response.data);
            })
            .catch((err) => {
              //console.log(err);
            });
          setTimeout(() => {
            setokmsg("");
          }, 6000);
        }
      });
    }
  };
  const backToLogin = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="mainbg">
        <Row className="centeritem h95vh">
          <Col md={5} className="formbg">
            <Form ref={form} className="forminput radius contentcenter">
              <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Col
                  style={{
                    marginBottom: "25px",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                  md={5}
                >
                  <img className="logo" alt="logo" src={Logo}></img>
                </Col>
                <Row className="mb-4">
                  <h5>Enter your email</h5>
                  <Col>
                    <InputGroup>
                      <Form.Control
                        name="to_email"
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                        placeholder="email"
                      ></Form.Control>

                      <Form.Control
                        style={{ display: "none" }}
                        name="data"
                        value={encryptemail}
                        placeholder=" email"
                      ></Form.Control>
                    </InputGroup>
                  </Col>

                  <span style={{ color: "red" }}>{emailerror}</span>
                  <span style={{ color: "green" }}>{okmsg}</span>
                </Row>

                <Row style={{ display: "none" }} className="mb-4">
                  <h5>Enter Your email</h5>
                  <Col>
                    <InputGroup>
                      <Form.Control name="time" value={time}></Form.Control>
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6} className="d-flex justify-content-center" style={{width: '100%', marginBottom: '10px'}}>
                    <Button onClick={sendEmail}>Reset Password </Button>
                  </Col>
                  <Col sm={6} className="d-flex justify-content-center"  style={{width: '100%'}}>
                    <Button variant="secondary" onClick={backToLogin}>
                      Cancel{" "}
                    </Button>
                  </Col>
                </Row>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Passreset;
