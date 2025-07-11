import axios from "axios";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import moment from "moment";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Modal, Nav, Navbar, NavDropdown, Toast } from "react-bootstrap";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import "../../App.css";
import Logo from "../../asstes/HoneyLogo.svg";
import Map from "../../asstes/map.png";
import mute from "../../asstes/mute.png";
import notifsound from "../../asstes/notif.wav";
import unmute from "../../asstes/unmute.png";
import { AppContext } from "../../Context";
import { auth } from "../../firebase";
import { apiHost } from "../../Helper";
import { Countries as CountryObj } from "../Country";
import { useWindowWidthAndHeight } from "../shared/header/CustomHooks";
import SmallScreensNavbar from "../shared/header/Header";
function Header({ headerState, expiryTimestamp }) {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [tab, setTab] = useState("ORDERS");
  const [notification, setNotification] = useState({});
  const [showtoast, setShowtoast] = useState(false);
  const [list, setlist] = useState("");
  const timeout = 1000 * 60 * 8;
  const [remaining, setRemaining] = useState(timeout);
  const [elapsed, setElapsed] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [loading, setloading] = useState(true);
  const handleOnActive = () => setIsIdle(false);
  const handleOnIdle = () => setIsIdle(true);
  const [show, setShow] = useState(false);
  const [width, height] = useWindowWidthAndHeight();
  const [signupShow, setSignupShow] = useState(false);
  const handleSignupClose = () => setSignupShow(false);
  const[profilePic,setProfilePic]=useState("")

  //const handleClose = () => setShow(false);
  const handleClose = () => {
    // Close the modal
    // context.dispatch({ Type: "NAVIGATION" });
    setRemaining(timeout);
    setElapsed(0);
    setShow(false);
    // Reload the page
  };
  const [Countries, setCountries] = useState([]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [isMute, setIsMute] = useState(
    JSON.parse(sessionStorage.getItem("isMute"))
  );
  const globeCountries = useRef();

  const togglerRef = useRef(null);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
  });
  const { getRemainingTime } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
  });
  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  const toastBodySet = (obj) => {
    setNotification({
      title: obj.type.charAt(0).toUpperCase() + obj.type.slice(1),
      body: obj.description,
    });
    if (window.location.pathname === "/ChatPage" && obj.type === "Message") {
      setShowtoast(false);
    } else {
      setShowtoast(true);
    }
    soundFunc();
  };

  useEffect(() => {
    getCountry();
  }, []);

  const randomFunction = () => {
    context.dispatch({ Type: "NAVIGATION" });
    const mediaQueryForElements = window.matchMedia("(min-width: 992px)");
    if (!mediaQueryForElements.matches) {
      // togglerRef.current.click();
    }
  };

  const getCountry = () => {
    let element = [];
    element[0] = "";
    for (let index = 0; index < 249; index++) {
      element[index + 1] = CountryObj[index];
    }
    setCountries(element);
  };

  useEffect(() => {
    if (window.location.pathname == `/OrderCom`) {
      setTab("ORDERS");
    } else if (window.location.pathname == `/Match_Tab`) {
      setTab("MATCHES");
    } else if (window.location.pathname == `/ChatPage`) {
      setTab("FINALIZE");
    } else if (window.location.pathname == `/watchlist`) {
      setTab("WATCHLIST");
    } else if (window.location.pathname == `/MC`) {
      setTab("MC");
    } else if (window.location.pathname == `/Tips`) {
      setTab("TIPS");
    } else if (window.location.pathname == `/McPrime`) {
      setTab("MC PRIME");
    } else if (window.location.pathname == "/editprofile") {
      setTab("");
    }
    // }, [context.applicationStore.navigation]);
  });

  function soundFunc() {
    var x = document.getElementById("notificationSound");
    x.play();
  }
  function soundActivate(mute) {
    let authToken = localStorage.getItem("authToken");
    setIsMute(mute);
    let url = `${apiHost}/api/User/ChangeMute?mute=${mute}&UserId=${sessionStorage.getItem(
      "UserID"
    )}&t=${Date.now()}`;
    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {})
      .catch((e) => {
        //console.log(e)
      });

    document.getElementById("notificationSound").volume = mute ? 0.0 : 0.6;
    sessionStorage.setItem("isMute", mute);
  }

  useEffect(()=>{
    
    let pic = sessionStorage.getItem("settingProfilePic")
    if(pic !== null)
    {
      let finpic = pic.split(",")[0]
      console.log(finpic)
    }
    else{
      console.log("session storage is empty")
    }
    // setProfilePic(finpic)
  },[])

  useEffect(() => {
    if (context.applicationStore.notificationMessage != undefined) {
      let obj = {
        description: context.applicationStore.notificationMessage.description,
        type: context.applicationStore.notificationMessage.heading,
      };
      toastBodySet(obj);
    }
  }, [context.applicationStore.notificationMessage]);

  useEffect( () => {
    const x = sessionStorage.getItem("logedin");

    if (x == "false") {
      ////console.log("logging out");
      window.location.href = "/";
    } else {
    }
  }, []);
  const Getdata = async (UserId) => {
    let url = `${apiHost}/api/User/GetUserById?UserId=${UserId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then(async (response) => {
        const data = response.data;
        const image = response.data.profileimagepath;
        if (image == "" || image == null) {
          let name = "storageImage";
          data[name] = "";
          setlist(data);
          setloading(false);
        } else {
          let name = "storageImage";
          data[name] = `${apiHost}/Images/${image}`;
          setlist(data);
        }
        //console.log("userData=>", data)
      })
      .catch((error) => {
        ////console.log(error);
      });
  };

  useEffect(() => {
    if (headerState != "loggedout") {
      let id = sessionStorage.UserID;
      //console.log(id)
      Getdata(id);
    }
    const y = sessionStorage.getItem("logedin");
    // getRequestNotifs();
  }, [headerState]);


  const logoutResponse = async () => {
    try {
      const logintime = sessionStorage.getItem("UserLoginTime");
      const logouttime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      const UserId = sessionStorage.getItem("UserID");
  
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in localStorage.");
        throw new Error("Authorization token missing.");
      }
  
      const url = `${apiHost}/api/User/UserLoginRecord?UserId=${UserId}&LoginTime=${logintime}&LogoutTime=${logouttime}`;
  
      const response = await axios.post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      return response;
    } catch (error) {
      console.error("Error during logout response:", error);
      if (error.response && error.response.status === 401) {
        console.error("Authentication error: Unauthorized (401).");
      }
      throw error; 
    }
  };

const signout = async () => {  
    try {
      const res = await logoutResponse(); 
      await signOut(auth);
      localStorage.setItem("logedin", false);
      sessionStorage.removeItem("sessionIn");
      sessionStorage.clear();
      window.location.href = headerState == "orderfx" ? `/?to=orderfx` : "/";
    } catch (error) {
      console.error("Error during signout:", error); // Catch and handle errors
    }
  };
  // const signout = async () => {
  //   signOut(auth)
  //     .then(() => {
  //       var logintime = sessionStorage.getItem("UserLoginTime")
  //       var logouttime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  //       var UserId = sessionStorage.getItem("UserID")
  //       let url = `${apiHost}/api/User/UserLoginRecord?UserId=${UserId}&LoginTime=${logintime}&LogoutTime=${logouttime}`;
  //       axios.post(url,{
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //         },
  //       })
  //       .then((res)=>{
  //         console.log(res)
  //       })
  //       localStorage.setItem("logedin", false);
  //       const x = sessionStorage.removeItem("sessionIn");
  //       sessionStorage.clear();
  //       // localStorage.clear()
  //       window.location.href = headerState == "orderfx" ? `/?to=orderfx` : "/";
  //     })

  //     .catch((error) => {});
  // };

  useEffect(() => {
    const veryemail = Cookies.get("email");
    if (veryemail != list.email && loading === false) {
      ////console.log("logging out");
      window.location.href = "/";
    }
  }, [remaining]);

  // useEffect(() => {
  //   // //console.log(list.userName.toString())
  // }, [null]);

  useEffect(() => {
    if (remaining <= 0 && headerState != "loggedout") {
      setShow(true);
    }
  }, [remaining]);
  useEffect(() => {
    if (show === true) {
      setRemaining(timeout);
      setElapsed(30);
      const time = new Date();
      time.setSeconds(time.getSeconds() + 30);
      restart(time);
    }
  }, [show]);

  useEffect(() => {
    if (elapsed == 1 && headerState != "loggedout") {
      signout();
    }
  }, [elapsed]);

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setElapsed(elapsed - 1);
    }, 1000);
    
    return () => {
      clearTimeout(timer1); 
    };
  }, [elapsed]);

  

  useEffect(() => {
    setRemaining(getRemainingTime());
  
    const intervalId = setInterval(() => {
      setRemaining(getRemainingTime());
    }, 1000);
  
    return () => clearInterval(intervalId); 
  }, []);

  const styles = {
    simple: {
      color: "white",
      fontWeight: 500,
      fontSize: "15px",
      width: "115px",
      textAlign: "center",
    },
    show4: {
      background: "#ebebeb",
      color: "#2995be",
      borderRadius: "6px",
      fontWeight: 500,
      fontSize: "15px",
      fontWeight: "700",
      textAlign: "center",
    },
    white: {
      color: "white",
      textAlign: "center",
    },
  };
  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      style={{ textDecoration: "none" }}
      href=""
      // ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span style={{ marginRight: "5px", display: "flex", color: "white" }}>
        {list.firstName}{" "}
      </span>
    </a>
    // <img className=" " src={Dropicon} />
  ));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  function showCountry() {
    if (globeCountries.current.style.display == "none") {
      globeCountries.current.style.display = "block";
    } else {
      globeCountries.current.style.display = "none";
    }
  }

  function SignoutUserInactive() {
    const time = new Date();
    if (time.setSeconds(time.getSeconds() + 13) == false) {
      signout(time);
      //signout();
    }
  }

  const navigateSignup = () => {
    let obj = {
      email: sessionStorage.getItem("email"),
      userId: sessionStorage.getItem("UserID"),
      userName: sessionStorage.getItem("UserName"),
    };
    let jsonString = JSON.stringify(obj);
    let encodedString = encodeURIComponent(jsonString);
    navigate(`/SignUp?data=${encodedString}&t=${Date.now()}`);
    setSignupShow(false);
  };

  return (
    <>
      <div>
        <Modal
          show={signupShow}
          onHide={handleSignupClose}
          size="md"
          className="oneFXSignUpModal"
        >
          <Modal.Header>
            <Modal.Title>Full FX </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: "17px" }}>
              You need to signup as Full-FX user.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Col>
              <Button
                variant="Secondary"
                onClick={handleSignupClose}
                style={{ backgroundColor: "#9FA6B2", color: "white" }}
              >
                Cancel
              </Button>
            </Col>
            <Col style={{ textAlign: "end" }}>
              <Button variant="primary" onClick={navigateSignup}>
                SignUp
              </Button>
            </Col>
          </Modal.Footer>
        </Modal>
        <audio id="notificationSound">
          <source src={notifsound} type="audio/wav" />
        </audio>
        <Toast
          onClose={() => setShowtoast(false)}
          show={showtoast}
          delay={6000}
          autohide
          animation
          style={{
            position: "absolute",
            minWidth: 200,
            bottom: 0,
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
        <Modal show={show} onHide={handleClose} size="md" style={{ marginTop: "60px", zIndex: 8888 }}>
          <Modal.Header>
            <Modal.Title>User Inactive Status </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ marginBottom: "-15px"}}>
            <p style={{ fontSize: "17px" }}>
              {formatTime == 0
                ? "Logging Out"
                : `You will be logged out soon - ${formatTime(seconds)}`}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Col>
              <Button
                variant="Secondary"
                onClick={signout}
                style={{ backgroundColor: "#9FA6B2", color: "white" }}
              >
                Logout
                <span>{SignoutUserInactive()}</span>
              </Button>
            </Col>
            <Col style={{ textAlign: "end", whiteSpace: "nowrap",zIndex: 9999 }}>
              <a className="btn btnblue" variant="primary" onClick={handleClose}>
                Extend Time
              </a>
            </Col>
          </Modal.Footer>
        </Modal>
        {width > 800 ? (
          <Navbar fixed="top" className="bgnav" expand="lg">
            <Container className="">
              <Navbar.Brand
                onClick={(k) => {
                  if (sessionStorage.logedin == undefined) {
                    navigate(`/`);
                  } else if (sessionStorage.getItem("City") == "null") {
                    navigate(
                      `/OrderFXHome?ID=${sessionStorage.getItem(
                        "UserID"
                      )}&t=${Date.now()}`)
                  } else {
                    navigate(
                      `/OrderCom?ID=${sessionStorage.getItem(
                        "UserID"
                      )}&t=${Date.now()}`
                    );
                  }
                }}
              >
                <img src={Logo} className="Logo" alt="Logo" />
              </Navbar.Brand>
              <Navbar.Toggle
                id="toggler"
                ref={togglerRef}
                aria-controls="navbarScroll"
              />
              <Navbar.Collapse
                id="navbarScroll"
                style={
                  headerState == "orderfx" ? { justifyContent: "end" } : null
                }
              >
                {headerState == "loggedin" ? (
                  <Nav className="mx-auto my-2 my-lg-0 navCenter" navbarScroll>
                    <Nav.Link
                    className="hoverit"
                      style={tab === "ORDERS" ? styles.show4 : styles.white}
                      onClick={() => {
                        setTab("ORDERS");
                        randomFunction();
                        navigate(
                          `/OrderCom?ID=${sessionStorage.getItem(
                            "UserID"
                          )}&t=${Date.now()}`
                        );
                      }}
                    >
                      My Orders
                    </Nav.Link>

                    <Nav.Link
                     className="hoverit"
                      // style={Style2 === true ? styles.show4 : styles.white}
                      style={tab === "MATCHES" ? styles.show4 : styles.white}
                      onClick={() => {
                        setTab("MATCHES");
                        randomFunction();
                        navigate(
                          `/Match_Tab?ID=${sessionStorage.getItem(
                            "UserID"
                          )}&t=${Date.now()}`
                        );
                      }}
                    >
                      Matches
                    </Nav.Link>

                    <Nav.Link
                     className="hoverit"
                      style={tab === "FINALIZE" ? styles.show4 : styles.white}
                      // style={Style3 === true ? styles.show4 : styles.white}
                      onClick={() => {
                        setTab("FINALIZE");
                        randomFunction();

                        navigate(
                          `/ChatPage?ID=${sessionStorage.getItem(
                            "UserID"
                          )}&t=${Date.now()}`
                        );
                      }}
                    >
                      Finalize
                    </Nav.Link>
                    <Nav.Link
                     className="hoverit"
                      style={tab === "WATCHLIST" ? styles.show4 : styles.white}
                      // style={Style4 === true ? styles.show4 : styles.white}
                      onClick={() => {
                        setTab("WATCHLIST");
                        randomFunction();
                        navigate(
                          `/watchlist?ID=${sessionStorage.getItem(
                            "UserID"
                          )}&t=${Date.now()}`
                        );
                      }}
                    >
                      Watchlist
                    </Nav.Link>
                    <Nav.Link
                     className="hoverit"
                      style={tab === "MC" ? styles.show4 : styles.white}
                      // style={Style5 === true ? styles.show4 : styles.white}
                      onClick={() => {
                        setTab("MC");
                        randomFunction();
                        navigate(
                          `/MC?ID=${sessionStorage.getItem(
                            "UserID"
                          )}&t=${Date.now()}`
                        );
                      }}
                    >
                      MC
                    </Nav.Link>
                    <Nav.Link
                     className="hoverit"
                      style={tab === "TIPS" ? styles.show4 : styles.white}
                      // style={Style6 === true ? styles.show4 : styles.white}
                      onClick={() => {
                        setTab("TIPS");
                        randomFunction();
                        navigate(
                          `/Tips?ID=${sessionStorage.getItem(
                            "UserID"
                          )}&t=${Date.now()}`
                        );
                      }}
                    >
                      Tips
                    </Nav.Link>

                    <Nav.Link
                     className="hoverit"
                      style={tab === "MC PRIME" ? styles.show4 : styles.white}
                      // style={Style7 === true ? styles.show4 : styles.white}
                      onClick={() => {
                        setTab("MC PRIME");
                        randomFunction();
                        navigate(
                          `/McPrime?ID=${sessionStorage.getItem(
                            "UserID"
                          )}&t=${Date.now()}`
                        );
                      }}
                    >
                      MC Prime
                    </Nav.Link>
                    {/* MAp */}
                    <Nav.Link
                    // style={tab === "MAP" ? styles.show4 : styles.white}
                    // style={Style8 === true ? styles.show4 : styles.white}
                    >
                      <div>
                        <img
                          src={Map}
                          style={{ width: 20, height: 20 }}
                          onClick={() => {
                            //  navigate('/Map')
                            window.open(
                              `https://www.google.com/maps/search/money+changers+near+me/@${latitude},${longitude},15z/data=!3m1!4b1', '_blank', 'noreferrer'`
                            );
                            document.getElementById("navbarScroll").className =
                              "navbar-collapse collapsing";
                            setTimeout(() => {
                              document
                                .getElementById("toggler")
                                .classList.add("collapsed");
                              document.getElementById(
                                "navbarScroll"
                              ).className = "navbar-collapse collapse";
                            }, 350);
                          }}
                        />
                      </div>
                    </Nav.Link>
                  </Nav>
                ) : null}
                {headerState == "loggedout" ? null : (
                  <NavDropdown
                    className={"show1"}
                    id="collasible-nav-dropdown mobileNameDrop"
                    style={{ color: "#fff " }}
                    title={
                      <div
                        className="notranslate"
                        style={{ display: "inline-block" }}
                      >
                        <img
                          id={"ProfilePic"}
                          style={{
                            backgroundColor: "white",
                            borderRadius: "50%",
                            height: "37px",
                            width: "37px",
                            borderWidth: 3,
                            borderColor: "#fff",
                            marginRight: "4px",
                          }}
                          src={
                            // list.storageImage == ""
                            //   ? Picture
                            //   : list.storageImage
                            // list.userName === sessionStorage.getItem("settingProfilePic").split(",")[1]
                            // ? `${apiHost}/Images/${profilePic}` : ""
                            sessionStorage?.getItem("settingProfilePic")?.split(",")[0] !== null &&
                            list.userName === sessionStorage?.getItem("settingProfilePic")?.split(",")[1]
                            ? `${apiHost}/Images/${sessionStorage?.getItem("settingProfilePic")?.split(",")[0]}` : ""
                          }
                        />
                        {list.userName}
                      </div>
                    }
                  >
                    {headerState == "orderfx" ? (
                      <>
                        <NavDropdown.Item
                          onClick={() => soundActivate(!isMute)}
                        >
                          Sound &nbsp;&nbsp;&nbsp;&nbsp;
                          <img
                            id="sound"
                            src={isMute ? mute : unmute}
                            width="12px"
                          />
                        </NavDropdown.Item>
                        <hr
                          style={{ width: "80%", margin: "0px 0px 0px 10px" }}
                        />
                        <NavDropdown.Item onClick={signout}>
                          Logout
                        </NavDropdown.Item>
                      </>
                    ) : (
                      <>
                        <NavDropdown.Item
                          onClick={() => {
                            // setStyle9(true);
                            randomFunction();
                            navigate(
                              `/editprofile?ID=${sessionStorage.getItem(
                                "UserID"
                              )}&t=${Date.now()}`
                            );
                          }}
                        >
                          Edit Profile
                        </NavDropdown.Item>
                        <hr
                          style={{ width: "80%", margin: "0px 0px 0px 10px" }}
                        />
                        <NavDropdown.Item
                          onClick={() => {
                            // setStyle9(true);
                            randomFunction();
                            navigate(
                              `/OrderFXHome?ID=${sessionStorage.UserID}`
                            );
                          }}
                        >
                          1-Order-FX
                        </NavDropdown.Item>
                        <hr
                          style={{ width: "80%", margin: "0px 0px 0px 10px" }}
                        />
                        <NavDropdown.Item
                          onClick={() => soundActivate(!isMute)}
                        >
                          Sound &nbsp;&nbsp;&nbsp;&nbsp;
                          <img
                            id="sound"
                            src={isMute ? mute : unmute}
                            width="12px"
                          />
                        </NavDropdown.Item>
                        <hr
                          style={{ width: "80%", margin: "0px 0px 0px 10px" }}
                        />
                        <NavDropdown.Item onClick={signout}>
                          Logout
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ) : (
          <SmallScreensNavbar
            navClass="nav-small"
            linkClassName="nav-small-link"
            userData={list}
            isMute={isMute}
            headerState={headerState}
            signout={signout}
            randomFunction={randomFunction}
          />
        )}
      </div>
      {/* <div className="Mobilechat1">
        <MobileHeader />
      </div> */}
    </>
  );
}

export default Header;
