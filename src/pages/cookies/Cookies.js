import React, { useEffect, useState } from "react";
import "../../App.css";

const CookieConsentPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const handleAccept = () => {
    setShowPopup(false);
    // Set a cookie to remember the user's consent here.
    // You can use a library like js-cookie or the browser's native document.cookie API.
  };

  useEffect(() => {
    setTimeout(() => {
      // //console.log(localStorage.Cookie);
      if (localStorage.Cookie !== "SEEN") {
        setIsOpen(true);
      }
    }, 1000);
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    localStorage.setItem("Cookie", "SEEN");
    setIsOpen(false);
  };

  return (
    // <div className="fixed-bottom p-4">
    //   <div
    //     className="toast bg-dark text-white w-100 mw-100"
    //     role="alert"
    //     data-autohide="false"
    //   >
    //     <div className="toast-body p-4 d-flex flex-column">
    //       <h4>Cookie Warning</h4>
    //       <p>
    //         This website stores data such as cookies to enable site
    //         functionality including analytics and personalization. By using this
    //         website, you automatically accept that we use cookies.
    //       </p>
    //       <div className="ml-auto">
    //         <button
    //           type="button"
    //           className="btn btn-outline-light mr-3"
    //           id="btnDeny"
    //         >
    //           Deny
    //         </button>
    //         <button type="button" className="btn btn-light" id="btnAccept">
    //           Accept
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className={`cookies-content w-100 ${isOpen ? "d-block" : "d-none"}`}
      // style={{ whiteSpace: "nowrap" }}
    >
      <div className="text-center d-flex align-items-center">
        {/* <h2 style={{width: "20rem"}}>Cookies Warning</h2> */}
        <h6 className="text-break" style={{ marginBottom: 0, padding: "6px",color:"grey" }}>
          We use cookies to personalise content and ads, and to analyse our
          traffic. We also share information about your use of our site with
          Google Ads Google Analytics.
        </h6>
        <div style={{ textAlign: "right", width: "5rem" }}>
          <button
            className="btn btn-primary w-auto"
            // style={{ width: "50%" }}
            onClick={closeModal}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentPopup;
