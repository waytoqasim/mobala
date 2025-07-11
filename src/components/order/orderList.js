import React from "react";
import { Col, Row } from "react-bootstrap";
import { Orders } from "../../pages/orders/Orders";

const OrderList = ({ 
  activelist, 
  finalizelist, 
  holdlist, 
  expiredlist, 
  completedlist, 
  activeCount, 
  isIndex, 
  Index, 
  props 
}) => {
  const renderOrders = (list, status, classBtn, classBdr) => {
    return list.length > 0 ? list.map((Task, key) => {
      const orderProps = {
        Expired: Task.expiredTime,
        GiveCurrencyInfo: Task.giveCurrencyInfo,
        UntilGoodDate: Task.untilGoodDate,
        Index: ++Index,
        isIndex,
        id: Task.orderId,
        uid: Task.uid,
        TakeCountry: Task.takeCountry,
        TakeCity: Task.takeCity,
        TakeThroughCash: Task.takeThroughCash,
        TakeThroughBank: Task.takeThroughBank,
        TakeAmmount: Task.takeAmount,
        TakeCurrency: Task.takeCurrency,
        TakeCurrencyInfo: Task.takeCurrencyInfo,
        AdditionalAmmount: Task.AdditionalAmmount,
        AdditionalInfo: Task.additionalInfo,
        favBy: Task.favBy,
        GiveCountry: Task.giveCountry,
        GiveCity: Task.giveCity,
        GiveSourceBank: Task.giveSourceBank,
        GiveAmmount: Task.giveAmount,
        GiveCurrency: Task.giveCurrency,
        GiveSourceCash: Task.giveSourceCash,
        GiveState: Task.giveState,
        TakeState: Task.takeState,
        TakeAssistance: Task.takeAssistance,
        GiveAssistance: Task.giveAssistance,
        status,
        classBtn,
        classBdr
      };

      return (
        <div key={key}>
          <Orders {...orderProps} />
        </div>
      );
    }) : null;
  };

  return (
    <Col md={6}> test
      {/* --------------------------------------Active Order----------------------- */}
      <Row id={"active"}>
        {activelist.length > 0 && activelist.map((Task, key) =>
          !Task.match && (
            <div key={key}>
              <Orders
                {...{
                  Expired: Task.Expired,
                  GiveCurrencyInfo: Task.giveCurrencyInfo,
                  UntilGoodDate: Task.untilGoodDate,
                  Index: ++Index,
                  isIndex,
                  id: Task.orderId,
                  uid: Task.uid,
                  TakeCountry: Task.takeCountry,
                  TakeCity: Task.takeCity,
                  TakeThroughCash: Task.takeThroughCash,
                  TakeThroughBank: Task.takeThroughBank,
                  TakeAmmount: Task.takeAmount,
                  TakeCurrency: Task.takeCurrency,
                  TakeCurrencyInfo: Task.takeCurrencyInfo,
                  AdditionalAmmount: Task.AdditionalAmmount,
                  AdditionalInfo: Task.additionalInfo,
                  favBy: Task.favBy,
                  GiveCountry: Task.giveCountry,
                  GiveCity: Task.giveCity,
                  GiveSourceBank: Task.giveSourceBank,
                  GiveAmmount: Task.giveAmount,
                  GiveCurrency: Task.giveCurrency,
                  GiveSourceCash: Task.giveSourceCash,
                  GiveState: Task.giveState,
                  TakeState: Task.takeState,
                  TakeAssistance: Task.takeAssistance,
                  GiveAssistance: Task.giveAssistance,
                  status: "Active",
                  classBtn: "activ-btn",
                  classBdr: props.Expired ? "bdr-expired p-2" : "bdr p-2"
                }}
              />
            </div>
          )
        )}
      </Row>
      {/* --------------------------------------Matched Order----------------------- */}
      <Row id={"matched"}>
        {renderOrders(
          activelist.filter(Task => Task.match),
          "Matched",
          "activ-btn",
          props.Expired ? "bdr-expired p-2" : "bdr p-2"
        )}
      </Row>
      {/* --------------------------------------Finalize Order----------------------- */}
      <Row id={"finalize"}>
        {renderOrders(
          finalizelist,
          "InFinalize",
          "activ-btn",
          props.Expired ? "bdr-expired p-2" : "bdr p-2"
        )}
      </Row>
      {/* --------------------------------------Hold Order----------------------- */}
      <Row id={"holdorder"}>
        {renderOrders(
          holdlist,
          "Hold",
          "hold-btn",
          "bdr-hold bdr p-2"
        )}
      </Row>
      {/* --------------------------------------Expired Order----------------------- */}
      <Row id={"expired"}>
        {renderOrders(
          expiredlist,
          "Expired",
          "expired-btn",
          "bdr-expired bdr p-2"
        )}
      </Row>
      {/* --------------------------------------Completed Order----------------------- */}
      <Row id={"completed"}>
        {renderOrders(
          completedlist,
          "Completed",
          "completed-btn",
          "bdr-completed bdr p-2"
        )}
      </Row>
    </Col>
  );
};

export default OrderList;
