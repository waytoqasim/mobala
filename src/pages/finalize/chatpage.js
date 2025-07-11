import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import APIURLS from "../../apiurls";
import "../../App.css";
import Arrow from "../../asstes/arrowenter.svg";
import info from "../../asstes/info_message.svg";
import UserMobile from "../../components/chatComponentsMobile/User Mobile";
import Msg from "../../components/finalize/message";
import ChatModel from "../../components/finalize/model";
import User from "../../components/finalize/User";
import { apiHost } from "../../Helper";
import { apiInterceptor } from "../../service/ApiService";
import Message from "../messagemobile/message Mobile";

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
  const [newOrdersFirstChecked, setNewOrdersFirstChecked] = useState(false);
  const [orderByActivityChecked, setOrderByActivityChecked] = useState(false);
  const [getAllOrdersChecked, setGetAllOrdersChecked] = useState(false);






  const toggleDropdown = () => {
    debugger
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    localStorage.getItem("MyOrders", "False");
    getAllData();
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
    debugger
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
                 
                  getDistance(
                    JSON.parse(d.giveCityLatLon),
                    JSON.parse(res[1][index].takeCityLatLon)
                  ),
                // : "---",
                takecitydistance:
                
                  getDistance(
                    JSON.parse(d.takeCityLatLon),
                    JSON.parse(res[1][index].giveCityLatLon)
                  ),
               
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
    setNewOrdersFirstChecked(false);
    setOrderByActivityChecked(false);
    setGetAllOrdersChecked(true);
  };

  const GetChatRoomData = () => {
    return new Promise((resolve, reject) => {
      let url = `${apiHost}/api/Chats/GetChatRooms?UserId=${uid}`;
      apiInterceptor.get(APIURLS.CHAT.GETCHATROOMS(uid))
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
          resolve(obj);
        });
    });
  };

  const GetActivedata = () => {
    return new Promise((resolve, reject) => {
      let url = `${apiHost}/api/Orders/GetFinalizedOrders?UserId=${uid}`;
      apiInterceptor.get(APIURLS.ORDERS.GETFINALIZEORDERS(uid))
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
      apiInterceptor.get(APIURLS.ORDERS.GETORDERSBYACTIVITY(uid))
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
        })
        .catch((error) => {
        });
    });
  };

  const getAllData2 = () => {
    debugger
    localStorage.setItem("FinalizedData", "OrderByActivity");
    Promise.all([GetChatRoomData(), GetDataByActivity()]).then((res) => {
      let firstChatTab = res[0][res[1][0]["orderId"]];
      let orders = [];
      Object.keys(res[0]).forEach((d) => {
        for (let index = 0; index < res[1].length; index++) {
          let arrayOrder = res[1][index].orderId;
          if (d == arrayOrder) {
            res[0][arrayOrder].forEach((d, i) => {

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
                  
                  getDistance(
                    JSON.parse(d.giveCityLatLon),
                    JSON.parse(res[1][index].takeCityLatLon)
                  ),
                // : "---",
                takecitydistance:
                
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
    setNewOrdersFirstChecked(false);
    setOrderByActivityChecked(true);
    setGetAllOrdersChecked(false);
  };

  const sortOrdersByTimeCreated = () => {
    debugger
    const sortedOrders = [...activelist].sort((a, b) => {
      return new Date(b.timeCreated) - new Date(a.timeCreated);
    });
    setactivelist(sortedOrders);
    setNewOrdersFirstChecked(true);
    setOrderByActivityChecked(false);
    setGetAllOrdersChecked(false);
  };

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
    apiInterceptor.post(APIURLS.CHAT.REMOVECHATROOMS(2, uid, orderId, 1, true))
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
                      <ul className="list-unstyled p-2 m-0" style={{
                        position: "fixed",
                        width: "180px",
                        height: "120px",
                        borderRadius: "10px",
                        backgroundColor: "#e7e7e7"
                      }}>
                        <li
                          className="p-2 cursor-pointer"
                          style={{ color: 'black', whiteSpace: 'nowrap' }}
                          onClick={sortOrdersByTimeCreated}
                        >
                          {/* New orders first */}
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="checkbox1"
                              checked={newOrdersFirstChecked}
                              onChange={() => {
                                setNewOrdersFirstChecked(!newOrdersFirstChecked);
                                setOrderByActivityChecked(false);
                                setGetAllOrdersChecked(false)
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
                          onClick={getAllData2}
                        >
                          {/* Order by Activity */}
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="checkbox1"
                              checked={orderByActivityChecked}
                              onChange={() => {
                                setNewOrdersFirstChecked(false);
                                setOrderByActivityChecked(!orderByActivityChecked);
                                setGetAllOrdersChecked(false)
                              }}
                            />
                            <label className="form-check-label" htmlFor="checkbox1">
                              Order by Activity
                            </label>
                          </div>
                        </li>
                        <li className="p-2 cursor-pointer"
                          style={{ color: 'black', whiteSpace: 'nowrap' }}
                          onClick={getAllData}>
                          {/* Get all orders */}
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="checkbox1"
                              checked={getAllOrdersChecked}
                              onChange={() => {
                                setNewOrdersFirstChecked(false);
                                setOrderByActivityChecked(false);
                                setGetAllOrdersChecked(!getAllOrdersChecked)
                              }}
                            />
                            <label className="form-check-label" htmlFor="checkbox1">
                              Get all orders
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>

                  )}
                </div>
              </div>
              {activelist.map((d, i) => (
                <ChatModel
                  hideModal={hideModal}
                  showModal={showModal}
                  deleteUser={deleteUser}
                  setshowChatpage={setshowChatpage}
                  changeTab={changeTab} data={d} index={i}
                  ordersList={ordersList}
                  setShowModal={setShowModal}
                  activelistDict={activelistDict}
                />
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
                  className="UserPageScrollStyle p-0"
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
