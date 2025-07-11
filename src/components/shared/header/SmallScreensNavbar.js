//SmallScreensNavbar.js
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../Context";
import { NavComponent } from "./Navbar";

const SmallScreensNavbar = (props) => {
  // declare 'translate' as a state variable
  let [translate, setTranslate] = useState(true);
  let [tab, setTab] = useState(true);
  const context = useContext(AppContext);
  const location = useLocation();

 useEffect(() => {
    const pathname = location.pathname;
    if (pathname === `/OrderCom`) {
      setTab("My Orders");
      context.dispatch({ Type: "NavMobile", Payload: { tab: "My Orders" } });
    } else if (pathname === `/Match_Tab`) {
      setTab("Matches");
      context.dispatch({ Type: "NavMobile", Payload: { tab: "Matches" } });
    } else if (pathname === `/ChatPage`) {
      setTab("Finalize");
      context.dispatch({ Type: "NavMobile", Payload: { tab: "Finalize" } });
    } else if (pathname === `/watchlist`) {
      setTab("Watchlist");
      context.dispatch({ Type: "NavMobile", Payload: { tab: "Watchlist" } });
    } else if (pathname === `/MC`) {
      setTab("MC");
      context.dispatch({ Type: "NavMobile", Payload: { tab: "MC" } });
    } else if (pathname === `/Tips`) {
      setTab("Tips");
      context.dispatch({ Type: "NavMobile", Payload: { tab: "Tips" } });
    } else if (pathname === `/McPrime`) {
      setTab("MC Prime");
      context.dispatch({ Type: "NavMobile", Payload: { tab: "MC Prime" } });
    } else if (pathname === "/editprofile") {
      setTab("");
      context.dispatch({ Type: "NavMobile", Payload: { tab: "Profile" } });
    }
  }, [location]);
  useEffect(() => {
    const handleGlobalClick = () => {
      
      if (translate){
        setTranslate(true);
      }
    };  
    document.addEventListener("click", handleGlobalClick);  
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div>
      <div style={{ position: "absolute", right: "60px", padding: "0px 10px" }}>
        <h4 style={{ color: "white" }}>{tab}</h4>
      </div>
      {/* <div style={{ position: "absolute", right: "60px", padding: "0px 10px" }}>
        <h4
          style={{
            color: "white",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100px",
          }}
        //   title={context.applicationStore.tab}
        >
          {context.applicationStore.tab.length > 10
            ? context.applicationStore.tab.slice(0, 10) + "..."
            : context.applicationStore.tab}
        </h4>
      </div> */}
      <button
        className="hamburger-btn notranslate abc"
        onClick={(e) => {
          e.stopPropagation();
          setTranslate(!translate)
        }}
      >
        {" "}
        {/* toggle translate */}
        {/* change the btn text based on whether translate is true or false */}
        {translate ? <span>&#x2630;</span> : <span>&times;</span>}
      </button>
      {/*hide and show the sidebar list based on whether translate is true or false*/}
      <div
        id="sidebar-list"
        className={`${translate ? "addTransiton" : "removeTransition"}`}
      >
        <NavComponent
          navClass="nav-small"
          linkClassName="nav-small-link"
          userData={props.userData}
          isMute={props.isMute}
          headerState={props.headerState}
          signout={props.signout}
          soundActivate={props.soundActivate}
          onClick={() => setTranslate(true)} //set translate to true to hide the sidebar list
        />
      </div>
    </div>
  );
};
export default SmallScreensNavbar;
