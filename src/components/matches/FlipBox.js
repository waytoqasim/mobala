import React from 'react';
import { Col } from 'react-bootstrap';

const FlipBox = ({ d }) => {
  return (
    <Col className="flip-box notranslate" style={{ paddingRight: "0px" }}>
      <div
        className={
          d.invited ? "flip-box-inner orange-border" : "flip-box-inner"
        }
      >
        <div className="flip-box-front">
          <h6 className="txt_order">
            {(d.takeAmount / d.giveAmount).toFixed(4)}&nbsp;{d.takeCurrency} / {d.giveCurrency}
          </h6>
        </div>
        <div className="flip-box-back">
          <h6 className="txt_order">
            {(d.giveAmount / d.takeAmount).toFixed(4)}&nbsp;{d.giveCurrency} / {d.takeCurrency}
          </h6>
        </div>
      </div>
    </Col>
  );
};

export default FlipBox;
