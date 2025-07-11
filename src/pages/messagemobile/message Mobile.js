import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { saveAs } from "file-saver";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../Context";
import { addDoc, apiHost, setDoc } from "../../Helper";
import SignalRService from "../../SignalR";
import Attach from "../../asstes/Attachbtn2.svg";
import Send from "../../asstes/Sendbtn.svg";
import Cencle from "../../asstes/back-button.png";
import download from "../../asstes/download1.svg";
import emojiIcon from "../../asstes/happy.png";
import Location from "../../asstes/locattionbtn2.svg";
import pdfImage from "../../asstes/pdf.svg";
// import Cencle from "../../asstes/cancel.png";
import { useNavigate } from "react-router-dom";
// import Pdf from "react-to-pdf";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ReactToPrint from "react-to-print-advanced";
import Profile from "../../asstes/Profile.svg";
import Offline from "../../asstes/offline.svg";
import Online from "../../asstes/online.svg";
import Stars from "../../asstes/rattingstar.svg";
const Message = (props) => {
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
  const [islocationOn, setIslocationOn] = useState("");
  const [onestar, setonestar] = useState(false);
  const [twostar, settwostar] = useState(false);
  const [threestart, setthreestart] = useState(false);
  const [fourstar, setfourstar] = useState(false);
  const [fivestart, setfivestart] = useState(false);
  const [imagesource, setimagesource] = useState([]);
  const [showSnippet, setShowSnippet] = useState(true);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const emojiPickerRef = useRef(null);
  const context = useContext(AppContext);

  const [displayDiv, setDisplay] = useState(1);

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
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojis(false);
      }
    };
  
    if (showEmojis) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojis]);

useEffect(() => {
  if (context.applicationStore.messages !== "") {
    setsenmsglist((prevList) => [...prevList, context.applicationStore.messages]);
  }
}, [context.applicationStore.messages]);

useEffect(() => {
  const watcher = navigator.geolocation.watchPosition(
    () => setIslocationOn(true),
    (error) => {
      if (error.code === error.PERMISSION_DENIED) setIslocationOn(false);
    }
  );
  return () => navigator.geolocation.clearWatch(watcher);
}, []);


  useEffect(() => {
    if (divRef.current) {
      document.getElementById("divToPrint-mobile").scrollTop =
        document.getElementById("divToPrint-mobile").scrollHeight;
    }
    if (senmesglist.length !== 0) {
      if (Object.keys(senmesglist[0]).length !== 0) {
        setSlipData({ ...props.ChatRoomData, messages: senmesglist });
      }
    }
  }, [senmesglist], props.ChatRoomData);

  useEffect(() => {
    setgivecurrency(props.GiveCurrency);
    settakecurrency(props.TakeCurrency);
  }, [], props.GiveCurrency);  

  const GetData = useCallback(() => {
    if (Object.keys(context.applicationStore.RoomData).length !== 0) {
      setlist(context.applicationStore.RoomData);
  
      const { deactivatedBy, selforderStatus, orderStatus, isOrder } = context.applicationStore.RoomData;
      if (deactivatedBy) {
        setDeactivatemsg("This user has ended the conversation.");
      } else if (selforderStatus === "hold") {
        setDeactivatemsg("You have paused this conversation. Remove order from Hold to continue chatting.");
      } else if (orderStatus === "hold") {
        setDeactivatemsg("This user has paused the conversation.");
      }
      setIsOrder(isOrder);
    }
  }, [context.applicationStore.RoomData]);

  useEffect(() => {
    GetData();
  }, [context.applicationStore.RoomData, GetData]);

  useEffect(() => {
    document.getElementById("previewDispaly").style.display = "block";
  }, [imagesource]);

  const getMessages = useCallback(async () => {
    if (!list.chatRoomId) return;
    
    try {
      const response = await axios.get(`${apiHost}/api/Chats/GetMsgs?ChatRoomId=${list.chatRoomId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
  
      const formattedMessages = response.data.messages.map((msg) => {
        let exactTime = msg.time.split("T")[1].split(":").slice(0, 2).join(":");
        return msg.image
          ? { ...msg, img: `${apiHost}/Messages/${msg.image}`, filetype: "image", stringTime: exactTime }
          : { ...msg, filetype: "text", stringTime: exactTime };
      });
  
      setsenmsglist(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [list]);
  useEffect(() => {
    getMessages();
  }, [list, getMessages]);
  

  function getlocation() {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(function (position) {
            fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`,
              { method: "GET" }
            )
              .then((res) => res.json())
              .then((data) => setMsg(data.display_name))
              .catch((err) => console.log(err));
          });
          //console.log("Avaiable");
        } else {
          setLocationerr("Please Turn on Your Location");
          setTimeout(() => {
            setLocationerr("");
          }, 3000);
        }
      });
  }

  const sendMsg = async (e) => {
    // e.preventDefault();
    if (msg !== "" || imagesource != []) {
      setShowSnippet(true);
      let filepath = "";
      let url = "";
      if (imagesource.length !== 0) {
        const file = imagesource[0].name;
        filepath = file;
       
        url = await toBase64(imagesource[0]);
      }
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
        document.getElementById("previewDispaly").style.display = "none";
        let time = new Date().toISOString();
        let msgs = {};
        let exactTime =
          new Date().toTimeString().split(" ")[0].split(":")[0] +
          ":" +
          new Date().toTimeString().split(" ")[0].split(":")[1];
        if (res.msg.image !== "") {
          if (res.msg.image.substr(-4) === ".pdf") {
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
        setsenmsglist(newArr);
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
      if (inputID !== "") {
        document.getElementById(`cross${inputID}`).style.display = "none";
        document.getElementById(
          `preview-selected-image${inputID}`
        ).style.display = "none";
        document.getElementById(`preview${inputID}`).style.display = "block";
      }
      setShowSnippet(false);
    }
  };

  

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      var blob = new Blob([file], { type: "application/octet-binary" });
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  
  const styles = {
    popup: {
      margin: "5px",
      backgroundColor: "#94e2ff",
      color: "#076b91",
      lineHeight: "1.5",
      borderRadius: "15px 15px 0px 15px",
      // boxShadow: " -2px 1px 6px #00000026",
      width: "fit-content",
      padding: "7px 13px",
      marginBottom: "5px",
      fontSize: "14px",
      fontWeight: "500",
      maxWidth: "55%",
    },
    unpop: {
      margin: "5px",
      backgroundColor: "#fff",
      color: "#606060",
      lineHeight: "1.5",
      borderRadius: "0px 15px 15px 15px",
      width: "fit-content",
      padding: "7px 13px",
      fontSize: "14px",
      fontWeight: "500",
      maxWidth: "55%",
    },
    msgsap: {
      justifyContent: "end",
      display: "flex",
    },
    msgpad: {
      paddingLeft: "10px",
    },
  };

  let prevDate = "";
  const changePrevDate = (dateString) => {
    prevDate = dateString;
  };

  const onEmojiClick = (event, emojiObject) => {
    
    setMsg(msg + event.emoji);
  };

  const downloadPdf = (img, name) => {
    saveAs(img, name);
  };

  const sendOnEnter = (e) => {
    if (e.charCode === 13 && !e.shiftKey) {
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
    }
  }, [transcriptOverflow]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div
      className="UserPageScrollStyle"
      style={{
        position: "relative",
        height: "84%",
        width: "100%",
        // display: "flex",
      }}
    >
      <Row style={{ flex: 1 }}>
        <div
          className="msgside"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            className="d-flex align-items-center justify-content-between mx-4"
            style={{
              padding: "5px 0px",
            }}
          >
            <div className="d-flex align-items-center">
              {list.isMC ? (
                <div className="notranslate">
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{ position: "absolute" }}
                      >
                        Money Changer
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <p
                      className="batchFinalize notranslate"
                      style={{
                        marginTop: "19px",
                        marginLeft: "7px",
                        width: "44px",
                        borderRadius: "7px",
                        textAlign: "center",
                      }}
                    >
                      MC
                    </p>
                  </OverlayTrigger>
                </div>
              ) : (
                <></>
              )}
              {list.isMC && list.areYouan === "Individual" ? (
                <div className="notranslate">
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{ position: "absolute" }}
                      >
                        Money Changer Individual
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <p
                      className="batchIndividualFinalize notranslate"
                      style={{
                        marginTop: "19px",
                        marginLeft: "7px",
                        width: "44px",
                        borderRadius: "7px",
                        textAlign: "center",
                      }}
                    >
                      MC - I
                    </p>
                  </OverlayTrigger>
                </div>
              ) : (
                <></>
              )}
              {list.isMC && list.areYouan === "Corporation" ? (
                <div className="notranslate">
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{ position: "absolute" }}
                      >
                        Money Changer Corporation
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <p
                      className="batchIndividualFinalize notranslate"
                      style={{
                        marginTop: "19px",
                        marginLeft: "7px",
                        width: "44px",
                        borderRadius: "7px",
                        textAlign: "center",
                      }}
                    >
                      MC - C
                    </p>
                  </OverlayTrigger>
                </div>
              ) : (
                <></>
              )}
                {!list.isMC && list.areYouan === "Corporation" ? (
                <div className="notranslate">
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{ position: "absolute" }}
                      >
                        Corporation
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <p
                      className="batchIndividualFinalize notranslate"
                      style={{
                        marginTop: "19px",
                        marginLeft: "7px",
                        width: "44px",
                        borderRadius: "7px",
                        textAlign: "center",
                      }}
                    >
                      Corp
                    </p>
                  </OverlayTrigger>
                </div>
              ) : (
                <></>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <OverlayTrigger
                  a
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      Expect time delay in updation.
                    </Tooltip>
                  }
                >
                  {context.applicationStore.OnlineUsers[list.userid] ? (
                    <img
                    alt=""
                      style={{
                        width: "12px",
                        position: "absolute",
                        marginTop: "24px",
                        marginLeft: "28px",
                      }}
                      src={Online}
                    />
                  ) : (
                    <img
                    alt=""
                      style={{
                        width: "12px",
                        position: "absolute",
                        marginTop: "24px",
                        marginLeft: "28px",
                      }}
                      src={Offline}
                    />
                  )}
                </OverlayTrigger>
                <img
                  style={{
                    borderRadius: "35px",
                    borderWidth: 1,
                    borderColor: "#191ebb",
                    background: "#2995be",
                  }}
                  className="profilrpic"
                  src={
                    list.storageImage !== "" && list.picAvailability
                      ? list.storageImage
                      : list.image !== "" && list.picAvailability
                      ? list.image
                      : Profile
                  }
                  alt="Profile"
                />
              </div>
              <div className="userNameStars col-12">
                <h6 className="notranslate" style={{ margin: 3 }}>
                  {list.username}
                </h6>
                <Row style={{ position: "relative" }}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{ position: "absolute", zIndex: 999 }}
                      >
                        {list.reviewScore} reviews
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <Col md={12}>
                      <img
                        // id={`${list.ID}-star-1`}
                        // onClick={(e) => rating(e, 1)}
                        className={
                          list.reviewScore >= 1
                            ? "rating-fill"
                            : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                        // id={`${list.ID}-star-2`}
                        // onClick={(e) => rating(e, 2)}
                        className={
                          list.reviewScore >= 2
                            ? "rating-fill"
                            : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                      
                        className={
                          list.reviewScore >= 3
                            ? "rating-fill"
                            : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                       
                        className={
                          list.reviewScore >= 4
                            ? "rating-fill"
                            : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                       
                        className={
                          list.reviewScore >= 5
                            ? "rating-fill"
                            : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                    </Col>
                  </OverlayTrigger>
                </Row>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                // alignItems: "center",
                flexDirection:"column",
                marginRight: "8px",
              }}
            >
              <div className="ml-2 mt-1">
                <img
                alt=""
                  src={Cencle}
                  className="cancelimg"
                  onClick={() => {
                    props.setshowChatpage(false);
                  }}
                />
              </div>
              {isOrder ? null : (
                <div
                  onClick={hideOverflow}
                  className="d-flex align-items-center"
                >
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
                    style={{ width: "48px", height: "32px", lineHeight: "2px" }}
                    variant="outline-secondary"
                    onClick={() => {
                      navigate("/Tips");
                    }}
                  >
                    Tips
                  </Button>
                </div>
              )}
              
            </div>
          </div>

        
          <div
            className="userinfoRow mt-2"
            style={{ alignItems: "center", flexDirection: "column" }}
          >
            <Col>
              <h6 className="userinfo-mobile" style={{ margin: "0",background:"#eaeff8" }}>
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

              <h6 className="userinfo-mobile" style={{ margin: "0",background:"#eaeff8" }}>
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
              <h6 className="userinfo-mobile" style={{ margin: "0" }}>
                You Give Amount: {list.takeCurrency}{" "}
                {list.takeAmount?.toLocaleString()}, You Get Amount:{" "}
                {list.giveCurrency} {list.giveAmount?.toLocaleString()}
              </h6>

              <h6 className="userinfo-mobile" style={{ margin: "0",background:"#eaeff8", textAlign: "start" }}>
                {list.location !== "" && list.isAddressPublic
                  ? `Address: ${list.location}`
                  : null}
              </h6>
              <h6 className="userinfo-mobile" style={{ margin: "0",background:"#eaeff8" }}>
                {list.areNumbersPublic === true
                  ? `Phone: ${list.mobileCode} ${formatNumbers(
                      list.mobileCode,
                      list.mobile
                    )}`
                  : " "}
              </h6>
              <h6 className="userinfo-mobile" style={{ margin: "0",background:"#eaeff8" }}>
                {list.areNumbersPublic === true
                  ? `Second Phone:${
                      list.phone !== null
                        ? list.phone !== "" && list.phone.length > 7
                          ? `  ${list.mobileCode} ${formatNumbers(
                              list.mobileCode,
                              list.mobile
                            )}`
                          : "NA"
                        : "NA"
                    }`
                  : ""}
              </h6>
              <h6 className="userinfo-mobile" style={{ margin: "0" }}>
                {list.Profession !== "" && list.isProfessionPublic
                  ? `Profession: ${list.profession}`
                  : null}
              </h6>

              {list.Website !== "" && list.isWebsitePublic ? (
                <h6
                  className="userinfo-mobile"
                  style={{ margin: "0" }}
                >
                  User Website: {list.website}
                </h6>
              ) : null}
            </Col>
           
          </div>
          {isOrder ? null : (
            <>
              <hr
                style={{
                  color: "Gray",
                  height: 1,
                  margin: 0,
                }}
              />
              <div className={props.is1Fx ? "" : "upperDivMsg"}>
                <div
                  id="divToPrint-mobile"
                  className={
                    props.is1Fx ? "chattxtmobile-1fx" : "chattxtmobile"
                  }
                >
                  {senmesglist.length > 0
                    ? senmesglist.map((Task, key) =>
                        Task.type === "message" ? (
                          <>
                            {Task.time !== undefined ? (
                              <>
                                {prevDate !==
                                new Date(Task.time)
                                  .toLocaleString()
                                  .split(",")[0] ? (
                                  <>
                                    <div className="msgdatesap-mobile">
                                      <span className="datetextcolor">
                                        {new Date(Task.time)
                                          .toString()
                                          .split(" ")[0] +
                                          " " +
                                          new Date(Task.time)
                                            .toString()
                                            .split(" ")[1] +
                                          " " +
                                          new Date(Task.time)
                                            .toString()
                                            .split(" ")[2] +
                                          ", " +
                                          new Date(Task.time)
                                            .toString()
                                            .split(" ")[3]}
                                      </span>
                                    </div>
                                  </>
                                ) : null}
                                {changePrevDate(
                                  new Date(Task.time)
                                    .toLocaleString()
                                    .split(",")[0]
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                            {Task.filetype === "image" ? (
                              <div className="msgs" key={key}>
                                <div
                                  style={
                                    Task.userId === uid
                                      ? styles.msgsap
                                      : styles.msgpad
                                  }
                                >
                                  <div
                                    style={
                                      Task.userId === uid
                                        ? styles.popup
                                        : styles.unpop
                                    }
                                  >
                                    <img
                                    alt=""
                                      className="selected-image1"
                                      src={Task.img}
                                      hidden={Task.image === ""}
                                    />
                                    <p
                                      style={{
                                        // marginBottom: "0px",
                                        maxWidth: "100",
                                        marginBottom: "0px",
                                        overflowWrap: "anywhere",
                                        padding: "0px ",
                                        fontSize: 12,
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
                                </div>
                              </div>
                            ) : (
                              <div className="msgs" key={key}>
                                <div
                                  style={
                                    Task.userId === uid
                                      ? styles.msgsap
                                      : styles.msgpad
                                  }
                                >
                                  <Row
                                    style={
                                      Task.userId === uid
                                        ? styles.popup
                                        : styles.unpop
                                    }
                                  >
                                    <Row style={{ margin: 0, padding: 0 }}>
                                      <Col style={{ padding: 0 }}>
                                        <img
                                        alt=""
                                          className="selected-imagepdf"
                                          src={Task.img}
                                        />
                                      </Col>
                                      <Col
                                        style={{
                                          alignItems: "flex-end",
                                          padding: 0,
                                          display: "flex",
                                        }}
                                      >
                                        <p>{Task.filename}</p>
                                      </Col>
                                      <Col
                                        style={{
                                          alignItems: "flex-end",
                                          padding: 0,
                                          display: "flex",
                                          justifyContent: "right",
                                        }}
                                      >
                                        <img
                                        alt=""
                                          className="selected-imagedownload"
                                          src={download}
                                          onClick={() =>
                                            downloadPdf(
                                              Task.imageurl,
                                              Task.filename
                                            )
                                          }
                                        />
                                      </Col>
                                    </Row>
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
                                  </Row>{" "}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="msgs" key={key}>
                            {Task.time !== undefined ? (
                              <>
                                {prevDate !==
                                new Date(Task.time.seconds * 1000)
                                  .toLocaleString()
                                  .split(",")[0] ? (
                                  <>
                                    <div className="msgdatesap">
                                      <span className="datetextcolor">
                                        {new Date(Task.time.seconds * 1000)
                                          .toString()
                                          .split(" ")[0] +
                                          " " +
                                          new Date(Task.time.seconds * 1000)
                                            .toString()
                                            .split(" ")[1] +
                                          " " +
                                          new Date(Task.time.seconds * 1000)
                                            .toString()
                                            .split(" ")[2] +
                                          ", " +
                                          new Date(Task.time.seconds * 1000)
                                            .toString()
                                            .split(" ")[3]}
                                      </span>
                                    </div>
                                  </>
                                ) : null}
                                {changePrevDate(
                                  new Date(Task.time.seconds * 1000)
                                    .toLocaleString()
                                    .split(",")[0]
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                            <Row
                              style={Task.userId === uid ? styles.msgsap : null}
                            >
                              <Row
                                style={
                                  Task.userId === uid
                                    ? styles.popup
                                    : styles.unpop
                                }
                              >
                                <img
                                alt=""
                                  className="selected-image1"
                                  src={Task.img}
                                  hidden={Task.img === ""}
                                />

                                <p
                                  style={{
                                    // marginBottom: "0px",
                                    maxWidth: "100",
                                    marginBottom: "0px",
                                    overflowWrap: "anywhere",
                                    padding: "0px ",
                                    fontSize: 12,
                                    fontWeight: 400,
                                    color: "#444444",
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {Task.message}
                                 
                                </p>
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
                              </Row>
                            </Row>
                          </div>
                        )
                      )
                    : null}
                  {senmesglist.length > 0 &&
                    senmesglist[senmesglist.length - 1].isVisited &&
                    senmesglist[senmesglist.length - 1].userId === uid && (
                      <p
                        style={{
                          textAlign: "end",
                          marginRight: "5px",
                          color: "#BBBABA",
                        }}
                      >
                        <DoneAllIcon
                          style={{ fontSize: "15px", marginRight: "2px" }}
                        />
                        <span style={{ fontSize: "12px" }}> Viewed</span>
                      </p>
                    )}
                  <div ref={divRef} />
                </div>
              </div>

              {showEmojis ? (
                <div className="emojiDivMobile">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    height={400}
                    width={300}
                  />
                </div>
              ) : null}

              <div className="rowMsgM">
                <div
                  className="prl d-flex"
                  style={{
                    marginBottom: "0px",
                    marginLeft: "-7px",
                    alignItems: "flex-end",
                    padding: "0px 15px",
                  }}
                >
                  <OverlayTrigger
                    a
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        only pdf, jpg files
                      </Tooltip>
                    }
                  >
                    <div
                      className="image-upload"
                      style={{ flex: 1, padding: 2, marginTop: "inherit" }}
                    >
                      <label htmlFor={`file-input${props.UniqueId}`}>
                        <img
                          className={
                            deactivatemsg === ""
                              ? "attachbtn-mobile"
                              : " sendbtnattachdiabled"
                          }
                          src={Attach}
                          alt="Attach"
                        ></img>
                      </label>
                      <input
                        className="previewTheDiv"
                        id={`file-input${props.UniqueId}`}
                        accept="image/*,application/pdf"
                        type="file"
                        style={{
                          flex: 1,
                          alignself: "center",
                          justifyContent: "space-between",
                        }}
                        disabled={deactivatemsg === "" ? false : true}
                        onChange={(e) => {
                          const imageFiles = e.target.files;
                          setShowSnippet(false);
                          let imageSrc = "";
                          setimagesource(imageFiles);
                          if (e.target.files[0].type === "application/pdf") {
                            imageSrc = pdfImage;
                          } else {
                            imageSrc = URL.createObjectURL(imageFiles[0]);
                          }
                          const previewId = e.target.id.substr(
                            "file-input".length
                          );
                          setinputID(previewId);
                          document.getElementById(
                            `preview-selected-image${previewId}`
                          ).style.display = "block";
                          document.getElementById(
                            `cross${previewId}`
                          ).style.display = "block";
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
                    a
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        {islocationOn
                          ? "Your location is on"
                          : "Your location is turned off"}
                      </Tooltip>
                    }
                  >
                    <div style={{ flex: 1, padding: 2, marginTop: "inherit" }}>
                      <a>
                        <img
                          onClick={getlocation}
                          className={
                            deactivatemsg === ""
                              ? "attachbtn-mobile"
                              : " sendbtnattachdiabled"
                          }
                          src={Location}
                          disabled={deactivatemsg === "" ? false : true}
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
                      background:
                        deactivatemsg === "" ? "#fff" : "rgb(247 244 247)",
                      borderRadius: 25,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="preview" id="previewDispaly">
                      <div id={`preview${props.UniqueId}`}>
                        <span
                          id={`cross${props.UniqueId}`}
                          style={{
                            width: "20px",
                            position: "relative",
                            zIndex: "1",
                            float: "right",
                            display: "none",
                          }}
                        >
                          <img
                          alt=""
                            src={Cencle}
                            onClick={() => {
                              setimagesource("");
                              const inputField = document.getElementById(`file-input${inputID}`);
                              if (inputField) {
                                inputField.value = null;
                              }
                              document.getElementById(`preview-selected-image${inputID}`).style.display = "none";
                              document.getElementById(`cross${inputID}`).style.display = "none";
                              document.getElementById("divToPrint").className = "chattxt";
                              document.getElementById(`preview${inputID}`).style.display = "block";
                              document.getElementById("previewDispaly").style.display = "block";
                            }}
                            style={{ width: "18px", cursor: "pointer" }}
                          />
                        </span>
                        <img
                        alt=""
                          id={`preview-selected-image${props.UniqueId}`}
                          className="selected-image"
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "95%" }}>
                        <input
                          onChange={(e) => setMsg(e.target.value)}
                          className={
                            deactivatemsg === ""
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
                          value={deactivatemsg === "" ? msg : deactivatemsg}
                          disabled={deactivatemsg === "" ? false : true}
                          placeholder="Type a message"
                          onFocus={(e) => {
                            //console.log(e);
                          }}
                        />
                      </div>
                      <div style={{ width: "5%" }}>
                        <input
                          type="image"
                          src={emojiIcon}
                          className={
                            deactivatemsg === ""
                              ? "emoji-icon-mobile"
                              : " emoji-icon-disabled-mobile"
                          }
                          alt="Submit"
                          onClick={() => {
                            if (showEmojis) {
                              setShowEmojis(false);
                            } else {
                              setShowEmojis(true);
                            }
                          }}
                          disabled={deactivatemsg === "" ? false : true}
                          // style={{ width: '60%' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 3,
                      marginTop: "2px",
                      padding: "2px",
                      marginLeft: "-22px",
                    }}
                  >
                    <input
                      type="image"
                      src={Send}
                      className={
                        deactivatemsg === "" ? "sendbtn" : " sendbtndiabled"
                      }
                      alt="Submit"
                      onClick={deactivatemsg === "" && sendMsg}
                      disabled={deactivatemsg === "" ? false : true}
                      // style={{ width: '60%' }}
                    ></input>
                  </div>
                </div>

                <div className="chatPrivate" style={{ padding: "5px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      marginBottom: "0px",
                      paddingLeft: "10px",
                    }}
                  >
                    This chat is private, unmoderated and cannot be
                    edited.Please note that the chat is taken as legally
                    enforceable in many countries as a form of contract.
                  </p>
                </div>
              </div>
            </>
          )}

          {showEmojis ? (
            <div className="emojiDivMobile" ref={emojiPickerRef}>
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                height={400}
                width={300}
              />
            </div>
          ) : null}
        </div>
      </Row>
    </div>
  );
};

export default Message;
