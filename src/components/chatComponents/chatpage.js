import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import {
  Col,
  Modal,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import "../../App.css";
import Arrow from "../../asstes/arrowenter.svg";
import Cencle from "../../asstes/cancel.png";
import info from "../../asstes/info_message.svg";
import { apiHost } from "../../Helper";
import Message from "../Chat components Mobile/message Mobile";
import UserMobile from "../chatComponentsMobile/User Mobile";
import Msg from "./message";
import User from "./User";

const Chatpage = (props) => {
  const [activelist, setactivelist] = useState([]);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [chatID, setChatID] = useState("");
  const [chatRoomID, setChatRoomID] = useState("");
  const [selectedUser, setselectedUser] = useState({});
  const [activelistDict, setactivelistDict] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalID, setModalID] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [chatdocList, setchatdocList] = useState([]);
  const [orderId, setorderId] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const [backupData, setBackUpData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ShowChatpage, setshowChatpage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    localStorage.getItem("MyOrders", "False");
    getAllData();
    // console.log("backupData", backupData);
    // if(localStorage.getItem("FinalizedData") === "DefaultOrders")
    // {
    // }
    // else if(localStorage.getItem("FinalizedData") === "OrderByActivity")
    //   {
    //     getAllData2();
    //   }
    // GetDataByActivity()
    // connection.invoke("GetConnectedUser").then(res => //console.log(res))
  }, [null]);

  const getDistance = (cityCoordinates, orderCityCoordinates) => {
    //haversine formula to get distance between order cities
    let lon1 = cityCoordinates["lon"];
    let lat1 = cityCoordinates["lat"];
    let lon2 = orderCityCoordinates["lon"];
    let lat2 = orderCityCoordinates["lat"];

    let R = 6371; // km

    let x1 = lat2 - lat1;
    let dLat = (x1 * Math.PI) / 180;
    let x2 = lon2 - lon1;
    let dLon = (x2 * Math.PI) / 180;
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let result = R * c;
    result = result.toFixed();
    return result;
  };

  const getAllData = () => {
    //function to get all information about order
    localStorage.setItem("FinalizedData", "DefaultOrders");
    Promise.all([GetChatRoomData(), GetActivedata()]).then((res) => {
      // console.log(res);
      let firstChatTab = res[0][res[1][0]["orderId"]];
      let orders = [];
      Object.keys(res[0]).forEach((d) => {
        for (let index = 0; index < res[1].length; index++) {
          let arrayOrder = res[1][index].orderId;
          if (d == arrayOrder) {
            res[0][arrayOrder].forEach((d, i) => {
              // console.log(
              //   res[1][index]["giveCity"] === "Any City",
              //   res[1][index]["selfgiveCity"] === "Any City",
              //   res[1][index]["takeCity"] === "Any City",
              //   res[1][index]["selftakeCity"] === "Any City"
              // );
              let obj = {
                ...d,
                selftakeCity: res[1][index]["takeCity"],
                selftakeCountry: res[1][index]["takeCountry"],
                selfgiveCountry: res[1][index]["giveCountry"],
                selfgiveCity: res[1][index]["giveCity"],
                selfgiveAmount: res[1][index]["giveAmount"],
                selftakeAmount: res[1][index]["takeAmount"],
                selforderStatus: res[1][index]["status"],
                selfOrderId: res[1][index]["orderId"],
                givecitydistance:
                  // res[1][index]["giveCity"] === "Any City" ||
                  // res[1][index]["selfgiveCity"] === "Any City"
                  getDistance(
                    JSON.parse(d.giveCityLatLon),
                    JSON.parse(res[1][index].takeCityLatLon)
                  ),
                // : "---",
                takecitydistance:
                  // res[1][index]["takeCity"] === "Any City" ||
                  // res[1][index]["selftakeCity"] === "Any City"
                  getDistance(
                    JSON.parse(d.takeCityLatLon),
                    JSON.parse(res[1][index].giveCityLatLon)
                  ),
                // : "---",
              };
              res[0][arrayOrder][i] = obj;
            });
          }
        }
      });
      setactivelist(res[1]);
      res[1].forEach((d) => {
        orders.push(d.orderId);
      });

      // console.log(backupData);
      setOrdersList(orders);
      setactivelistDict(res[0]);
      if (window.location.search.includes("OrderId")) {
        changeTab(window.location.search.split("=")[2], orders, res[0]);
      } else {
        setchatdocList(firstChatTab);
      }
    });
  };

  const GetChatRoomData = () => {
    //function to get chatroom data of counter users
    return new Promise((resolve, reject) => {
      let url = `${apiHost}/api/Chats/GetChatRooms?UserId=${uid}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          //console.log(response.data);
          let obj = {};
          response.data.chatRoomResult.forEach((d) => {
            if (d.isChatActive == true && d.deactivatedBy != uid) {
              let orderId = d.orderId;
              if (obj[orderId] === undefined) {
                obj[orderId] = [];
              }
              obj[orderId].push(d);
            }
          });
          //console.log(obj);
          resolve(obj);
        });
    });
  };

  const GetActivedata = () => {
    //function to get chat of current orders
    return new Promise((resolve, reject) => {
      let url = `${apiHost}/api/Orders/GetFinalizedOrders?UserId=${uid}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          //console.log(response.data.orders);
          const tasklist = [];
          response.data.orders.map((doc) => {
            tasklist.push({ ID: doc.id, ...doc });
          });
          if (response.data.orders.length == 0) {
            setIsLoading(false);
          } else {
            setIsLoading(null);
          }
          setBackUpData(tasklist);
          resolve(tasklist);
        })
        .catch((error) => {
          //console.log(error);
        });
    });
  };

  const GetDataByActivity = () => {
    return new Promise((resolve, reject) => {
      let url = `${apiHost}/api/Orders/GetOrderByActivity?UserId=${uid}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          //console.log(response.data.orders);
          const tasklist = [];
          response.data.orders.map((doc) => {
            tasklist.push({ ID: doc.id, ...doc });
          });
          if (response.data.orders.length == 0) {
            setIsLoading(false);
          } else {
            setIsLoading(null);
          }
          resolve(tasklist);
          // console.log("tasklist", tasklist);
        })
        .catch((error) => {
          //console.log(error);
        });
    });
  };

  const getAllData2 = () => {
    localStorage.setItem("FinalizedData", "OrderByActivity");
    //function to get all information about order
    Promise.all([GetChatRoomData(), GetDataByActivity()]).then((res) => {
      // console.log(res);
      let firstChatTab = res[0][res[1][0]["orderId"]];
      // console.log(firstChatTab);
      let orders = [];
      Object.keys(res[0]).forEach((d) => {
        for (let index = 0; index < res[1].length; index++) {
          let arrayOrder = res[1][index].orderId;
          if (d == arrayOrder) {
            res[0][arrayOrder].forEach((d, i) => {
              // console.log(
              //   res[1][index]["giveCity"] === "Any City",
              //   res[1][index]["selfgiveCity"] === "Any City",
              //   res[1][index]["takeCity"] === "Any City",
              //   res[1][index]["selftakeCity"] === "Any City"
              // );
              let obj = {
                ...d,
                selftakeCity: res[1][index]["takeCity"],
                selftakeCountry: res[1][index]["takeCountry"],
                selfgiveCountry: res[1][index]["giveCountry"],
                selfgiveCity: res[1][index]["giveCity"],
                selfgiveAmount: res[1][index]["giveAmount"],
                selftakeAmount: res[1][index]["takeAmount"],
                selforderStatus: res[1][index]["status"],
                selfOrderId: res[1][index]["orderId"],
                givecitydistance:
                  // res[1][index]["giveCity"] === "Any City" ||
                  // res[1][index]["selfgiveCity"] === "Any City"
                  getDistance(
                    JSON.parse(d.giveCityLatLon),
                    JSON.parse(res[1][index].takeCityLatLon)
                  ),
                // : "---",
                takecitydistance:
                  // res[1][index]["takeCity"] === "Any City" ||
                  // res[1][index]["selftakeCity"] === "Any City"
                  getDistance(
                    JSON.parse(d.takeCityLatLon),
                    JSON.parse(res[1][index].giveCityLatLon)
                  ),
                // : "---",
              };
              // console.log(obj);
              res[0][arrayOrder][i] = obj;
            });
          }
        }
      });
      // console.log(res[1], backupData);
      let oldIds = backupData.map((x) => {
        return x.ID;
      });
      let newIds = res[1].map((x) => {
        return x.ID;
      });
      // console.log(newIds, oldIds);
      let filteredRecords = backupData.filter((x) => {
        return !newIds.includes(x.ID);
      });
      // console.log(filteredRecords);
      let result = [...res[1], ...filteredRecords];
      // console.log(result);
      setactivelist(result);
      res[1].forEach((d) => {
        orders.push(d.orderId);
      });
      //console.log(res);
      setOrdersList(orders);
      setactivelistDict(res[0]);
      if (window.location.search.includes("OrderId")) {
        changeTab(window.location.search.split("=")[2], orders, res[0]);
      } else {
        setchatdocList(firstChatTab);
      }
    });
  };

  const sortOrdersByTimeCreated = () => {
    const sortedOrders = [...activelist].sort((a, b) => {
      return new Date(b.timeCreated) - new Date(a.timeCreated);
    });
    setactivelist(sortedOrders);
  };

  function scrollLeft() {
    $(".nav-tabs").animate({ scrollLeft: 1500 }, 500);
  }

  function scrollRight() {
    $(".nav-tabs").animate({ scrollLeft: 0 }, 500);
  }

  let tabStyle1 = {
    width: "20px",
    height: "20px",
    innerWidth: "20px",
    innerHeight: "20px",
  };
  let tab1 = <img src={Arrow} style={tabStyle1} />;
  const hideModal = () => {
    setShowModal(false);
  };

  const deleteUser = (orderId) => {
    //delete chat data
    let data = { orderId: orderId };
    let url_1 = `${apiHost}/api/Chats/RemoveChatRooms?RoomID=${2}&UserId=${uid}&OrderId=${orderId}&Count=${1}&MakeCompleted=${true}`;
    axios
      .post(url_1, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response1) => {
        //console.log(response1);
        window.location.reload();
      })
      .catch((e) => {
        //console.log(e);
      });
  };

  const changeTab = (divid, orders, activeDict) => {
    //function to change the active chat tab
    orders.forEach((d) => {
      document.getElementById(d).className = "item";
      if (d == divid) {
        document.getElementById(divid).className = "item-coloured";
      }
    });
    setChatRoomID("");
    setchatdocList(activeDict[divid]);
    setorderId(divid);
    setModalID(divid);
  };

  useEffect(() => {
    sessionStorage.setItem("previousPathName", window.location.pathname);
  }, [selectedUser, Navigate]);

  return (
    <>
      {isLoading == true ? (
        <div>
          <h5
            id="chatAvailability"
            style={{ textAlign: "center", fontColor: "#202020" }}
          >
            ...{" "}
          </h5>
        </div>
      ) : isLoading == null ? (
        <>
          {props.is1Fx ? null : (
            <div
              className="horizontalChat-container notranslate"
              style={{ marginTop: 82, display: "flex", alignItems: "center" }}
            >
              {/* <div className="mr-2"><MoreVertIcon/></div> */}
              <div className="">
                <div
                  className="position-relative mr-2"
                  style={{ zIndex: 9999 }}
                  onClick={toggleDropdown}
                >
                  <MoreVertIcon />
                  {isOpen && (
                    <div className="position-absolute bg-gray border rounded shadow mt-2">
                      <ul
                        className="list-unstyled p-2 m-0"
                        style={{
                          position: "fixed",
                          width: "147px",
                          height: "115px",
                          borderRadius: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        <li
                          className="p-2 cursor-pointer"
                          onClick={sortOrdersByTimeCreated}
                        >
                          New orders first
                        </li>
                        <li
                          className="p-2 cursor-pointer"
                          onClick={getAllData2}
                        >
                          Order by Activity
                        </li>
                        <li className="p-2 cursor-pointer" onClick={getAllData}>
                          Get all orders
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {activelist.map((d, i) => (
                <>
                  <Modal
                    key={`${i}-modal`}
                    show={showModal}
                    onHide={hideModal}
                    size="md"
                    className="modal-backdrop.show modalp0"
                  >
                    <Modal.Header>
                      <Modal.Title style={{ fontSize: 16 }}>
                        Complete the Order and end all conversations
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "end" }}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <button
                            // variant="danger"
                            type="button"
                            className="cancelmodal"
                            onClick={hideModal}
                          >
                            Cancel
                          </button>
                        </div>
                        <div>
                          <button
                            // variant="default"
                            id={d.orderId}
                            type="button"
                            className="completeconvomodal btn btn-primary"
                            onClick={(e) => {
                              //console.log("aa");
                              deleteUser(e.currentTarget.id);
                            }}
                          >
                            Complete
                          </button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{ position: "absolute" }}
                      >
                        {d.giveCity},{d.giveState},{d.giveCountry}
                      </Tooltip>
                    }
                    placement="bottom"
                  >
                    <div
                      id={d.orderId}
                      key={i}
                      className={i == 0 ? "item-coloured" : "item"}
                      onClick={(e) => {
                        setshowChatpage(false);
                        if (e.target.nodeName == "IMG") {
                          changeTab(
                            e.target.parentElement.id,
                            ordersList,
                            activelistDict
                          );
                        } else {
                          changeTab(e.target.id, ordersList, activelistDict);
                        }
                      }}
                    >
                      <img
                        src={Cencle}
                        onClick={(e) => {
                          setShowModal(true);
                        }}
                        style={{
                          width: "18px",
                          float: "right",
                        }}
                      />
                      {d.giveAmount.toLocaleString()} {d.giveCurrency}{" "}
                      {d.giveCity}
                      {", "}
                      {d.giveCountryCode}
                      &nbsp;&nbsp; &nbsp;&nbsp;
                      <br></br>
                      <img src={Arrow} style={{ width: "52px" }} />
                      {d.takeAmount.toLocaleString()} {d.takeCurrency}{" "}
                      {d.takeCity}
                      {","}
                      {d.takeCountryCode}
                    </div>
                  </OverlayTrigger>
                </>
              ))}
            </div>
          )}

          <div
            className="webchat"
            style={{ position: "relative", height: "100%", width: "100%" }}
          >
            {Object.keys(activelistDict).length == 0 ? null : (
              <div
                key={orderId}
                style={{
                  display: "flex",
                  flex: 1,
                  border: "1px solid #dfdfdf",
                }}
              >
                <Col
                  style={{ display: "flex", flexDirection: "column" }}
                  md={props.is1Fx ? 3 : 2}
                  className="UserPageScrollStyle"
                >
                  <User
                    chatdocList={chatdocList}
                    orderID={orderId}
                    setChatID={setChatID}
                    setChatRoomID={setChatRoomID}
                    setselectedUser={setselectedUser}
                    is1Fx={props.is1Fx}
                  // incomingMatches={true}
                  />
                </Col>
                <Col
                  md={props.is1Fx ? 9 : 10}
                  className="leftside"
                  style={{ flexDirection: "column", display: "flex" }}
                >
                  {chatRoomID === "" ? (
                    <div
                      style={{
                        alignItems: "center",
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          // height: "35vh",
                          position: "absolute",
                          top: "25%",
                          display: "flex",
                          width: "35vw",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Click on your Party Name to discuss details.
                      </p>
                      {/* <img src={Chatbg} style={{ width: "35vw" }} /> */}
                    </div>
                  ) : (
                    <Msg
                      chatRoomId={setChatRoomID}
                      chatdocList={chatdocList}
                      DOCID={orderId}
                      ChatID={chatID}
                      ChatRoomData={selectedUser}
                    />
                  )}
                </Col>
              </div>
            )}
          </div>
          {!ShowChatpage ? (
            <div
              className="Mobilechat1"
              style={{ padding: "5px", position: "relative", height: "100vh", overflowY: "auto" }}
            >
              <UserMobile
                chatdocList={chatdocList}
                orderID={orderId}
                setshowChatpage={setshowChatpage}
              />
              <div style={{ position: "fixed", bottom: "0px", zIndex: 99999 }}>
                <div style={{ background: "#dfdfdf", marginLeft: "-9px" }}>
                  <label
                    style={{
                      textAlign: "center",
                      padding: "1px 7px",
                      fontSize: 12,
                    }}
                  >
                    <img
                      src={info}
                      style={{
                        marginTop: "-2px",
                        width: "14px",
                        marginRight: "2px",
                      }}
                    />
                    All decisions taken are at your own risk and Mobala has no
                    liability. Please refrain from online transfers and
                    divulging your bank, credit card or debit card information
                    to unknown parties
                  </label>
                </div>
              </div>
              {/* <ChatPageMobile chatdocList={chatdocList} orderID={orderId} setshowChatpage={setshowChatpage} /> */}
            </div>
          ) : (
            <Message setshowChatpage={setshowChatpage}></Message>
          )}
        </>
      ) : (
        <div className="pt-5">
          <h5
            id="chatAvailability"
            style={{ textAlign: "center", fontColor: "#202020" }}
          >
            No orders in Finalize{" "}
          </h5>
        </div>
      )}
    </>
  );
};

export default Chatpage;
