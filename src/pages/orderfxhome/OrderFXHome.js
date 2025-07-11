import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import { apiHost } from "../../Helper";
import ChatPage from "../../components/orderfxchat/OrderFXChat";
import CreateOrder from "../../pages/createorder/Creatorder";
import { Orders } from "../../pages/orders/Orders";
import { ShimmerBadge, ShimmerButton, ShimmerThumbnail } from "react-shimmer-effects";
import { apiInterceptor } from "../../service/ApiService";
import APIURLS from "../../apiurls";


function OrderfxHome({ expiryTimestamp }) {
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [currentorder, setCurrentOrder] = useState(null);
  const [ChatRoom, setChatRoom] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [matchList, setMatchList] = useState([]);
  const [orderDropdown, setOrderDropdown] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnlyChat, setIsOnlyChat] = useState(false);
  const [key, setKey] = useState(0);
  const [signupShow, setSignupShow] = useState(false);
  const handleSignupClose = () => setSignupShow(false);
  const context = useContext(AppContext);
  useEffect(() => {
    const previousUrl = sessionStorage.getItem("previousPathName");
    if (previousUrl == "/OrderCom") {
      navigate(1);
    }
    getOrderDropdown();
    sessionStorage.setItem("previousPathName", window.location.pathname);
  }, [null]);

  useEffect(() => {
    if (currentorder != null) {
      getOrder();
    }
  }, [currentorder]);

  const getOrderDropdown = () => {
    //let uid = sessionStorage.getItem("UserID");
    // let url = `${apiHost}/api/Orders/GetOrderDropdown?UserId=${uid}`;
    // axios
    //   .get(url, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     },
    //   })
      apiInterceptor.get(APIURLS.ORDERS.GetOrderDropdown(sessionStorage.getItem("UserID")))
      .then((response) => {
        console.log("response");
        console.log(response);
        if (response.data.length !== 0) {
          setOrderDropdown(response.data);
          setCurrentOrder(response.data[0]["orderId"]);
        }else{
          setIsLoading(false)
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

  const getDistance = (cityCoordinates, orderCityCoordinates) => {
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
  const getOrder = () => {
    // let url = `${apiHost}/api/Orders/GetRecentOrder?OrderId=${currentorder}`;
    // axios
    //   .get(url, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     },
    //   })
      apiInterceptor.get(APIURLS.ORDERS.GETRECENTORDER(currentorder))
      .then((response) => {
        //console.log(response.data);
        console.log("Order data:", response.data.order);
        let dd = new Date(response.data.order.untilGoodDate + "Z");
        response.data.order.untilGoodDate = dd.toDateString();
        setOrder(response.data.order);
        getMatches().then((matches) => {
          let chatroom = [];
          let matchList = [];
          matches.forEach((d) => {
            if (d["orderinFinalize"] > 0) {
              d["isAccepted"] = true;
            }
            let obj = {
              ...d,
              selftakeCity: response.data.order["takeCity"],
              selftakeCountry: response.data.order["takeCountry"],
              selfgiveCountry: response.data.order["giveCountry"],
              selfgiveCity: response.data.order["giveCity"],
              selfgiveAmount: response.data.order["giveAmount"],
              selftakeAmount: response.data.order["takeAmount"],
              selforderStatus: response.data.order["status"],
              selfOrderId: response.data.order["orderId"],
              selfTakeCityLatLon: JSON.parse(
                response.data.order.takeCityLatLon
              ),
              selfGiveCityLatLon: JSON.parse(
                response.data.order.giveCityLatLon
              ),
              givecitydistance: getDistance(
                JSON.parse(d.giveCityLatLon),
                JSON.parse(response.data.order.takeCityLatLon)
              ),
              takecitydistance: getDistance(
                JSON.parse(d.takeCityLatLon),
                JSON.parse(response.data.order.giveCityLatLon)
              ),
            };
            matchList.push(obj);
          });
          setMatchList(matchList);
          response.data.chatRoomResult.forEach((d) => {
            let obj = {
              ...d,
              selftakeCity: response.data.order["takeCity"],
              selftakeCountry: response.data.order["takeCountry"],
              selfgiveCountry: response.data.order["giveCountry"],
              selfgiveCity: response.data.order["giveCity"],
              selfgiveAmount: response.data.order["giveAmount"],
              selftakeAmount: response.data.order["takeAmount"],
              selforderStatus: response.data.order["status"],
              selfOrderId: response.data.order["orderId"],
              selfTakeCityLatLon: JSON.parse(
                response.data.order.takeCityLatLon
              ),
              selfGiveCityLatLon: JSON.parse(
                response.data.order.giveCityLatLon
              ),
              givecitydistance: getDistance(
                JSON.parse(d.giveCityLatLon),
                JSON.parse(response.data.order.takeCityLatLon)
              ),
              takecitydistance: getDistance(
                JSON.parse(d.takeCityLatLon),
                JSON.parse(response.data.order.giveCityLatLon)
              ),
            };
            chatroom.push(obj);
            //console.log(obj);
          });
          setChatRoom(chatroom);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const getMatches = () => {
    return new Promise((resolve, reject) => {
      // let url = `${apiHost}/api/Orders/GetMatchForOneOrder?UserId=${sessionStorage.getItem(
      //   "UserID"
      // )}&OrderId=${currentorder}`;
      // axios
      //   .get(url, {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      //     },
      //   })
        apiInterceptor.get(APIURLS.ORDERS.GetMatchForOneOrder(sessionStorage.getItem("UserID"),currentorder))
        .then((response) => {
          console.log(response.data);
          console.log(response.data);
          resolve(response.data);
        });
    });
  };

  useEffect(() => {
    if (context.applicationStore.Invite) {
      getMatches();
    }
  }, [context.applicationStore.Invite]);

  const navigateSignup = () => {
    let obj = {
      email: sessionStorage.getItem("email"),
      userId: sessionStorage.getItem("UserID"),
      userName: sessionStorage.getItem("UserName"),
    };
    let jsonString = JSON.stringify(obj);
    let encodedString = encodeURIComponent(jsonString);
    navigate(`/SignUp?data=${encodedString}&t=${Date.now()}`);
    setSignupShow(false)
  };

  const setSelectedUserHandler=(value)=>{
    debugger
    // apiInterceptor.get(APIURLS.ORDERS.GetOrderDropdown(value.userid))
    // .then((response) => {
    //   console.log("response");
    //   console.log(response);
    //   if (response.data.length !== 0) {
    //     setOrderDropdown(response.data);
    //     setCurrentOrder(response.data[0]["orderId"]);
    //   }else{
    //     setIsLoading(false)
    //   }})
  }
  return (
    <div>
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

      <div className="mainbg " style={{ marginBottom: -70 }}>
        <div className="d-flex tab1 mt-2">
          <Col
            // md={6}
            onClick={(k) => setKey(0)}
            className={key == 0 ? "fxBorder" : "noFxBorder"}
            style={{
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: 0,
              marginBottom: "-1px",
            }}
          >
            1-Order FX
          </Col>
          <Col
            // md={6}
            onClick={(k) => {
              if (sessionStorage.getItem("City") == "null") {
                setSignupShow(true);
              } else {
                navigate(
                  `/OrderCom?ID=${sessionStorage.getItem(
                    "UserID"
                  )}&t=${Date.now()}`
                );
              }
            }}
            className={key == 1 ? "fxBorder" : "noFxBorder"}
            style={{
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: 0,
              marginBottom: "-1px",
            }}
          >
            Full FX
          </Col>
        </div>

        {isLoading ? (
          <div className="container mt-3">
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
              </div>
            </div>
          </div>
        ) : (
          <div className="orderFXChat">
            {Object.keys(order).length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 50,
                }}
              >
                <div
                  className={`upper-div ${isOnlyChat ? "hidden" : "visible"}`}
                  style={{ paddingBottom: "45px" }}
                >
                  <Row
                    className="position-sticky centeritem"
                    style={{ zIndex: "999", background: "white" }}
                  >
                    <Col md={7} id="heading" className="d-flex">
                      <div className="d-flex" style={{ width: "98%" }}>
                        <Col md={4}>
                          <Col>
                            <h4 className="txt_order" style={{position:"relative"}}>
                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="tooltip-disabled"  bsPrefix="custom-tooltip"
                                  style={{ position: "absolute" }}>Sell</Tooltip>
                                }
                                placement="top-start"
                              >
                                <span style={{ cursor: "default" }}>
                                  You Give
                                </span>
                              </OverlayTrigger>
                            </h4>
                          </Col>
                        </Col>
                        <Col md={4}></Col>
                        <Col md={4} style={{ paddingLeft: "0px" }}>
                          <div style={{ padding: "0px" }}>
                            <h4 className="txt_order" style={{position:"relative"}}>
                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="tooltip-disabled"  bsPrefix="custom-tooltip"
                                  style={{ position: "absolute" }}>Buy</Tooltip>
                                }
                                placement="top-start"
                              >
                                <span style={{ cursor: "default" }}>
                                  You Take
                                </span>
                              </OverlayTrigger>
                            </h4>
                          </div>
                        </Col>
                      </div>
                    </Col>
                  </Row>
                  <Orders
                    Expired={order.Expired}
                    GiveCurrencyInfo={order.giveCurrencyInfo}
                    UntilGoodDate={order.untilGoodDate}
                    is1Fx={true}
                    id={order.orderId}
                    uid={order.uid}
                    TakeCountry={order.takeCountry}
                    TakeCity={order.takeCity}
                    TakeThroughCash={order.takeThroughCash}
                    TakeThroughBank={order.takeThroughBank}
                    TakeAmmount={order.takeAmount}
                    TakeCurrency={order.takeCurrency}
                    TakeCurrencyInfo={order.takeCurrencyInfo}
                    AdditionalAmmount={order.AdditionalAmmount}
                    favBy={order.favBy}
                    GiveCountry={order.giveCountry}
                    GiveCity={order.giveCity}
                    GiveSourceBank={order.giveSourceBank}
                    GiveAmmount={order.giveAmount}
                    GiveCurrency={order.giveCurrency}
                    GiveSourceCash={order.giveSourceCash}
                    ordersDropdown={orderDropdown}
                    setCurrentOrder={setCurrentOrder}
                    currentOrder={currentorder}
                    inFinalize = {order.inFinalize}
                    status="Active"
                    classBtn={"activ-btn"}
                    classBdr={"bdr p-2"}
                  />
                </div>
                <div>
                <ChatPage
                  Chats={ChatRoom}
                  matchList={matchList}
                  orderId={currentorder}
                  orderData={order}
                  incomingMatches={true}
                  is1Fx={true}
                  selectedUser={setSelectedUserHandler}          
                ></ChatPage>
                </div>
              </div>
            ) : (
              <CreateOrder isHomeFX={true}></CreateOrder>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default OrderfxHome;
