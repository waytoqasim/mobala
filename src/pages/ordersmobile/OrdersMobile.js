import React, { forwardRef, useEffect, useState } from "react";
import { Col, Dropdown, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import addtofav from "../../asstes/addtofav.svg";
import Arrow from "../../asstes/arrow.png";
import assistance from "../../asstes/assistance.svg";
import bankImage from "../../asstes/bank.png";
import cashImage from "../../asstes/cash.png";
import info from "../../asstes/info.svg";
import { setDoc } from "../../Helper";

export const Orders = (props) => {
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const navigate = useNavigate();
  const [UntilDate, setUntilDate] = useState(false);
  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      style={{ textDecoration: "none" }}
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span className="threedots" />
    </a>
  ));

  useEffect(() => {
    let date = new Date(props.UntilGoodDate);
    date = date.toDateString().split(" ");
    date = date[1] + " " + date[2] + ", " + date[3];
    setUntilDate(date);
  }, [props.UntilGoodDate]);
  ///////////////////////////////////On hold order//////////////////////////////////////////
  const putOnHold = async (orderId) => {
    setDoc("updateOrderStatus", {
      status: "hold",
      orderId: orderId,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  ///////////////////////////////////putAsCompleted//////////////////////////////////////////

  const putAsCompleted = async (orderId) => {
    setDoc("updateOrderStatus", {
      status: "completed",
      orderId: orderId,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  ///////////////////////////////////deleteOrder//////////////////////////////////////////
  const deleteOrder = async (orderId) => {
    setDoc("updateOrderStatus", {
      status: "deleted",
      orderId: orderId,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  ///////////////////////////////////editOrder//////////////////////////////////////////
  const editOrder = () => {
    sessionStorage.setItem("path", window.location.pathname);
    navigate(`/Createorder?ID=${uid}&Hid=${props.id}&t=${Date.now()}`);
  };

  ///////////////////////////////////putOnActive//////////////////////////////////////////
  const putOnActive = async (orderId) => {
    setDoc("updateOrderStatus", {
      status: "active",
      orderId: orderId,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // useEffect(() => {
  //   if (window.location.pathname == `/OrderCom`) {
  //     setTab("ORDERS");
  //   } else if (window.location.pathname == `/Match_Tab`) {
  //     setTab("MATCHES");
  //   } else if (window.location.pathname == `/ChatPage`) {
  //     setTab("FINALIZE");
  //   } else if (window.location.pathname == `/watchlist`) {
  //     setTab("WATCHLIST");
  //   } else if (window.location.pathname == `/MC`) {
  //     setTab("MC");
  //   } else if (window.location.pathname == `/Tips`) {
  //     setTab("TIPS");
  //   } else if (window.location.pathname == `/McPrime`) {
  //     setTab("MC PRIME");
  //   }
  // }, [context.applicationStore.navigation]);

  return (
    <Row
      // key={props.key}
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
      className="mt-3"
    >
      <Row className="">
        <Col style={{ width: "91.33%" }} md={10}>
          <Row
            className={props.classBdr}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Col>
              <div style={{ padding: "0px" }}>
                <h6
                  className="txt_order mobile-Matches notranslate"
                  style={{ marginBottom: 0, textWrap: "nowrap" }}
                >
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{ position: "absolute" }}
                      >
                        {props.GiveCurrencyInfo}
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <h6>
                      {props.GiveCurrency.split(" ")[0] +
                        " " +
                        props.GiveAmmount.toLocaleString()}
                    </h6>
                  </OverlayTrigger>
                </h6>
                <div
                  className="mobile-Matches relative"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}
                >
                  {props.GiveSourceCash ? (
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
                      <img className="cashicon" src={cashImage}></img>
                    </OverlayTrigger>
                  ) : null}
                  {props.GiveSourceBank ? (
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
                      <img className="bankicon" src={bankImage}></img>
                    </OverlayTrigger>
                  ) : null}

                  {!props.GiveSourceCash && !props.GiveSourceBank ? (
                    <div style={{ display: "flex" }}>
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
                        <img className="cashicon" src={cashImage}></img>
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
                        <img className="bankicon" src={bankImage}></img>
                      </OverlayTrigger>
                      {props.GiveAssistance ? (
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
                        {props.GiveCity}, {props.GiveState}, {props.GiveCountry}
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <p>
                      {props.GiveCity}, {props.GiveCountry}
                    </p>
                  </OverlayTrigger>
                </h6>
                <div>
                  {" "}
                  <img src={addtofav} className="favicon1" /> by {props.favBy}
                </div>
              </div>
            </Col>
            <Col>
              <div style={{ padding: "0px" }}>
                <Row style={{ textAlign: "center" }}>
                  <div style={{}}>
                    <img
                      style={{ textAlign: "center" }}
                      src={Arrow}
                      className="arrow icon"
                      alt="logo"
                    />
                  </div>
                </Row>
                <Row style={{ position: "relative" }}>
                  <div
                    className={`${
                      props.AdditionalInfo == "" || props.AdditionalInfo == null
                        ? "invisible"
                        : "visible"
                    }`}
                    style={{
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          Additional Info:{" "}
                          {props.AdditionalInfo != ""
                            ? props.AdditionalInfo
                            : "None"}
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <span className="d-inline-block">
                        <img
                          style={{ width: "80%" }}
                          src={info}
                          className="info"
                          alt="logo"
                        />
                      </span>
                    </OverlayTrigger>
                  </div>
                </Row>
              </div>
            </Col>
            <Col>
              <div style={{ padding: "0px" }}>
                <h6
                  className="txt_order mobile-Matches notranslate"
                  style={{ marginBottom: 0, textWrap: "nowrap" }}
                >
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{ position: "absolute" }}
                      >
                        {props.TakeCurrencyInfo}
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <h6>
                      {/* {props.TakeCurrency.split(" ")[0]}{" "}
                      {props.TakeAmmount.toLocaleString()} */}
                      {props.TakeCurrency.split(" ")[0] +
                        " " +
                        props.TakeAmmount.toLocaleString()}
                    </h6>
                  </OverlayTrigger>
                </h6>
                <div
                  className="mobile-Matches relative"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}
                >
                  {props.TakeSourceCash ? (
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
                      <img className="cashicon" src={cashImage}></img>
                    </OverlayTrigger>
                  ) : null}
                  {props.TakeSourceBank ? (
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
                      <img className="bankicon" src={bankImage}></img>
                    </OverlayTrigger>
                  ) : null}

                  {!props.TakeSourceCash && !props.TakeSourceBank ? (
                    <div style={{ display: "flex" }}>
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
                        <img className="cashicon" src={cashImage}></img>
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
                        <img className="bankicon" src={bankImage}></img>
                      </OverlayTrigger>
                      {props.TakeAssistance ? (
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
                        {props.TakeCity}, {props.TakeState}, {props.TakeCountry}
                      </Tooltip>
                    }
                    placement="top-start"
                  >
                    <p>
                      {props.TakeCity}, {props.TakeCountry}
                    </p>
                  </OverlayTrigger>
                </h6>
              </div>
            </Col>
            <Col
              style={{
                position: "absolute",
                display: "contents",
              }}
            >
              <div>
                <Row
                  style={{
                    zIndex: "9999",
                    textAlign: "center",
                  }}
                >
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />
                    <Dropdown.Menu id={props.id} size="sm" title="">
                      <Dropdown.Item onClick={editOrder}>Edit</Dropdown.Item>
                      {props.status == "Hold" ||
                      props.status == "Completed" ||
                      props.status == "Expired" ? null : (
                        <Dropdown.Item
                          onClick={(e) => {
                            let orderId = e.target.parentElement.id;
                            putOnHold(orderId);
                          }}
                        >
                          Mark as on-Hold
                        </Dropdown.Item>
                      )}
                      {props.status == "Hold" ? (
                        <Dropdown.Item
                          onClick={(e) => {
                            let orderId = e.target.parentElement.id;
                            putOnActive(orderId);
                          }}
                        >
                          Mark as Active
                        </Dropdown.Item>
                      ) : null}
                      {props.status == "Completed" ? null : (
                        <Dropdown.Item
                          onClick={(e) => {
                            let orderId = e.target.parentElement.id;
                            putAsCompleted(orderId);
                          }}
                        >
                          Mark as Completed
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        onClick={(e) => {
                          let orderId = e.target.parentElement.id;
                          deleteOrder(orderId);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
                {props.status == "Matched" || props.status == "InFinalize" ? (
                  <Row>
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">
                          Number of Matches
                        </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <h6
                          className="blitcount notranslate"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(
                              `/Match_Tab?ID=${uid}&OrderId=${
                                props.id
                              }&t=${Date.now()}`
                            );
                          }}
                          id={props.id}
                        >
                          {props.activeCount}
                        </h6>
                      </span>
                    </OverlayTrigger>
                  </Row>
                ) : null}
              </div>
            </Col>
          </Row>
          {/* <LowerDate Date={props.UntilGoodDate} id={props.id} /> */}
          <Row style={{ marginTop: "5px" }}>
            <Col md={6} style={{ padding: "0", width: "50%" }}>
              <h6 className="date txt_order f-size notranslate">{props.id}</h6>
            </Col>
            <Col
              md={6}
              style={{ textAlign: "end", padding: "0", width: "50%" }}
            >
              {props.status != "Completed" && props.status != "InFinalize" ? (
                <h6
                  className="date txt_order f-size "
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  Exp&nbsp;
                  <div style={{ fontSize: "12px", lineHeight: "14px" }}>
                    {" "}
                    {UntilDate}
                  </div>
                </h6>
              ) : null}
            </Col>
          </Row>
          <Row style={{ padding: 0 }}>
            <div
              id={props.key}
              className={props.classBtn}
              style={{ width: "max-content" }}
              // style={{ cursor: "pointer" }}
              // onClick={() => {
              //   if (props.status == "Matched") {
              //     let key = props.Index - props.activeCount
              //     key -= 1
              //     navigate(`/Match_Tab?ID=${uid}&key=${key}&t=${Date.now()}`);
              //   }
              // }}
            >
              {props.status}
            </div>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};
