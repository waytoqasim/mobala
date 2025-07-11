import MoreVertIcon from "@mui/icons-material/MoreVert";
import $ from "jquery";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Row, Tab, Tabs } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { ShimmerBadge, ShimmerThumbnail } from "react-shimmer-effects";
import APIURLS from "../../apiurls";
import "../../App.css";
import Arrow from "../../asstes/arrowenter.svg";
import Scrollarrow from "../../asstes/Arrowscrooler.png";
import AllMatches from "../../components/matches/All_Matches";
import Matches from "../../components/matches/NewMatches";
import { AppContext } from "../../Context";
import { apiHost } from "../../Helper";
import { apiInterceptor } from "../../service/ApiService";


const Match_Tab = (props) => {
  const [key, setKey] = useState("All");
  const [orderslist, setorderlist] = useState([]);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [isLoading, setIsLoading] = useState(true);
  const [userCity, setuserCity] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [navigateOrder, setNavigateOrder] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [checkedNewOrders, setCheckedNewOrders] = useState(false);
  const [checkedOrdersByActivity, setCheckedOrdersByActivity] = useState(false);

  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;


  const indexOfLastPost = currentPage * postsPerPage;
  // calculating first post index
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = matchList.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(matchList.length / postsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const context = useContext(AppContext);

  useEffect(() => {
    document.getElementById("root").scrollTop = 0;
  }, [currentPage]);

  useEffect(() => {
    if (window.location.search.includes("OrderId")) {
      // console.log(window.location.search.split("=")[2]);
      setKey(window.location.search.split("=")[2].replace("&t", ""));
    }
  }, []);

  useEffect(() => {
    if (context.applicationStore.matchOrder != undefined) {
      let order = context.applicationStore.matchOrder;
      let matchlist = [...matchList];
      orderslist.forEach((d, i) => {
        if (
          d.takeCurrency == order.giveCurrency &&
          order.takeCurrency == d.giveCurrency
        ) {
          order["inviteStatus"] = "None";
          order["selfDocId"] = d.orderId;
          order["invited"] = false;
          order["inFinalize"] = false;
          order["isFavorite"] = false;
          order["giveCityLatLon"] = JSON.stringify(order["giveCityLatLon"]);
          order["takeCityLatLon"] = JSON.stringify(order["takeCityLatLon"]);
          matchlist.push(order);
        }
      });
      setMatchList(matchlist);
    }
  }, [context.applicationStore.matchOrder]);

  useEffect(() => {
    sessionStorage.setItem("previousPathName", window.location.pathname);
  }, [matchList, Navigate]);

  useEffect(() => {
    setOnlineUsers(context.applicationStore.OnlineUsers);
  }, [context.applicationStore.OnlineUsers]);

  useEffect(() => {
    if (context.applicationStore.notificationMessage != undefined) {
      if (
        context.applicationStore.notificationMessage.heading == "invite" ||
        "acceptinvite" ||
        "rejectinvite"
      ) {
        getData();
      }
    }
  }, [context.applicationStore.notificationMessage]);

  useEffect(() => {
    if (context.applicationStore.Invite != undefined) {
      getData();
    }
  }, [context.applicationStore.Invite]);
  useEffect(() => {
    // if(localStorage.getItem("matchesOrder")==="DefaulMatches")
    // {
    // }
    // else{
    //   sortOrdersByTimeCreated()
    // }
    if (localStorage.getItem("matchesOrder") === "DefaulMatches") {
      GetOrders();
    } else {
      GetOrdersByActivity()
    }

    getData();
  }, [null]);

  const GetOrders = async () => {
    let url = `${apiHost}/api/Orders/GetOrdersByUserId?UserId=${uid}`;
    apiInterceptor.get(APIURLS.ORDERS.GETORDERDATA(uid))
      .then((response) => {
        const tasklist = [];
        response.data.matchedOrders.forEach((doc) => {
          let dd = new Date(doc.untilGoodDate);
          let date = new Date(
            dd.toLocaleString("en-US", {
              timeZone: sessionStorage.getItem("TimeZone"),
            })
          );
          doc.untilGoodDate = date.toISOString();
          if (doc.inFinalize === false && doc.status == "active") {
            doc.match = doc.matchedCount > 0;
            if (doc.match) {
              tasklist.push({ ...doc });
            }
          }
        });
        response.data.matchedOrders.forEach((doc) => {
          let dd = new Date(doc.untilGoodDate);
          let date = new Date(
            dd.toLocaleString("en-US", {
              timeZone: sessionStorage.getItem("TimeZone"),
            })
          );
          doc.untilGoodDate = date.toISOString();
          if (doc.inFinalize === true && doc.status == "active") {
            doc.match = doc.matchedCount > 0;
            if (doc.match) {
              tasklist.push({ ...doc });
            }
          }
        });
        if (tasklist.length == 0) {
          setIsLoading(null);
        } else {
          setIsLoading(false);
        }
        // console.log("getorders",tasklist)
        setorderlist(tasklist);
        localStorage.setItem("matchesOrder", "DefaulMatches")
        //console.log("orderlist=>", tasklist)
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  const GetOrdersByActivity = async () => {
    let url = `${apiHost}/api/Orders/GetActivityOrdersByUserId?UserId=${uid}`;

    apiInterceptor.get(APIURLS.ORDERS.GETORDERSACTIVITYBYUSERID(uid))
      .then((response) => {
        const tasklist = [];
        response.data.matchedOrders.forEach((doc) => {
          let dd = new Date(doc.untilGoodDate);
          let date = new Date(
            dd.toLocaleString("en-US", {
              timeZone: sessionStorage.getItem("TimeZone"),
            })
          );
          doc.untilGoodDate = date.toISOString();
          if (doc.inFinalize === false && doc.status == "active") {
            doc.match = doc.matchedCount > 0;
            if (doc.match) {
              tasklist.push({ ...doc });
            }
          }
        });
        response.data.matchedOrders.forEach((doc) => {
          let dd = new Date(doc.untilGoodDate);
          let date = new Date(
            dd.toLocaleString("en-US", {
              timeZone: sessionStorage.getItem("TimeZone"),
            })
          );
          doc.untilGoodDate = date.toISOString();
          if (doc.inFinalize === true && doc.status == "active") {
            doc.match = doc.matchedCount > 0;
            if (doc.match) {
              tasklist.push({ ...doc });
            }
          }
        });
        if (tasklist.length == 0) {
          setIsLoading(null);
        } else {
          setIsLoading(false);
        }
        // console.log("activity",tasklist)

        setorderlist(tasklist);
        setCheckedOrdersByActivity(true);
        setCheckedNewOrders(false);
        localStorage.setItem("matchesOrder", "ActivityOrders")
        //console.log("orderlist=>", tasklist)
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const sortOrdersByTimeCreated = () => {
    // localStorage.setItem("matchesOrder","SortedMatches")
    const sortedOrders = [...orderslist].sort((a, b) => {
      return new Date(b.timeCreated) - new Date(a.timeCreated);
    });
    setorderlist(sortedOrders);
    setCheckedNewOrders(true);
    setCheckedOrdersByActivity(false);
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let url = `${apiHost}/api/User/GetUserById?UserId=${uid}`;

    apiInterceptor.get(APIURLS.USERS.USERBYID(uid))
      .then((response) => {
        setuserCity(response.data.City);
      })
      .catch((error) => {
        //console.log(error);
      });

  }, [uid]);

  function scrollLeft() {
    $(".nav-tabs").animate({ scrollLeft: 1500 }, 500);
  }

  function scrollRight() {
    $(".nav-tabs").animate({ scrollLeft: 0 }, 500);
  }
  const getData = () => {
    let url = `${apiHost}/api/Orders/GetMatchedOrders?userId=${uid}`;
    let orderList = [];
    let invitelist = [];

    apiInterceptor.get(APIURLS.ORDERS.GETMATCHEDORDERS(uid))
      .then((orders) => {
        orders.data.matchedOrders.forEach((orderData) => {
          let date = new Date(orderData.untilGoodDate.split("T")[0]);
          date = date.toDateString().split(" ");
          date = date[1] + " " + date[2] + ", " + date[3];
          orderData["untilGoodDate"] = date;
          if (orderData.invited != 1) {
            orderList.push({ ...orderData });
          } else {
            invitelist.push({ ...orderData });
          }
        });
        // console.log(orders.data.matchedOrders)
        setMatchList(orders.data.matchedOrders);

      });
  };
  // let tab1 = <img src={Arrow} style={tabStyle1} />;
  return (
    <div style={{ marginTop: 70 }}>
      <Row>
        <div>
          {isLoading ? (
            <div className="container">
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
          ) : isLoading == false ? (
            <>
              <div
                className="Arrowdiv position-fixed"
                style={{ top: "65px", zIndex: 6666 }}
              >
                <img
                  src={Scrollarrow}
                  alt=""
                  onClick={scrollRight}
                  className="arrowsrl"
                />
                <img
                  src={Scrollarrow}
                  alt=""
                  onClick={scrollLeft}
                  className="arrowsrl srlar2"
                />
              </div>

              <Tabs
                className="tabContent bgclr"
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                style={{ top: "70px", opacity: 0, zIndex: 999 }}
              >
                <Tab
                  className="tabContent "
                  key={"All"}
                  style={{ padding: "inherit", overflowX: "hidden" }}
                  eventKey={"All"}
                  title={<span style={{ marginLeft: 60 }}>All Orders</span>}
                >
                  <Row style={{}} key={key}>
                  </Row>
                </Tab>

              </Tabs>


              <Tabs
                className="tabContent bgclr position-fixed"
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                style={{ top: "70px", zIndex: 999 }}
              >
                <Tab
                  className="tabContent "
                  key={"All"}
                  style={{ padding: "inherit", overflowX: "hidden" }}
                  eventKey={"All"}
                  title={<span style={{ marginLeft: 60, display: "flex", alignItems: "center", fontSize: "15px" }}>All Orders
                    {
                      <div className="position-relative mr-2" style={{ zIndex: 9999 }} onClick={toggleDropdown} ref={dropdownRef}>
                        <MoreVertIcon />
                        {isOpen && (
                          <div className="position-absolute bg-gray border rounded shadow mt-2">
                            <ul className="list-unstyled p-2 m-0" style={{
                              position: "fixed",
                              width: "200px",
                              height: "100px",
                              borderRadius: "10px",
                              backgroundColor: "#e7e7e7"
                            }}>
                              <li
                                className="p-2 cursor-pointer"
                                style={{ color: 'black', whiteSpace: 'nowrap' }}
                                onClick={sortOrdersByTimeCreated}
                              >
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="checkbox1"
                                    checked={checkedNewOrders}
                                    onChange={() => {
                                      setCheckedNewOrders(!checkedNewOrders);
                                      setCheckedOrdersByActivity(false); // Uncheck the other checkbox
                                    }}
                                  />
                                  <label className="form-check-label" htmlFor="checkbox1">
                                    New orders first
                                  </label>
                                </div>
                              </li>
                              <li
                                className="p-2 cursor-pointer"
                                style={{ color: 'black', whiteSpace: 'nowrap' }}
                                onClick={GetOrdersByActivity}
                              >
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="checkbox2"
                                    checked={checkedOrdersByActivity}
                                    onChange={() => {
                                      setCheckedOrdersByActivity(!checkedOrdersByActivity);
                                      setCheckedNewOrders(false);
                                    }}
                                  />
                                  <label className="form-check-label" htmlFor="checkbox2">
                                    Orders by activity
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    }
                  </span>}
                >
                  <Row style={{}} key={key}>
                    <AllMatches
                      MatchList={currentPosts}
                      OnlineUsers={onlineUsers}
                      userCity={userCity}
                    />
                  </Row>
                </Tab>


                {orderslist.map((a, i) => (
                  <Tab
                    className="tabContent"
                    key={i}
                    id={a.orderId}
                    eventKey={a.orderId}
                    style={{ overflowX: "hidden" }}
                    title={
                      <span style={{ fontSize: "small", textAlign: "left" }}>
                        {a.giveCurrency} {a.giveAmount.toLocaleString()}{" "}
                        {a.giveCity} {","}{" "}
                        {a.giveCountryCode == null
                          ? a.giveCountry
                          : a.giveCountryCode}
                        <br></br>
                        <img alt="" src={Arrow} style={{ width: "52px" }} />
                        {a.takeCurrency} {a.takeAmount.toLocaleString()}{" "}
                        {a.takeCity}
                        {","}{" "}
                        {a.takeCountryCode == null
                          ? a.takeCountry
                          : a.takeCountryCode}
                      </span>
                    }

                  //  {Task.GiveCountry,Task.GiveAmmount}
                  >
                    <div key={i}>
                      <Matches
                        ordersList={matchList}
                        OnlineUsers={onlineUsers}
                        userCity={userCity}
                        takeCity={a.takeCity}
                        TakeCityCoordinates={a.takeCityLatLon}
                        GiveCity={a.giveCity}
                        GiveCityCoordinates={a.giveCityLatLon}
                        TakeCurrency={a.takeCurrency}
                        GiveCurrency={a.giveCurrency}
                        GiveAmount={a.giveAmount}
                        TakeAmount={a.takeAmount}
                        orderId={a.orderId}
                        orderData={a}
                        index={i}
                      />
                    </div>
                  </Tab>
                ))}
              </Tabs>


            </>
          ) : (
            <div className="pt-5">
              <h5
                id="chatAvailability"
                style={{ textAlign: "center", fontColor: "#202020" }}
              >
                No Matches. <br></br>
                Would you like to activate Prime Services?
              </h5>
            </div>

          )}
        </div>
      </Row>
    </div>
  );
};

export default Match_Tab;
