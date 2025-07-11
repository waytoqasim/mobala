import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../../App.css";
import { AppContext } from "../../Context";
import { addDoc, apiHost, InviteStatuses, setDoc } from "../../Helper";
import SignalRService from "../../SignalR";
import Greenarrow from "../../asstes/Greenarrow.svg";
import Redarrow from "../../asstes/Redarrow.svg";
import addedtofav from "../../asstes/addedtofav.svg";
import addtofav from "../../asstes/addtofav.svg";
import Arrow from "../../asstes/arrow.png";
import assistance from "../../asstes/assistance.svg";
import bankImage from "../../asstes/bank.png";
import cashImage from "../../asstes/cash.png";
import download from "../../asstes/download1.svg";
import info from "../../asstes/info.svg";
import Offline from "../../asstes/offline.svg";
import Online from "../../asstes/online.svg";
import Stars from "../../asstes/rattingstar.svg";

function MatchedOrder(props) {
  const navigate = useNavigate();
  const [d, setOrder] = useState(props.order);
  const [i, setIndex] = useState(props.orderIndex);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const context = useContext(AppContext);
  const [isFav, setIsFav] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);




  useEffect(() => {
    setOrder(props.order);
    // console.log("Usama", props.order);
    setIndex(props.orderIndex);
    setIsFav(props.order.isFavorite);
    console.log("ordersss",d);
    if (
      props.order.isFirstDocumentPublic &&
      props.order.isSecondDocumentPublic &&
      props.order.isThirdDocumentPublic
    ) {
      setShowDownloadButton(true);
    } else {
      setShowDownloadButton(false);
    }
  }, [props.order, props.SelfDocId]);

  const clickFav = (fav, orderId) => {
    if (!fav) {
      addDoc("addFavorite", {
        UserId: uid,
        OrderId: orderId,
      });
    } else {
      addDoc("removeFavorite", {
        UserId: uid,
        OrderId: orderId,
      });
    }
    context.dispatch({
      Type: "FAVOURITE ORDER",
      Payload: { ...d, isFavorite: !fav },
    });
    setOrder({ ...d, isFavorite: !fav });
  };

  const Getdocument = async () => {
    try {
      let url = `${apiHost}/api/Orders/GetUserDocuments?UserId=${d.userid}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      // console.log(blob);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Documents-Of-${d.userName}.zip`;
      link.click();
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const acceptInvite = (data) => {
    const unique = uuidv4();
    setDoc("updateInviteStatus", {
      DocId: d.selfDocId,
      SentToId: uid,
      SelfDocId: data.orderId,
      SenderId: data.userid,
      Status: "Accepted",
    });
    addDoc(`addNotification`, {
      description: `${sessionStorage.getItem(
        "UserName"
      )} has accepted your invite for order ${data.orderId}`,
      type: "acceptinvite",
      visited: false,
      senderId: uid,
      sentToId: data.userid,
    });
    SignalRService.sendNotification(
      data.userid,
      `${sessionStorage.getItem(
        "UserName"
      )} has accepted your invite for order ${data.orderId}`,
      "acceptinvite"
    );
    navigate(`/ChatPage?ID=${uid}&t=${Date.now()}`);
    context.dispatch({ Type: "NAVIGATION" });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return d != undefined && d.takeAmount != undefined ? (
    <Row style={{ justifyContent: "center" }}>
      <Row
        style={
          props.basicInterface
            ? { justifyContent: "right" }
            : { alignItems: "end" }
        }
      >
        {props.mcOrder ? (
          <>
            <div
              style={{
                flex: 1,
                paddingTop: "5px",
                display: "contents",
                marginRight: 10,
              }}
            >
              <div
                className={
                  d.invited && !d.orderinFinalize ? "nameoutlin1" : "nameoutlin"
                }
                style={{
                  width: "max-content",
                  fontSize: "12px",
                  fontStyle: "italic",
                  color: "grey",
                  textAlign: "left",
                }}
              >
                {props.OnlineUsers[d.userid] ? (
                  <img
                    alt=""
                    style={{
                      width: "7px",
                      position: "absolute",
                      marginTop: "5px",
                      marginLeft: "-8px",
                    }}
                    src={Online}
                  />
                ) : (
                  <img
                    alt=""
                    style={{
                      width: "7px",
                      position: "absolute",
                      marginTop: "5px",
                      marginLeft: "-8px",
                    }}
                    src={Offline}
                  />
                )}
                Proposal from <br></br>{" "}
                <OverlayTrigger
                  overlay={
                    <Tooltip
                      className="notranslate"
                      id="tooltip-disabled"
                      bsPrefix="custom-tooltip"
                      style={{ position: "absolute" }}
                    >
                      {d.userName}
                    </Tooltip>
                  }
                  placement="top-start"
                >
                  <strong className="notranslate">
                    {d.userName.length > 10
                      ? d.userName.substring(0, 9) + "..."
                      : d.userName}
                  </strong>
                </OverlayTrigger>
                <Row style={{ position: "relative" }}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{
                          position: "absolute",
                          marginTop: 0,
                          marginBottom: 0,
                        }}
                      >
                        {d.reviewScore} reviews
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "5px",
                      }}
                    >
                      <img
                        className={
                          d.reviewScore >= 1 ? "rating-fill" : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                        className={
                          d.reviewScore >= 2 ? "rating-fill" : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                        className={
                          d.reviewScore >= 3 ? "rating-fill" : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                        className={
                          d.reviewScore >= 4 ? "rating-fill" : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                        className={
                          d.reviewScore >= 5 ? "rating-fill" : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                    </Col>
                  </OverlayTrigger>
                </Row>
              </div>
              <Col></Col>
            <Col
              className="flip-box notranslate"
              style={{ paddingRight: "0px" }}
            >
              <div
                className={
                  d.invited ? "flip-box-inner orange-border" : "flip-box-inner"
                }
              >
                <div className="flip-box-front">
                  <h6 className="txt_order">
                    {" "}
                    {(d.takeAmount / d.giveAmount).toFixed(4)}
                    &nbsp;{d.takeCurrency} / {d.giveCurrency}{" "}
                  </h6>
                </div>
                <div className="flip-box-back">
                  <h6 className="txt_order">
                    {(d.giveAmount / d.takeAmount).toFixed(4)}
                    &nbsp;{d.giveCurrency} / {d.takeCurrency}{" "}
                  </h6>
                </div>
              </div>
            </Col>
            </div>

            
          </>
        ) : (
          <>
            {props.basicInterface ? null : (
              <>
                <Col
                  className="flip-box notranslate"
                  style={{ paddingLeft: "0px" }}
                >
                  <div
                    className={
                      d.invited && !d.orderinFinalize
                        ? "flip-box-inner orange-border"
                        : "flip-box-inner"
                    }
                  >
                    <div className="flip-box-front">
                      <h6 className="txt_order">
                        {" "}
                        {(d.takeAmount / d.giveAmount).toFixed(4)}
                        &nbsp;{d.takeCurrency} / {d.giveCurrency}{" "}
                      </h6>
                    </div>
                    <div className="flip-box-back">
                      <h6 className="txt_order">
                        {(d.giveAmount / d.takeAmount).toFixed(4)}
                        &nbsp;{d.giveCurrency} / {d.takeCurrency}{" "}
                      </h6>
                    </div>
                  </div>
                </Col>
                <Col className="flip-box notranslate">
                  <div
                    className={
                      d.invited && !d.orderinFinalize
                        ? "flip-box-inner orange-border"
                        : "flip-box-inner"
                    }
                  >
                    <div className="flip-box-front">
                      <h6 className="txt_order">
                        {d.giveAmount < props.TakeAmount
                          ? `Has less ${d.giveCurrency} available.`
                          : d.giveAmount == props.TakeAmount
                          ? `Has same ${d.giveCurrency} available.`
                          : `Has more ${d.giveCurrency}  available.`}
                      </h6>
                    </div>
                    <div className="flip-box-back">
                      <h6 className="txt_order">
                        {d.giveAmount < props.TakeAmount
                          ? "Ask for more or decrease your order"
                          : d.giveAmount == props.TakeAmount
                          ? "Exact quantity!"
                          : "Ask if less order size is acceptable"}
                      </h6>
                    </div>
                  </div>
                </Col>
              </>
            )}
            <div
              style={{
                flex: 1,
                paddingTop: "5px",
                display: "contents",
                marginRight: 10,
              }}
            >
              <div
                className={
                  d.invited && !d.orderinFinalize ? "nameoutlin1" : "nameoutlin"
                }
                style={{
                  width: "max-content",
                  fontSize: "12px",
                  fontStyle: "italic",
                  color: "grey",
                  textAlign: "left",
                  marginRight: props.basicInterface ? 0 : "auto",
                }}
              >
                {props.OnlineUsers[d.userid] ? (
                  <img
                    alt=""
                    style={{
                      width: "7px",
                      position: "absolute",
                      marginTop: "5px",
                      marginLeft: "-8px",
                    }}
                    src={Online}
                  />
                ) : (
                  <img
                    alt=""
                    style={{
                      width: "7px",
                      position: "absolute",
                      marginTop: "5px",
                      marginLeft: "-8px",
                    }}
                    src={Offline}
                  />
                )}
                Proposal from <br></br>{" "}
                <OverlayTrigger
                  overlay={
                    <Tooltip
                      id="tooltip-disabled"
                      bsPrefix="custom-tooltip"
                      style={{ position: "absolute" }}
                    >
                      {d.userName}
                    </Tooltip>
                  }
                  placement="top-start"
                >
                  <strong className="notranslate">
                    {d.userName.length > 10
                      ? d.userName.substring(0, 9) + "..."
                      : d.userName}
                  </strong>
                </OverlayTrigger>
                <Row style={{ position: "relative" }}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{
                          position: "absolute",
                          marginTop: 0,
                          marginBottom: 0,
                        }}
                      >
                        {d.reviewScore} reviews
                      </Tooltip>
                    }
                  >
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "5px",
                      }}
                    >
                      <img
                        className={
                          d.reviewScore >= 1 ? "rating-fill" : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                        className={
                          d.reviewScore >= 2 ? "rating-fill" : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                        className={
                          d.reviewScore >= 3 ? "rating-fill" : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                        className={
                          d.reviewScore >= 4 ? "rating-fill" : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                      <img
                        className={
                          d.reviewScore >= 5 ? "rating-fill" : "rating-unfill"
                        }
                        src={Stars}
                        alt="Stars"
                      />
                    </Col>
                  </OverlayTrigger>
                </Row>
              </div>
            </div>
          </>
        )}
      </Row>
      <Row>
        <Col
          className={
            d.invited && !d.orderinFinalize ? "Orange-Rec-order" : " Rec-order"
          }
        >
          <Row style={{ marginTop: "15px", position: "relative" }}>
            <Col>
              <Row>
                <Col>
                  <h6 className="txt_order web-Matches">
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          {d.giveCurrencyInfo}
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <h6>
                        {d.giveCurrency} {d.giveAmount.toLocaleString()}
                      </h6>
                    </OverlayTrigger>

                    {d.giveSourceBank ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Bank
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img alt="" className="bankicon" src={bankImage}></img>
                      </OverlayTrigger>
                    ) : null}
                    {d.giveSourceCash ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Cash
                          </Tooltip>
                        }
                      >
                        <img alt="" className="cashicon" src={cashImage}></img>
                      </OverlayTrigger>
                    ) : null}
                    {!d.giveSourceCash && !d.giveSourceBank ? (
                      <div style={{ position: "relative" }}>
                        {" "}
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{ position: "absolute" }}
                            >
                              Cash
                            </Tooltip>
                          }
                          placement="top-start"
                        >
                          <img
                            alt=""
                            src={cashImage}
                            className="cashicon"
                          ></img>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{ position: "absolute" }}
                            >
                              Bank
                            </Tooltip>
                          }
                          placement="top-start"
                        >
                          <img
                            alt=""
                            className="bankicon"
                            src={bankImage}
                          ></img>
                        </OverlayTrigger>
                      </div>
                    ) : null}
                    {!props.basicInterface && (
                      <>
                        {d.giveisSmall ? (
                          <img
                            alt=""
                            src={Greenarrow}
                            className="arrowicon"
                          ></img>
                        ) : d.giveisEqual ? (
                          <></>
                        ) : (
                          <img
                            alt=""
                            src={Redarrow}
                            className="arrowicon"
                          ></img>
                        )}
                      </>
                    )}
                    {d.giveAssistance ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Open to Settlement from a Money Changer
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img className="cashicon" src={assistance}></img>
                      </OverlayTrigger>
                    ) : null}
                  </h6>
                  <h6
                    className="txt_order mobile-Matches notranslate"
                    style={{ marginBottom: 0 }}
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          {d.giveCurrencyInfo}
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <h6>
                        {" "}
                        {d.giveCurrency} {d.giveAmount.toLocaleString()}
                      </h6>
                    </OverlayTrigger>
                  </h6>
                  <div className="mobile-Matches">
                    {d.giveSourceBank ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Bank
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img
                          alt=""
                          style={{ marginLeft: 0 }}
                          className="bankicon"
                          src={bankImage}
                        ></img>
                      </OverlayTrigger>
                    ) : null}
                    {d.giveSourceCash ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Cash
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img
                          alt=""
                          style={!d.giveSourceBank ? { marginLeft: 0 } : {}}
                          className="cashicon"
                          src={cashImage}
                        ></img>
                      </OverlayTrigger>
                    ) : null}
                    {!d.giveSourceCash && !d.giveSourceBank ? (
                      <div style={{ position: "relative" }}>
                        {" "}
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{ position: "absolute" }}
                            >
                              Cash
                            </Tooltip>
                          }
                          placement="top-start"
                        >
                          <img
                            alt=""
                            style={{ marginLeft: 0 }}
                            src={cashImage}
                            className="cashicon"
                          ></img>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{ position: "absolute" }}
                            >
                              Bank
                            </Tooltip>
                          }
                          placement="top-start"
                        >
                          <img
                            alt=""
                            src={bankImage}
                            className="bankicon"
                          ></img>
                        </OverlayTrigger>
                      </div>
                    ) : null}
                    {!props.basicInterface && (
                      <>
                        {d.giveisSmall ? (
                          <img
                            alt=""
                            src={Greenarrow}
                            className="arrowicon"
                          ></img>
                        ) : d.giveisEqual ? (
                          <></>
                        ) : (
                          <img
                            alt=""
                            src={Redarrow}
                            className="arrowicon"
                          ></img>
                        )}
                      </>
                    )}
                    {d.giveAssistance ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Open to Settlement from a Money Changer
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img className="cashicon" src={assistance}></img>
                      </OverlayTrigger>
                    ) : null}
                  </div>
                  <h6 className="txt_order">
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          {d.giveCity}, {d.giveState}, {d.giveCountry}
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <p>
                        {d.giveCity}, {d.giveCountry}
                      </p>
                    </OverlayTrigger>
                  </h6>
                  {/* <h6 className="txt_order">
                    {d.giveCity}, {d.giveCountry}
                  </h6> */}
                  <h6 className="txt_order">
                    {d.givecitydistance != 0
                      ? d.givecitydistance +
                        " km" +
                        " (" +
                        // <span style={{ color: "gray" }}>
                        d.givecitydistance / (1.609).toFixed() +
                        /* </span> */
                        " mi) from " +
                        props.TakeCity
                      : "From same city"}
                  </h6>
                </Col>
              </Row>
            </Col>

            <Col>
              <Row>
                <div style={{ textAlign: "center" }}>
                  <img
                    style={{
                      marginTop: "-4px",
                      textAlign: "center",
                      rotate: props.rotatedArrow ? "none" : "180deg",
                    }}
                    src={Arrow}
                    className="arrow icon"
                    alt="logo"
                  />
                </div>
              </Row>
              <Row>
                <div
                  className={`${
                    d.additionalInfo == "" || d.additionalInfo == null
                      ? "invisible"
                      : "visible"
                  } `}
                  style={{
                    textAlign: "center",
                    marginBottom: "4px",
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
                        Additional Info: {d.additionalInfo}
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <a className="btn-option" style={{ textAlign: "center" }}>
                      <img style={{}} src={info} className="info" alt="logo" />
                    </a>
                  </OverlayTrigger>
                </div>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <h6 className="txt_order web-Matches">
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          {d.takeCurrencyInfo}
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <h6>
                        {d.takeCurrency} {d.takeAmount.toLocaleString()}{" "}
                      </h6>
                    </OverlayTrigger>
                    {d.takeThroughBank ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Bank
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img
                          alt=""
                          style={{ marginLeft: 0 }}
                          className="bankicon"
                          src={bankImage}
                        ></img>
                      </OverlayTrigger>
                    ) : null}
                    {d.takeThroughCash ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Cash
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img
                          alt=""
                          style={!d.takeThroughBank ? { marginLeft: 0 } : {}}
                          className="cashicon"
                          src={cashImage}
                        ></img>
                      </OverlayTrigger>
                    ) : null}
                    {!d.takeThroughCash && !d.takeThroughBank ? (
                      <div style={{ position: "relative" }}>
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{ position: "absolute" }}
                            >
                              Cash
                            </Tooltip>
                          }
                          placement="top-start"
                        >
                          <img
                            alt=""
                            style={{ marginLeft: 0 }}
                            src={cashImage}
                            className="cashicon"
                          ></img>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{ position: "absolute" }}
                            >
                              Bank
                            </Tooltip>
                          }
                          placement="top-start"
                        >
                          <img
                            alt=""
                            src={bankImage}
                            className="bankicon"
                          ></img>
                        </OverlayTrigger>
                      </div>
                    ) : null}
                    {!props.basicInterface && (
                      <>
                        {d.takeisSmall ? (
                          <img
                            alt=""
                            src={Greenarrow}
                            className="arrowicon"
                          ></img>
                        ) : d.takeisEqual ? (
                          <></>
                        ) : (
                          <img
                            alt=""
                            src={Redarrow}
                            className="arrowicon"
                          ></img>
                        )}
                      </>
                    )}
                    {d.takeAssistance ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Open to Settlement from a Money Changer
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img className="cashicon" src={assistance}></img>
                      </OverlayTrigger>
                    ) : null}
                  </h6>
                  <h6
                    className="txt_order mobile-Matches notranslate"
                    style={{ marginBottom: 0 }}
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          {d.takeCurrencyInfo}
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <h6>
                        {d.takeCurrency} {d.takeAmount.toLocaleString()}
                      </h6>
                    </OverlayTrigger>
                  </h6>
                  <div className="mobile-Matches relative">
                    {d.takeThroughBank ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Bank
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img alt="" className="bankicon" src={bankImage}></img>
                      </OverlayTrigger>
                    ) : null}
                    {d.takeThroughCash ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Cash
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img alt="" className="cashicon" src={cashImage}></img>
                      </OverlayTrigger>
                    ) : null}
                    {!d.takeThroughCash && !d.takeThroughBank ? (
                      <div>
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{ position: "absolute" }}
                            >
                              Cash
                            </Tooltip>
                          }
                          placement="top-start"
                        >
                          <img
                            alt=""
                            src={cashImage}
                            className="cashicon"
                          ></img>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{ position: "absolute" }}
                            >
                              Bank
                            </Tooltip>
                          }
                          placement="top-start"
                        >
                          <img
                            alt=""
                            src={bankImage}
                            className="bankicon"
                          ></img>
                        </OverlayTrigger>
                      </div>
                    ) : null}
                    {!props.basicInterface && (
                      <>
                        {d.takeisSmall ? (
                          <img
                            alt=""
                            src={Greenarrow}
                            className="arrowicon"
                          ></img>
                        ) : d.takeisEqual ? (
                          <></>
                        ) : (
                          <img
                            alt=""
                            src={Redarrow}
                            className="arrowicon"
                          ></img>
                        )}
                      </>
                    )}
                    {d.takeAssistance ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                          >
                            Open to Settlement from a Money Changer
                          </Tooltip>
                        }
                        placement="top-start"
                      >
                        <img className="cashicon" src={assistance}></img>
                      </OverlayTrigger>
                    ) : null}
                  </div>
                  <h6 className="txt_order">
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          {d.takeCity}, {d.takeState}, {d.takeCountry}
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <p>
                        {d.takeCity}, {d.takeCountry}
                      </p>
                    </OverlayTrigger>
                  </h6>
                  {/* <h6 className="txt_order">
                    {d.takeCity}, {d.takeCountry}
                  </h6> */}
                  <h6 className="txt_order">
                    {d.takecitydistance != 0
                      ? d.takecitydistance +
                        " km" +
                        " (" +
                        // <span style={{ color: "gray" }}>
                        d.takecitydistance / (1.609).toFixed() +
                        /* </span> */
                        " mi) from " +
                        props.GiveCity
                      : "From same city"}
                  </h6>
                </Col>
              </Row>
            </Col>
            {d.isMC ? (
              <div
                style={{
                  flex: 1,
                  paddingTop: "5px",
                  display: "contents",
                  marginRight: 10,
                }}
              >
                <div className="newbatch notranslate">
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
                    <span className="batchtext notranslate">MC</span>
                  </OverlayTrigger>
                </div>
              </div>
            ) : (
              <></>
            )}
            {d.isMC && d.areYouan === "Individual" ? (
              <div
                style={{
                  flex: 1,
                  paddingTop: "5px",
                  display: "contents",
                  marginRight: 10,
                }}
              >
                <div className="newIndividualbatch notranslate">
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
                    <span className="batchtext notranslate">MC - I</span>
                  </OverlayTrigger>
                </div>
              </div>
            ) : (
              <></>
            )}
             {d.isMC && d.areYouan === "Corporation" ? (
              <div
                style={{
                  flex: 1,
                  paddingTop: "5px",
                  display: "contents",
                  marginRight: 10,
                }}
              >
                <div className="newIndividualbatch notranslate">
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
                    <span className="batchtext notranslate">MC - C</span>
                  </OverlayTrigger>
                </div>
              </div>
            ) : (
              <></>
            )}
                         {!d.isMC && d.areYouan === "Corporation" ? (
              <div
                style={{
                  flex: 1,
                  paddingTop: "5px",
                  display: "contents",
                  marginRight: 10,
                }}
              >
                <div className="newIndividualbatch notranslate">
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
                    <span className="batchtext notranslate">Corp</span>
                  </OverlayTrigger>
                </div>
              </div>
            ) : (
              <></>
            )}
            {/* {d.isMCI ? (
              <div
                style={{
                  flex: 1,
                  paddingTop: "5px",
                  display: "contents",
                  marginRight: 10,
                }}
              >
                <div className="newbatch notranslate">
                  <span className="batchtext notranslate">MC-I</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {d.isMCC ? (
              <div
                style={{
                  flex: 1,
                  paddingTop: "5px",
                  display: "contents",
                  marginRight: 10,
                }}
              >
                <div className="newbatch notranslate">
                  <span className="batchtext notranslate">MC-C</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {d.isMCCorp ? (
              <div
                style={{
                  flex: 1,
                  paddingTop: "5px",
                  display: "contents",
                  marginRight: 10,
                }}
              >
                <div className="newbatch notranslate">
                  <span className="batchtext notranslate"></span>
                </div>
              </div>
            ) : (
              <></>
            )} */}
          </Row>
          <hr
            style={{
              color: "grey",
              margin: 0,
              backgroundColor: "none",
              height: 1,
            }}
          />
          {d.invited && !d.orderinFinalize && props.basicInterface != true ? (
            <Row>
              <Col
                className="mt-1"
                style={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Button
                  onClick={() => {
                    setDoc("updateInviteStatus", {
                      DocId: d.selfDocId,
                      SentToId: uid,
                      SelfDocId: d.orderId,
                      SenderId: d.userid,
                      Status: "Rejected",
                    });
                    addDoc(`addNotification`, {
                      time: Date.now(),
                      description: `${sessionStorage.getItem(
                        "UserName"
                      )} has rejected your invite for order ${d.orderId}`,
                      type: "rejectinvite",
                      visited: false,
                      senderId: uid,
                      sentToId: d.userid,
                    });
                    SignalRService.sendNotification(
                      d.userid,
                      `${sessionStorage.getItem(
                        "UserName"
                      )} has rejected your invite for order ${d.orderId}`,
                      "Reject Invite"
                    );
                    context.dispatch({ Type: "Dispatch" });
                  }}
                  disabled={Object.keys(localStorage).includes(d.id)}
                  style={{
                    width: "40%",
                    marginLeft: "0px",
                    width: "max-content",
                  }}
                  variant="danger"
                >
                  Reject Invite
                </Button>
                &nbsp;
                <Button
                  onClick={() => {
                    acceptInvite(d);
                  }}
                  disabled={Object.keys(localStorage).includes(d.id)}
                  style={{
                    width: "40%",
                    marginLeft: "0px",
                    width: "max-content",
                  }}
                  variant="success"
                >
                  Accept Invite
                </Button>
              </Col>
            </Row>
          ) : (
            <Row style={{ position: "relative" }}>
              <Col
                style={{
                  height: 40,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                   style={{
                     display: 'flex',
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     width: '30%'
                   }}
                 >
                   <img
                     src={d.isFavorite ? addedtofav : addtofav}
                     className="favicon"
                     style={{ cursor: "pointer" }}
                     id={"Tab-" + d.orderId}
                     alt="logo"
                     onClick={() => clickFav(d.isFavorite, d.orderId)}
                   />
                   {d.highRisk &&
                     (
                       <OverlayTrigger
                         placement="top"
                         overlay={
                           <Tooltip
                             id="HR"
                             
                           >
                             High Risk
                           </Tooltip>
                         }
                       >
                         <div
                           style={{
                             backgroundColor: 'pink',
                             width: '20px', // Adjust size
                             height: '20px', // Adjust size
                             clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                             display: 'flex',
                             justifyContent: 'center', // Horizontally center content
                             alignItems: 'center', // Vertically center content
                             color: 'black', // Text color
                             fontSize: 8, // Text size
                             fontWeight: 'bold', // Optional: bold text
                             marginTop: 10
                           }}
                         >
                           HR
                         </div>
                       </OverlayTrigger>
                     )
                   }
                </div>
                <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                {showDownloadButton && ( // Conditionally render the download button
                  <OverlayTrigger
                    placement="top-end"
                    overlay={
                      <Tooltip id="tooltip-disabled" bsPrefix="custom-tooltip">
                        Download documents
                      </Tooltip>
                    }
                  >
                    <img
                      src={download}
                      className="favicon"
                      style={{ cursor: "pointer" }}
                      alt="logo"
                      onClick={Getdocument}
                    />
                  </OverlayTrigger>
                )}
                </div>
              </Col>
              <Col style={{ height: 10 }}></Col>
              <Col
                className="mt-1"
                style={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                {props.basicInterface != true && props.mcOrder != true ? (
                  <Button
                    id="SendInvite"
                    onClick={async (e) => {
                      addDoc("sendInvite", {
                        SentToId: d.userid,
                        SenderID: uid,
                        Docid: d.orderId,
                        selfDocId: props.SelfDocId,
                      });

                      addDoc(`addNotification`, {
                        time: Date.now(),
                        description: `${sessionStorage.getItem(
                          "UserName"
                        )} has sent invite for your order ${d.orderId}`,
                        type: "invite",
                        visited: false,
                        senderId: uid,
                        sentToId: d.userid,
                      }).then(() => {
                        SignalRService.sendNotification(
                          d.userid,
                          `Invite recieved from ${sessionStorage.getItem(
                            "UserName"
                          )} for order ${d.orderId}`,
                          "invite"
                        );
                        context.dispatch({ Type: "INVITE" });
                      });
                    }}
                    disabled={
                      InviteStatuses(d.inviteStatus, d.isAccepted).disabled
                    }
                    style={
                      InviteStatuses(d.inviteStatus, d.isAccepted).disabled
                        ? {
                            width: "40%",
                            marginLeft: "0px",
                            width: "max-content",
                          }
                        : {
                            width: "40%",
                            marginLeft: "0px",
                            width: "max-content",
                          }
                    }
                  >
                    {InviteStatuses(d.inviteStatus, d.isAccepted).buttonText}
                  </Button>
                ) : props.mcOrder ? (
                  d.alreadyCreated ? (
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          Customize your active offer in My Orders
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <Button
                        style={{ width: "fit-content" }}
                        variant="secondary"
                      >
                        Already Offered
                      </Button>
                    </OverlayTrigger>
                  ) : (
                    // <div style={{background:'#878787', color:'#fff',cursor:'pointer', paddingTop:10,textAlign:'center',borderRadius:10,width:'inherit'}} data-toggle="tooltip" title="Customize your active offer in My">Already Offered</div>
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          Same city is best
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <Button
                        style={{ width: "fit-content" }}
                        onClick={() => {
                          navigate(
                            `/CreateOrder?ID=${uid}&mcOrderId=${d.orderId}`
                          );
                        }}
                      >
                        Create Offer
                      </Button>
                    </OverlayTrigger>
                  )
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          )}
        </Col>
        <div style={{ padding: "0", display: "flex" }}>
          <Col style={{ paddingLeft: 0 }}>
            <h6 className="txt_order notranslate">{d.orderId}</h6>
          </Col>
          <Col style={{ textAlign: "end", padding: "0" }}>
            {d.inFinalize ? null : (
              <h6 className="txt_order">Exp {d.untilGoodDate.split("T")[0]}</h6>
            )}
          </Col>
        </div>
      </Row>
    </Row>
  ) : (
    <Row key={i} className="TopLevel visible">
      <Col>...</Col>
    </Row>
  );
}
export default MatchedOrder;
