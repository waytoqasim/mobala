import axios from "axios";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import add from "../../asstes/add.svg";
import close from "../../asstes/close.svg";
import notifsound from "../../asstes/notif.wav";
import { AppContext } from "../../Context";
import { addDoc, apiHost } from "../../Helper";
import SignalRService from "../../SignalR";
import Loading from "../loading";
import OrderCom_Mobile from "../mobileordercom/Mobile Ordercom";
import { Orders } from "../Orders";

const OrderCom = (props) => {
  const [activelist, setactivelist] = useState([]);
  const [holdlist, setHoldlist] = useState([]);
  const [expiredlist, setExpiredlist] = useState([]);
  const [completedlist, setCompletedlist] = useState([]);
  const [finalizelist, setFinalizelist] = useState([]);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [countmap, setcountmap] = useState("");
  const [isloading, setisloading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [matchCount, setmatchCount] = useState(0);
  const [activeCount, setactiveCount] = useState(0);
  const [isIndex, setisIndex] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const navigate = useNavigate();
  let Index = 0;
  const context = useContext(AppContext);

  useEffect(() => {
    if (context.applicationStore.matchOrder != undefined) {
      let order = context.applicationStore.matchOrder;
      let finalize = [...finalizelist];
      let active = [...activelist];
      active.forEach((d) => {
        if (
          d.takeCurrency == order.GiveCurrency &&
          order.TakeCurrency == d.giveCurrency
        ) {
          d.matchedCount += 1;
          d.match = true;
        }
      });
      finalize.forEach((d) => {
        if (
          d.takeCurrency == order.GiveCurrency &&
          order.TakeCurrency == d.giveCurrency
        ) {
          d.matchedCount += 1;
          d.match = true;
        }
      });
      setactivelist(active);
      setFinalizelist(finalize);
    }
  }, [context.applicationStore.matchOrder]);

  useEffect(() => {
    context.dispatch({ Type: "NAVIGATION" });
    document.getElementById("root").scroll(0, 0);
  }, []);
  useEffect(() => {
    sessionStorage.setItem("previousPathName", window.location.pathname);
  }, [navigate]);

  useEffect(() => {
    let url = `${apiHost}/api/Rates/FetchRate`;
    // , "expired"
    axios.get(url).then((response) => {
      let dd = new Date(response.data.time.value);
      dd = new Date(
        dd.toLocaleString("en-US", {
          timeZone: sessionStorage.getItem("TimeZone"),
        })
      );
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedDate = dd.toLocaleDateString("en-US", options);
      let date =
        formattedDate.split(",")[0] + "," + formattedDate.split(",")[1];
      setDate(date);
      let time =
        formattedDate.split(",")[2] +
        `  (${sessionStorage.getItem("TimeZone")})`;
      setTime(time);
    });
  }, [uid]);

  useEffect(() => {
    setTimeout(() => {
      let x = new Date();
      let hour = x.getHours();
      let minute = x.getMinutes();
      let second = x.getSeconds();
      let datte = x.toDateString();
      let localDate =
        datte.split(" ")[1] +
        "/" +
        datte.split(" ")[2] +
        "/" +
        datte.split(" ")[3];
    }, 1000);
  });

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      style={{ textDecoration: "none" }}
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span className="threedots" />
    </a>
  ));

  function soundFunc() {
    var x = document.getElementById("notificationSound");
    x.play();
  }

  const expiredOrderNotif = (data) => {
    addDoc(`addNotification`, {
      description: data,
      type: "orderexpiry",
      visited: false,
      senderId: uid,
      sentToId: uid,
    });
    SignalRService.sendNotification(uid, data, "orderexpiry");
  };

  // useEffect(() => {
  //   setUID(window.location.search.split("&")[0].split("=")[1]);
  // }, [null]);

  useEffect(() => {
    GetData();
    if (isFetch == true) {
      document.getElementById("activebdr").className = "bdrfiltrclick";
      document.getElementById("allbdr").className = "bdrfiltr";
      document.getElementById("holdorder").style.display = "none";
      document.getElementById("expired").style.display = "none";
      document.getElementById("completed").style.display = "none";
    }
  }, [uid, isFetch]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  const GenerateExpiringOrderNotif = async (orders) => {
    // let url = `${apiHost}/api/Orders/GetOrdersByUserId?UserId=${uid}`;
    // axios
    //   .get(url, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     },
    //   })
    //   .then((response) => {
    let expiringOrders = [];
    orders.forEach((doc) => {
      let date = new Date(doc.untilGoodDate.split("T")[0]) <= new Date();
      doc.isExpire = date;
      if (
        doc.status != "completed" &&
        doc.status != "deleted" &&
        doc.inFinalize != true &&
        !doc.isExpire
      ) {
        expiringOrders.push(doc);
      }
    });

    expiringOrders.forEach((i) => {
      let ms3 = new Date().setDate(new Date().getDate() + 3);
      let ms2 = new Date().setDate(new Date().getDate() + 2);
      let ms1 = new Date().setDate(new Date().getDate() + 1);
      let date3 = new Date(ms3);
      let date2 = new Date(ms2);
      let date1 = new Date(ms1);

      if (new Date(i.untilGoodDate.split("T")[0]) < date1) {
        expiredOrderNotif(
          `Your order ${i.orderId} is about to expire within 1 day. Your order will be deleted.`
        );
      } else if (new Date(i.untilGoodDate.split("T")[0]) < date2) {
        expiredOrderNotif(
          `Your order ${i.orderId} is about to expire within 2 days. Your order will be deleted.`
        );
      } else if (new Date(i.untilGoodDate.split("T")[0]) < date3) {
        expiredOrderNotif(
          `Your order ${i.orderId} is about to expire within 3 days. Your order will be deleted.`
        );
      }
    });
    // })
  };

  const GetData = async () => {
    let activelist = [];
    let finalizelist = [];
    let holdlist = [];
    let completedlist = [];
    let expiredlist = [];
    let url = `${apiHost}/api/Orders/GetOrdersByUserId?UserId=${uid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        let tasklist = [];
        let count = 0;
        let activecount = 0;
        response.data.matchedOrders.forEach((doc) => {
          tasklist.push({
            ...doc,
          });
        });
        // GenerateExpiringOrderNotif(tasklist);
        tasklist.forEach((x) => {
          x.match = x.matchedCount > 0;
          let dd = new Date(x.untilGoodDate + "Z");
          // let date = new Date(dd.toLocaleString('en-US', { timeZone: sessionStorage.getItem("TimeZone") }));
          x.untilGoodDate = dd.toDateString();
          let isExpired = x.status == "expired";
          x.isExpire = isExpired;
          if (x.status == "active" && x.match === true && !x.isExpire) {
            count += 1;
          } else if (
            x.status == "active" &&
            x.matchedCount == 0 &&
            !x.isExpire
          ) {
            activecount += 1;
          }
          if (x.status == "active" && x.inFinalize == true) {
            finalizelist.push(x);
          } else if (
            x.status == "active" &&
            x.inFinalize == false &&
            !x.isExpire
          ) {
            activelist.push(x);
          } else if (x.status == "hold" && !x.isExpire) {
            holdlist.push(x);
          } else if (x.status == "completed" && !x.isExpire) {
            completedlist.push(x);
          } else if (x.isExpire && x.inFinalize == false) {
            expiredlist.push(x);
          }
        });

        setmatchCount(count);
        setactiveCount(activecount);
        setactivelist(activelist);
        setFinalizelist(finalizelist);
        setCompletedlist(completedlist);
        setExpiredlist(expiredlist);
        setHoldlist(holdlist);
        setIsFetch(true);
      })
      .catch((error) => {
        //console.log(error);
      });
  };
    const [showModal, setShowModal] = useState(false);
  
    const toggleContent = () => {
      setShowModal(true);
    };
  
    const hideModal = () => {
      setShowModal(false);
    };
  useEffect(() => {
    setcountmap(activelist.length);
  }, [activelist, holdlist, countmap]);

  useEffect(() => {
    if (isFetch == true) {
      if (activelist.length == 0 && finalizelist.length == 0) {
        //console.log(activelist.length, finalizelist.length);
        document.getElementById("heading").style.display = "none";
        document.getElementById("rate-date-time").style.display = "none";
      } else {
        document.getElementById("heading").style.display = "flex";
        document.getElementById("rate-date-time").style.display = "flex";
      }
    }
  }, [activelist, finalizelist]);

  return (
    <>
    <div id="orderFX1">
        <Modal
          show={showModal}
         onHide={hideModal}
          className="no-padding-modal infoModal custom-modal-position"
        >
          <Modal.Header style={{ backgroundColor: "#2995be", color: "white" }}>
            <Modal.Title style={{ lineHeight: "0" }}>
              Countries, Currencies & Bundles
            </Modal.Title>
           <div
              className="close-icon d-flex justify-content-end"
              style={{ height: "17px", cursor: "pointer" }}
            >
              <img src={close} alt="Close" onClick={hideModal} />
            </div>
          </Modal.Header>

          <Modal.Body>
            <div
              style={{ fontSize: "13px", background: "white", color: "grey" }}
            >
             <p className="mb-1">
                1) Countries selection has to be exact on Give & Take to show up
                the deals.
             </p>
             <p className="mt-1 mb-1">
               2) Bundles are made with exact Countries and
               one-matching-Currency. Try to square-off deals.
              </p>
              <p className="mt-1 mb-1">
                3) Create an offer if you don't have one already in that CITY.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="Web-OrderCom" style={{ marginTop: 77 }}>
        <audio id="notificationSound">
          <source src={notifsound} type="audio/wav" />
        </audio>
        <div className="dflex flex-column maxheight">
          {isloading ? (
            <div className="bgloading">
              <Loading />
            </div>
          ) : null}
          {isFetch && (
            <>
              <Container
                className="position-sticky py-4"
                style={{ top: "77px", zIndex: "999", background: "white" }}
              >
                <div style={{display:"flex",justifyContent:"space-between",gap:"80px"}}>
                <div
                  style={{ display:"flex",flex:2}}
                  // style={{ top: "77px", zIndex: "999", background: "white" }}
                >
                  <Col className="colsaprater mb-2">
                    <div
                      id="activebdr"
                      className="bdrfiltr"
                      onClick={() => {
                        setisIndex(false);
                        document.getElementById("matchbdr").className =
                          "bdrfiltr";
                        document.getElementById("finalizebdr").className =
                          "bdrfiltr";

                        document.getElementById("allbdr").className =
                          "bdrfiltr";
                        document.getElementById("activebdr").className =
                          "bdrfiltrclick";
                        document.getElementById("holdbdr").className =
                          "bdrfiltr";
                        document.getElementById("expiredbdr").className =
                          "bdrfiltr";
                        document.getElementById("completedbdr").className =
                          "bdrfiltr";
                        if (
                          activelist.length != 0 ||
                          finalizelist.length != 0
                        ) {
                          document.getElementById("heading").style.display =
                            "flex";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "flex";
                        } else {
                          document.getElementById("heading").style.display =
                            "none";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "none";
                        }
                        document.getElementById("active").style.display =
                          "block";
                        document.getElementById("matched").style.display =
                          "block";
                        document.getElementById("holdorder").style.display =
                          "none";
                        document.getElementById("expired").style.display =
                          "none";
                        document.getElementById("completed").style.display =
                          "none";
                        document.getElementById("finalize").style.display =
                          "block";
                      }}
                    >
                      <h6 style={{ fontSize: "13px" }}>
                        Active ({activelist.length + finalizelist.length})
                      </h6>
                    </div>
                  </Col>
                  <Col className="mb-2 ">
                    <div
                      id="matchbdr"
                      className="bdrfiltr"
                      onClick={() => {
                        setisIndex(false);
                        document.getElementById("matchbdr").className =
                          "bdrfiltrclick";
                        document.getElementById("finalizebdr").className =
                          "bdrfiltr";
                        document.getElementById("allbdr").className =
                          "bdrfiltr";
                        document.getElementById("activebdr").className =
                          "bdrfiltr";
                        document.getElementById("holdbdr").className =
                          "bdrfiltr";
                        document.getElementById("expiredbdr").className =
                          "bdrfiltr";
                        document.getElementById("completedbdr").className =
                          "bdrfiltr";

                        if (matchCount == 0) {
                          document.getElementById("heading").style.display =
                            "none";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "none";
                        } else {
                          document.getElementById("heading").style.display =
                            "flex";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "flex";
                        }
                        document.getElementById("active").style.display =
                          "none";
                        document.getElementById("matched").style.display =
                          "block";
                        document.getElementById("holdorder").style.display =
                          "none";
                        document.getElementById("expired").style.display =
                          "none";
                        document.getElementById("completed").style.display =
                          "none";
                        document.getElementById("finalize").style.display =
                          "block";
                      }}
                    >
                      <h6 style={{ fontSize: "13px" }}>
                        Matched ({matchCount})
                      </h6>
                    </div>
                  </Col>
                  <Col className="mb-2 ">
                    <div
                      id="finalizebdr"
                      className="bdrfiltr"
                      onClick={() => {
                        setisIndex(false);
                        document.getElementById("matchbdr").className =
                          "bdrfiltr";
                        document.getElementById("finalizebdr").className =
                          "bdrfiltrclick";
                        document.getElementById("allbdr").className =
                          "bdrfiltr";
                        document.getElementById("activebdr").className =
                          "bdrfiltr";
                        document.getElementById("holdbdr").className =
                          "bdrfiltr";
                        document.getElementById("expiredbdr").className =
                          "bdrfiltr";
                        document.getElementById("completedbdr").className =
                          "bdrfiltr";

                        if (finalizelist.length == 0) {
                          document.getElementById("heading").style.display =
                            "none";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "none";
                        } else {
                          document.getElementById("heading").style.display =
                            "flex";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "flex";
                        }
                        document.getElementById("active").style.display =
                          "none";
                        document.getElementById("matched").style.display =
                          "none";
                        document.getElementById("finalize").style.display =
                          "block";
                        document.getElementById("holdorder").style.display =
                          "none";
                        document.getElementById("expired").style.display =
                          "none";
                        document.getElementById("completed").style.display =
                          "none";
                      }}
                    >
                      <h6 style={{ fontSize: "13px" }}>
                        To Finalize ({finalizelist.length})
                      </h6>
                      <h6 style={{ fontSize: "9px" }}></h6>
                    </div>
                  </Col>

                  <Col className="mb-2 ">
                    <div
                      id="holdbdr"
                      className="bdrfiltr"
                      onClick={() => {
                        setisIndex(false);
                        document.getElementById("matchbdr").className =
                          "bdrfiltr";
                        document.getElementById("finalizebdr").className =
                          "bdrfiltr";
                        document.getElementById("allbdr").className =
                          "bdrfiltr";
                        document.getElementById("activebdr").className =
                          "bdrfiltr";
                        document.getElementById("holdbdr").className =
                          "bdrfiltrclick";
                        document.getElementById("expiredbdr").className =
                          "bdrfiltr";
                        document.getElementById("completedbdr").className =
                          "bdrfiltr";

                        if (holdlist.length == 0) {
                          document.getElementById("heading").style.display =
                            "none";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "none";
                        } else {
                          document.getElementById("heading").style.display =
                            "flex";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "flex";
                        }
                        document.getElementById("active").style.display =
                          "none";
                        document.getElementById("matched").style.display =
                          "none";
                        document.getElementById("holdorder").style.display =
                          "flex";
                        document.getElementById("expired").style.display =
                          "none";
                        document.getElementById("completed").style.display =
                          "none";
                        document.getElementById("finalize").style.display =
                          "none";
                      }}
                    >
                      <h6 style={{ fontSize: "13px" }}>
                        On-hold ({holdlist.length})
                      </h6>
                    </div>
                  </Col>
                  <Col className="mb-2 ">
                    <div
                      id="expiredbdr"
                      className="bdrfiltr"
                      onClick={() => {
                        setisIndex(false);
                        document.getElementById("matchbdr").className =
                          "bdrfiltr";
                        document.getElementById("finalizebdr").className =
                          "bdrfiltr";
                        document.getElementById("allbdr").className =
                          "bdrfiltr";
                        document.getElementById("activebdr").className =
                          "bdrfiltr";
                        document.getElementById("holdbdr").className =
                          "bdrfiltr";
                        document.getElementById("expiredbdr").className =
                          "bdrfiltrclick";
                        document.getElementById("completedbdr").className =
                          "bdrfiltr";

                        if (expiredlist.length == 0) {
                          document.getElementById("heading").style.display =
                            "none";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "none";
                        } else {
                          document.getElementById("heading").style.display =
                            "flex";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "flex";
                        }
                        document.getElementById("active").style.display =
                          "none";
                        document.getElementById("matched").style.display =
                          "none";
                        document.getElementById("holdorder").style.display =
                          "none";
                        document.getElementById("expired").style.display =
                          "flex";
                        document.getElementById("completed").style.display =
                          "none";
                        document.getElementById("finalize").style.display =
                          "none";
                      }}
                    >
                      <h6 style={{ fontSize: "13px" }}>
                        Expired ({expiredlist.length})
                      </h6>
                    </div>
                  </Col>
                  <Col className="colsaprater mb-2">
                    <div
                      id="completedbdr"
                      className="bdrfiltr"
                      onClick={() => {
                        setisIndex(false);
                        document.getElementById("matchbdr").className =
                          "bdrfiltr";
                        document.getElementById("finalizebdr").className =
                          "bdrfiltr";
                        document.getElementById("allbdr").className =
                          "bdrfiltr";
                        document.getElementById("activebdr").className =
                          "bdrfiltr";
                        document.getElementById("holdbdr").className =
                          "bdrfiltr";
                        document.getElementById("expiredbdr").className =
                          "bdrfiltr";
                        document.getElementById("completedbdr").className =
                          "bdrfiltrclick";

                        if (completedlist.length == 0) {
                          document.getElementById("heading").style.display =
                            "none";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "none";
                        } else {
                          document.getElementById("heading").style.display =
                            "flex";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "flex";
                        }
                        document.getElementById("active").style.display =
                          "none";
                        document.getElementById("matched").style.display =
                          "none";
                        document.getElementById("holdorder").style.display =
                          "none";
                        document.getElementById("expired").style.display =
                          "none";
                        document.getElementById("completed").style.display =
                          "flex";
                        document.getElementById("finalize").style.display =
                          "none";
                      }}
                    >
                      <h6 style={{ fontSize: "13px" }}>
                        Completed ({completedlist.length})
                      </h6>
                    </div>
                  </Col>
                  <Col className="mb-2 ">
                    <div
                      id="allbdr"
                      className="bdrfiltr"
                      onClick={() => {
                        setisIndex(true);
                        document.getElementById("matchbdr").className =
                          "bdrfiltr";
                        document.getElementById("finalizebdr").className =
                          "bdrfiltr";
                        document.getElementById("allbdr").className =
                          "bdrfiltrclick";
                        document.getElementById("activebdr").className =
                          "bdrfiltr";
                        document.getElementById("holdbdr").className =
                          "bdrfiltr";
                        document.getElementById("expiredbdr").className =
                          "bdrfiltr";
                        document.getElementById("completedbdr").className =
                          "bdrfiltr";

                        if (
                          completedlist.length > 0 ||
                          expiredlist.length > 0 ||
                          finalizelist.length > 0 ||
                          activelist.length > 0
                        ) {
                          document.getElementById("heading").style.display =
                            "flex";
                          document.getElementById(
                            "rate-date-time"
                          ).style.display = "flex";
                        }
                        document.getElementById("active").style.display =
                          "block";
                        document.getElementById("matched").style.display =
                          "block";
                        document.getElementById("holdorder").style.display =
                          "block";
                        document.getElementById("expired").style.display =
                          "block";
                        document.getElementById("completed").style.display =
                          "block";
                        document.getElementById("finalize").style.display =
                          "block";
                      }}
                    >
                      <h6 style={{ fontSize: "13px" }}>
                        All (
                        {activelist.length +
                          finalizelist.length +
                          holdlist.length +
                          expiredlist.length +
                          completedlist.length}
                        )
                      </h6>
                    </div>
                  </Col>
                </div>
                <div>
                  <AddIcon style={{color:"#2995be",cursor:"pointer"}} onClick={() => {
                      navigate(`/CreateOrder?ID=${uid}&t=${Date.now()}`);
                    }}/>
                  </div>
                </div>
                
              </Container>
              <div
          className="position-sticky"
            style={{
             marginTop: "-30px",
             marginLeft: "200px",
              zIndex: 9999
            }}
         >
            <a
              className="btn-option"
              style={{ textAlign: "center" }}
              onClick={toggleContent}
            >
              <img
                src={info}
                className="info"
                alt="logo"
                style={{
                  width: "30px",
                  filter:
                    "invert(33%) sepia(89%) saturate(5319%) hue-rotate(187deg)",
                }}             />
            </a>
          </div>
              <Row
                className="position-sticky centeritem"
                style={{ top: "154px",marginTop:"15px",zIndex:999}}
              >
                <Col md={6} id="heading" className="d-flex mt-1 position-fixed">
                  <div className="d-flex" style={{ width: "93.44%",backgroundColor:"white",zIndex:999 }}>
                    <Col md={4}>
                      <h4
                        className="txt_order relative"
                      >
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{ position: "absolute" ,zIndex:999}}
                            >
                              Sell
                            </Tooltip>
                          }
                          placement="top-start"
                        >
                          <span style={{ cursor: "default" ,whiteSpace:"nowrap",marginLeft:"11px"}}>You Give</span>
                        </OverlayTrigger>
                      </h4>
                    </Col>
                    <Col md={4}></Col>
                    <Col md={4} style={{ padding: "0px" }}>
                      <div style={{ padding: "0px" }}>
                        <h4 className="txt_order relative">
                          <OverlayTrigger
                            overlay={
                              <Tooltip
                                id="tooltip-disabled"
                                bsPrefix="custom-tooltip"
                                style={{ position: "absolute",zIndex:999 }}
                              >
                                Buy
                              </Tooltip>
                            }
                            placement="top-start"
                          >
                            <span
                            className="headingstyling"
                              style={{
                                cursor: "default",
                                whiteSpace: "nowrap",
                              }}
                            >
                              You Take
                            </span>
                          </OverlayTrigger>
                        </h4>
                      </div>
                    </Col>
                   
                  </div>
                </Col>
              </Row>


            </>
          )}
          <Row className="position-relative centeritem mt-4">
            <Col md={6}>
              {/* --------------------------------------Active Order----------------------- */}
              <Row id={"active"}>
                {activelist.length > 0
                  ? activelist.map((Task, key) =>
                      Task.match == true ? null : (
                        <div key={key}>
                          <Orders
                            // key={key}
                            Expired={Task.Expired}
                            GiveCurrencyInfo={Task.giveCurrencyInfo}
                            UntilGoodDate={Task.untilGoodDate}
                            Index={++Index}
                            isIndex={isIndex}
                            // setisloading={Task.setisloading()}
                            id={Task.orderId}
                            uid={Task.uid}
                            TakeCountry={Task.takeCountry}
                            TakeCity={Task.takeCity}
                            TakeThroughCash={Task.takeThroughCash}
                            TakeThroughBank={Task.takeThroughBank}
                            TakeAmmount={Task.takeAmount}
                            TakeCurrency={Task.takeCurrency}
                            TakeCurrencyInfo={Task.takeCurrencyInfo}
                            AdditionalAmmount={Task.AdditionalAmmount}
                            AdditionalInfo={Task.additionalInfo}
                            favBy={Task.favBy}
                            GiveCountry={Task.giveCountry}
                            GiveCity={Task.giveCity}
                            GiveSourceBank={Task.giveSourceBank}
                            GiveAmmount={Task.giveAmount}
                            GiveCurrency={Task.giveCurrency}
                            GiveSourceCash={Task.giveSourceCash}
                            GiveState={Task.giveState}
                            TakeState={Task.takeState}
                            TakeAssistance={Task.takeAssistance}
                            GiveAssistance={Task.giveAssistance}
                            status="Active"
                            classBtn={"activ-btn"}
                            classBdr={
                              props.Expired == true
                                ? "bdr-expired p-2"
                                : "bdr p-2"
                            }
                          />
                        </div>
                      )
                    )
                  : null}
              </Row>
              {/* --------------------------------------Matched Order----------------------- */}
              <Row id={"matched"}>
                {activelist.length > 0
                  ? activelist.map((Task, key) =>
                      Task.match == false ? null : (
                        <div key={key}>
                          <Orders
                            // key={key}

                            Expired={Task.Expired}
                            GiveCurrencyInfo={Task.giveCurrencyInfo}
                            UntilGoodDate={Task.untilGoodDate}
                            matchCount={Task.matchedCount}
                            activeCount={activeCount}
                            Index={++Index}
                            // setisloading={Task.setisloading()}
                            id={Task.orderId}
                            isIndex={isIndex}
                            uid={Task.uid}
                            TakeCountry={Task.takeCountry}
                            TakeCity={Task.takeCity}
                            TakeThroughCash={Task.takeThroughCash}
                            TakeThroughBank={Task.takeThroughBank}
                            TakeAmmount={Task.takeAmount}
                            TakeCurrency={Task.takeCurrency}
                            TakeCurrencyInfo={Task.takeCurrencyInfo}
                            AdditionalAmmount={Task.AdditionalAmmount}
                            AdditionalInfo={Task.additionalInfo}
                            favBy={Task.favBy}
                            GiveCountry={Task.giveCountry}
                            GiveCity={Task.giveCity}
                            GiveSourceBank={Task.giveSourceBank}
                            GiveAmmount={Task.giveAmount}
                            GiveCurrency={Task.giveCurrency}
                            GiveSourceCash={Task.giveSourceCash}
                            GiveState={Task.giveState}
                            TakeState={Task.takeState}
                            TakeAssistance={Task.takeAssistance}
                            GiveAssistance={Task.giveAssistance}
                            HighRisk={Task.highRisk}
                            status="Matched"
                            classBtn={"activ-btn"}
                            classBdr={
                              props.Expired == true
                                ? "bdr-expired p-2"
                                : "bdr p-2"
                            }
                          />
                        </div>
                      )
                    )
                  : null}
              </Row>
              {/* --------------------------------------Finalize Order----------------------- */}
              <Row id={"finalize"}>
                {finalizelist.length > 0
                  ? finalizelist.map((Task, key) => (
                      <div key={key}>
                        <Orders
                          // key={key}
                          Expired={Task.Expired}
                          GiveCurrencyInfo={Task.giveCurrencyInfo}
                          UntilGoodDate={Task.untilGoodDate}
                          matchCount={Task.matchedCount}
                          activeCount={activeCount}
                          Index={++Index}
                          // setisloading={Task.setisloading()}
                          id={Task.orderId}
                          isIndex={isIndex}
                          uid={Task.uid}
                          TakeCountry={Task.takeCountry}
                          TakeCity={Task.takeCity}
                          TakeThroughCash={Task.takeThroughCash}
                          TakeThroughBank={Task.takeThroughBank}
                          TakeAmmount={Task.takeAmount}
                          TakeCurrency={Task.takeCurrency}
                          TakeCurrencyInfo={Task.takeCurrencyInfo}
                          AdditionalAmmount={Task.AdditionalAmmount}
                          AdditionalInfo={Task.additionalInfo}
                          favBy={Task.favBy}
                          GiveCountry={Task.giveCountry}
                          GiveCity={Task.giveCity}
                          GiveSourceBank={Task.giveSourceBank}
                          GiveAmmount={Task.giveAmount}
                          GiveCurrency={Task.giveCurrency}
                          GiveSourceCash={Task.giveSourceCash}
                          GiveState={Task.giveState}
                          TakeAssistance={Task.takeAssistance}
                          GiveAssistance={Task.giveAssistance}
                            TakeState={Task.takeState}
                          status="InFinalize"
                          classBtn={"activ-btn"}
                          classBdr={
                            props.Expired == true
                              ? "bdr-expired p-2"
                              : "bdr p-2"
                          }
                        />
                      </div>
                    ))
                  : null}
              </Row>
              {/* --------------------------------------Hold Order----------------------- */}
              <Row id={"holdorder"}>
                {holdlist.length > 0
                  ? holdlist.map((Task, key) => (
                      <div key={key}>
                        <Orders
                          // key={key}
                          Expired={Task.Expired}
                          GiveCurrencyInfo={Task.giveCurrencyInfo}
                          UntilGoodDate={Task.untilGoodDate}
                          Index={++Index}
                          // setisloading={Task.setisloading()}
                          id={Task.orderId}
                          isIndex={isIndex}
                          uid={Task.uid}
                          TakeCountry={Task.takeCountry}
                          TakeCity={Task.takeCity}
                          TakeThroughCash={Task.takeThroughCash}
                          TakeThroughBank={Task.takeThroughBank}
                          TakeAmmount={Task.takeAmount}
                          TakeCurrency={Task.takeCurrency}
                          TakeCurrencyInfo={Task.takeCurrencyInfo}
                          AdditionalAmmount={Task.AdditionalAmmount}
                          AdditionalInfo={Task.additionalInfo}
                          favBy={Task.favBy}
                          GiveCountry={Task.giveCountry}
                          GiveCity={Task.giveCity}
                          GiveSourceBank={Task.giveSourceBank}
                          GiveAmmount={Task.giveAmount}
                          GiveCurrency={Task.giveCurrency}
                          GiveSourceCash={Task.giveSourceCash}
                          GiveState={Task.giveState}
                            TakeState={Task.takeState}
                            TakeAssistance={Task.takeAssistance}
                            GiveAssistance={Task.giveAssistance}
                          status="Hold"
                          classBtn="hold-btn"
                          classBdr={"bdr-hold bdr p-2"}
                        />
                      </div>
                    ))
                  : null}
              </Row>
              {/* --------------------------------------Expired Order----------------------- */}
              <Row id={"expired"}>
                {expiredlist.length > 0
                  ? expiredlist.map((Task, key) => (
                      <div key={key}>
                        <Orders
                          // key={key}
                          Expired={Task.Expired}
                          GiveCurrencyInfo={Task.giveCurrencyInfo}
                          UntilGoodDate={Task.untilGoodDate}
                          Index={++Index}
                          // setisloading={Task.setisloading()}
                          id={Task.orderId}
                          isIndex={isIndex}
                          uid={Task.uid}
                          TakeCountry={Task.takeCountry}
                          TakeCity={Task.takeCity}
                          TakeThroughCash={Task.takeThroughCash}
                          TakeThroughBank={Task.takeThroughBank}
                          TakeAmmount={Task.takeAmount}
                          TakeCurrency={Task.takeCurrency}
                          TakeCurrencyInfo={Task.takeCurrencyInfo}
                          AdditionalAmmount={Task.AdditionalAmmount}
                          AdditionalInfo={Task.additionalInfo}
                          favBy={Task.favBy}
                          GiveCountry={Task.giveCountry}
                          GiveCity={Task.giveCity}
                          GiveSourceBank={Task.giveSourceBank}
                          GiveAmmount={Task.giveAmount}
                          GiveCurrency={Task.giveCurrency}
                          GiveSourceCash={Task.giveSourceCash}
                          GiveState={Task.giveState}
                            TakeState={Task.takeState}
                            TakeAssistance={Task.takeAssistance}
                            GiveAssistance={Task.giveAssistance}
                          status="Expired"
                          classBtn="expired-btn"
                          classBdr={"bdr-expired bdr p-2"}
                        />
                      </div>
                    ))
                  : null}
              </Row>
              {/*--------------------------------------Completed Order-----------------------  */}
              <Row id={"completed"}>
                {completedlist.length > 0
                  ? completedlist.map((Task, key) => (
                      <div key={key}>
                        <Orders
                          // key={key}
                          Expired={Task.Expired}
                          GiveCurrencyInfo={Task.giveCurrencyInfo}
                          UntilGoodDate={Task.untilGoodDate}
                          Index={++Index}
                          // setisloading={Task.setisloading()}
                          id={Task.orderId}
                          isIndex={isIndex}
                          uid={Task.uid}
                          TakeCountry={Task.takeCountry}
                          TakeCity={Task.takeCity}
                          TakeThroughCash={Task.takeThroughCash}
                          TakeThroughBank={Task.takeThroughBank}
                          TakeAmmount={Task.takeAmount}
                          TakeCurrency={Task.takeCurrency}
                          TakeCurrencyInfo={Task.takeCurrencyInfo}
                          AdditionalAmmount={Task.AdditionalAmmount}
                          AdditionalInfo={Task.additionalInfo}
                          favBy={Task.favBy}
                          GiveCountry={Task.giveCountry}
                          GiveCity={Task.giveCity}
                          GiveSourceBank={Task.giveSourceBank}
                          GiveAmmount={Task.giveAmount}
                          GiveCurrency={Task.giveCurrency}
                          GiveSourceCash={Task.giveSourceCash}
                          GiveState={Task.giveState}
                            TakeState={Task.takeState}
                            TakeAssistance={Task.takeAssistance}
                            GiveAssistance={Task.giveAssistance}
                          status="Completed"
                          classBtn="completed-btn"
                          classBdr={"bdr-completed bdr p-2"}
                        />
                      </div>
                    ))
                  : null}
              </Row>
            </Col>
            {isFetch && (
              <Row
                style={{ display: "flex", justifyContent: "center" }}
                className="mt-3"
              >
                <Col style={{ textAlign: "center" }} md={5}>
                  <Button
                    variant="primary"
                    style={{ textTransform: "inherit" }}
                    onClick={() => {
                      navigate(`/CreateOrder?ID=${uid}&t=${Date.now()}`);
                    }}
                  >
                    <img
                      style={{ marginRight: 10, color: "#fff" }}
                      src={add}
                      className="info"
                      alt="logo"
                    />
                    Create an Order
                  </Button>
                </Col>
              </Row>
            )}
          </Row>
        </div>
        {isFetch && (
          <div className="container Rate-Date-Time">
            <div id="rate-date-time">
              The FX rates are as of:
              <span style={{ color: "#909090" }}>
                {" "}
                &nbsp;&nbsp; <i> {date} </i>
              </span>
              {/* &nbsp;&nbsp; Time : &nbsp; */}
              <span style={{ color: "#909090" }}>
                &nbsp;&nbsp; <i> {time} </i>
              </span>
            </div>
          </div>
        )}
        {/* <footer className="mt-auto">
        </footer> */}
      </div>
      {/* ----------------------MObile View------------------------ */}
      <div className="Mobile-OrderCom">
        <OrderCom_Mobile />
      </div>
    </>
  );
};

export default OrderCom;
