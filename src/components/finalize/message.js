import DoneAllIcon from '@mui/icons-material/DoneAll';
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { saveAs } from "file-saver";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Attach from "../../asstes/Attachbtn2.svg";
import Cencle from "../../asstes/cancel.png";
import download from "../../asstes/download1.svg";
import emojiIcon from "../../asstes/happy.png";
import info from "../../asstes/info_message.svg";
import Location from "../../asstes/locattionbtn2.svg";
import options from "../../asstes/option.png";
import pdfImage from "../../asstes/pdf.svg";
import Send from "../../asstes/Sendbtn.svg";
import { AppContext } from "../../Context";
import { addDoc, apiHost, deleteDoc, setDoc } from "../../Helper";
import SignalRService from "../../SignalR";
// import Pdf from "react-to-pdf";
import ReactToPrint from "react-to-print-advanced";
import AgreementSlip from '../../pages/agreementslip/AgreementSlip';
import { IceBreakingMessage } from '../IceBreakingMessage';
import { apiInterceptor } from '../../service/ApiService';
import APIURLS from '../../apiurls';

const Message = (props) => {
   debugger
  const divRef = useRef(null);
  const ref = React.createRef();
  const navigate = useNavigate();

  const [list, setlist] = useState([]);
  const [inputID, setinputID] = useState("");
  const [deactivatemsg, setDeactivatemsg] = useState("");
  const [senmesglist, setsenmsglist] = useState([]);
  const [slipData, setSlipData] = useState({});
  const [transcriptOverflow, setTranscriptOverflow] = useState(true);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [givecurrency, setgivecurrency] = useState("");
  const [takecurrency, settakecurrency] = useState("");
  const [msg, setMsg] = useState("");
  const [locationerr, setLocationerr] = useState("");
  const [islocationOn, setIslocationOn] = useState(false);
  const [onestar, setonestar] = useState(false);
  const [twostar, settwostar] = useState(false);
  const [threestart, setthreestart] = useState(false);
  const [fourstar, setfourstar] = useState(false);
  const [fivestart, setfivestart] = useState(false);
  const [imagesource, setimagesource] = useState([]);
  const [showSnippet, setShowSnippet] = useState(true);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [showIceBreakingMessage, setShowIceBreakingMessage] = useState(false);
  const context = useContext(AppContext);
  const emojiPickerRef = useRef(null);

  const formatNumbers = (code, num) => {
    try {
      num = num.replace(code, "");
      num = [...num].reverse();
      const arrs = [
        num.slice(0, 4).reverse().join(""),
        num.slice(4, 7).reverse().join(""),
        num.slice(7, 10).reverse().join(""),
        num.slice(10).reverse().join(""),
      ]
        .reverse()
        .join(" ");
      return arrs;
    } catch (E) {
      return "...";
    }
  };

  useEffect(() => {
    setsenmsglist([]);
  }, [props.chatMatchID]);

  useEffect(() => {
    //console.log("getMessage called .....");
    if (context.applicationStore.messages != "") {
      const newArr = [...senmesglist];
      newArr.push(context.applicationStore.messages);
      setsenmsglist(newArr);
    }
  }, [context.applicationStore.messages]);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      function (position) {
        setIslocationOn(true);
      },
      function (error) {
        if (error.code == error.PERMISSION_DENIED) setIslocationOn(false);
      }
    );
  }, [null]);

  useEffect(() => {
    if (senmesglist.length != 0) {
      if (Object.keys(senmesglist[0]).length != 0) {
        setSlipData({ ...props.ChatRoomData, messages: senmesglist });
      }
    }

    document.getElementById("ChatBox").scrollTop =
      document.getElementById("ChatBox").scrollHeight;
    if (divRef.current) {
      console.log(
        "scrollHeight=>",
        document.getElementById("divToPrint").scrollHeight
      );
    }
    updateMessages();
  }, [senmesglist]);

  const updateMessages = () => {
    //function to load messages in chat
    debugger;
    let url = `${apiHost}/api/Chats/VisitMessage?RoomId=${list.chatRoomId}&UserId=${uid}`;
    apiInterceptor.post(APIURLS.CHAT.VISITMESSAGE(list.chatRoomId,uid),{})
      .then(async (Messages) => {
        context.dispatch({
          Type: "USERS CALL",
          Payload: { chatRoomId: list.chatRoomId, isVisited: true },
        });
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  useEffect(() => {
    setgivecurrency(props.GiveCurrency);
    settakecurrency(props.TakeCurrency);
  }, [null]);

  const onInfoClick = async () => {
    let unique = uuidv4();
    unique = unique.split("-")[0];
    const docRef = `users/${props.ChatID}/Permissions`;
    addDoc(docRef, {
      SenderID: uid,
      For: "Info",
    });

    setDoc(`users/${uid}/Requests/${unique}`, {
      SentToID: props.ChatID,
      For: "Info",
      status: false,
    });
    const senmsgref = `ChatMatches/${props.senderchatMatchesID}/Messages`;
    addDoc(senmsgref, {
      Message: "This users wants to know your info",
      type: "permission",
      ID: uid,
      requestID: unique,
      GiveCurrency: givecurrency,
      TakeCurrency: takecurrency,
      image: "",
      Time: Date.now(),
      Notified: false,
    });
    addDoc(`addNotification`, {
      time: Date.now(),
      description: `${sessionStorage.getItem(
        "UserName"
      )}has asked permission to see your Number and Email`,
      type: "request",
      visited: false,
    });
    setMsg("");
    // }
  };

  const Getdata = async () => {
    //get chatroom data
    setDeactivatemsg("");
    console.log(props.ChatRoomData);
    setlist({ ...props.ChatRoomData });
    if (props.ChatRoomData.deactivatedBy != null) {
      setDeactivatemsg("This user has ended conversation with you.");
    } else if (props.ChatRoomData.selforderStatus == "hold") {
      setDeactivatemsg(
        "You have paused this conversation, Remove order from Hold to continue chatting."
      );
    } else if (props.ChatRoomData.orderStatus == "hold") {
      setDeactivatemsg("This user has paused conversation with you.");
    }
  };

  useEffect(() => {
    Getdata();
  }, [props.ChatRoomData]);

  useEffect(() => {
    if (list.length != 0) {
      if (props.isOrder) {
        setsenmsglist([]);
      } else {
        getmsg();
      }
    }
  }, [list]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  function getlocation() {
    //get location in the chat
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.geolocation.getCurrentPosition(function (position) {
            fetch(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=21f61a865243443b8b07654137eadc62`,
              { method: "GET" }
            )
              .then((res) => res.json())
              .then((data) => {
                setMsg(data.results[0].formatted);
              })
              .catch((err) => {
                //console.log(err);
              });
          });
        } else {
          setLocationerr("This website wants to know your location");
          alert("Please allow location access in your browser settings.");
          setTimeout(() => {
            setLocationerr("");
          }, 3000);
        }
      });
  }

  const sendMsg = async (e) => {
    console.log("useriddd");
    console.log(props.ChatRoomData.userid);
    if (msg != "" || imagesource != []) {
      setShowSnippet(true);
      let filepath = "";
      let url = "";
      if (imagesource.length != 0) {
        const file = imagesource[0].name;
        filepath = file;
        url = await toBase64(imagesource[0]);
      }
      console.log(msg, props.ChatRoomData);
      addDoc(`addNotification`, {
        description: `${msg}`,
        type: "message",
        visited: false,
        senderId: uid,
        ChatRoomId: list.chatRoomId,
        sentToId: props.ChatRoomData.userid,
      });
      setDoc("sendMessage", {
        Image: filepath,
        Notified: false,
        Type: "message",
        Nonce: "",
        Message: msg,
        UserId: uid,
        ChatRoomId: list.chatRoomId,
        base64: url,
      }).then((res) => {
        let time = new Date().toISOString();
        let msgs = {};
        let exactTime =
          new Date().toTimeString().split(" ")[0].split(":")[0] +
          ":" +
          new Date().toTimeString().split(" ")[0].split(":")[1];
        if (res.msg.image !== "") {
          if (res.msg.image.substr(-4) == ".pdf") {
            msgs = {
              ...res.msg,
              img: pdfImage,
              imageurl: `${apiHost}/Messages/${res.msg.image}`,
              filetype: "pdf",
              filename: res.msg.image,
              stringTime: exactTime,
              time: time,
            };
          } else {
            msgs = {
              ...res.msg,
              img: `${apiHost}/Messages/${res.msg.image}`,
              filetype: "image",
              stringTime: exactTime,
              time: time,
            };
          }
        } else {
          msgs = {
            ...res.msg,
            filetype: "image",
            stringTime: exactTime,
            time: time,
          };
        }
        const newArr = [...senmesglist];
        newArr.push(msgs);
        console.log(msgs);
        setsenmsglist(newArr);
        SignalRService.sendNotification(
          list.userid,
          `You have new message from ${sessionStorage.getItem("UserName")}`,
          "Message"
        );
        SignalRService.sendMessage(list.userid, msgs)
          .then((response) => {
            //console.log(response);
            setMsg("");
          })
          .catch((error) => console.log(error));
      });
      setMsg("");
      setimagesource("");
      setShowEmojis(false);
      document.getElementById(`divToPrint`).className = "chattxt";
      if (inputID != "") {
        document.getElementById(`cross${inputID}`).style.display = "none";
        document.getElementById(
          `preview-selected-image${inputID}`
        ).style.display = "none";
        document.getElementById(`preview${inputID}`).style.display = "block";
      }
      setShowSnippet(false);
    }
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      var blob = new Blob([file], { type: "application/octet-binary" });
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const toUnit8Array = (file) => {
    var raw = window.atob(file);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  };

  const encryptMessage = (message, recipientPublicKey, secretKey) =>
    new Promise(async (resolve, reject) => {
      const nacl = require("tweetnacl");
      const encoder = new TextEncoder();
      let nonce = nacl.randomBytes(nacl.box.nonceLength);
      const messageBytes = encoder.encode(message);
      const secretKeyBytes = toUnit8Array(secretKey);
      const recipientPublicKeyBytes = toUnit8Array(recipientPublicKey);
      const encryptedBytes = nacl.box(
        messageBytes,
        nonce,
        recipientPublicKeyBytes,
        secretKeyBytes
      );
      const encryptedMessage = await toBase64(encryptedBytes);
      nonce = await toBase64(nonce);
      resolve({
        nonce: nonce.toString(),
        message: encryptedMessage.toString(),
      });
    });

  const decryptMessage = (
    box,
    nonce1,
    SenderPublicKeybytes,
    secretKeyBytes
  ) => {
    const decoder = new TextDecoder();
    const nacl = require("tweetnacl");
    const nonce = toUnit8Array(nonce1);
    const messageBytes = toUnit8Array(box);
    const secretKey = toUnit8Array(secretKeyBytes);
    const SenderPublicKey = toUnit8Array(SenderPublicKeybytes);
    const decryptedBytes = nacl.box.open(
      messageBytes,
      nonce,
      SenderPublicKey,
      secretKey
    );
    if (decryptedBytes == null) {
      return "Wrong Encryption key";
    }
    const deryptedMessage = decoder.decode(decryptedBytes);
    return deryptedMessage;
  };

  const getmsg = async () => {
    //get messages data
    let msgs = [];
    let url_2 = `${apiHost}/api/Chats/GetMsgs?ChatRoomId=${list.chatRoomId}`;
    axios
      .get(url_2, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then(async (Messages) => {
        let doc = Messages.data.messages;
        // console.log("The doc is : ", doc);
        doc.forEach(async (d) => {
          let exactTime =
            d.time.split("T")[1].split(":")[0] +
            ":" +
            d.time.split("T")[1].split(":")[1];
          if (d.image !== "") {
            if (d.image.substr(-4) == ".pdf") {
              msgs.push({
                ...d,
                img: pdfImage,
                imageurl: `${apiHost}/Messages/${d.image}`,
                filetype: "pdf",
                filename: d.image,
                stringTime: exactTime,
              });
            } else {
              msgs.push({
                ...d,
                img: `${apiHost}/Messages/${d.image}`,
                filetype: "image",
                stringTime: exactTime,
              });
            }
          } else {
            msgs.push({ ...d, filetype: "image", stringTime: exactTime });
          }
        });
        console.log(msgs);
        setsenmsglist(msgs);
      })
      .catch((e) => {
        //console.log(e);
      });
  };

  const styles = {
    popup: {
      margin: "5px 20px",
      backgroundColor: "#94e2ff",
      color: "#076b91",
      lineHeight: "1.5",
      borderRadius: "15px 15px 0px 15px",
      // boxShadow: " -2px 1px 6px #00000026",
      width: "fit-content",
      padding: "7px 13px",
      marginBottom: "5px",
      fontSize: "1rem",
      fontWeight: "500",
      maxWidth: "55%",
    },
    unpop: {
      margin: "5px 20px",
      backgroundColor: "#fff",
      color: "#606060",
      lineHeight: "1.5",
      borderRadius: "0px 15px 15px 15px",
      width: "fit-content",
      padding: "7px 13px",
      fontSize: "1rem",
      fontWeight: "500",
      maxWidth: "55%",
    },
    msgsap: {
      width: "100%",
      justifyContent: "end",
    },
  };

  const requestReject = (msgID) => {
    const docRef = `users/${uid}/Messages/${props.ChatID}/MSG/${msgID}`;
    deleteDoc(docRef);
  };

  let prevDate = "";
  const changePrevDate = (dateString) => {
    prevDate = dateString;
  };

  const onEmojiClick = (event, emojiObject) => {
    //console.log("wewewewewewewe");
    //console.log(emojiObject);
    //console.log(event.emoji);
    setMsg(msg + event.emoji);
  };

  const downloadPdf = (img, name) => {
    saveAs(img, name);
  };

  const sendOnEnter = (e) => {
    if (e.charCode == 13 && !e.shiftKey) {
      sendMsg();
      e.preventDefault();
    }
  };

  const hideOverflow = () => {
    setTranscriptOverflow(false);
  };

  useEffect(() => {
    if (!transcriptOverflow) {
      setTranscriptOverflow(true);
      // setTimeout(() => {
      // }, 1000);
    }
  }, [transcriptOverflow]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojis(false); // Close the EmojiPicker if clicked outside
      }
    };

    if (showEmojis) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojis]);

  return (
    <>
      <div
        className="ModalImage"
        style={{ display: showModal ? "flex" : "none" }}
        onClick={() => setShowModal(false)}
      >
        {/* <Modal show={showModal} onHide={hideModal} size="md">
          <Modal.Body> */}
        <div style={{ margin: "auto" }}>
          <img
            className="selected-image1"
            src={modalImage}
            // src={Profile}
            style={{
              maxWidth: "80vw",
              maxHeight: "75vh",
            }}
          />
        </div>
        {/* </Modal.Body>
        </Modal> */}
      </div>
      <div
        className={transcriptOverflow ? "messageSlipOverflow" : "messageSlip"}
        ref={ref}
      >
        <AgreementSlip ref={ref} chatData={slipData} />
      </div>
      <div style={{ background: "#dfdfdf", marginLeft: 0 }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.85rem",
            padding: "5px",
            marginBottom: 0,
            maxHeight: "3rem",
            minHeight: props.is1Fx ? "3rem" : "",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <img src={info} style={{ marginTop: "-2px", width: "14px" }} /> All
          decisions taken are at your own risk and Mobala has no liability.
          Please refrain from online transfers and divulging your bank, credit
          card or debit card information to unknown parties.
        </p>
      </div>
      <div className="userinfoRow" style={{ alignItems: "center" }}>
        <div>
          <h6 className="userinfo" style={{ margin: "0", backgroundColor: "#eaeff8" }}>
            Give Location: {list.takeCity}
            {", "}
            {list.takeCountry} {" ("}
            {list.takecitydistance} km /{" "}
            {list.takecitydistance / (1.609).toFixed()} mi from{" "}
            {list.selfgiveCity}
            {", "}
            {list.selfgiveCountry}
            {")"}
          </h6>

          <h6 className="userinfo" style={{ margin: "0", backgroundColor: "#eaeff8" }}>
            Take Location: {list.giveCity}
            {", "}
            {list.giveCountry}
            {" ("}
            {list.givecitydistance} km /{" "}
            {list.givecitydistance / (1.609).toFixed()} mi from{" "}
            {list.selftakeCity}
            {", "} {list.selftakeCountry}
            {")"}
          </h6>
          {/* <h6 className="userinfo" style={{ margin: "0" }}>
          <OverlayTrigger
              overlay={
                <Tooltip
                  id="tooltip-disabled"
                  bsPrefix="custom-tooltip"
                  style={{ position: "absolute" }}
                >
                  {list.takeCurrency}{" "}: {list.takeAmount?.toLocaleString()}
                </Tooltip>
              }
              placement="bottom"
            >
            You Give Amount: {list.takeCurrency}{" "}
            {list.takeAmount?.toLocaleString()}
            </OverlayTrigger>
          , You Get Amount:{" "}
          <OverlayTrigger
              overlay={
                <Tooltip
                  id="tooltip-disabled"
                  bsPrefix="custom-tooltip"
                  style={{ position: "absolute" }}
                >
                  {list.giveCurrency}: {list.giveAmount?.toLocaleString()}
                </Tooltip>
              }
              placement="bottom"
            >
            {list.giveCurrency} {list.giveAmount?.toLocaleString()}
            </OverlayTrigger>
          </h6> */}
          <h6 className="userinfo" style={{ margin: "0", position: "relative" }}>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="tooltip-take-amount" style={{ position: "absolute", marginLeft: "70px" }} bsPrefix="custom-tooltip">
                  {list.takeCurrency}: {list.takeAmount?.toLocaleString()}
                </Tooltip>
              }
            >
              <span>
                You Give Amount: {list.takeCurrency} {list.takeAmount?.toLocaleString()}
              </span>
            </OverlayTrigger>
            , You Get Amount:{" "}
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="tooltip-give-amount" style={{ position: "absolute" }} bsPrefix="custom-tooltip">
                  {list.giveCurrency}: {list.giveAmount?.toLocaleString()}
                </Tooltip>
              }
            >
              <span>
                {list.giveCurrency} {list.giveAmount?.toLocaleString()}
              </span>
            </OverlayTrigger>
          </h6>

          <h6 className="userinfo" style={{ margin: "0", textAlign: "start" }}>
            {list.location != "" && list.isAddressPublic
              ? `Address: ${list.location}`
              : null}
          </h6>
        </div>

        <div style={{  marginLeft: "10px" }}>
          <h6 className="userinfo text-nowrap" style={{ margin: "0", textAlign: "right", backgroundColor: "#eaeff8" }}>
            {list.areNumbersPublic == true
              ? `Phone: ${list.mobileCode} ${formatNumbers(
                list.mobileCode,
                list.mobile
              )},
                 Second Phone:
                ${list.phone != null
                ? list.phone != "" && list.phone.length > 7
                  ? `${list.phoneCode} ${formatNumbers(
                    list.phoneCode,
                    list.phone
                  )}`
                  : "NA"
                : "NA"
              }`
              : " "}
          </h6>

          <h6 className="userinfo" style={{ margin: "0", textAlign: "right" }}>
            {list.Profession != "" && list.isProfessionPublic
              ? `Profession: ${list.profession}`
              : null}
          </h6>

          {list.Website != "" && list.isWebsitePublic ? (
            <h6
              className="userinfo"
              style={{ margin: "0", textAlign: "right" }}
            >
              User Website: {list.website}
            </h6>
          ) : null}
        </div>
        <div>
          {props.isOrder ? null : (
            <Col md={2} style={{ textAlign: "center", display: "flex" }}>
              <div onClick={hideOverflow} className="d-flex align-items-center">
                <ReactToPrint
                  trigger={() => (
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute", zIndex: 7777 }}
                        >
                          Download chats
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <img
                        className="phoneimg"
                        src={download}
                        alt="download"
                      ></img>
                    </OverlayTrigger>
                  )}
                  content={() => ref.current}
                />

                <Button
                  style={{ width: "fit-content", height: "fit-content" }}
                  variant="outline-secondary"
                  onClick={() => {
                    navigate("/Tips");
                  }}
                >
                  Tips
                </Button>
              </div>
            </Col>
          )}
        </div>
      </div>

      <hr
        style={{
          color: "Gray",
          height: 1,
          margin: 0,
        }}
      />
      <div
        id="ChatBox"
        className={props.is1Fx ? "FXChatBox min_height_42vh" : "RegularChatBox"}
        style={{ flex: "1" }}
      >
        <div id="divToPrint" className="chattxt">
          {senmesglist.length > 0
            ? senmesglist.map((Task, key) =>
              Task.type == "message" ? (
                <>
                  {Task.time.split("T")[0] != undefined ? (
                    <>
                      {prevDate !=
                        new Date(Task.time.split("T")[0])
                          .toLocaleString()
                          .split(",")[0] ? (
                        <>
                          <div className="msgdatesap">
                            <span className="datetextcolor">
                              {new Date(Task.time.split("T")[0])
                                .toString()
                                .split(" ")[0] +
                                " " +
                                new Date(Task.time.split("T")[0])
                                  .toString()
                                  .split(" ")[1] +
                                " " +
                                new Date(Task.time.split("T")[0])
                                  .toString()
                                  .split(" ")[2] +
                                ", " +
                                new Date(Task.time.split("T")[0])
                                  .toString()
                                  .split(" ")[3]}
                            </span>
                          </div>
                        </>
                      ) : null}
                      {changePrevDate(
                        new Date(Task.time.split("T")[0])
                          .toLocaleString()
                          .split(",")[0]
                      )}
                    </>
                  )
                    :
                    (
                    <></>
                  )
                  }
                  {Task.filetype == "image" ? (
                    <div className="msgs" key={key}>
                      <Row style={Task.userId === uid ? styles.msgsap : null}>
                        {Task.userId === uid ? (
                          <a className="optiondotmsgs">
                            <img
                              src={options}
                              style={{
                                height: 16,
                                marginTop: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                opacity: 0.8,
                              }}
                            />
                          </a>
                        ) : null}
                        <div
                          className="msghover"
                          style={
                            Task.userId === uid ? styles.popup : styles.unpop
                          }
                        >
                          <img
                            className="selected-image1"
                            src={Task.img}
                            hidden={Task.image === ""}
                            style={{ width: "100px" }}
                            onClick={(e) => {
                              setModalImage(e.target.src);
                              setShowModal(true);
                            }}
                          />
                          <p
                            style={{
                              // marginBottom: "0px",
                              maxWidth: "100",
                              marginBottom: "0px",
                              overflowWrap: "anywhere",
                              padding: "0px ",
                              fontSize: 14,
                              fontWeight: 400,
                              color: "#444444",
                              lineHeight: 1.6,
                            }}
                          >
                            {Task.message}{" "}
                            <span
                              style={{
                                textAlign: "end",
                                fontStyle: "italic",
                                marginBottom: "0px",
                                marginTop: "10px",
                                marginLeft: "15px",
                                fontSize: "8px",
                                float: "right",
                                padding: "0px !important",
                              }}
                            >
                              {Task.stringTime}
                            </span>
                          </p>
                        </div>{" "}
                      
                      </Row>
                    </div>
                  ) : (
                    <div className="msgs" key={key}>
                      <Row style={Task.userId === uid ? styles.msgsap : null}>
                        <div
                          style={
                            Task.userId === uid ? styles.popup : styles.unpop
                          }
                        >
                          <div
                            style={{
                              margin: 0,
                              padding: 0,
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <div>
                              <div style={{ padding: 0 }}>
                                <img
                                  className="selected-imagepdf"
                                  src={Task.img}
                                />
                              </div>
                              <div
                                style={{
                                  alignItems: "flex-end",
                                  padding: 0,
                                  display: "flex",
                                }}
                              >
                                <p>{Task.filename}</p>
                              </div>
                            </div>
                            <div
                              style={{
                                alignItems: "center",
                                padding: 0,
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              <img
                                className="selected-imagedownload"
                                src={download}
                                onClick={() =>
                                  downloadPdf(Task.imageurl, Task.filename)
                                }
                              />
                            </div>
                          </div>
                          <p
                            style={{
                              // marginBottom: "0px",
                              maxWidth: "100",
                              overflowWrap: "anywhere",
                              padding: "0px ",
                              color: "#202020",
                            }}
                          >
                            {Task.message}
                          </p>
                          <p
                            style={{
                              textAlign: "end",
                              fontStyle: "italic",
                              marginBottom: "0px",
                              fontSize: "12px",
                              padding: "0px !important",
                            }}
                          >
                            {Task.stringTime}
                          </p>
                        </div>{" "}
                      </Row>
                    </div>
                  )}
                </>
              ) : null
            )
            : null}
          {senmesglist.length > 0 &&
            senmesglist[senmesglist.length - 1].isVisited &&
            senmesglist[senmesglist.length - 1].userId === uid && (
              <p style={{
                textAlign: "end", marginRight: "5px",
                color: "#BBBABA"
              }}><DoneAllIcon style={{ fontSize: "15px", marginRight: "2px" }} /><span style={{ fontSize: "12px" }}> Viewed</span></p>
            )}
          {/* <div  /> */}
        </div>
      </div>
      
      {
        showIceBreakingMessage & msg === "" &&
        <IceBreakingMessage
          setMsg={setMsg}
          setShowIceBreakingMessage={setShowIceBreakingMessage}
        />
      }
      {props.isOrder ? null : (
        <div className="rowmsg ">
          <Row
            className="prl d-flex"
            style={{
              marginBottom: "0px",
              marginLeft: "0.5px",
              alignItems: "flex-end",
            }}
          >
            <OverlayTrigger
              a
              overlay={
                <Tooltip id="tooltip-disabled">only pdf, jpg files</Tooltip>
              }
            >
              <div
                className="image-upload"
                style={{ flex: 1, padding: 2, marginTop: "inherit" }}
              >
                <label htmlFor={`file-input${list.chatRoomId}`}>
                  <img
                    className={
                      deactivatemsg == ""
                        ? "attachbtn"
                        : " sendbtnattachdiabled"
                    }
                    src={Attach}
                    alt="Attach"
                  ></img>
                </label>
                <input
                  id={`file-input${list.chatRoomId}`}
                  accept="image/*,application/pdf"
                  type="file"
                  style={{
                    flex: 1,
                    alignself: "center",
                    justifyContent: "space-between",
                  }}
                  disabled={deactivatemsg == "" ? false : true}
                  onChange={(e) => {
                    const imageFiles = e.target.files;
                    setShowSnippet(false);
                    let imageSrc = "";
                    setimagesource(imageFiles);
                    if (e.target.files[0].type == "application/pdf") {
                      imageSrc = pdfImage;
                    } else {
                      imageSrc = URL.createObjectURL(imageFiles[0]);
                    }
                    const previewId = e.target.id.substr("file-input".length);
                    setinputID(previewId);
                    document.getElementById(
                      `preview-selected-image${previewId}`
                    ).style.display = "block";
                    document.getElementById(`cross${previewId}`).style.display =
                      "block";
                    document.getElementById(
                      `preview${previewId}`
                    ).style.display = "inline-block";
                    document.getElementById(
                      `preview-selected-image${previewId}`
                    ).src = imageSrc;
                    document.getElementById(`divToPrint`).className =
                      "chattxtpreview";
                  }}
                ></input>
              </div>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip
                  id="tooltip-disabled"
                  bsPrefix="custom-tooltip"
                  style={{ position: "absolute" }}
                >
                  {islocationOn
                    ? "Your location is on"
                    : "Your location is turned off"}
                </Tooltip>
              }
              placement="top-start"
            >
              <div style={{ flex: 1, padding: 2, marginTop: "inherit" }}>
                <a>
                  <img
                    onClick={getlocation}
                    className={
                      deactivatemsg == ""
                        ? "attachbtn"
                        : " sendbtnattachdiabled"
                    }
                    src={Location}
                    disabled={deactivatemsg == "" ? false : true}
                    alt="Location"
                  ></img>
                </a>
              </div>
            </OverlayTrigger>

            <div
              style={{
                width: "100%",
                flex: 30,
                padding: "0px 15px 0px 0px ",
                background: deactivatemsg == "" ? "#fff" : "rgb(247 244 247)",
                borderRadius: 25,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="preview">
                <div id={`preview${list.chatRoomId}`}>
                  <span
                    id={`cross${list.chatRoomId}`}
                    style={{
                      width: "20px",
                      position: "relative",
                      zIndex: "1",
                      float: "right",
                      display: "none",
                    }}
                  >
                    <img
                      src={Cencle}
                      onClick={() => {
                        setimagesource("");
                        document.getElementById(
                          `preview-selected-image${inputID}`
                        ).style.display = "none";
                        document.getElementById(
                          `cross${inputID}`
                        ).style.display = "none";
                        document.getElementById(`divToPrint`).className =
                          "chattxt";
                        document.getElementById(
                          `preview${inputID}`
                        ).style.display = "block";
                        document.getElementById(`file-input${inputID}`).value =
                          null;
                      }}
                      style={{ width: "18px", cursor: "pointer" }}
                    />
                  </span>
                  <img
                    id={`preview-selected-image${list.chatRoomId}`}
                    className="selected-image"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ width: "95%" }}>
                  <textarea
                    onChange={(e) => setMsg(e.target.value)}
                    className={
                      deactivatemsg == ""
                        ? "message-input"
                        : "text-center message-input"
                    }
                    onKeyUp={(e) => {
                      if (e.target.value.slice(-1).charCodeAt(0) < 126) {
                        setShowEmojis(false);
                      }
                    }}
                    id="txtMsg"
                    onKeyPress={sendOnEnter}
                    value={deactivatemsg == "" ? msg : deactivatemsg}
                    disabled={deactivatemsg == "" ? false : true}
                    placeholder="Type a message"
                    // onFocus={(e) => {
                    //   //console.log(e);
                    // }}
                    onFocus={() => setShowIceBreakingMessage(true)}
                    // onBlur={() => setShowIceBreakingMessage(false)}
                  />
                  {/* <textarea id="messageInput" className="message-input" style={{
                height: "40px", lineHeight: "20px",
                fontSize: "16px", padding: "10px"
              }}></textarea> */}
                </div>
                <div style={{ width: "5%" }}>
                  <input
                    type="image"
                    src={emojiIcon}
                    className={
                      deactivatemsg == ""
                        ? "emoji-icon"
                        : " emoji-icon-disabled"
                    }
                    alt="Submit"
                    onClick={() => {
                      if (showEmojis) {
                        setShowEmojis(false);
                      } else {
                        setShowEmojis(true);
                      }
                    }}
                    disabled={deactivatemsg == "" ? false : true}
                  // style={{ width: '60%' }}
                  />
                </div>
              </div>
            </div>
            <div style={{ flex: 3, marginTop: "6px", padding: "8px", marginLeft: "-18px" }}>
              <input
                type="image"
                src={Send}
                className={
                  deactivatemsg == "" ? "sendbtn" : "  sendbtnattachdiabled"
                }
                alt="Submit"
                onClick={(e) => sendMsg(e)}
                disabled={deactivatemsg == "" ? false : true}
              ></input>
            </div>
          </Row>

          <div className="chatPrivate">
            <p style={{ fontSize: "12px", marginBottom: "0px" }}>
              This chat is private, unmoderated and cannot be edited. The chat
              exchange is taken as legally enforceable in many countries as a
              form of contract.
            </p>
          </div>
        </div>
      )}

      {showEmojis ? (
        <div className="emojiDiv" ref={emojiPickerRef}>
          <EmojiPicker onEmojiClick={onEmojiClick} height={400} width={300} />
        </div>
      ) : null}
    </>
  );
};

export default Message;