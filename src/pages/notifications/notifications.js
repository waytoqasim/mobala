import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import close from "../../asstes/close.svg";
import Notify from "../../asstes/notify.svg";
import NotifyWithDot from "../../asstes/notifywithdot.svg";
import Picture from "../../asstes/Profile.svg";
import Stars from "../../asstes/rattingstar.svg";
import { AppContext } from "../../Context";
import { addDoc, apiHost } from "../../Helper";

const TopUpNotification = () => {
  const [notifData, setNotifData] = useState([]);
  const [visitedLength, setVisitedLength] = useState(0);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [notification, setNotification] = useState({});
  const [showtoast, setShowtoast] = useState(false);
  const [cardShow, setCardShow] = useState(false);
  const [list, setlist] = useState("");
  const [loading, setloading] = useState(true);
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [signupShow, setSignupShow] = useState(false);
  const [showMessageTab, setShowMessageTab] = useState(true);
  const [showInviteTab, setShowInvateTab] = useState(false);
  const [message, setMessage] = useState([]);
  const inviteArray = [];
  const messageArray = [];
  const [unReadMesCount, setUnReadMesCount] = useState(0);
  const [unReadinvCount, setUnReadInvCount] = useState(0);
  const [showMessage, setShowMessage] = useState({
    Username: "",
    Date: "",
    Message: "",
  });
  const [messageIsOpen, setMessageIsOpen] = useState(false);
  const [openMessageId, setOpenMessageId] = useState(0);

  const handleSignupClose = () => setSignupShow(false);

  const totalNotifications = notifData.length;
  const unreadNotifications = notifData.filter(
    (notif) => !notif.isVisited
  ).length;
  const notificationRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [starFill, setstarFill] = useState(0);
  const [orderDropdown, setOrderDropdown] = useState([]);
  const [selectedOrderDropdown, setSelectedOrderDropdown] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setIsMobile(mobile);
  }, []);

  function soundFunc() {
    var x = document.getElementById("notificationSound");
    x.play();
  }

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

  const getMessage = async () => {
    let count = 0;
    let notifications = [];
    let url = `${apiHost}/api/Orders/GetMessageNotifs?UserId=${uid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        setUnReadMesCount(
          response.data.messagesNotif.filter(
            (d) => !d.isVisited && d.type === "message"
          ).length
        );

        response.data.messagesNotif.forEach((d, i) => {
          // console.log(d);
          if (d.type === "message") {
            let messageDate = new Date(d.time);
            messageDate.setHours(0, 0, 0, 0);

            let newtime;
            if (messageDate.getTime() === today.getTime()) {
              newtime = new Date(d.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
            } else {
              newtime = d.time.split("T")[0];
            }

            if (
              new Date(d.time) > new Date().setDate(new Date().getDate() - 7)
            ) {
              if (!d.isVisited || d.isVisited === null) {
                count++;
              }

              let obj = { newtime: newtime, ...d };
              messageArray.push(obj);
            }
            setVisitedLength(count);
            setMessage(messageArray);
          } else {
            let inviteDate = new Date(d.time);
            inviteDate.setHours(0, 0, 0, 0);

            let newtime;
            if (inviteDate.getTime() === today.getTime()) {
              newtime = new Date(d.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
            } else {
              newtime = d.time.split("T")[0];
            }

            if (
              new Date(d.time) > new Date().setDate(new Date().getDate() - 7)
            ) {
              if (!d.isVisited || d.isVisited === null) {
                count++;
              }

              let obj = { newtime: newtime, ...d };
              inviteArray.push(obj);
            }
            if (d.isVisited === false) {
              setUnReadInvCount(unReadinvCount + 1);
            }
            setVisitedLength(count);
            setNotifData(inviteArray);
          }
        });
      });
  };

  useEffect(() => {
    setUID(sessionStorage.getItem("UserID"));
    const x = sessionStorage.getItem("logedin");
    if (x === "false") {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    getMessage();
  }, [context.applicationStore.notificationMessage]);

  const Getdata = async () => {
    let url = `${apiHost}/api/User/GetUserById?UserId=${uid}`;
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    Getdata();
    getOrderDropdown();
  }, [uid, loading, context.applicationStore.navigation]);

  const moveToPage = (notifObj) => {
    let notifType = notifObj.type;
    if (!notifObj.isVisited) {
      addDoc("RemoveNotif", {
        description: notifObj.description,
      }).then(() => {
        // getNotifs();
        getMessage();
      });
    }
    context.dispatch({ Type: "NAVIGATION" });
    if (notifType == "acceptinvite") {
      let orderId = notifObj.description.split("order")[1].trim();
      navigate(`/ChatPage?ID=${uid}?OrderId=${orderId}&t=${Date.now()}`);
    } else if (notifType == "invite") {
      let orderId = notifObj.description.split("order")[1].trim();
      navigate(`/Match_Tab?ID=${uid}?OrderId=${orderId}&t=${Date.now()}`);
    } else if (notifType == "rejectinvite") {
      let orderId = notifObj.description.split("order")[1].trim();
      navigate(`/Match_Tab?ID=${uid}?OrderId=${orderId}&t=${Date.now()}`);
    }
  };

  const navigateSignup = () => {
    let obj = {
      email: sessionStorage.getItem("email"),
      userId: sessionStorage.getItem("UserID"),
      userName: sessionStorage.getItem("UserName"),
    };
    let jsonString = JSON.stringify(obj);
    let encodedString = encodeURIComponent(jsonString);
    navigate(`/SignUp?data=${encodedString}`);
    setSignupShow(false);
  };

  const getOrderDropdown = () => {
    let uid = sessionStorage.getItem("UserID");
    let url = `${apiHost}/api/Orders/GetOrderDropdown?UserId=${uid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        // console.log("BRRRRRRRRRRRRRR RESPONSE", response);
        if (response.data.length !== 0) {
          setOrderDropdown(response.data);
          //setCurrentOrder(response.data[0]["orderId"]);
        } else {
          //setIsLoading(false)
        }
        // if (window.location.search.split("=")[2] == undefined) {
        // } else {
        //   setCurrentOrder(window.location.search.split("=")[2]);
        // }
        //console.log(response.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
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
      <div
        ref={notificationRef}
        className={`notificationTopup  cursor-pointer ${
          showNotification ? "show-notificationTopup" : ""
        }`}
        onClick={() => {
          setShowNotification(true);
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            padding: "5px 2px",
            backgroundColor: "#2995be",
            color: "white",
          }}
          onClick={() => {
            setShowNotification(!showNotification);
          }}
        >
          <div className="d-flex justify-content-between align-items-center p-1">
            <div style={{ position: "relative" }}>
              <img
                style={{
                  backgroundColor: "#2995be",
                  borderRadius: "50%",
                  height: "25px",
                  width: "25px",
                  borderWidth: 3,
                  marginLeft: "-2px",
                  marginRight: "10px",
                }}
                src={unreadNotifications > 0 ? NotifyWithDot : Notify}
                alt="Notification Icon"
              />
              <p
                style={{
                  position: "absolute",
                  top: "14px",
                  color: "white",
                  right: "6px",
                }}
              >
                {unReadinvCount}
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "14px",
                  color: "white",
                  left: "-5px",
                }}
              >
                {unReadMesCount}
              </p>
            </div>
            &nbsp;&nbsp;
            <h5
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: "0px",
              }}
            >
              Notifications
            </h5>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p style={{ fontSize: 12, marginBottom: "0px" }}>(Last 7 days)</p>
          </div>
          <div>
            <img
              src={close}
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
              className={`varrow showNotification ${
                showNotification ? "rotated" : ""
              }`}
              alt="logo"
            />
          </div>
        </div>

        {showNotification && (
          <>
            {/* **********SearchBox********** */}
            <div class="input-group">
              <div
                style={{
                  width: "100%",
                }}
              >
                <div className="mt-3">
                  <button
                    id="search-button"
                    style={{
                      outline: "none",
                      border: "0px",
                      position: "absolute",
                      top: "19px",
                      left: "30px",
                      background: "transparent",
                    }}
                    type="button"
                  >
                    <i class="fas fa-search"></i>
                  </button>
                  <div class="form-outline w-100" data-mdb-input-init>
                    {showMessageTab === true ? (
                      // <>
                      //   <input
                      //     id="search-input"
                      //     type="search"
                      //     placeholder="Search Messages"
                      //     className="form-control search_box pl-5"
                      //     style={{
                      //       width: "80%",
                      //       margin: "0 auto",
                      //       background: "#E7E7E7",
                      //       padding: "17px",
                      //     }}
                      //   />
                      //   <select
                      //     onChange={(e) => {
                      //       console.log("Selected Order:", e.target.value);
                      //       //props.setCurrentOrder(e.target.value);
                      //     }}
                      //     style={{
                      //       width: "80%",
                      //       margin: "10px auto",
                      //       background: "#FFFFFF",
                      //       padding: "10px",
                      //       fontSize: "13px",
                      //     }}
                      //   >
                      //     {orderDropdown.length > 0 ? (
                      //       orderDropdown.map((order, i) => (
                      //         <option
                      //           key={i}
                      //           value={order.orderId}
                      //           style={{ fontSize: "13px" }}
                      //         >
                      //           {order.orderId}
                      //         </option>
                      //       ))
                      //     ) : (
                      //       <option value="" disabled>
                      //         No orders available
                      //       </option>
                      //     )}
                      //   </select>
                      // </>
                      <select
                        id="search-message"
                        type="search"
                        placeholder="Search by Order"
                        className="form-control search_box pl-5"
                        style={{
                          width: "80%",
                          margin: "0 auto",
                          background: "#E7E7E7",
                        }}
                        onChange={(e) => {
                          // console.log("Selected Order:", e.target.value);
                          setSelectedOrderDropdown(e.target.value);
                        }}
                        value={selectedOrderDropdown}
                      >
                        <option>Search by Order Id</option>
                        {orderDropdown.length > 0 ? (
                          orderDropdown.map((order, i) => (
                            <option
                              key={i}
                              value={order.orderId}
                              style={{ fontSize: "13px" }}
                            >
                              {order.orderId}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            No orders available
                          </option>
                        )}
                      </select>
                    ) : (
                      <select
                        id="search-invite"
                        type="search"
                        placeholder="Search by Order"
                        className="form-control search_box pl-5"
                        style={{
                          width: "80%",
                          margin: "0 auto",
                          background: "#E7E7E7",
                        }}
                        onChange={(e) => {
                          // console.log("Selected Order:", e.target.value);
                          setSelectedOrderDropdown(e.target.value);
                        }}
                        value={selectedOrderDropdown}
                      >
                        <option>Search by Order Id</option>
                        {orderDropdown.length > 0 ? (
                          orderDropdown.map((order, i) => (
                            <option
                              key={i}
                              value={order.orderId}
                              style={{ fontSize: "13px" }}
                            >
                              {order.orderId}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            No orders available
                          </option>
                        )}
                      </select>
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                }}
                className="mt-3 "
              >
                <div className="w-100 d-flex">
                  <p
                    className={`${
                      showMessageTab === true
                        ? "activenotifTab"
                        : "nonActiveTabfont"
                    } text-center py-2`}
                    style={{ fontWeight: "bold", flex: "1 1 0" }}
                    onClick={() => {
                      setShowMessageTab(true);
                      setShowInvateTab(false);
                    }}
                  >
                    Messages
                  </p>
                  <p
                    className={`${
                      showInviteTab === true
                        ? "activenotifTab"
                        : "nonActiveTabfont"
                    } text-center py-2`}
                    style={{ fontWeight: "bold", flex: "1 1 0" }}
                    onClick={() => {
                      setShowMessageTab(false);
                      setShowInvateTab(true);
                    }}
                  >
                    Invites
                  </p>
                </div>
                <div>
                  {showMessageTab && (
                    <div className="">
                      <div
                        className=""
                        style={{ maxHeight: "300px", overflowY: "auto" }}
                        onClick={() => {
                          if (cardShow) {
                            setCardShow(false);
                          } else {
                            setCardShow(true);
                          }
                        }}
                      >
                        <div className="card-body p-0">
                          {message.map((item, index) => (
                            <div
                              key={index}
                              onClick={(k) => {
                                if (sessionStorage.getItem("City") == "null") {
                                  setSignupShow(true);
                                } else {
                                  moveToPage(item);
                                }
                              }}
                              className={`
                               ${
                                 item.isVisited
                                   ? "notifItem-visited"
                                   : "notifItem-notvisited"
                               }
                                  hoverEffectOnTab
                              `}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "smaller",
                                border: "0px",
                                fontWeight: item.isVisited ? "normal" : "bold",
                                padding: "4px",
                                marginBottom: "2px",
                                paddingBottom: "5px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  flex: "1",
                                }}
                                className="pr-1"
                              >
                                <img
                                  src={
                                    item.senderProfileimagepath == ""
                                      ? Picture
                                      : `${apiHost}/Images/${item.profileimagepath}`
                                  }
                                  alt="User Profile"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: "1px solid #d5d5d5",
                                  }}
                                />
                                <Row style={{ position: "relative" }}>
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip
                                        id="tooltip-disabled"
                                        bsPrefix="custom-tooltip"
                                        style={{
                                          position: "absolute",
                                          zIndex: 999,
                                        }}
                                      >
                                        {item.reviewScore} reviews
                                      </Tooltip>
                                    }
                                    placement="top-start"
                                  >
                                    <Col md={12}>
                                      <img
                                        className={
                                          item.reviewScore >= 1
                                            ? "rating-fill"
                                            : "rating-unfill"
                                        }
                                        src={Stars}
                                        alt="Stars"
                                      />
                                      <img
                                        className={
                                          item.reviewScore >= 2
                                            ? "rating-fill"
                                            : "rating-unfill"
                                        }
                                        src={Stars}
                                        alt="Stars"
                                      />
                                      <img
                                        className={
                                          item.reviewScore >= 3
                                            ? "rating-fill"
                                            : "rating-unfill"
                                        }
                                        src={Stars}
                                        alt="Stars"
                                      />
                                      <img
                                        className={
                                          item.reviewScore >= 4
                                            ? "rating-fill"
                                            : "rating-unfill"
                                        }
                                        src={Stars}
                                        alt="Stars"
                                      />
                                      <img
                                        className={
                                          item.reviewScore >= 5
                                            ? "rating-fill"
                                            : "rating-unfill"
                                        }
                                        src={Stars}
                                        alt="Stars"
                                      />
                                    </Col>
                                  </OverlayTrigger>
                                </Row>
                              </div>
                              <div style={{ flex: "2" }}>
                                <div className="d-flex justify-content-between">
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {" "}
                                    {item.senderName}
                                  </p>

                                  {/* <p
                                    className="datenotify pr-2 mb-0"
                                    style={{
                                      fontWeight: "bold",
                                      marginTop: "2px",
                                      color: "black",
                                    }}
                                  >
                                    {" "}
                                    {item.newtime.split(" at ")[1]}
                                  </p> */}
                                </div>

                                {/* <OverlayTrigger
                                  overlay={
                                    <Tooltip
                                      id="tooltip-disabled"
                                      bsPrefix="custom-tooltip"
                                      style={{
                                        zIndex: 99999,
                                        width: "350px",
                                        textAlign: "right"
                                      }}
                                    >
                                      {item.description}
                                    </Tooltip>
                                  }
                                  placement="top-start"
                                >
                                  <div
                                    className={subjectnotify ${
                                      item.isVisited === true
                                        ? "text-secondary"
                                        : "text-dark font-weight-bold"
                                    } ${
                                      item.description.length > 50
                                        ? "linerScrollbar"
                                        : ""
                                    }}
                                    style={{ color: "black" }}
                                  >
                                    {item.description}
                                  </div>
                                </OverlayTrigger> */}

                                {isMobile ? (
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip
                                        id="tooltip-disabled"
                                        bsPrefix="custom-tooltip"
                                        style={{
                                          zIndex: 99999,
                                          width: "350px",
                                          textAlign: "right",
                                        }}
                                      >
                                        {truncateText(item.description, 200)}
                                      </Tooltip>
                                    }
                                    placement="top"
                                  >
                                    <div
                                      className={`subjectnotify ${
                                        item.isVisited
                                          ? "text-secondary"
                                          : "text-dark font-weight-bold"
                                      }`}
                                      style={{ color: "black" }}
                                    >
                                      {truncateText(item.description, 100)}
                                    </div>
                                  </OverlayTrigger>
                                ) : (
                                  <div
                                    className={`subjectnotify ${
                                      item.isVisited
                                        ? "text-secondary"
                                        : "text-dark font-weight-bold"
                                    } ${
                                      item.description.length > 50
                                        ? "linerScrollbar"
                                        : ""
                                    }`}
                                    style={{ color: "black" }}
                                  >
                                    {/* {truncateText(item.description, 170)} */}
                                    {item.description}
                                  </div>
                                )}

                                <div
                                  className="datenotify"
                                  style={{ color: "black" }}
                                >
                                  {item.newtime}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {showInviteTab && (
                    <div className="">
                      <div
                        className=""
                        style={{ maxHeight: "400px", overflowY: "auto" }}
                        onClick={() => {
                          if (cardShow) {
                            setCardShow(false);
                          } else {
                            setCardShow(true);
                          }
                        }}
                      >
                        <div className="card-body p-0">
                          {notifData.map((item, index) => (
                            <div
                              key={index}
                              onClick={(k) => {
                                if (sessionStorage.getItem("City") == "null") {
                                  setSignupShow(true);
                                } else {
                                  moveToPage(item);
                                }
                              }}
                              className={`
                                ${
                                  item.isVisited
                                    ? "notifItem-visited"
                                    : "notifItem-notvisited"
                                }
                                  hoverEffectOnTab
                              `}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "smaller",
                                border: "0px",
                                fontWeight: item.isVisited ? "normal" : "bold",
                                padding: "4px",
                                marginBottom: "2px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  flex: "1",
                                }}
                                className="pr-1"
                              >
                                <img
                                  src={
                                    item.senderProfileimagepath == ""
                                      ? Picture
                                      : `${apiHost}/Images/${item.profileimagepath}`
                                  }
                                  alt="User Profile"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: "1px solid #d5d5d5",
                                  }}
                                />
                                <Row style={{ position: "relative" }}>
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip
                                        id="tooltip-disabled"
                                        bsPrefix="custom-tooltip"
                                        style={{
                                          position: "absolute",
                                          zIndex: 999,
                                        }}
                                      >
                                        {item.reviewScore} reviews
                                      </Tooltip>
                                    }
                                    placement="top-start"
                                  >
                                    <Col md={12}>
                                      <img
                                        className={
                                          item.reviewScore >= 1
                                            ? "rating-fill"
                                            : "rating-unfill"
                                        }
                                        src={Stars}
                                        alt="Stars"
                                      />
                                      <img
                                        className={
                                          item.reviewScore >= 2
                                            ? "rating-fill"
                                            : "rating-unfill"
                                        }
                                        src={Stars}
                                        alt="Stars"
                                      />
                                      <img
                                        className={
                                          item.reviewScore >= 3
                                            ? "rating-fill"
                                            : "rating-unfill"
                                        }
                                        src={Stars}
                                        alt="Stars"
                                      />
                                      <img
                                        className={
                                          item.reviewScore >= 4
                                            ? "rating-fill"
                                            : "rating-unfill"
                                        }
                                        src={Stars}
                                        alt="Stars"
                                      />
                                      <img
                                        className={
                                          item.reviewScore >= 5
                                            ? "rating-fill"
                                            : "rating-unfill"
                                        }
                                        src={Stars}
                                        alt="Stars"
                                      />
                                    </Col>
                                  </OverlayTrigger>
                                </Row>
                              </div>
                              <div style={{ flex: "3" }}>
                                <div className="d-flex justify-content-between">
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {" "}
                                    {item.senderName}
                                  </p>

                                  {/* <p
                                    className="datenotify pr-2 mb-0"
                                    style={{
                                      fontWeight: "bold",
                                      marginTop: "2px",
                                      color: "black",
                                    }}
                                  >
                                    {" "}
                                    {item.newtime.split(" at ")[1]}
                                  </p> */}
                                </div>
                                <div
                                  className={`subjectnotify ${
                                    item.description.length > 50
                                      ? "linerScrollbar"
                                      : ""
                                  }`}
                                  style={{ color: "black" }}
                                >
                                  {item.description}
                                </div>
                                <div
                                  className="datenotify"
                                  style={{
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "86px",
                                    alignItems: "center",
                                    marginTop: "2px",
                                  }}
                                >
                                  {item.type === "acceptinvite" ? (
                                    <p style={{ color: "#2995be" }}>
                                      [Accepted]
                                    </p>
                                  ) : item.type === "invite" ? (
                                    <p style={{ color: "#2995be" }}>
                                      [Pending]
                                    </p>
                                  ) : (
                                    <p style={{ color: "#2995be" }}>
                                      [Rejected]
                                    </p>
                                  )}

                                  <p>{item.newtime}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TopUpNotification;
