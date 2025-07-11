// Header.js
import { useState } from 'react';
import { Button, Col, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Logo from "../../../asstes/HoneyLogo.svg";
import { useWindowWidthAndHeight } from './CustomHooks';
import { NavbarDropDown } from './Navbar'; // react-scroll is a library for scrolling in React
import SmallScreensNavbar from './SmallScreensNavbar';

const Header = (props) => {
    const [width, height] = useWindowWidthAndHeight();
    const [signupShow, setSignupShow] = useState(false);
    const handleSignupClose = () => setSignupShow(false);
    const navigate = useNavigate();
  
    const navigateSignup = () => {
      let obj = {
        email: sessionStorage.getItem("email"),
        userId: sessionStorage.getItem("UserID"),
        userName: sessionStorage.getItem("UserName"),
      };
      let jsonString = JSON.stringify(obj);
      let encodedString = encodeURIComponent(jsonString);
      navigate(`/SignUp?data=${encodedString}&t=${Date.now()}`);
      setSignupShow(false)
    };
  
    return (
      <>
        <Modal
          show={signupShow}
          onHide={handleSignupClose}
          size="md"
          className="oneFXSignUpModal"
        >
          <Modal.Header>
            <Modal.Title>Full FX</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: "17px" }}>
              You need to sign up as Full-FX user.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Col>
              <Button
                variant="secondary"
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
        <header>
          <div className="header-inner">
            <div  className="logo nav-link"> 
              <div
                style={{ position: "absolute", bottom: "5px" }}
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
              </div>
            </div>
                {props.headerState == "loggedin" ?
                    <SmallScreensNavbar navClass="nav-small"
                        linkClassName="nav-small-link"
                        userData={props.userData}
                        isMute={props.isMute}
                        headerState={props.headerState}
                        signout={props.signout}
                        soundActivate={props.soundActivate}
                        randomFunction={props.randomFunction}
                    /> :
                    props.headerState == "orderfx" ?
                        <NavbarDropDown userData={props.userData} isMute={props.isMute} headerState={props.headerState} signout={props.signout} soundActivate={props.soundActivate} randomFunction={props.randomFunction} />
                        : null
                }
            </div>

           
        </header>
        </>
    )
}

export default Header;