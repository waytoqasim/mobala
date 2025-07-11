import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import Greyflag from "../../asstes/gray flag.svg";
import Offline from "../../asstes/offline.svg";
import Online from "../../asstes/online.svg";
import Profile from "../../asstes/Profile.svg";
import Stars from "../../asstes/rattingstar.svg";
import Redflag from "../../asstes/red flag.svg";
import GreenCheck from "../../asstes/success-green-check-mark-icon.webp";
import { AppContext } from "../../Context";
import { addDoc, apiHost, InviteStatuses, setDoc } from "../../Helper";
import SignalRService from "../../SignalR";
import Switch from "../Switch";
let starId = "";

const labels = {
  left: {
    title: "Sort By Distance",
    value: "left",
  },
  right: {
    title: "Sort By FX Rate",
    value: "right",
  },
  center: {
    title: "",
    value: "center",
  },
};

const User = (props) => {
  const [usersList, setUsersList] = useState([]);
  const [matchList, setMatchList] = useState([]);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [online, setonline] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalReview, setShowModalReview] = useState(false);
  const [showModalReport, setShowModalReport] = useState(false);
  const [showModalSubmit, setShowModalSubmit] = useState(false);
  const [showModalThanks, setShowModalThanks] = useState(false);
  const [hideTextArea, setHideTextArea] = useState(false);
  const [userLength, setUserLength] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [UniqueID, setUniqueID] = useState("");
  const [divID, setdivID] = useState(" ");
  const [userId, setUserId] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [starFill, setstarFill] = useState(0);
  const context = useContext(AppContext);
  const [threeDot, setThreeDot] = useState(false);
  const [threeDotDoc, setThreeDotDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rates, setRates] = useState(false);
  const [value, setValue] = React.useState(false);

  const dotStateRef = useRef(threeDot);
  const dotDocStateRef = useRef(threeDotDoc);
  const selectedUser = useRef("");

  const handleClick = (index) => {
    const selected = usersList[index];
    setUsersList([selected, ...usersList.filter((item, i) => i !== index)]);
    setdivID(context.applicationStore.messages.chatroomId);
  };

  useEffect(() => {
    //console.log(context.applicationStore.OnlineUsers)
  }, [context.applicationStore.OnlineUsers]);

  useEffect(() => {
    if (context.applicationStore.UserListData != undefined) {
      if (
        context.applicationStore.UserListData != "" &&
        Object.keys(context.applicationStore.UserListData).length != 0
      ) {
        const index = usersList.findIndex(
          (item) =>
            item.chatRoomId === context.applicationStore.UserListData.chatRoomId
        );
        const newList = [...usersList];
        if (index != -1) {
          newList[index]["isVisited"] = true;
        }
        // console.log("new listtt", newList);
        setUsersList(newList);
      }
    }
  }, [context.applicationStore.UserListData]);

  useEffect(() => {
    //console.log("list changed");
  }, [usersList]);

  const click = () => {
    document.addEventListener("click", function (event) {
      if (dotStateRef.current && event.target.id !== "threeDotsButton") {
        try {
          dotDocStateRef.current.target.click();
          // setThreeDot(false);
          dotDocStateRef.current = null;
        } catch (E) {
          //console.log(E);
        }
      }
    });
  };

  useEffect(() => {
    dotStateRef.current = threeDot;
  }, [threeDot]);
  useEffect(() => {
    dotDocStateRef.current = threeDotDoc;
  }, [threeDotDoc]);
  useEffect(() => {
    click();
    return () => {
      document.removeEventListener("click", function (event) {
        if (dotStateRef.current && event.target.id !== "threeDotsButton") {
          dotDocStateRef.current.target.click();
          setThreeDot(false);
        }
      });
    };
  }, []);

  useEffect(() => {
    //console.log("usersList");
    //console.log(usersList);
  }, [usersList]);

  useEffect(() => {
    // setUID(window.location.search.split("&")[0].split("=")[1]);
    getRates();
    let x = sessionStorage.getItem("logedin");
    if (x === "true") {
      setonline(true);
    } else {
      setonline(false);
    }
  }, [null]);

  const deleteUser = (ChatRoomId, orderId, usersLength) => {
    //delete user chat and their data
    let data = { ChatRoomId: ChatRoomId };
    let url_1 = `${apiHost}/api/Chats/RemoveChatRooms?RoomID=${ChatRoomId}&UserId=${uid}&OrderId=${orderId}&Count=${usersLength}&MakeCompleted=${false}`;
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

  const getData = () => {
    setdivID("");
    let usersList = [];
    const uniqueIds = new Set();
    props.chatdocList.forEach(async (roomData) => {
      if(!uniqueIds.has(roomData.chatRoomId))
      {
        uniqueIds.add(roomData.chatRoomId)
        let image = roomData.profileimagepath;
        if (image == "") {
          usersList.push({
            ...roomData,
            storageImage: "",
            isMatch: false,
            isInvite: false,
          });
        } else {
          let url = `${apiHost}/Images/${image}`;
          usersList.push({
            ...roomData,
            storageImage: url,
            isMatch: false,
            isInvite: false,
          });
        }
        // console.log(usersList);
        setUsersList(usersList);
        
      }
    });
  };
  function getDataOnMatchList() {
    if (props.is1Fx) {
      let matchListing = [];
      props.MatchList.forEach(async (matchData) => {
        if (matchData.isAccepted || matchData.inviteStatus == "Accepted") {
        } else {
          let image = matchData.profileimagepath;
          if (image == "" || image == null) {
            matchListing.push({ ...matchData, storageImage: "" });
          } else {
            let url = `${apiHost}/Images/${image}`;
            matchListing.push({ ...matchData, storageImage: url });
          }
        }
      });
      // console.log("matchList=>", matchListing);
      sortByDistance_([...matchListing]);
    }
  }

  const hideModal = () => {
    debugger
    setShowModal(false);
    setShowModalReport(false);
    setShowModalSubmit(false);
    setShowModalThanks(false);
    setShowModalReview(false);
  };
  useEffect(() => {
    setUsersList([]);
    getData();
  }, [props.chatdocList]);

  useEffect(() => {
    getDataOnMatchList();
  }, [props.MatchList]);
  useEffect(() => {
    usersList.forEach((d, i) => {
      if (d != undefined) {
        if (d.chatRoomId != divID) {
          document.getElementById(
            d.chatRoomId + ":" + d.userid + ":" + i
          ).className = "unselecteduser";
        } else {
          document.getElementById(
            d.chatRoomId + ":" + d.userid + ":" + i
          ).className = "selecteduser";
        }
      }
    });
    if (props.is1Fx) {
      matchList.forEach((d, i) => {
        if (d.orderId != divID) {
          document.getElementById(
            d.orderId + ":" + d.userid + ":" + i
          ).className = "unselecteduser";
        } else {
          document.getElementById(
            d.orderId + ":" + d.userid + ":" + i
          ).className = "selecteduser";
        }
      });
    }
  }, [divID]);

  const reportClicked = (message) => {
    setReportMessage("");
    setHideTextArea(false);
    if (message != "Something Else") {
      setReportMessage(message);
      setHideTextArea(true);
    }
    setShowModalReport(false);
    setShowModalSubmit(true);
  };

  const reportSubmit = () => {
    //console.log(userId);
    //console.log(divID);
    setDoc("reportUser", {
      userId: uid,
      reportedUserId: userId,
      message: reportMessage,
    });

    setShowModalSubmit(false);
    // setShowModalThanks(true);
    // window.location.reload();
  };

  const handleReview = () => {
    setDoc("updateReview", {
      reviewedUserId: userId,
      score: starFill,
      userId: uid,
    });
    setShowModalReview(false);
  };

  const acceptInvite = (e, data) => {
    setIsLoading(true);
    e.target.disabled = true;
    setDoc("updateInviteStatus", {
      DocId: props.orderId,
      SentToId: uid,
      SelfDocId: data.orderId,
      SenderId: data.userid,
      Status: "Accepted",
    }).then(() => {
      addDoc(`addNotification`, {
        description: `${sessionStorage.getItem(
          "UserName"
        )} has accepted your invite for order ${props.orderId}`,
        type: "acceptinvite",
        visited: false,
        senderId: uid,
        sentToId: data.userid,
      });
      SignalRService.sendNotification(
        data.userid,
        `${sessionStorage.getItem(
          "UserName"
        )} has accepted your invite for order ${props.orderId}`,
        "acceptinvite"
      );
      setIsLoading(false);
      window.location.reload();
      context.dispatch({ Type: "NAVIGATION" });
    });
  };

  useEffect(() => {
    if (
      context.applicationStore.messages != "" &&
      Object.keys(context.applicationStore.messages).length != 0
    ) {
      const index = usersList.findIndex(
        (item) =>
          item.chatRoomId === context.applicationStore.messages.chatroomId
      );
      if (context.applicationStore.messages.userId != uid) {
        const newList = [...usersList];
        if (index != -1) {
          newList[index]["isVisited"] = false;
        }
        setUsersList(newList);
      }
      handleClick(index);
    }
  }, [context.applicationStore.messages]);

  const sortByFxRate = () => {
    //use this to sort users by FXrate
    if (matchList.length > 0) {
      let active = [...matchList];
      //console.log("active=>", active);
      active.forEach((d) => {
        let g = rates.filter((x) => x.name == d.giveCurrency)[0];
        let t = rates.filter((x) => x.name == d.takeCurrency)[0];
        let giveOrig = g["rates"] / t["rates"];
        let giveRate = d.giveAmount / d.takeAmount;
        d["fxRate"] = giveOrig - giveRate;
      });
      active.sort(function (a, b) {
        return a.fxRate - b.fxRate;
      });
      setMatchList(active);
    }
    //console.log(active);
  };

  const sortByDistance_ = (data) => {
    //use this to sort users by distance
    if (data.length > 0) {
      let active = [...data];

      active.sort(function (a, b) {
        return parseInt(a.takecitydistance) - parseInt(b.takecitydistance);
      });
      // console.log(active);
      setMatchList(active);
    }
  };

  const sortByDistance = () => {
    //use this to sort users by distance
    if (matchList.length > 0) {
      let active = [...matchList];

      // console.log("MATCH LIST");
      // console.log(matchList);
      active.sort(function (a, b) {
        return parseInt(a.takecitydistance) - parseInt(b.takecitydistance);
      });
      // console.log(active);
      setMatchList(active);
    }
  };

  const getRates = () => {
    //use this function to get rates of order
    let url = `${apiHost}/api/Rates/FetchRate`;
    axios.get(url).then((response) => {
      setRates(response.data.rates);
    });
  };

  useEffect(() => {
    if (value) {
      sortByFxRate();
    } else {
      sortByDistance();
    }
  }, [value]);

  // useEffect(() => {
  //   console.log("after=>");
  //   matchList.forEach((x) => {
  //     console.log(x.takecitydistance);
  //   });
  //   // sortByDistance()
  // }, [matchList]);

  return (
    <div
      // style={{
      //   position: "relative",
      //   height: "100%",
      //   overflowY: "auto",
      //   width: "100%",
      // }}
    >
      <div style={{ position: "absolute", width: "100%",height:"85vh",overflowX:"hidden" }}>
        {props.is1Fx ? (
          <div style={{ marginLeft: 0, marginRight: 0 }}>
            <p
              className="chatAvailabilityOrderFX"
              style={{
                // textAlign: "center",
                // fontSize: 10,
                padding: "5px",
                marginBottom: 0,
                maxHeight: "3rem",
                minHeight: "3rem",
              }}
            >
              Matches near you; Negotiate your deal now{" "}
            </p>
            <div
              style={{
                height: "1px",
                width: "100%",
                background: "rgb(223, 223, 223)",
              }}
            ></div>
          </div>
        ) : null}

        {usersList.length > 0
          ? usersList.map((Task, key) =>
              Task != undefined ? (
                <div key={key}>
                  <div
                    id={Task.chatRoomId + ":" + Task.userid + ":" + key}
                    ref={selectedUser}
                    style={{ padding: "17px 4px" }}
                    className="unselecteduser"
                    onClick={(e) => {
                      const previewId = e.currentTarget.id;
                      if (props.is1Fx) {
                        props.setisOrder(false);
                        props.setOrderId("");
                      }
                      props.setChatID(previewId.split(":")[1]);
                      props.setChatRoomID(previewId.split(":")[0]);
                      props.setselectedUser(usersList[previewId.split(":")[2]]);
                      setdivID(previewId.split(":")[0]);
                      setUserLength(usersList.length);
                    }}
                  >
                    <Modal show={showModalReview} onHide={hideModal} size="md">
                      <Modal.Header style={{ display: "block" }}>
                        <Modal.Title
                          className="text-center"
                          style={{ fontSize: 18, textAlign: "center" }}
                        >
                          Review User
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h5>
                          Based on trust and ease of communication, how much do
                          you want to rate this user?
                        </h5>
                        <Row className="mt-2" style={{ textAlign: "center" }}>
                          <Col>
                            <img
                              className={
                                starFill >= 1
                                  ? "modal-rating-fill"
                                  : "modal-rating-unfill"
                              }
                              src={Stars}
                              onClick={() => setstarFill(1)}
                              alt="Stars"
                            />
                            <img
                              className={
                                starFill >= 2
                                  ? "modal-rating-fill"
                                  : "modal-rating-unfill"
                              }
                              src={Stars}
                              onClick={() => setstarFill(2)}
                              alt="Stars"
                            />
                            <img
                              className={
                                starFill >= 3
                                  ? "modal-rating-fill"
                                  : "modal-rating-unfill"
                              }
                              src={Stars}
                              onClick={() => setstarFill(3)}
                              alt="Stars"
                            />
                            <img
                              className={
                                starFill >= 4
                                  ? "modal-rating-fill"
                                  : "modal-rating-unfill"
                              }
                              src={Stars}
                              onClick={() => setstarFill(4)}
                              alt="Stars"
                            />
                            <img
                              className={
                                starFill >= 5
                                  ? "modal-rating-fill"
                                  : "modal-rating-unfill"
                              }
                              src={Stars}
                              onClick={() => setstarFill(5)}
                              alt="Stars"
                            />
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Row className="mt-2" style={{ textAlign: "center" }}>
                          <Col>
                            <Button
                              variant="primary"
                              onClick={handleReview}
                              style={{ width: "max-content" }}
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </Modal.Footer>
                    </Modal>
                    <Modal show={showModal} onHide={hideModal} size="md" className="modal-backdrop.show modalp0" centered >
                      
                      <Modal.Header>
                        <Modal.Title style={{ fontSize: 16 }}>
                          End conversation & delete chat
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ textAlign: "end" ,}}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <button
                              type="button"
                              className="cancelmodal btn btn-secondary"
                              onClick={hideModal}
                            >
                              Cancel
                            </button>
                          </div>
                          <div>
                            <button
                              //variant="primary"
                              type="button"
                              className="convomodal btn btn-primary"
                              onClick={() =>
                                deleteUser(
                                  Task.chatRoomId,
                                  Task.selfOrderId,
                                  userLength
                                )
                              }
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                    <Modal
                      centered
                      show={showModalThanks}
                      onHide={hideModal}
                      size="md"
                    >
                      <Modal.Header style={{ justifyContent: "center" }}>
                        <Modal.Title>Reported</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ textAlign: "center" }}>
                        <div className="mt-1">
                          <h5>
                            You report for this user has been submitted!{" "}
                            <img
                              alt="Green Check"
                              style={{ width: "30px" }}
                              src={GreenCheck}
                            ></img>
                          </h5>
                        </div>
                        <div style={{ textAlign: "center" }} className="mt-2">
                          <button
                            type="button"
                            className="cancelmodal"
                            onClick={hideModal}
                            style={{ width: "130px" }}
                          >
                            Ok
                          </button>
                        </div>
                      </Modal.Body>
                    </Modal>
                    <Modal show={showModalSubmit} onHide={()=>{hideModal()}} size="md">
                      <Modal.Header closeButton>
                        <Modal.Title style={{ textAlign: "center" }}>
                          Report
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {hideTextArea ? (
                          <div className="mt-2">
                            <h6>
                              You are reporting this user for {reportMessage}.
                            </h6>
                          </div>
                        ) : (
                          <>
                            <div className="mt-2">
                              <h6>
                                Enter the reason for which you want to report:
                              </h6>
                            </div>
                            <div>
                              <textarea
                                value={reportMessage}
                                onChange={(e) => {
                                  if (e.target.value.length < 100) {
                                    setReportMessage(e.target.value);
                                  }
                                }}
                                style={{
                                  width: "100%",
                                  height: "70px",
                                  resize: "none",
                                }}
                              ></textarea>
                            </div>
                          </>
                        )}

                        <div className="mt-4" style={{ textAlign: "center" }}>
                          <button
                            type="button"
                            className={
                              reportMessage == ""
                                ? "ReportButtonsDisabled"
                                : "ReportButtons btn btn-primary"
                            }
                            onClick={() => {
                              reportSubmit();
                              deleteUser(
                                Task.chatRoomId,
                                Task.selfOrderId,
                                userLength
                              );
                            }}
                            disabled={reportMessage == "" ? true : false}
                          >
                            Submit
                          </button>
                        </div>
                      </Modal.Body>
                    </Modal>
                    <Modal show={showModalReport} onHide={()=>hideModal()} size="md" >
                      <Modal.Header closeButton>
                        <Modal.Title style={{ textAlign: "center" }}>
                          Report
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="mt-2">
                          <h5>For what reason do you want to report? </h5>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="ReportButtons"
                            onClick={(e) => reportClicked(e.target.innerHTML)}
                          >
                            Spamming
                          </button>
                          <button
                            type="button"
                            className="ReportButtons"
                            onClick={(e) => reportClicked(e.target.innerHTML)}
                          >
                            Harassment
                          </button>
                          <button
                            type="button"
                            className="ReportButtons"
                            onClick={(e) => reportClicked(e.target.innerHTML)}
                          >
                            False Information
                          </button>
                          <button
                            type="button"
                            className="ReportButtons"
                            onClick={(e) => reportClicked(e.target.innerHTML)}
                          >
                            Something Else
                          </button>
                        </div>
                      </Modal.Body>
                    </Modal>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        cursor: "pointer",
                      }}
                    >
                      {Task.isMC ? (
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
                                marginTop: "43px",
                                marginLeft: "5px",
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
                                            {Task.isMC && Task.areYouan === "Individual" ? (
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
                                marginTop: "43px",
                                marginLeft: "5px",
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
                      {Task.isMC && Task.areYouan === "Corporation" ? (
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
                                marginTop: "43px",
                                marginLeft: "5px",
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
                                            {!Task.isMC && Task.areYouan === "Corporation" ? (
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
                                marginTop: "43px",
                                marginLeft: "5px",
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
                          position: "relative",
                        }}
                      >
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{ position: "absolute" }}
                            >
                              Expect time delay in updation.
                            </Tooltip>
                          }
                          placement="top-start"
                        >
                          {context.applicationStore.OnlineUsers[Task.userid] ? (
                            <img
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
                            // background: "#2995be",
                          }}
                          className="profilrpic"
                          src={
                            Task.storageImage !== "" && Task.picAvailability
                              ? Task.storageImage
                              : Profile
                          }
                          alt="Profile"
                        />
                      </div>
                      <div
                        className="userNameStars"
                        style={{ flex: 3, padding: "0px 0px 0px 5px" }}
                      >
                        <p
                          className="notranslate"
                          style={{ margin: 3, fontSize: 14 }}
                        >
                          {Task.isVisited ? (
                            Task.username
                          ) : (
                            <strong className="notranslate">
                              {Task.username}
                            </strong>
                          )}
                        </p>
                        <Row style={{ position: "relative" }}>
                          <OverlayTrigger
                            overlay={
                              <Tooltip
                                id="tooltip-disabled"
                                bsPrefix="custom-tooltip"
                                style={{ position: "absolute", zIndex: 999 }}
                              >
                                {Task.reviewScore} reviews
                              </Tooltip>
                            }
                            placement="top-start"
                          >
                            <Col md={12}>
                              <img
                                // id={`${list.ID}-star-1`}
                                // onClick={(e) => rating(e, 1)}
                                className={
                                  Task.reviewScore >= 1
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
                                  Task.reviewScore >= 2
                                    ? "rating-fill"
                                    : "rating-unfill"
                                }
                                src={Stars}
                                alt="Stars"
                              />
                              <img
                                // id={`${list.ID}-star-3`}
                                // onClick={(e) => rating(e, 3)}
                                className={
                                  Task.reviewScore >= 3
                                    ? "rating-fill"
                                    : "rating-unfill"
                                }
                                src={Stars}
                                alt="Stars"
                              />
                              <img
                                // id={`${list.ID}-star-4`}
                                // onClick={(e) => rating(e, 4)}
                                className={
                                  Task.reviewScore >= 4
                                    ? "rating-fill"
                                    : "rating-unfill"
                                }
                                src={Stars}
                                alt="Stars"
                              />
                              <img
                                // id={`${list.ID}-star-5`}
                                // onClick={(e) => rating(e, 5)}
                                className={
                                  Task.reviewScore >= 5
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          // textAlign: "end",
                          flex: 1,
                        }}
                      >
                        {props.isMatch || props.isInvite ? null : (
                          <Dropdown
                            id="orders-dropdown"
                            style={{ padding: 0, height: "2.1rem" }}
                          >
                            <Dropdown.Toggle
                              variant="Default"
                              id="dropdown-basic"
                              className={
                                props.is1Fx ? "user1FXComp" : "notUser1FXComp"
                              }
                              style={{
                                border: "none",
                                boxShadow: "none",
                                paddingTop: 0,
                                paddingLeft: "0px",
                                // bottom: "9px",
                                margin: "0px",
                                left: "20px",
                                position: "relative",
                              }}
                            >
                              <span className="threedots" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu size="sm" title="">
                              <Dropdown.Item>
                                {Task.isReviewed != 0 ? (
                                  // <div style={{ color: "#a8a8a8" }}>
                                  <div
                                    style={{ padding: "0px", width: "100%" }}
                                    id={`review-${Task.userid}-${Task.chatRoomId}`}
                                    onClick={(e) => {
                                      let id = e.currentTarget.id;
                                      setUserId(id.split("-")[1]);
                                      setShowModalReview(true);
                                    }}
                                  >
                                    <h6
                                      style={{
                                        marginBottom: 0,
                                        // color: "#a8a8a8",
                                      }}
                                    >
                                      Edit Review
                                    </h6>
                                  </div>
                                ) : (
                                  // </div>
                                  <div
                                    style={{ padding: "0px", width: "100%" }}
                                    id={`review-${Task.userid}-${Task.chatRoomId}`}
                                    onClick={(e) => {
                                      let id = e.currentTarget.id;
                                      setUserId(id.split("-")[1]);
                                      setShowModalReview(true);
                                    }}
                                  >
                                    <h6 style={{ marginBottom: 0 }}>Review</h6>
                                  </div>
                                )}
                              </Dropdown.Item>
                              {/* Delete */}
                              <Dropdown.Item
                                onClick={() => {
                                  setShowModal(true);
                                }}
                              >
                                <h6 style={{ marginBottom: 0 }}>Delete</h6>
                              </Dropdown.Item>
                              {/* Report & Delete */}
                              <Dropdown.Item>
                                {Task.isReported > 0 ? (
                                  <div
                                    style={{
                                      // backgroundColor: "#dfdfdf",
                                      color: "#a8a8a8",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                    md={3}
                                  >
                                    <h6 style={{ marginBottom: 0 }}>
                                      Reported
                                    </h6>
                                    <img
                                      src={Redflag}
                                      style={{
                                        alignSelf: "center",
                                        width: "20px",
                                      }}
                                      alt="Report"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    onClick={(e) => {
                                      let previewId = e.currentTarget.id;
                                      setUserId(previewId.split("-")[1]);
                                      setShowModalReport(true);
                                      setShowModal(true);
                                    }}
                                    id={`report-${Task.userid}-${Task.chatRoomId}`}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                    md={3}
                                  >
                                    <h6 style={{ marginBottom: 0 }}>
                                      Report {" "}
                                    </h6>{" "}
                                    <img
                                      src={Greyflag}
                                      style={{
                                        alignSelf: "center",
                                        width: "20px",
                                      }}
                                      alt="Report"
                                    />
                                  </div>
                                )}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                        {props.is1Fx ? (
                          <>
                            <button
                              className=" btn-light"
                              style={{
                                borderRadius: "9px",
                                fontSize: "smaller",
                                width: "100%",
                                marginBottom: "2px",
                              }}
                              disabled="true"
                            >
                              Accepted
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )
          : null}

        {props.is1Fx ? (
          <>
            {matchList.length > 0 ? (
              <>
                <div>
                  <hr></hr>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    padding: "6px 10px",
                  }}
                >
                  <Switch
                    onColor="#fff"
                    isOn={value}
                    handleToggle={() => setValue(!value)}
                  />
                </div>
              </>
            ) : null}
            {matchList.map((Task, key) => (
              <div key={key}>
                <div
                  id={Task.orderId + ":" + Task.userid + ":" + key}
                  ref={selectedUser}
                  style={{ padding: "5px 10px", width: "100%" }}
                  className="unselecteduser"
                  onClick={(e) => {
                    const previewId = e.currentTarget.id;
                    props.setisOrder(true);
                    props.setOrderId(previewId.split(":")[0]);
                    props.setChatID(previewId.split(":")[1]);
                    props.setChatRoomID("");
                    props.setselectedUser(
                      matchList.filter(
                        (x) => x.orderId == previewId.split(":")[0]
                      )[0]
                    );
                    setdivID(previewId.split(":")[0]);
                    setUserLength(usersList.length);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", flex: 1 }}
                    >
                      {context.applicationStore.OnlineUsers[Task.userid] ? (
                        <img
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
                          style={{
                            width: "12px",
                            position: "absolute",
                            marginTop: "24px",
                            marginLeft: "28px",
                          }}
                          src={Offline}
                        />
                      )}
                      <img
                        style={{
                          borderRadius: "35px",
                          borderWidth: 1,
                          borderColor: "#191ebb",
                          height: "37px",
                          width: "37px",
                          // background: "#2995be",
                        }}
                        className="profilepic"
                        src={
                          Task.storageImage !== "" && Task.picAvailability
                            ? Task.storageImage
                            : Profile
                        }
                        alt="Profile"
                      />
                    </div>
                    <div
                      className="userNameStars"
                      style={{ flex: 3, padding: "0px 0px 0px 15px" }}
                    >
                      <p
                        className="notranslate"
                        style={{ margin: 3, fontSize: 14 }}
                      >
                        {Task.username}
                      </p>
                      <div>
                        <img
                          className={
                            Task.reviewScore >= 1
                              ? "rating-fill"
                              : "rating-unfill"
                          }
                          src={Stars}
                          alt="Stars"
                        />
                        <img
                          className={
                            Task.reviewScore >= 2
                              ? "rating-fill"
                              : "rating-unfill"
                          }
                          src={Stars}
                          alt="Stars"
                        />
                        <img
                          className={
                            Task.reviewScore >= 3
                              ? "rating-fill"
                              : "rating-unfill"
                          }
                          src={Stars}
                          alt="Stars"
                        />
                        <img
                          className={
                            Task.reviewScore >= 4
                              ? "rating-fill"
                              : "rating-unfill"
                          }
                          src={Stars}
                          alt="Stars"
                        />
                        <img
                          className={
                            Task.reviewScore >= 5
                              ? "rating-fill"
                              : "rating-unfill"
                          }
                          src={Stars}
                          alt="Stars"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        // display: "flex",
                        // alignItems: "center",
                        // textAlign: "end",
                        // flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      {!Task.invited ? (
                        <>
                          <button
                            className="btn-primary"
                            style={{
                              borderRadius: "9px",
                              fontSize: "smaller",
                              width: "100px",
                            }}
                            onClick={async () => {
                              setIsLoading(true);
                              const sendInviteResult = await addDoc(
                                "sendInvite",
                                {
                                  SentToId: Task.userid,
                                  SenderID: uid,
                                  Docid: Task.orderId,
                                  selfDocId: props.orderId,
                                }
                              );

                              if (sendInviteResult) {
                                await addDoc(`addNotification`, {
                                  time: Date.now(),
                                  description: `${sessionStorage.getItem(
                                    "UserName"
                                  )} has sent invite for your order ${
                                    Task.orderId
                                  }`,
                                  type: "invite",
                                  visited: false,
                                  senderId: uid,
                                  sentToId: Task.userid,
                                });

                                SignalRService.sendNotification(
                                  Task.userid,
                                  `${sessionStorage.getItem(
                                    "UserName"
                                  )} has sent invite for your order ${
                                    Task.orderId
                                  }`,
                                  "invite"
                                );

                                context.dispatch({ Type: "INVITE" });
                              }

                              setIsLoading(false);
                            }}
                            disabled={
                              InviteStatuses(Task.inviteStatus, Task.isAccepted)
                                .disabled
                            }
                          >
                            <h6 className="m-0" style={{ fontSize: "unset" }}>
                              {
                                InviteStatuses(
                                  Task.inviteStatus,
                                  Task.isAccepted
                                ).buttonText
                              }
                            </h6>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className=" btn-success"
                            style={{
                              borderRadius: "9px",
                              fontSize: "smaller",
                              width: "100%",
                              marginBottom: "2px",
                            }}
                            onClick={(e) => {
                              acceptInvite(e, Task);
                            }}
                          >
                            {/* {isLoading ? (
                            <Spinner animation="border" role="status" size="sm">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </Spinner>
                          ) : ( */}
                            <h6 className="m-0" style={{ fontSize: "unset" }}>
                              Accept
                            </h6>
                            {/* )} */}
                          </button>
                          <button
                            className=" btn-danger"
                            style={{
                              borderRadius: "9px",
                              fontSize: "smaller",
                              width: "100%",
                            }}
                            onClick={(e) => {
                              setIsLoading(true);
                              e.target.disabled = true;
                              setDoc("updateInviteStatus", {
                                DocId: props.orderId,
                                SentToId: uid,
                                SelfDocId: Task.orderId,
                                SenderId: Task.userid,
                                Status: "Rejected",
                              }).then(() => {
                                addDoc(`addNotification`, {
                                  time: Date.now(),
                                  description: `${sessionStorage.getItem(
                                    "UserName"
                                  )} has rejected your invite for order ${
                                    props.orderId
                                  }`,
                                  type: "rejectinvite",
                                  visited: false,
                                  senderId: uid,
                                  sentToId: Task.userid,
                                }).then(() => {
                                  SignalRService.sendNotification(
                                    Task.userid,
                                    `${sessionStorage.getItem(
                                      "UserName"
                                    )} has rejected your invite for order ${
                                      Task.orderId
                                    }`,
                                    "Reject Invite"
                                  );

                                  setIsLoading(false);
                                  window.location.reload();
                                });
                              });
                            }}
                          >
                            {/* {isLoading ? (
                            <Spinner animation="border" role="status" size="sm">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </Spinner>
                          ) : ( */}
                            <h6 className="m-0" style={{ fontSize: "unset" }}>
                              Reject
                            </h6>
                            {/* )} */}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default User;
