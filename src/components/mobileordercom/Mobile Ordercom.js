import axios from "axios";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import add from "../../asstes/add.svg";
import { AppContext } from "../../Context";
import { addDoc, apiHost } from "../../Helper";
import { Orders } from "../../pages/ordersmobile/OrdersMobile";
import SignalRService from "../../SignalR";

export let orderNumber = -1;

const MobileOrderCom = (props) => {
  const [activelist, setactivelist] = useState([]);
  const [holdlist, setHoldlist] = useState([]);
  const [expiredlist, setExpiredlist] = useState([]);
  const [completedlist, setCompletedlist] = useState([]);
  const [matchlist, setMatchlist] = useState([]);
  const [finalizelist, setFinalizelist] = useState([]);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [countmap, setcountmap] = useState("");
  const [isloading, setisloading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [matchCount, setmatchCount] = useState(0);
  const [activeCount, setactiveCount] = useState(0);
  const [numbers, setNumbers] = useState({});
  const [isIndex, setisIndex] = useState(false);
  const [localTime, setLocalTime] = useState();
  const [isFetch, setIsFetch] = useState(false);
  const navigate = useNavigate();
  let Index = 0;
  let OBJ = {};
  const context = useContext(AppContext);

  useEffect(() => {
    //console.log(context.applicationStore.matchOrder)
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
  }, [null]);
  useEffect(() => {
    sessionStorage.setItem("previousPathName", window.location.pathname);
  }, [null]);

  useEffect(() => {
    //console.log(uid)
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
      setLocalTime(hour + ":" + minute + ":" + second + "\n" + localDate);
    }, 1000);
  },[null]);

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
      sentToId: uid
    });
    SignalRService.sendNotification(uid, data, "orderexpiry");
  };

  // useEffect(() => {
  //   setUID(window.location.search.split("&")[0].split("=")[1]);
  // }, [null]);
  useEffect(() => {
    if (isFetch == true) {
      document.getElementById("activebdr-mobile").className = "bdrfiltrclick";
      document.getElementById("allbdr-mobile").className = "bdrfiltr";
      document.getElementById("holdorder-mobile").style.display = "none";
      document.getElementById("expired-mobile").style.display = "none";
      document.getElementById("completed-mobile").style.display = "none";
    }
    GetData();
  }, [uid, isFetch]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////

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

  useEffect(() => {
    setcountmap(activelist.length);
  }, [activelist, holdlist, countmap]);

  useEffect(() => {
    if (isFetch == true) {
      if (activelist.length == 0 && finalizelist.length == 0) {
        document.getElementById("heading").style.display = "none";
        document.getElementById("rate-date-time").style.display = "none";
      } else {
        document.getElementById("heading").style.display = "flex";
        document.getElementById("rate-date-time").style.display = "flex";
      }
    }
  }, [activelist, finalizelist]);
  return (
    <div className="d-flex flex-column min-vh-100">
      {isFetch && (
        <>
          <div>
            <Container style={{ marginTop: "85px" }}>
              <div className="mt-4 scrool">
                <Col className="colsaprater mb-2">
                  <div
                    id="activebdr-mobile"
                    className="bdrfiltr"
                    onClick={() => {
                      document.getElementById("matchbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("finalizebdr-mobile").className =
                        "bdrfiltr";

                      document.getElementById("allbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("activebdr-mobile").className =
                        "bdrfiltrclick";
                      document.getElementById("holdbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("expiredbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("completedbdr-mobile").className =
                        "bdrfiltr";
                      if (activelist.length == 0) {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "none";
                      } else {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "flex";
                      }
                      document.getElementById("active-mobile").style.display =
                        "block";
                      document.getElementById("matched-mobile").style.display =
                        "block";
                      document.getElementById(
                        "holdorder-mobile"
                      ).style.display = "none";
                      document.getElementById("expired-mobile").style.display =
                        "none";
                      document.getElementById(
                        "completed-mobile"
                      ).style.display = "none";
                      document.getElementById("finalize-mobile").style.display =
                        "block";
                    }}
                  >
                    <h6>Active ({activelist.length + finalizelist.length})</h6>
                  </div>
                </Col>
                <Col className="mb-2">
                  <div
                    id="matchbdr-mobile"
                    className="bdrfiltr"
                    onClick={() => {
                      document.getElementById("matchbdr-mobile").className =
                        "bdrfiltrclick";
                      document.getElementById("finalizebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("allbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("activebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("holdbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("expiredbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("completedbdr-mobile").className =
                        "bdrfiltr";
                      let count = 0;
                      activelist.forEach((d) => {
                        if (d.match == false) {
                          count++;
                        }
                      });
                      if (count == 0) {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "none";
                      } else {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "flex";
                      }
                      document.getElementById("active-mobile").style.display =
                        "none";
                      document.getElementById("matched-mobile").style.display =
                        "block";
                      document.getElementById(
                        "holdorder-mobile"
                      ).style.display = "none";
                      document.getElementById("expired-mobile").style.display =
                        "none";
                      document.getElementById(
                        "completed-mobile"
                      ).style.display = "none";
                      document.getElementById("finalize-mobile").style.display =
                        "block";
                    }}
                  >
                    <h6>Matched ({matchCount})</h6>
                  </div>
                </Col>
                <Col className="mb-2">
                  <div
                    id="finalizebdr-mobile"
                    className="bdrfiltr"
                    onClick={() => {
                      document.getElementById("matchbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("finalizebdr-mobile").className =
                        "bdrfiltrclick";
                      document.getElementById("allbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("activebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("holdbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("expiredbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("completedbdr-mobile").className =
                        "bdrfiltr";

                      if (finalizelist.length == 0) {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "none";
                      } else {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "flex";
                      }
                      document.getElementById("active-mobile").style.display =
                        "none";
                      document.getElementById("matched-mobile").style.display =
                        "none";
                      document.getElementById("finalize-mobile").style.display =
                        "block";
                      document.getElementById(
                        "holdorder-mobile"
                      ).style.display = "none";
                      document.getElementById("expired-mobile").style.display =
                        "none";
                      document.getElementById(
                        "completed-mobile"
                      ).style.display = "none";
                    }}
                  >
                    <h6>To Finalize ({finalizelist.length})</h6>
                  </div>
                </Col>
                <Col className="mb-2">
                  <div
                    id="holdbdr-mobile"
                    className="bdrfiltr"
                    onClick={() => {
                      document.getElementById("matchbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("finalizebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("allbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("activebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("holdbdr-mobile").className =
                        "bdrfiltrclick";
                      document.getElementById("expiredbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("completedbdr-mobile").className =
                        "bdrfiltr";

                      if (holdlist.length == 0) {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "none";
                      } else {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "flex";
                      }
                      document.getElementById("active-mobile").style.display =
                        "none";
                      document.getElementById("matched-mobile").style.display =
                        "none";
                      document.getElementById(
                        "holdorder-mobile"
                      ).style.display = "flex";
                      document.getElementById("expired-mobile").style.display =
                        "none";
                      document.getElementById(
                        "completed-mobile"
                      ).style.display = "none";
                      document.getElementById("finalize-mobile").style.display =
                        "none";
                    }}
                  >
                    <h6>Onhold ({holdlist.length})</h6>
                  </div>
                </Col>
                <Col className="mb-2">
                  <div
                    id="expiredbdr-mobile"
                    className="bdrfiltr"
                    onClick={() => {
                      document.getElementById("matchbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("finalizebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("allbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("activebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("holdbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("expiredbdr-mobile").className =
                        "bdrfiltrclick";
                      document.getElementById("completedbdr-mobile").className =
                        "bdrfiltr";

                      if (expiredlist.length == 0) {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "none";
                      } else {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "flex";
                      }
                      document.getElementById("active-mobile").style.display =
                        "none";
                      document.getElementById("matched-mobile").style.display =
                        "none";
                      document.getElementById(
                        "holdorder-mobile"
                      ).style.display = "none";
                      document.getElementById("expired-mobile").style.display =
                        "flex";
                      document.getElementById(
                        "completed-mobile"
                      ).style.display = "none";
                      document.getElementById("finalize-mobile").style.display =
                        "none";
                    }}
                  >
                    <h6>Expired ({expiredlist.length})</h6>
                  </div>
                </Col>
                <Col className="colsaprater mb-2">
                  <div
                    id="completedbdr-mobile"
                    className="bdrfiltr"
                    onClick={() => {
                      document.getElementById("matchbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("finalizebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("allbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("activebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("holdbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("expiredbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("completedbdr-mobile").className =
                        "bdrfiltrclick";

                      if (completedlist.length == 0) {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "none";
                      } else {
                        document.getElementById(
                          "heading-mobile"
                        ).style.display = "flex";
                      }
                      document.getElementById("active-mobile").style.display =
                        "none";
                      document.getElementById("matched-mobile").style.display =
                        "none";
                      document.getElementById(
                        "holdorder-mobile"
                      ).style.display = "none";
                      document.getElementById("expired-mobile").style.display =
                        "none";
                      document.getElementById(
                        "completed-mobile"
                      ).style.display = "flex";
                      document.getElementById("finalize-mobile").style.display =
                        "none";
                    }}
                  >
                    <h6>Completed ({completedlist.length})</h6>
                  </div>
                </Col>
                <Col className="mb-2">
                  <div
                    id="allbdr-mobile"
                    className="bdrfiltr"
                    onClick={() => {
                      document.getElementById("matchbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("finalizebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("allbdr-mobile").className =
                        "bdrfiltrclick";
                      document.getElementById("activebdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("holdbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("expiredbdr-mobile").className =
                        "bdrfiltr";
                      document.getElementById("completedbdr-mobile").className =
                        "bdrfiltr";

                      document.getElementById("active-mobile").style.display =
                        "block";
                      document.getElementById("matched-mobile").style.display =
                        "block";
                      document.getElementById(
                        "holdorder-mobile"
                      ).style.display = "block";
                      document.getElementById("expired-mobile").style.display =
                        "block";
                      document.getElementById(
                        "completed-mobile"
                      ).style.display = "block";
                      document.getElementById("finalize-mobile").style.display =
                        "block";
                    }}
                  >
                    <h6>
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
              <Row className="centeritem">
                <Col md={8}>
                  <Row
                    id="heading-mobile"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    className="mt-3"
                  >
                    <div>
                      <Row
                        className="mt-3"
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Row>
                          <Col md={10} style={{ width: "91.33%" }}>
                            <Row
                              className="p-2"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Col>
                                <div
                                  style={{ padding: "0px", cursor: "pointer" }}
                                >
                                  <h4 className="relative">
                                    <OverlayTrigger
                                      overlay={
                                        <Tooltip id="tooltip-disabled"  bsPrefix="custom-tooltip"
                                        style={{ position: "absolute",zIndex:999 }}>
                                          Sell
                                        </Tooltip>
                                      }
                                      placement="top-start"
                                    >
                                      <h4>You Give</h4>
                                    </OverlayTrigger>
                                  </h4>
                                </div>
                              </Col>
                              <Col style={{ padding: "0px" }}></Col>
                              <Col>
                                <div
                                  style={{ padding: "0px", cursor: "pointer" }}
                                >
                                  <h4 className="relative">
                                    <OverlayTrigger
                                      overlay={
                                        <Tooltip id="tooltip-disabled"  bsPrefix="custom-tooltip"
                                        style={{ position: "absolute" ,zIndex:999}}>
                                          Buy
                                        </Tooltip>
                                      }
                                      placement="top-start"
                                    >
                                      <h4>You Take</h4>
                                    </OverlayTrigger>
                                  </h4>
                                </div>
                              </Col>
                              <Col
                                style={{
                                  position: "absolute",
                                  display: "contents",
                                }}
                              >
                                <div>
                                  <Row
                                    style={{
                                      zIndex: 9999,
                                      textAlign: "center",
                                    }}
                                  >
                                    <div className="dropdown">
                                      <h1
                                        style={{
                                          textDecoration: "none",
                                          visibility: "hidden",
                                        }}
                                      >
                                        <span className="threedots"></span>
                                      </h1>
                                    </div>
                                  </Row>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Row>
                    </div>
                    {/* <Col className="Giveheading">
                      <h6
                        style={{ fontSize: "19px" }}
                        className="heading_order"
                      >
                        You Give
                      </h6>
                    </Col>
                    <Col></Col>

                    <Col className="takeheading">
                      <h6
                        style={{ fontSize: "19px", paddingLeft: "4.5vw" }}
                        className="heading_order"
                      >
                        You Take
                      </h6>
                    </Col> */}
                  </Row>

                  {/* --------------------------------------Active Order----------------------- */}
                  <Row id={"active-mobile"}>
                    {activelist.length > 0
                      ? activelist.map((Task, key) =>
                          Task.match == true ? null : (
                            <div key={key}>
                              <Orders
                                // key={key}
                                Expired={Task.expired}
                                GiveCurrencyInfo={Task.giveCurrencyInfo}
                                UntilGoodDate={Task.untilGoodDate}
                                Index={++Index}
                                isIndex={isIndex}
                                id={Task.orderId}
                                uid={Task.uid}
                                numbers={numbers}
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

                              <hr className="my-2" />
                            </div>
                          )
                        )
                      : null}
                  </Row>
                  {/* --------------------------------------Matched Order----------------------- */}
                  <Row id={"matched-mobile"}>
                    {activelist.length > 0
                      ? activelist.map((Task, key) =>
                          Task.match == false ? null : (
                            <div key={key}>
                              <Orders
                                // key={key}
                                numbers={numbers}
                                Expired={Task.expired}
                                GiveCurrencyInfo={Task.giveCurrencyInfo}
                                UntilGoodDate={Task.untilGoodDate}
                                activeCount={Task.matchedCount}
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
                                status="Matched"
                                classBtn={"activ-btn"}
                                classBdr={
                                  props.Expired == true
                                    ? "bdr-expired p-2"
                                    : "bdr p-2"
                                }
                              />
                              <hr className="my-2" />
                            </div>
                          )
                        )
                      : null}
                  </Row>
                  {/* --------------------------------------Finalize Order----------------------- */}
                  <Row id={"finalize-mobile"}>
                    {finalizelist.length > 0
                      ? finalizelist.map((Task, key) => (
                          <div key={key}>
                            <Orders
                              // key={key}
                              Expired={Task.expired}
                              numbers={numbers}
                              GiveCurrencyInfo={Task.giveCurrencyInfo}
                              UntilGoodDate={Task.untilGoodDate}
                              activeCount={Task.matchedCount}
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
                              status="InFinalize"
                              classBtn={"activ-btn"}
                              classBdr={
                                props.Expired == true
                                  ? "bdr-expired p-2"
                                  : "bdr p-2"
                              }
                            />
                            <hr className="my-2" />
                          </div>
                        ))
                      : null}
                  </Row>
                  {/* --------------------------------------Hold Order----------------------- */}
                  <Row id={"holdorder-mobile"}>
                    {holdlist.length > 0
                      ? holdlist.map((Task, key) => (
                          <div key={key}>
                            <Orders
                              // key={key}
                              Expired={Task.expired}
                              numbers={numbers}
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
                            <hr className="my-2" />
                          </div>
                        ))
                      : null}
                  </Row>
                  {/* --------------------------------------Expired Order----------------------- */}
                  <Row id={"expired-mobile"}>
                    {expiredlist.length > 0
                      ? expiredlist.map((Task, key) => (
                          <div key={key}>
                            <Orders
                              // key={key}
                              Expired={Task.expired}
                              numbers={numbers}
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
                            <hr className="my-2" />
                          </div>
                        ))
                      : null}
                  </Row>
                  {/*--------------------------------------Completed Order-----------------------  */}
                  <Row id={"completed-mobile"}>
                    {completedlist.length > 0
                      ? completedlist.map((Task, key) => (
                          <div key={key}>
                            <Orders
                              // key={key}
                              Expired={Task.expired}
                              numbers={numbers}
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
                            <hr className="my-2" />
                          </div>
                        ))
                      : null}
                  </Row>
                </Col>
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
                        style={{ marginRight: 10 }}
                        src={add}
                        className="info"
                        alt="logo"
                      />
                      Create an order
                    </Button>
                  </Col>
                </Row>
              </Row>
            </Container>
          </div>
          <footer className="mt-auto" style={{whiteSpace:"nowrap"}}>
            <div
              id="rate-date-time"
              className="container Rate-Date-Time txt_order"
            >
              The FX rates are as of:
              <span style={{ color: "#909090" }}>&nbsp; </span>
              {/* &nbsp;&nbsp; Date :&nbsp; */}
              <span style={{ color: "#909090" }}>
                {" "}
                <i> {date} </i>{" "}
              </span>
              {/*&nbsp; Time : &nbsp; */}
              <span style={{ color: "#909090" }}>
                &nbsp;&nbsp;
                <i> {time} </i>
              </span>
            </div>
            {/*<Footer />*/}
          </footer>
        </>
      )}
    </div>
  );
};

export default MobileOrderCom;
