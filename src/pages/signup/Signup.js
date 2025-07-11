import React, { Suspense } from "react";
import "../../App.css";
import Loading from "../../components/loader/loading.js";
import Profile from "../../components/profile/profileComponent.js";
function SignUp(props) {
  return (
    <div className="mainbg" style={{ fontSize: 14 }}>
      {/* <div
        style={{
          background: "#dae5f1",
          textAlign: "center"
        }}
      >
        Mobala is simply a meeting place. We don’t handle any money and have no
        agents handling money on our behalf.
      </div> */}
      {/* <Navbar className="bgnav fixed-top" expand="lg">
        <Container>
          <Navbar.Brand>
            <img src={Logo} className="Logo" alt="Logo" />
          </Navbar.Brand>
        </Container>
      </Navbar> */}

      <Suspense fallback={<Loading />}>
        <Profile />
      </Suspense>

      {/* {window.location.pathname == "/OrderFXHome" ||
      window.location.pathname == "/" ? (
        <div
          style={{
            background: "#000",
            color: "#fff",
            width: "100%",
            bottom: 0,
            minHeight: "3vh",
          }}
        >
          <ul className="d-flex justify-content-between pr-3 m-0">
            <li>About Us</li>
            <li> &copy; Mobala FX 2023</li>
            <li>
              <a className="footerAnchor" href="/Terms">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/PrivacyPolicy" className="footerAnchor">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      ) : null} */}
    </div>
  );
}
export default SignUp;
