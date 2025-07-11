import React, { useContext, useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../../Context";
import { apiHost } from "../../../Helper";
import Map from "../../../asstes/map.png";
import mute from "../../../asstes/mute.png";
import unmute from "../../../asstes/unmute.png";
import defaultProfilePic from "../../../asstes/Profilepic.png"

export const NavbarDropDown = ({
  onClick,
  userData,
  isMute,
  headerState,
  signout,
  soundActivate,
}) => {
  const [currentPage, setCurrentPage] = useState("");
  const context = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  const randomFunction = () => {
    context.dispatch({ Type: "NAVIGATION" });
  };

  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, [window.location.pathname]);

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

 // Handle dropdown toggle on click only
 const handleTitleClick = (e) => {
  e.preventDefault(); // Prevent default behavior
  e.stopPropagation(); // Stop event propagation
  setShowDropdown((prev) => !prev);
  console.log("Dropdown toggled:", !showDropdown); // Debug
};

// Prevent hover or other events from opening dropdown
const handleToggle = (nextShow, meta) => {
  if (meta.event?.type === "click") {
    setShowDropdown(nextShow);
  } else {
    console.log("Non-click event ignored:", meta.event?.type); // Debug
  }
};

  return (
    <NavDropdown
      className={`show1 ${
        headerState === "orderfx" ? "header-dropdown-orderfx" : ""
      }`}
      id="collasible-nav-dropdown mobileNameDrop"
      show={showDropdown} // Control dropdown visibility
      onToggle={handleToggle} // Handle toggle on click
      onClick={(e) => e.stopPropagation()} 
      title={
        <div
          className={`${
            currentPage === "/OrderFXHome"
              ? "header-dropdown-orderFxHome"
              : "header-dropdown"
          } notranslate`}
          style={{ marginBottom: "120px" }}
          onClick={() => setShowDropdown(!showDropdown)} 
         
        >
          <img
            id="ProfilePic"
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              height: "50px",
              width: "37px",
              borderWidth: 3,
              borderColor: "#fff",
              marginRight: "4px",
            }}
            src={
              sessionStorage?.getItem("settingProfilePic")?.split(",")[0] !==
                null &&
              userData.userName ===
                sessionStorage?.getItem("settingProfilePic")?.split(",")[1]
                ? `${apiHost}/Images/${sessionStorage?.getItem("settingProfilePic")?.split(",")[0]}`
                : defaultProfilePic
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultProfilePic;
            }}
            alt="Profile"
          />
          {userData.userName}
        </div>
      }
    >
      {headerState === "orderfx" ? (
        <>
          <NavDropdown.Item
            style={{ color: "black" }}
            onClick={() => soundActivate(!isMute)}
          >
            Sound{" "}
            <img id="sound" src={isMute ? mute : unmute} width="12px" alt="Sound" />
          </NavDropdown.Item>
          <hr style={{ width: "80%", margin: "0px 0px 0px 10px" }} />
          <NavDropdown.Item style={{ color: "black" }} onClick={signout}>
            Logout
          </NavDropdown.Item>
        </>
      ) : (
        <>
          <NavDropdown.Item onClick={onClick}>
            <Link
              onClick={() => {
                context.dispatch({
                  Type: "NavMobile",
                  Payload: { tab: "Profile" },
                });
                randomFunction();
              }}
              style={{ color: "black", textDecoration: "none" }}
              to={`/editprofile?ID=${sessionStorage.UserID}`}
            >
              Edit Profile
            </Link>
          </NavDropdown.Item>
          <hr style={{ width: "80%", margin: "0px 0px 0px 10px" }} />
          <NavDropdown.Item onClick={onClick}>
            <Link
              onClick={randomFunction}
              style={{ color: "black", textDecoration: "none" }}
              to={`/OrderFXHome?ID=${sessionStorage.UserID}`}
            >
              1-Order-FX
            </Link>
          </NavDropdown.Item>
          <hr style={{ width: "80%", margin: "0px 0px 0px 10px" }} />
          <NavDropdown.Item
            style={{ color: "black" }}
            onClick={() => soundActivate(!isMute)}
          >
            Sound{" "}
            <img id="sound" src={isMute ? mute : unmute} width="12px" alt="Sound" />
          </NavDropdown.Item>
          <hr style={{ width: "80%", margin: "0px 0px 0px 10px" }} />
          <NavDropdown.Item style={{ color: "black" }} onClick={signout}>
            Logout
          </NavDropdown.Item>
        </>
      )}
    </NavDropdown>
  );
};

export const NavComponent = ({
  onClick,
  navClass,
  linkClassName,
  userData,
  isMute,
  headerState,
  signout,
  soundActivate,
}) => {
  const context = useContext(AppContext);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  useEffect(() => {
    console.log(context.applicationStore.tab);
  }, [context]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <>
      <nav className={navClass}>
        {[
          { name: "My Orders", link: "/OrderCom" },
          { name: "Matches", link: "/Match_Tab" },
          { name: "Finalize", link: "/ChatPage" },
          { name: "Watchlist", link: "/watchlist" },
          { name: "MC", link: "/MC" },
          { name: "Tips", link: "/Tips" },
          { name: "MC Prime", link: "/McPrime" },
        ].map((section) => (
          <Link
            to={`${section.link}?ID=${sessionStorage.getItem("UserID")}`}
            key={section.name}
            smooth={true}
            className={linkClassName}
            style={
              context.applicationStore.tab === section.name
                ? {
                    border: "1px solid",
                    padding: "7.5px 15px",
                    borderRadius: "5%",
                    minWidth: "50%",
                  }
                : {
                    padding: "7.5px 15px",
                  }
            }
            onClick={() => {
              context.dispatch({
                Type: "NavMobile",
                Payload: { tab: section.name },
              });
            }}
          >
            {section.name}
          </Link>
        ))}
        <a className="nav-small-link" style={{ padding: "7.5px 15px" }}>
          <img
            src={Map}
            style={{ width: 20, height: 20 }}
            alt="Map"
            onClick={() => {
              window.open(
                `https://www.google.com/maps/search/money+changers+near+me/@${latitude},${longitude},15z/data=!3m1!4b1`,
                "_blank",
                "noreferrer"
              );
            }}
          />
        </a>
      </nav>
      <NavbarDropDown
        userData={userData}
        isMute={isMute}
        headerState={headerState}
        signout={signout}
        soundActivate={soundActivate}
        onClick={onClick}
      />
    </>
  );
};