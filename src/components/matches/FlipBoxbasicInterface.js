import React from "react";
import { Col } from "react-bootstrap";

const FlipBoxbasicInterface = ({ d, frontText, backText, isInvited }) => {
  return (
    <Col className="flip-box notranslate" style={{ paddingLeft: isInvited ? "0px" : undefined }}>
      <div
        className={
          d.invited && !d.orderinFinalize ? "flip-box-inner orange-border" : "flip-box-inner"
        }
      >
        <div className="flip-box-front">
          <h6 className="txt_order">{frontText}</h6>
        </div>
        <div className="flip-box-back">
          <h6 className="txt_order">{backText}</h6>
        </div>
      </div>
    </Col>
  );
};

export default FlipBoxbasicInterface;
