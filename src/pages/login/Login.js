import Cookies from "js-cookie";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import APIURLS from "../../apiurls";
import "../../App.css";
import { Hover } from "../../components/login/hover";
import { AppContext } from "../../Context";
import { useSession } from "../../context/SessionContext";
import { apiHost } from "../../Helper";
import { apiInterceptor } from "../../service/ApiService";
import { getlocation, OpenCageData } from "../../service/OpenCageDataHelper";
import SignalRService from "../../SignalR";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passworderr, setPassworderror] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [type, settype] = useState("password");
  const [isHovered, setIsHovered] = useState(false); // State to toggle between divs
  const stepContainerRef = useRef(null); // Reference to detect clicks outside
  const [isBlackListUser, setIsBlackListUser] = useState(false);
  const {setSessions} = useSession();
  // Handle hover or tap event to show the steps
  const handleHoverOrTap = () => {
    setIsHovered(true);
  };

  // Function to handle clicks outside the component
  const handleClickOutside = (event) => {
    if (
      stepContainerRef.current &&
      !stepContainerRef.current.contains(event.target)
    ) {
      setIsHovered(false); 
    }
  };

  useEffect(() => {
    if (isHovered) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, [isHovered]);
  const navigate = useNavigate();

  const context = useContext(AppContext);

  useEffect(() => {
    if (window.location.host == "localhost:3000") {
      setEmail("usamayasir32@gmail.com");
      setPassword("Admin@123");
    } else if (localStorage.Testing == "True") {
      setEmail("daniyalqazi94@gmail.com");
      setPassword("Admin@123");
    }
    context.dispatch({ Type: "NAVIGATION" });
  }, [null]);

  const changetype = async () => {
    settype("input");
  };
  const changetypepass = async () => {
    settype("password");
  }; 

  const getLastLogin = async (id) => {
    let url = `${apiHost}/api/Authentication/LastLogin?ID=${id}`;
    try {
      const response = await apiInterceptor.get(APIURLS.AUTHENTICATION.GETLASTLOGIN(id));
      return response.data;
    } catch (error) {
      console.error("Error fetching last login:", error);
      return null; 
    }
  };

  const login = async () => {
    debugger
    setIsLoading(true);
    let is1FX = props.is1FX;
    let coordinates = null;
    try {
      let result = await getlocation();
      // console.log(result);
      coordinates = result != null && JSON.stringify(result);
      debugger;
      let Email = email.toLocaleLowerCase();
      apiInterceptor.post(APIURLS.AUTHENTICATION.LOGIN(Email,password,coordinates,is1FX))
      .then(async (response) => {
        debugger;
        if (response.data == "") {
          setPassworderror("Email or Password is incorrect!");
          setIsLoading(false);
        } else if (response.data.token == "" || response.data.token == null) {
          setPassworderror(
            "Your account has been restricted for about 30 minutes."
          );
          setIsLoading(false);
        }  else if (response.data.isBlackListed == true) {
                      setPassworderror(
                        "Your account has been suspended due to suspicious activity. If you believe this is a mistake, please contact our support team at "
                      );
                      setIsBlackListUser(true);
                      setIsLoading(false);
                    }
                    else {
                      let lastChecked = await getLastLogin(response.data.id)
          let current = new Date().getMonth();
          Cookies.set("email", Email);
          const cookieWarning = localStorage.Cookie === "SEEN";
          localStorage.clear();
          if (cookieWarning) {
            localStorage.setItem("Cookie", "SEEN");
          }
          setSessions(response);
          if (
            response.data.mobileNumber == undefined ||
            response.data.mobileNumber == ""
          ) {
            is1FX = true;
          }
          sessionStorage.setItem(
            "TimeZone",
            Intl.DateTimeFormat().resolvedOptions().timeZone
          );
          setIsLoading(false);
          SignalRService.registerConnection(sessionStorage.UserID);
          context.dispatch({
            Type: "FULLFXCHECK",
            Payload: response.data.city == null || "" ? false : true,
          });
          context.dispatch({ Type: "NAVIGATION" });
          context.dispatch({
            Type: "PERMISSION",
            Payload: {
              isMc: response.data.isMC,
              isMcprime: response.data.isMCPrime,
              isMcprimeAuthenticated: response.data.isMCPrimeAuthenticated,
            },
          });

          if (is1FX) {
            console.log(lastChecked)
            // console.log(lastChecked - current, "lastChecked - current");
            if (lastChecked === true) {
              console.log("one month ago")
              sessionStorage.setItem("prev", "1fx");
              navigate(`/Welcome?ID=${response.data.id}&t=${Date.now()}`);
            }  else {
              // navigate(`/OrderFXHome?ID=${response.data.id}&t=${Date.now()}`);
              console.log("recent")
              window.location.href =  window.location.origin +`/OrderFXHome?ID=${response.data.id}&t=${Date.now()}`;
            }
          } else {
            console.log(lastChecked)
            context.dispatch({
              Type: "NavMobile",
              Payload: { tab: "My Orders" },
            });
            if (lastChecked === true) {
              console.log("one month ago")
              sessionStorage.setItem("prev", "fullfx");
              navigate(`/Welcome?ID=${response.data.id}&t=${Date.now()}`);
            } else {
              console.log("recent")
              navigate(`/OrderCom?ID=${response.data.id}&t=${Date.now()}`);
            }
          }
          // isAlreadyVerified(response.data.id);
          OpenCageData(response);
        }
      })
      .catch((error) => {
        //console.log(error);
        setPassworderror("Email or Password is incorrect!");
        setIsLoading(false);
      });
     
    } catch (err) {
      console.err(err);
    }
  };

  const loginOnEnter = (e) => {
    if (e.charCode == 13) {
      login();
    }
  };
const handleSetHover =()=>{
  setIsHovered(false);
}
  return (
    <div>
      <Container>
        <Row className="centeritem ">
          <Col md={props.is1FX || props.isFullFx ? 8 : 5} className="formbg ">
            <Form className="forminput radius contentcenter text-center">
              <Form.Group
                className="mb-3 text-center"
                controlId="formBasicEmail"
              >
                <p className="text-form  mb-3">
                  Why go to banks when you can exchange with other people
                </p>

                <Form.Control
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onKeyPress={loginOnEnter}
                  value={email}
                  type="email"
                  placeholder="Enter email"
                  onClick={(e) => {
                    setPassworderror(null);
                  }}
                />
              </Form.Group>

              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyPress={loginOnEnter}
                  type={type === "password" ? "password" : "input"}
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                  value={password}
                />
                {type === "password" ? (
                  <div style={{ zIndex: 10 }} className="eye-icon">
                    <i onClick={changetype} className="fa fa-eye-slash"></i>
                  </div>
                ) : (
                  <div className="eye-icon" style={{ zIndex: 10 }}>
                    <i onClick={changetypepass} className="fa fa-eye"></i>
                  </div>
                )}
              </InputGroup>
              {/* support@mobala.ca or visit our help center. */}
              <p style={{ marginBottom: 14, color: "red" }}>{passworderr}{isBlackListUser && <span><a href="#">support@mobala.ca</a> or visit our help center.</span>}</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  variant="primary"
                  className="btnlogin"
                  style={props.is1FX || props.isFullFx ? {} : { width: "100%" }}
                  // type="submit"
                  onClick={login}
                >
                  {isLoading ? (
                    <>
                      {/* <span className="">Loading</span> */}
                      <Spinner
                        animation="border"
                        role="status"
                        size="sm"
                      ></Spinner>
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
              <Row className="mt-3 text-center">
                <a
                  onClick={() => navigate("/passreset")}
                  className="fpass"
                  style={{ textDecoration: "underline" }}
                >
                  Forgot password?
                </a>
              </Row>
              {props.is1FX ? null : (
                <>
                  <p className="text-form  mt-3 text-center">
                    Don't have an account?{" "}
                    <a
                      onClick={() => navigate("/SignUp")}
                      style={{
                        color: "#0d6efd",
                        textDecoration: "underline",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Create one here
                    </a>
                  </p>
                </>
              )}
            </Form>
          </Col>
        </Row>
        
       <Hover
        isHovered={isHovered}
        handleHoverOrTap={handleHoverOrTap}
        handleSetHover={handleSetHover}
        stepContainerRef={stepContainerRef}
       />
        {/* Conditionally render the paragraph when hovered or clicked */}

        <p style={{ textAlign: "justify", fontSize: "12px" }}>
          While we make utmost efforts to protect the identity and privacy of
          the users, in these times of advanced technologies, numerous
          organizations have fallen victim to fraud and deception. By using
          Mobala, you agree to not hold us liable for any losses.
        </p>
      </Container>
      {/* {session.length > 0 ? session.map((d, i) => <p>{d.date_time}</p>) : null} */}
    </div>
  );
}
export default Login;