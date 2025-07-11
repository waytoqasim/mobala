import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TakeAssistance = ({ assistance, takeAssistance }) => (
  takeAssistance ? (
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
  ) : null
);

export default TakeAssistance;
