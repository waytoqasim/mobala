import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import "../../App.css";
import { AppContext } from "../../Context";
import Message from "../../pages/messagemobile/message Mobile";
import Msg from "../chatComponents/message";
import User from "../chatComponents/User";
import UserMobile from "../chatComponentsMobile/User Mobile";
// import info from "../asstes/info.svg";
import info from "../../asstes/info_message.svg";

const OrderFXChatpage = (props) => {
  const [chatID, setChatID] = useState("");
  const [chatRoomID, setChatRoomID] = useState("");
  const [orderId, setOrderId] = useState("");
  const [selectedUser, setselectedUser] = useState({});
  const [chatdocList, setchatdocList] = useState([]);
  const [matchList, setMatchList] = useState([]);
  const [isOrder, setisOrder] = useState(null);
  const [ShowChatpage, setshowChatpage] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem("MyOrders", "False");
    setchatdocList(props.Chats);
    setMatchList(props.matchList);
  }, [props.Chats]);

  useEffect(()=>{
    setChatRoomID("");
    setOrderId("");
    setshowChatpage(false);
  },[props.orderId])
 const setselectedUserandler=(value)=>{
  debugger
  setselectedUser(value)
  props.selectedUser(value)
}
const isMobile = window.innerWidth <= 768;
  return (
    <>
      {chatdocList.length == 0 && matchList.length == 0 ? (
        <div>
          <h5
            id="chatAvailability"
            style={{ textAlign: "center", fontColor: "#202020" }}
          >
            Waiting for Offers; we appreciate your patience!{" "}
          </h5>
        </div>
      ) : (
        <>
          <div
            className="webchat " 
            style={{ height:isMobile?"500px":"auto", position: "relative", marginBottom:70 }}
          >
            <div
              style={{ display: "flex", flex: 1, border: "1px solid #dfdfdf" }}
            >
              <Col md={props.is1Fx ? 3 : 2} className="UserPageScrollStyle p-0">
                <User
                  chatdocList={chatdocList}
                  MatchList={props.matchList}
                  setisOrder={setisOrder}
                  setOrderId={setOrderId}
                  orderId={props.orderId}
                  setChatID={setChatID}
                  setChatRoomID={setChatRoomID}
                  setselectedUser={setselectedUserandler}
                  is1Fx={props.is1Fx}
                />
              </Col>

              <Col
                md={props.is1Fx ? 9 : 10}
                className="leftside"
                style={{ flexDirection: "column", display: "flex" }}
              >
                {chatRoomID === "" && orderId == "" ? (
                  <div>
                    <div
                      style={{
                        background: "#dfdfdf",
                        marginLeft: 0,
                        height: "43px",
                      }}
                    >
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "13px",
                          padding: "5px",
                          marginBottom: 0,
                          maxHeight: "3rem",
                          minHeight: "3rem",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <img src={info} width="13px" style={{ marginTop:"-1px"}}/> All decisions taken are
                        at your own risk and Mobala has no liability. Please
                        refrain from online transfers and divulging your bank,
                        credit card or debit card information to unknown
                        parties.
                      </p>
                    </div>
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
                          height: "35vh",
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
                  </div>
                ) : (
                  <Msg
                    chatRoomId={isOrder ? orderId : setChatRoomID}
                    isOrder={isOrder}
                    orderId={props.orderId}
                    chatdocList={chatdocList}
                    ChatID={chatID}
                    ChatRoomData={selectedUser}
                    is1Fx={props.is1Fx}
                  />
                )}
              </Col>
            </div>
          </div>
          {!ShowChatpage ? (
            //console.log("mobilechat"),
            <div className="Mobilechat1" style={{ padding: "5px" }}>
              <UserMobile
                orderID={orderId}
                chatdocList={chatdocList}
                MatchList={props.matchList}
                setshowChatpage={setshowChatpage}
                is1Fx={props.is1Fx}
              />
              {/* <ChatPageMobile chatdocList={chatdocList} orderID={orderId} setshowChatpage={setshowChatpage} /> */}
            </div>
          ) : (
            <Message setshowChatpage={setshowChatpage} is1Fx={props.is1Fx}></Message>
          )}
        </>
      )}
    </>
  );
};

export default OrderFXChatpage;
