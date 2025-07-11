import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "../../App.css";
import Logo from "../../asstes/Logoapp.png";
import Loading from "../../components/loader/loading";
import { apiHost } from "../../Helper";
function Newpass(props) {
  var CryptoJS = require("crypto-js");
  const form = useRef();
  const [type, settype] = useState("password");
  const [type1, settype1] = useState("password");
  const [email, setemail] = useState("");
  const [decryptemail, setdycryptemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [list, setlist] = useState([]);
  const [oldpassword, setoldpassword] = useState("");
  const [uid, setuid] = useState(sessionStorage.getItem("UserID"));
  const [time, settime] = useState("");
  const [expiry, setexpiry] = useState("");
  const [isexpired, setisexpired] = useState(false);
  const [loading, setloading] = useState(false);

  const [missmsg, setmissmsg] = useState("");
  const [emptymsg, setemptymsg] = useState("");

  useEffect(() => {
    setdycryptemail(window.location.search.split("=")[1]);
  }, [null]);
  useEffect(() => {
    var bytes = CryptoJS.AES.decrypt(
      window.location.search.split("=")[1],
      "my-secret-key@123"
    );
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setemail(decryptedData.split("/")[1]);
    let y = decryptedData.split("/")[0].replaceAll(" ", "+");
    let x =
      y.split(" ")[1] +
      " " +
      y.split(" ")[2] +
      " " +
      y.split(" ")[3] +
      " " +
      y.split(" ")[4];
    settime(x);
    if (new Date(x) >= new Date()) {
      setisexpired(true);
    } else {
      setisexpired(false);
    }
  }, [decryptemail]);
  useEffect(() => {
    Getdata();
  }, [email]);

  useEffect(() => {
    setexpiry(new Date());
  }, [time]);
  // useEffect(() => {
  //   if (new Date(time) <= new Date()) {
  //     setisexpired(true);
  //   } else {
  //     setisexpired(false);
  //   }
  // }, [time]);

  useEffect(() => {
    //console.log();
    if (password.length === 0) {
      document.getElementById("passempty").style.display = "inline";
    } else {
      document.getElementById("passempty").style.display = "none";
    }

    if (password != confirmPassword) {
      document.getElementById("passnotmatch").style.display = "inline";
    } else {
      document.getElementById("passnotmatch").style.display = "none";
    }

    if (password == confirmPassword) {
      document.getElementById("passmatch").style.display = "inline";
    } else {
      document.getElementById("passmatch").style.display = "none";
    }

    if (password.length < 7) {
      document.getElementById("passlength").style.display = "inline";
    } else {
      document.getElementById("passlength").style.display = "none";
    }

    if (!format.test(password)) {
      document.getElementById("passspecial").style.display = "inline";
    } else {
      document.getElementById("passspecial").style.display = "none";
    }
  }, [password, confirmPassword, null]);

  const Getdata = async () => {
    let url = `${apiHost}/api/User/GetUserByEmail?Email=${email}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then(async (response) => {
        const data = []
        data.push(response.data.users[0])
        setlist(data);
      })
  };
  useEffect(() => {
    list.map((d, i) => setuid(d.id));
  }, [list]);

  const changetype = async () => {
    settype("input");
  };
  const changetypepass = async () => {
    settype("password");
  };
  const changetype1 = async () => {
    settype1("input");
  };
  const changetypepass1 = async () => {
    settype1("password");
  };

  // useEffect(() => {
  //   signInWithEmailAndPassword(auth, email, oldpassword);
  //   //console.log(oldpassword);
  // }, [oldpassword]);

  // useEffect(() => {
  //   if (confirmPassword != Password) setmissmsg("Password missmatch");
  //   else setmissmsg("");
  // }, [Password, confirmPassword]);
  // var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  useEffect(() => {
    if (confirmPassword != password) setmissmsg("Password missmatch");
    else setmissmsg("");
  }, [password, confirmPassword]);
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const Update = async () => {

    //const hash = CryptoJS.MD5(myString);

    //if (hash.toString() === list.user.pwd) {
      if (password != ""){
        if (password.length > 7)
          if (format.test(password))
            if (confirmPassword === password) {
              setmissmsg("");
              setloading(true);
              let url = `${apiHost}/api/Authentication/resetPassword?userID=${list[0].id}&Email=${email}&newPassword=${confirmPassword}`;
              axios.post(url)
              .then(response => {
                document.getElementById("passnotmatch").style.display = "none";
                document.getElementById("passmatch").style.display = "none";
                window.location.href = "/";
              })
              .catch(error => {
                //console.log(error);
              })
              // let url = `${apiHost}/api/Authentication/UpdatePassword?ID=${Uid}&password=${confirmPassword}`;
              // axios
              //   .post(url)
              //   .then((response) => {
              //     navigate(`OrderCom?ID=${Uid}`)
              //   })
              //   .catch((error) => {
              //     //console.log(error.text);
              //   });

              if (missmsg === "") {
                // window.location.href = `/editprofile?ID=${Uid}`;
              }
            } else {
              setmissmsg("Password mismatched");
              setTimeout(() => {
                setmissmsg("");
              }, 4000);
            }
          else {
            setemptymsg(
              "Your Password must contains at least 1 special character"
            );
            setTimeout(() => {
              setemptymsg("");
            }, 4000);
          }
        else {
          setemptymsg("Your Password should more than 7 characters");
          setTimeout(() => {
            setemptymsg("");
          }, 4000);
        }
      }
      else {
        setemptymsg("Missing Field");
        setTimeout(() => {
          setemptymsg("");
        }, 4000);
      }
  };

  // const Update = async () => {
  //   if (password !== confirmPassword) {
  //     document.getElementById("passmatch").style.display = "inline";
  //   } else if (format.test(password)) {
  //     document.getElementById("passmatch").style.display = "inline";
  //     // Display an error message indicating that the password contains special characters.
  //   } else {
  //     setloading(true);
  //     let url = `${apiHost}/api/Authentication/resetPassword?userID=${list[0].id}&Email=${email}&newPassword=${confirmPassword}`;
  //     axios.post(url)
  //       .then(response => {
  //         document.getElementById("passmatch").style.display = "none";
  //         window.location.href = "/";
  //       })
  //       .catch(error => {
  //         //console.log(error);
  //       })
  //   }
  // };
  
  // var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  

  return (
    <div>
      {loading ? (
        <div className="bgloading">
          <Loading />
        </div>
      ) : null}
      <div className="mainbg">
        <Row className="centeritem  h100vh">
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
                {isexpired === true ? (
                  <h4 style={{ textAlign: "center" }}>
                    Your Link is Expired
                  </h4>
                ) : (
                  <Row
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <span
                      id="passempty"
                      style={{ color: "red", display: "none" }}
                    >
                      * Password cannot be empty
                    </span>

                    <span
                      id="passlength"
                      style={{ color: "red", display: "none" }}
                    >
                      * Password must be more than 7 characters
                    </span>
                    <span
                      id="passspecial"
                      style={{
                        color: "red",
                        display: "none",
                        marginBottom: "10px",
                      }}
                    >
                      * Atleast 1 special character is recommended
                    </span>

                    <Row className="mb-4">
                      <h5>Enter Your New Password</h5>
                      <Col>
                        <InputGroup>
                          <Form.Control
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            type={type}
                            value={password}
                            autoComplete="off"
                            placeholder="Password"
                          ></Form.Control>
                          {type === "password" ? (
                            <div className="eye-icon">
                              <i
                                onClick={changetype}
                                className="fa fa-eye-slash"
                              ></i>
                            </div>
                          ) : (
                            <div className="eye-icon">
                              <i
                                onClick={changetypepass}
                                className="fa fa-eye"
                              ></i>
                            </div>
                          )}
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <h5>Confirm New Password</h5>
                      <Col>
                        <InputGroup>
                          <Form.Control
                            onChange={(e) => {
                              setconfirmPassword(e.target.value);
                            }}
                            type={type1}
                            autocomplete="off"
                            value={confirmPassword}
                            placeholder=" Confirm Password"
                          />
                          {type1 === "password" ? (
                            <div className="eye-icon">
                              <i
                                onClick={changetype1}
                                className="fa fa-eye-slash"
                              ></i>
                            </div>
                          ) : (
                            <div className="eye-icon">
                              <i
                                onClick={changetypepass1}
                                className="fa fa-eye"
                              ></i>
                            </div>
                          )}
                        </InputGroup>
                      </Col>
                      <span
                        id="passnotmatch"
                        style={{ color: "red", display: "none" }}
                      >
                        * Password Mismatch
                      </span>

                      <span
                        id="passmatch"
                        style={{ color: "green", display: "none" }}
                      >
                        * Password Match
                      </span>
                    </Row>

                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      md={7}
                    >
                      <Button onClick={Update}>Save</Button>
                    </Col>
                  </Row>
                )}
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Newpass;
