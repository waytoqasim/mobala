import React from 'react';
import { Col, Row } from "react-bootstrap";
import bundleSideDot from "../../asstes/bundleSideDot.svg";
import vArrow from "../../asstes/v-arrow.svg";
import MatchedOrder from '../../components/order/MatchedOrder';
const OrdersSection = ({ bundles,
  distanceSortXCountries, profitSortXCountries, isCountrySwitchOn, distanceSortSameCountries, profitSortSameCountries
  , isProfitSort, expandedItems, toggleBundle, currentPosts, context, isSwitchOn, profitOrderList }) => (

  <Row className="centeritem" style={{ justifyContent: "center" }}>
    <Col md={7}>
      <div>
        {isSwitchOn ? (
          bundles.length > 0 ? (
            bundles.map((d, i) => (
              <div className="d-flex flex-column align-items-start" key={`Order${i}`}>
                <div className="d-flex align-items-center" onClick={() => toggleBundle(i)}>
                  <div style={{ paddingTop: "94px" }}>
                    <img
                      src={vArrow}
                      className={`BundleArrow ${expandedItems[i] ? "rotated" : ""}`}
                      alt="Arrowlogo"
                    />
                  </div>
                  <MatchedOrder
                    className={`TopLevel ${expandedItems[i] ? "visible" : ""}`}
                    order={d}
                    TakeAmount={0}
                    orderIndex={i}
                    rotatedArrow={true}
                    mcOrder={true}
                    OnlineUsers={context.applicationStore.OnlineUsers}
                    TakeCity={sessionStorage.getItem("City")}
                    GiveCity={sessionStorage.getItem("City")}
                    SelfDocId={""}
                  />
                </div>
                {expandedItems[i] && (
                  <div className="position-relative">
                    {d.bundles.map((s, j) => (
                      <div className="d-flex align-items-center position-relative" key={`MatchedOrder${j}`}>
                        <div className="bundleSideLine"></div>
                        <img src={bundleSideDot} className="BundleArrow" alt="Arrowlogo" />
                        <MatchedOrder
                          className="TopLevel visible"
                          order={s}
                          TakeAmount={0}
                          orderIndex={j}
                          rotatedArrow={true}
                          mcOrder={true}
                          OnlineUsers={context.applicationStore.OnlineUsers}
                          TakeCity={sessionStorage.getItem("City")}
                          GiveCity={sessionStorage.getItem("City")}
                          SelfDocId={""}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <h3>No Bundles Available!</h3>
          )
        ) : (
          <>
            {currentPosts.length > 0 ? (() => {
              let ordersSorting = null;

              if (isCountrySwitchOn && !isProfitSort) {
                // console.log("Sorting inside distanceSortCXountries");
                ordersSorting = distanceSortXCountries;
              } else if (isCountrySwitchOn && isProfitSort) {
                ordersSorting = profitSortXCountries;
              } else if (!isCountrySwitchOn && !isProfitSort) {
                // console.log("Sorting inside distanceSortSameCountries", distanceSortSameCountries);
                ordersSorting = distanceSortSameCountries;
              } else if (!isCountrySwitchOn && isProfitSort) {
                ordersSorting = profitSortSameCountries;
              }

              if (!ordersSorting || !Array.isArray(ordersSorting)) {
                return null;
              }

              return ordersSorting.map((d, i) => (
                <MatchedOrder
                  className="TopLevel visible"
                  key={`Order${i}`}
                  order={d}
                  TakeAmount={0}
                  orderIndex={i}
                  rotatedArrow={true}
                  mcOrder={true}
                  OnlineUsers={context.applicationStore.OnlineUsers}
                  TakeCity={sessionStorage.getItem("City")}
                  GiveCity={sessionStorage.getItem("City")}
                  SelfDocId={""}
                  profitOfEachOrder={profitOrderList}
                />
              ));
            })() : <h5>No Deals available with the selected countries and currencies!</h5>}

            {/* {currentPosts.length > 0
                                      ? isCountrySwitchOn
                                        ? !isProfitSort
                                          ?
                                          distanceSortXCountries.map((d, i) => (
                                            <>
                                              <MatchedOrder
                                                className="TopLevel visible"
                                                key={`Order${i}`}
                                                order={d}
                                                TakeAmount={0}
                                                orderIndex={i}
                                                rotatedArrow={true}
                                                mcOrder={true}
                                                OnlineUsers={context.applicationStore.OnlineUsers}
                                                TakeCity={sessionStorage.getItem("City")}
                                                GiveCity={sessionStorage.getItem("City")}
                                                SelfDocId={""}
                                                profitOfEachOrder={profitOrderList}
                                              />
                                            </>
                                          ))
                                          :
                                          profitSortXCountries.map((d, i) => (
                                            <>
                                              <MatchedOrder
                                                className="TopLevel visible"
                                                key={`Order${i}`}
                                                order={d}
                                                TakeAmount={0}
                                                orderIndex={i}
                                                // basicInterface={true}
                                                rotatedArrow={true}
                                                mcOrder={true}
                                                OnlineUsers={
                                                  context.applicationStore.OnlineUsers
                                                }
                                                TakeCity={sessionStorage.getItem("City")}
                                                GiveCity={sessionStorage.getItem("City")}
                                                SelfDocId={""}
                                                profitOfEachOrder={profitOrderList}
                                              />
                                            </>
                                          ))
                                        : !isProfitSort
                                          ?
                                          distanceSortSameCountries.map((d, i) => (
                                            <>
                                              <MatchedOrder
                                                className="TopLevel visible"
                                                key={`Order${i}`}
                                                order={d}
                                                TakeAmount={0}
                                                orderIndex={i}
                                                rotatedArrow={true}
                                                mcOrder={true}
                                                OnlineUsers={context.applicationStore.OnlineUsers}
                                                TakeCity={sessionStorage.getItem("City")}
                                               GiveCity={sessionStorage.getItem("City")}
                                                SelfDocId={""}
                                                profitOfEachOrder={profitOrderList}
                                              />
                                            </>
                                          ))
                                          :
                                          profitSortSameCountries.map((d, i) => (
                                            <>
                                              <MatchedOrder
                                                className="TopLevel visible"
                                                key={`Order${i}`}
                                                order={d}
                                                TakeAmount={0}
                                               orderIndex={i}
                                              // basicInterface={true}
                                               rotatedArrow={true}
                                                mcOrder={true}
                                               OnlineUsers={
                                                  context.applicationStore.OnlineUsers
                                                }
                                                TakeCity={sessionStorage.getItem("City")}
                                                GiveCity={sessionStorage.getItem("City")}
                                                SelfDocId={""}
                                                profitOfEachOrder={profitOrderList}
                                              />
                                            </>
                                          ))
                                        : null
                                    } */}
          </>
        )} 
        
      </div>
    </Col>
  </Row>
);

export default OrdersSection;
