import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TakeCurrencyInfo = ({ currencyInfo, currency, amount }) => (

    <OverlayTrigger
      overlay={
        <Tooltip
          id="tooltip-disabled"
          bsPrefix="custom-tooltip"
          style={{ position: "absolute" }}
        >
          {currencyInfo}
        </Tooltip>
      }
      placement="top-start"
    >
      <h6>
        {currency} {amount.toLocaleString()}{" "}
      </h6>
    </OverlayTrigger>
);

export default TakeCurrencyInfo;
