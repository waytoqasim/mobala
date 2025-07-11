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
import addedtofav from "../../asstes/addedtofav.svg";
import addtofav from "../../asstes/addtofav.svg";
import Arrow from "../../asstes/arrow.png";
import assistance from "../../asstes/assistance.svg";
import bankImage from "../../asstes/bank.png";
import cashImage from "../../asstes/cash.png";
import download from "../../asstes/download1.svg";
import info from "../../asstes/info.svg";
import AdditionalInfo from "../matches/AdditionalInfo";
import ArrowIcon from "../matches/ArrowIcon";
import BatchTag from "../matches/BatchTag";
import FlipBox from "../matches/FlipBox";
import FlipBoxbasicInterface from "../matches/FlipBoxbasicInterface";
import IconWithToolTip from "../matches/IconWithToolTip";
import PaymentMethodIcons from "../matches/PaymentMethodIcons";
import ProposalDetails from "../matches/ProposalDetails";
import TakeAssistance from "../matches/TakeAssistance";
import TakeCurrencyInfo from "../matches/TakeCurrencyInfo";
import UserProposalInfo from "../matches/UserProposalInfo";


function MatchedOrder(props) {
  const {
    OnlineUsers
  } = props;
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
    console.log("ordersss", d)
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
            <div className="row">
              <UserProposalInfo

                d={d}
                isOnline={OnlineUsers[d.userid]}
              />
              <FlipBox key={d.userid} d={d} />
            </div>


          </>
        ) : (
          <>
            {props.basicInterface ? null : (
              <>
                <FlipBoxbasicInterface
                  d={d}
                  frontText={`${(d.takeAmount / d.giveAmount).toFixed(4)} ${d.takeCurrency} / ${d.giveCurrency}`}
                  backText={`${(d.giveAmount / d.takeAmount).toFixed(4)} ${d.giveCurrency} / ${d.takeCurrency}`}
                  isInvited={true}
                />
                <FlipBoxbasicInterface
                  d={d}
                  frontText={
                    d.giveAmount < props.TakeAmount
                      ? `Has less ${d.giveCurrency} available.`
                      : d.giveAmount === props.TakeAmount
                        ? `Has same ${d.giveCurrency} available.`
                        : `Has more ${d.giveCurrency} available.`
                  }
                  backText={
                    d.giveAmount < props.TakeAmount
                      ? "Ask for more or decrease your order"
                      : d.giveAmount === props.TakeAmount
                        ? "Exact quantity!"
                        : "Ask if less order size is acceptable"
                  }
                  isInvited={false}
                />
              </>
            )}
            <ProposalDetails d={d} props={props} />
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
                        <Tooltip id="tooltip-disabled" bsPrefix="custom-tooltip" style={{ position: "absolute" }}>
                          {d.giveCurrencyInfo}
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <h6>
                        {d.giveCurrency} {d.giveAmount.toLocaleString()}
                      </h6>
                    </OverlayTrigger>

                    {/* Render Bank Icon */}
                    {d.giveSourceBank && (
                      <IconWithToolTip
                        tooltipText="Bank"
                        iconSrc={bankImage}
                        iconClass="bankicon"
                      />
                    )}

                    {/* Render Cash Icon */}
                    {d.giveSourceCash && (
                      <IconWithToolTip
                        tooltipText="Cash"
                        iconSrc={cashImage}
                        iconClass="cashicon"
                      />
                    )}

                    {/* If neither bank nor cash source is available, show both icons */}
                    {!d.giveSourceCash && !d.giveSourceBank && (
                      <div style={{ position: "relative" }}>
                        <IconWithToolTip
                          tooltipText="Cash"
                          iconSrc={cashImage}
                          iconClass="cashicon"
                        />
                        <IconWithToolTip
                          tooltipText="Bank"
                          iconSrc={bankImage}
                          iconClass="bankicon"
                        />
                      </div>
                    )}

                    {/* Display Arrow based on condition */}
                    {/* {!props.basicInterface && (
                      <>
                        {d.giveisSmall ? (
                          <img alt="" src={Greenarrow} className="arrowicon" />
                        ) : d.giveisEqual ? (
                          <></>
                        ) : (
                          <img alt="" src={Redarrow} className="arrowicon" />
                        )}
                      </>
                    )} */}

                    {/* Render Assistance Icon */}
                    {d.giveAssistance && (
                      <IconWithToolTip
                        tooltipText="Open to Settlement from a Money Changer"
                        iconSrc={assistance}
                        iconClass="cashicon"
                      />
                    )}
                  </h6>

                  <h6 className="txt_order mobile-Matches notranslate" style={{ marginBottom: 0 }}>
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled" bsPrefix="custom-tooltip" style={{ position: "absolute" }}>
                          {d.giveCurrencyInfo}
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <h6>
                        {d.giveCurrency} {d.giveAmount.toLocaleString()}
                      </h6>
                    </OverlayTrigger>
                  </h6>

                  <div className="mobile-Matches">
                    {/* Render Bank Icon (Mobile) */}
                    {d.giveSourceBank && (
                      <IconWithToolTip
                        tooltipText="Bank"
                        iconSrc={bankImage}
                        iconClass="bankicon"
                        style={{ marginLeft: 0 }}
                      />
                    )}

                    {/* Render Cash Icon (Mobile) */}
                    {d.giveSourceCash && (
                      <IconWithToolTip
                        tooltipText="Cash"
                        iconSrc={cashImage}
                        iconClass="cashicon"
                        style={!d.giveSourceBank ? { marginLeft: 0 } : {}}
                      />
                    )}

                    {/* If neither bank nor cash source is available, show both icons (Mobile) */}
                    {!d.giveSourceCash && !d.giveSourceBank && (
                      <div style={{ position: "relative" }}>
                        <IconWithToolTip
                          tooltipText="Cash"
                          iconSrc={cashImage}
                          iconClass="cashicon"
                          style={{ marginLeft: 0 }}
                        />
                        <IconWithToolTip
                          tooltipText="Bank"
                          iconSrc={bankImage}
                          iconClass="bankicon"
                        />
                      </div>
                    )}

                    {/* Display Arrow (Mobile) */}
                    {/* {!props.basicInterface && (
                      <>
                        {d.giveisSmall ? (
                          <img alt="" src={Greenarrow} className="arrowicon" />
                        ) : d.giveisEqual ? (
                          <></>
                        ) : (
                          <img alt="" src={Redarrow} className="arrowicon" />
                        )}
                      </>
                    )} */}

                    {/* Render Assistance Icon (Mobile) */}
                    {d.giveAssistance && (
                      <IconWithToolTip
                        tooltipText="Open to Settlement from a Money Changer"
                        iconSrc={assistance}
                        iconClass="cashicon"
                      />
                    )}
                  </div>

                  <h6 className="txt_order">
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled" bsPrefix="custom-tooltip" style={{ position: "absolute" }}>
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

                  <h6 className="txt_order">
                    {d.givecitydistance !== 0
                      ? `${d.givecitydistance} km (${(d.givecitydistance / 1.609).toFixed()} mi) from ${props.TakeCity}`
                      : "From same city"}
                  </h6>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                {/*  ArrowIcon Sub-component */}
                <ArrowIcon rotatedArrow={props.rotatedArrow} arrowImage={Arrow} />
              </Row>
              <Row>
                {/*  AdditionalInfo Sub-component */}
                <AdditionalInfo additionalInfo={d.additionalInfo} infoImage={info} />
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>

                  <h6 className="txt_order web-Matches">
                    {/* Take Currency Info */}
                    <TakeCurrencyInfo
                      currencyInfo={d.takeCurrencyInfo}
                      currency={d.takeCurrency}
                      amount={d.takeAmount}
                    />

                    {/* Payment Method Icons */}
                    <PaymentMethodIcons
                      takeThroughBank={d.takeThroughBank}
                      takeThroughCash={d.takeThroughCash}
                      bankImage={bankImage}
                      cashImage={cashImage}
                    />
                    {/* Arrow Icon */}
                    {/* {!props.basicInterface && (
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
                    )} */}
                  </h6>

                  {/* Take Assistance */}
                  <TakeAssistance
                    assistance={assistance}
                    takeAssistance={d.takeAssistance}
                  />

                  {/* Take City and Distance */}
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

                  <h6 className="txt_order">
                    {d.takecitydistance !== 0
                      ? `${d.takecitydistance} km (${(d.takecitydistance / 1.609).toFixed()} mi) from ${props.GiveCity}`
                      : "From same city"}
                  </h6>
                </Col>
              </Row>
            </Col>
            <>
              {d.isMC ? (
                <BatchTag label="MC" tooltip="Money Changer" />
              ) : (
                <></>
              )}

              {d.isMC && d.areYouan === "Individual" ? (
                <BatchTag label="MC - I" tooltip="Money Changer Individual" />
              ) : (
                <></>
              )}

              {d.isMC && d.areYouan === "Corporation" ? (
                <BatchTag label="MC - C" tooltip="Money Changer Corporation" />
              ) : (
                <></>
              )}

              {!d.isMC && d.areYouan === "Corporation" ? (
                <BatchTag label="Corp" tooltip="Corporation" />
              ) : (
                <></>
              )}
            </>

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
                    <>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          // width: '100%',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          width: '130%',
                          textWrap: 'nowrap'
                        }}
                      >
                        {props.profitOfEachOrder !== undefined
                          &&
                          props.profitOfEachOrder.find(profit => profit.orderId === d.orderId)?.profit > 0 && (
                            <Col>
                              <div className="d-flex flex-col"
                                style={{
                                  // backgroundColor: 'rgba(166, 224, 134, 0.91)',
                                  color: 'rgba(50, 139, 2, 0.73)',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  borderRadius: 5,
                                  padding: 5
                                }}
                              >
                                <p
                                  style={{
                                    marginBottom: 0
                                  }}
                                >Profit:</p>
                                <p
                                  style={{
                                    marginBottom: 0,
                                    marginLeft: 5
                                  }}
                                >{props.profitOfEachOrder.find(profit => profit.orderId === d.orderId)?.profit || "Profit not available"}
                                </p>
                                <p
                                  style={{
                                    marginBottom: 0,
                                    marginLeft: 5
                                  }}
                                >
                                  {d.takeCurrency}
                                </p>
                              </div>
                            </Col>
                          )}
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
                      </div>
                    </>
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
