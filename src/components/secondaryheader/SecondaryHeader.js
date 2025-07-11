import React, { useContext, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import "../App.css";
import Logo from "../asstes/HoneyLogo.svg";

function SecondaryHeader() {
  const navigate = useNavigate();
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const context = useContext(AppContext);
 
  return (
    <Navbar className="bgnav" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            src={Logo}
            className="Logo cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
            alt="Logo"
          />
        </Navbar.Brand>
      </Container>

     
    </Navbar>
  );
}

export default SecondaryHeader;
