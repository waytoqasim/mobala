import React, { useState, useEffect, useContext } from "react";
import User from "./User Mobile";
import "../../App.css";
import Arrow from "../../asstes/arrowenter.svg";
import { addDoc, apiHost, setDoc } from "../../Helper";
import $ from "jquery";
import axios from "axios";
import Message from "./message Mobile"
const MobileChatpage = (props) => {
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [chatMatchesID, setChatMatchesID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ShowChatpage, setshowChatpage] = useState(false);


  useEffect(() => {
    props.setshowChatpage(ShowChatpage)
  }, [ShowChatpage])

  return (
    <div style={{padding:"5px"}}>
      {/* <User
        chatdocList={props.chatdocList}
        orderID={props.orderId}
      /> */}
      <User
        chatdocList={props.chatdocList}
        orderID={props.orderId}
        setshowChatpage={setshowChatpage}
      />
    </div>
  );
};

export default MobileChatpage;
