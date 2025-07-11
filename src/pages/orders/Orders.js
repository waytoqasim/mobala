import React, { useContext, useEffect, useState } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import addtofav from "../../asstes/addtofav.svg";
import Arrow from "../../asstes/arrow.png";
import assistance from "../../asstes/assistance.svg";
import bankImage from "../../asstes/bank.png";
import cashImage from "../../asstes/cash.png";
import info from "../../asstes/info.svg";
import DropdownMenu from "../../components/order/DropdownMenu";
import ExpiryInfo from "../../components/order/ExpiryInfo";
import OrderInfo from "../../components/order/OrderInfo";
import OrderSelector from "../../components/order/OrderSelector";
import OverlayIconGroup from "../../components/order/OverlayIconGroup";
import { AppContext } from "../../Context";
import { setDoc } from "../../Helper";

export const Orders = (props) => {
  debugger
  const { 
    is1Fx, status, id, classBdr, favBy, matchCount,
    ordersDropdown, currentOrder, setCurrentOrder, inFinalize, 
    AdditionalInfo, 
    GiveCurrency, GiveAmmount, GiveCurrencyInfo, 
    TakeCurrency, TakeAmmount, TakeCurrencyInfo, 
    GiveSourceCash, GiveSourceBank, TakeThroughCash, TakeThroughBank, 
    GiveAssistance, TakeAssistance, 
    GiveCity, GiveState, GiveCountry,
    TakeCity, TakeState, TakeCountry, 
    isIndex, classBtn, key
  } = props;
  const context = useContext(AppContext);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const [isloading, setisloading] = useState(false);
  const [UntilDate, setUntilDate] = useState(false);
  // useEffect(() => {
  //   // let date = new Date(props.UntilGoodDate);
  //   let date = props.UntilGoodDate.split(" ");
  //   date = date[1] + " " + date[2] + ", " + date[3];
  //   setUntilDate(date);
  // }, [props.UntilGoodDate]);

  const [showFireIcon, setShowFireIcon] = useState(false);

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const expiryDate = new Date(props.UntilGoodDate); // Parse the expiration date

  //   // Calculate the difference in days between the current date and the expiry date
  //   const timeDifference = expiryDate - currentDate;
  //   const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  //   // Format the UntilGoodDate for display
  //   const dateParts = props.UntilGoodDate.split(" ");
  //   const formattedDate = dateParts[1] + " " + dateParts[2] + ", " + dateParts[3];
  //   setUntilDate(formattedDate);

  //   // Show the fire icon if 5 or fewer days remain
  //   if (daysRemaining <= 5) {
  //     setShowFireIcon(true);
  //   } else {
  //     setShowFireIcon(false);
  //   }
  // }, [props.UntilGoodDate]);
  useEffect(() => {
    const currentDate = new Date();
    const expiryDate = new Date(props.UntilGoodDate); // Parse the expiration date

    // Calculate the difference in days between the current date and the expiry date
    const timeDifference = expiryDate - currentDate;
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Format the UntilGoodDate for display
    const dateParts = props.UntilGoodDate.split(" ");
    const formattedDate = `${dateParts[1]} ${dateParts[2]}, ${dateParts[3]}`;
    setUntilDate(formattedDate);

    // Only show the fire icon if the order is NOT expired and 5 or fewer days remain
    if (daysRemaining > 0 && daysRemaining <= 5) {
      setShowFireIcon(true);
    } else {
      setShowFireIcon(false);
    }
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

  const styles = {
    show4: {
      background: "#ebebeb",
      color: "#2995be",
      borderRadius: "6px",
      fontWeight: 500,
      fontSize: "15px",
      fontWeight: "700",
      textAlign: "center",
    },
    white: {
      color: "white",
      textAlign: "center",
    },
  };

  useEffect(() => {
    if (window.location.pathname == `/OrderCom`) {
      setTab("ORDERS");
    } else if (window.location.pathname == `/Match_Tab`) {
      setTab("MATCHES");
    } else if (window.location.pathname == `/ChatPage`) {
      setTab("FINALIZE");
    } else if (window.location.pathname == `/watchlist`) {
      setTab("WATCHLIST");
    } else if (window.location.pathname == `/MC`) {
      setTab("MC");
    } else if (window.location.pathname == `/Tips`) {
      setTab("TIPS");
    } else if (window.location.pathname == `/McPrime`) {
      setTab("MC PRIME");
    }

  }, [context.applicationStore.navigation]);
  
  
  return (
    
    <Row className="mt-3" style={{ display: "flex", justifyContent: "flex-end" }}>
      <div className={is1Fx ? "d-flex" : "row"} style={{ justifyContent: "center" }}>
        <Col md={is1Fx ? 7 : 10} style={is1Fx ? {} : { width: "91.33%" }}>
          <Row className={classBdr} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Col>
            <div style={{ padding: '0px', position:'absolute' }}>
            <OrderInfo 
                currency={GiveCurrency} 
                amount={GiveAmmount} 
                currencyInfo={GiveCurrencyInfo} 
                city={GiveCity} 
                country={GiveCountry}
                state={GiveState}
                favBy={favBy}
                sourceCash={GiveSourceCash}
                sourceBank={GiveSourceBank}
                giveAssistance={GiveAssistance}
                AdditionalInfo={AdditionalInfo}
                cashImage={cashImage}
                bankImage={bankImage}
                assistance={assistance}
                addtofav={addtofav}
              />
              <div>
                <img alt='' src={addtofav} className="favicon1" /> by {favBy}
            </div>
            </div>
              
            </Col>

            <Col>
              <OverlayIconGroup 
                Arrow={Arrow}
                AdditionalInfo={AdditionalInfo}
                info={info}
                
              />
            </Col>

            <Col>
              <OrderInfo 
                currency={TakeCurrency} 
                amount={TakeAmmount} 
                currencyInfo={TakeCurrencyInfo} 
                city={TakeCity} 
                country={TakeCountry}
                sourceCash={GiveSourceCash}
                sourceBank={GiveSourceBank}
                giveAssistance={GiveAssistance}
                AdditionalInfo={AdditionalInfo}
                cashImage={cashImage}
                bankImage={bankImage}
                assistance={assistance}
              />
            </Col>

            <Col style={{ position: "absolute", display: "contents" }}>
            <div>
              <Row style={{
                    zIndex: "9999",
                    textAlign: "center",
                  }}>
              <DropdownMenu 
                status={status}
                editOrder={editOrder}
                putOnHold={putOnHold}
                putOnActive={putOnActive}
                putAsCompleted={putAsCompleted}
                deleteOrder={deleteOrder}
                matchCount={matchCount}
                id={id}
              />
              </Row>
              <Row>
              {props.status == "Matched" || props.status == "InFinalize" ? (
                  <Row style={{ position: "relative" }}>
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          Number of Matches
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <span className="d-inline-block">
                        <h6
                          className="blitcount notranslate"
                          onClick={() => {
                            navigate(
                              `/Match_Tab?ID=${uid}&OrderId=${
                                props.id
                              }&t=${Date.now()}`
                            );
                          }}
                          id={props.id}
                        >
                          {props.Expired}
                        </h6>
                      </span>
                    </OverlayTrigger>
                  </Row>
                ) : null}
              </Row>
            </div>
              
            </Col>
            
          </Row>
        </Col>

        {is1Fx ? null : (
          <Col sm={1} className="expirydate">
          {props.isIndex ? (
            <label className="keymargin">{props.Index}</label>
          ) : (
            <label className="keymargin"></label>
          )}
          <p id={props.key} className={`py-1 ${props.classBtn}`}>
            {props.status}
          </p>
          <p id="matchNumber"></p>
        </Col>
        )}
      </div>

      {is1Fx ? (
        <Row style={{ justifyContent: "center" }}>
          <OrderSelector 
            ordersDropdown={ordersDropdown} 
            currentOrder={currentOrder} 
            setCurrentOrder={setCurrentOrder} 
            inFinalize={inFinalize}
            UntilDate={UntilDate}
            id={id} 
          />
        </Row>
      ) : (
        <Row style={{ marginTop: "5px" }}>
          <ExpiryInfo 
          inFinalize={inFinalize} 
          UntilDate={UntilDate} 
          showFireIcon={showFireIcon}
          id={id}
        />
        </Row>
        
      )}
    </Row>
  );
};
