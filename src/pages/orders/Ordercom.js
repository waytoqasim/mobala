import axios from "axios";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShimmerBadge, ShimmerButton, ShimmerThumbnail } from "react-shimmer-effects";
import APIURLS from "../../apiurls";
import "../../App.css";
import add from "../../asstes/add.svg";
import notifsound from "../../asstes/notif.wav";
import OrderCom_Mobile from "../../components/mobileordercom/Mobile Ordercom";
import FilterTabs from "../../components/order/filterTabs";
import OrderList from "../../components/order/orderList";
import { AppContext } from "../../Context";
import { apiHost } from "../../Helper";
import { apiInterceptor } from "../../service/ApiService";
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

  

  useEffect(() => {
    setisloading(true);
    GetData();
    if (isFetch == true) {
      document.getElementById("activebdr").className = "bdrfiltrclick";
      document.getElementById("allbdr").className = "bdrfiltr";
      document.getElementById("holdorder").style.display = "none";
      document.getElementById("expired").style.display = "none";
      document.getElementById("completed").style.display = "none";
    }
  }, [uid, isFetch]);

 

  const GetData = async () => {
    let activelist = [];
    let finalizelist = [];
    let holdlist = [];
    let completedlist = [];
    let expiredlist = [];
    let url = `${apiHost}/api/Orders/GetOrdersByUserId?UserId=${uid}`;
    apiInterceptor.get(APIURLS.ORDERS.GETORDERDATA(uid))
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
        setisloading(false);
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
      <div className="Web-OrderCom" style={{ marginTop: 77 }}>
        <audio id="notificationSound">
          <source src={notifsound} type="audio/wav" />
        </audio>
        <div className="dflex flex-column maxheight">
          {isloading ?
            (
              <div className="container mt-4">
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <ShimmerButton size="sm" />
                  <ShimmerButton size="sm" />
                  <ShimmerButton size="sm" />
                  <ShimmerButton size="sm" />
                  <ShimmerButton size="sm" />
                  <ShimmerButton size="sm" />
                  <ShimmerButton size="sm" />
                </div>
                <div className="py-3 position-relative centeritem mt-4 row">
                  <div className="col-md-8">
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                      <ShimmerBadge width={200} />
                      <ShimmerBadge width={200} />
                    </div>
                    <div style={{ paddingBlock: "10px" }}>
                      <ShimmerThumbnail height={100} width={1000} className="m-0" rounded />
                      <ShimmerBadge width={100} />
                    </div>
                    <div style={{ paddingBlock: "10px" }}>
                      <ShimmerThumbnail height={100} width={1000} className="m-0" rounded />
                      <ShimmerBadge width={100} />
                    </div>
                    <div style={{ paddingBlock: "10px" }}>
                      <ShimmerThumbnail height={100} width={1000} className="m-0" rounded />
                      <ShimmerBadge width={100} />
                    </div>
                    <div style={{ paddingBlock: "10px" }}>
                      <ShimmerThumbnail height={100} width={1000} className="m-0" rounded />
                      <ShimmerBadge width={100} />
                    </div>
                    <div style={{ paddingBlock: "10px" }}>
                      <ShimmerThumbnail height={100} width={1000} className="m-0" rounded />
                      <ShimmerBadge width={100} />
                    </div>


                  </div>
                </div>
                
              </div>
            ) : null}
          {isFetch && (
            <>
              <FilterTabs
                activelist={activelist}
                matchCount={matchCount}
                finalizelist={finalizelist}
                holdlist={holdlist}
                expiredlist={expiredlist}
                completedlist={completedlist}
                setisIndex={(value)=>{setisIndex(value)}}
              />
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
            <OrderList
              activelist={activelist}
              finalizelist={finalizelist}
              holdlist={holdlist}
              expiredlist={expiredlist}
              completedlist={completedlist}
              activeCount={activeCount}
              isIndex={isIndex}
              Index={Index}
              props={props}
            />
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
