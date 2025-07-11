import React, { useState, useEffect, useContext, useRef } from "react";
import Stars from "../../asstes/rattingstar.svg";
import Halfstar from "../../asstes/halfstar.svg";
import {
  Row,
  Col,
  Modal,
  Tooltip,
  OverlayTrigger,
  NavDropdown,
  Button,
  Dropdown
} from "react-bootstrap";
import Profile from "../../asstes/Profile.svg";
import Online from "../../asstes/online.svg";
import Offline from "../../asstes/offline.svg";
import Cencle from "../../asstes/cancel.png";
import Redflag from "../../asstes/red flag.svg";
import Greyflag from "../../asstes/gray flag.svg";
import GreenCheck from "../../asstes/success-green-check-mark-icon.webp";
import threedot from "../../asstes/option.png";
import { AppContext } from "../../Context";
import { apiHost, getStorage, setDoc } from "../../Helper";
import axios from "axios";
let starId = ""
const User = (props) => {

  const [usersList, setUsersList] = useState([]);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [online, setonline] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalReview, setShowModalReview] = useState(false);
  const [showModalReport, setShowModalReport] = useState(false);
  const [showModalSubmit, setShowModalSubmit] = useState(false);
  const [showModalThanks, setShowModalThanks] = useState(false);
  const [hideTextArea, setHideTextArea] = useState(false);
  const [userLength, setUserLength] = useState(false);
  const [UniqueID, setUniqueID] = useState("");
  const [divID, setdivID] = useState(" ");
  const [userId, setUserId] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [starFill, setstarFill] = useState(0);
  const context = useContext(AppContext);
  const [threeDot, setThreeDot] = useState(false)
  const [threeDotDoc, setThreeDotDoc] = useState(null)

  const dotStateRef = useRef(threeDot)
  const dotDocStateRef = useRef(threeDotDoc)

  const click = () => {
    document.addEventListener('click', function (event) {
      if (dotStateRef.current && event.target.id !== 'threeDotsButton') {
        try {
          dotDocStateRef.current.target.click();
          // setThreeDot(false);
          dotDocStateRef.current = null;
        } catch (E) {
          //console.log(E)
        }
      }
    });

  }

  useEffect(() => { dotStateRef.current = threeDot; }, [threeDot])
  useEffect(() => { dotDocStateRef.current = threeDotDoc; }, [threeDotDoc])
  useEffect(() => {
    click()
    return () => {
      document.removeEventListener('click', function (event) {
        if (dotStateRef.current && event.target.id !== 'threeDotsButton') {
          dotDocStateRef.current.target.click()
          setThreeDot(false)
        }
      });
    }
  }, [])

  useEffect(() => {
    //console.log('usersList')
    //console.log(usersList)
  }, [usersList])

  useEffect(() => {
    // setUID(window.location.search.split("&")[0].split("=")[1]);
    let x = sessionStorage.getItem("logedin");
    if (x === "true") {
      setonline(true);
    } else {
      setonline(false);
    }
  }, [null]);

  const deleteUser = (ChatRoomId, orderId, usersLength) => {
    let data = { ChatRoomId: ChatRoomId }
    let url_1 = `${apiHost}/api/Chats/RemoveChatRooms?RoomID=${ChatRoomId}&UserId=${uid}&OrderId=${orderId}&Count=${usersLength}&MakeCompleted=${false}`;
    axios
      .post(url_1, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response1) => {
        //console.log(response1)
        window.location.reload();
      })
      .catch(e => {
        //console.log(e)
      })
  };

  // useEffect(()=>{
    document.addEventListener('click', function() {
      document.getElementById("temp1").click();
    });
  // })

  const getData = () => {
    setdivID("")
    //console.log(props.chatdocList)
    let usersList = [];
    props.chatdocList.forEach(async (roomData) => {
      let image = roomData.profileimagepath;
      if (image == "") {
        usersList.push({ ...roomData, storageImage: '' })
      }
      else {
        let url = `${apiHost}/Images/${image}`;
        usersList.push({ ...roomData, storageImage: url })
      }
    })
    setUsersList(usersList)
  }


  const styles = {
    selected: {
      // backgroundColor: "#EFEFEF",
      background: "#f0f2f5",
      borderBottom: "1px solid #dfdfdf",
      width: "103%",
    },

    notselected: {
      borderBottom: "1px solid #dfdfdf",
      width: "103%",
    },
  };


  const hideModal = () => {
    setShowModal(false);
    setShowModalReport(false);
    setShowModalSubmit(false);
    setShowModalThanks(false);
    setShowModalReview(false);
  };
  useEffect(() => {
    setUsersList([])
    getData()
  }, [props.chatdocList]);
  useEffect(() => {
    usersList.forEach((d, i) => {
      if (d.chatRoomId != divID) {
        document.getElementById(d.chatRoomId + ":" + d.userid + ":" + i).className = "unselecteduser";
      }
      else {
        document.getElementById(d.chatRoomId + ":" + d.userid + ":" + i).className = "selecteduser";
      }
    });
  }, [divID]);


  const reportClicked = (message) => {
    setReportMessage("");
    setHideTextArea(false);
    if (message != "Something Else") {
      setReportMessage(message);
      setHideTextArea(true)
    }
    setShowModalReport(false);
    setShowModalSubmit(true);

  }

  const reportSubmit = () => {
    //console.log(userId)
    //console.log(divID)
    setDoc("reportUser", {
      userId: uid,
      reportedUserId: userId,
      message: reportMessage
    })
    setShowModalSubmit(false);
    setShowModalThanks(true);
    window.location.reload();
  }
  // document.getElementById(`report-${userId}-${divID}`).src = Redflag;

  const handleReview = () => {
    setDoc("updateReview", {
      reviewedUserId: userId,
      score: starFill,
      userId: uid
    })
    setShowModalReview(false)
  }

  return (
    <>
      {usersList.map((Task, key) => (
        <div key={key}>
          <div
            id={Task.chatRoomId +
              ":" +
              Task.userid + ":" + key}
            style={{ padding: "0" }}
            className="unselecteduser"
            onClick={(e) => {
              const previewId = e.currentTarget.id;
              // const index = e.currentTarget.parentElement.key;
              props.setChatID(previewId.split(":")[1]);
              props.setChatRoomID(previewId.split(":")[0]);
              props.setselectedUser(usersList[previewId.split(":")[2]]);
              setdivID(previewId.split(":")[0]);
              // setUserId(previewId.split(":")[1])
              setUserLength(usersList.length);
            }}
          >
            <Modal show={showModalReview} onHide={hideModal} size="md">
              <Modal.Header style={{ display: "block" }}>
                <Modal.Title className="text-center" style={{ fontSize: 18, textAlign: "center" }}>
                  Review User
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>Based on trust and ease of communication, how much do you want to rate this user?</h5>
                <Row className="mt-2" style={{ textAlign: "center" }}>
                  <Col>
                    <img
                      // id={`${Task.ID}-star-1`}
                      // onClick={(e) => rating(e, 1)}
                      className={starFill >= 1
                        ? "modal-rating-fill"
                        : "modal-rating-unfill"}
                      src={Stars}
                      onClick={() => setstarFill(1)}
                      alt="Stars" />
                    <img
                      // id={`${Task.ID}-star-2`}
                      // onClick={(e) => rating(e, 2)}
                      className={starFill >= 2
                        ? "modal-rating-fill"
                        : "modal-rating-unfill"}
                      src={Stars}
                      onClick={() => setstarFill(2)}
                      alt="Stars" />
                    <img
                      // id={`${Task.ID}-star-3`}
                      // onClick={(e) => rating(e, 3)}
                      className={starFill >= 3
                        ? "modal-rating-fill"
                        : "modal-rating-unfill"}
                      src={Stars}
                      onClick={() => setstarFill(3)}
                      alt="Stars" />
                    <img
                      // id={`${Task.ID}-star-4`}
                      // onClick={(e) => rating(e, 4)}
                      className={starFill >= 4
                        ? "modal-rating-fill"
                        : "modal-rating-unfill"}
                      src={Stars}
                      onClick={() => setstarFill(4)}
                      alt="Stars" />
                    <img
                      // id={`${Task.ID}-star-5`}
                      // onClick={(e) => rating(e, 5)}
                      className={starFill >= 5
                        ? "modal-rating-fill"
                        : "modal-rating-unfill"}
                      src={Stars}
                      onClick={() => setstarFill(5)}
                      alt="Stars" />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Row className="mt-2" style={{ textAlign: "center" }}>
                  <Col >
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
            <Modal show={showModal} onHide={hideModal} size="md">
              <Modal.Header>
                <Modal.Title style={{ fontSize: 16 }}>
                  Delete Confirmation
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ textAlign: "end" }}>
                <div className="mt-2">
                  <button
                    //variant="primary"
                    type="button"
                    className="convomodal btn btn-primary"
                    onClick={() => deleteUser(Task.chatRoomId, Task.selfOrderId, userLength)}
                  >
                    Do you want to end the conversation?
                  </button>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    className="cancelmodal btn btn-secondary"
                    onClick={hideModal}
                  >
                    Cancel
                  </button>
                </div>
              </Modal.Body>
            </Modal>
            <Modal centered show={showModalThanks} onHide={hideModal} size="md">
              <Modal.Header style={{ justifyContent: "center" }}>
                <Modal.Title>
                  Reported
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ textAlign: "center" }}>
                <div className="mt-1">
                  <h5>You report for this user has been submitted! <img alt="Green Check" style={{ width: "30px" }} src={GreenCheck}></img></h5>
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
            <Modal show={showModalSubmit} onHide={hideModal} size="md">
              <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: "center" }}>
                  Report
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {hideTextArea ? (
                  <div className="mt-2">
                    <h6>You are reporting this user for {reportMessage}.</h6>
                  </div>) : (
                  <>
                    <div className="mt-2">
                      <h6>Enter the reason for which you want to report:</h6>
                    </div>
                    <div>
                      <textarea value={reportMessage} onChange={(e) => {
                        if (e.target.value.length < 100) {
                          setReportMessage(e.target.value);
                        }
                      }} style={{ width: "100%", height: "70px", resize: "none" }}>
                      </textarea>
                    </div>
                  </>)}


                <div className="mt-4" style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    className={reportMessage == "" ? "ReportButtonsDisabled" : "ReportButtons btn btn-primary"}
                    onClick={reportSubmit}
                    disabled={reportMessage == "" ? true : false}
                  >
                    Submit
                  </button>
                </div>
              </Modal.Body>
            </Modal>
            <Modal show={showModalReport} onHide={hideModal} size="md">
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
            <div className="userbar" key={key} style={{ cursor: "pointer", padding: "10px 15px" }}>
              <Row style={{ display: "flex" }}>
                <Col md={2}>
                  {context.applicationStore.OnlineUsers[Task.userid] ? (
                    <img
                      style={{
                        width: "12px",
                        position: "absolute",
                        marginTop: "24px",
                        marginLeft: "28px",
                      }}
                      src={Online} />
                  ) : (
                    <img
                      style={{
                        width: "12px",
                        position: "absolute",
                        marginTop: "24px",
                        marginLeft: "28px",
                      }}
                      src={Offline} />
                  )}
                  <img
                    style={{
                      borderRadius: "35px",
                      borderWidth: 1,
                      borderColor: "#191ebb",
                      // background: "#2995be",
                    }}
                    className="profilrpic"
                    src={Task.storageImage !== "" && Task.picAvailability
                      ? Task.storageImage
                      : Profile}
                    alt="Profile" />
                </Col>
                <Col md={9} className="userNameStars">
                  <p className="notranslate" style={{ margin: 3 }}>{Task.userName}</p>
                  <Row style={{position: "relative"}}>
                    
                    <OverlayTrigger
                        overlay={<Tooltip id="tooltip-disabled"  bsPrefix="custom-tooltip" style={{ position: "absolute",zIndex:999 }}>{Task.reviewScore} reviews</Tooltip>}
                        placement="top-start"
                      >
                      <Col md={12}>
                        <img
                          // id={`${list.ID}-star-1`}
                          // onClick={(e) => rating(e, 1)}
                          className={
                            Task.reviewScore >= 1 ? "rating-fill" : "rating-unfill"
                          }
                          src={Stars}
                          alt="Stars"
                        />
                        <img
                          // id={`${list.ID}-star-2`}
                          // onClick={(e) => rating(e, 2)}
                          className={
                            Task.reviewScore >= 2 ? "rating-fill" : "rating-unfill"
                          }
                          src={Stars}
                          alt="Stars"
                        />
                        <img
                          // id={`${list.ID}-star-3`}
                          // onClick={(e) => rating(e, 3)}
                          className={
                            Task.reviewScore >= 3 ? "rating-fill" : "rating-unfill"
                          }
                          src={Stars}
                          alt="Stars"
                        />
                        <img
                          // id={`${list.ID}-star-4`}
                          // onClick={(e) => rating(e, 4)}
                          className={
                            Task.reviewScore >= 4 ? "rating-fill" : "rating-unfill"
                          }
                          src={Stars}
                          alt="Stars"
                        />
                        <img
                          // id={`${list.ID}-star-5`}
                          // onClick={(e) => rating(e, 5)}
                          className={
                            Task.reviewScore >= 5 ? "rating-fill" : "rating-unfill"
                          }
                          src={Stars}
                          alt="Stars"
                        />
                      </Col>
                      </OverlayTrigger>
                    </Row>
                </Col>
                <Col md={1} style={{ padding: 0 }}>
                  {/* <div id="">
                    <div id="menu-wrap">
                      <input id="threeDotsButton" onClick={(e) => {
                        //console.log('event')
                        //console.log(e.clientX)
                        //console.log(e.clientY)
                        if (e.clientX === 0 && e.clientY === 0) {
                          //console.log('click')
                          // setThreeDotDoc(e);
                          // return
                        }
                        if (dotDocStateRef.current !== e.target && dotDocStateRef !== null && threeDot) {
                          dotDocStateRef.current.target.click();
                          // dotDocStateRef.current = null;
                          // setThreeDot(false)
                        }
                        setThreeDotDoc(e);
                        setThreeDot(!threeDot)
                      }} type="checkbox" className="toggler" />
                      <div className="dots">
                        <div></div>
                      </div>
                      <div className="menu">
                        {Task.isReviewed != null ?
                          <div style={{ padding: "10px ", width: "100%", backgroundColor: "#dfdfdf", color: "#a8a8a8" }}>
                            <h6 style={{ marginBottom: "0px" }}>Reviewed</h6>
                          </div>
                          :
                          <div style={{ padding: "10px ", width: "100%" }} onClick={(e) => {
                            let id = e.currentTarget.nextSibling.id
                            setUserId(id.split("-")[1]);
                            setShowModalReview(true);
                          }}>
                            <h6 style={{ marginBottom: "0px" }}>Review</h6>
                          </div>
                        }
                        {Task.isReported > 0 ?
                          <div
                            style={{
                              cursor: "pointer",
                              padding: "10px",
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "#dfdfdf",
                              color: "#a8a8a8",
                              width: "100%"
                            }}
                            md={3}
                          >
                            <h6 style={{ marginRight: "10px", marginBottom: 0 }}> Reported</h6>
                            <img
                              src={Redflag}
                              style={{ alignSelf: "center", width: "20px" }}
                              alt="Report" />
                          </div>
                          :
                          <div
                            onClick={(e) => {
                              let previewId = e.currentTarget.id;
                              setUserId(previewId.split("-")[1]);
                              setShowModalReport(true);
                            }}
                            id={`report-${Task.userid}-${Task.chatRoomId}`}
                            style={{
                              cursor: "pointer",
                              textAlign: "inherit",
                              padding: "10px",
                              display: "flex",
                              alignItems: "center",
                              width: "100%"
                            }}
                            md={3}
                          >
                            <h6 style={{ marginRight: "10px", marginBottom: 0 }}> Report</h6>
                            <img
                              src={Greyflag}
                              style={{ alignSelf: "center", width: "20px" }}
                              alt="Report" />
                          </div>


                        }

                        <div style={{ padding: "10px", width: "100%" }} onClick={() => { setShowModal(true); }}><h6 style={{ marginBottom: "0px" }}>Delete</h6></div>
                      </div>
                    </div>
                  </div> */}
                  <Dropdown id="orders-dropdown" style={{ padding: 0 }}>
                    <Dropdown.Toggle variant="Default" id="dropdown-basic" style={{
                      border: "none",
                      boxShadow: "none",
                      paddingTop: 0
                    }}>
                      <span className="threedots" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu size="sm" title="">
                      <Dropdown.Item >
                        {Task.isReviewed != null ?
                          <div style={{ color: "#a8a8a8" }}>
                            <h6 style={{ marginBottom: 0 }}>Reviewed</h6>
                          </div>
                          :
                          <div style={{ padding: "10px ", width: "100%" }}
                            id={`review-${Task.userid}-${Task.chatRoomId}`}
                            onClick={(e) => {
                              let id = e.currentTarget.id
                              setUserId(id.split("-")[1]);
                              setShowModalReview(true);
                            }}><h6 style={{ marginBottom: 0 }}>Review</h6>
                          </div>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item>
                        {Task.isReported > 0 ?
                          <div

                            style={{
                              // backgroundColor: "#dfdfdf",
                              color: "#a8a8a8",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                            md={3}
                          >
                            <h6 style={{ marginBottom: 0 }}>Reported</h6>
                            <img
                              src={Redflag}
                              style={{ alignSelf: "center", width: "20px" }}
                              alt="Report" />
                          </div>
                          :
                          <div
                            onClick={(e) => {
                              let previewId = e.currentTarget.id;
                              setUserId(previewId.split("-")[1]);
                              setShowModalReport(true);
                            }}
                            id={`report-${Task.userid}-${Task.chatRoomId}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                            md={3}
                          >
                            <h6 style={{ marginBottom: 0 }}> Report</h6>
                            <img
                              src={Greyflag}
                              style={{ alignSelf: "center", width: "20px" }}
                              alt="Report" />
                          </div>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => { setShowModal(true); }}>
                        <h6 style={{ marginBottom: 0 }}>Delete</h6>
                      </Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

              </Row>
            </div>


          </div>
        </div>
      ))}
    </>
  );
};

export default User;
